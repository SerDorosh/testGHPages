import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import arrowDown from "../assets/arrowDown.svg";
import { CommonCard } from "./Cards/CommonCard";
import { mockHomeTitle } from "../mockData";
import { Button } from "./Button";
import { NearPanel } from "./Near/NearPanel";

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

const ScenariosBlock = styled.div`
  display: grid;
  grid-template-columns: 320px 320px;
  grid-template-rows: 202px 202px;
  grid-gap: 40px;
`;

export const Home = () => {
  const navigate = useNavigate();

  return (
    <HomePage>
      <NearPanel />
      <Title>Choose the scenario</Title>
      <AnimatedBlock>
        <ArrowDownIconFirst />
        <ArrowDownIconSecond />
      </AnimatedBlock>
      <ScenariosBlock>
        {Object.values(mockHomeTitle).map((title, i) => (
          <CommonCard key={i} text={title} />
        ))}
      </ScenariosBlock>
      <Button
        text="Start"
        callback={() => {
          navigate("/prerequisites");
        }}
      />
    </HomePage>
  );
};
