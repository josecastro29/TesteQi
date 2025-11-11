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

Para ativar os pagamentos, precisas de:

1. Criar uma conta no [Stripe](https://stripe.com)
2. Obter as tuas chaves API (pública e secreta)
3. No ficheiro `script.js`, substitui a linha:
   ```javascript
   const stripe = Stripe('pk_test_51234567890'); // Substitua pela sua chave Stripe
   ```
   pela tua chave pública real.

4. Para um sistema de pagamento completo, precisarás de um backend para processar os pagamentos. Por agora, o sistema simula o pagamento.

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
