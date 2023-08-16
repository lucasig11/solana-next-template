import * as splToken from "@solana/spl-token";
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import bs58 from "bs58";
import { NextRequest } from "next/server";

const tokenPrice = 0.0001e9;
const mintAddress = new PublicKey(process.env.TOKEN_MINT as string);
const vaultKeypair = Keypair.fromSecretKey(
  bs58.decode(process.env.VAULT_SECRET_KEY as string)
);
const vaultAta = splToken.getAssociatedTokenAddressSync(
  mintAddress,
  vaultKeypair.publicKey
);
const connection = new Connection(
  process.env.SOLANA_RPC_ENDPOINT as string,
  "confirmed"
);

export async function POST(request: NextRequest) {
  const { amount, buyer } = await request.json();

  if (!amount || !buyer) {
    return new Response("Missing amount or buyer", { status: 400 });
  }

  const buyerPublicKey = new PublicKey(buyer as string);
  const buyerAta = splToken.getAssociatedTokenAddressSync(
    mintAddress,
    buyerPublicKey
  );

  const nativeTransfer = SystemProgram.transfer({
    fromPubkey: buyerPublicKey,
    toPubkey: vaultKeypair.publicKey,
    lamports: amount * tokenPrice,
  });

  const tokenTransfer = splToken.createTransferInstruction(
    vaultAta,
    buyerAta,
    vaultKeypair.publicKey,
    amount
  );

  console.log(vaultAta.toBase58(), buyerAta.toBase58());
  console.log(vaultKeypair.publicKey.toBase58());

  const { blockhash } = await connection.getLatestBlockhash();

  const message = new TransactionMessage({
    recentBlockhash: blockhash,
    payerKey: buyerPublicKey,
    instructions: [nativeTransfer, tokenTransfer],
  }).compileToV0Message();

  const tx = new VersionedTransaction(message);
  tx.sign([vaultKeypair]);
  const serialized = Buffer.from(tx.serialize()).toString("base64");

  return new Response(JSON.stringify({ tx: serialized }));
}

export async function GET() {
  const body = {
    vault: vaultKeypair.publicKey.toBase58(),
    mint: mintAddress.toBase58(),
    tokenPrice: tokenPrice,
  };

  return new Response(JSON.stringify(body));
}
