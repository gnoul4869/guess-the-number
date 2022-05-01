'use strict';

let number = 0;
let score = 0;
let highscore = 0;

const numberSelector = document.querySelector('.number');
const guessSelector = document.querySelector('.guess');
const messageSelector = document.querySelector('.message');
const scoreSelector = document.querySelector('.score');
const highscoreSelector = document.querySelector('.highscore');

const reduceScore = (value) => {
    const newScore = score - value;
    score = newScore > 0 ? newScore : 0;
    scoreSelector.textContent = score;
};

const freshStart = () => {
    number = Math.floor(Math.random() * 20) + 1;
    score = 100;
    scoreSelector.textContent = score;
    numberSelector.textContent = '?';
    guessSelector.value = '';
    messageSelector.textContent = 'Guess the number!';
    messageSelector.style.color = '#eee';
};

document.querySelector('.again').addEventListener('click', freshStart);

document.querySelector('.check').addEventListener('click', function () {
    if (score === 0) {
        messageSelector.textContent = 'Click AGAIN to play!';
        messageSelector.style.color = 'orange';
        return;
    }

    const value = Number(guessSelector.value);

    // No input
    if (!value) {
        messageSelector.textContent = 'Please enter a number!';
        messageSelector.style.color = 'red';
        return;
    }

    // Check number
    if (value !== number) {
        if (Math.abs(value - number) < 5) {
            reduceScore(10);
            messageSelector.textContent = 'You are close!';
        } else {
            reduceScore(20);
            messageSelector.textContent = 'You are far!';
        }
    } else {
        numberSelector.textContent = number;
        numberSelector.style.color = 'green';
        messageSelector.textContent = 'Correct number';
        messageSelector.style.color = 'green';
        if (score > highscore || highscore === 0) {
            highscore = score;
            highscoreSelector.textContent = highscore;
        }
    }

    if (score === 0) {
        messageSelector.textContent = 'Game over!';
    }
});

freshStart();
