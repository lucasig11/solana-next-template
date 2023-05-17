import { isNft, Metaplex, Nft } from "@metaplex-foundation/js";
import { Connection, PublicKey } from "@solana/web3.js";

export const getWalletNfts = async (
  connection: Connection,
  owner: PublicKey
): Promise<Nft[]> => {
  const mpl = new Metaplex(connection);
  const metadatas = await mpl.nfts().findAllByOwner({ owner });

  const data = await Promise.all(
    metadatas.map((metadata) => {
      if (metadata.model === "metadata") {
        return mpl.nfts().load({
          metadata,
        });
      }
    })
  );

  return data.filter(isNft);
};
