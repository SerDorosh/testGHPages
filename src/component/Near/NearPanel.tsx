import styled from "styled-components";
import * as nearAPI from "near-api-js";
import { Button } from "../Button";
import { useEffect, useState } from "react";
import { wallet, getAccount, SENDER_PRIVATE_KEY, config } from "./config";
// import { ConnectConfig } from "near-api-js";
window.global = window;
window.Buffer = window.Buffer || require("buffer").Buffer;

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

const { utils, KeyPair, keyStores, connect } = nearAPI;

const getNEARInYoctoNEAR = (near: string) => {
  return utils.format.parseNearAmount(near);
};

export const NearPanel = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [thisWallet, setThisWallet] = useState<nearAPI.WalletConnection>();
  const [receiverAccount, setReceiverAccount] = useState<string>();
  const [amountNear, setAmountNear] = useState<string>("0");
  const [accountId, setAccountId] = useState<string>();
  const [account, setAccount] = useState<nearAPI.Account>();

  useEffect(() => {
    if (!isSignedIn) {
      wallet(config).then((data) => {
        setThisWallet(data);
        setIsSignedIn(data.isSignedIn());
        setAccountId(data.getAccountId());
      });
    }
  }, [isSignedIn]);
  useEffect(() => {
    if (accountId) {
      getAccount(config, accountId).then((accountData: nearAPI.Account) => {
        setAccount(accountData);
      });
    }
  }, [accountId]);
  const signOut = () => {
    if (thisWallet) {
      thisWallet.signOut();
      setIsSignedIn(thisWallet.isSignedIn());
    }
  };

  const signIn = () => {
    if (thisWallet) {
      thisWallet.requestSignIn();
    }
  };

  // const deployContract = async () => {
  //   const networkId = "testnet";
  //   const keyStore = new keyStores.InMemoryKeyStore();
  //   const keyPair = KeyPair.fromString(SENDER_PRIVATE_KEY);
  //   await keyStore.setKey(networkId, accountId as string, keyPair);
  //   const config = {
  //     networkId,
  //     keyStore,
  //     nodeUrl: "https://rpc.testnet.near.org",
  //     walletUrl: "https://wallet.testnet.near.org",
  //     helperUrl: "https://helper.testnet.near.org",
  //     explorerUrl: "https://explorer.testnet.near.org",
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //   };
  //   const near = await connect(config);
  //   const account = await near.account(accountId as string);
  //   // const response = await account.deployContract(
  //   //   // fs.readFileSync("./wasm_files/status_message.wasm")
  //   // );
  //   // console.log(response);
  // };

  const sendNear = async () => {
    const networkId = "testnet";
    const keyStore = new keyStores.InMemoryKeyStore();
    const keyPair = KeyPair.fromString(SENDER_PRIVATE_KEY);
    await keyStore.setKey(networkId, accountId as string, keyPair);
    // const cors = require("cors");
    // const express = require("express");
    // const app = express();
    // app.use("*", cors());

    // const bodyParser = require("body-parser");
    // const cors = require("cors");
    // require("dotenv");

    const config = {
      networkId,
      keyStore,
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE",
        "Access-Control-Allow-Headers":
          "X-Requested-With, Access-Control-Allow-Headers, Content-Type, Authorization, Origin, Accept",
        "Access-Control-Allow-Credentials": "true",
      },
    };

    const near = await connect(config);
    const senderAccount = await near.account(accountId as string);
    console.log("1");
    try {
      console.log(`Sending ...`);
      const result = await senderAccount.sendMoney(
        receiverAccount as string,
        getNEARInYoctoNEAR(amountNear)
      );
      console.log("Transaction Results: ", result.transaction);
    } catch (error) {
      console.log("111", error);
    }
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
                <CardText>{accountId}</CardText>
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
                sendNear();
              }
            }}
          />
        </Flex>
      ) : null}
    </Wrap>
  );
};
