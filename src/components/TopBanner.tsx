import Image from "next/image";
import Link from "next/link";

export default function TopBanner() {
  return (
    <div className="w-full bg-white border-b border-gray-100">
      <Link href="/" className="block w-full relative">

        {/* Banner Mobile — visível apenas em telas pequenas */}
        <div className="block md:hidden h-24 relative">
          <Image
            src="/banner.png"
            alt="Banner"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>

        {/* Banner Desktop — visível apenas em telas médias e maiores */}
        <div className="hidden md:block w-full">
          <Image
            src="/banner-desktop.jpeg"
            alt="Banner"
            width={1920}
            height={100}
            className="w-full h-auto"
            priority
            sizes="100vw"
          />
        </div>

      </Link>
    </div>
  );
}
