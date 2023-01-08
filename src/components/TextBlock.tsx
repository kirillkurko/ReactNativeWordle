import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  width: 40px;
  height: 40px;
  border: 1px solid #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  font-size: 16px;
  color: #000;
  font-weight: bold;
`;

export enum TextBlockState {
  Guess = 'Guess',
  Correct = 'Correct',
  Possible = 'Possible',
  Incorrect = 'Incorrect',
}

const ColorMap: Record<TextBlockState, string> = {
  [TextBlockState.Guess]: 'transparent',
  [TextBlockState.Correct]: '#76b041',
  [TextBlockState.Possible]: '#FFC914',
  [TextBlockState.Incorrect]: '#8b939c',
};

interface Props {
  text: string;
  state: TextBlockState;
}

const TextBlock = ({ text, state }: Props) => {
  return (
    <Wrapper style={{ backgroundColor: ColorMap[state] }}>
      <Text>{text.toUpperCase()}</Text>
    </Wrapper>
  );
};

export default TextBlock;
