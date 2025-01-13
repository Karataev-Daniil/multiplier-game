document.addEventListener('DOMContentLoaded', () => {
    const examples = [
        { multiplier: 3, number: 3 },
        { multiplier: 5, number: 7 },
        { multiplier: 2, number: 7 },
        { multiplier: 7, number: 2 },
        { multiplier: 4, number: 6 }
    ];

    let currentExampleIndex = 0;
    const maxExampleIndex = examples.length - 1;
    
    const example = document.getElementById('example');
    const answerInput = document.getElementById('answer');
    const submitButton = document.getElementById('submit');
    const cubeContainer = document.getElementById('cubeContainer');
    const hintButton = document.getElementById('hintButton');
    const currentExample = document.getElementById('currentExample');
    const nextExample = document.getElementById('nextExample');
    const prevExampleBtn = document.getElementById('prevExample');
    const nextExampleBtn = document.getElementById('nextExampleBtn');

    let currentState = null;

    function updateExamples() {
        const current = examples[currentExampleIndex];

        const exampleText = document.createElement('span');
        exampleText.id = 'exampleText';
        exampleText.textContent = `${current.number} × ${current.multiplier} = ?`;

        const oldExampleText = document.getElementById('exampleText');
        if (oldExampleText) {
            oldExampleText.classList.remove('show');
        }

        example.innerHTML = ''; 
        example.appendChild(exampleText);

        setTimeout(() => {
            exampleText.classList.add('show');
        }, 10);

        currentExample.textContent = `Current: ${current.number} × ${current.multiplier} = ?`;
        nextExample.textContent = `Next: ${examples[currentExampleIndex + 1] ? `${examples[currentExampleIndex + 1].number} × ${examples[currentExampleIndex + 1].multiplier} = ?` : 'End'}`;

        if (currentState === 0) {
            cubeContainer.innerHTML = '';
        }

        if (currentState !== null) {
            setTimeout(() => {
                currentState = null;
                submitButton.classList.remove('correct', 'wrong');
                answerInput.classList.remove('invalid');
                answerInput.value = '';
                updateExamples();
            }, 1000);
        }
    }

    function createHintCubes(rows, cubesPerRow) {
        cubeContainer.innerHTML = '';
        for (let i = 0; i < rows; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < cubesPerRow; j++) {
                const cube = document.createElement('div');
                cube.classList.add('cube');
                row.appendChild(cube);
            }
            cubeContainer.appendChild(row);
        }
    }

    function checkAnswer() {
        const current = examples[currentExampleIndex];
        const userAnswer = parseInt(answerInput.value, 10);
        const correctAnswer = current.number * current.multiplier;

        if (userAnswer === correctAnswer) {
            submitButton.classList.add('correct');
            currentState = 0;

            const exampleText = document.getElementById('exampleText');
            exampleText.textContent = `${current.number} × ${current.multiplier} = ${userAnswer}`;

            setTimeout(() => {
                if (currentExampleIndex < maxExampleIndex) {
                    currentExampleIndex++;
                }
                updateExamples();
            }, 1000);
        } else {
            submitButton.classList.add('wrong');
            answerInput.classList.add('invalid');
            hintButton.classList.add('hint-highlight');
            setTimeout(() => {
                hintButton.classList.remove('hint-highlight');
            }, 1000); 
            currentState = 1;
            updateExamples();
        }
    }

    prevExampleBtn.addEventListener('click', () => {
        if (currentExampleIndex > 0) {
            currentExampleIndex--;
            currentState = null;
            updateExamples();
        }
    });

    nextExampleBtn.addEventListener('click', () => {
        if (currentExampleIndex < maxExampleIndex) {
            currentExampleIndex++;
            currentState = null;
            updateExamples();
        }
    });

    answerInput.addEventListener('input', () => {
        submitButton.disabled = !answerInput.value;
    });

    submitButton.addEventListener('click', () => {
        checkAnswer();
    });

    hintButton.addEventListener('click', () => {
        const current = examples[currentExampleIndex];
        const rows = current.multiplier; 
        const cubesPerRow = current.number;
        createHintCubes(rows, cubesPerRow);
    });

    updateExamples();
});
