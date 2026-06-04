// Naim Aktaş - Tüm parça listesi
// Design: Velvet Underground — Cinematic Dark Luxury

export interface Track {
  id: number;
  title: string;
  slug: string;
  youtubeId: string | null;
  date: string;
  category: "türkü" | "uzun hava" | "halk müziği";
  lyrics?: string;
}

export const tracks: Track[] = [
  { id: 1,  title: "Kemerimin Tokası",                       slug: "kemerimin-tokasi",                    youtubeId: "-qbsoXdJJq8", date: "21 Nisan 2020", category: "türkü",       lyrics: "Kemerimin tokası altın mı gümüş mü\nGözlerimin bakışı karlı dağ gibi\nSevdiğimin yüzü ay mı güneş mi\nGönlümün sevinci bülbül sesi gibi" },
  { id: 2,  title: "Şu Karşıki Yaylada Geçti Dost Kervanı", slug: "su-karsiki-yaylada-gecti-dost-kervani", youtubeId: "efZbuUTeZG4", date: "21 Nisan 2020", category: "türkü",       lyrics: "Şu karşıki yaylada geçti dost kervanı\nBen de gitsem dosta kervana katılsam\nDağlar aşıp yollar geçip gitsem\nBir gün olsun sevdiğimi görsem" },
  { id: 3,  title: "Kaşlarını Eğdirirsin",                  slug: "kaslarin-egdirirsin",                  youtubeId: "UiNLF2Ixoh0", date: "21 Nisan 2020", category: "türkü",       lyrics: "Kaşlarını eğdirirsin\nGözlerini süzdürürsün\nBen seni sevmesem de\nKendini sevdirirsin" },
  { id: 4,  title: "İstemiyorum",                           slug: "istemiyorum",                          youtubeId: "e07XREPZBLQ", date: "21 Nisan 2020", category: "halk müziği", lyrics: "İstemiyorum artık seni\nBıraktım gönlümden seni\nYollarım ayrı ayrı\nUnutuldu her şey" },
  { id: 5,  title: "Ölümden Çok Çektim",                   slug: "olumden-cok-cektim",                   youtubeId: "lhi1WVH7Lx0", date: "21 Nisan 2020", category: "türkü",       lyrics: "Ölümden çok çektim bu ayrılıktan\nGözlerim yaş tutmaz ağlamaktan\nSen gideli dünya dar gelir bana\nGönlüm sızlar dert ile gamdan" },
  { id: 6,  title: "Dağlar Ara Ver",                        slug: "daglar-ara-ver",                       youtubeId: "Jev7NQmwULA", date: "21 Nisan 2020", category: "türkü",       lyrics: "Dağlar ara ver geçeyim\nYar yolunu gözeteyim\nGözlerim yolda kaldı\nBir haber versene" },
  { id: 7,  title: "Ayrılık Hasreti",                       slug: "ayrilik-hasreti",                      youtubeId: "2VkVYrkb9Kc", date: "21 Nisan 2020", category: "türkü",       lyrics: "Ayrılık hasreti yaktı içimi\nGözlerimden akan yaş dinmiyor\nSeni görmek ister gönlüm her gece\nYolların sonu nerede bilinmiyor" },
  { id: 8,  title: "Sarı Pabuç",                            slug: "sari-pabuc",                           youtubeId: "c1p49MsQEB4", date: "21 Nisan 2020", category: "türkü",       lyrics: "Sarı pabuç giymiş yar\nNarin narin yürür yar\nGönlüm sana bağlandı\nGöz gözüme bakar yar" },
  { id: 9,  title: "Karşıda Üzüm Kara",                    slug: "karsida-uzum-kara",                    youtubeId: "JPaRGu7haIo", date: "21 Nisan 2020", category: "türkü",       lyrics: "Karşıda üzüm kara\nBen nasıl yanmam yara\nSevdiğim yar gideli\nDüştüm bir yana zara" },
  { id: 10, title: "Nere Gidem Gönül",                      slug: "nere-gidem-gonul",                     youtubeId: "1mK2JFN23Y4", date: "21 Nisan 2020", category: "halk müziği", lyrics: "Nere gidem gönül nere\nHer yol bana dar gelir\nSen olmadan bu dünyada\nNe bahar ne de güz gelir" },
  { id: 11, title: "Mevlam Bir Çok Dert Vermiş",           slug: "mevlam-bir-cok-dert-vermis",           youtubeId: "Yfiv_O_XepY", date: "21 Nisan 2020", category: "türkü" },
  { id: 12, title: "Bahçada Nar Ağacı",                     slug: "bahcada-nar-agaci",                    youtubeId: "3Uxw09iZRSc", date: "21 Nisan 2020", category: "türkü" },
  { id: 13, title: "Kurban Olam",                           slug: "kurban-olam",                          youtubeId: "ASrpj3rZTzs", date: "21 Nisan 2020", category: "türkü" },
  { id: 14, title: "Aynası Belinde",                        slug: "aynasi-belinde",                       youtubeId: "c_oDnbah8bA", date: "21 Nisan 2020", category: "türkü" },
  { id: 15, title: "Bir Elinde Nargile",                    slug: "bir-elinde-nargile",                   youtubeId: "sg8EN1u8FXI", date: "21 Nisan 2020", category: "türkü" },
  { id: 16, title: "Bitlisin Önünde Bağlar",                slug: "bitlisin-onunde-baglar",               youtubeId: "4_w7SDQjiJg", date: "21 Nisan 2020", category: "türkü" },
  { id: 17, title: "Gelin Oldum Karabükün Eline",           slug: "gelin-oldum-karabukun-eline",          youtubeId: "nxZgLhGwniI", date: "21 Nisan 2020", category: "türkü" },
  { id: 18, title: "Yağmur Yağar Yaş Olur",                slug: "yagmur-yagar-yas-olur",                youtubeId: "ENwFUs3Zpsk", date: "21 Nisan 2020", category: "türkü" },
  { id: 19, title: "Sunam Uzun Hava",                       slug: "sunam-uzun-hava",                      youtubeId: "6nO_wcyr-hg", date: "21 Nisan 2020", category: "uzun hava" },
  { id: 20, title: "Güle Güle",                             slug: "gule-gule",                            youtubeId: "rI1nt39CgF0", date: "21 Nisan 2020", category: "türkü" },
  { id: 21, title: "Yaroy",                                 slug: "yaroy",                                youtubeId: "zo4AABSx9No", date: "21 Nisan 2020", category: "türkü" },
  { id: 22, title: "Gidek Gidek",                           slug: "gidek-gidek",                          youtubeId: "RwDd8ta7K9I", date: "21 Nisan 2020", category: "türkü" },
  { id: 23, title: "Gitme Nazlım",                          slug: "gitme-nazlim",                         youtubeId: "_f-3sOeM3A8", date: "21 Nisan 2020", category: "türkü" },
  { id: 24, title: "Vayle Vayle",                           slug: "vayle-vayle",                          youtubeId: "AvM7AYAxBVw", date: "21 Nisan 2020", category: "halk müziği" },
  { id: 25, title: "Küstürdün Barışamam",                   slug: "kusturdun-barisamam",                  youtubeId: "bhApIu1ZiGE", date: "21 Nisan 2020", category: "türkü" },
  { id: 26, title: "Huma Kuşu Uzun Hava",                  slug: "huma-kusu-uzun-hava",                  youtubeId: "PfkmPJ80R1g", date: "21 Nisan 2020", category: "uzun hava" },
  { id: 27, title: "Darıldım Darıldım",                     slug: "darildim-darildim",                    youtubeId: "dnDaY2YTKqk", date: "21 Nisan 2020", category: "türkü" },
  { id: 28, title: "Sırrın Saklamayan Dost",                slug: "sirrin-saklamayan-dost",               youtubeId: "9CgGVhCtoXw", date: "21 Nisan 2020", category: "türkü" },
  { id: 29, title: "Niçin Ağlamayım",                       slug: "nicin-aglamayim",                      youtubeId: "Qn6HW5LvJb4", date: "21 Nisan 2020", category: "türkü" },
  { id: 30, title: "Başıma Vurupta Delirttin Beni",         slug: "basima-vurupta-delirttin-beni",        youtubeId: "nMYeKVGXeUA", date: "21 Nisan 2020", category: "türkü" },
  { id: 31, title: "Ağlama Yar Ağlama",                     slug: "aglama-yar-aglama",                    youtubeId: "L83Jz9RiCgI", date: "21 Nisan 2020", category: "türkü" },
  { id: 32, title: "Gel Gidelim Dosta Gönül",               slug: "gel-gidelim-dosta-gonul",              youtubeId: "WveEPlq-Ynw", date: "21 Nisan 2020", category: "halk müziği" },
  { id: 33, title: "Güle Güle Ay Hanım",                    slug: "gule-gule-ay-hanim",                   youtubeId: "M2qqwYBhTGE", date: "21 Nisan 2020", category: "türkü" },
  { id: 34, title: "Bağlandı Yollarım",                     slug: "baglandi-yollarim",                    youtubeId: "KvGr9Hgv2UI", date: "21 Nisan 2020", category: "türkü" },
  { id: 35, title: "Mahkemeye Versem Seni",                 slug: "mahkemeye-versem-seni",                youtubeId: "oh0m89l7BAo", date: "21 Nisan 2020", category: "türkü" },
  { id: 36, title: "Ağlatma Gülüm Yeter",                   slug: "aglatma-gulum-yeter",                  youtubeId: "ZgXv1JsJNzk", date: "21 Nisan 2020", category: "türkü" },
  { id: 37, title: "Zülfünü Taramadım",                     slug: "zulfunu-taramadim",                    youtubeId: "dz_npCPc4kk", date: "21 Nisan 2020", category: "türkü" },
  { id: 38, title: "Mardin Kapısında",                      slug: "mardin-kapisinda",                     youtubeId: "4jWPgc47ThA", date: "21 Nisan 2020", category: "türkü" },
  { id: 39, title: "Yavru Yavru Uzun Hava",                 slug: "yavru-yavru-uzun-hava",                youtubeId: "6O15mFP06BY", date: "21 Nisan 2020", category: "uzun hava" },
  { id: 40, title: "Ne Sevdiğin Belli",                     slug: "ne-sevdigin-belli",                    youtubeId: "GB7yX40rsHQ", date: "21 Nisan 2020", category: "türkü" },
  { id: 41, title: "Bir Mumdur",                            slug: "bir-mumdur",                           youtubeId: "51-pImJbjxo", date: "21 Nisan 2020", category: "türkü" },
  { id: 42, title: "Bu Yıl Benim Yeşil Bağım Kurudu",      slug: "bu-yil-benim-yesil-bagim-kurudu",      youtubeId: "8yQRKECpGXY", date: "21 Nisan 2020", category: "türkü" },
  { id: 43, title: "Kırmızı Kurdele",                       slug: "kirmizi-kurdele",                      youtubeId: "sD5Xmn9Xuf0", date: "21 Nisan 2020", category: "türkü" },
  { id: 44, title: "Bitliste Beş Minare",                   slug: "bitliste-bes-minare",                  youtubeId: "CICd4X7_PQ0", date: "21 Nisan 2020", category: "türkü" },
  { id: 45, title: "İndim Gülün Bağına",                    slug: "indim-gulun-bagina",                   youtubeId: "kT8CsBDqJRk", date: "21 Nisan 2020", category: "türkü" },
  { id: 46, title: "Bu Yarayı Dosttan Aldım",               slug: "bu-yarayi-dosttan-aldim",              youtubeId: "ShG_8YwZPQw", date: "21 Nisan 2020", category: "türkü" },
  { id: 47, title: "Allah Bile Kullarına",                  slug: "allah-bile-kullarina",                 youtubeId: "OsLEEsoL3FY", date: "21 Nisan 2020", category: "halk müziği" },
  { id: 48, title: "Bağlarına Vardım",                      slug: "baglarina-vardim",                     youtubeId: "xb3trJwNnxc", date: "21 Nisan 2020", category: "türkü" },
  { id: 49, title: "Ah Le Ana",                             slug: "ah-le-ana",                            youtubeId: "Z-4JqakUsyc", date: "21 Nisan 2020", category: "türkü" },
  { id: 50, title: "Suda Balık Yan Gider",                  slug: "suda-balik-yan-gider",                 youtubeId: "RLf16kXPyxY", date: "21 Nisan 2020", category: "türkü" },
  { id: 51, title: "Bu Tarlanın Düzüne",                    slug: "bu-tarlanin-duzune",                   youtubeId: "xthHPV0Lqe0", date: "21 Nisan 2020", category: "türkü" },
  { id: 52, title: "Medranasan Medrana",                    slug: "medranasan-medrana",                   youtubeId: "xNU0imNYReE", date: "21 Nisan 2020", category: "halk müziği" },
  { id: 53, title: "Yola Çıktım Mardine",                   slug: "yola-ciktim-mardine",                  youtubeId: "eGnfxkmPxzQ", date: "21 Nisan 2020", category: "türkü" },
  { id: 54, title: "Ayvanın Ortasında",                     slug: "ayvanin-ortasinda",                    youtubeId: "VtFgu8ciLhU", date: "21 Nisan 2020", category: "türkü" },
  { id: 55, title: "Öleyimmi Sevgilim",                     slug: "oleyimmi-sevgilim",                    youtubeId: "VpAHGoXY_Co", date: "21 Nisan 2020", category: "türkü" },
  { id: 56, title: "Aydıl Aydıl",                           slug: "aydil-aydil",                          youtubeId: "FxRT1REttkc", date: "21 Nisan 2020", category: "türkü" },
  { id: 57, title: "Dostum Dostum",                         slug: "dostum-dostum",                        youtubeId: "vswHSlZgM60", date: "21 Nisan 2020", category: "halk müziği" },
  { id: 58, title: "Derdinden Deli Oldum",                  slug: "derdinden-deli-oldum",                 youtubeId: "rm_rzjTpYfI", date: "21 Nisan 2020", category: "türkü" },
  { id: 59, title: "Aldırma Gönül",                         slug: "aldirma-gonul",                        youtubeId: "4ktCY5cppSo", date: "21 Nisan 2020", category: "türkü" },
  { id: 60, title: "Köprünün Başlarında",                   slug: "koprunun-baslarinda",                  youtubeId: "Vp_CGEZ8IDY", date: "21 Nisan 2020", category: "türkü" },
  { id: 61, title: "Huzurum Kalmadı",                       slug: "huzurum-kalmadi",                      youtubeId: "FPHguEHFRtY", date: "21 Nisan 2020", category: "türkü" },
  { id: 62, title: "Kara Köprü",                            slug: "kara-kopru",                           youtubeId: "5b1cqXbJzo8", date: "21 Nisan 2020", category: "türkü" },
  { id: 63, title: "İki Dağın Arasında Kalmışam",           slug: "iki-dagin-arasinda-kalmisam",          youtubeId: "MPsLujvi5j0", date: "21 Nisan 2020", category: "uzun hava" },
  { id: 64, title: "Aşağıdan Gelir",                        slug: "asagidan-gelir",                       youtubeId: "-xfMgRGRkLw", date: "21 Nisan 2020", category: "türkü" },
  { id: 65, title: "Yandı Ha Yandı",                        slug: "yandi-ha-yandi",                       youtubeId: "mGQzj-ZAUxM", date: "21 Nisan 2020", category: "türkü" },
  { id: 66, title: "Ne İncecik Boyun Var",                  slug: "ne-incecik-boyun-var",                 youtubeId: "SOJUKf7B7Ts", date: "21 Nisan 2020", category: "türkü" },
  { id: 67, title: "He Güley",                              slug: "he-guley",                             youtubeId: "85s6ipNKWtM", date: "21 Nisan 2020", category: "türkü" },
  { id: 68, title: "Ötme Bülbül Ötme",                      slug: "otme-bulbul-otme",                     youtubeId: "SMUaZ1Zb2L0", date: "21 Nisan 2020", category: "türkü" },
  { id: 69, title: "Mamoş",                                 slug: "mamos",                                youtubeId: "2eRQ02HokY4", date: "21 Nisan 2020", category: "türkü" },
  { id: 70, title: "Boşver Be Arkadaş",                     slug: "bosver-be-arkadas",                    youtubeId: "45fsE0dI9HE", date: "21 Nisan 2020", category: "halk müziği" },
  { id: 71, title: "Unutuldu Aşkımız",                      slug: "unutuldu-askimiz",                     youtubeId: "9G2iPZeVW3Q", date: "21 Nisan 2020", category: "türkü" },
];

export const socialLinks = {
  youtube:   "https://www.youtube.com/channel/UCqc_HOho4odWtx3Wle7RX-Q/videos",
  facebook:  "https://www.facebook.com/profile.php?id=100008335243864",
  instagram: "https://www.instagram.com/naim.aktas/",
};

export function getTrackBySlug(slug: string): Track | undefined {
  return tracks.find(t => t.slug === slug);
}

export function getYoutubeThumbnail(youtubeId: string): string {
  return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
}
