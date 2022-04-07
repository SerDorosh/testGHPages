import { mockSteps } from "../mockData";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "./Button";
import { LogicCard } from "./Cards/LogicCard";
import { TechnicalCard } from "./Cards/TechnicalCard";
import { Steps } from "./Steps";
import { СopiedAlert } from "./СopiedAlert";

const PrerequisitesPage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 120px;
`;

const ContentBlock = styled.div`
  display: flex;
`;

const ButtonWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 80%;
`;

const Title = styled.div`
  margin: 80px 0 90px;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  color: #4fd1d9;
`;

export const Prerequisites = () => {
  const [stepsStatus, setStepsStatus] = useState<{ [key: string]: string }>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const steps = mockSteps.reduce<Record<string, string>>((acc, cur, i) => {
      if (i === 0) {
        acc[i + 1] = "active";
      } else {
        acc[i + 1] = "";
      }
      return acc;
    }, {});
    setStepsStatus(steps);
  }, []);

  const {
    cardLogicText,
    cardLogicTitle,
    cardTechnicalText,
    cardTechnicalTitle,
  } = mockSteps[currentStep];

  return (
    <PrerequisitesPage>
      <Steps steps={stepsStatus} />
      <Title>Prerequisites</Title>
      <ContentBlock>
        <LogicCard text={cardLogicText} titleText={cardLogicTitle} />
        <TechnicalCard
          titleText={cardTechnicalTitle}
          textData={cardTechnicalText}
          callback={setIsCopied}
        />
      </ContentBlock>
      <ButtonWrap>
        <Button
          text="< Menu"
          callback={() => {
            navigate("/");
          }}
        />
        {isCopied ? <СopiedAlert /> : <div></div>}
        <Button
          text="Next >"
          callback={() => {
            if (currentStep + 1 < Object.keys(stepsStatus).length) {
              setCurrentStep(currentStep + 1);
              setStepsStatus({
                ...stepsStatus,
                [currentStep + 1]: "done",
                [currentStep + 2]: "active",
              });
            }
            if (currentStep + 1 === Object.keys(stepsStatus).length) {
              setStepsStatus({
                ...stepsStatus,
                [currentStep + 1]: "done",
              });
            }
          }}
        />
      </ButtonWrap>
    </PrerequisitesPage>
  );
};
