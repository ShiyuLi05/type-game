'use strict';

import {onEvent, select} from './utils.js';
// Getting Random Words Function
function randomizer(array) {
    for(let i = 0; i <= array.length; i++) {
        let randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }
}
// Ready Set Go Timer Function
function readySetGo(countdown) {
    const countdownTime = setInterval(() =>  {
        countDownMusic.play();
        wordDisplay.style.color = '#C44F69';
        wordDisplay.innerText = --countdown;

        if(countdown == 0) {
            wordDisplay.innerText = randomWord;
            clearInterval(countdownTime);
        }
    }, 1000);
    startBtn.disabled = true;
    wordInput.disabled = true;
}

// Running Timer Function
function timer(timeLeft) {
    const timer = setInterval(() => {
        timeDisplay.innerHTML = `<i class="fa-solid fa-clock"></i> ${--timeLeft} seconds`;

        if(timeLeft == 0) {
            music.pause();
            wordDisplay.innerText = 'Time\'s up';
            wordDisplay.style.color = '#C44F69';
            startBtn.disabled = true;
            wordInput.disabled = true;
            clearInterval(timer);
            startBtn.style.visibility = 'visible';
            startBtn.innerText = 'Play Again';
            wordInput.value = '';
            startBtn.disabled = false;
            createScore();
        }
    }, 1000);
}

// Validation Function
function validate(words) {
    onEvent('keyup', wordInput, () => {
        if(wordInput.value == randomWord) {
            const index = words.indexOf(randomWord);
            words.splice(index, 1);
            wordInput.style.border = 'solid #2dc937';
            pointsDisplay.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${points += 1} points`;
            wordInput.value = '';
            wordDisplay.innerText = randomWord = randomizer(words);
            light.style.cssText = 'background-color:#2dc937; top:62%;'
        } else if (wordInput.value.length < randomWord.length){
            light.style.cssText = 'background-color:#e7b416; top:37%;'
            wordInput.style.border = 'solid #e7b416';
        } else {
            light.style.cssText = 'background-color:#cc3232; top:12%;'
            wordInput.style.border = 'solid #cc3232';
        }
    });
}

// Start Game Function
function startGame() {
    music.play();
    wordDisplay.style.color = '#2F4858';
    timer(timeLeft);
    startBtn.disabled = true;
    wordInput.disabled = false;
    wordInput.focus();
    startBtn.style.visibility = 'hidden';
}

const words = [
    'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population',
    'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute',
    'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
    'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy',
    'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
    'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency',
    'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
    'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
    'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music',
    'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
    'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
    'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
    'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
    'keyboard', 'window'
];

const wordDisplay = select('.word-display');
const timeDisplay = select('.time-display');
const pointsDisplay = select('.points-display');
const startBtn = select('.start-btn');
const wordInput = select('.word-input');
const dialog = select('dialog');
const light = select('.red');
const music = new Audio('./assets/audio/music.mp3');
music.type = 'audio.mp3';
const countDownMusic = new Audio('./assets/audio/countdown.mp3');
countDownMusic.type = 'audio.mp3';


// GAME SETUP
let timeLeft = 100;
let countdown = 4;
let points = 0;
let randomWord = randomizer(words);
wordInput.value = '';
wordInput.disabled = true;
dialog.showModal();

// EVENT LISTENERS
onEvent('click', dialog, function() {
    dialog.close();
});

onEvent('click', startBtn, () => {
    readySetGo(countdown);

    setTimeout(() => {
        startGame();
        validate(words);
    }, 4000);
});
