"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

export function VideoEmbed({
  videoId,
  title,
  poster,
  posterAlt,
}: {
  videoId: string;
  title: string;
  poster: string;
  posterAlt: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="aspect-video overflow-hidden rounded-sm bg-sea">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group relative h-full w-full"
          aria-label={title}
        >
          <Image
            src={poster}
            alt={posterAlt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 64rem, 100vw"
          />
          <span className="absolute inset-0 bg-sea/25 transition group-hover:bg-sea/35" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-sand text-sea shadow-lg transition group-hover:scale-105 sm:size-20">
              <Play className="ml-1 size-7 fill-current sm:size-8" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
