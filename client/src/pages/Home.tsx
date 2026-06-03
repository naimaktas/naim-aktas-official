/**
 * DESIGN: "Velvet Underground" — Cinematic Dark Luxury
 * - PlayStation menü tarzı güçlü akan dalgalar
 * - 3 kolonlu hero hissi: sol içerik + orta video + sağ liste
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { tracks, socialLinks, getYoutubeThumbnail, type Track } from "@/lib/tracks";
import { Youtube, Instagram, Facebook, Play, Music, Search, ChevronDown, SkipForward, Volume2 } from "lucide-react";
import { Input } from "@/components/ui/input";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663717952494/7fq3tAvW7VqE5bTKhyUqbk/hero-bg-8qJMMprqM2GN4rhKce3xgc.webp";
const WAVE_PATTERN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663717952494/7fq3tAvW7VqE5bTKhyUqbk/music-pattern-22suadU2atf9sCSvyJvWLE.webp";

// ── PlayStation-style Canvas Wave ───────────────────────────────────────────
function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const waves = [
      { amp: 140, freq: .0028, speed: .007,  phase: 0.0,  yR: .52, col: "rgba(215,148,28,0.62)", w: 2.4 },
      { amp: 100, freq: .0044, speed: .011,  phase: 1.9,  yR: .45, col: "rgba(255,180,52,0.46)", w: 1.7 },
      { amp: 175, freq: .0020, speed: .005,  phase: 3.2,  yR: .58, col: "rgba(178,118,18,0.40)", w: 3.2 },
      { amp:  80, freq: .0062, speed: .016,  phase: 0.4,  yR: .40, col: "rgba(255,198,65,0.34)", w: 1.4 },
      { amp:  95, freq: .0050, speed: .010,  phase: 2.1,  yR: .63, col: "rgba(218,155,38,0.32)", w: 2.0 },
      { amp:  70, freq: .0072, speed: .018,  phase: 4.0,  yR: .36, col: "rgba(255,218,82,0.26)", w: 1.2 },
      { amp: 115, freq: .0038, speed: .008,  phase: 1.0,  yR: .68, col: "rgba(192,130,25,0.29)", w: 2.4 },
      { amp:  50, freq: .0108, speed: .022,  phase: 0.2,  yR: .48, col: "rgba(255,228,95,0.21)", w: 1.0 },
      { amp:  62, freq: .0082, speed: .014,  phase: 2.7,  yR: .55, col: "rgba(238,165,46,0.24)", w: 1.2 },
      { amp:  38, freq: .0138, speed: .025,  phase: 1.4,  yR: .43, col: "rgba(255,208,75,0.18)", w: 0.8 },
      { amp:  85, freq: .0055, speed: .011,  phase: 3.5,  yR: .60, col: "rgba(200,135,29,0.26)", w: 1.6 },
      { amp:  55, freq: .0092, speed: .017,  phase: 0.8,  yR: .38, col: "rgba(250,182,58,0.19)", w: 1.1 },
      { amp:  60, freq: .0035, speed: .009,  phase: 5.1,  yR: .22, col: "rgba(200,140,25,0.20)", w: 1.5 },
      { amp:  55, freq: .0030, speed: .008,  phase: 2.3,  yR: .80, col: "rgba(190,128,22,0.18)", w: 1.4 },
    ];

    let t = 0;
    let rafId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width  = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const drawBigGlow = () => {
      const W = canvas.width, H = canvas.height;
      const gx = W * .65 + Math.sin(t * .004) * W * .06;
      const gy = H * .50 + Math.cos(t * .006) * H * .07;
      const p  = .36 + .15 * Math.sin(t * .011);
      const g1 = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(W, H) * .72);
      g1.addColorStop(0,    `rgba(218,145,24,${p})`);
      g1.addColorStop(.25,  `rgba(175,112,15,${p * .58})`);
      g1.addColorStop(.55,  `rgba(125,78,9,${p * .22})`);
      g1.addColorStop(1,    "rgba(0,0,0,0)");
      ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);

      const gx2 = W * .82 + Math.sin(t * .007 + 1) * W * .04;
      const gy2 = H * .74 + Math.cos(t * .005 + 2) * H * .08;
      const p2  = .22 + .10 * Math.sin(t * .014 + 1.5);
      const g2  = ctx.createRadialGradient(gx2, gy2, 0, gx2, gy2, H * .50);
      g2.addColorStop(0,   `rgba(255,185,42,${p2})`);
      g2.addColorStop(.5,  `rgba(182,122,21,${p2 * .32})`);
      g2.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);

      const gx3 = W * .88 + Math.sin(t * .009 + 3) * W * .03;
      const gy3 = H * .12 + Math.sin(t * .008) * H * .05;
      const p3  = .18 + .08 * Math.sin(t * .017);
      const g3  = ctx.createRadialGradient(gx3, gy3, 0, gx3, gy3, H * .40);
      g3.addColorStop(0,   `rgba(255,205,65,${p3})`);
      g3.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = g3; ctx.fillRect(0, 0, W, H);

      const gx4 = W * .28;
      const gy4 = H * .45 + Math.sin(t * .006) * H * .04;
      const p4  = .08 + .04 * Math.sin(t * .013 + 2);
      const g4  = ctx.createRadialGradient(gx4, gy4, 0, gx4, gy4, W * .35);
      g4.addColorStop(0,   `rgba(200,138,22,${p4})`);
      g4.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = g4; ctx.fillRect(0, 0, W, H);
    };

    const drawWave = (wave: typeof waves[0]) => {
      const W = canvas.width, H = canvas.height;
      const baseY = H * wave.yR;
      ctx.beginPath(); ctx.moveTo(0, baseY);
      for (let x = 0; x <= W; x += 2) {
        const y = baseY
          + Math.sin(x * wave.freq + wave.phase + t * wave.speed) * wave.amp
          + Math.sin(x * wave.freq * 2.1 + wave.phase * 1.3 + t * wave.speed * 1.5) * (wave.amp * .35)
          + Math.sin(x * wave.freq * .5  + t * wave.speed * .7) * (wave.amp * .22);
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = wave.col;
      ctx.lineWidth   = wave.w;
      ctx.stroke();
    };

    const drawParticles = () => {
      const W = canvas.width, H = canvas.height;
      for (let i = 0; i < 35; i++) {
        const px  = W * .25 + W * .75 * (((i / 35) + t * .00017) % 1);
        const wv  = waves[i % waves.length];
        const by  = H * wv.yR;
        const py  = by + Math.sin(px * wv.freq + wv.phase + t * wv.speed) * wv.amp;
        const al  = .14 + .30 * Math.abs(Math.sin(t * .03 + i * .7));
        const r   = .7 + 2.5 * Math.abs(Math.sin(i * 1.9 + t * .015));
        ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,202,62,${al})`;
        ctx.fill();
      }
    };

    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBigGlow();
      waves.forEach(drawWave);
      drawParticles();
      t++;
      rafId = requestAnimationFrame(frame);
    };
    frame();
    return () => { cancelAnimationFrame(rafId); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// ── Medya Alanı: Video (Orta) + Liste (Sağ) ─────────────────────────────────────
function HeroPlayer() {
  const videoTracks = tracks.filter((t) => t.youtubeId).slice(0, 75); // Listenin dolması için 75 yaptık
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // <-- İstediğimiz satırı buraya ekledik

  if (videoTracks.length === 0) return null;

  const currentTrack = videoTracks[current];
  const next = () => setCurrent((c) => (c + 1) % videoTracks.length);

  return (
    <div className="relative z-10 flex flex-col md:flex-row gap-4 w-full h-full items-stretch justify-start">
      
      {/* Video ekranı (Orta) */}
      <div className="flex-[3] flex flex-col relative rounded-xl overflow-hidden border border-[oklch(0.75_0.18_45/20%)] shadow-[0_0_40px_oklch(0.75_0.18_45/15%)]">
        <div className="relative aspect-video bg-black flex-1">
          {playing ? (
            <iframe
              key={currentTrack.youtubeId}
              src={`https://www.youtube.com/embed/${currentTrack.youtubeId}?autoplay=1&rel=0&modestbranding=1&mute=${isMuted ? 1 : 0}`}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <>
              <img
                src={getYoutubeThumbnail(currentTrack.youtubeId!)}
                alt={currentTrack.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${currentTrack.youtubeId}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 bg-[oklch(0_0_0/30%)] flex items-center justify-center">
                <button
                  onClick={() => setPlaying(true)}
                  className="w-16 h-16 rounded-full bg-[oklch(0.75_0.18_45)] flex items-center justify-center hover:bg-[oklch(0.82_0.18_45)] transition-all duration-200 shadow-[0_0_30px_oklch(0.75_0.18_45/50%)] hover:scale-105 active:scale-95"
                >
                  <Play className="w-7 h-7 text-[oklch(0.08_0.015_265)] fill-current ml-0.5" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Şu an çalan bilgisi */}
        <div className="bg-[oklch(0.10_0.015_265/95%)] px-4 py-3 flex items-center justify-between border-t border-[oklch(0.75_0.18_45/15%)] shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <button 
              onClick={() => setIsMuted(!isMuted)} 
              className="p-1 rounded hover:bg-[oklch(1_0_0/5%)] transition-colors"
            >
              <Volume2 className={`w-3.5 h-3.5 shrink-0 transition-colors ${isMuted ? "text-red-500 opacity-50" : "text-[oklch(0.75_0.18_45)]"}`} />
            </button>
            <span className="text-xs text-[oklch(0.80_0.005_65)] truncate" style={{ fontFamily: "'Cinzel', serif" }}>
              {currentTrack.title}
            </span>
          </div>
          <button
            onClick={() => { next(); setPlaying(false); }}
            className="ml-2 p-1 rounded hover:text-[oklch(0.75_0.18_45)] text-[oklch(0.50_0.01_265)] transition-colors shrink-0"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>

     {/* Mini liste (Sağ) - Kademeli Solma Efektli */}
      <div className="flex-1 md:max-w-[320px] flex flex-col gap-1.5 self-start w-full">
        {videoTracks.map((track, i) => {
          const diff = i - current;
          
          // Geçmiş şarkıları ve sonraki 5. şarkıdan sonrasını listeleme (Kutuyu temiz tutar)
          if (diff < 0 || diff > 4) return null;

          // Mesafeye göre opaklık (solma) dereceleri
          const opacityClass = 
            diff === 0 ? "opacity-100" :
            diff === 1 ? "opacity-70" :
            diff === 2 ? "opacity-40" :
            diff === 3 ? "opacity-15" : 
            "opacity-5";

          return (
            <button
              key={track.id}
              onClick={() => { setCurrent(i); setPlaying(true); }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-300 ${opacityClass} ${
                i === current
                  ? "bg-[oklch(0.75_0.18_45/18%)] border border-[oklch(0.75_0.18_45/35%)] shadow-[0_0_15px_oklch(0.75_0.18_45/10%)] scale-[1.02]"
                  : "hover:bg-[oklch(1_0_0/5%)] border border-transparent hover:opacity-100"
              }`}
            >
              <span className={`text-xs font-mono shrink-0 w-5 text-right ${i === current ? "text-[oklch(0.75_0.18_45)]" : "text-[oklch(0.55_0.01_265)]"}`}>
                {i === current ? "▶" : String(i + 1).padStart(2, "0")}
              </span>
              <span className={`text-sm truncate ${i === current ? "text-[oklch(0.90_0.005_65)] font-medium" : "text-[oklch(0.75_0.01_265)]"}`}
                style={{ fontFamily: "'Cinzel', serif" }}>
                {track.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
// ── Waveform Bars ───────────────────────────────────────────────────────────
function WaveformBars({ count = 12, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`flex items-end gap-[3px] h-8 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="wave-bar w-[3px] rounded-full"
          style={{
            height: `${Math.random() * 60 + 40}%`,
            background: `oklch(0.75 0.18 45 / ${0.4 + Math.random() * 0.6})`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: `${0.8 + Math.random() * 0.8}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── Navbar ──────────────────────────────────────────────────────────────────
function Navbar({ scrolled }: { scrolled: boolean }) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-scrolled" : "bg-transparent"}`}>
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link href="/">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[oklch(0.75_0.18_45/50%)] flex items-center justify-center">
              <Music className="w-4 h-4 text-[oklch(0.75_0.18_45)]" />
            </div>
            <span className="font-bold text-sm tracking-[0.2em] uppercase text-[oklch(0.95_0.005_65)]" style={{ fontFamily: "'Cinzel', serif" }}>
              Naim Aktaş
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          {[
            { href: socialLinks.youtube,   Icon: Youtube,   label: "YouTube"   },
            { href: socialLinks.instagram, Icon: Instagram, label: "Instagram" },
            { href: socialLinks.facebook,  Icon: Facebook,  label: "Facebook"  },
          ].map(({ href, Icon, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-[oklch(1_0_0/10%)] hover:border-[oklch(0.75_0.18_45/60%)] hover:bg-[oklch(0.75_0.18_45/10%)] transition-all duration-200"
              aria-label={label}>
              <Icon className="w-4 h-4 text-[oklch(0.65_0.01_265)] group-hover:text-[oklch(0.75_0.18_45)] transition-colors" />
              <span className="hidden md:block text-xs text-[oklch(0.55_0.01_265)] group-hover:text-[oklch(0.85_0.005_65)] transition-colors">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ── Track Card ──────────────────────────────────────────────────────────────
function TrackCard({ track, index }: { track: Track; index: number }) {
  const thumbnail = track.youtubeId ? getYoutubeThumbnail(track.youtubeId) : WAVE_PATTERN;
  return (
    <Link href={`/track/${track.slug}`}>
      <div className="track-card group relative rounded-xl overflow-hidden border border-[oklch(1_0_0/8%)] bg-[oklch(0.12_0.012_265)] cursor-pointer" style={{ animationDelay: `${index * 50}ms` }}>
        <div className="relative aspect-video overflow-hidden">
          <img src={thumbnail} alt={track.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              if (track.youtubeId && t.src.includes("maxresdefault")) t.src = `https://img.youtube.com/vi/${track.youtubeId}/hqdefault.jpg`;
              else t.src = WAVE_PATTERN;
            }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.015_265)] via-transparent to-transparent opacity-80" />
          {track.youtubeId && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-14 h-14 rounded-full bg-[oklch(0.75_0.18_45)] flex items-center justify-center play-pulse shadow-lg">
                <Play className="w-6 h-6 text-[oklch(0.08_0.015_265)] fill-current ml-0.5" />
              </div>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className="text-xs font-mono text-[oklch(0.75_0.18_45/70%)] bg-[oklch(0.08_0.015_265/80%)] px-2 py-0.5 rounded">#{String(track.id).padStart(2, "0")}</span>
          </div>
          {!track.youtubeId && (
            <div className="absolute top-3 right-3">
              <span className="text-xs text-[oklch(0.55_0.01_265)] bg-[oklch(0.08_0.015_265/80%)] px-2 py-0.5 rounded border border-[oklch(1_0_0/10%)]">Yakında</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium text-[oklch(0.92_0.005_65)] group-hover:text-[oklch(0.75_0.18_45)] transition-colors duration-200 line-clamp-2 leading-snug" style={{ fontFamily: "'Cinzel', serif" }}>{track.title}</h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-[oklch(0.45_0.01_265)]">{track.date}</span>
            {track.youtubeId && <WaveformBars count={5} className="h-4" />}
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Home Page ───────────────────────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled]         = useState(false);
  const [searchQuery, setSearchQuery]   = useState("");
  const [visibleCount, setVisibleCount] = useState(24);
  const tracksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const filteredTracks  = tracks.filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const displayedTracks = filteredTracks.slice(0, visibleCount);
  const hasMore         = visibleCount < filteredTracks.length;
  const scrollToTracks  = () => tracksRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-[oklch(0.07_0.018_265)]">

      <style>{`
        @keyframes goldFlow {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        .text-gold-animated {
          background: linear-gradient(110deg,
            #6a3c06 0%, #c4841a 14%, #f2c038 28%,
            #ffe375 42%, #f8d060 55%, #c4841a 70%,
            #6a3c06 84%, #c4841a 100%);
          background-size: 250% 250%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: goldFlow 2.6s ease-in-out infinite;
          filter: drop-shadow(0 0 24px rgba(200,140,25,.50));
        }
        @keyframes naimGlow {
          0%,100% { text-shadow: 0 0 30px rgba(240,215,155,.06); }
          50%      { text-shadow: 0 0 60px rgba(240,215,155,.20), 0 0 100px rgba(200,140,30,.10); }
        }
        .title-naim { animation: naimGlow 4s ease-in-out infinite; }
        @keyframes lblPulse { 0%,100%{opacity:.72} 50%{opacity:1} }
        .hero-label { animation: lblPulse 3s ease-in-out infinite; }
      `}</style>

      <Navbar scrolled={scrolled} />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[oklch(0.07_0.018_265)]" />
        <img src={HERO_BG} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none" />

        {/* Canvas dalgalar */}
        <HeroCanvas />

        {/* Sol koyu gradyan — içerik okunabilirliği */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to right, oklch(0.07 0.018 265) 25%, oklch(0.07 0.018 265 / 0.65) 50%, transparent 75%)" }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, oklch(0.07 0.018 265) 0%, transparent 30%)" }} />

        {/* ── İçerik Alanı ── */}
        <div className="container relative z-10 pt-20 pb-10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">

            {/* SOL — Başlık ve bilgiler */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-4 hero-label">
                <div className="gold-divider w-12" />
                <span className="text-[11px] tracking-[0.32em] uppercase text-[oklch(0.75_0.18_45)] font-medium">
                  Resmi Müzik Kanalı
                </span>
              </div>

              <h1 className="font-bold leading-[0.88] tracking-tight reveal" style={{ fontFamily: "'Cinzel', serif", animationDelay: "80ms" }}>
                <span className="block title-naim" style={{ fontSize: "clamp(3.8rem, 8vw, 7rem)", color: "oklch(0.96 0.005 65)" }}>NAİM</span>
                <span className="block text-gold-animated" style={{ fontSize: "clamp(3.8rem, 8vw, 7rem)" }}>AKTAŞ</span>
              </h1>

              <p className="text-base text-[oklch(0.58_0.01_265)] mt-3 mb-5 font-light tracking-[0.14em] reveal"
                style={{ fontFamily: "'Raleway', sans-serif", animationDelay: "160ms" }}>
                Türk Halk Müziği &amp; Türkü Arşivi
              </p>

              <div className="flex items-center gap-7 mb-6 reveal" style={{ animationDelay: "240ms" }}>
                {[{ v: "71", l: "Parça" }, { v: "47", l: "Video" }, { v: "2020", l: "Yılından" }].map(({ v, l }, i) => (
                  <div key={l} className="flex items-center gap-7">
                    {i > 0 && <div className="w-px h-10 bg-[oklch(1_0_0/10%)]" />}
                    <div>
                      <div className="text-2xl font-bold text-[oklch(0.76_0.18_45)]" style={{ fontFamily: "'Cinzel', serif" }}>{v}</div>
                      <div className="text-[10px] text-[oklch(0.40_0.01_265)] tracking-[0.22em] uppercase mt-0.5">{l}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 reveal" style={{ animationDelay: "320ms" }}>
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-[oklch(0.75_0.18_45)] text-[oklch(0.08_0.015_265)] rounded-full font-semibold text-sm tracking-wide hover:bg-[oklch(0.82_0.18_45)] active:scale-[0.97] transition-all duration-200">
                  <Youtube className="w-4 h-4" />
                  YouTube'da İzle
                </a>
                <button onClick={scrollToTracks}
                  className="flex items-center gap-2 px-6 py-3 border border-[oklch(0.75_0.18_45/45%)] text-[oklch(0.85_0.005_65)] rounded-full font-medium text-sm tracking-wide hover:border-[oklch(0.75_0.18_45/80%)] hover:bg-[oklch(0.75_0.18_45/10%)] active:scale-[0.97] transition-all duration-200">
                  <Music className="w-4 h-4" />
                  Tüm Parçalar
                </button>
              </div>
            </div>

            {/* ORTA VE SAĞ BİRLEŞİK — Medya Player ve Liste */}
            <div className="w-full lg:w-[55%] xl:w-[60%] reveal" style={{ animationDelay: "200ms" }}>
              <HeroPlayer />
            </div>
          </div>
        </div>

        <button onClick={scrollToTracks}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[oklch(0.38_0.01_265)] hover:text-[oklch(0.75_0.18_45)] transition-colors animate-bounce"
          aria-label="Aşağı kaydır">
          <ChevronDown className="w-5 h-5" />
        </button>
      </section>

      {/* ── PARÇALAR ── */}
      <section ref={tracksRef} className="py-16 md:py-24">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="gold-divider w-8" />
                <span className="text-xs tracking-[0.3em] uppercase text-[oklch(0.75_0.18_45)]">Müzik Arşivi</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[oklch(0.95_0.005_65)]" style={{ fontFamily: "'Cinzel', serif" }}>Tüm Parçalar</h2>
              <p className="text-sm text-[oklch(0.45_0.01_265)] mt-2">{filteredTracks.length} parça bulundu</p>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.45_0.01_265)]" />
              <Input type="text" placeholder="Parça ara..." value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(24); }}
                className="pl-9 bg-[oklch(0.12_0.012_265)] border-[oklch(1_0_0/10%)] text-[oklch(0.85_0.005_65)] placeholder:text-[oklch(0.35_0.01_265)] focus:border-[oklch(0.75_0.18_45/50%)] focus:ring-[oklch(0.75_0.18_45/20%)]" />
            </div>
          </div>
          <div className="gold-divider mb-12" />
          {displayedTracks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {displayedTracks.map((track, index) => <TrackCard key={track.id} track={track} index={index} />)}
            </div>
          ) : (
            <div className="text-center py-24">
              <Music className="w-12 h-12 text-[oklch(0.25_0.01_265)] mx-auto mb-4" />
              <p className="text-[oklch(0.45_0.01_265)]">Parça bulunamadı</p>
            </div>
          )}
          {hasMore && (
            <div className="text-center mt-12">
              <button onClick={() => setVisibleCount((v) => v + 24)}
                className="px-8 py-3 border border-[oklch(0.75_0.18_45/40%)] text-[oklch(0.75_0.18_45)] rounded-full text-sm font-medium hover:bg-[oklch(0.75_0.18_45/10%)] hover:border-[oklch(0.75_0.18_45/80%)] active:scale-[0.97] transition-all duration-200">
                Daha Fazla Göster ({filteredTracks.length - visibleCount} parça kaldı)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[oklch(1_0_0/8%)] py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-[oklch(0.95_0.005_65)] mb-1" style={{ fontFamily: "'Cinzel', serif" }}>Naim Aktaş Official</h3>
              <p className="text-xs text-[oklch(0.35_0.01_265)] tracking-wider uppercase">Türk Halk Müziği</p>
            </div>
            <div className="flex items-center gap-4">
              {[
                { href: socialLinks.youtube,   Icon: Youtube,   label: "YouTube"   },
                { href: socialLinks.instagram, Icon: Instagram, label: "Instagram" },
                { href: socialLinks.facebook,  Icon: Facebook,  label: "Facebook"  },
              ].map(({ href, Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="group w-11 h-11 rounded-full border border-[oklch(1_0_0/10%)] flex items-center justify-center hover:border-[oklch(0.75_0.18_45/60%)] hover:bg-[oklch(0.75_0.18_45/10%)] transition-all duration-200"
                  aria-label={label}>
                  <Icon className="w-5 h-5 text-[oklch(0.45_0.01_265)] group-hover:text-[oklch(0.75_0.18_45)] transition-colors" />
                </a>
              ))}
            </div>
          </div>
          <div className="gold-divider my-8" />
          <p className="text-center text-xs text-[oklch(0.3_0.01_265)]">
            © 2020–{new Date().getFullYear()} Naim Aktaş Official. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </div>
  );
}
