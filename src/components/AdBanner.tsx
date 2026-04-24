interface AdBannerProps {
  format: 'horizontal' | 'square' | 'vertical';
  className?: string;
}

export default function AdBanner({ format, className = '' }: AdBannerProps) {
  const dimensions = {
    horizontal: 'w-full h-24', // 728x90 approx
    square: 'w-full aspect-square', // 300x250 approx
    vertical: 'w-full h-96', // 300x600 approx
  };

  return (
    <div className={`bg-gray-100 flex flex-col items-center justify-center border border-gray-200 rounded-xl overflow-hidden ${dimensions[format]} ${className}`}>
      <span className="text-xs text-gray-400 uppercase tracking-widest mb-1">Publicidade</span>
      <span className="text-gray-500 font-medium">Espaço para Banner</span>
    </div>
  );
}
