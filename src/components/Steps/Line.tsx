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

const LineElement = styled.div`
  height: 4px;
  width: 76px;
  background: ${(props: { status: string }) => renderBackground(props.status)};
`;

type LineProps = {
  status: string;
};

export const Line = ({ status }: LineProps) => {
  return <LineElement status={status} />;
};
