import { FinalExecutionOutcome } from "near-api-js/lib/providers";
import { ConnectedWalletAccount, transactions } from "near-api-js";
// import { FunctionCallOptions } from "near-api-js/lib/account";

const CONTRACT_NAME = "dorosh.testnet";
const TOKEN_CONTRACT_NAME = "tokens.testnet";

export type Transaction = {
  receiverId: string;
  actions: transactions.Action[];
};

export type VotePolicyRequest = {
  // eslint-disable-next-line camelcase
  weight_kind: string;
  quorum: string;
  threshold: number[] | string;
};

export type RolesRequest = {
  name: string;
  kind: string | { Group: string[] };
  permissions: string[];
  // eslint-disable-next-line camelcase
  vote_policy: Record<string, VotePolicyRequest>;
};
export type PolicyTypeRequest = {
  roles: RolesRequest[];
  defaultVotePolicy: VotePolicyRequest;
  proposalBond: string;
  proposalPeriod: string;
  bountyBond: string;
  bountyForgivenessPeriod: string;
};

export interface CreateDaoParams {
  name: string;
  purpose: string;
  bond: string;
  votePeriod: string;
  gracePeriod: string;
  links: [];
  flagCover: string;
  flagLogo: string;
  amountToTransfer: string;
  displayName: string;
  policy: PolicyTypeRequest;
  legal?: {
    legalStatus?: string;
    legalLink?: string;
  };
  gas: string | number;
}

export type Config = {
  AWS_BUCKET: string;
  AWS_REGION: string;
  GOOGLE_ANALYTICS_KEY: string;
  RELEASE_NOTES: string;
  I18_RELOAD_ON_PRERENDER: boolean;
  API_URL: string;
  STATS_API_URL: string;
  TOASTS_NOTIFICATIONS_TIMEOUT: number;
  APP_DOMAIN: string;
  NEAR_ENV: string;
  LOCAL_WALLET_REDIRECT: boolean;
};

export type NearConfig = {
  walletFormat?: string;
  networkId: string;
  nodeUrl: string;
  contractName: string;
  tokenContractName: string;
  masterAccount?: string;
  walletUrl?: string;
  helperUrl?: string;
  explorerUrl?: string;
  keyPath?: string;
  headers: { [key: string]: string | number };
};

export enum WalletType {
  NEAR,
  SENDER,
}

export interface WalletService {
  signIn(contractId: string): Promise<void>;
  sendMoney(
    receiverId: string,
    amount: number
  ): Promise<FinalExecutionOutcome[]>;
  logout(): void;
  isSignedIn(): boolean;
  getAccount(): ConnectedWalletAccount;
  getAccountId(): string;
}

export class NearService implements WalletService {
  private walletService: WalletService;

  private readonly nearConfig: NearConfig;

  public isSenderWalletAvailable: boolean;

  constructor(walletService: WalletService) {
    this.walletService = walletService;
    this.nearConfig = {
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
    this.isSenderWalletAvailable = false;
  }

  sendMoney(
    receiverId: string,
    amount: number
  ): Promise<FinalExecutionOutcome[]> {
    return this.walletService.sendMoney(receiverId, amount);
  }

  isSignedIn(): boolean {
    return this.walletService.isSignedIn();
  }

  getAccount(): ConnectedWalletAccount {
    return this.walletService.getAccount();
  }

  public async signIn(contractId: string): Promise<void> {
    await this.walletService.signIn(contractId);
  }

  public async logout(): Promise<void> {
    this.walletService.logout();
    window.localStorage.removeItem("selectedWallet");
  }

  public getAccountId(): string {
    return this.walletService.getAccountId();
  }
}
