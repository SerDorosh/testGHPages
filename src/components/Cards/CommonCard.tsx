import styled from "styled-components";

const CardWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 202px;
  width: 320px;
  border-bottom: 0.5px solid #6b6ef9;
  cursor: pointer;
  user-select: none;

  &:active {
    color: #6b6ef9;
  }
`;

const BackgroundBlock = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0.4;
  background: linear-gradient(
    180deg,
    #6b6ef9 -3.96%,
    rgba(107, 110, 249, 0) 100%
  );

  &:hover {
    background: linear-gradient(
      180deg,
      #6b6ef9 -3.96%,
      rgba(107, 110, 249, 0.4) 100%
    );
    opacity: 0.2;
  }

  &:active {
    background: linear-gradient(
      180deg,
      #6b6ef9 -3.96%,
      rgba(107, 110, 249, 0.4) 100%
    );
    opacity: 0.5;
    color: #6b6ef9;
  }
`;

const CardText = styled.div`
  position: absolute;
  width: 200px;
  line-height: 18px;
  text-align: center;
`;

const CardDecorateBottom = styled.div`
  position: absolute;
  height: 8px;
  width: 100px;
  bottom: -1px;
  left: -1px;
  background: #000000;
`;
const CardDecorateTop = styled.div`
  position: absolute;
  top: -3px;
  right: 0;
  width: 88px;
  border-bottom: 3px solid #6b6ef9;
  border-left: 4px solid transparent;
`;

const DecorateLine = styled.div`
  position: absolute;
  bottom: 0;
  width: 88px;
  border-bottom: 3px solid #6b6ef9;
  border-right: 4px solid transparent;
`;

const InclinedLine = styled.div`
  position: absolute;
  bottom: -1px;
  right: 4px;
  width: 0.5px;
  height: 12px;
  background: #6b6ef9;
  transform: rotate(133deg);
`;
const Line = styled.div`
  position: absolute;
  top: -1px;
  width: 91px;
  height: 0.5px;
  background: #6b6ef9;
`;

export const CommonCard = ({ text }: { text: string }) => {
  return (
    <CardWrap>
      <BackgroundBlock></BackgroundBlock>
      <CardDecorateTop />
      <CardDecorateBottom>
        <InclinedLine />
        <DecorateLine />
        <Line />
      </CardDecorateBottom>
      <CardText>{text}</CardText>
    </CardWrap>
  );
};
