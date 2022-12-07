import { Pressable } from 'react-native';
import styled from 'styled-components/native';

const Wrapper = styled.View<{ disabled?: boolean }>`
  width: 32px;
  height: 32px;
  background-color: #474973;
  margin: 2px;
  border-radius: 4px;
  opacity: ${({ disabled }) => (disabled ? 0.8 : 1)};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 800;
  text-align: center;
  position: absolute;
`;

interface Props {
  disabled?: boolean;
  onPress: () => void;
  label: string;
}

const Button = ({ label, onPress, disabled }: Props) => {
  return (
    <Pressable disabled={disabled} onPress={onPress}>
      <Wrapper disabled={disabled}>
        <Title>{label}</Title>
      </Wrapper>
    </Pressable>
  );
};

export default Button;
