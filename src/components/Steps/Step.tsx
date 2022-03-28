import styled from "styled-components";

const renderBackground = (status: string) => {
  if (status === "active") {
    return "#A463B0";
  }
  if (status === "done") {
    return "#4FD1D9";
  }
  return "#472E4D";
};

const StepValue = styled.div`
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props: { status: string }) => renderBackground(props.status)};
  border-radius: 50%;
  font-family: Manrope;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  user-select: none;
`;
const StepBorder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  min-width: 32px;
  border: 2px solid
    ${(props: { status: string }) => renderBackground(props.status)};
  border-radius: 50%;
  color: ${(props: { status: string }) =>
    props.status === "active" ? "#ffffff" : "#151515"};
`;

type StepProps = {
  value: string;
  status: string;
};

export const Step = ({ value, status }: StepProps) => {
  return (
    <StepBorder status={status}>
      <StepValue status={status}>{status === "done" ? "✔" : value}</StepValue>
    </StepBorder>
  );
};
