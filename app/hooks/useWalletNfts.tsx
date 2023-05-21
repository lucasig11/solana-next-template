"use client";
import { getWalletNfts } from "@/utils/getWalletNfts";
import { Nft, PublicKey } from "@metaplex-foundation/js";
import { useConnection } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";

interface WalletNftData {
  nfts: Nft[];
  loading: boolean;
  error?: unknown;
}

export const useWalletNfts = (wallet?: PublicKey): WalletNftData => {
  const { connection } = useConnection();
  const [loading, setLoading] = useState(false);
  const [nfts, setNfts] = useState<Nft[]>([]);
  const [error, setError] = useState<unknown | null>();

  const fetchNfts = useCallback(async () => {
    if (!wallet) {
      setNfts([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const nfts = await getWalletNfts(connection, wallet);
      const sorted = nfts.sort((a, b) => a.name.localeCompare(b.name));
      setNfts(sorted);
    } catch (error) {
      setNfts([]);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [connection, wallet]);

  useEffect(() => {
    fetchNfts();
  }, [fetchNfts]);

  return {
    loading,
    nfts,
    error,
  };
};
