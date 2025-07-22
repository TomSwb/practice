let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 10;

function checkGuess() {
    console.log("test");

    attempts--;

    while (attempts > 0) {
        const inputElement = document.getElementById("guess");
        const feedbackElement = document.getElementById("feedback");
        const guess = Number(inputElement.value);

        if (guess === randomNumber) {
            attempts = 0;
            feedbackElement.innerHTML = "Congratulations! You've guessed correctly!";
            feedbackElement.style.color = "green";
            break;
        } 
        else if (guess < randomNumber) {
            feedbackElement.innerHTML = `Too low. ${attempts} tries left`;
            feedbackElement.style.color = "red";
            break;
        } 
        else {
            feedbackElement.innerHTML = `Too high, ${attempts} tries left`;
            feedbackElement.style.color = "red";
            break;
        }

    if (attempts === 0, randomNumber){
        feedbackElement.style.color = "red";
        feedbackElement.innerHTML = "Game Over";
    }


    } 
}


