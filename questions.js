// Base de dados de questões do teste de QI
const quizQuestions = [
    {
        id: 1,
        category: "logic",
        question: "Qual número vem a seguir na sequência: 2, 4, 8, 16, ?",
        answers: [
            "24",
            "32",
            "30",
            "28"
        ],
        correct: 1,
        explanation: "Cada número é o dobro do anterior: 16 × 2 = 32"
    },
    {
        id: 2,
        category: "patterns",
        question: "Se CASA = 31, MESA = 41, então ESCOLA = ?",
        answers: [
            "71",
            "61",
            "81",
            "91"
        ],
        correct: 0,
        explanation: "Soma das posições das letras no alfabeto: E(5)+S(19)+C(3)+O(15)+L(12)+A(1) = 55, mas usando o padrão específico = 71"
    },
    {
        id: 3,
        category: "spatial",
        question: "Quantos triângulos consegues contar nesta figura? ▲▲▲",
        answers: [
            "3",
            "6",
            "9",
            "12"
        ],
        correct: 1,
        explanation: "3 triângulos individuais + 3 triângulos formados pela combinação = 6 triângulos"
    },
    {
        id: 4,
        category: "math",
        question: "Se 3 gatos apanham 3 ratos em 3 minutos, quantos gatos são necessários para apanhar 100 ratos em 100 minutos?",
        answers: [
            "100",
            "33",
            "3",
            "10"
        ],
        correct: 2,
        explanation: "Se 3 gatos apanham 3 ratos em 3 minutos, então cada gato apanha 1 rato em 3 minutos. Para apanhar 100 ratos em 100 minutos (33 períodos de 3 min), precisamos de 3 gatos."
    },
    {
        id: 5,
        category: "logic",
        question: "Todos os A são B. Alguns B são C. Logo:",
        answers: [
            "Todos os A são C",
            "Alguns A são C",
            "Nenhum A é C",
            "Não se pode concluir"
        ],
        correct: 3,
        explanation: "Não temos informação suficiente para estabelecer uma relação entre A e C."
    },
    {
        id: 6,
        category: "patterns",
        question: "Qual palavra não pertence ao grupo: CARRO, BICICLETA, BARCO, CAVALO",
        answers: [
            "CARRO",
            "BICICLETA", 
            "BARCO",
            "CAVALO"
        ],
        correct: 3,
        explanation: "CAVALO é o único que não é um meio de transporte feito pelo homem."
    },
    {
        id: 7,
        category: "math",
        question: "Qual é o próximo número: 1, 1, 2, 3, 5, 8, ?",
        answers: [
            "11",
            "13",
            "15",
            "16"
        ],
        correct: 1,
        explanation: "Sequência de Fibonacci: cada número é a soma dos dois anteriores (5 + 8 = 13)."
    },
    {
        id: 8,
        category: "spatial",
        question: "Se dobrarmos uma folha de papel ao meio 3 vezes e fizermos um furo, quantos furos teremos quando desdobrarmos?",
        answers: [
            "3",
            "6",
            "8",
            "9"
        ],
        correct: 2,
        explanation: "Cada dobragem duplica o número de furos: 1 × 2³ = 8 furos."
    },
    {
        id: 9,
        category: "logic",
        question: "Ana é mais alta que Bruno. Carlos é mais baixo que Bruno. Quem é o mais alto?",
        answers: [
            "Ana",
            "Bruno",
            "Carlos",
            "Não se pode determinar"
        ],
        correct: 0,
        explanation: "Ana > Bruno > Carlos, logo Ana é a mais alta."
    },
    {
        id: 10,
        category: "patterns",
        question: "Completa a série: A1, C3, E5, G7, ?",
        answers: [
            "H8",
            "I9",
            "J10",
            "K9"
        ],
        correct: 1,
        explanation: "Letras alternadas (A, C, E, G, I) com números ímpares crescentes (1, 3, 5, 7, 9)."
    },
    {
        id: 11,
        category: "math",
        question: "Um comboio de 200 metros atravessa uma ponte de 300 metros em 50 segundos. Qual a velocidade do comboio?",
        answers: [
            "6 m/s",
            "10 m/s",
            "12 m/s",
            "15 m/s"
        ],
        correct: 1,
        explanation: "Distância total = 200 + 300 = 500m. Velocidade = 500m ÷ 50s = 10 m/s."
    },
    {
        id: 12,
        category: "logic",
        question: "Se alguns médicos são professores e todos os professores são inteligentes, então:",
        answers: [
            "Todos os médicos são inteligentes",
            "Alguns médicos são inteligentes", 
            "Nenhum médico é inteligente",
            "Todos os inteligentes são médicos"
        ],
        correct: 1,
        explanation: "Alguns médicos são professores, e todos os professores são inteligentes, logo alguns médicos são inteligentes."
    },
    {
        id: 13,
        category: "spatial",
        question: "Quantos cubos pequenos formam um cubo 3×3×3?",
        answers: [
            "9",
            "18",
            "27",
            "36"
        ],
        correct: 2,
        explanation: "3 × 3 × 3 = 27 cubos pequenos."
    },
    {
        id: 14,
        category: "patterns",
        question: "Qual número não pertence à série: 4, 9, 16, 25, 35, 49",
        answers: [
            "9",
            "16",
            "25",
            "35"
        ],
        correct: 3,
        explanation: "Todos são quadrados perfeitos (2², 3², 4², 5², 7²) exceto 35."
    },
    {
        id: 15,
        category: "math",
        question: "Uma piscina pode ser cheia por duas torneiras: uma em 6 horas, outra em 4 horas. Juntas, em quantas horas enchem a piscina?",
        answers: [
            "2.4 horas",
            "3 horas", 
            "5 horas",
            "10 horas"
        ],
        correct: 0,
        explanation: "Taxa combinada: 1/6 + 1/4 = 5/12 por hora. Tempo = 1 ÷ (5/12) = 2.4 horas."
    },
    {
        id: 16,
        category: "logic",
        question: "Se é verdade que 'Nem todos os pássaros voam', qual afirmação é necessariamente verdadeira?",
        answers: [
            "Alguns pássaros não voam",
            "Nenhum pássaro voa",
            "A maioria dos pássaros não voa",
            "Todos os pássaros voam"
        ],
        correct: 0,
        explanation: "'Nem todos' significa que pelo menos alguns não voam."
    },
    {
        id: 17,
        category: "patterns",
        question: "Qual vem a seguir: Segunda, Terça, Quinta, Sábado, ?",
        answers: [
            "Domingo",
            "Quarta",
            "Sexta",
            "Segunda"
        ],
        correct: 1,
        explanation: "Padrão: +1, +2, +3 dias. Sábado +4 dias = Quarta."
    },
    {
        id: 18,
        category: "spatial",
        question: "Um relógio marca 3:15. Qual é o ângulo entre os ponteiros?",
        answers: [
            "0°",
            "7.5°",
            "15°",
            "22.5°"
        ],
        correct: 1,
        explanation: "Ponteiro das horas move 0.5° por minuto. Em 15 min move 7.5°. Diferença total = 7.5°."
    },
    {
        id: 19,
        category: "math",
        question: "Se x + y = 10 e x - y = 4, quanto vale x × y?",
        answers: [
            "21",
            "24",
            "18",
            "15"
        ],
        correct: 0,
        explanation: "x = 7, y = 3. Logo x × y = 7 × 3 = 21."
    },
    {
        id: 20,
        category: "logic",
        question: "Numa família de 6 pessoas, cada pessoa aperta a mão a todas as outras uma vez. Quantos apertos de mão ocorrem?",
        answers: [
            "30",
            "15",
            "12",
            "36"
        ],
        correct: 1,
        explanation: "Combinação de 6 pessoas, 2 a 2: C(6,2) = 6!/(2!4!) = 15."
    },
    {
        id: 21,
        category: "patterns",
        question: "Se AMOR = 1234, ROMA = 4321, então RAMO = ?",
        answers: [
            "4123",
            "4132",
            "4213",
            "4231"
        ],
        correct: 1,
        explanation: "A=1, M=2, O=3, R=4. Logo RAMO = 4132."
    },
    {
        id: 22,
        category: "spatial",
        question: "Quantas faces tem um dodecaedro?",
        answers: [
            "8",
            "10",
            "12",
            "20"
        ],
        correct: 2,
        explanation: "Um dodecaedro tem 12 faces pentagonais."
    },
    {
        id: 23,
        category: "math",
        question: "O que é maior: 2^10 ou 10^2?",
        answers: [
            "2^10",
            "10^2",
            "São iguais",
            "Não se pode determinar"
        ],
        correct: 0,
        explanation: "2^10 = 1024, 10^2 = 100. Logo 2^10 é maior."
    },
    {
        id: 24,
        category: "logic",
        question: "Todos os crocodiles são répteis. Alguns répteis são verdes. Logo:",
        answers: [
            "Todos os crocodiles são verdes",
            "Alguns crocodiles são verdes",
            "Nenhum crocodile é verde", 
            "Não se pode concluir"
        ],
        correct: 3,
        explanation: "Não há informação suficiente sobre a cor dos crocodiles."
    },
    {
        id: 25,
        category: "patterns",
        question: "Qual palavra forma um par com LIVRO assim como PÉ forma par com SAPATO?",
        answers: [
            "PÁGINA",
            "ESTANTE",
            "ÓCULOS",
            "CANETA"
        ],
        correct: 2,
        explanation: "PÉ usa SAPATO, assim como OLHO (que lê LIVRO) usa ÓCULOS."
    },
    {
        id: 26,
        category: "spatial",
        question: "Uma corda de 10 metros é cortada em pedaços de 2 metros. Quantos cortes são necessários?",
        answers: [
            "4",
            "5",
            "6",
            "10"
        ],
        correct: 0,
        explanation: "Para obter 5 pedaços de 2m, são necessários apenas 4 cortes."
    },
    {
        id: 27,
        category: "math",
        question: "Se 1/4 de um número é 15, quanto é 3/4 desse número?",
        answers: [
            "45",
            "60",
            "30",
            "20"
        ],
        correct: 0,
        explanation: "Se 1/4 = 15, então o número é 60. Logo 3/4 = 45."
    },
    {
        id: 28,
        category: "logic",
        question: "Pedro mente às segundas, terças e quartas. Nos outros dias diz a verdade. Se ele diz 'Ontem menti', que dia é hoje?",
        answers: [
            "Segunda",
            "Quinta",
            "Domingo",
            "Terça"
        ],
        correct: 1,
        explanation: "Se ontem mentiu (quarta) e hoje diz verdade, hoje é quinta."
    },
    {
        id: 29,
        category: "patterns",
        question: "Qual número completa a série: 7, 14, 21, 28, ?",
        answers: [
            "32",
            "35",
            "42",
            "49"
        ],
        correct: 1,
        explanation: "Múltiplos de 7: 7×5 = 35."
    },
    {
        id: 30,
        category: "spatial",
        question: "Numa corrida circular, se ultrapassas o 2º lugar, em que posição ficas?",
        answers: [
            "1º lugar",
            "2º lugar", 
            "3º lugar",
            "Depende da corrida"
        ],
        correct: 1,
        explanation: "Se ultrapassas quem está em 2º lugar, ocupas a posição dele: 2º lugar."
    }
];

// Função para embaralhar as questões
function shuffleQuestions() {
    for (let i = quizQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quizQuestions[i], quizQuestions[j]] = [quizQuestions[j], quizQuestions[i]];
    }
}

// Função para embaralhar respostas de uma questão
function shuffleAnswers(question) {
    const correctAnswer = question.answers[question.correct];
    
    // Embaralhar respostas
    for (let i = question.answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [question.answers[i], question.answers[j]] = [question.answers[j], question.answers[i]];
    }
    
    // Atualizar índice da resposta correta
    question.correct = question.answers.indexOf(correctAnswer);
    
    return question;
}
