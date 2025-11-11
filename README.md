# 🧠 Questionário de QI Profissional

Um questionário de QI moderno e responsivo completamente gratuito com funcionalidade de partilha nas redes sociais.

## ✨ Funcionalidades

- **30 questões científicas** de lógica, matemática, raciocínio espacial e padrões
- **Timer de 20 minutos** para completar o teste
- **Resultados completamente gratuitos** com análise detalhada
- **Resultados detalhados** com análise por categoria
- **Partilha nas redes sociais** com imagem personalizada
- **Design moderno e responsivo** 
- **Navegação por teclado** (setas, números 1-4, Enter)
- **Prevenção de refresh acidental** durante o teste

## 🚀 Como Configurar

### 1. Configuração do Stripe (Pagamentos)

Se já tens a conta Stripe configurada, podes usar duas abordagens simples:

- Usar um *Payment Link* (página de pagamento hospedada pela Stripe) — mais simples, não precisa de backend;
- Usar Stripe Checkout / PaymentIntents com um backend — mais flexível e seguro para validar pagamentos via webhooks.

O projeto já está preparado para redirecionar para um *Payment Link*. As informações que fornem fornecidas foram:

- Chave pública (publishable key): `pk_live_51SS86ADIVJW2Hnoe2NFkRdHPePb18BuvhMB9MfKIWY9U8zjdeGteierYxOTKlgGALkkZ6hrXEpKLogFhkZCaKSJV00mswYJzKg`
- Chave secreta: (NÃO INSERIR NO REPOSITÓRIO) — mantem a `sk_live_...` apenas no teu servidor/ambiente seguro.
- Payment Link: `https://buy.stripe.com/4gM3cvf2cdoF41F8JW8EM00`

O `script.js` foi atualizado para usar a tua chave pública e o formulário de pagamento redireciona para o *Payment Link* (abre numa nova aba). O fluxo básico é:

1. O utilizador completa o teste e clica para pagar.
2. O `payment-form` recolhe o email e redireciona o utilizador para o URL do Stripe (hosted payment link).
3. A Stripe processa o pagamento; a página de sucesso/cancel será a definida nas configurações do Payment Link no dashboard.

Notas de segurança e melhores práticas:

- Nunca comites a chave secreta (`sk_...`) no repositório. Guarda-a apenas em variáveis de ambiente do teu servidor.
- Se precisares de validar pagamentos no teu site (por exemplo, para liberar automaticamente o resultado), cria um backend que verifique eventos via *webhooks* do Stripe. O webhook fornece garantias de que o pagamento foi realmente efetuado.
- Configura a *success_url* e *cancel_url* no Payment Link / Stripe Dashboard para apontar de volta para o teu site (ex.: `https://teu-dominio.com/success`).

Se quiseres, posso também:

- Gerar um pequeno backend (Node/Express) que valide webhooks e sinalize pedidos como pagos;
- Instruir passo-a-passo como configurar o `success_url` e testar em modo *test* antes de ir para produção.

### 2. Hospedagem

Podes hospedar este projeto em qualquer serviço de hospedagem estática:

- **GitHub Pages** (gratuito)
- **Netlify** (gratuito)
- **Vercel** (gratuito)
- **Servidor próprio**

### 3. Configuração de Domínio

Para usar um domínio personalizado:

1. Altera todas as referências a "QITestPro.com" no código
2. Atualiza os links de partilha nas redes sociais
3. Configura o domínio no teu serviço de hospedagem

## 📁 Estrutura do Projeto

```
QI/
├── index.html          # Página principal
├── style.css           # Estilos CSS
├── script.js           # Lógica principal
├── questions.js        # Base de dados de questões
└── README.md          # Este ficheiro
```

## 🎨 Personalização

### Alterar Questões

Edita o ficheiro `questions.js` para:
- Adicionar novas questões
- Modificar categorias
- Alterar explicações

### Modificar Design

Edita o ficheiro `style.css` para:
- Alterar cores (variáveis CSS no topo)
- Modificar fontes
- Ajustar espaçamentos

### Configurar Analytics

No ficheiro `script.js`, encontra a função `trackEvent()` e integra com:
- Google Analytics
- Facebook Pixel
- Outras ferramentas de análise

## 🔧 Funcionalidades Técnicas

### Questões Dinâmicas
- Questões embaralhadas a cada teste
- Respostas embaralhadas automaticamente
- Múltiplas categorias (lógica, matemática, espacial, padrões)

### Sistema de Pontuação
- Algoritmo baseado em percentagem de acertos
- Escala de QI realista (70-160)
- Análise por categoria
- Cálculo de percentil populacional

### Partilha Social
- Geração automática de imagem com html2canvas
- Links diretos para redes sociais
- Texto personalizado com pontuação
- Suporte para Web Share API (dispositivos móveis)

### Responsividade
- Layout adaptável para móvel/tablet/desktop
- Navegação otimizada para touch
- Tipografia escalável
- Animações suaves

## 📱 Compatibilidade

- **Browsers**: Chrome, Firefox, Safari, Edge (versões modernas)
- **Dispositivos**: Desktop, Tablet, Mobile
- **Sistemas**: Windows, macOS, Linux, iOS, Android

## 🔒 Segurança e Privacidade

- Dados processados localmente
- Não armazena respostas permanentemente
- Integração segura com Stripe para pagamentos
- Proteção contra refresh acidental

## 💡 Melhorias Futuras

- Backend para guardar estatísticas
- Múltiplos níveis de dificuldade  
- Sistema de utilizadores registados
- Comparação com amigos
- Certificados PDF
- Versões noutros idiomas
- Modo offline (PWA)

## 📞 Suporte

Para questões ou sugestões:
- Email: [teu-email@exemplo.com]
- Documentação: [link-para-docs]

## 📄 Licença

Este projeto é para uso educacional e comercial. Adapta conforme necessário.

---

**Criado com ❤️ para testar inteligências e divertir utilizadores!**
