import Link from "next/link";
import MobileMenu from "./MobileMenu";
import WalletMultiButton from "./WalletMultiButton";

interface HeaderProps {
  title: string;
  pages?: Page[];
}

interface Page {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export default function Header({ title, pages }: HeaderProps) {
  return (
    <header className="fixed z-50 flex h-16 w-full flex-row items-center justify-evenly bg-gray-800 p-4 text-sky-100 ">
      <div className="fixed left-4 top-2 md:hidden">
        <MobileMenu pages={pages} />
      </div>

      <Link
        href="/"
        className="m-auto flex min-w-fit flex-row gap-2 pl-9 text-xl font-bold md:m-0 md:p-0 md:text-2xl"
      >
        {title}
      </Link>

      <nav className="mx-4 hidden divide-x divide-sky-100 md:flex">
        {pages?.map(({ href, name }) => (
          <Link href={href} key={href} className="text-md px-4">
            <span>{name}</span>
          </Link>
        ))}
      </nav>

      <WalletMultiButton className="hidden w-fit text-sky-100 hover:text-gray-800 md:order-2 md:flex" />
    </header>
  );
}
