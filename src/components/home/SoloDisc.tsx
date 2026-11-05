"use client";

import { useRef, useState } from "react";
import { Pause, Play } from "@phosphor-icons/react";
import { Seal } from "@/components/Seal";

/**
 * O solo dele, no herói. O disco é o botão: gira a 33⅓ rpm enquanto toca, e o anel
 * dourado mostra o avanço. Nada toca sem o clique, e o arquivo só é baixado aí.
 */
export function SoloDisc() {
  const audio = useRef<HTMLAudioElement>(null);
  const [tocando, setTocando] = useState(false);
  const [feito, setFeito] = useState(0);

  return (
    <button
      type="button"
      onClick={() => (audio.current?.paused ? audio.current.play() : audio.current?.pause())}
      aria-label={tocando ? "Pausar o solo" : "Ouvir um solo do Pedro com a big band"}
      title={tocando ? "Pausar" : "Ouvir o solo"}
      data-tocando={tocando}
      className="disco group relative h-20 w-20 shrink-0 cursor-pointer rounded-full bg-night/85 text-brass lg:h-[104px] lg:w-[104px]"
    >
      <audio
        ref={audio}
        src="/audio/solo-bigband.m4a"
        preload="none"
        onPlay={() => setTocando(true)}
        onPause={() => setTocando(false)}
        onTimeUpdate={(e) => setFeito(e.currentTarget.currentTime / (e.currentTarget.duration || 59))}
      />
      <Seal className="disco-giro h-full w-full" />
      <svg viewBox="0 0 100 100" aria-hidden className="absolute inset-0 h-full w-full -rotate-90">
        <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeWidth="2" pathLength={1} strokeDasharray={`${feito} 1`} />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brass text-night transition-transform group-hover:scale-110 lg:h-[52px] lg:w-[52px]">
          {tocando ? <Pause size={22} weight="fill" aria-hidden /> : <Play size={22} weight="fill" aria-hidden />}
        </span>
      </span>
    </button>
  );
}
