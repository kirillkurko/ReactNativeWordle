import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StyleSheet, Text, View, Clipboard } from 'react-native';
import styled from 'styled-components/native';
import Button from '../components/Button';
import Keyboard from '../components/Keyboard';
import { ActionKey } from '../components/Keyboard/ActionKey';
import TextBlock, { TextBlockState } from '../components/TextBlock';
import { MAX_GUESSES, MAX_WORD_LEN } from '../constants/gameConstants';
import {
  getInitialBoard,
  getRandomWord,
  getWordleEmoji,
} from '../utils/gameUtils';

const Wrapper = styled.SafeAreaView`
  background-color: #a69cac;
  flex: 1;
`;

const BOARD_TEMPLATE = getInitialBoard();

const Game = () => {
  const [guessList, setGuessList] = useState<string[]>([]);
  const [inputWord, setInputWord] = useState<string>('');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [disabledLetters, setDisabledLetters] = useState<string[]>([]);

  const wordToGuess = useRef<string>('xxxxx');

  useEffect(() => {
    if (!gameOver) {
      wordToGuess.current = getRandomWord();
      setInputWord('');
      setGuessList([]);
    }
  }, [gameOver]);

  useEffect(() => {
    const guessLen = guessList.length;
    if (guessList[guessLen - 1] === wordToGuess.current) {
      setGameOver(true);
    } else if (guessLen === MAX_GUESSES) {
      setGameOver(true);
    }
  }, [guessList]);

  useEffect(() => {
    const list: string[] = [];

    for (const word of guessList) {
      for (const letter of word.split('')) {
        console.log({ letter });
        if (!wordToGuess.current.includes(letter)) {
          list.push(letter);
        }
      }
    }

    setDisabledLetters(list);
  }, [guessList]);

  const onKeyPress = useCallback(
    (key: string) => {
      if (key === ActionKey.Delete) {
        setInputWord((prev) => prev.slice(0, -1));
      } else if (key === ActionKey.Guess) {
        setGuessList((prev) => [...prev, inputWord.toUpperCase()]);
        setInputWord('');
      } else if (key.length === 1) {
        setInputWord((prev) => {
          if (prev.length < MAX_WORD_LEN && !disabledLetters.includes(key)) {
            return prev + key;
          }

          return prev;
        });
      }
    },
    [disabledLetters, inputWord],
  );

  const wordleEmoji: string = useMemo(() => {
    if (!gameOver) {
      return '';
    }

    return getWordleEmoji(wordToGuess.current, guessList);
  }, [gameOver, guessList]);

  return (
    <Wrapper>
      <View style={styles.fg1}>
        {BOARD_TEMPLATE.map((row, rowIndex) => {
          return (
            <View key={`row-${rowIndex}`} style={styles.row}>
              {row.map((_, colIndex) => {
                const guessLetter = guessList[rowIndex]?.[colIndex];
                let state: TextBlockState = TextBlockState.GUESS;

                if (guessLetter === undefined) {
                  state = TextBlockState.GUESS;
                } else if (guessLetter === wordToGuess.current[colIndex]) {
                  state = TextBlockState.CORRECT;
                } else if (wordToGuess.current.includes(guessLetter)) {
                  state = TextBlockState.POSSIBLE;
                } else {
                  state = TextBlockState.INCORRECT;
                }

                const letterToShow =
                  rowIndex === guessList.length
                    ? inputWord[colIndex]
                    : guessLetter;

                return (
                  <View style={styles.mh2} key={`col-${colIndex}`}>
                    <TextBlock text={letterToShow || ''} state={state} />
                  </View>
                );
              })}
            </View>
          );
        })}

        <View style={styles.bottomContainer}>
          {gameOver ? (
            <>
              <Text style={[styles.textWhite, styles.mb12]}>Game Over!</Text>
              <Text style={[styles.textWhite, styles.mb12]}>
                The word was : {wordToGuess.current}
              </Text>

              <Text style={styles.textWhite} selectable>
                {wordleEmoji}
              </Text>

              <View style={styles.buttonRow}>
                <Button
                  cta='Copy Score'
                  onPress={() => Clipboard.setString(wordleEmoji)}
                />
                <View style={styles.buttonSpacer} />
                <Button cta='Play Again' onPress={() => setGameOver(false)} />
              </View>
            </>
          ) : (
            <Keyboard
              disabledKeyList={[
                ...disabledLetters,
                inputWord.length !== MAX_WORD_LEN ? ActionKey.Guess : '',
              ]}
              onKeyPress={onKeyPress}
            />
          )}
        </View>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  mb12: {
    marginBottom: 12,
  },
  mh2: {
    marginHorizontal: 2,
  },
  fg1: {
    marginTop: 100,
    flexGrow: 1,
  },
  textWhite: {
    color: '#000',
    fontSize: 22,
  },
  row: {
    marginBottom: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomContainer: {
    flexGrow: 1,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  score: {
    color: '#000',
    fontSize: 14,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  buttonSpacer: {
    width: 12,
  },
});

export default Game;
