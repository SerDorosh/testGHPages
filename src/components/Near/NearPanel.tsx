import styled from "styled-components";
import { Button } from "../Button";
import { useEffect, useState } from "react";
import { NearService, WalletService } from "./Store/NearServiceStore";
import { FTWalletService } from "./Store/FTWalletService";

window.global = window;
window.Buffer = window.Buffer || require("buffer").Buffer;

const CONTRACT_NAME = "dorosh.testnet";
const TOKEN_CONTRACT_NAME = "tokens.testnet";

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.div``;

const CardWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 320px;
  border-bottom: 0.5px solid #6b6ef9;
  cursor: pointer;
  user-select: none;

  &:active {
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

const Input = styled.input`
  margin-right: 10px;
  background-color: #000000;
  color: #fff;
  border: 0px solid #000000;
  border-bottom: 3px solid #6b6ef9;
  outline: none;
`;

const Line = styled.div`
  position: absolute;
  top: -1px;
  width: 91px;
  height: 0.5px;
  background: #6b6ef9;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const NameWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const NearPanel = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [thisWallet, setThisWallet] = useState<WalletService>();
  const [receiverAccount, setReceiverAccount] = useState<string>();
  const [amountNear, setAmountNear] = useState<string>("0");

  const nearConfig = {
    walletFormat: ".testnet",
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
    contractName: CONTRACT_NAME,
    tokenContractName: TOKEN_CONTRACT_NAME,
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
    headers: {},
  };

  useEffect(() => {
    const ftService = new NearService(new FTWalletService(nearConfig));
    setThisWallet(ftService);
    //@ts-ignore
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (thisWallet) {
      setIsSignedIn(thisWallet.isSignedIn());
    }
  }, [thisWallet]);

  const signOut = () => {
    thisWallet?.logout();
    setIsSignedIn(false);
  };

  const signIn = () => {
    thisWallet?.signIn(nearConfig.contractName);
  };

  const submitHandler = async () => {
    await thisWallet?.sendMoney(receiverAccount as string, +amountNear);
  };

  return (
    <Wrap>
      <Flex>
        {!isSignedIn ? (
          <Button text="Connection to Near" callback={signIn} />
        ) : (
          <>
            <Button text="Disconnect" callback={signOut} />
            <NameWrap>
              <CardWrap>
                <CardDecorateBottom>
                  <InclinedLine />
                  <DecorateLine />
                  <Line />
                </CardDecorateBottom>
                <CardText>{thisWallet?.getAccountId()}</CardText>
              </CardWrap>
            </NameWrap>
          </>
        )}
      </Flex>
      {isSignedIn ? (
        <Flex>
          <Wrap>
            <Label>ReceiverAccount</Label>
            <Input
              onChange={(e) => {
                e.preventDefault();
                setReceiverAccount(e.target.value);
              }}
            />
          </Wrap>
          <Wrap>
            <Label>AmountNear</Label>
            <Input
              type="number"
              onChange={(e) => {
                e.preventDefault();
                setAmountNear(e.target.value);
              }}
            />
          </Wrap>
          <Button
            text="Send Near"
            callback={async () => {
              if (receiverAccount && amountNear) {
                submitHandler();
              }
            }}
          />
        </Flex>
      ) : null}
    </Wrap>
  );
};
