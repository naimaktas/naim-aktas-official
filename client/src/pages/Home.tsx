import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

// Görsel Tanımlamaları (Mevcut projenizdeki yollar)
const HERO_BG = "/assets/hero-bg.jpg"; 
const WAVE_PATTERN = "/assets/wave-pattern.png";

// Basit Track Arayüzü
interface Track {
  id: string;
  title: string;
  date: string;
  youtubeId?: string;
}

// Örnek Veri Yapısı (Hata vermemesi için şablon olarak eklenmiştir, kendi verilerinizle değişebilir)
const tracks: Track[] = [
  { id: "1", title: "Örnek Parça 1", date: "2026-05" },
  { id: "2", title: "Örnek Parça 2", date: "2026-05" }
];

// Minik Ses Dalgası Barları Bileşeni
function WaveformBars({ count = 5, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`flex items-end gap-0.5 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="w-0.5 bg-[oklch(0.75_0.18_45)] rounded-full animate-pulse"
          style={{
            height: `${Math.random() * 100}%`,
            animationDelay: `${i * 150}ms`,
            animationDuration: `${600 + Math.random() * 400}ms`
          }}
        />
      ))}
    </div>
  );
}

// Kart Bileşeni
function TrackCard({ track, index }: { track: Track; index: number }) {
  return (
    <div className="group relative bg-[oklch(0.12_0.02_265)] border border-[oklch(0.2_0.03_265)] rounded-xl overflow-hidden p-4 hover:border-[oklch(0.75_0.18_45/40%)] transition-all duration-300">
      <div className="relative z-10">
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
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(24);
  const tracksRef = useRef<HTMLDivElement>(null);

  // Canvas referansı ve fare takibi tanımlamaları
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // 1. ADIM: Scroll Takibi
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. ADIM: Fare Hareketleri Takibi
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 3. ADIM: Dalga Formu ve Parıldayan Altın Noktalar Animasyon Motoru
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let count = 0;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const numPoints = 120;
    const numLines = 6;

    const animate = () => {
      count += 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      for (let l = 0; l < numLines; l++) {
        const opacity = (1 - l / numLines) * 0.5;
        ctx.fillStyle = `rgba(230, 160, 45, ${opacity})`;

        for (let i = 0; i < numPoints; i++) {
          const x = (canvas.width / (numPoints - 1)) * i;
          const baseWave = Math.sin(i * 0.05 + count + l * 0.5);
          const secondaryWave = Math.cos(i * 0.02 - count * 0.5 + l * 0.8);
          
          let y = canvas.height * 0.6 + (baseWave + secondaryWave) * 35 * (l * 0.3 + 0.5);

          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            const force = (200 - distance) / 200;
            y += Math.sin(count * 5 + i) * 15 * force;
          }

          const radius = (Math.sin(count * 2 + i * 0.5) * 0.8 + 1.2) * (1.5 - l * 0.15);
          
          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.5, radius), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Filtreleme ve Arama Mantığı
  const filteredTracks = tracks.filter((track) =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedTracks = filteredTracks.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTracks.length;

  const scrollToTracks = () => {
    tracksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[oklch(0.06_0.01_265)] text-[oklch(0.98_0.005_65)] font-sans antialiased selection:bg-[oklch(0.75_0.18_45/30%)] selection:text-[oklch(0.75_0.18_45)]">
      
      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
        
        {/* Hareketli Sinematik Arka Plan Yapısı */}
        <div className="absolute inset-0 overflow-hidden bg-[oklch(0.08_0.015_265)]">
          <img
            src={HERO_BG}
            alt="Hero background"
            className="w-full h-full object-cover opacity-30"
          />
          
          {/* Canlı Parıldayan Dalga Tuvali */}
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
          />

          <div
            className="absolute inset-0 opacity-40 pointer-events-none mix-blend-screen"
            style={{
              backgroundImage: `url(${WAVE_PATTERN})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.08_0.015_265)] via-[oklch(0.08_0.015_265/80%)] to-[oklch(0.08_0.015_265/10%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.015_265)] via-transparent to-[oklch(0.08_0.015_265/30%)]" />
        </div>

        {/* Hero İçerik Alanı */}
        <div className="container relative z-10 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-xs tracking-[0.3em] uppercase text-[oklch(0.75_0.18_45)] font-medium">
                Resmi Müzik Kanalı
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Müziğin Dijital Ritmi
            </h1>
            
            <p className="text-base md:text-lg text-[oklch(0.7_0.015_265)] mb-10 max-w-xl mx-auto leading-relaxed">
              Ses dalgalarının estetik akışıyla harmanlanmış dinamik bir müzik deneyimine hoş geldiniz.
            </p>

            <button
              onClick={scrollToTracks}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[oklch(0.75_0.18_45)] text-[oklch(0.06_0.01_265)] font-medium hover:bg-[oklch(0.8_0.15_45)] transition-all duration-300 shadow-lg shadow-[oklch(0.75_0.18_45/20%)]"
            >
              Parçaları Keşfet
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      {/* ── TRACKS SECTION ── */}
      <section ref={tracksRef} className="py-16 md:py-24 relative z-20">
        <div className="container px-4 mx-auto">
          
          {/* Arama Barı Alanı */}
          <div className="mb-12 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Parça ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3 rounded-xl bg-[oklch(0.12_0.02_265)] border border-[oklch(0.2_0.03_265)] text-white placeholder-[oklch(0.45_0.01_265)] focus:outline-none focus:border-[oklch(0.75_0.18_45/50%)] transition-colors"
            />
          </div>

          {/* Kart Listesi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedTracks.map((track, index) => (
              <TrackCard key={track.id} track={track} index={index} />
            ))}
          </div>

          {/* Daha Fazla Yükle Butonu */}
          {hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={() => setVisibleCount((prev) => prev + 24)}
                className="px-6 py-2.5 rounded-xl border border-[oklch(0.2_0.03_265)] hover:border-[oklch(0.75_0.18_45/40%)] text-sm font-medium transition-colors"
              >
                Daha Fazla Yükle
              </button>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
