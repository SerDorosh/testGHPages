import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import arrowDown from "../assets/arrowDown.svg";
import { Button } from "./Button";

const HomePage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.div`
  margin-top: 160px;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  color: #4fd1d9;
`;

const AnimatedBlock = styled.div`
  position: relative;
  width: 17px;

  margin: 24px auto 48px;
`;

const firstArrowHide = keyframes`
0% {
    top: 0;
    opacity: 1;
    transform: scale(1)
}
100% {
    top: 20px;
    opacity: 0.2;
    transform: scale(0.5)
}
`;
const secondArrowHide = keyframes`
0% {
    top:0;
    opacity: 1;
    transform: scale(1)
}
100% {
    top: 20px;
    opacity: 0.2;
    transform: scale(0.5)
}
`;
const ArrowDownIconFirst = styled.div`
  position: absolute;
  height: 14px;
  width: 24px;
  background: url(${arrowDown});
  animation: 1.4s ${firstArrowHide} infinite;
  background-size: cover;
`;
const ArrowDownIconSecond = styled.div`
  position: absolute;
  height: 14px;
  width: 24px;
  background: url(${arrowDown});
  animation: 1.4s ${secondArrowHide} infinite;
  animation-delay: 0.7s;
  background-size: cover;
`;

export const TransactionSuccessPage = () => {
  const navigate = useNavigate();
  const url = new URL(window.location.href);
  const isError = url.searchParams.get("errorMessage");
  console.log(window.location, isError);
  return (
    <HomePage>
      <Title>{isError ? decodeURI(isError) : "Transaction success"}</Title>
      <AnimatedBlock>
        <ArrowDownIconFirst />
        <ArrowDownIconSecond />
      </AnimatedBlock>
      <Button
        text="Menu"
        callback={() => {
          navigate("/");
        }}
      />
    </HomePage>
  );
};
