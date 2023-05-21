"use client";
import { useWalletNfts } from "@/hooks/useWalletNfts";
import { Nft } from "@metaplex-foundation/js";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamically import components
const NftSelect = dynamic(() => import("./components/NftSelect"), {
  ssr: false,
});

export default function Home() {
  const { connected, publicKey } = useWallet();
  // const [publicKey, setPublicKey] = useState<PublicKey | undefined>();
  const { nfts, loading } = useWalletNfts(publicKey || undefined);
  const [selectedNfts, setSelectedNfts] = useState<Nft[]>([]);

  return (
    <div className="m-auto flex w-full flex-col items-center space-y-10 py-10 xl:w-1/2">
      <a
        href="https://github.com/lucasig11/solana-next-template/generate"
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-between gap-2 rounded-md bg-gray-800 px-4 py-2 text-xl text-sky-100"
      >
        <svg className="h-8 w-8 fill-sky-100" viewBox="0 0 512 512">
          <path d="M256 70.7c-102.6 0-185.9 83.2-185.9 185.9 0 82.1 53.3 151.8 127.1 176.4 9.3 1.7 12.3-4 12.3-8.9V389.4c-51.7 11.3-62.5-21.9-62.5-21.9 -8.4-21.5-20.6-27.2-20.6-27.2 -16.9-11.5 1.3-11.3 1.3-11.3 18.7 1.3 28.5 19.2 28.5 19.2 16.6 28.4 43.5 20.2 54.1 15.4 1.7-12 6.5-20.2 11.8-24.9 -41.3-4.7-84.7-20.6-84.7-91.9 0-20.3 7.3-36.9 19.2-49.9 -1.9-4.7-8.3-23.6 1.8-49.2 0 0 15.6-5 51.1 19.1 14.8-4.1 30.7-6.2 46.5-6.3 15.8 0.1 31.7 2.1 46.6 6.3 35.5-24 51.1-19.1 51.1-19.1 10.1 25.6 3.8 44.5 1.8 49.2 11.9 13 19.1 29.6 19.1 49.9 0 71.4-43.5 87.1-84.9 91.7 6.7 5.8 12.8 17.1 12.8 34.4 0 24.9 0 44.9 0 51 0 4.9 3 10.7 12.4 8.9 73.8-24.6 127-94.3 127-176.4C441.9 153.9 358.6 70.7 256 70.7z" />
        </svg>
        <p className="m-auto">Use this template</p>
      </a>

      {/*<div className="flex w-full rounded-md bg-gray-800 px-4 py-2 text-lg text-sky-100">
        <input
          type="text"
          onSubmit={() => setWallet("")}
          className="w-full bg-transparent outline-none"
          placeholder="Search..."
        />
        <MagnifyingGlassIcon className="h-6 w-6 fill-sky-100" />
      </div>*/}

      <div className="flex w-full flex-col items-center space-y-2">
        {connected && (
          <>
            <h1 className="text-3xl font-bold text-gray-900">NFT Select</h1>
            <NftSelect
              multiple
              text={loading ? "Loading..." : "Select NFTs..."}
              nfts={nfts}
              value={selectedNfts}
              onChange={setSelectedNfts}
              disabled={loading || nfts.length === 0}
            />
          </>
        )}
      </div>
    </div>
  );
}
