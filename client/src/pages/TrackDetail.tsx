/**
 * DESIGN: "Velvet Underground" — Cinematic Dark Luxury
 * Track detail: YouTube embed, lyrics, share, view count, navigation
 */
import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { tracks, socialLinks, getTrackBySlug, getYoutubeThumbnail, type Track } from "@/lib/tracks";
import {
  ArrowLeft, Youtube, Instagram, Facebook, Music, Play,
  ChevronLeft, ChevronRight, Share2, Copy, Check,
  FileText, Eye
} from "lucide-react";

const WAVE_PATTERN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663717952494/7fq3tAvW7VqE5bTKhyUqbk/music-pattern-22suadU2atf9sCSvyJvWLE.webp";

function WaveformBars({ count = 20, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`flex items-end gap-[3px] ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="wave-bar rounded-full"
          style={{
            width: "4px",
            height: `${Math.random() * 60 + 40}%`,
            background: `oklch(0.75 0.18 45 / ${0.3 + Math.random() * 0.7})`,
            animationDelay: `${i * 0.08}s`,
            animationDuration: `${0.7 + Math.random() * 1}s`,
          }} />
      ))}
    </div>
  );
}

// ── Share Butonu ────────────────────────────────────────────────────────────
function ShareButton({ track }: { track: Track }) {
  const [open, setOpen]     = useState(false);
  const [copied, setCopied] = useState(false);

  const url       = `${window.location.origin}/track/${track.slug}`;
  const youtubeUrl = track.youtubeId ? `https://www.youtube.com/watch?v=${track.youtubeId}` : null;

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareWhatsApp = () => window.open(`https://wa.me/?text=${encodeURIComponent(`🎵 ${track.title} - Naim Aktaş\n${url}`)}`);
  const shareTwitter  = () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`🎵 ${track.title} - Naim Aktaş`)}&url=${encodeURIComponent(url)}`);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-5 py-2.5 border border-[oklch(0.75_0.18_45/35%)] text-[oklch(0.75_0.18_45)] rounded-full text-sm font-medium hover:bg-[oklch(0.75_0.18_45/10%)] transition-all duration-200"
      >
        <Share2 className="w-4 h-4" /> Paylaş
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-12 z-50 w-56 rounded-xl border border-[oklch(1_0_0/10%)] shadow-[0_8px_40px_rgba(0,0,0,0.6)] overflow-hidden"
            style={{ background: "oklch(0.12 0.015 265)" }}>
            <button onClick={copyLink}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[oklch(0.80_0.005_65)] hover:bg-[oklch(0.75_0.18_45/10%)] transition-colors">
              {copied ? <Check className="w-4 h-4 text-[oklch(0.75_0.18_45)]" /> : <Copy className="w-4 h-4" />}
              {copied ? "Kopyalandı!" : "Linki Kopyala"}
            </button>
            <button onClick={shareWhatsApp}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[oklch(0.80_0.005_65)] hover:bg-[oklch(0.75_0.18_45/10%)] transition-colors border-t border-[oklch(1_0_0/6%)]">
              <span className="text-base">💬</span> WhatsApp
            </button>
            <button onClick={shareTwitter}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[oklch(0.80_0.005_65)] hover:bg-[oklch(0.75_0.18_45/10%)] transition-colors border-t border-[oklch(1_0_0/6%)]">
              <span className="text-base">𝕏</span> X / Twitter
            </button>
            {youtubeUrl && (
              <a href={youtubeUrl} target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[oklch(0.80_0.005_65)] hover:bg-[oklch(0.75_0.18_45/10%)] transition-colors border-t border-[oklch(1_0_0/6%)]">
                <Youtube className="w-4 h-4 text-[oklch(0.7_0.2_25)]" /> YouTube'da Aç
              </a>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ── Lyrics Bölümü ───────────────────────────────────────────────────────────
function LyricsSection({ lyrics }: { lyrics: string }) {
  const [expanded, setExpanded] = useState(false);
  const lines = lyrics.split("\n");
  const preview = lines.slice(0, 4).join("\n");
  const hasMore = lines.length > 4;

  return (
    <div className="rounded-2xl border border-[oklch(1_0_0/8%)] overflow-hidden" style={{ background: "oklch(0.10 0.014 265)" }}>
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[oklch(1_0_0/6%)]">
        <FileText className="w-4 h-4 text-[oklch(0.75_0.18_45)]" />
        <span className="text-sm font-semibold text-[oklch(0.80_0.005_65)] tracking-wide" style={{ fontFamily: "'Cinzel', serif" }}>
          Sözler
        </span>
      </div>
      <div className="px-5 py-4">
        <pre className="text-[oklch(0.72_0.01_265)] text-sm leading-7 font-sans whitespace-pre-wrap">
          {expanded ? lyrics : preview}
        </pre>
        {hasMore && (
          <button onClick={() => setExpanded(e => !e)}
            className="mt-3 text-xs text-[oklch(0.75_0.18_45)] hover:text-[oklch(0.88_0.18_45)] transition-colors font-medium">
            {expanded ? "↑ Daha az göster" : "↓ Tümünü göster"}
          </button>
        )}
      </div>
    </div>
  );
}

// ── View Count (YouTube oEmbed'den) ─────────────────────────────────────────
function ViewCount({ youtubeId }: { youtubeId: string }) {
  const [title, setTitle] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${youtubeId}&format=json`)
      .then(r => r.json())
      .then(d => setTitle(d.author_name || null))
      .catch(() => {});
  }, [youtubeId]);

  return (
    <div className="flex items-center gap-2 text-[oklch(0.42_0.01_265)] text-xs">
      <Eye className="w-3.5 h-3.5" />
      <span>YouTube'da izle</span>
      {title && <span className="text-[oklch(0.35_0.01_265)]">• {title}</span>}
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function TrackDetail() {
  const params = useParams<{ slug: string }>();
  const track  = getTrackBySlug(params.slug || "");
  const [playing, setPlaying] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); setPlaying(false); }, [params.slug]);

  if (!track) {
    return (
      <div className="min-h-screen bg-[oklch(0.08_0.015_265)] flex items-center justify-center">
        <div className="text-center">
          <Music className="w-16 h-16 text-[oklch(0.25_0.01_265)] mx-auto mb-4" />
          <h2 className="text-xl text-[oklch(0.65_0.01_265)] mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
            Parça bulunamadı
          </h2>
          <Link href="/">
            <button className="px-6 py-2.5 bg-[oklch(0.75_0.18_45)] text-[oklch(0.08_0.015_265)] rounded-full text-sm font-semibold hover:bg-[oklch(0.82_0.18_45)] transition-colors">
              Ana Sayfaya Dön
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = tracks.findIndex(t => t.id === track.id);
  const prevTrack    = currentIndex > 0 ? tracks[currentIndex - 1] : null;
  const nextTrack    = currentIndex < tracks.length - 1 ? tracks[currentIndex + 1] : null;
  const relatedTracks = tracks.filter(t => t.id !== track.id && t.youtubeId).slice(0, 6);
  const thumbnail    = track.youtubeId ? getYoutubeThumbnail(track.youtubeId) : WAVE_PATTERN;

  // Kategori rengi
  const catColor =
    track.category === "uzun hava"   ? "oklch(0.65 0.15 240)" :
    track.category === "halk müziği" ? "oklch(0.65 0.15 150)" :
    "oklch(0.75 0.18 45)";

  return (
    <div className="min-h-screen bg-[oklch(0.08_0.015_265)]">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 nav-scrolled">
        <div className="container flex items-center justify-between h-16">
          <Link href="/">
            <button className="flex items-center gap-2 text-[oklch(0.65_0.01_265)] hover:text-[oklch(0.85_0.005_65)] transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm">Tüm Parçalar</span>
            </button>
          </Link>
          <div className="flex items-center gap-3">
            <a href={socialLinks.youtube}   target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <Youtube   className="w-4 h-4 text-[oklch(0.45_0.01_265)] hover:text-[oklch(0.7_0.2_25)]   transition-colors" />
            </a>
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="w-4 h-4 text-[oklch(0.45_0.01_265)] hover:text-[oklch(0.75_0.2_340)] transition-colors" />
            </a>
            <a href={socialLinks.facebook}  target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook  className="w-4 h-4 text-[oklch(0.45_0.01_265)] hover:text-[oklch(0.55_0.2_240)] transition-colors" />
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-16">

        {/* Hero */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img src={thumbnail} alt={track.title} className="w-full h-full object-cover"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              if (track.youtubeId && t.src.includes("maxresdefault"))
                t.src = `https://img.youtube.com/vi/${track.youtubeId}/hqdefault.jpg`;
              else t.src = WAVE_PATTERN;
            }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.015_265)] via-[oklch(0.08_0.015_265/50%)] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.08_0.015_265/60%)] to-transparent" />
        </div>

        <div className="container -mt-24 relative z-10 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── Ana İçerik ── */}
            <div className="lg:col-span-2">

              {/* Başlık */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="text-xs font-mono text-[oklch(0.75_0.18_45/70%)] bg-[oklch(0.12_0.012_265)] px-2 py-1 rounded border border-[oklch(1_0_0/8%)]">
                    #{String(track.id).padStart(2, "0")}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium capitalize"
                    style={{ background: `${catColor}18`, color: catColor, border: `1px solid ${catColor}40` }}>
                    {track.category}
                  </span>
                  <span className="text-xs text-[oklch(0.35_0.01_265)]">{track.date}</span>
                  {track.youtubeId && <ViewCount youtubeId={track.youtubeId} />}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-[oklch(0.95_0.005_65)] leading-tight mb-3"
                  style={{ fontFamily: "'Cinzel', serif" }}>
                  {track.title}
                </h1>
                <p className="text-[oklch(0.55_0.01_265)] text-sm" style={{ fontFamily: "'Raleway', sans-serif" }}>
                  Naim Aktaş — Türk Halk Müziği
                </p>
              </div>

              {/* Video Player */}
              {track.youtubeId ? (
                <div className="relative rounded-2xl overflow-hidden bg-[oklch(0.05_0.01_265)] border border-[oklch(1_0_0/8%)] mb-6">
                  {!playing ? (
                    <div className="relative aspect-video">
                      <img src={thumbnail} alt={track.title} className="w-full h-full object-cover"
                        onError={(e) => {
                          const t = e.target as HTMLImageElement;
                          if (track.youtubeId && t.src.includes("maxresdefault"))
                            t.src = `https://img.youtube.com/vi/${track.youtubeId}/hqdefault.jpg`;
                        }} />
                      <div className="absolute inset-0 bg-[oklch(0.08_0.015_265/40%)] flex items-center justify-center">
                        <button onClick={() => setPlaying(true)}
                          className="w-20 h-20 rounded-full bg-[oklch(0.75_0.18_45)] flex items-center justify-center play-pulse hover:bg-[oklch(0.82_0.18_45)] active:scale-95 transition-all duration-200 shadow-2xl"
                          aria-label="Oynat">
                          <Play className="w-8 h-8 text-[oklch(0.08_0.015_265)] fill-current ml-1" />
                        </button>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <WaveformBars count={30} className="h-12 opacity-60" />
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${track.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                        title={track.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen className="w-full h-full" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden bg-[oklch(0.12_0.012_265)] border border-[oklch(1_0_0/8%)] mb-6 p-8">
                  <div className="flex flex-col items-center gap-4 py-8">
                    <WaveformBars count={24} className="h-16 w-full" />
                    <p className="text-[oklch(0.45_0.01_265)] text-sm">Video yakında eklenecek</p>
                  </div>
                </div>
              )}

              {/* Aksiyon butonları */}
              <div className="flex flex-wrap gap-3 mb-6">
                {track.youtubeId && (
                  <a href={`https://www.youtube.com/watch?v=${track.youtubeId}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-[oklch(0.75_0.18_45)] text-[oklch(0.08_0.015_265)] rounded-full text-sm font-semibold hover:bg-[oklch(0.82_0.18_45)] active:scale-[0.97] transition-all duration-200">
                    <Youtube className="w-4 h-4" /> YouTube'da Aç
                  </a>
                )}
                <ShareButton track={track} />
              </div>

              {/* ── Sözler ── */}
              {track.lyrics && (
                <div className="mb-6">
                  <LyricsSection lyrics={track.lyrics} />
                </div>
              )}

              {/* Önceki / Sonraki */}
              <div className="flex gap-4">
                {prevTrack && (
                  <Link href={`/track/${prevTrack.slug}`} className="flex-1">
                    <div className="group flex items-center gap-3 p-4 rounded-xl border border-[oklch(1_0_0/8%)] bg-[oklch(0.12_0.012_265)] hover:border-[oklch(0.75_0.18_45/30%)] hover:bg-[oklch(0.15_0.012_265)] transition-all duration-200 cursor-pointer">
                      <ChevronLeft className="w-5 h-5 text-[oklch(0.45_0.01_265)] group-hover:text-[oklch(0.75_0.18_45)] transition-colors shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs text-[oklch(0.35_0.01_265)] mb-0.5">Önceki</div>
                        <div className="text-sm text-[oklch(0.75_0.005_65)] group-hover:text-[oklch(0.75_0.18_45)] transition-colors truncate" style={{ fontFamily: "'Cinzel', serif" }}>
                          {prevTrack.title}
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
                {nextTrack && (
                  <Link href={`/track/${nextTrack.slug}`} className="flex-1">
                    <div className="group flex items-center justify-end gap-3 p-4 rounded-xl border border-[oklch(1_0_0/8%)] bg-[oklch(0.12_0.012_265)] hover:border-[oklch(0.75_0.18_45/30%)] hover:bg-[oklch(0.15_0.012_265)] transition-all duration-200 cursor-pointer">
                      <div className="min-w-0 text-right">
                        <div className="text-xs text-[oklch(0.35_0.01_265)] mb-0.5">Sonraki</div>
                        <div className="text-sm text-[oklch(0.75_0.005_65)] group-hover:text-[oklch(0.75_0.18_45)] transition-colors truncate" style={{ fontFamily: "'Cinzel', serif" }}>
                          {nextTrack.title}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[oklch(0.45_0.01_265)] group-hover:text-[oklch(0.75_0.18_45)] transition-colors shrink-0" />
                    </div>
                  </Link>
                )}
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="text-sm font-semibold text-[oklch(0.65_0.01_265)] mb-4 tracking-wider uppercase"
                  style={{ fontFamily: "'Cinzel', serif" }}>
                  Diğer Parçalar
                </h3>
                <div className="space-y-3">
                  {relatedTracks.map((related) => (
                    <Link key={related.id} href={`/track/${related.slug}`}>
                      <div className="group flex items-center gap-3 p-3 rounded-xl border border-[oklch(1_0_0/6%)] bg-[oklch(0.12_0.012_265)] hover:border-[oklch(0.75_0.18_45/30%)] hover:bg-[oklch(0.15_0.012_265)] transition-all duration-200 cursor-pointer">
                        {related.youtubeId && (
                          <div className="relative w-16 h-10 rounded-lg overflow-hidden shrink-0">
                            <img src={getYoutubeThumbnail(related.youtubeId)} alt={related.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const t = e.target as HTMLImageElement;
                                if (t.src.includes("maxresdefault"))
                                  t.src = `https://img.youtube.com/vi/${related.youtubeId}/hqdefault.jpg`;
                              }} />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[oklch(0.08_0.015_265/50%)]">
                              <Play className="w-3 h-3 text-[oklch(0.75_0.18_45)] fill-current" />
                            </div>
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-[oklch(0.75_0.005_65)] group-hover:text-[oklch(0.75_0.18_45)] transition-colors line-clamp-2 leading-snug"
                            style={{ fontFamily: "'Cinzel', serif" }}>
                            {related.title}
                          </p>
                          <span className="text-[9px] mt-0.5 inline-block px-1.5 py-0.5 rounded capitalize"
                            style={{
                              color: related.category === "uzun hava" ? "oklch(0.65 0.15 240)" : related.category === "halk müziği" ? "oklch(0.65 0.15 150)" : "oklch(0.75 0.18 45)",
                              background: related.category === "uzun hava" ? "oklch(0.65 0.15 240 / 12%)" : related.category === "halk müziği" ? "oklch(0.65 0.15 150 / 12%)" : "oklch(0.75 0.18 45 / 12%)",
                            }}>
                            {related.category}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/">
                  <button className="w-full mt-4 py-2.5 border border-[oklch(0.75_0.18_45/30%)] text-[oklch(0.75_0.18_45)] rounded-xl text-xs font-medium hover:bg-[oklch(0.75_0.18_45/10%)] transition-all duration-200">
                    Tüm Parçları Gör →
                  </button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
