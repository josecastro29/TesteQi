const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const Stripe = require('stripe');

// Load secret key from environment
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET; // optional, used to verify webhooks

if (!STRIPE_SECRET_KEY) {
  console.error('ERROR: STRIPE_SECRET_KEY not set in environment. See .env.example');
  process.exit(1);
}

const stripe = Stripe(STRIPE_SECRET_KEY);
const app = express();
const port = process.env.PORT || 4000;

// Simple local storage for payments (for demo/testing only)
const DATA_FILE = path.join(__dirname, 'payments.json');
function readPayments() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) || {};
  } catch (e) {
    return {};
  }
}
function writePayments(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.use(express.json());

// Endpoint to verify a Checkout Session by session_id
app.get('/verify-session', async (req, res) => {
  const sessionId = req.query.session_id;
  if (!sessionId) return res.status(400).json({ error: 'Missing session_id' });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ['payment_intent'] });

    const paid = session.payment_status === 'paid' || (session.payment_intent && session.payment_intent.status === 'succeeded');

    // Persist the paid state locally (for demo/testing)
    const payments = readPayments();
    payments[sessionId] = { paid, session, updatedAt: new Date().toISOString() };
    writePayments(payments);

    res.json({ paid, session });
  } catch (err) {
    console.error('Error verifying session:', err.message || err);
    res.status(500).json({ error: err.message || 'Internal error' });
  }
});

// Webhook endpoint to receive events from Stripe
// IMPORTANT: For raw body verification, configure the reverse proxy to not parse JSON.
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    if (STRIPE_WEBHOOK_SECRET) {
      event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
    } else {
      // If no webhook secret provided, parse the body (not secure) — only for local testing
      event = JSON.parse(req.body.toString());
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message || err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const sessionId = session.id;

    const payments = readPayments();
    payments[sessionId] = { paid: true, session, updatedAt: new Date().toISOString() };
    writePayments(payments);

    console.log('Checkout session completed and recorded:', sessionId);
  }

  res.json({ received: true });
});

// Simple endpoint to inspect stored payments (for debugging only)
app.get('/payments', (req, res) => {
  res.json(readPayments());
});

app.listen(port, () => console.log(`Stripe helper server listening on port ${port}`));
