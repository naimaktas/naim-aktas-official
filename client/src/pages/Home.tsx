/**
 * DESIGN: "Velvet Underground" — Cinematic Dark Luxury
 * - PlayStation menü tarzı güçlü akan dalgalar
 * - 3 bölümlü dengeli Hero: Sol (İsim/Başlık), Orta (Aktif Player), Sağ (Sıradaki Şarkı)
 * - Tamamen nizami, dikeyde ortalanmış ve hizalanmış esnek grid yapısı
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

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // 3 complex waves with different phases
    const waves = [
      { y: height * 0.5,  length: 0.002, amplitude: 80,  speed: 0.02,  phase: 0,   color: "oklch(0.75 0.18 45 / 12%)" },
      { y: height * 0.55, length: 0.0015, amplitude: 120, speed: -0.015, phase: 2,   color: "oklch(0.85 0.2 60 / 8%)" },
      { y: height * 0.45, length: 0.003, amplitude: 60,  speed: 0.025, phase: 4,   color: "oklch(0.65 0.15 40 / 6%)" },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.background = "transparent";

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, wave.y);

        for (let x = 0; x < width; x++) {
          // Combination of sin/cos for PlayStation style fluid movement
          const sin1 = Math.sin(x * wave.length + wave.phase);
          const sin2 = Math.cos(x * (wave.length * 0.5) + wave.phase * 0.7);
          const y = wave.y + (sin1 + sin2) * wave.amplitude;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();

        wave.phase += wave.speed;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen" />;
}

// ── Waveform Animation Mini ──────────────────────────────────────────────────
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

// ── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ scrolled }: { scrolled: boolean }) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-scrolled" : "bg-transparent"}`}>
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link href="/">
          <div className="flex items-center gap-3 group cursor-pointer">
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
            { href: socialLinks.youtube,   Icon: Youtube,   color: "group-hover:text-[oklch(0.7_0.2_25)]",   label: "YouTube"   },
            { href: socialLinks.instagram, Icon: Instagram, color: "group-hover:text-[oklch(0.75_0.2_340)]", label: "Instagram" },
            { href: socialLinks.facebook,  Icon: Facebook,  color: "group-hover:text-[oklch(0.55_0.2_240)]", label: "Facebook"  },
          ].map(({ href, Icon, color, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-[oklch(1_0_0/10%)] hover:border-[oklch(0.75_0.18_45/60%)] hover:bg-[oklch(0.75_0.18_45/10%)] transition-all duration-200">
              <Icon className={`w-4 h-4 text-[oklch(0.65_0.01_265)] ${color} transition-colors`} />
              <span className="hidden md:block text-xs text-[oklch(0.55_0.01_265)] group-hover:text-[oklch(0.85_0.005_65)] transition-colors">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ── Track Card ───────────────────────────────────────────────────────────────
function TrackCard({ track, index }: { track: Track; index: number }) {
  const thumbnail = track.youtubeId ? getYoutubeThumbnail(track.youtubeId) : WAVE_PATTERN;

  return (
    <Link href={`/track/${track.slug}`}>
      <div className="track-card group relative rounded-xl overflow-hidden border border-[oklch(1_0_0/8%)] bg-[oklch(0.12_0.012_265)] cursor-pointer" style={{ animationDelay: `${index * 50}ms` }}>
        <div className="relative aspect-video overflow-hidden">
          <img src={thumbnail} alt={track.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (track.youtubeId && target.src.includes('maxresdefault')) {
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
              #{String(track.id).padStart(2, '0')}
            </span>
          </div>

          {!track.youtubeId && (
            <div className="absolute top-3 right-3">
              <span className="text-xs text-[oklch(0.55_0.01_265)] bg-[oklch(0.08_0.015_265/80%)] px-2 py-0.5 rounded border border-[oklch(1_0_0/10%)]">Yakında</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-sm font-medium text-[oklch(0.92_0.005_65)] group-hover:text-[oklch(0.75_0.18_45)] transition-colors duration-200 line-clamp-2 leading-snug" style={{ fontFamily: "'Cinzel', serif" }}>
            {track.title}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-[oklch(0.45_0.01_265)]">{track.date}</span>
            {track.youtubeId && <WaveformBars count={5} className="h-4" />}
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Main Home Component ──────────────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(24);
  const tracksRef = useRef<HTMLDivElement>(null);

  // Mini-Player States
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const playableTracks = tracks.filter(t => t.youtubeId);
  const currentTrack = playableTracks[currentTrackIndex] || tracks[0];
  const nextTrack = playableTracks[(currentTrackIndex + 1) % playableTracks.length] || tracks[1];

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

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playableTracks.length);
  };

  return (
    <div className="min-h-screen bg-[oklch(0.08_0.015_265)] text-[oklch(0.85_0.005_65)]">
      <style>{`
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

      {/* ── HERO SECTION (3 Column Balanced Layout) ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10 px-4">
        {/* Background Layer */}
        <div className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none" style={{ backgroundImage: `url(${HERO_BG})` }} />
        <HeroCanvas />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.015_265)] via-transparent to-[oklch(0.08_0.015_265/40%)]" />

        {/* 3 Column Grid Container */}
        <div className="container relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-20">
          
          {/* SOL KOLON: İsim ve Başlık Alanı */}
          <div className="lg:col-span-4 flex flex-col justify-center text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <div className="w-10 h-[1px] bg-[oklch(0.75_0.18_45/60%)]" />
              <span className="text-xs tracking-[0.3em] uppercase text-[oklch(0.75_0.18_45)] font-medium">Resmi Kanal</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
              <span className="block text-[oklch(0.95_0.005_65)]">NAİM</span>
              <span className="block text-gold-animated">AKTAŞ</span>
            </h1>
            <p className="text-sm md:text-base text-[oklch(0.55_0.01_265)] tracking-widest uppercase font-light">
              Türk Halk Müziği Arşivi
            </p>
          </div>

          {/* ORTA KOLON: Tam Ortalanmış Canlı Medya Oynatıcı */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="w-full max-w-md p-6 rounded-2xl bg-[oklch(0.12_0.012_265/70%)] border border-[oklch(0.75_0.18_45/15%)] backdrop-blur-xl shadow-2xl relative group">
              <div className="absolute -top-3 left-6 px-3 py-0.5 bg-[oklch(0.75_0.18_45)] text-[oklch(0.08_0.015_265)] text-[10px] font-bold uppercase tracking-widest rounded-full">
                Şimdi Çalıyor
              </div>
              
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-xl overflow-hidden relative flex-shrink-0 border border-[oklch(1_0_0/10%)]">
                  <img 
                    src={currentTrack.youtubeId ? getYoutubeThumbnail(currentTrack.youtubeId) : WAVE_PATTERN} 
                    alt={currentTrack.title} 
                    className="w-full h-full object-cover"
                  />
                  {isPlaying && (
                    <div className="absolute inset-0 bg-[oklch(0.08_0.015_265/60%)] flex items-center justify-center">
                      <WaveformBars count={4} className="h-6" />
                    </div>
                  )}
                </div>
                <div className="overflow-hidden flex-1">
                  <h3 className="text-sm font-semibold text-[oklch(0.95_0.005_65)] truncate" style={{ fontFamily: "'Cinzel', serif" }}>
                    {currentTrack.title}
                  </h3>
                  <p className="text-xs text-[oklch(0.45_0.01_265)] mt-1">{currentTrack.date || "Naim Aktaş Arşivi"}</p>
                </div>
              </div>

              {/* Progress Bar Simulation */}
              <div className="w-full h-1 bg-[oklch(1_0_0/10%)] rounded-full mb-5 overflow-hidden relative">
                <div className={`h-full bg-[oklch(0.75_0.18_45)] rounded-full ${isPlaying ? 'w-1/3 transition-all duration-1000' : 'w-12'}`} />
              </div>

              {/* Kontroller */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[oklch(0.45_0.01_265)]">
                  <Volume2 className="w-4 h-4" />
                  <span className="text-[10px] font-mono tracking-wider">LIVE</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-full bg-[oklch(0.75_0.18_45)] flex items-center justify-center text-[oklch(0.08_0.015_265)] shadow-lg hover:scale-105 active:scale-95 transition-all"
                  >
                    {isPlaying ? <Music className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                  </button>
                  <button 
                    onClick={handleNextTrack}
                    className="w-9 h-9 rounded-full border border-[oklch(1_0_0/10%)] flex items-center justify-center text-[oklch(0.65_0.01_265)] hover:text-[oklch(0.75_0.18_45)] hover:border-[oklch(0.75_0.18_45/40%)] active:scale-95 transition-all"
                    title="Sıradaki Parça"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>

                <Link href={`/track/${currentTrack.slug}`}>
                  <span className="text-xs text-[oklch(0.75_0.18_45)] hover:underline cursor-pointer font-medium">Detaylar</span>
                </Link>
              </div>
            </div>
          </div>

          {/* SAĞ KOLON: Sıradaki Şarkı Bilgisi */}
          <div className="lg:col-span-3 flex flex-col justify-center items-center lg:items-end text-center lg:text-right">
            <div className="p-4 rounded-xl border border-[oklch(1_0_0/6%)] bg-[oklch(0.12_0.012_265/30%)] w-full max-w-xs backdrop-blur-md">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[oklch(0.45_0.01_265)] block mb-2">Sıradaki Türkü</span>
              <h4 className="text-xs font-semibold text-[oklch(0.85_0.005_65)] line-clamp-1 mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
                {nextTrack.title}
              </h4>
              <p className="text-[11px] text-[oklch(0.35_0.01_265)]">{nextTrack.date}</p>
            </div>
          </div>

        </div>

        {/* Aşağı Kaydır Butonu */}
        <button onClick={() => tracksRef.current?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[oklch(0.45_0.01_265)] hover:text-[oklch(0.75_0.18_45)] transition-colors animate-bounce z-20">
          <ChevronDown className="w-5 h-5" />
        </button>
      </section>

      {/* ── TRACKS SECTION ── */}
      <section ref={tracksRef} className="py-16 md:py-24 relative z-20 bg-[oklch(0.08_0.015_265)]">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-[1px] bg-[oklch(0.75_0.18_45)]" />
                <span className="text-xs tracking-[0.3em] uppercase text-[oklch(0.75_0.18_45)]">Müzik Arşivi</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[oklch(0.95_0.005_65)]" style={{ fontFamily: "'Cinzel', serif" }}>
                Tüm Parçalar
              </h2>
              <p className="text-sm text-[oklch(0.45_0.01_265)] mt-2">{filteredTracks.length} parça listeleniyor</p>
            </div>

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

          {hasMore && (
            <div className="text-center mt-12">
              <button onClick={() => setVisibleCount(v => v + 24)}
                className="px-8 py-3 border border-[oklch(0.75_0.18_45/40%)] text-[oklch(0.75_0.18_45)] rounded-full text-sm font-medium hover:bg-[oklch(0.75_0.18_45/10%)] hover:border-[oklch(0.75_0.18_45/80%)] active:scale-[0.97] transition-all duration-200">
                Daha Fazla Göster ({filteredTracks.length - visibleCount})
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[oklch(1_0_0/8%)] py-12 relative z-20 bg-[oklch(0.08_0.015_265)]">
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
          <div className="w-full h-[1px] bg-[oklch(1_0_0/8%)] my-8" />
          <p className="text-center text-xs text-[oklch(0.3_0.01_265)]">
            © 2020–{new Date().getFullYear()} Naim Aktaş Official. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </div>
  );
}
