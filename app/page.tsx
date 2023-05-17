"use client";
import { Nft } from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import NftSelect from "./components/NftSelect";
import { getWalletNfts } from "./utils/getWalletNfts";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

import GithubIcon from "../public/github.svg";

export default function Home() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [nfts, setNfts] = useState<Nft[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedNfts, setSelectedNfts] = useState<Nft[]>([]);

  useEffect(() => {
    if (!publicKey) return;
    setLoading(true);
    getWalletNfts(connection, publicKey)
      .then((nfts) => {
        const sorted = nfts.sort((a, b) => a.name.localeCompare(b.name));
        setNfts(sorted);
      })
      .finally(() => setLoading(false));
  }, [connection, publicKey]);

  return (
    <main className="m-auto flex flex-col items-center space-y-10 p-10 w-1/3">
      <a
        href="https://github.com/lucasig11/solana-next-template/generate"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-gray-800 px-4 py-2 rounded-md"
      >
        <button className="flex justify-center text-xl w-full gap-2 items-center text-sky-100">
          <svg className="w-8 h-8 fill-sky-100" viewBox="0 0 512 512">
            <path d="M256 70.7c-102.6 0-185.9 83.2-185.9 185.9 0 82.1 53.3 151.8 127.1 176.4 9.3 1.7 12.3-4 12.3-8.9V389.4c-51.7 11.3-62.5-21.9-62.5-21.9 -8.4-21.5-20.6-27.2-20.6-27.2 -16.9-11.5 1.3-11.3 1.3-11.3 18.7 1.3 28.5 19.2 28.5 19.2 16.6 28.4 43.5 20.2 54.1 15.4 1.7-12 6.5-20.2 11.8-24.9 -41.3-4.7-84.7-20.6-84.7-91.9 0-20.3 7.3-36.9 19.2-49.9 -1.9-4.7-8.3-23.6 1.8-49.2 0 0 15.6-5 51.1 19.1 14.8-4.1 30.7-6.2 46.5-6.3 15.8 0.1 31.7 2.1 46.6 6.3 35.5-24 51.1-19.1 51.1-19.1 10.1 25.6 3.8 44.5 1.8 49.2 11.9 13 19.1 29.6 19.1 49.9 0 71.4-43.5 87.1-84.9 91.7 6.7 5.8 12.8 17.1 12.8 34.4 0 24.9 0 44.9 0 51 0 4.9 3 10.7 12.4 8.9 73.8-24.6 127-94.3 127-176.4C441.9 153.9 358.6 70.7 256 70.7z" />
          </svg>
          <p>Use this template</p>
        </button>
      </a>

      <div className="flex flex-col items-center space-y-2 w-full">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-800 px-4 py-2 text-left text-sm font-medium text-sky-100 hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                <span>Packages included</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-sky-100`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 bg-white w-full rounded-lg text-sm text-gray-800">
                <p>Next.js</p>
                <p>@solana/web3.js</p>
                <p>@metaplex-foundation/js</p>
                <p>Typescript</p>
                <p>TailwindCSS</p>
                <p>HeadlessUI</p>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>

      <div className="flex flex-col items-center space-y-2 w-full">
        <h1 className="text-2xl font-bold">Solana NFT Select</h1>
        <NftSelect
          multiple
          text={loading ? "Loading..." : "Select NFTs..."}
          nfts={nfts}
          value={selectedNfts}
          onChange={setSelectedNfts}
          disabled={loading}
        />
        <span className="mr-auto text-sm text-bold">
          {selectedNfts.length} NFTs selected
        </span>
      </div>
    </main>
  );
}
