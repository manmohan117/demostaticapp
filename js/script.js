// result variable to store the result output!. 
var ans;
var result;
var turns = 5;
var tries = 0;
// generating a random number and storing it in ans variable.

//fucntion to initialize game variable with default values;
function startGame()
{
     ans = Math.floor(Math.random()*100);
     result = "Wrong Guess TryAgain!!";
     resetGame();
}

startGame();

console.log(ans);

function checkGuess(){
    tries++;
    var number = document.getElementById("number-input-js").value;
    console.log(number);
    if (isNaN(number))
    {
        result = "Enter the Numerical Value";
    }
    else if(number > ans)
    {
        result = "High";
    }
    else if(number < ans)
    {
        result = "low";
    }
    else if(number == ans)
    {
        result = "Correct you won!"
    }
    showResult();
}
function showResult(){
    document.getElementById("result-js").innerText = result;
    document.getElementById("tries-js").innerText = tries;

}

function resetGame()
{
    result ="";
    tries = 0;
    document.getElementById("result-js").innerText = result;
    document.getElementById("tries-js").innerText = tries;
}