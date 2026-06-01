# Naim Aktaş Official - Tasarım Fikirleri

## Yaklaşım 1: "Anadolu Noir"
<response>
<text>
**Design Movement:** Art Deco meets Turkish Folk — Anadolu Noir

**Core Principles:**
- Derin siyah zemin üzerine altın/amber vurgular (geleneksel Türk el sanatları estetiği)
- Asimetrik düzen: sol tarafta büyük tipografi, sağda görsel ağırlık
- Grain/noise texture ile sinematik derinlik
- Müzik dalgaları ve ses görselleştirme motifleri

**Color Philosophy:**
- Zemin: #0A0A0A (derin siyah)
- Vurgu: #C9A84C (antik altın) — geleneksel Türk sanatından ilham
- İkincil: #8B4513 (koyu toprak kırmızısı)
- Metin: #F5F0E8 (krem beyaz)
- Kart: #141414 (hafif gri siyah)

**Layout Paradigm:**
- Hero: tam ekran, büyük isim sol hizalı, fotoğraf sağda
- Parçalar: yatay kaydırmalı kart galerisi
- Sidebar değil, üst navigasyon — minimal, şeffaf

**Signature Elements:**
- Dalga formu (waveform) dekoratif motif
- Altın çizgi separatörler
- Türk geometrik desen arka plan deseni (çok ince, neredeyse görünmez)

**Interaction Philosophy:**
- Hover'da altın parıltı efekti
- Kart açılışında yumuşak scale + fade
- Scroll'da parallax hero

**Animation:**
- Sayfa girişinde soldan sağa metin reveal (stagger 60ms)
- Kart hover: translateY(-4px) + gold border glow
- Müzik kartı açıldığında YouTube embed smooth expand

**Typography System:**
- Başlık: Playfair Display (serif, dramatik)
- Alt başlık: Cormorant Garamond (zarif italic)
- Gövde: DM Sans (modern, okunabilir)
</text>
<probability>0.08</probability>
</response>

## Yaklaşım 2: "Minimal Obsidian"
<response>
<text>
**Design Movement:** Swiss International Style meets Dark Mode Minimalism

**Core Principles:**
- Radikal boşluk kullanımı — nefes alan düzen
- Monokromatik siyah-gri palette, tek bir canlı vurgu rengi
- Grid-kırıcı tipografi: büyük ölçekli isim, küçük detaylar
- Müzik platformu netliği (Spotify/Apple Music ilhamı)

**Color Philosophy:**
- Zemin: #111111
- Kart: #1C1C1E (iOS dark mode gri)
- Vurgu: #1DB954 (Spotify yeşili değil) → #E8C547 (altın sarı)
- Metin birincil: #FFFFFF
- Metin ikincil: #A0A0A0

**Layout Paradigm:**
- Tam genişlik hero band, isim merkez-sol
- Parçalar: 3 sütunlu grid, eşit kartlar
- Sticky header, saydam blur efekti

**Signature Elements:**
- Müzik nota sembolü logo
- İnce çizgi ayırıcılar
- Sayı etiketleri (01, 02, 03...)

**Interaction Philosophy:**
- Sade, hızlı geçişler
- Hover'da arka plan rengi değişimi
- Focus visible için belirgin ring

**Animation:**
- Fade-in on scroll (IntersectionObserver)
- Kart hover: subtle scale 1.02
- Loading skeleton

**Typography System:**
- Başlık: Space Grotesk (geometric sans)
- Gövde: Inter (klasik ama işlevsel)
</text>
<probability>0.06</probability>
</response>

## Yaklaşım 3: "Velvet Underground" — SEÇİLEN YAKLAŞIM ✓
<response>
<text>
**Design Movement:** Cinematic Dark Luxury — Velvet Underground

**Core Principles:**
- Derin koyu zemin (neredeyse siyah lacivert), kadifemsi doku
- Büyük, cesur tipografi — sanatçı kimliğini ön plana çıkarır
- Asimetrik hero: fotoğraf sol, metin sağda büyük
- Müzik kartları: albüm kapağı gibi kare formatında, hover'da play butonu

**Color Philosophy:**
- Zemin: oklch(0.08 0.02 265) — koyu lacivert-siyah
- Kart: oklch(0.13 0.015 265) — hafif daha açık
- Vurgu birincil: oklch(0.75 0.18 45) — sıcak altın
- Vurgu ikincil: oklch(0.55 0.15 350) — derin kırmızı
- Metin: oklch(0.95 0.005 65) — krem beyaz
- Muted: oklch(0.55 0.01 265) — gri

**Layout Paradigm:**
- Hero: tam ekran, sanatçı fotoğrafı sol yarıda, isim sağda büyük
- Parçalar: masonry-benzeri kart grid (farklı yükseklikler)
- Sticky nav: şeffaf → blur scroll'da
- Footer: sosyal medya ikonları büyük

**Signature Elements:**
- Ses dalgası (waveform) animasyonu — canlı müzik hissi
- Altın gradient çizgiler section ayırıcı olarak
- Fotoğraf üzerinde hafif gradient overlay

**Interaction Philosophy:**
- Kart hover: YouTube thumbnail göster + play overlay
- Sosyal ikon hover: platform rengi ile parıltı
- Smooth scroll + section reveal

**Animation:**
- Hero: metin sol'dan slide-in, fotoğraf sağdan (300ms ease-out)
- Kart grid: stagger reveal (50ms arayla)
- Play button: scale 0.95 → 1 pulse efekti
- Nav: scroll'da backdrop-blur aktif

**Typography System:**
- Başlık/İsim: Cinzel (Roma serif, dramatik ve güçlü)
- Alt başlık: Raleway (zarif sans-serif)
- Gövde/Parça isimleri: DM Sans (temiz, modern)
- Hiyerarşi: 72px isim → 24px başlık → 16px gövde
</text>
<probability>0.09</probability>
</response>

---

## Seçilen Yaklaşım: "Velvet Underground" (Yaklaşım 3)

**Gerekçe:** Naim Aktaş'ın geleneksel Türk müziği kimliğine en uygun yaklaşım bu. Sinematik karanlık lüks estetik, hem modern müzik platformlarının profesyonelliğini hem de geleneksel sanatçı portföyünün ağırlığını taşıyor. Altın vurgular Türk sanatı geleneğiyle rezonans kuruyor.
