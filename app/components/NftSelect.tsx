import Image from "next/image";
import { Fragment } from "react";
import { Nft } from "@metaplex-foundation/js";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface NftSelectorProps {
  nfts: Nft[];
  value?: Nft[];
  multiple?: boolean;
  onChange?: (selected: Nft[]) => void;
  text?: string;
  disabled?: boolean;
}

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

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
            <Listbox.Button className="relative w-full h-12 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
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
                {nfts.map((nft) => (
                  <Listbox.Option
                    key={nft.address.toBase58()}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9 h-16"
                      )
                    }
                    value={nft}
                  >
                    {({ selected, active }) => {
                      return (
                        <>
                          <div className="flex items-center">
                            {nft.json?.image ? (
                              <Image
                                src={nft.json.image || ""}
                                alt={nft.name}
                                height={48}
                                width={48}
                                className="flex-shrink-0 rounded-sm"
                              />
                            ) : (
                              <div className="flex-shrink-0 h-12 w-12 rounded-sm bg-gray-300" />
                            )}

                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "ml-3 block truncate"
                              )}
                            >
                              {nft.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      );
                    }}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
