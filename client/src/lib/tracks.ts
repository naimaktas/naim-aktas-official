// Naim Aktaş - Tüm parça listesi (Blogspot'tan çekildi)
// Design: Velvet Underground — Cinematic Dark Luxury

export interface Track {
  id: number;
  title: string;
  slug: string;
  youtubeId: string | null;
  date: string;
  blogUrl: string;
}

export const tracks: Track[] = [
  { id: 1, title: "Kemerimin Tokası", slug: "kemerimin-tokasi", youtubeId: "-qbsoXdJJq8", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-kemerimin-tokasi.html" },
  { id: 2, title: "Şu Karşıki Yaylada Geçti Dost Kervanı", slug: "su-karsiki-yaylada-gecti-dost-kervani", youtubeId: "efZbuUTeZG4", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-su-karski-yaylada-gecti-dost.html" },
  { id: 3, title: "Kaşlarını Eğdirirsin", slug: "kaslarin-egdirirsin", youtubeId: "UiNLF2Ixoh0", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-kaslarn-egdirirsin.html" },
  { id: 4, title: "İstemiyorum", slug: "istemiyorum", youtubeId: "e07XREPZBLQ", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-istemiyorum.html" },
  { id: 5, title: "Ölümden Çok Çektim", slug: "olumden-cok-cektim", youtubeId: "lhi1WVH7Lx0", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-olumden-cok-cektim.html" },
  { id: 6, title: "Dağlar Ara Ver", slug: "daglar-ara-ver", youtubeId: "Jev7NQmwULA", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-daglar-ara-ver.html" },
  { id: 7, title: "Ayrılık Hasreti", slug: "ayrilik-hasreti", youtubeId: "2VkVYrkb9Kc", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-ayrlk-hasreti.html" },
  { id: 8, title: "Sarı Pabuç", slug: "sari-pabuc", youtubeId: "c1p49MsQEB4", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-sar-pabuc.html" },
  { id: 9, title: "Karşıda Üzüm Kara", slug: "karsida-uzum-kara", youtubeId: "JPaRGu7haIo", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-karsda-uzum-kara.html" },
  { id: 10, title: "Nere Gidem Gönül", slug: "nere-gidem-gonul", youtubeId: "1mK2JFN23Y4", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-nere-gidem-gonul.html" },
  { id: 11, title: "Mevlam Bir Çok Dert Vermiş", slug: "mevlam-bir-cok-dert-vermis", youtubeId: "Yfiv_O_XepY", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-mevlam-bir-cok-dert-vermis.html" },
  { id: 12, title: "Bahçada Nar Ağacı", slug: "bahcada-nar-agaci", youtubeId: "3Uxw09iZRSc", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-bahcada-nar-agac.html" },
  { id: 13, title: "Kurban Olam", slug: "kurban-olam", youtubeId: "ASrpj3rZTzs", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-kurban-olam.html" },
  { id: 14, title: "Aynası Belinde", slug: "aynasi-belinde", youtubeId: "c_oDnbah8bA", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-aynas-belinde.html" },
  { id: 15, title: "Bir Elinde Nargile", slug: "bir-elinde-nargile", youtubeId: "sg8EN1u8FXI", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-bir-elinde-nargile.html" },
  { id: 16, title: "Bitlisin Önünde Bağlar", slug: "bitlisin-onunde-baglar", youtubeId: "4_w7SDQjiJg", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-bitlisin-onunde-baglar.html" },
  { id: 17, title: "Gelin Oldum Karabükün Eline", slug: "gelin-oldum-karabukun-eline", youtubeId: "nxZgLhGwniI", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-gelin-oldum-karabukun-eline.html" },
  { id: 18, title: "Yağmur Yağar Yaş Olur", slug: "yagmur-yagar-yas-olur", youtubeId: "ENwFUs3Zpsk", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-yagmur-yagar-yas-olur.html" },
  { id: 19, title: "Sunam Uzun Hava", slug: "sunam-uzun-hava", youtubeId: "6nO_wcyr-hg", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-sunam-uzun-hava.html" },
  { id: 20, title: "Güle Güle", slug: "gule-gule", youtubeId: "rI1nt39CgF0", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-gule-gule.html" },
  { id: 21, title: "Yaroy", slug: "yaroy", youtubeId: "zo4AABSx9No", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-yaroy.html" },
  { id: 22, title: "Gidek Gidek", slug: "gidek-gidek", youtubeId: "RwDd8ta7K9I", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-gidek-gidek.html" },
  { id: 23, title: "Gitme Nazlım", slug: "gitme-nazlim", youtubeId: "_f-3sOeM3A8", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-gitme-nazlm.html" },
  { id: 24, title: "Vayle Vayle", slug: "vayle-vayle", youtubeId: "AvM7AYAxBVw", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-vayle-vayle.html" },
  { id: 25, title: "Küstürdün Barışamam", slug: "kusturdun-barisamam", youtubeId: null, date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-kusturdun-barisamam.html" },
  { id: 26, title: "Huma Kuşu Uzun Hava", slug: "huma-kusu-uzun-hava", youtubeId: "PfkmPJ80R1g", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-huma-kusu-uzun-hava.html" },
  { id: 27, title: "Darıldım Darıldım", slug: "darildim-darildim", youtubeId: "dnDaY2YTKqk", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-darldm-darldm.html" },
  { id: 28, title: "Sırrın Saklamayan Dost", slug: "sirrin-saklamayan-dost", youtubeId: "9CgGVhCtoXw", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-srrn-saklamayan-dost.html" },
  { id: 29, title: "Niçin Ağlamayım", slug: "nicin-aglamayim", youtubeId: null, date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-nicin-aglamayam.html" },
  { id: 30, title: "Başıma Vurupta Delirttin Beni", slug: "basima-vurupta-delirttin-beni", youtubeId: "nMYeKVGXeUA", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-basma-vurupta-delirttin-beni.html" },
  { id: 31, title: "Ağlama Yar Ağlama", slug: "aglama-yar-aglama", youtubeId: "L83Jz9RiCgI", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-aglama-yar-aglama.html" },
  { id: 32, title: "Gel Gidelim Dosta Gönül", slug: "gel-gidelim-dosta-gonul", youtubeId: "WveEPlq-Ynw", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-gel-gidelim-dosta-gonul.html" },
  { id: 33, title: "Güle Güle Ay Hanım", slug: "gule-gule-ay-hanim", youtubeId: null, date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-gule-gule-ay-hanim.html" },
  { id: 34, title: "Bağlandı Yollarım", slug: "baglandi-yollarim", youtubeId: null, date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-bagland-yollarim.html" },
  { id: 35, title: "Mahkemeye Versem Seni", slug: "mahkemeye-versem-seni", youtubeId: "oh0m89l7BAo", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-mahkemeye-versem-seni.html" },
  { id: 36, title: "Ağlatma Gülüm Yeter", slug: "aglatma-gulum-yeter", youtubeId: "ZgXv1JsJNzk", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-aglatma-gulum-yeter.html" },
  { id: 37, title: "Zülfünü Taramadım", slug: "zulfunu-taramadim", youtubeId: null, date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-zulfunu-taramadim.html" },
  { id: 38, title: "Mardin Kapısında", slug: "mardin-kapisinda", youtubeId: null, date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-mardin-kapisinda.html" },
  { id: 39, title: "Yavru Yavru Uzun Hava", slug: "yavru-yavru-uzun-hava", youtubeId: "6O15mFP06BY", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-yavru-yavru-uzun-hava.html" },
  { id: 40, title: "Ne Sevdiğin Belli", slug: "ne-sevdigin-belli", youtubeId: "GB7yX40rsHQ", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-ne-sevdigin-belli.html" },
  { id: 41, title: "Bir Mumdur", slug: "bir-mumdur", youtubeId: "51-pImJbjxo", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-bir-mumdur.html" },
  { id: 42, title: "Bu Yıl Benim Yeşil Bağım Kurudu", slug: "bu-yil-benim-yesil-bagim-kurudu", youtubeId: null, date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-bu-yil-benim-yesil-bagim.html" },
  { id: 43, title: "Kırmızı Kurdele", slug: "kirmizi-kurdele", youtubeId: null, date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-kirmizi-kurdele.html" },
  { id: 44, title: "Bitliste Beş Minare", slug: "bitliste-bes-minare", youtubeId: "CICd4X7_PQ0", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-bitliste-bes-minare.html" },
  { id: 45, title: "İndim Gülün Bağına", slug: "indim-gulun-bagina", youtubeId: null, date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/indim-gulun-bagina.html" },
  { id: 46, title: "Bu Yarayı Dosttan Aldım", slug: "bu-yarayi-dosttan-aldim", youtubeId: null, date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-bu-yarayi-dosttan-aldim.html" },
  { id: 47, title: "Allah Bile Kullarına", slug: "allah-bile-kullarina", youtubeId: null, date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-allah-bile-kullarina.html" },
  { id: 48, title: "Bağlarına Vardım", slug: "baglarina-vardim", youtubeId: null, date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-baglarina-vardim.html" },
  { id: 49, title: "Ah Le Ana", slug: "ah-le-ana", youtubeId: "Z-4JqakUsyc", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-ah-le-ana.html" },
  { id: 50, title: "Suda Balık Yan Gider", slug: "suda-balik-yan-gider", youtubeId: null, date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-suda-balik-yan-gider.html" },
  { id: 51, title: "Bu Tarlanın Düzüne", slug: "bu-tarlanin-duzune", youtubeId: null, date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-bu-tarlanin-duzune.html" },
  { id: 52, title: "Medranasan Medrana", slug: "medranasan-medrana", youtubeId: "xNU0imNYReE", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-medranasan-medrana.html" },
  { id: 53, title: "Yola Çıktım Mardine", slug: "yola-ciktim-mardine", youtubeId: null, date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-yola-ciktim-mardine.html" },
  { id: 54, title: "Ayvanın Ortasında", slug: "ayvanin-ortasinda", youtubeId: null, date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-ayvanin-ortasinda.html" },
  { id: 55, title: "Öleyimmi Sevgilim", slug: "oleyimmi-sevgilim", youtubeId: "VpAHGoXY_Co", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-oleyimmi-sevgilim.html" },
  { id: 56, title: "Aydıl Aydıl", slug: "aydil-aydil", youtubeId: "FxRT1REttkc", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-aydl-aydl.html" },
  { id: 57, title: "Dostum Dostum", slug: "dostum-dostum", youtubeId: "vswHSlZgM60", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-dostum-dostum.html" },
  { id: 58, title: "Derdinden Deli Oldum", slug: "derdinden-deli-oldum", youtubeId: "rm_rzjTpYfI", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-derdinden-deli-oldum.html" },
  { id: 59, title: "Aldırma Gönül", slug: "aldirma-gonul", youtubeId: null, date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-aldirma-gonul.html" },
  { id: 60, title: "Köprünün Başlarında", slug: "koprunun-baslarinda", youtubeId: null, date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-koprunun-baslarinda.html" },
  { id: 61, title: "Huzurum Kalmadı", slug: "huzurum-kalmadi", youtubeId: null, date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-huzurum-kalmadi.html" },
  { id: 62, title: "Kara Köprü", slug: "kara-kopru", youtubeId: "5b1cqXbJzo8", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-kara-kopru.html" },
  { id: 63, title: "İki Dağın Arasında Kalmışam", slug: "iki-dagin-arasinda-kalmisam", youtubeId: null, date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-iki-dagin-arasinda-kalmisam.html" },
  { id: 64, title: "Aşağıdan Gelir", slug: "asagidan-gelir", youtubeId: null, date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-asagidan-gelir.html" },
  { id: 65, title: "Yandı Ha Yandı", slug: "yandi-ha-yandi", youtubeId: null, date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-yandi-ha-yandi.html" },
  { id: 66, title: "Ne İncecik Boyun Var", slug: "ne-incecik-boyun-var", youtubeId: "SOJUKf7B7Ts", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-ne-incecik-boyun-var.html" },
  { id: 67, title: "He Güley", slug: "he-guley", youtubeId: "85s6ipNKWtM", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-he-guley.html" },
  { id: 68, title: "Ötme Bülbül Ötme", slug: "otme-bulbul-otme", youtubeId: "SMUaZ1Zb2L0", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-otme-bulbul-otme.html" },
  { id: 69, title: "Mamoş", slug: "mamos", youtubeId: "2eRQ02HokY4", date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-mamos.html" },
  { id: 70, title: "Boşver Be Arkadaş", slug: "bosver-be-arkadas", youtubeId: null, date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/bosver-be-arkadas.html" },
  { id: 71, title: "Unutuldu Aşkımız", slug: "unutuldu-askimiz", youtubeId: null, date: "21 Nisan 2020", blogUrl: "https://naimaktasoffical.blogspot.com/2020/04/naim-aktas-unutuldu-askimiz.html" },
];

export const socialLinks = {
  youtube: "https://www.youtube.com/channel/UCqc_HOho4odWtx3Wle7RX-Q/videos",
  facebook: "https://www.facebook.com/profile.php?id=100008335243864",
  instagram: "https://www.instagram.com/naim.aktas/",
};

export function getTrackBySlug(slug: string): Track | undefined {
  return tracks.find(t => t.slug === slug);
}

export function getYoutubeThumbnail(youtubeId: string): string {
  return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
}
