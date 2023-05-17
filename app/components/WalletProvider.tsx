"use client";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider as WalletAdapterProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { FC, PropsWithChildren, useMemo } from "react";

// Default styles
require("@solana/wallet-adapter-react-ui/styles.css");

const WalletProvider: FC<PropsWithChildren> = ({ children }) => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint =
    "https://weathered-dawn-pine.solana-mainnet.discover.quiknode.pro/7f57f6cc18820ca05369a578962c7283daa42b1b/";

  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter(),
      new SolletWalletAdapter(),
      new SlopeWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletAdapterProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletAdapterProvider>
    </ConnectionProvider>
  );
};

export default WalletProvider;
