import Image from 'next/image';
import { getBannersByFormat } from '@/lib/wp';

interface AdBannerProps {
  format: 'horizontal' | 'square' | 'vertical';
  className?: string;
  slotIndex?: number;
}

export default async function AdBanner({ format, className = '', slotIndex }: AdBannerProps) {
  const dimensions = {
    horizontal: 'w-full h-24 md:h-32', // approx 728x90
    square: 'w-full aspect-square', // approx 300x250
    vertical: 'w-full h-96', // approx 300x600
  };

  const banner = await getBannersByFormat(format, slotIndex);

  if (banner && banner.imageUrl) {
    return (
      <a
        href={banner.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`block overflow-hidden relative ${dimensions[format]} ${className}`}
      >
        <Image
          src={banner.imageUrl}
          alt={`Banner ${format}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <span className="absolute top-0 right-0 bg-black/30 text-white text-[10px] px-1 uppercase z-10">
          Ad
        </span>
      </a>
    );
  }

  return (
    <div className={`block overflow-hidden relative ${dimensions[format]} ${className} bg-gray-200 animate-pulse flex items-center justify-center rounded`}>
      <span className="text-gray-400 text-xs uppercase tracking-widest">Publicidade</span>
    </div>
  );
}
