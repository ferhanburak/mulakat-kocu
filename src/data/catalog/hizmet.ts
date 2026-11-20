import { q, track, type Profession } from '../build';

export const bankacilik: Profession = {
  id: 'bankacilik',
  name: 'Bankacılık',
  icon: 'card',
  color: '#1F6FB2',
  tagline: 'MT programları, kredi, müşteri temsilciliği',
  tracks: [
    track('banka-mt', 'Yönetici Adayı (MT)', 'trending-up', 'MT mülakatları, ekonomi gündemi, vaka', [
      ['Temeller', 'Junior', [
        q('teknik', 'Merkez bankası faiz artırdığında ekonomide ve bankacılıkta neler olur?',
          ['Kredi maliyeti: kredi, faiz, pahalı', 'Talep / enflasyon: talep, enflasyon, tüketim', 'Mevduat: mevduat, tasarruf', 'Kur etkisi: kur, döviz, sermaye girişi', 'Banka kârlılığı: marj, net faiz, kârlılık'],
          'Politika faizi artınca kredi maliyetleri yükselir ve kredi talebi azalır; bu da tüketimi yavaşlatıp enflasyonu düşürmeyi hedefler. Mevduat faizleri yükseldiği için tasarruf cazip hale gelir. Yabancı sermaye girişiyle kur üzerinde baskı azalabilir. Bankalar açısından net faiz marjı, mevduat ve kredi fiyatlamasının ne kadar hızlı uyarlandığına bağlı olarak değişir.', ['Ters etki: daha çok para girer; harcamalar hızlanır; ekonomi canlanır; büyümeyi destekler']),
        q('teknik', 'Bir bankanın bilançosunda temel kalemler nelerdir?',
          ['Krediler: kredi, loan', 'Mevduat: mevduat, deposit', 'Özkaynak: özkaynak, sermaye', 'Menkul kıymetler / likidite: menkul, likidite, nakit', 'Sermaye yeterliliği: sermaye yeterlilik, risk'],
          'Aktif tarafta en büyük kalem kredilerdir; ayrıca menkul kıymetler ve likit varlıklar bulunur. Pasif tarafta en büyük kaynak mevduattır; diğer fonlama kaynakları ve özkaynak da yer alır. Özkaynağın riskli varlıklara oranı sermaye yeterliliğini gösterir.', ['Aktif ve pasif karışıklığı: mevduat ... aktifte; kredi ... pasifte']),
      ]],
      ['Vaka & Grup', 'Mid', [
        q('vaka', 'Bir şube, bölgedeki rakiplerine göre daha az kredi kullandırıyor. Nedenini nasıl analiz edersin?',
          ['Veri karşılaştırma: veri, karşılaştır, pazar payı, data, kıyas, benchmark, rakip, rakam', 'Müşteri segmenti: segment, kobi, bireysel, esnaf, ticari', 'Süreç / onay süresi: onay süresi, süreç, hız', 'Fiyatlama: faiz, fiyat, pricing', 'Aksiyon planı: aksiyon, kampanya, ziyaret'],
          'Önce şubenin kredi hacmini, müşteri sayısını ve pazar payını bölge ve rakiplerle karşılaştırırım. Ürün ve müşteri segmenti kırılımında farkın nerede olduğuna bakarım. Onay süreleri ve fiyatlama gibi nedenleri ayırırım. Bulgulara göre hedefli müşteri ziyaretleri ve süreç iyileştirmeleriyle bir aksiyon planı öneririm.', ['Az krediyi iyi saymak: az kredi vermek her zaman iyidir; analiz etmeye gerek yok']),
      ]],
      ['Strateji', 'Senior', [
        q('vaka', 'Bir bankanın dijital kanallara geçişinde şube ağının rolü ne olmalı?',
          ['Müşteri segmentleri: segment', 'Dijital işlemler: dijital, mobil', 'Danışmanlık merkezi: danışman, karmaşık', 'Maliyet ve verimlilik: maliyet, verimlilik', 'Çalışan dönüşümü: çalışan, yetkinlik, personel, eğitil, eğitim'],
          'Basit işlemler mobil ve dijital kanallara kaydıkça şubenin rolü değişmeli. Müşterileri segmentlere ayırıp hangi grubun şubeye gerçekten ihtiyaç duyduğuna bakarım. Şubeler kredi, yatırım ve KOBİ finansmanı gibi karmaşık ihtiyaçlar için bir danışmanlık merkezine dönüşmeli. Şube sayısı ve formatı maliyet ve verimlilik verisine göre yeniden planlanmalı. Bu dönüşüm için çalışanların danışmanlık yetkinliğini artıran eğitimler şart.', ['Şubeleri tamamen kapatmak: bütün şubeleri; hiç gerek yok']),
      ]],
    ]),
    track('banka-kredi', 'Kredi Analisti', 'analytics', 'Kredi değerlendirme, risk, teminat', [
      ['Kredi Değerlendirme', 'Junior', [
        q('teknik', 'Bir firmaya kredi verirken nelere bakarsın?',
          ['Finansal tablolar: bilanço, gelir tablosu, nakit akış', 'Geri ödeme gücü: geri ödeme, nakit, borç servis', 'Kaldıraç / oranlar: borç, oran, kaldıraç, likidite', 'Teminat: teminat, ipotek, kefalet', 'Sektör / yönetim: sektör, yönetim, istihbarat'],
          'Önce finansal tablolarla firmanın kârlılığını, borçluluğunu ve likiditesini incelerim. En önemli soru, nakit akışının krediyi geri ödemeye yetip yetmediğidir. Sektör riskini, ortakların ve yönetimin geçmişini ve istihbarat bilgisini değerlendiririm. Teminat ikincil bir güvencedir, kredi kararının temeli olmamalıdır.', ['Sadece teminata bakmak: teminat yeterliyse; her zaman güvenli; bakmaya gerek yok']),
      ]],
      ['Risk Vakası', 'Mid', [
        q('vaka', 'Kredi kullandırdığın bir firmanın ödemeleri gecikmeye başladı. Ne yaparsın?',
          ['Erken uyarı: erken uyarı, gecikme, takip, gecik, early warning', 'Müşteriyle görüşme: görüş, neden, ziyaret', 'Yapılandırma: yapılandır, vade, plan, restructur, ödemesiz', 'Teminat / hukuki süreç: teminat, hukuk, icra, legal'],
          'Erken uyarı sinyalini ciddiye alıp firmayla hemen görüşür, gecikmenin geçici mi kalıcı mı olduğunu anlamaya çalışırım. Güncel finansalları ve nakit akışını incelerim. Sorun geçiciyse uygun bir yeniden yapılandırma planı öneririm. Kalıcıysa teminatları gözden geçirir ve gerekirse hukuki takip sürecini başlatırım.', ['Konuşmadan icraya gitmek: hemen icra; konuşmaya gerek yok']),
      ]],
      ['Portföy Riski', 'Senior', [
        q('vaka', 'Kredi portföyünde tek bir sektöre yoğunlaşma riski gördün. Ne önerirsin?',
          ['Yoğunlaşma analizi: yoğunlaş, pay, concentration, üçte bir, ağırlı', 'Stres testi: stres test, senaryo', 'Limit politikası: limit, üst sınır, sınır, durdur, kısıtla', 'Fiyatlama ve teminat: fiyatla, teminat', 'Komiteye raporlama: komite, rapor'],
          'Önce o sektörün portföy içindeki payını ve en büyük müşterilerdeki yoğunlaşmayı ölçerim. Sektörde talep düşüşü gibi bir senaryoyla stres testi yapıp olası kaybı hesaplarım. Sektör için bir limit önerir, yeni kredilerin farklı sektörlere yönelmesini sağlarım. Riskli sektördeki kredileri daha sıkı fiyatlar ve teminat koşullarını güçlendiririm. Bulguları ve aksiyon planını kredi komitesine bir raporla sunarım.', ['Yoğunlaşmayı iyi saymak: yoğunlaşmak aslında iyidir; tersine azalır']),
      ]],
    ]),
    track('banka-musteri', 'Müşteri Temsilcisi', 'people', 'Şube, satış, müşteri ilişkisi', [
      ['Şube Temelleri', 'Junior', [
        q('vaka', 'Şubeye gelen bir müşteriye yeni bir kredi kartı nasıl önerirsin?',
          ['İhtiyacı anlama: ihtiyaç, soru, alışkanlık, sohbet', 'Uygun ürün: uygun, avantaj, kampanya, puan, öne çıkar', 'Şeffaflık: ücret, faiz, şeffaf, aidat', 'Rıza / baskısız: zorlamadan, baskı, ısrar etmem, kararı ona, kararı müşteri'],
          'Önce müşterinin harcama alışkanlıklarını ve ihtiyacını sorular sorarak anlarım. Ona uygun avantajları, örneğin taksit ya da puan kampanyalarını öne çıkarırım. Yıllık ücret ve faiz gibi maliyetleri şeffaf şekilde açıklarım. Kararı müşteriye bırakır, baskı yapmam.', ['Maliyeti gizlemek: tamamen ücretsiz; aidatı sonra; satışı kapatmak']),
      ]],
      ['Zor Durumlar', 'Mid', [
        q('vaka', 'Kartından izinsiz işlem yapıldığını söyleyen sinirli bir müşteri geldi. Ne yaparsın?',
          ['Sakin karşılama: sakin, empati, dinle', 'Kartı bloke etme: bloke, kapat, iptal', 'İtiraz süreci: itiraz, chargeback, kayıt', 'Bilgilendirme: süre, bilgilendir, takip'],
          'Müşteriyi sakin şekilde dinler ve endişesini anladığımı gösteririm. Önce kartı hemen bloke ederek yeni işlemleri durdururum. Şüpheli işlemler için itiraz kaydını oluşturur, sürecin ne kadar süreceğini ve sonraki adımları açıkça anlatırım. Müşteriyi süreç boyunca bilgilendiririm.', ['Müşteriyi suçlamak: kendisi yapmıştır; itiraz kabul edilmez']),
      ]],
      ['Şube Liderliği', 'Senior', [
        q('davranissal', 'Ekibindeki müşteri temsilcilerinin satış hedeflerini, müşteri memnuniyetinden ödün vermeden nasıl yükseltirsin?',
          ['Hedef dengesi: memnuniyet, denge, sadece satış', 'İhtiyaç bazlı satış: ihtiyaç, needs, müşteriyi dinle', 'Koçluk: koçluk, gözlem, geri bildirim', 'Ölçüm: nps, şikayet', 'Takdir: takdir, prim, ödül'],
          'Önceki şubemde hedefler artınca şikayetler de artmıştı; amacım satış ve memnuniyet arasında denge kurmaktı. Ekiple ürün değil müşteri ihtiyacı odaklı bir satış görüşmesi akışı kurdum. Her temsilcinin görüşmelerini gözlemleyip birebir koçluk ve geri bildirim verdim. Hedef karnesine satışın yanında NPS ve şikayet sayısını da ekledim. Sonuçta satışlar %15 arttı, şikayetler azaldı; başarıları ekip toplantılarında takdir ettim.', ['Memnuniyeti ikinci plana atmak: her ürünü sat; memnuniyeti satıştan sonra']),
      ]],
    ]),
  ],
};

export const havacilik: Profession = {
  id: 'havacilik',
  name: 'Havacılık & Turizm',
  icon: 'airplane',
  color: '#C8102E',
  tagline: 'Kabin, pilot adaylığı, otelcilik',
  tracks: [
    track('kabin', 'Kabin Memuru', 'airplane', 'Misafir deneyimi, emniyet, takım', [
      ['Temeller', 'Junior', [
        q('vaka', 'Neden kabin memuru olmak istiyorsunuz?',
          ['Misafir odaklılık: misafir, yolcu, hizmet', 'Emniyet bilinci: emniyet, güvenlik', 'Kişisel uyum: insan, iletişim, takım, esnek, seyahat', 'Somut örnek: örneğin, deneyim'],
          'İnsanlarla iletişim kurmayı ve onlara iyi bir deneyim yaşatmayı seviyorum; örneğin önceki işimde müşteri memnuniyetinde ödül aldım. Kabin memurluğunun sadece hizmet değil, öncelikle yolcuların emniyetinden sorumlu olmak olduğunun farkındayım. Düzensiz çalışma saatlerine ve takım çalışmasına uyumlu biriyim.', ['İşi servis sanmak: sadece yemek; sadece servis']),
        q('vaka', 'Uçuşta bir yolcu emniyet kemerini takmayı reddediyor. Ne yaparsın?',
          ['Kibar uyarı: kibar, nazik, açıkla, gülümse, uyar', 'Gerekçe: emniyet, kural, türbülans, güvenlik, regülasyon, zorunlu', 'Kademeli yaklaşım: tekrar, kıdemli, kaptan, purser, captain, amir', 'Diğer yolcular: diğer yolcu, sakin, etraf'],
          'Önce yolcuya kibarca kemerin neden zorunlu olduğunu, emniyeti için olduğunu açıklarım. Israr ederse sakin tonumu koruyarak kuralı tekrar hatırlatırım. Yine reddederse durumu kıdemli kabin amirine bildiririm, gerekirse kaptan bilgilendirilir. Bu sırada diğer yolcuları rahatsız etmemeye dikkat ederim.', ['Kemer kuralını hafife almak: sadece kalkış; uçuş boyunca önemli değil']),
      ]],
      ['Kriz Durumları', 'Mid', [
        q('vaka', 'Uçuşta bir yolcu fenalaşıyor. Nasıl hareket edersin?',
          ['Durumu değerlendirme: değerlendir, bilinç, nefes, solunum, nabız, nabz, responsive', 'Ekibi ve kaptanı bilgilendirme: ekip, kaptan, bildir, crew, kokpit, haber ver', 'Sağlık personeli anonsu: doktor, sağlık personeli, anons', 'İlk yardım: ilk yardım, oksijen, kit', 'Kayıt: kayıt, rapor'],
          'Önce yolcunun bilinç ve solunum durumunu değerlendiririm, eğitimime uygun ilk yardımı başlatırım. Ekibimi ve kaptanı hemen bilgilendiririm. Gerekirse uçakta doktor veya sağlık personeli olup olmadığı anons edilir, oksijen ve ilk yardım kitleri kullanılır. Olayı prosedüre uygun şekilde raporlarım.', ['Müdahale etmemek: müdahale etmez; yapılacak bir şey yok']),
      ]],
      ['Kabin Amirliği', 'Senior', [
        q('davranissal', 'Kabin amiri olarak uçuş sırasında ekibindeki iki memur arasında gerginlik var. Ne yaparsın?',
          ['Emniyet önceliği: emniyet, safety, güvenlik', 'Ayrı ve sakin görüşme: ayrı, sakin, barış', 'Görev dağılımı: görev, pozisyon, yerlerini', 'Uçuş sonrası çözüm: uçuş sonrası, debrief, indikten sonra, inişten sonra', 'Raporlama: rapor'],
          'Bir uçuşta iki arkadaşımızın servis sırasında tartıştığını fark ettim. İlk önceliğim emniyet ve misafir deneyiminin etkilenmemesiydi. Her biriyle galeride ayrı ve sakin şekilde kısa bir görüşme yaptım. Gerginliği azaltmak için uçuşun geri kalanında görev dağılımını değiştirdim. Uçuş sonrası debrief toplantısında konuyu birlikte konuşup çözdük ve gerektiği için kısa bir rapor yazdım.', ['Yolcu önünde tartışmak: yolcuların önünde uyar; kimin haklı olduğunu görsün']),
      ]],
    ]),
    track('pilot', 'Pilot Adayı', 'navigate', 'Mülakat, CRM, karar verme', [
      ['Temeller', 'Junior', [
        q('teknik', 'CRM (Crew Resource Management) nedir, neden önemlidir?',
          ['Tanım: ekip kaynak yönetimi, crm', 'İletişim: iletişim, açık, sesli', 'Karar verme: karar, durumsal farkındalık', 'İnsan hatası: insan hatası, kaza'],
          'CRM, kokpitte ve kabinde ekibin tüm kaynaklarını etkin kullanmasını sağlayan bir yaklaşımdır. Açık iletişim, iş yükü paylaşımı, durumsal farkındalık ve ortak karar vermeyi kapsar. Kazaların büyük kısmında insan hatası rol oynadığı için CRM uçuş emniyetinin temel taşlarındandır.', ['CRM\'i müşteri yönetimi sanmak: müşteri ilişkileri yönetimi']),
      ]],
      ['Karar Verme', 'Mid', [
        q('vaka', 'Kaptan pilotun yanlış bir karar verdiğini düşünüyorsun. Ne yaparsın?',
          ['Açık ifade: söyle, ifade, sesli, dile getir', 'Saygılı ama net: saygı, net', 'Bilgiye dayanma: veri, gösterge, prosedür, checklist, talimat, atc', 'Kademelendirme: tekrar, ısrar, emniyet'],
          'Endişemi saygılı ama net bir şekilde, gördüğüm göstergelere ve prosedüre dayanarak dile getiririm. Kaptan yanıt vermezse daha doğrudan bir ifadeyle tekrar ederim. Emniyet doğrudan tehlikedeyse CRM ilkelerine göre ısrarcı olurum; hiyerarşi emniyetin önüne geçmemelidir.', ['Sessiz kalmak: kaptan her zaman haklıdır; sessiz kalırım; hiyerarşiye aykırı']),
      ]],
      ['Kaptanlık & CRM', 'Senior', [
        q('davranissal', 'Kaptan olarak yardımcı pilotun bir hatanı söylemekten çekindiğini fark ettin. Ne yaparsın?',
          ['Açık iletişim kültürü: açık, cesaret, çekinme', 'Brifing: brifing, briefing, debrief', 'CRM ilkeleri: crm', 'Geri bildirim: geri bildirim, feedback, teşekkür', 'Örnek olma: hatamı kabul, hatamı, hatalarımı'],
          'Bir uçuşta yardımcı pilotun bir sapmamı fark edip geç söylediğini gördüm. Sonraki uçuşlarda brifing sırasında her şeyi sesli söylemesini açıkça istedim ve bunun için ona cesaret verdim. CRM ilkelerine göre kokpitte hiyerarşi emniyetin önüne geçmemeli. Uçuş sonrası ona dürüst bir geri bildirim verip onun da bana geri bildirim vermesini istedim. Hatamı kabul ederek örnek oldum; sonraki uçuşlarda iletişimimiz çok daha açıktı.', ['Hatayı inkâr: hata yapmam zaten; düzeltmesine gerek yok']),
      ]],
    ]),
    track('otel', 'Otelcilik & Ön Büro', 'bed', 'Misafir ilişkileri, operasyon', [
      ['Misafir İlişkileri', 'Junior', [
        q('vaka', 'Rezervasyonu olmasına rağmen oda bulunamayan bir misafirle nasıl ilgilenirsin?',
          ['Özür ve sahiplenme: özür, sorumluluk', 'Hızlı çözüm: alternatif, yükseltme, upgrade, başka otel, kardeş otel, yakındaki, partner otel', 'Telafi: telafi, ikram, indirim, compensation, ücretsiz, kupon', 'Takip: takip, yönetici, follow, müdür'],
          'Önce içtenlikle özür diler ve sorunu sahiplenirim. Hemen alternatif sunarım: üst kategori oda, mümkün değilse anlaşmalı yakın bir otel ve ulaşım. Yaşanan aksaklık için ikram veya indirim gibi bir telafi öneririm. Misafiri yöneticiyle birlikte takip eder, memnun ayrılmasını sağlarım.', ['Suçu misafire atmak: sorunun onun acentesinde; başka yere gitmesini']),
      ]],
      ['Operasyon', 'Mid', [
        q('vaka', 'Misafir yorumlarında temizlik puanı düşüyor. Ne yaparsın?',
          ['Veri analizi: yorum, puan, analiz, review, kategori', 'Kök neden: kök neden, personel, süre, kontrol', 'Departmanla iş birliği: kat hizmetleri, ekip, housekeeping', 'İzleme: kontrol listesi, takip, ölç'],
          'Önce yorumları analiz edip şikâyetlerin hangi odalarda ve konularda yoğunlaştığına bakarım. Kat hizmetleri ekibiyle kök nedenleri, örneğin personel sayısı veya oda başına süreyi konuşurum. Kontrol listesi ve rastgele denetimler başlatır, puanları haftalık takip ederim.', ['Yorumları manipüle etmek: yorumları sildir; yorum yazdır']),
      ]],
      ['Otel Yönetimi', 'Senior', [
        q('vaka', 'Otelin misafir değerlendirme puanı son aylarda düşüyor. Nasıl bir eylem planı yaparsın?',
          ['Yorum analizi: yorum, tema', 'Kök neden: departman, kök neden, resepsiyon, check-in, kahvaltı, temizlik', 'Personel eğitimi: personel, eğitim, training', 'Hızlı iyileştirme: hızlı, quick win, hemen', 'Yanıt ve takip: yanıt, takip, cevap, izle'],
          'Önce son aylardaki yorumları okuyup tekrar eden temaları çıkarırım. Şikayetleri departman bazında ayırıp temizlik, kahvaltı ya da check-in gibi alanlarda kök nedeni bulurum. Hızlı çözülebilecek sorunlar için hemen aksiyon alır, sorunlu departmanlarda personel eğitimi planlarım. Olumsuz yorumlara kişisel ve çözüm odaklı yanıt veririm. Puanı haftalık takip edip ekiple sonuçları paylaşırım.', ['Sahte yorum: sahte ... yorum; yorum yazdır']),
      ]],
    ]),
  ],
};
