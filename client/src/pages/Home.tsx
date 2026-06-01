/**
 * DESIGN: "Velvet Underground" — Cinematic Dark Luxury
 * - Deep navy-black base, warm gold accents
 * - Cinzel serif for headings, DM Sans for body
 * - Asymmetric hero, masonry-inspired track grid
 * - Smooth scroll reveals, hover effects
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { tracks, socialLinks, getYoutubeThumbnail, type Track } from "@/lib/tracks";
import { Youtube, Instagram, Facebook, Play, Music, Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663717952494/7fq3tAvW7VqE5bTKhyUqbk/hero-bg-8qJMMprqM2GN4rhKce3xgc.webp";
const WAVE_PATTERN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663717952494/7fq3tAvW7VqE5bTKhyUqbk/music-pattern-22suadU2atf9sCSvyJvWLE.webp";

// Animated waveform bars
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

// Navigation component
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
          <a
            href={socialLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-[oklch(1_0_0/10%)] hover:border-[oklch(0.75_0.18_45/60%)] hover:bg-[oklch(0.75_0.18_45/10%)] transition-all duration-200"
            aria-label="YouTube"
          >
            <Youtube className="w-4 h-4 text-[oklch(0.65_0.01_265)] group-hover:text-[oklch(0.7_0.2_25)] transition-colors" />
            <span className="hidden md:block text-xs text-[oklch(0.55_0.01_265)] group-hover:text-[oklch(0.85_0.005_65)] transition-colors">YouTube</span>
          </a>
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-[oklch(1_0_0/10%)] hover:border-[oklch(0.75_0.18_45/60%)] hover:bg-[oklch(0.75_0.18_45/10%)] transition-all duration-200"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4 text-[oklch(0.65_0.01_265)] group-hover:text-[oklch(0.75_0.2_340)] transition-colors" />
            <span className="hidden md:block text-xs text-[oklch(0.55_0.01_265)] group-hover:text-[oklch(0.85_0.005_65)] transition-colors">Instagram</span>
          </a>
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-[oklch(1_0_0/10%)] hover:border-[oklch(0.75_0.18_45/60%)] hover:bg-[oklch(0.75_0.18_45/10%)] transition-all duration-200"
            aria-label="Facebook"
          >
            <Facebook className="w-4 h-4 text-[oklch(0.65_0.01_265)] group-hover:text-[oklch(0.55_0.2_240)] transition-colors" />
            <span className="hidden md:block text-xs text-[oklch(0.55_0.01_265)] group-hover:text-[oklch(0.85_0.005_65)] transition-colors">Facebook</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

// Track card component
function TrackCard({ track, index }: { track: Track; index: number }) {
  const thumbnail = track.youtubeId
    ? getYoutubeThumbnail(track.youtubeId)
    : WAVE_PATTERN;

  return (
    <Link href={`/track/${track.slug}`}>
      <div
        className="track-card group relative rounded-xl overflow-hidden border border-[oklch(1_0_0/8%)] bg-[oklch(0.12_0.012_265)] cursor-pointer"
        style={{
          animationDelay: `${index * 50}ms`,
        }}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={thumbnail}
            alt={track.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              // Fallback to HQ default if maxresdefault not available
              const target = e.target as HTMLImageElement;
              if (track.youtubeId && target.src.includes('maxresdefault')) {
                target.src = `https://img.youtube.com/vi/${track.youtubeId}/hqdefault.jpg`;
              } else {
                target.src = WAVE_PATTERN;
              }
            }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.015_265)] via-transparent to-transparent opacity-80" />
          
          {/* Play button overlay on hover */}
          {track.youtubeId && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-14 h-14 rounded-full bg-[oklch(0.75_0.18_45)] flex items-center justify-center play-pulse shadow-lg">
                <Play className="w-6 h-6 text-[oklch(0.08_0.015_265)] fill-current ml-0.5" />
              </div>
            </div>
          )}

          {/* Track number */}
          <div className="absolute top-3 left-3">
            <span className="text-xs font-mono text-[oklch(0.75_0.18_45/70%)] bg-[oklch(0.08_0.015_265/80%)] px-2 py-0.5 rounded">
              #{String(track.id).padStart(2, '0')}
            </span>
          </div>

          {/* No video badge */}
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

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(24);
  const tracksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredTracks = tracks.filter(track =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedTracks = filteredTracks.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTracks.length;

  const scrollToTracks = () => {
    tracksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[oklch(0.08_0.015_265)]">
      
      {/* Özel CSS Animasyonları (Dalga ve Parlama) */}
      <style>{`
        @keyframes slowPan {
          0% { transform: scale(1.05) translate(0, 0); }
          50% { transform: scale(1.15) translate(-2%, 2%); }
          100% { transform: scale(1.05) translate(0, 0); }
        }
        .animate-cinematic {
          animation: slowPan 25s ease-in-out infinite;
        }
        @keyframes textShine {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .text-gold-animated {
          background: linear-gradient(135deg, oklch(0.85 0.2 50), oklch(0.98 0.25 70), oklch(0.65 0.15 40), oklch(0.85 0.2 50));
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: textShine 4s ease-in-out infinite;
        }
      `}</style>

      <Navbar scrolled={scrolled} />

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Hareketli Sinematik Arka Plan */}
        <div className="absolute inset-0 overflow-hidden bg-[oklch(0.08_0.015_265)]">
          <img
            src={HERO_BG}
            alt="Hero background"
            className="w-full h-full object-cover opacity-30"
          />
          <div
            className="absolute inset-0 opacity-40 pointer-events-none animate-cinematic mix-blend-screen"
            style={{
              backgroundImage: `url(${WAVE_PATTERN})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.08_0.015_265)] via-[oklch(0.08_0.015_265/80%)] to-[oklch(0.08_0.015_265/10%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.015_265)] via-transparent to-[oklch(0.08_0.015_265/30%)]" />
        </div>

        {/* Content */}
        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-2xl">
            {/* Label */}
            <div className="flex items-center gap-3 mb-6 reveal" style={{ animationDelay: "0ms" }}>
              <div className="gold-divider w-12" />
              <span className="text-xs tracking-[0.3em] uppercase text-[oklch(0.75_0.18_45)] font-medium">
                Resmi Müzik Kanalı
              </span>
            </div>

            {/* Main title (Parlayan Animasyonlu) */}
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-2 reveal"
              style={{ fontFamily: "'Cinzel', serif", animationDelay: "80ms" }}
            >
              <span className="block text-[oklch(0.95_0.005_65)]">NAİM</span>
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
              <div>
                <div className="text-2xl font-bold text-[oklch(0.75_0.18_45)]" style={{ fontFamily: "'Cinzel', serif" }}>71</div>
                <div className="text-xs text-[oklch(0.45_0.01_265)] tracking-wider uppercase">Parça</div>
              </div>
              <div className="w-px h-10 bg-[oklch(1_0_0/10%)]" />
              <div>
                <div className="text-2xl font-bold text-[oklch(0.75_0.18_45)]" style={{ fontFamily: "'Cinzel', serif" }}>47</div>
                <div className="text-xs text-[oklch(0.45_0.01_265)] tracking-wider uppercase">Video</div>
              </div>
              <div className="w-px h-10 bg-[oklch(1_0_0/10%)]" />
              <div>
                <div className="text-2xl font-bold text-[oklch(0.75_0.18_45)]" style={{ fontFamily: "'Cinzel', serif" }}>2020</div>
                <div className="text-xs text-[oklch(0.45_0.01_265)] tracking-wider uppercase">Yılından</div>
              </div>
            </div>

            {/* CTA Buttons */}
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

      {/* ── TRACKS SECTION ── */}
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
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(24);
                }}
                className="pl-9 bg-[oklch(0.12_0.012_265)] border-[oklch(1_0_0/10%)] text-[oklch(0.85_0.005_65)] placeholder:text-[oklch(0.35_0.01_265)] focus:border-[oklch(0.75_0.18_45/50%)] focus:ring-[oklch(0.75_0.18_45/20%)]"
              />
            </div>
          </div>

          {/* Gold divider */}
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
                onClick={() => setVisibleCount(v => v + 24)}
                className="px-8 py-3 border border-[oklch(0.75_0.18_45/40%)] text-[oklch(0.75_0.18_45)] rounded-full text-sm font-medium hover:bg-[oklch(0.75_0.18_45/10%)] hover:border-[oklch(0.75_0.18_45/80%)] active:scale-[0.97] transition-all duration-200"
              >
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
            {/* Brand */}
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

            {/* Social links */}
            <div className="flex items-center gap-4">
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-11 h-11 rounded-full border border-[oklch(1_0_0/10%)] flex items-center justify-center hover:border-[oklch(0.7_0.2_25/60%)] hover:bg-[oklch(0.7_0.2_25/10%)] transition-all duration-200"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-[oklch(0.45_0.01_265)] group-hover:text-[oklch(0.7_0.2_25)] transition-colors" />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-11 h-11 rounded-full border border-[oklch(1_0_0/10%)] flex items-center justify-center hover:border-[oklch(0.75_0.2_340/60%)] hover:bg-[oklch(0.75_0.2_340/10%)] transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-[oklch(0.45_0.01_265)] group-hover:text-[oklch(0.75_0.2_340)] transition-colors" />
              </a>
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-11 h-11 rounded-full border border-[oklch(1_0_0/10%)] flex items-center justify-center hover:border-[oklch(0.55_0.2_240/60%)] hover:bg-[oklch(0.55_0.2_240/10%)] transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-[oklch(0.45_0.01_265)] group-hover:text-[oklch(0.55_0.2_240)] transition-colors" />
              </a>
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
