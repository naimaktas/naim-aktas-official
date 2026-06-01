/**
 * DESIGN: "Velvet Underground" — Cinematic Dark Luxury
 * - PlayStation menü tarzı güçlü akan dalgalar
 * - Sağ tarafı dolduran büyük ışıklı alan
 * - Animasyonlu altın başlık
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { tracks, socialLinks, getYoutubeThumbnail, type Track } from "@/lib/tracks";
import { Youtube, Instagram, Facebook, Play, Music, Search, ChevronDown } from "lucide-react";
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

    // Çok daha belirgin, PS menüsü tarzı dalgalar
    const waves = [
      // Ana büyük dalgalar — ekranı kesen geniş yaylar
      { amp: 120, freq: 0.0035, speed: 0.008, phase: 0.0,  yRatio: 0.50, color: "rgba(200,140,30,0.55)",  width: 2.0 },
      { amp: 90,  freq: 0.0050, speed: 0.012, phase: 1.8,  yRatio: 0.45, color: "rgba(240,170,50,0.40)",  width: 1.5 },
      { amp: 150, freq: 0.0025, speed: 0.006, phase: 3.2,  yRatio: 0.55, color: "rgba(170,110,20,0.35)",  width: 2.8 },
      // Orta katman
      { amp: 70,  freq: 0.0070, speed: 0.016, phase: 0.5,  yRatio: 0.40, color: "rgba(255,190,60,0.30)",  width: 1.2 },
      { amp: 85,  freq: 0.0055, speed: 0.010, phase: 2.1,  yRatio: 0.60, color: "rgba(210,150,35,0.28)",  width: 1.8 },
      { amp: 60,  freq: 0.0080, speed: 0.018, phase: 4.0,  yRatio: 0.35, color: "rgba(255,210,80,0.22)",  width: 1.0 },
      { amp: 100, freq: 0.0042, speed: 0.009, phase: 1.0,  yRatio: 0.65, color: "rgba(185,125,25,0.25)",  width: 2.2 },
      // İnce detay dalgalar
      { amp: 40,  freq: 0.0120, speed: 0.022, phase: 0.3,  yRatio: 0.48, color: "rgba(255,220,90,0.18)",  width: 0.8 },
      { amp: 55,  freq: 0.0090, speed: 0.014, phase: 2.7,  yRatio: 0.53, color: "rgba(230,160,45,0.20)",  width: 1.0 },
      { amp: 30,  freq: 0.0150, speed: 0.025, phase: 1.4,  yRatio: 0.43, color: "rgba(255,200,70,0.15)",  width: 0.7 },
      { amp: 75,  freq: 0.0060, speed: 0.011, phase: 3.5,  yRatio: 0.58, color: "rgba(195,130,28,0.22)",  width: 1.4 },
      { amp: 45,  freq: 0.0100, speed: 0.017, phase: 0.9,  yRatio: 0.38, color: "rgba(245,175,55,0.16)",  width: 0.9 },
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

    // PS menüsü gibi büyük parlak alan — sağ yarı
    const drawBigGlow = () => {
      const W = canvas.width, H = canvas.height;

      // Ana büyük ışık huzmesi — sağ ortada
      const gx = W * 0.68 + Math.sin(t * 0.004) * W * 0.05;
      const gy = H * 0.48 + Math.cos(t * 0.006) * H * 0.06;
      const pulse = 0.28 + 0.12 * Math.sin(t * 0.012);
      const r1 = Math.max(W, H) * 0.65;
      const g1 = ctx.createRadialGradient(gx, gy, 0, gx, gy, r1);
      g1.addColorStop(0,   `rgba(210,140,25,${pulse})`);
      g1.addColorStop(0.3, `rgba(170,110,15,${pulse * 0.55})`);
      g1.addColorStop(0.6, `rgba(130,80,10,${pulse * 0.20})`);
      g1.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);

      // İkinci ışık — sağ alt
      const gx2 = W * 0.82 + Math.sin(t * 0.007 + 1) * W * 0.04;
      const gy2 = H * 0.70 + Math.cos(t * 0.005 + 2) * H * 0.08;
      const pulse2 = 0.18 + 0.08 * Math.sin(t * 0.015 + 1.5);
      const g2 = ctx.createRadialGradient(gx2, gy2, 0, gx2, gy2, H * 0.45);
      g2.addColorStop(0,   `rgba(255,180,40,${pulse2})`);
      g2.addColorStop(0.5, `rgba(180,120,20,${pulse2 * 0.3})`);
      g2.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);

      // Üçüncü — sağ üst köşe
      const gx3 = W * 0.90;
      const gy3 = H * 0.15 + Math.sin(t * 0.009) * H * 0.05;
      const pulse3 = 0.12 + 0.06 * Math.sin(t * 0.018);
      const g3 = ctx.createRadialGradient(gx3, gy3, 0, gx3, gy3, H * 0.35);
      g3.addColorStop(0,   `rgba(255,200,60,${pulse3})`);
      g3.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, W, H);
    };

    const drawWave = (wave: typeof waves[0]) => {
      const W = canvas.width, H = canvas.height;
      const baseY = H * wave.yRatio;
      ctx.beginPath();
      ctx.moveTo(0, baseY);
      for (let x = 0; x <= W; x += 2) {
        const y =
          baseY +
          Math.sin(x * wave.freq + wave.phase + t * wave.speed) * wave.amp +
          Math.sin(x * wave.freq * 2.1 + wave.phase * 1.3 + t * wave.speed * 1.5) * (wave.amp * 0.35) +
          Math.sin(x * wave.freq * 0.5 + t * wave.speed * 0.7) * (wave.amp * 0.2);
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = wave.color;
      ctx.lineWidth   = wave.width;
      ctx.stroke();
    };

    // Parıldayan partiküller — dalgalar üzerinde
    const drawParticles = () => {
      const W = canvas.width, H = canvas.height;
      for (let i = 0; i < 30; i++) {
        const px = W * 0.30 + W * 0.70 * (((i / 30) + t * 0.0002) % 1);
        const waveIdx = i % waves.length;
        const wv = waves[waveIdx];
        const baseY = H * wv.yRatio;
        const py = baseY + Math.sin(px * wv.freq + wv.phase + t * wv.speed) * wv.amp;
        const alpha = (0.15 + 0.25 * Math.abs(Math.sin(t * 0.03 + i * 0.7)));
        const r = 0.8 + 2.2 * Math.abs(Math.sin(i * 1.9 + t * 0.015));
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,200,60,${alpha})`;
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

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
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

        <div className="flex items-center gap-2 md:gap-4">
          {[
            { href: socialLinks.youtube,   Icon: Youtube,   label: "YouTube"   },
            { href: socialLinks.instagram, Icon: Instagram, label: "Instagram" },
            { href: socialLinks.facebook,  Icon: Facebook,  label: "Facebook"  },
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
  const [scrolled, setScrolled]         = useState(false);
  const [searchQuery, setSearchQuery]   = useState("");
  const [visibleCount, setVisibleCount] = useState(24);
  const tracksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredTracks  = tracks.filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const displayedTracks = filteredTracks.slice(0, visibleCount);
  const hasMore         = visibleCount < filteredTracks.length;

  const scrollToTracks = () => tracksRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-[oklch(0.08_0.015_265)]">

      <style>{`
        /* ── Altın akan gradient başlık ── */
        @keyframes goldFlow {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        .text-gold-animated {
          background: linear-gradient(
            110deg,
            #7a4a08 0%,
            #c8881a 15%,
            #f5c842 30%,
            #ffe680 45%,
            #f5c842 60%,
            #c8881a 75%,
            #7a4a08 90%,
            #c8881a 100%
          );
          background-size: 250% 250%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: goldFlow 2.8s ease-in-out infinite;
          filter: drop-shadow(0 0 30px rgba(200,140,30,0.6));
        }

        /* NAİM yazısının ışıması */
        @keyframes naimGlow {
          0%, 100% { text-shadow: 0 0 30px rgba(240,220,160,0.08); }
          50%       { text-shadow: 0 0 60px rgba(240,220,160,0.22), 0 0 100px rgba(200,140,30,0.10); }
        }
        .title-naim {
          animation: naimGlow 4s ease-in-out infinite;
        }

        /* Label titreme */
        @keyframes labelPulse {
          0%, 100% { opacity: 0.75; }
          50%       { opacity: 1; }
        }
        .hero-label { animation: labelPulse 3s ease-in-out infinite; }
      `}</style>

      <Navbar scrolled={scrolled} />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Koyu taban */}
        <div className="absolute inset-0 bg-[oklch(0.07_0.018_265)]" />

        {/* Hero fotoğraf — çok düşük opaklık, sadece doku için */}
        <img
          src={HERO_BG}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
        />

        {/* ✨ PS menüsü Canvas dalgalar */}
        <HeroCanvas />

        {/* Sol gradient — içerik okunabilirliği */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to right, oklch(0.07 0.018 265) 30%, oklch(0.07 0.018 265 / 0.75) 55%, transparent 80%)",
          }}
        />
        {/* Alt gradient */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, oklch(0.07 0.018 265) 0%, transparent 35%)",
          }}
        />

        {/* İçerik */}
        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-2xl">

            {/* Etiket */}
            <div className="flex items-center gap-3 mb-8 reveal hero-label" style={{ animationDelay: "0ms" }}>
              <div className="gold-divider w-14" />
              <span className="text-xs tracking-[0.35em] uppercase text-[oklch(0.75_0.18_45)] font-medium">
                Resmi Müzik Kanalı
              </span>
            </div>

            {/* ✨ Başlık */}
            <h1
              className="font-bold leading-[0.90] tracking-tight mb-3 reveal"
              style={{ fontFamily: "'Cinzel', serif", animationDelay: "80ms", fontSize: "clamp(5rem, 12vw, 10rem)" }}
            >
              <span className="block text-[oklch(0.96_0.005_65)] title-naim">NAİM</span>
              <span className="block text-gold-animated">AKTAŞ</span>
            </h1>

            {/* Alt yazı */}
            <p
              className="text-lg md:text-xl text-[oklch(0.60_0.01_265)] mt-6 mb-10 font-light tracking-widest reveal"
              style={{ fontFamily: "'Raleway', sans-serif", animationDelay: "160ms", letterSpacing: "0.18em" }}
            >
              Türk Halk Müziği &amp; Türkü Arşivi
            </p>

            {/* İstatistikler */}
            <div className="flex items-center gap-10 mb-12 reveal" style={{ animationDelay: "240ms" }}>
              {[
                { value: "71",   label: "Parça"    },
                { value: "47",   label: "Video"    },
                { value: "2020", label: "Yılından" },
              ].map(({ value, label }, i) => (
                <>
                  {i > 0 && <div key={`sep-${i}`} className="w-px h-12 bg-[oklch(1_0_0/10%)]" />}
                  <div key={label}>
                    <div className="text-3xl font-bold text-[oklch(0.78_0.18_45)]" style={{ fontFamily: "'Cinzel', serif" }}>
                      {value}
                    </div>
                    <div className="text-[10px] text-[oklch(0.42_0.01_265)] tracking-[0.25em] uppercase mt-1">{label}</div>
                  </div>
                </>
              ))}
            </div>

            {/* Butonlar */}
            <div className="flex flex-wrap gap-4 reveal" style={{ animationDelay: "320ms" }}>
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 bg-[oklch(0.75_0.18_45)] text-[oklch(0.08_0.015_265)] rounded-full font-semibold text-sm tracking-wide hover:bg-[oklch(0.82_0.18_45)] active:scale-[0.97] transition-all duration-200"
              >
                <Youtube className="w-4 h-4" />
                YouTube'da İzle
              </a>
              <button
                onClick={scrollToTracks}
                className="flex items-center gap-2 px-7 py-3.5 border border-[oklch(0.75_0.18_45/45%)] text-[oklch(0.85_0.005_65)] rounded-full font-medium text-sm tracking-wide hover:border-[oklch(0.75_0.18_45/80%)] hover:bg-[oklch(0.75_0.18_45/10%)] active:scale-[0.97] transition-all duration-200"
              >
                <Music className="w-4 h-4" />
                Tüm Parçalar
              </button>
            </div>
          </div>
        </div>

        {/* Aşağı ok */}
        <button
          onClick={scrollToTracks}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[oklch(0.40_0.01_265)] hover:text-[oklch(0.75_0.18_45)] transition-colors animate-bounce"
          aria-label="Aşağı kaydır"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </section>

      {/* ── PARÇALAR ──────────────────────────────────────────────────────── */}
      <section ref={tracksRef} className="py-16 md:py-24">
        <div className="container">

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
                { href: socialLinks.youtube,   Icon: Youtube,   label: "YouTube"   },
                { href: socialLinks.instagram, Icon: Instagram, label: "Instagram" },
                { href: socialLinks.facebook,  Icon: Facebook,  label: "Facebook"  },
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
