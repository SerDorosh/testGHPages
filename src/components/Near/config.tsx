import * as nearAPI from "near-api-js";
const { keyStores, connect, WalletConnection, KeyPair } = nearAPI;
export const keyStore = new keyStores.InMemoryKeyStore();

export const SENDER_PRIVATE_KEY =
  "3wb4fVQvafPebkcCmyQPgMa2VsnX3JAQXZ4gjpc3kSu9AbVtLpLZqEog4xTbJrJxG1Y88SkHpuJV58GmPRnPXMD";

export const getConfig = async (accountId: string) => {
  const networkId = "testnet";
  const keyStore = new keyStores.InMemoryKeyStore();
  const keyPair = KeyPair.fromString(SENDER_PRIVATE_KEY);
  await keyStore.setKey(networkId, accountId as string, keyPair);
  const config = {
    networkId: "testnet",
    keyStore,
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  };
  return config;
};

export const config = {
  networkId: "testnet",
  keyStore,
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

export const wallet = async (config: any) => {
  //Wallet Connection
  const near = await connect(config);
  const wallet = new WalletConnection(near, null);
  return wallet;
};

export const getAccount = async (config: any, accountId: string) => {
  const near = await connect(config);
  const account = await near.account(accountId);
  return account;
};
