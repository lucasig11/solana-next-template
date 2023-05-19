import { truncatePublicKey } from "@/utils/truncatePublicKey";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/20/solid";
import { Nft } from "@metaplex-foundation/js";
import Image from "next/image";
import { Fragment } from "react";

interface NftSelectorProps {
  nfts: Nft[];
  value?: Nft[];
  multiple?: boolean;
  onChange?: (selected: Nft[]) => void;
  text?: string;
  disabled?: boolean;
}

const SelectOption = (nft: Nft) => (
  <Listbox.Option
    value={nft}
    key={nft.address.toBase58()}
    className="relative h-16 cursor-default select-none py-2 pl-3 pr-9 text-gray-900 ui-active:bg-indigo-600 ui-active:text-white"
  >
    <div className="flex items-center">
      {nft.json?.image ? (
        <Image
          src={nft.json.image}
          alt={nft.json.name || nft.name}
          height={48}
          width={48}
          className="flex-shrink-0 rounded-sm"
        />
      ) : (
        <div className="h-12 w-12 flex-shrink-0 rounded-sm bg-gray-300 p-2">
          <ExclamationTriangleIcon className="m-auto h-8 w-8 text-gray-400" />
        </div>
      )}

      <span className="ml-3 block truncate font-normal ui-selected:font-semibold">
        {nft.json?.name || nft.name}
      </span>

      <span className="ml-3 block truncate text-xs font-semibold uppercase text-gray-400">
        {truncatePublicKey(nft.address.toString())}
      </span>
    </div>

    <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 ui-selected:flex ui-active:text-white">
      <CheckIcon className="h-5 w-5" aria-hidden="true" />
    </span>
  </Listbox.Option>
);

export default function NftSelect({
  nfts,
  text,
  disabled,
  ...props
}: NftSelectorProps) {
  return (
    <Listbox {...props} disabled={disabled}>
      {({ open }) => (
        <>
          <div className="relative w-full">
            <Listbox.Button className="relative h-12 w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="ml-3 block truncate">{text}</span>
              </span>

              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {nfts.map(SelectOption)}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
