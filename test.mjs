import { Keypair, Connection, VersionedTransaction } from "@solana/web3.js";
import { readFileSync } from "fs";

const connection = new Connection("http://127.0.0.1:8899", "confirmed");

const userKeypair = Keypair.fromSecretKey(
  Uint8Array.from(
    JSON.parse(readFileSync(
      "/home/butcher/.config/solana/anchor.json",
      "utf8"
    ))
  )
);

(async () => {
  const buyer = userKeypair;
  const amount = 1;

  const response = await fetch("http://localhost:3000/api", {
    method: "POST",
    body: JSON.stringify({ buyer: buyer.publicKey, amount, }),
  });
  const body = await response.json();

  const tx = VersionedTransaction.deserialize(Buffer.from(body.tx, "base64"));
  tx.sign([buyer]);

  const txSig = await connection.sendRawTransaction(tx.serialize(), { preflightCommitment: "confirmed" });
  console.log(txSig);
})();
