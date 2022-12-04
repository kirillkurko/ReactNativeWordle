import styled from 'styled-components/native';
import ActionButton from './ActionButton';
import { ActionKey } from './ActionKey';
import Button from './Button';

const ActionButtonsWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

const KeyboardRow = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;

const KEY_SEQUENCE = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

interface Props {
  onKeyPress: (char: string) => void;
  disabledKeyList: string[];
}

const Keyboard = ({ onKeyPress, disabledKeyList }: Props) => {
  const isGuessDisabled = disabledKeyList.includes(ActionKey.Guess);
  const isDeleteDisabled = disabledKeyList.includes(ActionKey.Delete);

  return (
    <>
      {KEY_SEQUENCE.map((row, rowIndex) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <KeyboardRow key={`key-row-${rowIndex}`}>
            {row.map((key) => {
              const disabled = disabledKeyList.includes(key);
              return (
                <Button
                  key={key}
                  label={key}
                  disabled={disabled}
                  onPress={() => onKeyPress(key)}
                />
              );
            })}
          </KeyboardRow>
        );
      })}
      <ActionButtonsWrapper>
        <ActionButton
          label={ActionKey.Delete}
          disabled={isDeleteDisabled}
          onPress={() => onKeyPress(ActionKey.Delete)}
        />
        <ActionButton
          label={ActionKey.Guess}
          disabled={isGuessDisabled}
          onPress={() => onKeyPress(ActionKey.Guess)}
        />
      </ActionButtonsWrapper>
    </>
  );
};

export default Keyboard;
