import {
  ArrowRightOnRectangleIcon,
  ArrowsRightLeftIcon,
  Bars3Icon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  WalletIcon,
} from "@heroicons/react/20/solid";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";

interface MobileMenuProps {
  pages?: Page[];
}

interface Page {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const MobileMenu = ({ pages }: MobileMenuProps) => (
  <Popover>
    <Popover.Button className="block rounded-md p-2 text-sky-100 hover:bg-gray-700">
      <Bars3Icon className="h-7 w-7" />
    </Popover.Button>

    <ScaleAndFadeTransition>
      <Popover.Panel className="absolute left-2 mt-1 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <nav className="p-1">
          {pages?.map(({ href, name, icon }) => (
            <Link
              href={href}
              key={href}
              className="flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-800 hover:bg-gray-800 hover:text-white"
            >
              {icon}
              {name}
            </Link>
          ))}

          <div className="bg-gray-50 py-2">
            <WalletButton />
          </div>
        </nav>
      </Popover.Panel>
    </ScaleAndFadeTransition>
  </Popover>
);

/* Wallet button, for now used only in the mobile menu */
const WalletButton = () => {
  const walletModal = useWalletModal();
  const { connected, disconnect, publicKey, wallet } = useWallet();
  const [copied, setCopied] = useState(false);

  const openModal = () => walletModal.setVisible(true);

  const handleCopy = async () => {
    if (publicKey) {
      await navigator.clipboard.writeText(publicKey.toBase58());
      setCopied(true);
    }
  };

  useEffect(() => {
    setTimeout(() => setCopied(false), 1000);
  }, [copied]);

  if (!connected) {
    return (
      <button
        onClick={openModal}
        className="flex w-full items-center justify-evenly rounded-lg p-2 text-sm text-gray-800 hover:bg-gray-200"
      >
        <WalletIcon className="mr-2 h-5 w-5" />
        <p className="mx-auto">Connect wallet...</p>
      </button>
    );
  }

  // TODO: add connecting state

  return (
    <Popover>
      <Popover.Button className="flex w-full items-center gap-2 rounded-lg p-2 text-sm text-gray-800 hover:bg-gray-200">
        {wallet && (
          <Image
            src={wallet.adapter.icon}
            alt={wallet.adapter.name}
            width={32}
            height={32}
            className="h-5 w-5"
          />
        )}
        <p className="truncate font-bold">{publicKey?.toBase58()}</p>
      </Popover.Button>
      <ScaleAndFadeTransition>
        <Popover.Panel className="absolute left-0 mt-4 w-48 divide-y divide-gray-100 rounded-md bg-gray-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-1 ">
            <button
              onClick={handleCopy}
              className="flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-800 hover:bg-gray-200"
            >
              {copied ? (
                <ClipboardDocumentCheckIcon className="mr-2 h-5 w-5" />
              ) : (
                <ClipboardDocumentIcon className="mr-2 h-5 w-5" />
              )}
              Copy address
            </button>
            <button
              onClick={openModal}
              className="flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-800 hover:bg-gray-200"
            >
              <ArrowsRightLeftIcon className="mr-2 h-5 w-5" />
              Change wallet...
            </button>
            <button
              onClick={disconnect}
              className="flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-800 hover:bg-gray-200"
            >
              <ArrowRightOnRectangleIcon className="mr-2 h-5 w-5" />
              Disconnect
            </button>
          </div>
        </Popover.Panel>
      </ScaleAndFadeTransition>
    </Popover>
  );
};

const ScaleAndFadeTransition = ({ children }: React.PropsWithChildren) => (
  <Transition
    as={Fragment}
    enter="transition ease-out duration-100"
    enterFrom="transform opacity-0 scale-95"
    enterTo="transform opacity-100 scale-100"
    leave="transition ease-in duration-75"
    leaveFrom="transform opacity-100 scale-100"
    leaveTo="transform opacity-0 scale-95"
  >
    {children}
  </Transition>
);

export default MobileMenu;
