"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";

export default function Header({ title }: { title: string }) {
  return (
    <nav className="fixed flex max-h-16 min-w-full flex-row items-center justify-evenly bg-gray-800 px-16 py-4 text-sky-100">
      <Link href="/" className="flex min-w-fit flex-row gap-2">
        <h1 className="align-middle text-2xl font-bold">{title}</h1>
      </Link>
      <WalletMultiButton />
    </nav>
  );
}
