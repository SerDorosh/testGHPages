import styled from "styled-components";

const ButtonWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  width: 205px;
  margin: 50px;
  border: 0.5px solid #6b6ef9;
  background: rgba(107, 110, 249, 0.3);
  cursor: pointer;
  user-select: none;

  &:hover {
    background: rgba(107, 110, 249, 0.5);
  }

  &:active {
    background: rgba(107, 110, 249, 0.1);
  }
`;

const ButtonText = styled.div`
  font-weight: 500;
`;

const ButtonDecorateLeft = styled.div`
  position: absolute;
  height: 12px;
  width: 12px;
  bottom: -1px;
  left: -1px;
  border-left: 2px solid #6b6ef9;
  border-bottom: 2px solid #6b6ef9;
`;

const ButtonDecorateRight = styled.div`
  position: absolute;
  height: 12px;
  width: 12px;
  top: -1px;
  right: -1px;
  border-right: 2px solid #6b6ef9;
  border-top: 2px solid #6b6ef9;
`;

type ButtonProps = {
  text: string;
  callback: () => void;
};

export const Button = ({ text, callback }: ButtonProps) => {
  return (
    <ButtonWrap onClick={callback}>
      <ButtonDecorateLeft />
      <ButtonText>{text}</ButtonText>
      <ButtonDecorateRight />
    </ButtonWrap>
  );
};
