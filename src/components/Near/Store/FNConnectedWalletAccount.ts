import * as borsh from "borsh";
import {
  ConnectedWalletAccount,
  transactions as Transactions,
} from "near-api-js";
import { PublicKey } from "near-api-js/lib/utils";
import { FinalExecutionOutcome } from "near-api-js/lib/providers";
import { Action, Transaction } from "near-api-js/lib/transaction";
import { SignAndSendTransactionOptions } from "near-api-js/lib/account";

import { FTWalletConnection } from "./types";

export class FNConnectedWalletAccount extends ConnectedWalletAccount {
  protected async signAndSendTransaction(
    receiverIdOrTxOptions: string | SignAndSendTransactionOptions,
    txActions: Action[]
  ): Promise<FinalExecutionOutcome> {
    const options: SignAndSendTransactionOptions =
      typeof receiverIdOrTxOptions === "string"
        ? {
            receiverId: receiverIdOrTxOptions,
            actions: txActions,
          }
        : receiverIdOrTxOptions;

    const { receiverId, actions, walletMeta, walletCallbackUrl } = options;

    if (!walletCallbackUrl) {
      throw new Error(
        "FNConnectedWalletAccount: walletCallbackUrl is not defined!"
      );
    }

    const walletConnection = this.walletConnection as FTWalletConnection;

    const win = window.open(`${window.origin}/callback/pending`, "_blank");

    const localKey = await this.connection.signer.getPublicKey(
      this.accountId,
      this.connection.networkId
    );
    let accessKey = await this.accessKeyForTransaction(
      receiverId,
      actions,
      localKey
    );

    if (!accessKey) {
      throw new Error(
        `Cannot find matching key for transaction sent to ${receiverId}`
      );
    }

    if (localKey && localKey.toString() === accessKey.public_key) {
      try {
        return await super.signAndSendTransaction({
          receiverId,
          actions,
        });
      } catch (e: any) {
        if (e.type === "NotEnoughAllowance") {
          accessKey = await this.accessKeyForTransaction(receiverId, actions);
        } else {
          throw e;
        }
      }
    }

    const block = await this.connection.provider.block({
      finality: "final",
    });

    const blockHash = borsh.baseDecode(block.header.hash);
    const publicKey = PublicKey.from(accessKey.public_key);
    const nonce = accessKey.access_key.nonce + 1;

    const transaction = Transactions.createTransaction(
      this.accountId,
      publicKey,
      receiverId,
      nonce,
      actions,
      blockHash
    );

    await walletConnection.ftRequestSignTransactions({
      transactions: [transaction],
      meta: walletMeta,
      callbackUrl: walletCallbackUrl,
    });

    if (win?.location && walletConnection.signTransactionUrl) {
      win.location.href = walletConnection.signTransactionUrl;
    }

    return new Promise((resolve, reject) => {
      //@ts-ignore
      // eslint-disable-next-line
      window.fbRequestSignTransactionCompleted = async ({
        transactionHashes,
        errorCode,
      }: {
        transactionHashes: any;
        errorCode: any;
      }) => {
        if (typeof transactionHashes !== "undefined") {
          const result = await this.connection.provider.txStatus(
            transactionHashes,
            this.accountId
          );

          resolve(result);
        }

        reject(
          console.log("error")
          // new WalletError({
          //   errorCode: errorCode || WalletErrorCodes.unknownError,
          // })
        );
      };
    });
  }

  public async sendTransactions(
    transactions: Transaction[]
  ): Promise<FinalExecutionOutcome[]> {
    const win = window.open(`${window.origin}/callback/pending`, "_blank");

    const walletConnection = this.walletConnection as FTWalletConnection;

    const walletCallbackUrl = "http://localhost:3000/transactions";

    await walletConnection.ftRequestSignTransactions({
      transactions,
      callbackUrl: walletCallbackUrl,
    });

    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    if (win?.location && walletConnection.signTransactionUrl) {
      win.location.href = walletConnection.signTransactionUrl;
    }

    return new Promise((resolve, reject) => {
      //@ts-ignore
      // eslint-disable-next-line
      window.fbRequestSignTransactionCompleted = async ({
        transactionHashes,
        errorCode,
      }: {
        transactionHashes: any;
        errorCode: any;
      }) => {
        if (typeof transactionHashes !== "undefined") {
          const hashes = transactionHashes.split(",");

          const result = await Promise.all(
            hashes.map((hash: any) =>
              this.connection.provider.txStatus(hash, this.accountId)
            )
          );

          resolve(result as any);
        }

        reject(
          console.log("Error")
          // new SputnikWalletError({
          //   errorCode: errorCode || SputnikWalletErrorCodes.unknownError,
          // })
        );
      };
    });
  }
}
