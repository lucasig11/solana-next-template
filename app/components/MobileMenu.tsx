"use client";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Fragment } from "react";
import WalletMultiButton from "./WalletMultiButton";

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
            <WalletMultiButton className="w-full" />
          </div>
        </nav>
      </Popover.Panel>
    </ScaleAndFadeTransition>
  </Popover>
);

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
