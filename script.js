const quotes = [
    'Things are only impossible until they are not',
    'It is possible to commit no errors and still lose. That is not a weakness. That is life',
    'There is a way out of every box, a solution to every puzzle; it is just a matter of finding it.',
    'Without freedom of choice there is no creativity',
    'Logic is the beginning of wisdom, not the end',
    'Improve a mechanical device and you may double productivity. But improve yourself, you gain a thousandfold',
    'Compassion: that is the one thing no machine ever had. Maybe it is the one thing that keeps us ahead of them.',
];

const quote = document.getElementById('quote');
const input = document.getElementById('typed-value');
const start = document.getElementById('start');
const message = document.getElementById('message');

let wordQueue;
let highlightPosition;
let startTime;


function startGame(){
    console.log("Game started");
    document.body.className = "";
    start.className = "started";

    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quoteText = quotes[quoteIndex];

    // quoteText = "type me";
    wordQueue = quoteText.split(' ');
    quote.innerHTML = wordQueue.map(word => (`<span>${word}</span>`)).join('');

    highlightPosition = 0;
    quote.childNodes[highlightPosition].className = 'highlight';

    startTime = new Date().getTime();
}
start.addEventListener('click', startGame);
input.addEventListener('input', checkInput);

function checkInput() {
    console.log("Checking", input.value);
    const currentWord = wordQueue[0].replaceAll(".", "").replaceAll(",", "");
    const typedValue = input.value.trim();

    if(currentWord !== typedValue){
        input.className = currentWord.startsWith(typedValue) ? "" : "error";
        return;
    }
    wordQueue.shift();
    input.value = "";

    quote.childNodes[highlightPosition].className = "";

    if(wordQueue.length === 0){
        gameOver();
        return;
    }
    highlightPosition++;
    quote.childNodes[highlightPosition].className = 'highlight';
}

function gameOver(){
    const elapsedTime = new Date().getTime() - startTime;
    document.body.className = "winner";
    message.innerHTML = `<span class="congrats">Congratulations!</span>
    <br>
    You finished in ${elapsedTime/1000} seconds`;

}

 const lastScoreItem = scores.pop();
    lastScoreItem.milliseconds = elapsedTime;
    scores.push(lastScoreItem);
    saveScores();

    //clear out the list
    while(scoresUnorderedList.firstChild){
        scoresUnorderedList.removeChild(scoresUnorderedList.firstChild);
    }

    
    //get from localStorage
    let scoreArr = getScores();
    //get current score
    let currentScore = scoreArr.pop();
    let topScore = getTopScore(scoreArr);
    //take out any scores that were 0
    scoreArr = scoreArr.filter(function( obj ) {
        return obj.milliseconds !== 0;
    });


    //add current score to li at top
    const liCurrentItem = createElementForScore(currentScore, "Your score: ");
    scoresUnorderedList.appendChild(liCurrentItem);

    //add fastest score to li's
    const liTopScore = createElementForScore(topScore, "The Top Score is: ");
    scoresUnorderedList.appendChild(liTopScore);
    //Remove old for loop to avoid really long list of scores
    // for(let score of getScores()){
        //removed logic here
    // 



function getTopScore(scoreArr) {
    //get fastest score
    // let topScore = Math.min(...scoreArr.map(item => item.milliseconds))
    let topScore = scoreArr.reduce(function(prev, current) {
        return (prev.milliseconds < current.milliseconds) ? prev : current
    }) //returns object
    console.log("topScore is", topScore);
    return topScore;
}

function getScores(){
    const noScoreFound = "[]";
    const scoresJSON = localStorage.getItem('scores') || noScoreFound;
    let scoreArr =  JSON.parse(scoresJSON);
    //take out any scores that are 0
    scoreArr = scoreArr.filter(function( obj ) {
        return obj.milliseconds !== 0;
    });
    return scoreArr;
}

function saveScores(){
    const data = JSON.stringify(scores);
    localStorage.setItem('scores', data);
}

function createElementForScore(score, scoreMessage){
    const template = document.getElementById("score-item-template");
    const newListItem = template.content.cloneNode(true);

    const text = newListItem.querySelector(".score-text");
    text.innerHTML = scoreMessage + " " + score.name + " in " + score.milliseconds/1000 + " seconds.";
    return newListItem;
}

function initializeGame() {
    quote.innerHTML = '';
    message.innerHTML = '';

    let topScore = getTopScore(scores);
    console.log("top score", topScore);
    const liTopScore = createElementForScore(topScore, "The Top Score is: ");
    scoresUnorderedList.appendChild(liTopScore);
}
