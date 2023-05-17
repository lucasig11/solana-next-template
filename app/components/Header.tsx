"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";

export default function Header({ title }: { title: string }) {
  return (
    <nav className="flex flex-row items-center justify-evenly px-16 py-4 bg-gray-800 text-sky-100 fixed min-w-full max-h-16">
      <Link href="/" className="flex flex-row gap-2 min-w-fit">
        <h1 className="text-2xl font-bold align-middle">{title}</h1>
      </Link>
      <WalletMultiButton />
    </nav>
  );
}
