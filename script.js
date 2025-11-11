// Variáveis globais
let currentQuestion = 0;
let userAnswers = [];
let startTime;
let timerInterval;
let quizStarted = false;
let paymentCompleted = false;

// Stripe configuração (substitua pela sua chave pública)
const stripe = Stripe('pk_test_51234567890'); // Substitua pela sua chave Stripe
const elements = stripe.elements();
let cardElement;

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para links de navegação
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Embaralhar questões ao carregar
    shuffleQuestions();
    
    // Embaralhar respostas de cada questão
    quizQuestions.forEach(question => shuffleAnswers(question));
});

// Iniciar o questionário
function startQuiz() {
    // Reset das variáveis
    currentQuestion = 0;
    userAnswers = [];
    quizStarted = true;
    startTime = Date.now();
    
    // Esconder landing page e mostrar quiz
    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.how-it-works').style.display = 'none';
    document.querySelector('.footer').style.display = 'none';
    document.getElementById('quiz-container').classList.remove('hidden');
    
    // Carregar primeira questão
    loadQuestion();
    
    // Iniciar timer
    startTimer();
}

// Carregar questão atual
function loadQuestion() {
    const question = quizQuestions[currentQuestion];
    
    // Atualizar barra de progresso
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `Questão ${currentQuestion + 1} de ${quizQuestions.length}`;
    
    // Carregar questão
    document.getElementById('question-title').textContent = question.question;
    
    // Limpar e carregar respostas
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer';
        answerDiv.onclick = () => selectAnswer(index);
        
        const letter = String.fromCharCode(65 + index); // A, B, C, D
        
        answerDiv.innerHTML = `
            <div class="answer-letter">${letter}</div>
            <div class="answer-text">${answer}</div>
        `;
        
        answersContainer.appendChild(answerDiv);
    });
    
    // Atualizar botões
    document.getElementById('prev-btn').disabled = currentQuestion === 0;
    
    if (currentQuestion === quizQuestions.length - 1) {
        document.getElementById('next-btn').classList.add('hidden');
        document.getElementById('finish-btn').classList.remove('hidden');
    } else {
        document.getElementById('next-btn').classList.remove('hidden');
        document.getElementById('finish-btn').classList.add('hidden');
    }
    
    // Restaurar resposta anterior se existir
    if (userAnswers[currentQuestion] !== undefined) {
        selectAnswer(userAnswers[currentQuestion], false);
    }
    
    // Habilitar/desabilitar botão próxima
    updateNextButton();
}

// Selecionar resposta
function selectAnswer(index, save = true) {
    // Remover seleção anterior
    document.querySelectorAll('.answer').forEach(answer => {
        answer.classList.remove('selected');
    });
    
    // Adicionar seleção atual
    document.querySelectorAll('.answer')[index].classList.add('selected');
    
    // Salvar resposta
    if (save) {
        userAnswers[currentQuestion] = index;
    }
    
    // Atualizar botão próxima
    updateNextButton();
}

// Atualizar estado do botão próxima
function updateNextButton() {
    const hasAnswer = userAnswers[currentQuestion] !== undefined;
    document.getElementById('next-btn').disabled = !hasAnswer;
    document.getElementById('finish-btn').disabled = !hasAnswer;
}

// Questão anterior
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

// Próxima questão
function nextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
}

// Terminar questionário
function finishQuiz() {
    // Verificar se todas as questões foram respondidas
    if (userAnswers.length < quizQuestions.length) {
        alert('Por favor, responde a todas as questões antes de terminar.');
        return;
    }
    
    // Parar timer
    clearInterval(timerInterval);
    
    // Esconder quiz e mostrar modal de pagamento
    document.getElementById('quiz-container').classList.add('hidden');
    showPaymentModal();
}

// Mostrar modal de pagamento
function showPaymentModal() {
    const modal = document.getElementById('payment-modal');
    modal.classList.remove('hidden');
    
    // Inicializar Stripe Elements se ainda não foi feito
    if (!cardElement) {
        setupStripeElements();
    }
}

// Configurar Stripe Elements
function setupStripeElements() {
    const style = {
        base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
    };

    cardElement = elements.create('card', {style});
    cardElement.mount('#card-element');

    cardElement.on('change', function(event) {
        const displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    });

    // Configurar formulário de pagamento
    const form = document.getElementById('payment-form');
    form.addEventListener('submit', handlePayment);
}

// Processar pagamento
async function handlePayment(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    
    if (!email) {
        alert('Por favor, insere o teu email.');
        return;
    }

    // Simular pagamento (em produção, usar Stripe real)
    try {
        // Aqui farias a chamada real ao Stripe
        // const result = await stripe.createPaymentMethod({...});
        
        // Simulação de sucesso
        setTimeout(() => {
            paymentCompleted = true;
            closePaymentModal();
            showResults();
        }, 2000);
        
        // Mostrar loading
        const submitBtn = event.target.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> A processar...';
        submitBtn.disabled = true;
        
    } catch (error) {
        alert('Erro no pagamento. Tenta novamente.');
        console.error('Erro no pagamento:', error);
    }
}

// Fechar modal de pagamento
function closePaymentModal() {
    document.getElementById('payment-modal').classList.add('hidden');
}

// Mostrar resultados
function showResults() {
    if (!paymentCompleted) {
        showPaymentModal();
        return;
    }

    // Calcular pontuação
    const result = calculateScore();
    
    // Mostrar container de resultados
    document.getElementById('results-container').classList.remove('hidden');
    
    // Atualizar data
    document.getElementById('test-date').textContent = new Date().toLocaleDateString('pt-PT');
    
    // Mostrar pontuação principal
    document.getElementById('final-score').textContent = result.totalScore;
    document.getElementById('score-interpretation').textContent = result.interpretation;
    
    // Mostrar análise por categoria
    updateCategoryScores(result.categoryScores);
    
    // Mostrar percentil
    document.getElementById('percentile').textContent = `${result.percentile}º`;
    document.getElementById('comparison-text').textContent = result.comparisonText;
    
    // Animar barras de progresso
    setTimeout(() => {
        animateProgressBars();
    }, 500);
}

// Calcular pontuação
function calculateScore() {
    let correctAnswers = 0;
    const categoryScores = {
        logic: { correct: 0, total: 0 },
        math: { correct: 0, total: 0 },
        spatial: { correct: 0, total: 0 },
        patterns: { correct: 0, total: 0 }
    };
    
    // Contar respostas corretas
    userAnswers.forEach((answer, index) => {
        const question = quizQuestions[index];
        const category = question.category;
        
        categoryScores[category].total++;
        
        if (answer === question.correct) {
            correctAnswers++;
            categoryScores[category].correct++;
        }
    });
    
    // Calcular QI baseado na percentagem (fórmula simplificada)
    const percentage = (correctAnswers / quizQuestions.length) * 100;
    let iqScore = Math.round(85 + (percentage * 0.45)); // Escala aproximada: 85-130
    
    // Garantir que fica dentro dos limites realistas
    iqScore = Math.max(70, Math.min(160, iqScore));
    
    // Determinar interpretação
    let interpretation, percentile, comparisonText;
    
    if (iqScore >= 140) {
        interpretation = "Génio / Superdotado";
        percentile = 99;
        comparisonText = "O teu QI está entre os 1% mais altos da população.";
    } else if (iqScore >= 130) {
        interpretation = "Inteligência Superior";
        percentile = 98;
        comparisonText = "O teu QI está entre os 2% mais altos da população.";
    } else if (iqScore >= 120) {
        interpretation = "Inteligência Acima da Média";
        percentile = 91;
        comparisonText = "O teu QI está entre os 10% mais altos da população.";
    } else if (iqScore >= 110) {
        interpretation = "Inteligência Média Alta";
        percentile = 75;
        comparisonText = "O teu QI está acima de 75% da população.";
    } else if (iqScore >= 90) {
        interpretation = "Inteligência Média";
        percentile = 50;
        comparisonText = "O teu QI está na média da população.";
    } else {
        interpretation = "Inteligência Abaixo da Média";
        percentile = 25;
        comparisonText = "O teu QI está abaixo da média populacional.";
    }
    
    return {
        totalScore: iqScore,
        interpretation,
        percentile,
        comparisonText,
        categoryScores
    };
}

// Atualizar pontuações por categoria
function updateCategoryScores(categoryScores) {
    const categories = {
        logic: { element: 'logic-score', name: 'Raciocínio Lógico' },
        math: { element: 'math-score', name: 'Matemática' },
        spatial: { element: 'spatial-score', name: 'Raciocínio Espacial' },
        patterns: { element: 'patterns-score', name: 'Padrões' }
    };
    
    const breakdownGrid = document.querySelector('.breakdown-grid');
    breakdownGrid.innerHTML = '';
    
    Object.entries(categories).forEach(([key, category]) => {
        const score = categoryScores[key];
        const percentage = Math.round((score.correct / score.total) * 100);
        
        const item = document.createElement('div');
        item.className = 'breakdown-item';
        item.innerHTML = `
            <div class="breakdown-label">${category.name}</div>
            <div class="breakdown-bar">
                <div class="breakdown-fill" data-percentage="${percentage}"></div>
            </div>
            <div class="breakdown-percentage">${percentage}%</div>
        `;
        
        breakdownGrid.appendChild(item);
    });
}

// Animar barras de progresso
function animateProgressBars() {
    const bars = document.querySelectorAll('.breakdown-fill[data-percentage]');
    bars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        setTimeout(() => {
            bar.style.width = `${percentage}%`;
        }, Math.random() * 500);
    });
}

// Timer
function startTimer() {
    const duration = 20 * 60; // 20 minutos em segundos
    let timeLeft = duration;
    
    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        document.getElementById('timer').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Tempo esgotado! O teste será enviado automaticamente.');
            finishQuiz();
        }
        
        timeLeft--;
    }, 1000);
}

// Partilhar resultados
function shareResults() {
    if (navigator.share) {
        navigator.share({
            title: 'O Meu Resultado do Teste de QI',
            text: `Acabei de fazer um teste de QI e obtive ${document.getElementById('final-score').textContent} pontos!`,
            url: window.location.href
        });
    } else {
        // Fallback para browsers que não suportam Web Share API
        const text = `Acabei de fazer um teste de QI e obtive ${document.getElementById('final-score').textContent} pontos! Testa o teu em: ${window.location.href}`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
            alert('Link copiado para a área de transferência!');
        } else {
            // Mostrar modal com links de partilha
            showShareModal();
        }
    }
}

// Mostrar modal de partilha
function showShareModal() {
    const score = document.getElementById('final-score').textContent;
    const text = encodeURIComponent(`Acabei de fazer um teste de QI e obtive ${score} pontos! Testa o teu em:`);
    const url = encodeURIComponent(window.location.href);
    
    const shareModal = document.createElement('div');
    shareModal.className = 'modal';
    shareModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Partilhar Resultado</h2>
                <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="share-buttons" style="display: grid; gap: 1rem;">
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}" target="_blank" class="btn btn-primary">
                        <i class="fab fa-facebook"></i> Partilhar no Facebook
                    </a>
                    <a href="https://twitter.com/intent/tweet?text=${text}&url=${url}" target="_blank" class="btn btn-primary">
                        <i class="fab fa-twitter"></i> Partilhar no Twitter
                    </a>
                    <a href="https://wa.me/?text=${text} ${url}" target="_blank" class="btn btn-primary">
                        <i class="fab fa-whatsapp"></i> Partilhar no WhatsApp
                    </a>
                    <a href="https://www.linkedin.com/sharing/share-offsite/?url=${url}" target="_blank" class="btn btn-primary">
                        <i class="fab fa-linkedin"></i> Partilhar no LinkedIn
                    </a>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(shareModal);
}

// Descarregar imagem do resultado
function downloadImage() {
    const element = document.getElementById('results-for-sharing');
    
    // Configurar html2canvas
    html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        width: element.offsetWidth,
        height: element.offsetHeight
    }).then(canvas => {
        // Criar link de download
        const link = document.createElement('a');
        link.download = `meu-qi-${document.getElementById('final-score').textContent}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }).catch(error => {
        console.error('Erro ao gerar imagem:', error);
        alert('Erro ao gerar imagem. Tenta novamente.');
    });
}

// Reiniciar questionário
function restartQuiz() {
    if (confirm('Tens a certeza que queres fazer um novo teste?')) {
        // Reset de todas as variáveis
        currentQuestion = 0;
        userAnswers = [];
        quizStarted = false;
        paymentCompleted = false;
        
        // Reembaralhar questões
        shuffleQuestions();
        quizQuestions.forEach(question => shuffleAnswers(question));
        
        // Mostrar landing page
        document.getElementById('results-container').classList.add('hidden');
        document.querySelector('.hero').style.display = 'block';
        document.querySelector('.how-it-works').style.display = 'block';
        document.querySelector('.footer').style.display = 'block';
        
        // Scroll para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Event listeners para teclas
document.addEventListener('keydown', function(e) {
    if (!quizStarted || document.getElementById('quiz-container').classList.contains('hidden')) {
        return;
    }
    
    // Teclas numéricas 1-4 para selecionar respostas
    if (e.key >= '1' && e.key <= '4') {
        const answerIndex = parseInt(e.key) - 1;
        if (answerIndex < quizQuestions[currentQuestion].answers.length) {
            selectAnswer(answerIndex);
        }
    }
    
    // Setas para navegação
    if (e.key === 'ArrowLeft' && currentQuestion > 0) {
        previousQuestion();
    } else if (e.key === 'ArrowRight' && currentQuestion < quizQuestions.length - 1 && userAnswers[currentQuestion] !== undefined) {
        nextQuestion();
    }
    
    // Enter para próxima/terminar
    if (e.key === 'Enter' && userAnswers[currentQuestion] !== undefined) {
        if (currentQuestion === quizQuestions.length - 1) {
            finishQuiz();
        } else {
            nextQuestion();
        }
    }
});

// Prevenir refresh acidental durante o teste
window.addEventListener('beforeunload', function(e) {
    if (quizStarted && !document.getElementById('quiz-container').classList.contains('hidden')) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
});

// Analytics simples (opcional)
function trackEvent(eventName, data = {}) {
    // Aqui podes integrar com Google Analytics ou outro serviço
    console.log('Event:', eventName, data);
}

// Tracking de eventos importantes
document.addEventListener('DOMContentLoaded', () => {
    trackEvent('page_loaded');
});

window.addEventListener('load', () => {
    trackEvent('page_fully_loaded');
});
