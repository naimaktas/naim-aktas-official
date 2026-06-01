/**
 * DESIGN: "Velvet Underground" — Admin Panel
 * Secure admin panel for content management
 * Username: naimaktas | Password: NaimOfficial2024!
 */
import { useState, useEffect } from "react";
import { tracks as initialTracks, socialLinks, type Track } from "@/lib/tracks";
import { Lock, LogOut, Plus, Edit2, Trash2, Save, X, Youtube, Music, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ADMIN_USER = "naimaktas";
const ADMIN_PASS = "NaimOfficial2024!";
const STORAGE_KEY = "naim_admin_tracks";
const AUTH_KEY = "naim_admin_auth";

function getStoredTracks(): Track[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return initialTracks;
}

function saveTracks(tracks: Track[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tracks));
}

// Login form
function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise(r => setTimeout(r, 600));
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem(AUTH_KEY, "true");
      onLogin();
    } else {
      setError("Kullanıcı adı veya şifre hatalı.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[oklch(0.08_0.015_265)] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full border-2 border-[oklch(0.75_0.18_45/40%)] flex items-center justify-center mx-auto mb-4 bg-[oklch(0.12_0.012_265)]">
            <Lock className="w-7 h-7 text-[oklch(0.75_0.18_45)]" />
          </div>
          <h1 className="text-2xl font-bold text-[oklch(0.95_0.005_65)]" style={{ fontFamily: "'Cinzel', serif" }}>
            Admin Paneli
          </h1>
          <p className="text-sm text-[oklch(0.45_0.01_265)] mt-1">Naim Aktaş Official</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-[oklch(0.55_0.01_265)] uppercase tracking-wider mb-1.5 block">
              Kullanıcı Adı
            </label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="naimaktas"
              className="bg-[oklch(0.12_0.012_265)] border-[oklch(1_0_0/10%)] text-[oklch(0.85_0.005_65)] placeholder:text-[oklch(0.3_0.01_265)] focus:border-[oklch(0.75_0.18_45/50%)]"
              required
            />
          </div>
          <div>
            <label className="text-xs text-[oklch(0.55_0.01_265)] uppercase tracking-wider mb-1.5 block">
              Şifre
            </label>
            <div className="relative">
              <Input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="bg-[oklch(0.12_0.012_265)] border-[oklch(1_0_0/10%)] text-[oklch(0.85_0.005_65)] placeholder:text-[oklch(0.3_0.01_265)] focus:border-[oklch(0.75_0.18_45/50%)] pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[oklch(0.45_0.01_265)] hover:text-[oklch(0.65_0.01_265)]"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-[oklch(0.65_0.2_25)] bg-[oklch(0.65_0.2_25/10%)] border border-[oklch(0.65_0.2_25/20%)] rounded-lg px-3 py-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[oklch(0.75_0.18_45)] text-[oklch(0.08_0.015_265)] hover:bg-[oklch(0.82_0.18_45)] font-semibold"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </Button>
        </form>

        <p className="text-center text-xs text-[oklch(0.25_0.01_265)] mt-6">
          Yetkisiz erişim yasaktır.
        </p>
      </div>
    </div>
  );
}

// Track form modal
function TrackFormModal({
  track,
  onSave,
  onClose,
}: {
  track: Partial<Track> | null;
  onSave: (track: Track) => void;
  onClose: () => void;
}) {
  const isEdit = !!track?.id;
  const [form, setForm] = useState<Partial<Track>>(
    track || { title: "", slug: "", youtubeId: null, date: "21 Nisan 2020", blogUrl: "" }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;
    const slug = form.slug || form.title.toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
      .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    onSave({
      id: form.id || Date.now(),
      title: form.title || "",
      slug,
      youtubeId: form.youtubeId || null,
      date: form.date || new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
      blogUrl: form.blogUrl || "",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[oklch(0_0_0/70%)]">
      <div className="w-full max-w-md bg-[oklch(0.12_0.012_265)] border border-[oklch(1_0_0/10%)] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-[oklch(0.95_0.005_65)]" style={{ fontFamily: "'Cinzel', serif" }}>
            {isEdit ? "Parçayı Düzenle" : "Yeni Parça Ekle"}
          </h3>
          <button onClick={onClose} className="text-[oklch(0.45_0.01_265)] hover:text-[oklch(0.65_0.01_265)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-[oklch(0.55_0.01_265)] uppercase tracking-wider mb-1.5 block">
              Parça Adı *
            </label>
            <Input
              value={form.title || ""}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Kemerimin Tokası"
              className="bg-[oklch(0.08_0.015_265)] border-[oklch(1_0_0/10%)] text-[oklch(0.85_0.005_65)] placeholder:text-[oklch(0.3_0.01_265)] focus:border-[oklch(0.75_0.18_45/50%)]"
              required
            />
          </div>

          <div>
            <label className="text-xs text-[oklch(0.55_0.01_265)] uppercase tracking-wider mb-1.5 block">
              YouTube Video ID
            </label>
            <div className="relative">
              <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.45_0.01_265)]" />
              <Input
                value={form.youtubeId || ""}
                onChange={(e) => setForm({ ...form, youtubeId: e.target.value || null })}
                placeholder="-qbsoXdJJq8"
                className="pl-9 bg-[oklch(0.08_0.015_265)] border-[oklch(1_0_0/10%)] text-[oklch(0.85_0.005_65)] placeholder:text-[oklch(0.3_0.01_265)] focus:border-[oklch(0.75_0.18_45/50%)]"
              />
            </div>
            <p className="text-xs text-[oklch(0.35_0.01_265)] mt-1">
              YouTube URL'sinden video ID'sini kopyalayın (örn: youtube.com/watch?v=<strong>-qbsoXdJJq8</strong>)
            </p>
          </div>

          <div>
            <label className="text-xs text-[oklch(0.55_0.01_265)] uppercase tracking-wider mb-1.5 block">
              Tarih
            </label>
            <Input
              value={form.date || ""}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              placeholder="21 Nisan 2020"
              className="bg-[oklch(0.08_0.015_265)] border-[oklch(1_0_0/10%)] text-[oklch(0.85_0.005_65)] placeholder:text-[oklch(0.3_0.01_265)] focus:border-[oklch(0.75_0.18_45/50%)]"
            />
          </div>

          <div>
            <label className="text-xs text-[oklch(0.55_0.01_265)] uppercase tracking-wider mb-1.5 block">
              Blog URL (opsiyonel)
            </label>
            <Input
              value={form.blogUrl || ""}
              onChange={(e) => setForm({ ...form, blogUrl: e.target.value })}
              placeholder="https://..."
              className="bg-[oklch(0.08_0.015_265)] border-[oklch(1_0_0/10%)] text-[oklch(0.85_0.005_65)] placeholder:text-[oklch(0.3_0.01_265)] focus:border-[oklch(0.75_0.18_45/50%)]"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              className="flex-1 bg-[oklch(0.75_0.18_45)] text-[oklch(0.08_0.015_265)] hover:bg-[oklch(0.82_0.18_45)] font-semibold"
            >
              <Save className="w-4 h-4 mr-2" />
              {isEdit ? "Kaydet" : "Ekle"}
            </Button>
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="border-[oklch(1_0_0/15%)] text-[oklch(0.65_0.01_265)] hover:bg-[oklch(0.15_0.012_265)]"
            >
              İptal
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main admin dashboard
function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [tracks, setTracks] = useState<Track[]>(getStoredTracks);
  const [editingTrack, setEditingTrack] = useState<Partial<Track> | null | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const filteredTracks = tracks.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = (track: Track) => {
    const updated = editingTrack?.id
      ? tracks.map(t => t.id === track.id ? track : t)
      : [...tracks, track];
    setTracks(updated);
    saveTracks(updated);
    setEditingTrack(undefined);
    toast.success(editingTrack?.id ? "Parça güncellendi!" : "Yeni parça eklendi!", {
      icon: <CheckCircle className="w-4 h-4 text-green-500" />,
    });
  };

  const handleDelete = (id: number) => {
    const updated = tracks.filter(t => t.id !== id);
    setTracks(updated);
    saveTracks(updated);
    setDeleteConfirm(null);
    toast.success("Parça silindi.");
  };

  const statsWithVideo = tracks.filter(t => t.youtubeId).length;

  return (
    <div className="min-h-screen bg-[oklch(0.08_0.015_265)]">
      {/* Header */}
      <header className="border-b border-[oklch(1_0_0/8%)] bg-[oklch(0.10_0.012_265)]">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[oklch(0.75_0.18_45/20%)] border border-[oklch(0.75_0.18_45/30%)] flex items-center justify-center">
              <Music className="w-4 h-4 text-[oklch(0.75_0.18_45)]" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-[oklch(0.95_0.005_65)]" style={{ fontFamily: "'Cinzel', serif" }}>
                Admin Paneli
              </h1>
              <p className="text-xs text-[oklch(0.35_0.01_265)]">Naim Aktaş Official</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="text-xs text-[oklch(0.45_0.01_265)] hover:text-[oklch(0.75_0.18_45)] transition-colors flex items-center gap-1"
            >
              <Eye className="w-3 h-3" />
              Siteyi Gör
            </a>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-xs text-[oklch(0.45_0.01_265)] hover:text-[oklch(0.65_0.2_25)] transition-colors border border-[oklch(1_0_0/8%)] px-3 py-1.5 rounded-full"
            >
              <LogOut className="w-3 h-3" />
              Çıkış
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Toplam Parça", value: tracks.length, color: "oklch(0.75 0.18 45)" },
            { label: "Videolu Parça", value: statsWithVideo, color: "oklch(0.7 0.2 25)" },
            { label: "Videosuz", value: tracks.length - statsWithVideo, color: "oklch(0.55 0.01 265)" },
            { label: "Son Güncelleme", value: "Bugün", color: "oklch(0.65 0.15 160)" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[oklch(0.12_0.012_265)] border border-[oklch(1_0_0/8%)] rounded-xl p-4">
              <div className="text-2xl font-bold mb-1" style={{ color: stat.color, fontFamily: "'Cinzel', serif" }}>
                {stat.value}
              </div>
              <div className="text-xs text-[oklch(0.45_0.01_265)]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Actions bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Music className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.35_0.01_265)]" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Parça ara..."
              className="pl-9 bg-[oklch(0.12_0.012_265)] border-[oklch(1_0_0/10%)] text-[oklch(0.85_0.005_65)] placeholder:text-[oklch(0.3_0.01_265)] focus:border-[oklch(0.75_0.18_45/50%)]"
            />
          </div>
          <Button
            onClick={() => setEditingTrack(null)}
            className="bg-[oklch(0.75_0.18_45)] text-[oklch(0.08_0.015_265)] hover:bg-[oklch(0.82_0.18_45)] font-semibold whitespace-nowrap"
          >
            <Plus className="w-4 h-4 mr-2" />
            Yeni Parça Ekle
          </Button>
        </div>

        {/* Tracks table */}
        <div className="bg-[oklch(0.12_0.012_265)] border border-[oklch(1_0_0/8%)] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[oklch(1_0_0/8%)]">
                  <th className="text-left text-xs text-[oklch(0.35_0.01_265)] uppercase tracking-wider px-4 py-3 font-medium">#</th>
                  <th className="text-left text-xs text-[oklch(0.35_0.01_265)] uppercase tracking-wider px-4 py-3 font-medium">Parça Adı</th>
                  <th className="text-left text-xs text-[oklch(0.35_0.01_265)] uppercase tracking-wider px-4 py-3 font-medium hidden md:table-cell">YouTube ID</th>
                  <th className="text-left text-xs text-[oklch(0.35_0.01_265)] uppercase tracking-wider px-4 py-3 font-medium hidden sm:table-cell">Tarih</th>
                  <th className="text-right text-xs text-[oklch(0.35_0.01_265)] uppercase tracking-wider px-4 py-3 font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredTracks.map((track, index) => (
                  <tr
                    key={track.id}
                    className={`border-b border-[oklch(1_0_0/5%)] hover:bg-[oklch(0.15_0.012_265)] transition-colors ${
                      index === filteredTracks.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="px-4 py-3 text-xs font-mono text-[oklch(0.35_0.01_265)]">
                      {String(track.id).padStart(2, '0')}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[oklch(0.85_0.005_65)]" style={{ fontFamily: "'Cinzel', serif" }}>
                          {track.title}
                        </span>
                        {track.youtubeId && (
                          <span className="w-2 h-2 rounded-full bg-[oklch(0.65_0.15_160)] flex-shrink-0" title="Video mevcut" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {track.youtubeId ? (
                        <a
                          href={`https://youtube.com/watch?v=${track.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-[oklch(0.75_0.18_45)] hover:text-[oklch(0.85_0.2_45)] transition-colors"
                        >
                          {track.youtubeId}
                        </a>
                      ) : (
                        <span className="text-xs text-[oklch(0.3_0.01_265)]">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="text-xs text-[oklch(0.45_0.01_265)]">{track.date}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingTrack(track)}
                          className="p-1.5 rounded-lg text-[oklch(0.45_0.01_265)] hover:text-[oklch(0.75_0.18_45)] hover:bg-[oklch(0.75_0.18_45/10%)] transition-all"
                          title="Düzenle"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        {deleteConfirm === track.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(track.id)}
                              className="text-xs px-2 py-1 bg-[oklch(0.65_0.2_25)] text-white rounded-md hover:bg-[oklch(0.7_0.2_25)] transition-colors"
                            >
                              Sil
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="text-xs px-2 py-1 border border-[oklch(1_0_0/10%)] text-[oklch(0.55_0.01_265)] rounded-md hover:bg-[oklch(0.15_0.012_265)] transition-colors"
                            >
                              İptal
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(track.id)}
                            className="p-1.5 rounded-lg text-[oklch(0.45_0.01_265)] hover:text-[oklch(0.65_0.2_25)] hover:bg-[oklch(0.65_0.2_25/10%)] transition-all"
                            title="Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-center text-xs text-[oklch(0.25_0.01_265)] mt-6">
          Not: Değişiklikler bu tarayıcıda saklanır. Kalıcı değişiklikler için site yöneticinizle iletişime geçin.
        </p>
      </div>

      {/* Track form modal */}
      {editingTrack !== undefined && (
        <TrackFormModal
          track={editingTrack}
          onSave={handleSave}
          onClose={() => setEditingTrack(undefined)}
        />
      )}
    </div>
  );
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(AUTH_KEY) === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={() => setIsAuthenticated(true)} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}
