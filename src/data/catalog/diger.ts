import { q, track, type Profession } from '../build';

export const veri: Profession = {
  id: 'veri',
  name: 'Veri & Analitik',
  icon: 'bar-chart',
  color: '#0E9F8E',
  tagline: 'Analiz, iş zekâsı, veri bilimi',
  tracks: [
    track('analist', 'Veri Analisti', 'pie-chart', 'SQL, istatistik, analiz vakaları', [
      ['SQL ve Temeller', 'Junior', [
        q('teknik', 'INNER JOIN ile LEFT JOIN arasındaki fark nedir? Ne zaman hangisini kullanırsın?',
          ['INNER eşleşenler: eşleş, kesişim, iki tabloda', 'LEFT tümü: sol, tüm, null', 'Örnek kullanım: örneğin, müşteri, sipariş'],
          'INNER JOIN sadece iki tabloda da eşleşen satırları getirir. LEFT JOIN sol tablodaki tüm satırları getirir, eşleşme yoksa sağ taraf NULL olur. Örneğin hiç sipariş vermemiş müşterileri bulmak için LEFT JOIN kullanırım.'),
        q('teknik', 'Ortalama ile medyan arasındaki farkı ve hangisinin ne zaman yanıltıcı olduğunu anlat.',
          ['Tanım: ortadaki, toplam, böl', 'Uç değerler: uç değer, outlier, aykırı', 'Çarpık dağılım: çarpık, dağılım, maaş, gelir'],
          'Ortalama tüm değerlerin toplamının adede bölümüdür, medyan sıralanmış verinin ortasıdır. Uç değerler ortalamayı çeker; gelir gibi çarpık dağılımlarda medyan daha temsil edicidir.'),
      ]],
      ['Analiz Vakaları', 'Mid', [
        q('vaka', 'Uygulamanın günlük aktif kullanıcı sayısı geçen hafta %15 düştü. Nasıl analiz edersin?',
          ['Veri doğrulama: takip, tracking, veri hatası, doğrula', 'Segmentasyon: segment, platform, ülke, kırılım', 'Dış etkenler: tatil, sezon, rakip, dış', 'İç değişiklikler: sürüm, release, kampanya, değişiklik', 'Hipotez: hipotez, varsayım'],
          'Önce verinin doğru olduğunu (tracking hatası olmadığını) kontrol ederim. Sonra platform, ülke, yeni/eski kullanıcı kırılımlarıyla düşüşün nerede yoğunlaştığına bakarım. Sürümler, kampanyalar ve tatil gibi etkenler için hipotez kurup veriyle test ederim.'),
        q('teknik', 'Bir A/B testinin sonucunun güvenilir olduğundan nasıl emin olursun?',
          ['Örneklem büyüklüğü: örneklem, sample, güç', 'İstatistiksel anlamlılık: p-değer, p değer, anlamlı, güven aralığı', 'Süre / erken bakma: süre, erken, hafta', 'Rastgele atama: rastgele, random'],
          'Testten önce gereken örneklem büyüklüğünü ve süreyi hesaplarım, sonuçlara erken bakıp durdurmam. Atamanın rastgele, grupların dengeli olduğunu kontrol ederim. Sonucu p-değeri ve güven aralığıyla, iş etkisiyle birlikte yorumlarım.'),
      ]],
      ['Paydaş Yönetimi', 'Senior', [
        q('vaka', 'Yönetici, verinin desteklemediği bir sonucu raporda görmek istiyor. Ne yaparsın?',
          ['Amacı anlama: neden, anla, amaç', 'Veriyle gösterme: veri, grafik, göster', 'Alternatif sunma: alternatif, öner, farklı', 'Dürüstlük: dürüst, etik, şeffaf'],
          'Önce yöneticinin asıl amacını anlamaya çalışırım. Verinin ne söylediğini net bir grafikle gösterir, şeffaf kalırım. Amaca hizmet eden, verinin desteklediği alternatif bir anlatı veya ek analiz öneririm.'),
      ]],
    ]),
    track('bi', 'İş Zekâsı (BI)', 'easel', 'Dashboard, veri modelleme, raporlama', [
      ['Dashboard', 'Junior', [
        q('teknik', 'İyi bir dashboard nasıl tasarlanır?',
          ['Hedef kitle: kullanıcı, kitle, kim', 'Az ve öz metrik: az, odak, önemli', 'Doğru grafik türü: grafik, çizgi, çubuk', 'Bağlam / karşılaştırma: hedef, önceki, karşılaştır'],
          'Önce dashboard’u kimin, hangi karar için kullanacağını netleştiririm. Az sayıda kritik metriğe odaklanır, trend için çizgi, kıyas için çubuk grafik seçerim. Her metriği hedef veya önceki dönemle karşılaştırarak bağlam veririm.'),
        q('teknik', 'Star schema (yıldız şema) nedir?',
          ['Fact tablosu: fact, olgu', 'Dimension tabloları: dimension, boyut', 'Raporlama hızı: hızlı, performans, sorgu', 'Örnek: satış, müşteri, ürün'],
          'Ortada ölçülebilir olayları tutan bir fact tablosu (örneğin satışlar), etrafında onu tanımlayan dimension tabloları (müşteri, ürün, tarih) bulunur. Basit join’lerle hızlı raporlama sağlar.'),
      ]],
      ['Veri Tutarlılığı', 'Mid', [
        q('vaka', 'İki farklı rapordaki ciro rakamı birbirini tutmuyor. Nasıl incelersin?',
          ['Tanım farkı: tanım, iade, vergi', 'Filtre / tarih: filtre, tarih, saat dilimi', 'Veri kaynağı: kaynak, tablo', 'Tek doğru kaynak: tek kaynak, standart, sözlük'],
          'Önce iki raporun ciro tanımını karşılaştırırım (iadeler, vergi dahil mi). Tarih filtrelerini ve saat dilimini kontrol eder, hangi tablolardan beslendiklerine bakarım. Sonunda metriği ortak bir veri sözlüğünde tek tanıma bağlarım.'),
      ]],
    ]),
    track('bilimci', 'Veri Bilimci', 'flask', 'Makine öğrenmesi, modelleme', [
      ['ML Temelleri', 'Junior', [
        q('teknik', 'Overfitting (aşırı öğrenme) nedir, nasıl önlersin?',
          ['Tanım: eğitim, ezber, genelle', 'Doğrulama: validation, doğrulama, cross', 'Düzenlileştirme: regularization, düzenli, l1, l2, dropout', 'Veri / basit model: veri, basit'],
          'Model eğitim verisini ezberleyip yeni veriye genelleyemediğinde overfitting olur. Cross-validation ile ölçer; regularization (L1/L2), dropout, daha basit model veya daha fazla veriyle önlerim.'),
        q('teknik', 'Precision ve recall arasındaki farkı bir örnekle açıklar mısın?',
          ['Precision: precision, kesinlik', 'Recall: recall, duyarlılık, yakala', 'Ödünleşim: ödünleşim, trade, denge, eşik', 'Örnek: örneğin, spam, kanser, dolandırıcılık'],
          'Precision, pozitif dediklerimizin ne kadarının gerçekten pozitif olduğudur; recall, gerçek pozitiflerin ne kadarını yakaladığımızdır. Örneğin kanser taramasında recall, spam filtresinde precision daha kritiktir. Eşik değeri bu dengeyi ayarlar.'),
      ]],
      ['Modelleme Vakası', 'Mid', [
        q('vaka', 'Bir müşteri kaybı (churn) modeli geliştireceksin. Adımların neler?',
          ['Problem tanımı: tanım, churn, hedef', 'Özellik mühendisliği: özellik, feature', 'Model ve değerlendirme: model, metrik, auc', 'İş aksiyonu: aksiyon, kampanya, iş'],
          'Önce churn’ün tanımını netleştiririm (örneğin 30 gün aktif olmamak). Kullanım sıklığı, şikâyetler gibi özellikler çıkarır, modeli AUC ve precision/recall ile değerlendiririm. Asıl değer, riskli müşterilere hedefli kampanya gibi bir iş aksiyonuna bağlanmasıdır.'),
      ]],
    ]),
  ],
};

export const urun: Profession = {
  id: 'urun',
  name: 'Ürün',
  icon: 'compass',
  color: '#E0761B',
  tagline: 'Ürün yönetimi, agile, UX tasarım',
  tracks: [
    track('pm', 'Ürün Yöneticisi', 'compass', 'Ürün düşüncesi, metrik, strateji', [
      ['Ürün Düşüncesi', 'Junior', [
        q('vaka', 'En sevdiğin uygulamayı seç. Onu nasıl geliştirirsin?',
          ['Kullanıcı segmenti: kullanıcı, segment, persona', 'Problem: problem, sorun, ihtiyaç', 'Çözüm önerisi: özellik, çözüm, öner', 'Başarı metriği: metrik, ölç, oran, kpi'],
          'Hedef kullanıcıyı seçer, onların en büyük problemini tanımlarım. 2–3 çözüm fikrini etki/efor ile önceliklendiririm. Başarıyı örneğin haftalık tekrar kullanım oranıyla ölçerim.'),
        q('teknik', 'Bir özellik listesini nasıl önceliklendirirsin?',
          ['Çerçeve: rice, moscow, etki, efor', 'Hedefle bağlantı: hedef, strateji, okr', 'Veri / geri bildirim: veri, geri bildirim, kullanıcı'],
          'Önce şirket hedefleriyle bağlantıya bakarım. RICE gibi bir çerçeveyle erişim, etki, güven ve eforu puanlarım. Kullanıcı geri bildirimi ve veriyle puanları doğrular, sonucu paydaşlarla şeffaf paylaşırım.'),
      ]],
      ['Metrikler', 'Mid', [
        q('vaka', 'Bir yemek siparişi uygulamasının başarısını hangi metriklerle ölçersin?',
          ['Ana metrik: north star, ana metrik, kuzey', 'Edinim: edinim, yeni kullanıcı, indirme', 'Tutma: retention, tutma, tekrar', 'Gelir / sepet: gelir, sepet, sipariş başına', 'Karşı metrik: teslim süre, iptal, şikayet, memnuniyet'],
          'North star olarak haftalık tamamlanan sipariş sayısını seçerim. Bunu edinim, 30 günlük tekrar sipariş ve sepet tutarıyla desteklerim. Kaliteyi korumak için teslim süresi ve iptal oranını karşı metrik olarak izlerim.'),
      ]],
      ['Strateji', 'Senior', [
        q('vaka', 'Şirket yeni bir pazara (örneğin Almanya) açılmak istiyor. Nasıl karar verirsin?',
          ['Pazar büyüklüğü: pazar, büyüklük', 'Rekabet: rakip, rekabet', 'Yerelleştirme: yerel, dil, regülasyon, yasal', 'Pilot: pilot, test, deney, mvp'],
          'Pazar büyüklüğünü ve rekabeti çıkarırım. Dil, ödeme alışkanlıkları ve regülasyon gibi yerelleştirme maliyetlerini değerlendiririm. Tam açılış yerine bir şehirde pilot başlatıp net başarı kriterleriyle karar veririm.'),
      ]],
    ]),
    track('po', 'Ürün Sahibi / Agile', 'list', 'User story, Scrum, backlog', [
      ['Agile Temelleri', 'Junior', [
        q('teknik', 'İyi bir user story nasıl yazılır?',
          ['Format: kullanıcı olarak, istiyorum, böylece', 'Kabul kriterleri: kabul, kriter', 'Küçük ve bağımsız: küçük, bağımsız, invest', 'Değer: değer, fayda'],
          '“Bir [kullanıcı] olarak [ihtiyaç] istiyorum, böylece [fayda]” formatında yazarım. Net kabul kriterleri eklerim. Story’nin bir sprintte bitecek kadar küçük, bağımsız ve test edilebilir olmasına (INVEST) dikkat ederim.'),
        q('teknik', 'Scrum’daki toplantıları ve amaçlarını anlatır mısın?',
          ['Sprint planlama: planlama, planning', 'Günlük toplantı: daily, günlük', 'Sprint review: review, gözden, demo', 'Retrospektif: retro, retrospektif'],
          'Sprint planlamada hedef ve iş seçilir. Daily’de ekip ilerlemeyi ve engelleri paylaşır. Review’da çıkan iş paydaşlara gösterilip geri bildirim alınır. Retrospektifte ekip çalışma şeklini iyileştirmek için ne değiştireceğini konuşur.'),
      ]],
      ['Backlog Yönetimi', 'Mid', [
        q('vaka', 'Sprint ortasında acil bir talep geldi. Ne yaparsın?',
          ['Etkiyi değerlendirme: etki, aciliyet, öncelik', 'Takas: çıkar, yerine, takas', 'Ekiple konuşma: ekip, konuş', 'Paydaş iletişimi: paydaş, bilgilendir'],
          'Önce talebin gerçekten acil olup olmadığını ve etkisini değerlendiririm. Gerçekten acilse ekiple konuşup sprintten eşdeğer büyüklükte bir işi çıkarırım. Değişikliği ve gerekçesini paydaşlara şeffafça bildiririm.'),
      ]],
    ]),
    track('ux', 'UX/UI Tasarım', 'color-palette', 'Araştırma, akış tasarımı, kullanılabilirlik', [
      ['Araştırma', 'Junior', [
        q('teknik', 'Kullanıcı araştırması yöntemlerinden bildiklerini anlatır mısın?',
          ['Görüşme: görüşme, mülakat', 'Kullanılabilirlik testi: kullanılabilirlik, usability, test', 'Anket: anket', 'Analitik: analitik, veri, ısı haritası'],
          'Nitel tarafta kullanıcı görüşmeleri ve kullanılabilirlik testleri ile “neden”i anlarım. Nicel tarafta anketler ve ürün analitiği, ısı haritalarıyla “ne kadar”ı ölçerim. Soruya göre yöntemi seçerim.'),
        q('vaka', 'Bir tasarım kararını ikna olmayan bir paydaşa nasıl savunursun?',
          ['Kullanıcı verisi: kullanıcı, veri, araştırma', 'İş hedefi: hedef, iş, metrik', 'Alternatifler: alternatif, seçenek', 'Test önerisi: test, a/b'],
          'Kararı kullanıcı araştırmasından gelen bulgulara ve iş hedefine bağlarım. Değerlendirdiğim alternatifleri ve neden elendiklerini gösteririm. Anlaşamazsak iki seçeneği A/B testi ile denemeyi öneririm.'),
      ]],
      ['Akış İyileştirme', 'Mid', [
        q('vaka', 'Bir uygulamanın kayıt akışında terk oranı yüksek. Nasıl iyileştirirsin?',
          ['Huni analizi: huni, adım, nerede', 'Adım azaltma: azalt, kısalt, sosyal giriş', 'Kullanıcı testi: test, gözlem', 'Ölçüm: ölç, oran'],
          'Önce huni analiziyle kullanıcıların hangi adımda çıktığını bulurum. Birkaç kullanıcıyı gözlemleyerek nedenini anlarım. Gereksiz alanları kaldırır, sosyal giriş ekler, adımları kısaltırım; değişikliğin etkisini tamamlama oranıyla ölçerim.'),
      ]],
    ]),
  ],
};

export const pazarlama: Profession = {
  id: 'pazarlama',
  name: 'Pazarlama',
  icon: 'megaphone',
  color: '#D9437A',
  tagline: 'Performans, içerik, SEO',
  tracks: [
    track('performans', 'Dijital / Performans', 'trending-up', 'Reklam, dönüşüm, bütçe', [
      ['Temeller', 'Junior', [
        q('teknik', 'Bir dijital kampanyanın başarısını hangi metriklerle ölçersin?',
          ['Dönüşüm: dönüşüm, conversion', 'Maliyet: cac, cpa, maliyet, cpc', 'Getiri: roas, roi, getiri', 'Hedefe göre seçim: hedef, amaç, farkındalık'],
          'Önce kampanya hedefini netleştiririm: farkındalık mı, satış mı. Satış hedefinde dönüşüm oranı, edinim maliyeti (CAC/CPA) ve ROAS’a; farkındalıkta erişim ve hatırlanırlığa bakarım.'),
      ]],
      ['Kampanya Vakaları', 'Mid', [
        q('vaka', '50.000 TL bütçeyle yeni bir kahve markasını nasıl tanıtırsın?',
          ['Hedef kitle: hedef kitle, persona, kitle', 'Kanal seçimi: instagram, tiktok, kanal, influencer', 'Bütçe dağılımı: bütçe, dağıt, %', 'Ölçüm: ölç, metrik, test'],
          'Hedef kitleyi 20–35 yaş şehirli kahve severler olarak tanımlarım. Bütçenin %50’sini mikro influencer’lara, %30’unu Instagram/TikTok reklamlarına, %20’sini deneme etkinliklerine ayırırım. İlk iki haftada kreatifleri test eder, bütçeyi edinim maliyetine göre kaydırırım.'),
        q('vaka', 'Kampanyanın ROAS değeri iki haftada yarıya düştü. Ne yaparsın?',
          ['Kırılım analizi: kampanya, kanal, kreatif, kırılım', 'Kreatif yorgunluğu: kreatif, yorgun, frekans', 'Hedefleme: hedef kitle, hedefleme', 'Ölçüm sorunu: takip, pixel, attribution, ölçüm'],
          'Önce ölçümün doğru çalıştığını (pixel, attribution) kontrol ederim. Sonra kanal, kampanya ve kreatif kırılımında düşüşün nerede olduğuna bakarım. Frekans yüksekse kreatif yorgunluğu vardır, yeni kreatifler ve hedefleme testleri başlatırım.'),
      ]],
    ]),
    track('icerik', 'İçerik & Sosyal Medya', 'chatbubbles', 'İçerik planı, topluluk, kriz', [
      ['İçerik Planlama', 'Junior', [
        q('vaka', 'Bir markanın sosyal medya içerik takvimini nasıl planlarsın?',
          ['Hedef / kitle: hedef, kitle', 'İçerik sütunları: sütun, tema, kategori', 'Sıklık / platform: sıklık, platform, haftada', 'Ölçüm: etkileşim, erişim, ölç'],
          'Önce hedefi ve kitleyi belirlerim. Eğitici, eğlendirici ve ürün odaklı gibi 3–4 içerik sütunu oluştururum. Her platform için haftalık paylaşım sıklığı belirler, etkileşim ve erişime göre takvimi her ay güncellerim.'),
      ]],
      ['Topluluk & Kriz', 'Mid', [
        q('vaka', 'Bir paylaşım yanlış anlaşıldı ve tepki çekiyor. Ne yaparsın?',
          ['Hızlı yanıt: hızlı, hemen', 'Dinleme / analiz: anla, dinle, analiz', 'Özür / şeffaflık: özür, şeffaf, açıklama', 'Süreç iyileştirme: süreç, onay, ders'],
          'Hızlıca durumu ve tepkinin nedenini analiz ederim. Gerekirse paylaşımı kaldırıp samimi ve şeffaf bir açıklama veya özür yayımlarım. Sonrasında benzer hatayı önlemek için içerik onay sürecini gözden geçiririm.'),
      ]],
    ]),
    track('seo', 'SEO', 'search', 'Arama motoru optimizasyonu', [
      ['SEO Temelleri', 'Junior', [
        q('teknik', 'SEO’nun teknik, içerik ve otorite (backlink) taraflarını açıklar mısın?',
          ['Teknik SEO: hız, site haritası, indeks, teknik', 'İçerik: anahtar kelime, içerik, niyet', 'Otorite: backlink, bağlantı, otorite', 'Ölçüm: search console, sıralama, trafik'],
          'Teknik tarafta site hızı, site haritası ve indekslenebilirlik; içerikte arama niyetine uygun, anahtar kelimeleri doğal kullanan sayfalar; otoritede güvenilir sitelerden gelen backlinkler önemlidir. Sonuçları Search Console ve organik trafikle ölçerim.'),
      ]],
      ['SEO Vakaları', 'Mid', [
        q('vaka', 'Organik trafik aniden %30 düştü. Nasıl incelersin?',
          ['Algoritma güncellemesi: algoritma, güncelleme', 'Teknik hata: robots, noindex, indeks, teknik', 'Sayfa bazlı analiz: sayfa, kırılım, sorgu', 'Rakip: rakip'],
          'Önce bir Google algoritma güncellemesiyle çakışıp çakışmadığına bakarım. Robots.txt, noindex veya yönlendirme gibi teknik hataları kontrol ederim. Search Console’da hangi sayfa ve sorguların düştüğünü bulur, rakiplerin o sorgulardaki durumunu incelerim.'),
      ]],
    ]),
  ],
};

export const satis: Profession = {
  id: 'satis',
  name: 'Satış',
  icon: 'briefcase',
  color: '#2F7FE0',
  tagline: 'B2B, perakende, müşteri yönetimi',
  tracks: [
    track('b2b', 'B2B Satış', 'business', 'Kurumsal satış, pipeline, pazarlık', [
      ['Satış Temelleri', 'Junior', [
        q('vaka', 'Bana bu kalemi sat.',
          ['İhtiyacı sorma: soru, ihtiyaç, ne için, nasıl kullan', 'Fayda odaklılık: fayda, sağlar, kolay', 'İtiraz karşılama: itiraz, pahalı, fiyat', 'Kapanış: kapanış, satın, deneyin, teklif'],
          'Önce soru sorarım: Kalemi en çok ne için kullanıyorsunuz? Cevaba göre faydayı anlatırım. Fiyat itirazını kullanım süresiyle karşılar, bugün almasını sağlayacak net bir teklifle kapatırım.'),
      ]],
      ['Pazarlık & Pipeline', 'Mid', [
        q('vaka', 'Müşteri “Rakibiniz %20 daha ucuz” diyor. Ne cevap verirsin?',
          ['Anlama: soru, anla, neye göre', 'Değer vurgusu: değer, kalite, destek, toplam maliyet', 'Karşılıklı takas: karşılığında, uzun vade, paket'],
          'Önce karşılaştırmanın neyi kapsadığını sorarım. Toplam sahip olma maliyetini, destek ve kaliteyi somut rakamlarla gösteririm. İndirim gerekiyorsa karşılığında uzun vadeli sözleşme gibi bir takas isterim.'),
        q('teknik', 'Satış hunini (pipeline) nasıl yönetirsin?',
          ['Aşamalar: aşama, huni', 'Nitelendirme: nitelendir, bütçe, karar verici', 'CRM: crm, kayıt', 'Dönüşüm oranları: oran, dönüşüm, tahmin'],
          'Fırsatları net aşamalarda takip ederim. Her fırsatı bütçe, karar verici, ihtiyaç ve zamanlamaya göre nitelendiririm. Her şeyi CRM’e kaydeder, aşamalar arası dönüşüm oranlarıyla satış tahmini yaparım.'),
      ]],
    ]),
    track('perakende', 'Perakende Satış', 'storefront', 'Mağaza, müşteri deneyimi', [
      ['Müşteri Karşılama', 'Junior', [
        q('vaka', 'Mağazaya giren bir müşteriye nasıl yaklaşırsın?',
          ['Karşılama: karşıla, selam, gülümse', 'İhtiyacı sorma: soru, ihtiyaç', 'Ürün önerisi: öner, ürün', 'Ek satış: ek, tamamlayıcı, çapraz'],
          'Güler yüzle karşılar, baskı yapmadan alan tanırım. Açık uçlu sorularla ne aradığını anlar, ihtiyacına uygun ürünü öneririm. Uygunsa tamamlayıcı bir ürünle ek satış yaparım.'),
      ]],
      ['Zor Müşteriler', 'Mid', [
        q('vaka', 'Sinirli bir müşteri ürünü iade etmek istiyor ama iade süresi geçmiş. Ne yaparsın?',
          ['Sakin dinleme: dinle, sakin, empati', 'Politikayı açıklama: politika, kural, süre', 'Alternatif çözüm: alternatif, değişim, puan, yönetici', 'Müşteriyi kazanma: memnun, tekrar gel'],
          'Önce sakin şekilde dinler, empati kurarım. İade politikasını kibarca açıklarım. Değişim, mağaza puanı veya yöneticiyle istisna gibi alternatifler sunarak müşteriyi kaybetmemeye çalışırım.'),
      ]],
    ]),
    track('musteri', 'Müşteri / Hesap Yönetimi', 'headset', 'Memnuniyet, yenileme, büyüme', [
      ['Müşteri Memnuniyeti', 'Junior', [
        q('teknik', 'Müşteri memnuniyetini nasıl ölçersin?',
          ['NPS: nps', 'CSAT: csat, memnuniyet anketi, anket', 'Geri bildirim: geri bildirim, yorum', 'Tekrar alım / kayıp: tekrar, churn, yenileme'],
          'NPS ile tavsiye etme eğilimini, CSAT ile belirli bir etkileşimden memnuniyeti ölçerim. Açık uçlu geri bildirimleri düzenli okurum. Asıl sonuç göstergesi olarak yenileme ve kayıp (churn) oranını takip ederim.'),
      ]],
      ['Hesap Kurtarma', 'Mid', [
        q('vaka', 'Büyük bir müşteri sözleşmeyi yenilemeyeceğini söylüyor. Ne yaparsın?',
          ['Nedeni anlama: neden, anla, dinle', 'Değeri gösterme: değer, kazanç, rapor', 'Çözüm planı: plan, çözüm, aksiyon', 'Üst yönetim desteği: yönetici, üst'],
          'Önce gerçek nedeni anlamak için dinlerim. Şimdiye kadar sağladığımız değeri rakamlarla gösteren bir rapor hazırlarım. Sorunlara somut bir aksiyon planı sunar, gerekirse üst yönetimi de görüşmeye dahil ederim.'),
      ]],
    ]),
  ],
};

export const finans: Profession = {
  id: 'finans',
  name: 'Finans',
  icon: 'wallet',
  color: '#7A8B1E',
  tagline: 'Muhasebe, finansal analiz, denetim',
  tracks: [
    track('muhasebe', 'Muhasebe', 'calculator', 'Finansal tablolar, kapanış', [
      ['Finansal Tablolar', 'Junior', [
        q('teknik', 'Üç temel finansal tabloyu ve birbirleriyle ilişkisini açıklar mısın?',
          ['Gelir tablosu: gelir tablo, kar, zarar', 'Bilanço: bilanço, varlık, yükümlülük, özkaynak', 'Nakit akış tablosu: nakit akış', 'Tablolar arası bağlantı: net kar, bağlan, aktar'],
          'Gelir tablosu dönemin gelir, gider ve net kârını gösterir. Bilanço belirli bir andaki varlık, yükümlülük ve özkaynağı gösterir. Nakit akış tablosu nakdin nasıl değiştiğini gösterir. Net kâr özkaynağa aktarılır ve nakit akışın başlangıç noktasıdır.'),
      ]],
      ['Kapanış', 'Mid', [
        q('vaka', 'Ay sonu kapanış sürecinde neler yaparsın?',
          ['Mutabakat: mutabakat, banka', 'Tahakkuk / karşılık: tahakkuk, karşılık', 'Kontrol: kontrol, doğrula', 'Raporlama: rapor'],
          'Banka ve cari hesap mutabakatlarını yaparım. Dönem tahakkuklarını ve karşılıkları kaydederim. Mizanı ve olağandışı hareketleri kontrol eder, ardından yönetim raporlarını hazırlarım.'),
      ]],
    ]),
    track('fin-analiz', 'Finansal Analiz', 'stats-chart', 'Nakit, değerleme, modelleme', [
      ['Analiz Temelleri', 'Junior', [
        q('vaka', 'Kârlı görünen bir şirket neden nakit sıkıntısı yaşayabilir?',
          ['Alacaklar: alacak, vade, tahsil', 'Stok: stok', 'Yatırım harcaması: yatırım, capex', 'Tahakkuk ve nakit farkı: tahakkuk, nakit, fark'],
          'Kâr tahakkuk esasına göre hesaplanır, nakit ise tahsil edildiğinde girer. Uzun vadeli alacaklar, artan stok veya büyük yatırım harcamaları kâr varken nakdi tüketebilir. Bu yüzden işletme sermayesini izlerim.'),
      ]],
      ['Değerleme', 'Mid', [
        q('teknik', 'Bir şirketi değerlemek için hangi yöntemleri kullanırsın?',
          ['İndirgenmiş nakit akışı: dcf, indirgenmiş nakit', 'Çarpanlar: çarpan, f/k, fd/favök, multiple', 'Varsayımlar: varsayım, büyüme, iskonto', 'Duyarlılık analizi: duyarlılık, senaryo'],
          'Gelecekteki nakit akışlarını iskonto oranıyla bugüne indiren DCF yöntemini ve benzer şirketlerin F/K, FD/FAVÖK gibi çarpanlarını birlikte kullanırım. Büyüme ve iskonto varsayımlarına duyarlılık analizi yaparak bir değer aralığı sunarım.'),
      ]],
    ]),
    track('denetim', 'Denetim', 'shield-checkmark', 'İç kontrol, risk, uyum', [
      ['İç Kontrol', 'Junior', [
        q('teknik', 'İç kontrol nedir, neden önemlidir?',
          ['Görevler ayrılığı: görevler ayrılığı, ayrı kişi', 'Yetki / onay: onay, yetki', 'Risk: risk, hata, suistimal', 'Örnek: örneğin'],
          'İç kontrol, hataları ve suistimali önlemek için kurulan süreçlerdir. Örneğin ödemeyi hazırlayan ile onaylayan kişinin ayrı olması (görevler ayrılığı) ve belirli tutarların üzerinde onay şartı. Finansal raporların güvenilirliğini sağlar.'),
      ]],
      ['Denetim Vakası', 'Mid', [
        q('vaka', 'Bir masraf kaleminde olağandışı bir artış fark ettin. Nasıl incelersin?',
          ['Analitik inceleme: trend, karşılaştır, analitik', 'Belge kontrolü: belge, fatura, örneklem', 'Görüşme: görüş, sor', 'Raporlama: rapor, bulgu'],
          'Önce artışı önceki dönemler ve bütçeyle karşılaştırırım. Örneklem seçip fatura ve onay belgelerini kontrol ederim. İlgili birimle görüşüp açıklama alırım, bulguları ve önerileri raporlarım.'),
      ]],
    ]),
  ],
};

export const ik: Profession = {
  id: 'ik',
  name: 'İnsan Kaynakları',
  icon: 'people',
  color: '#9B51E0',
  tagline: 'İşe alım, çalışan deneyimi',
  tracks: [
    track('ise-alim', 'İşe Alım', 'person-add', 'Aday bulma, mülakat, teklif', [
      ['İşe Alım Temelleri', 'Junior', [
        q('vaka', 'Bulunması zor bir pozisyon için adayları nasıl bulursun?',
          ['Pozisyonu netleştirme: ihtiyaç, yönetici, profil, gereksinim', 'Kanallar: linkedin, kariyer, kanal, ilan', 'Doğrudan ulaşma: doğrudan, sourcing, mesaj', 'Referans: referans, tavsiye'],
          'Önce işe alım yöneticisiyle profili ve olmazsa olmazları netleştiririm. İlanın yanında LinkedIn’de doğrudan arama yapar, kişiselleştirilmiş mesajlarla adaylara ulaşırım. Çalışan referans programını ve sektörel toplulukları da kullanırım.'),
        q('teknik', 'Yetkinlik bazlı mülakat nedir?',
          ['Yetkinlik tanımı: yetkinlik, beceri', 'Geçmiş davranış: geçmiş, örnek, deneyim', 'Yapılandırılmış sorular: yapılandırılmış, aynı soru, standart', 'Puanlama: puan, değerlendirme, ölçek'],
          'Pozisyon için kritik yetkinlikleri belirleyip her biri için adaya geçmişte yaşadığı somut örnekleri soran yapılandırılmış bir mülakattır. Tüm adaylara aynı sorular sorulur ve cevaplar ortak bir ölçekle puanlanır; bu önyargıyı azaltır.'),
      ]],
      ['Teklif & Aday Deneyimi', 'Mid', [
        q('vaka', 'Çok istediğiniz bir aday teklifi reddetti. Ne yaparsın?',
          ['Nedeni anlama: neden, anla, sor', 'Pazarlık alanı: maaş, yan hak, esnek, uzaktan', 'Yöneticiyle konuşma: yönetici, bütçe', 'İlişkiyi koruma: ilişki, iletişim, gelecek'],
          'Önce reddin gerçek nedenini anlamak için adayla konuşurum. Maaş dışında esnek çalışma, yan haklar gibi pazarlık alanı varsa yöneticiyle değerlendiririm. Sonuç değişmese de ilişkiyi iyi tutarım, gelecekte yine aday olabilir.'),
      ]],
    ]),
    track('ik-is-ortagi', 'İK İş Ortağı', 'people-circle', 'Çalışan ilişkileri, performans, bağlılık', [
      ['Çalışan İlişkileri', 'Junior', [
        q('vaka', 'Bir çalışan yöneticisinden şikâyetçi olarak sana geldi. Nasıl ilerlersin?',
          ['Dinleme / gizlilik: dinle, gizli, güven', 'Bilgi toplama: bilgi, belge, örnek', 'Tarafsızlık: tarafsız, iki taraf, yönetici', 'Takip: takip, aksiyon, çözüm'],
          'Çalışanı gizlilik çerçevesinde dikkatle dinler, somut örnekleri not ederim. Tarafsız kalarak yöneticinin de görüşünü alırım. Bir çözüm planı oluşturur ve sonrasında durumu takip ederim.'),
      ]],
      ['Bağlılık & Performans', 'Mid', [
        q('vaka', 'Bir ekipte çalışan devir oranı (turnover) çok yükseldi. Nasıl analiz edersin?',
          ['Veri analizi: veri, oran, kırılım', 'Çıkış görüşmeleri: çıkış görüşme, neden', 'Yönetici etkisi: yönetici, liderlik', 'Aksiyon planı: aksiyon, plan, maaş, kariyer'],
          'Önce devir oranını kıdem ve rol kırılımlarıyla incelerim. Çıkış görüşmelerinden ortak nedenleri çıkarırım; çoğu zaman yönetici ilişkisi, ücret veya kariyer gelişimi öne çıkar. Bulgulara göre yöneticiyle birlikte somut bir aksiyon planı hazırlarım.'),
      ]],
    ]),
  ],
};
