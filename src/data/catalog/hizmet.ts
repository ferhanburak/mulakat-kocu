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
          'Politika faizi artınca kredi maliyetleri yükselir ve kredi talebi azalır; bu da tüketimi yavaşlatıp enflasyonu düşürmeyi hedefler. Mevduat faizleri yükseldiği için tasarruf cazip hale gelir. Yabancı sermaye girişiyle kur üzerinde baskı azalabilir. Bankalar açısından net faiz marjı, mevduat ve kredi fiyatlamasının ne kadar hızlı uyarlandığına bağlı olarak değişir.'),
        q('teknik', 'Bir bankanın bilançosunda temel kalemler nelerdir?',
          ['Krediler: kredi', 'Mevduat: mevduat', 'Özkaynak: özkaynak, sermaye', 'Menkul kıymetler / likidite: menkul, likidite, nakit', 'Sermaye yeterliliği: sermaye yeterlilik, risk'],
          'Aktif tarafta en büyük kalem kredilerdir; ayrıca menkul kıymetler ve likit varlıklar bulunur. Pasif tarafta en büyük kaynak mevduattır; diğer fonlama kaynakları ve özkaynak da yer alır. Özkaynağın riskli varlıklara oranı sermaye yeterliliğini gösterir.'),
      ]],
      ['Vaka & Grup', 'Mid', [
        q('vaka', 'Bir şube, bölgedeki rakiplerine göre daha az kredi kullandırıyor. Nedenini nasıl analiz edersin?',
          ['Veri karşılaştırma: veri, karşılaştır, pazar payı', 'Müşteri segmenti: segment, kobi, bireysel', 'Süreç / onay süresi: onay süresi, süreç, hız', 'Fiyatlama: faiz, fiyat', 'Aksiyon planı: aksiyon, kampanya, ziyaret'],
          'Önce şubenin kredi hacmini, müşteri sayısını ve pazar payını bölge ve rakiplerle karşılaştırırım. Ürün ve müşteri segmenti kırılımında farkın nerede olduğuna bakarım. Onay süreleri ve fiyatlama gibi nedenleri ayırırım. Bulgulara göre hedefli müşteri ziyaretleri ve süreç iyileştirmeleriyle bir aksiyon planı öneririm.'),
      ]],
    ]),
    track('banka-kredi', 'Kredi Analisti', 'analytics', 'Kredi değerlendirme, risk, teminat', [
      ['Kredi Değerlendirme', 'Junior', [
        q('teknik', 'Bir firmaya kredi verirken nelere bakarsın?',
          ['Finansal tablolar: bilanço, gelir tablosu, nakit akış', 'Geri ödeme gücü: geri ödeme, nakit, borç servis', 'Kaldıraç / oranlar: borç, oran, kaldıraç, likidite', 'Teminat: teminat, ipotek, kefalet', 'Sektör / yönetim: sektör, yönetim, istihbarat'],
          'Önce finansal tablolarla firmanın kârlılığını, borçluluğunu ve likiditesini incelerim. En önemli soru, nakit akışının krediyi geri ödemeye yetip yetmediğidir. Sektör riskini, ortakların ve yönetimin geçmişini ve istihbarat bilgisini değerlendiririm. Teminat ikincil bir güvencedir, kredi kararının temeli olmamalıdır.'),
      ]],
      ['Risk Vakası', 'Mid', [
        q('vaka', 'Kredi kullandırdığın bir firmanın ödemeleri gecikmeye başladı. Ne yaparsın?',
          ['Erken uyarı: erken uyarı, gecikme, takip', 'Müşteriyle görüşme: görüş, neden, ziyaret', 'Yapılandırma: yapılandır, vade, plan', 'Teminat / hukuki süreç: teminat, hukuk, takip'],
          'Erken uyarı sinyalini ciddiye alıp firmayla hemen görüşür, gecikmenin geçici mi kalıcı mı olduğunu anlamaya çalışırım. Güncel finansalları ve nakit akışını incelerim. Sorun geçiciyse uygun bir yeniden yapılandırma planı öneririm. Kalıcıysa teminatları gözden geçirir ve gerekirse hukuki takip sürecini başlatırım.'),
      ]],
    ]),
    track('banka-musteri', 'Müşteri Temsilcisi', 'people', 'Şube, satış, müşteri ilişkisi', [
      ['Şube Temelleri', 'Junior', [
        q('vaka', 'Şubeye gelen bir müşteriye yeni bir kredi kartı nasıl önerirsin?',
          ['İhtiyacı anlama: ihtiyaç, soru, alışkanlık', 'Uygun ürün: uygun, avantaj, kampanya', 'Şeffaflık: ücret, faiz, şeffaf', 'Rıza / baskısız: zorlamadan, baskı'],
          'Önce müşterinin harcama alışkanlıklarını ve ihtiyacını sorular sorarak anlarım. Ona uygun avantajları, örneğin taksit ya da puan kampanyalarını öne çıkarırım. Yıllık ücret ve faiz gibi maliyetleri şeffaf şekilde açıklarım. Kararı müşteriye bırakır, baskı yapmam.'),
      ]],
      ['Zor Durumlar', 'Mid', [
        q('vaka', 'Kartından izinsiz işlem yapıldığını söyleyen sinirli bir müşteri geldi. Ne yaparsın?',
          ['Sakin karşılama: sakin, empati, dinle', 'Kartı bloke etme: bloke, kapat, iptal', 'İtiraz süreci: itiraz, chargeback, kayıt', 'Bilgilendirme: süre, bilgilendir, takip'],
          'Müşteriyi sakin şekilde dinler ve endişesini anladığımı gösteririm. Önce kartı hemen bloke ederek yeni işlemleri durdururum. Şüpheli işlemler için itiraz kaydını oluşturur, sürecin ne kadar süreceğini ve sonraki adımları açıkça anlatırım. Müşteriyi süreç boyunca bilgilendiririm.'),
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
          ['Misafir odaklılık: misafir, yolcu, hizmet', 'Emniyet bilinci: emniyet, güvenlik', 'Kişisel uyum: insan, iletişim, takım, esnek', 'Somut örnek: örneğin, deneyim'],
          'İnsanlarla iletişim kurmayı ve onlara iyi bir deneyim yaşatmayı seviyorum; örneğin önceki işimde müşteri memnuniyetinde ödül aldım. Kabin memurluğunun sadece hizmet değil, öncelikle yolcuların emniyetinden sorumlu olmak olduğunun farkındayım. Düzensiz çalışma saatlerine ve takım çalışmasına uyumlu biriyim.'),
        q('vaka', 'Uçuşta bir yolcu emniyet kemerini takmayı reddediyor. Ne yaparsın?',
          ['Kibar uyarı: kibar, nazik, açıkla', 'Gerekçe: emniyet, kural, türbülans', 'Kademeli yaklaşım: tekrar, kıdemli, kaptan', 'Diğer yolcular: diğer yolcu, sakin'],
          'Önce yolcuya kibarca kemerin neden zorunlu olduğunu, emniyeti için olduğunu açıklarım. Israr ederse sakin tonumu koruyarak kuralı tekrar hatırlatırım. Yine reddederse durumu kıdemli kabin amirine bildiririm, gerekirse kaptan bilgilendirilir. Bu sırada diğer yolcuları rahatsız etmemeye dikkat ederim.'),
      ]],
      ['Kriz Durumları', 'Mid', [
        q('vaka', 'Uçuşta bir yolcu fenalaşıyor. Nasıl hareket edersin?',
          ['Durumu değerlendirme: değerlendir, bilinç, nefes', 'Ekibi ve kaptanı bilgilendirme: ekip, kaptan, bildir', 'Sağlık personeli anonsu: doktor, sağlık personeli, anons', 'İlk yardım: ilk yardım, oksijen, kit', 'Kayıt: kayıt, rapor'],
          'Önce yolcunun bilinç ve solunum durumunu değerlendiririm, eğitimime uygun ilk yardımı başlatırım. Ekibimi ve kaptanı hemen bilgilendiririm. Gerekirse uçakta doktor veya sağlık personeli olup olmadığı anons edilir, oksijen ve ilk yardım kitleri kullanılır. Olayı prosedüre uygun şekilde raporlarım.'),
      ]],
    ]),
    track('pilot', 'Pilot Adayı', 'navigate', 'Mülakat, CRM, karar verme', [
      ['Temeller', 'Junior', [
        q('teknik', 'CRM (Crew Resource Management) nedir, neden önemlidir?',
          ['Tanım: ekip kaynak yönetimi, crm', 'İletişim: iletişim, açık, sesli', 'Karar verme: karar, durumsal farkındalık', 'İnsan hatası: insan hatası, kaza'],
          'CRM, kokpitte ve kabinde ekibin tüm kaynaklarını etkin kullanmasını sağlayan bir yaklaşımdır. Açık iletişim, iş yükü paylaşımı, durumsal farkındalık ve ortak karar vermeyi kapsar. Kazaların büyük kısmında insan hatası rol oynadığı için CRM uçuş emniyetinin temel taşlarındandır.'),
      ]],
      ['Karar Verme', 'Mid', [
        q('vaka', 'Kaptan pilotun yanlış bir karar verdiğini düşünüyorsun. Ne yaparsın?',
          ['Açık ifade: söyle, ifade, sesli', 'Saygılı ama net: saygı, net', 'Bilgiye dayanma: veri, gösterge, prosedür', 'Kademelendirme: tekrar, ısrar, emniyet'],
          'Endişemi saygılı ama net bir şekilde, gördüğüm göstergelere ve prosedüre dayanarak dile getiririm. Kaptan yanıt vermezse daha doğrudan bir ifadeyle tekrar ederim. Emniyet doğrudan tehlikedeyse CRM ilkelerine göre ısrarcı olurum; hiyerarşi emniyetin önüne geçmemelidir.'),
      ]],
    ]),
    track('otel', 'Otelcilik & Ön Büro', 'bed', 'Misafir ilişkileri, operasyon', [
      ['Misafir İlişkileri', 'Junior', [
        q('vaka', 'Rezervasyonu olmasına rağmen oda bulunamayan bir misafirle nasıl ilgilenirsin?',
          ['Özür ve sahiplenme: özür, sorumluluk', 'Hızlı çözüm: alternatif, yükseltme, upgrade, başka otel', 'Telafi: telafi, ikram, indirim', 'Takip: takip, yönetici'],
          'Önce içtenlikle özür diler ve sorunu sahiplenirim. Hemen alternatif sunarım: üst kategori oda, mümkün değilse anlaşmalı yakın bir otel ve ulaşım. Yaşanan aksaklık için ikram veya indirim gibi bir telafi öneririm. Misafiri yöneticiyle birlikte takip eder, memnun ayrılmasını sağlarım.'),
      ]],
      ['Operasyon', 'Mid', [
        q('vaka', 'Misafir yorumlarında temizlik puanı düşüyor. Ne yaparsın?',
          ['Veri analizi: yorum, puan, analiz', 'Kök neden: kök neden, personel, süre, kontrol', 'Departmanla iş birliği: kat hizmetleri, ekip', 'İzleme: kontrol listesi, takip, ölç'],
          'Önce yorumları analiz edip şikâyetlerin hangi odalarda ve konularda yoğunlaştığına bakarım. Kat hizmetleri ekibiyle kök nedenleri, örneğin personel sayısı veya oda başına süreyi konuşurum. Kontrol listesi ve rastgele denetimler başlatır, puanları haftalık takip ederim.'),
      ]],
    ]),
  ],
};
