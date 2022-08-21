let currentQuestion = 0;
let correctAnswers = 0;
showQuestion();

document.querySelector('.scoreArea button').addEventListener('click', resetQuiz);

function showQuestion() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let bar = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${bar}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;
        let options = '';
        for (i in q.options) {
            options += `<div data-op="${i}" class ="option"><span>${parseInt(i) + 1}</span>${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = options;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClick);
        });
    } else {
        finishQuiz();
    }
}

function optionClick(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if (questions[currentQuestion].answer === clickedOption) {
        correctAnswers++;
    }
    currentQuestion++;
    showQuestion();
}
function finishQuiz() {
    let score = Math.floor((correctAnswers / questions.length) * 100);

    if (score < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Que Pena!';
        document.querySelector('.scorePct').style.color = '#FF0000'
    } else if (score >= 30 && score < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bom!';
        document.querySelector('.scorePct').style.color = '#FFFF00'
    } else if (score >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabens!';
        document.querySelector('.scorePct').style.color = '#0D630D'
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${score}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = `100%`;
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    showQuestion();
}