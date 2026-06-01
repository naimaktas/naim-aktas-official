# Naim Aktaş Official — Deploy Rehberi

## 🚀 Ücretsiz Yayınlama Seçenekleri

### Seçenek 1: Netlify (Önerilen — En Kolay)

1. **GitHub'a yükle:**
   - github.com adresine gidin ve yeni bir repo oluşturun (örn: `naim-aktas-official`)
   - Projeyi yükleyin veya Manus'un "GitHub" sekmesinden export edin

2. **Netlify'da deploy et:**
   - [netlify.com](https://netlify.com) adresine gidin → "Add new site" → "Import from Git"
   - GitHub reponuzu seçin
   - Build ayarları otomatik algılanır (`netlify.toml` dosyası sayesinde)
   - "Deploy site" butonuna tıklayın

3. **Özel domain (opsiyonel):**
   - Site Settings → Domain management → Add custom domain

**Canlı URL:** `https://[site-adınız].netlify.app`

---

### Seçenek 2: Vercel

1. [vercel.com](https://vercel.com) → "New Project" → GitHub reponuzu import edin
2. Framework: Vite olarak otomatik algılanır
3. "Deploy" butonuna tıklayın

**Canlı URL:** `https://[proje-adınız].vercel.app`

---

## 🔐 Admin Panel Bilgileri

**URL:** `https://siteniz.netlify.app/admin`

| Alan | Değer |
|------|-------|
| Kullanıcı Adı | `naimaktas` |
| Şifre | `NaimOfficial2024!` |

### Admin Panel Özellikleri:
- Yeni parça ekleme (başlık, YouTube ID, tarih)
- Mevcut parçaları düzenleme
- Parça silme
- Parça arama ve filtreleme
- İstatistik özeti (toplam parça, videolu/videosuz)

> **Not:** Admin paneli değişiklikleri tarayıcı localStorage'ında saklanır.
> Kalıcı değişiklikler için `client/src/lib/tracks.ts` dosyasını düzenleyin.

---

## 📊 Site İçeriği

- **71 parça** Blogspot'tan aktarıldı
- **47 parça** YouTube video ID'si mevcut
- Tüm sosyal medya linkleri entegre edildi:
  - YouTube: `youtube.com/channel/UCqc_HOho4odWtx3Wle7RX-Q`
  - Instagram: `instagram.com/naim.aktas`
  - Facebook: `facebook.com/profile.php?id=100008335243864`

---

## 🎨 Tasarım Sistemi

**"Velvet Underground"** — Sinematik Karanlık Lüks

- **Fontlar:** Cinzel (başlıklar) + Raleway (alt başlıklar) + DM Sans (gövde)
- **Renkler:** Koyu lacivert zemin + Altın vurgular
- **Animasyonlar:** Scroll reveal, kart hover, waveform bars

---

## 🔧 Yerel Geliştirme

```bash
cd naim-aktas-official
pnpm install
pnpm run dev
# → http://localhost:3000
```

## 📦 Build

```bash
pnpm run build
# → dist/public/ klasörüne üretilir
```
