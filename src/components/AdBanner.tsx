import Image from 'next/image';
import { getBannersByFormat } from '@/lib/wp';

interface AdBannerProps {
  format: 'horizontal' | 'square' | 'vertical';
  className?: string;
}

export default async function AdBanner({ format, className = '' }: AdBannerProps) {
  const dimensions = {
    horizontal: 'w-full h-24 md:h-32', // approx 728x90
    square: 'w-full aspect-square', // approx 300x250
    vertical: 'w-full h-96', // approx 300x600
  };

  const banner = await getBannersByFormat(format);

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
    <div className={`bg-gray-100 flex flex-col items-center justify-center border border-gray-200 rounded-xl overflow-hidden ${dimensions[format]} ${className}`}>
      <span className="text-xs text-gray-400 uppercase tracking-widest mb-1">Publicidade</span>
      <span className="text-gray-500 font-medium">Espaço para Banner</span>
    </div>
  );
}
