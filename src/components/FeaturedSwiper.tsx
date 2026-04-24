"use client";

import Image from "next/image";
import Link from "next/link";
import { WpPost } from "@/lib/wp";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Clock } from "lucide-react";
import { getRelativeTime } from "@/lib/utils";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface FeaturedSwiperProps {
  posts: WpPost[];
}

export default function FeaturedSwiper({ posts }: FeaturedSwiperProps) {
  if (!posts || posts.length === 0) return null;

  const getFeaturedImageUrl = (post: WpPost) => {
    const media = post._embedded?.['wp:featuredmedia'];
    if (media && media.length > 0 && media[0].source_url) {
      return media[0].source_url;
    }
    return "https://via.placeholder.com/1200x600.png?text=Sem+Imagem";
  };

  return (
    <div className="w-full rounded-3xl overflow-hidden shadow-2xl mb-12">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-[50vh] md:h-[550px] w-full"
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <div className="relative w-full h-full group">
              <Image
                src={getFeaturedImageUrl(post)}
                alt="Destaque"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-3/4">
                <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                  {post._embedded?.['wp:term']?.[0]?.[0]?.name || "Notícia"}
                </span>
                <Link href={`/${post.slug}`}>
                  <h1 
                    className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg hover:text-blue-300 transition-colors"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                </Link>
                <div className="flex items-center text-gray-300 text-sm font-medium gap-4">
                  <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                  <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {getRelativeTime(post.date)}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
