"use client";
import { useWalletNfts } from "@/hooks/useWalletNfts";
import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork,WalletNotConnectedError } from '@solana/wallet-adapter-base';
import dynamic from "next/dynamic";
import { useState, useEffect, useMemo } from "react";
import { Connection, clusterApiUrl, Keypair, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import Image from 'next/image'
//import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
// Dynamically import components
const NftSelect = dynamic(() => import("./components/NftSelect"), {
  ssr: false,
});

export default function Home() {
  const { connected, publicKey } = useWallet();
  const network = WalletAdapterNetwork.Mainnet;
  //const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/MA272Pjoji-6ZEYlK73TG97ycsztr8kY");
  console.log(connection);
  const [allNFTs, setAllNFTs] = useState<any[]>([]);
  const [allNFTImages, setAllNFTImages] = useState<any[]>([]);
  // const [publicKey, setPublicKey] = useState<PublicKey | undefined>();
  //const { nfts, loading } = useWalletNfts(publicKey || undefined);
  //const [selectedNfts, setSelectedNfts] = useState<Nft[]>([]);
  //const allNFTs = await Nft.nfts().findAllByOwner({ owner: owner });
  
  const imageStyle = {
    maxWidth: '100px',
    height: 'auto'
  };

  async function fetchNFTData(uri: string) {
    try {
      const response = await fetch(uri);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data.name);
      console.log(data.image);
      // Add the image URL to the array
      allNFTImages.push(data.image);
      // console.log(allNFTImages);
      // Now you can use the 'data' object as needed in your application
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  useEffect(() => {
    if (publicKey) {
      (async () => {
        
        const keypair = Keypair.generate();
        console.log(keypair);
        const metaplex = new Metaplex(connection);
        metaplex.use(keypairIdentity(keypair));
  
        const owner = new PublicKey(publicKey.toString());
        console.log(owner);
        const allNFTs = await metaplex.nfts().findAllByOwner({ owner });
  
        //console.log(allNFTs);
        setAllNFTs(allNFTs);
        // write a loop to fetch the data from the uri of each nft
        let nftLength = allNFTs.length - 1;
        //console.log(nftLength);
        while (nftLength > 0) {
          const nft = allNFTs[nftLength];
          
          if (nft) {
            fetchNFTData(nft.uri);
          }
          nftLength--;
        }

        setAllNFTImages(allNFTImages);
        console.log(allNFTImages);
      })();
    }
  }, [publicKey]); // Add publicKey to the dependency array to re-run the effect when publicKey changes


  return (
    <div className="m-auto flex w-full flex-col items-center space-y-10 py-10 xl:w-1/2">
    

      <div>
      <p>Connected: {connected ? connected.toString() : 'False'}</p>
      <p>Public Key: {publicKey ? publicKey.toString() : 'Not available'}</p>
    
      </div>

      <div>
        {allNFTs && allNFTs.length > 0 ? (
          allNFTs.map((nft_id, index) => (
            <div key={index}>
              {/* Display properties of each NFT object here */}
              {/*<p>Name: {nft_id.name}</p>*/}
              {/* Add more properties as needed */}
            
            </div>
          ))
        ) : (
          <p>No NFTs found</p>
        )}
      </div>

      <div>
        {allNFTImages.map((url, index) => (
          <Image key={index} src={url} alt="NFT Image" style={imageStyle}/>
        ))}
      </div>


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
              nfts={allNFTs}
              value={allNFTs}
              onChange={setAllNFTs}
              //disabled={loading || nfts.length === 0}
            />
          </>
        )}
        </div>

        {/* write a way to grab the users nft from their wallet and display it here. */}
        


    </div>
  );
}
