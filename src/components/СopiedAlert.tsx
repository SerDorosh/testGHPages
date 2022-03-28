import styled from "styled-components";
import done from "../assets/done.svg";

const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 60px;
  background: #070c0c;
  width: 182px;
  height: 32px;
`;

const Icon = styled.div`
  width: 12px;
  height: 12px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(${(props: { icon: string }) => props.icon});
`;

const CopiedText = styled.div`
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
`;

export const СopiedAlert = () => {
  return (
    <Wrap>
      <Icon icon={done} />
      <CopiedText>Сopied to clipboard</CopiedText>
    </Wrap>
  );
};
