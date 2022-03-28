import styled from "styled-components";
import { Step } from "./Step";
import { Line } from "./Line";

const StepsWrap = styled.div`
  display: flex;
  align-items: center;
`;
const StepWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const Steps = ({ steps }: any) => {
  return (
    <StepsWrap>
      {Object.keys(steps).map((step: string, i: number) => {
        return i === 0 ? (
          <Step key={step} value={step} status={steps[step]} />
        ) : (
          <StepWrap key={step + i}>
            <Line key={step + i} status={steps[step]} />
            <Step key={step} value={step} status={steps[step]} />
          </StepWrap>
        );
      })}
    </StepsWrap>
  );
};
