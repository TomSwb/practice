const question = ["What planet is known as the 'Red Planet'?", "Who painted the Mona Lisa?"];
const choicesArray = [["Earth", "Mars", "Jupiter", "Venus"], ["DaVinci", "Picasso", "VinGogh", "Turner"]];
const correctAnswers = ["Mars", "DaVinci"];
let currentQuestionIndex = 0;
let score = 0;

function displayQuestion() {
    if (currentQuestionIndex < question.length) {
        document.getElementById('question').innerHTML = question[currentQuestionIndex];

        for (let i = 0; i < 4; i++) {
            const btn = document.getElementById(`choice${i+1}`);
            btn.innerHTML = choicesArray[currentQuestionIndex][i];
            btn.value = choicesArray[currentQuestionIndex][i];
            btn.disabled = false; // Re-enable buttons for new question
            btn.style.display = 'inline-block'; // Make sure buttons are visible
        }
    } else {
        // Quiz is finished
        document.getElementById('question').innerHTML = "";
        document.getElementById('result').innerHTML = "You scored " + score + " out of " + question.length;
        
        // Hide all buttons when quiz is finished
        for(let i = 1; i <= 4; i++){
            const btn = document.getElementById(`choice${i}`);
            btn.style.display = 'none';
        }
    }
}

function checkAnswer(button) {
    if (button.value === correctAnswers[currentQuestionIndex]) {
        score++;
    }
    
    // Disable all buttons after an answer is selected
    for(let i = 1; i <= 4; i++){
        document.getElementById(`choice${i}`).disabled = true;
    }
    
    currentQuestionIndex++;
    
    // Add a small delay before showing next question for better UX
    setTimeout(() => {
        displayQuestion();
    }, 500);
}

// Start the quiz when the page loads
displayQuestion();