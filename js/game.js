document.addEventListener('DOMContentLoaded', () => {
    const N = 4;
    const examples = Array.from({ length: 10 }, (_, i) => ({ question: `${N} × ${i + 1}`, answer: N * (i + 1) }));
    let currentExampleIndex = 0;

    const submitBtn = document.getElementById("submit-btn");
    const cubesContainer = document.querySelector(".cubes-container");
    const exampleContainer = document.querySelector(".example-container");

    function addCubes(answer) {
        const cubesToAdd = answer - cubesContainer.children.length;
        if (cubesToAdd > 0) {
            const fragment = document.createDocumentFragment();
            for (let i = 0; i < cubesToAdd; i++) {
                const cube = document.createElement("div");
                cube.classList.add("cube");
                fragment.appendChild(cube);
            }
            cubesContainer.appendChild(fragment);
            setTimeout(() => {
                const cubes = cubesContainer.querySelectorAll('.cube');
                cubes.forEach((cube) => {
                    cube.style.animation = `fall 0.5s ease-out 0s forwards`;
                });
            }, 100);
        }
    }

    function nextExample() {
        if (currentExampleIndex < examples.length) {
            const example = examples[currentExampleIndex];
            const newExampleDiv = document.createElement("div");
            newExampleDiv.classList.add("example");

            const exampleText = document.createElement("div");
            exampleText.classList.add("example-text");
            exampleText.textContent = example.question + " = ";
        
            const newInputField = document.createElement("input");
            newInputField.type = "number";
            newInputField.classList.add("answer-input");
            newInputField.setAttribute("data-answer", example.answer);
            newExampleDiv.append(exampleText, newInputField);
        
            exampleContainer.appendChild(newExampleDiv);
        
            newExampleDiv.style.opacity = 0;
            setTimeout(() => {
                newExampleDiv.style.opacity = 1;
                newExampleDiv.style.transition = 'opacity 0.5s ease-in';
            }, 0);
        
            newInputField.addEventListener("input", () => {
                submitBtn.disabled = !newInputField.value.trim();
            });
        
            addCubes(example.answer);
            newInputField.focus();
            currentExampleIndex++;
        }
    }

    function handleAnswerSubmit() {
        const currentInputField = document.querySelector(".answer-input");
        const correctAnswer = parseInt(currentInputField.getAttribute("data-answer"));
        const userAnswer = parseInt(currentInputField.value);
    
        if (userAnswer === correctAnswer) {
            submitBtn.classList.remove("wrong");
            submitBtn.classList.add("right");
            currentInputField.replaceWith(document.createTextNode(correctAnswer));
        
            setTimeout(() => {
                addCubes(correctAnswer);
                nextExample();
                submitBtn.classList.remove("right");
                submitBtn.disabled = true;
            }, 500);
        } else {
            submitBtn.classList.add("wrong");
            currentInputField.style.color = "red";
        
            setTimeout(() => {
                submitBtn.classList.remove("wrong");
                currentInputField.style.color = "black";
            }, 1000);
        }
    }

    function initializeGame() {
        nextExample();
        submitBtn.disabled = true;
    }

    submitBtn.addEventListener("click", handleAnswerSubmit);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !submitBtn.disabled) {
            handleAnswerSubmit();
        }
    });

    submitBtn.addEventListener('mouseover', () => {
        if (!submitBtn.disabled) submitBtn.style.backgroundColor = '#AFEEEE';
    });

    submitBtn.addEventListener('mouseout', () => {
        if (!submitBtn.disabled) submitBtn.style.backgroundColor = submitBtn.classList.contains("right") ? "#228B22" : "#A9A9A9";
    });

    initializeGame();
});