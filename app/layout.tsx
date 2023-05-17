import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Solana Next.js Template",
  description: "A template for creating Solana dApps with Next.js",
};

const WalletProvider = dynamic(() => import("./components/WalletProvider"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <Header title={metadata.title} />
          <div className="min-h-screen p-16">{children}</div>
        </WalletProvider>
      </body>
    </html>
  );
}
