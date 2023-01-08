import { Pressable } from 'react-native';
import styled from 'styled-components/native';

const Wrapper = styled.View<{ disabled?: boolean }>`
  border-radius: 20px;
  padding: 8px 20px;
  background-color: #474973;
  margin: 4px;
  opacity: ${({ disabled }) => (disabled ? 0.8 : 1)};
`;

const Title = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 800;
`;

interface Props {
  label: string;
  disabled?: boolean;
  onPress: () => void;
}

const ActionButton = ({ label, disabled = false, onPress }: Props) => {
  return (
    <Pressable disabled={disabled} onPress={onPress}>
      <Wrapper disabled={disabled}>
        <Title>{label}</Title>
      </Wrapper>
    </Pressable>
  );
};

export default ActionButton;
