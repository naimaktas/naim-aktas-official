/**
 * DESIGN: "Velvet Underground" — Cinematic Dark Luxury
 * - Deep navy-black base, warm gold accents
 * - Cinzel serif for headings, DM Sans for body
 * - Asymmetric hero, masonry-inspired track grid
 * - Canvas wave animation (PlayStation-style), animated gold title
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { tracks, socialLinks, getYoutubeThumbnail, type Track } from "@/lib/tracks";
import { Youtube, Instagram, Facebook, Play, Music, Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663717952494/7fq3tAvW7VqE5bTKhyUqbk/hero-bg-8qJMMprqM2GN4rhKce3xgc.webp";
const WAVE_PATTERN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663717952494/7fq3tAvW7VqE5bTKhyUqbk/music-pattern-22suadU2atf9sCSvyJvWLE.webp";

// ── Canvas Wave Background ──────────────────────────────────────────────────
function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const waves = [
      { amp: 38, freq: 0.008, speed: 0.012, phase: 0.0, yRatio: 0.45, color: "rgba(180,120,30,0.20)", width: 2.5 },
      { amp: 26, freq: 0.013, speed: 0.019, phase: 1.2, yRatio: 0.52, color: "rgba(220,160,50,0.14)", width: 1.8 },
      { amp: 52, freq: 0.006, speed: 0.008, phase: 2.5, yRatio: 0.38, color: "rgba(160,100,20,0.12)", width: 3.2 },
      { amp: 18, freq: 0.020, speed: 0.028, phase: 0.8, yRatio: 0.60, color: "rgba(255,200,80,0.10)", width: 1.2 },
      { amp: 44, freq: 0.010, speed: 0.015, phase: 3.8, yRatio: 0.55, color: "rgba(200,140,40,0.15)", width: 2.0 },
      { amp: 30, freq: 0.007, speed: 0.010, phase: 1.6, yRatio: 0.42, color: "rgba(255,180,60,0.09)", width: 1.5 },
      { amp: 60, freq: 0.005, speed: 0.006, phase: 0.3, yRatio: 0.48, color: "rgba(150,90,15,0.11)",  width: 3.8 },
      { amp: 20, freq: 0.018, speed: 0.022, phase: 2.1, yRatio: 0.35, color: "rgba(240,170,55,0.08)", width: 1.0 },
      { amp: 35, freq: 0.009, speed: 0.013, phase: 4.2, yRatio: 0.65, color: "rgba(195,135,38,0.13)", width: 2.2 },
      { amp: 22, freq: 0.015, speed: 0.020, phase: 0.6, yRatio: 0.50, color: "rgba(255,210,90,0.07)", width: 1.3 },
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

    const drawGlow = () => {
      const W = canvas.width, H = canvas.height;
      const gx = W * 0.62 + Math.sin(t * 0.005) * W * 0.06;
      const gy = H * 0.50 + Math.cos(t * 0.007) * H * 0.08;
      const pulse = 0.14 + 0.07 * Math.sin(t * 0.015);
      const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, H * 0.55);
      grad.addColorStop(0,   `rgba(180,120,20,${pulse})`);
      grad.addColorStop(0.4, `rgba(140,90,10,${pulse * 0.4})`);
      grad.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    };

    const drawWave = (wave: typeof waves[0]) => {
      const W = canvas.width, H = canvas.height;
      const baseY = H * wave.yRatio;
      ctx.beginPath();
      ctx.moveTo(0, baseY);
      for (let x = 0; x <= W; x += 3) {
        const y =
          baseY +
          Math.sin(x * wave.freq + wave.phase + t * wave.speed) * wave.amp +
          Math.sin(x * wave.freq * 1.7 + wave.phase * 0.8 + t * wave.speed * 1.3) * (wave.amp * 0.4);
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = wave.color;
      ctx.lineWidth   = wave.width;
      ctx.stroke();
    };

    const drawParticles = () => {
      const W = canvas.width, H = canvas.height;
      for (let i = 0; i < 20; i++) {
        const px = W * 0.35 + W * 0.65 * (((i / 20) + t * 0.0003) % 1);
        const py = H * (0.2 + 0.6 * Math.sin(i * 1.1 + t * 0.008));
        const alpha = 0.12 + 0.14 * Math.sin(t * 0.04 + i);
        const r = 1 + 1.5 * Math.abs(Math.sin(i * 2.3 + t * 0.01));
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,160,40,${alpha})`;
        ctx.fill();
      }
    };

    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGlow();
      waves.forEach(drawWave);
      drawParticles();
      t++;
      rafId = requestAnimationFrame(frame);
    };

    frame();
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.9 }}
    />
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-scrolled" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full border border-[oklch(0.75_0.18_45/50%)] flex items-center justify-center">
              <Music className="w-4 h-4 text-[oklch(0.75_0.18_45)]" />
            </div>
            <span
              className="font-bold text-sm tracking-[0.2em] uppercase text-[oklch(0.95_0.005_65)]"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Naim Aktaş
            </span>
          </div>
        </Link>

        {/* Social Links */}
        <div className="flex items-center gap-2 md:gap-4">
          {[
            { href: socialLinks.youtube,   Icon: Youtube,   hoverColor: "oklch(0.7_0.2_25)",   label: "YouTube"   },
            { href: socialLinks.instagram, Icon: Instagram, hoverColor: "oklch(0.75_0.2_340)", label: "Instagram" },
            { href: socialLinks.facebook,  Icon: Facebook,  hoverColor: "oklch(0.55_0.2_240)", label: "Facebook"  },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-[oklch(1_0_0/10%)] hover:border-[oklch(0.75_0.18_45/60%)] hover:bg-[oklch(0.75_0.18_45/10%)] transition-all duration-200"
              aria-label={label}
            >
              <Icon className="w-4 h-4 text-[oklch(0.65_0.01_265)] group-hover:text-[oklch(0.75_0.18_45)] transition-colors" />
              <span className="hidden md:block text-xs text-[oklch(0.55_0.01_265)] group-hover:text-[oklch(0.85_0.005_65)] transition-colors">
                {label}
              </span>
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
      <div
        className="track-card group relative rounded-xl overflow-hidden border border-[oklch(1_0_0/8%)] bg-[oklch(0.12_0.012_265)] cursor-pointer"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={thumbnail}
            alt={track.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (track.youtubeId && target.src.includes("maxresdefault")) {
                target.src = `https://img.youtube.com/vi/${track.youtubeId}/hqdefault.jpg`;
              } else {
                target.src = WAVE_PATTERN;
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.015_265)] via-transparent to-transparent opacity-80" />

          {track.youtubeId && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-14 h-14 rounded-full bg-[oklch(0.75_0.18_45)] flex items-center justify-center play-pulse shadow-lg">
                <Play className="w-6 h-6 text-[oklch(0.08_0.015_265)] fill-current ml-0.5" />
              </div>
            </div>
          )}

          <div className="absolute top-3 left-3">
            <span className="text-xs font-mono text-[oklch(0.75_0.18_45/70%)] bg-[oklch(0.08_0.015_265/80%)] px-2 py-0.5 rounded">
              #{String(track.id).padStart(2, "0")}
            </span>
          </div>

          {!track.youtubeId && (
            <div className="absolute top-3 right-3">
              <span className="text-xs text-[oklch(0.55_0.01_265)] bg-[oklch(0.08_0.015_265/80%)] px-2 py-0.5 rounded border border-[oklch(1_0_0/10%)]">
                Yakında
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3
            className="text-sm font-medium text-[oklch(0.92_0.005_65)] group-hover:text-[oklch(0.75_0.18_45)] transition-colors duration-200 line-clamp-2 leading-snug"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {track.title}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-[oklch(0.45_0.01_265)]">{track.date}</span>
            {track.youtubeId && (
              <div className="flex items-center gap-1">
                <WaveformBars count={5} className="h-4" />
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Home Page ───────────────────────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled]       = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(24);
  const tracksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredTracks = tracks.filter((track) =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const displayedTracks = filteredTracks.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTracks.length;

  const scrollToTracks = () => tracksRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-[oklch(0.08_0.015_265)]">

      {/* ── Global animation styles ── */}
      <style>{`
        /* PlayStation-style animated gold title */
        @keyframes goldFlow {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        .text-gold-animated {
          background: linear-gradient(
            120deg,
            oklch(0.72 0.16 42),
            oklch(0.92 0.22 58),
            oklch(0.98 0.26 70),
            oklch(0.88 0.20 55),
            oklch(0.72 0.16 42)
          );
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: goldFlow 3.5s ease-in-out infinite;
        }

        /* Soft glow pulse behind AKTAŞ */
        @keyframes titleGlow {
          0%, 100% { text-shadow: 0 0 40px oklch(0.75 0.18 45 / 0.15), 0 0 80px oklch(0.75 0.18 45 / 0.05); }
          50%       { text-shadow: 0 0 60px oklch(0.75 0.18 45 / 0.35), 0 0 120px oklch(0.75 0.18 45 / 0.15); }
        }
        .title-naim {
          animation: titleGlow 4s ease-in-out infinite;
        }

        /* Floating label shimmer */
        @keyframes labelShimmer {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 1; }
        }
        .hero-label {
          animation: labelShimmer 3s ease-in-out infinite;
        }

        /* Stat number count-up feel on load */
        @keyframes statReveal {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .stat-item {
          animation: statReveal 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
      `}</style>

      <Navbar scrolled={scrolled} />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Static hero image (low opacity base) */}
        <div className="absolute inset-0 bg-[oklch(0.08_0.015_265)]">
          <img
            src={HERO_BG}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        {/* ✨ Canvas wave animation — replaces static wave pattern */}
        <HeroCanvas />

        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.08_0.015_265)] via-[oklch(0.08_0.015_265/85%)] to-[oklch(0.08_0.015_265/10%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.015_265)] via-transparent to-[oklch(0.08_0.015_265/30%)] pointer-events-none" />

        {/* Content */}
        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-2xl">

            {/* Label */}
            <div className="flex items-center gap-3 mb-6 reveal hero-label" style={{ animationDelay: "0ms" }}>
              <div className="gold-divider w-12" />
              <span className="text-xs tracking-[0.3em] uppercase text-[oklch(0.75_0.18_45)] font-medium">
                Resmi Müzik Kanalı
              </span>
            </div>

            {/* ✨ Animated title */}
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-2 reveal"
              style={{ fontFamily: "'Cinzel', serif", animationDelay: "80ms" }}
            >
              <span className="block text-[oklch(0.95_0.005_65)] title-naim">NAİM</span>
              <span className="block text-gold-animated">AKTAŞ</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg md:text-xl text-[oklch(0.65_0.01_265)] mt-4 mb-8 font-light tracking-wide reveal"
              style={{ fontFamily: "'Raleway', sans-serif", animationDelay: "160ms" }}
            >
              Türk Halk Müziği &amp; Türkü Arşivi
            </p>

            {/* Stats */}
            <div className="flex items-center gap-8 mb-10 reveal" style={{ animationDelay: "240ms" }}>
              {[
                { value: "71",   label: "Parça"    },
                { value: "47",   label: "Video"    },
                { value: "2020", label: "Yılından" },
              ].map(({ value, label }, i) => (
                <>
                  {i > 0 && <div key={`div-${i}`} className="w-px h-10 bg-[oklch(1_0_0/10%)]" />}
                  <div key={label} className="stat-item" style={{ animationDelay: `${280 + i * 60}ms` }}>
                    <div className="text-2xl font-bold text-[oklch(0.75_0.18_45)]" style={{ fontFamily: "'Cinzel', serif" }}>
                      {value}
                    </div>
                    <div className="text-xs text-[oklch(0.45_0.01_265)] tracking-wider uppercase">{label}</div>
                  </div>
                </>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 reveal" style={{ animationDelay: "320ms" }}>
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-[oklch(0.75_0.18_45)] text-[oklch(0.08_0.015_265)] rounded-full font-semibold text-sm tracking-wide hover:bg-[oklch(0.82_0.18_45)] active:scale-[0.97] transition-all duration-200"
              >
                <Youtube className="w-4 h-4" />
                YouTube'da İzle
              </a>
              <button
                onClick={scrollToTracks}
                className="flex items-center gap-2 px-6 py-3 border border-[oklch(0.75_0.18_45/40%)] text-[oklch(0.85_0.005_65)] rounded-full font-medium text-sm tracking-wide hover:border-[oklch(0.75_0.18_45/80%)] hover:bg-[oklch(0.75_0.18_45/10%)] active:scale-[0.97] transition-all duration-200"
              >
                <Music className="w-4 h-4" />
                Tüm Parçalar
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToTracks}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[oklch(0.45_0.01_265)] hover:text-[oklch(0.75_0.18_45)] transition-colors animate-bounce"
          aria-label="Aşağı kaydır"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </section>

      {/* ── TRACKS ────────────────────────────────────────────────────────── */}
      <section ref={tracksRef} className="py-16 md:py-24">
        <div className="container">

          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="gold-divider w-8" />
                <span className="text-xs tracking-[0.3em] uppercase text-[oklch(0.75_0.18_45)]">Müzik Arşivi</span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold text-[oklch(0.95_0.005_65)]"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Tüm Parçalar
              </h2>
              <p className="text-sm text-[oklch(0.45_0.01_265)] mt-2">
                {filteredTracks.length} parça bulundu
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.45_0.01_265)]" />
              <Input
                type="text"
                placeholder="Parça ara..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(24); }}
                className="pl-9 bg-[oklch(0.12_0.012_265)] border-[oklch(1_0_0/10%)] text-[oklch(0.85_0.005_65)] placeholder:text-[oklch(0.35_0.01_265)] focus:border-[oklch(0.75_0.18_45/50%)] focus:ring-[oklch(0.75_0.18_45/20%)]"
              />
            </div>
          </div>

          <div className="gold-divider mb-12" />

          {/* Track grid */}
          {displayedTracks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {displayedTracks.map((track, index) => (
                <TrackCard key={track.id} track={track} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <Music className="w-12 h-12 text-[oklch(0.25_0.01_265)] mx-auto mb-4" />
              <p className="text-[oklch(0.45_0.01_265)]">Parça bulunamadı</p>
            </div>
          )}

          {/* Load more */}
          {hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={() => setVisibleCount((v) => v + 24)}
                className="px-8 py-3 border border-[oklch(0.75_0.18_45/40%)] text-[oklch(0.75_0.18_45)] rounded-full text-sm font-medium hover:bg-[oklch(0.75_0.18_45/10%)] hover:border-[oklch(0.75_0.18_45/80%)] active:scale-[0.97] transition-all duration-200"
              >
                Daha Fazla Göster ({filteredTracks.length - visibleCount} parça kaldı)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="border-t border-[oklch(1_0_0/8%)] py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3
                className="text-xl font-bold text-[oklch(0.95_0.005_65)] mb-1"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Naim Aktaş Official
              </h3>
              <p className="text-xs text-[oklch(0.35_0.01_265)] tracking-wider uppercase">
                Türk Halk Müziği
              </p>
            </div>

            <div className="flex items-center gap-4">
              {[
                { href: socialLinks.youtube,   Icon: Youtube,   hover: "oklch(0.7_0.2_25)",   label: "YouTube"   },
                { href: socialLinks.instagram, Icon: Instagram, hover: "oklch(0.75_0.2_340)", label: "Instagram" },
                { href: socialLinks.facebook,  Icon: Facebook,  hover: "oklch(0.55_0.2_240)", label: "Facebook"  },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-11 h-11 rounded-full border border-[oklch(1_0_0/10%)] flex items-center justify-center hover:border-[oklch(0.75_0.18_45/60%)] hover:bg-[oklch(0.75_0.18_45/10%)] transition-all duration-200"
                  aria-label={label}
                >
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
