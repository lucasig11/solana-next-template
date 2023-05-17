"use client";
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
import { FC, PropsWithChildren, useMemo } from "react";

// Default styles
require("@solana/wallet-adapter-react-ui/styles.css");

const WalletProvider: FC<PropsWithChildren> = ({ children }) => {
  const endpoint =
    process.env.SOLANA_RPC_ENDPOINT || "https://api.mainnet-beta.solana.com";

  const wallets = useMemo(
    () => [
      /* Load adapters for the wallets you wish to support on your app */
      new SolflareWalletAdapter(),
      new SolletWalletAdapter(),
      new SlopeWalletAdapter(),
    ],
    []
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
