import fiveLetterWords from '../constants/fiveLetterWords.json';
import { MAX_GUESSES } from '../constants/gameConstants';

export const getInitialBoard = (): string[][] => {
  const board: string[][] = [];
  for (let i = 0; i < 6; i++) {
    board.push(Array.from({ length: 5 }).fill(''));
  }

  return board;
};

export const getRandomWord = (): string => {
  const len = fiveLetterWords.length;
  const randomIndex = Math.floor(Math.random() * 100_000) % len;
  return fiveLetterWords[randomIndex].toUpperCase();
};

export const getWordleEmoji = (word: string, guessList: string[]): string => {
  const hasWon = guessList[guessList.length - 1] === word;

  let output = `Wordle ${hasWon ? guessList.length : 'x'}/${MAX_GUESSES}\n\n`;

  for (const row of guessList) {
    let line = '';

    for (const [colIndex, char] of row.split('').entries()) {
      if (char === word[colIndex]) {
        line += '🟩';
      } else if (word.includes(char)) {
        line += '🟨';
      } else {
        line += '⬜️';
      }
    }

    output += `${line}\n`;
  }

  return output;
};
