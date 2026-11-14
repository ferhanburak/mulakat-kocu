import { q, track, type Profession } from '../build';

export const psikoloji: Profession = {
  id: 'psikoloji',
  name: 'Psikoloji',
  icon: 'heart',
  color: '#D9468C',
  tagline: 'Klinik, örgüt, eğitim psikolojisi',
  tracks: [
    track('psi-klinik', 'Klinik Psikoloji', 'medkit', 'Değerlendirme, terapi, etik', [
      ['Temeller', 'Junior', [
        q('teknik', 'Bilişsel davranışçı terapinin (BDT) temel varsayımı nedir?',
          ['Düşünce-duygu-davranış: düşünce, duygu, davranış', 'Otomatik düşünceler: otomatik düşünce, çarpıtma', 'Yapılandırılmış / kısa süreli: yapılandırılmış, kısa süreli, ev ödevi', 'Kanıta dayalılık: kanıt, araştırma, etkin'],
          'BDT, olayların kendisinden çok onları nasıl yorumladığımızın duygu ve davranışlarımızı belirlediğini varsayar. Otomatik düşünceler ve bilişsel çarpıtmalar fark edilip sınanır. Yapılandırılmış, genellikle kısa süreli, ev ödevleri içeren ve kanıta dayalı bir yaklaşımdır.'),
        q('teknik', 'Psikolojik değerlendirmede gizlilik ilkesi ve sınırları nelerdir?',
          ['Gizlilik: gizlilik, mahremiyet', 'Bilgilendirilmiş onam: onam, bilgilendir', 'Sınırlar: zarar, tehlike, intihar, istisna', 'Yasal yükümlülük: yasal, mahkeme, bildirim'],
          'Danışanın paylaştıkları gizlidir ve bu, ilk görüşmede bilgilendirilmiş onamla açıklanır. Ancak danışanın kendisine ya da başkasına ciddi zarar verme riski, istismar şüphesi veya mahkeme kararı gibi durumlar gizliliğin yasal istisnalarıdır.'),
      ]],
      ['Vaka Yaklaşımı', 'Mid', [
        q('vaka', 'İlk görüşmede danışan intihar düşüncelerinden bahsetti. Ne yaparsın?',
          ['Risk değerlendirmesi: risk, plan, değerlendir', 'Doğrudan sorma: doğrudan sor, açıkça', 'Güvenlik planı: güvenlik planı, destek', 'Yönlendirme / iş birliği: psikiyatri, yönlendir, acil', 'Kayıt / süpervizyon: kayıt, süpervizyon'],
          'Sakin kalır ve konuyu doğrudan, yargılamadan sorarım; açıkça sormak riski artırmaz. Plan, araç ve geçmiş girişim gibi risk faktörlerini değerlendiririm. Danışanla bir güvenlik planı oluşturur, gerekirse psikiyatriye ya da acile yönlendiririm. Süreci kaydeder ve süpervizyon alırım.'),
      ]],
    ]),
    track('psi-orgut', 'Endüstri & Örgüt Psikolojisi', 'people', 'Seçme-yerleştirme, motivasyon', [
      ['Temeller', 'Junior', [
        q('teknik', 'Bir işe alım testinin geçerli ve güvenilir olması ne demektir?',
          ['Güvenilirlik: güvenilir, tutarlı, tekrar', 'Geçerlilik: geçerli, ölçmesi gereken', 'Yordama: iş performansı, yordama', 'Adalet: önyargı, adil'],
          'Güvenilirlik, testin tutarlı sonuç vermesidir (tekrarlandığında benzer puanlar). Geçerlilik, testin ölçmesi gereken şeyi ölçmesi ve iş performansını yordamasıdır. Ayrıca test farklı gruplara karşı önyargısız ve adil olmalıdır.'),
      ]],
      ['Örgüt Vakası', 'Mid', [
        q('vaka', 'Bir şirkette çalışan bağlılığı anketinde puanlar çok düştü. Nasıl ilerlersin?',
          ['Veriyi kırılımlama: kırılım, departman, analiz', 'Nitel derinleşme: odak grup, görüşme', 'Aksiyon planı: aksiyon, plan, yönetici', 'Geri bildirim döngüsü: paylaş, takip, tekrar ölç'],
          'Sonuçları departman ve kıdem kırılımında analiz ederek sorunun yoğunlaştığı yerleri bulurum. Odak gruplarla nedenlerini derinleştiririm. Yöneticilerle somut aksiyon planları oluşturur, sonuçları çalışanlarla paylaşır ve birkaç ay sonra tekrar ölçerim.'),
      ]],
    ]),
    track('psi-egitim', 'Eğitim Psikolojisi & PDR', 'school', 'Öğrenme, rehberlik, gelişim', [
      ['Temeller', 'Junior', [
        q('teknik', 'Piaget’nin bilişsel gelişim dönemlerini sayar mısın?',
          ['Duyusal-motor: duyusal, motor', 'İşlem öncesi: işlem öncesi', 'Somut işlemler: somut', 'Soyut işlemler: soyut'],
          'Duyusal-motor dönem (0–2 yaş), işlem öncesi dönem (2–7), somut işlemler dönemi (7–11) ve soyut işlemler dönemi (11 yaş ve sonrası). Her dönemde çocuğun düşünme biçimi niteliksel olarak değişir.'),
      ]],
      ['Rehberlik Vakası', 'Mid', [
        q('vaka', 'Akademik başarısı birden düşen bir öğrenci için ne yaparsın?',
          ['Öğrenciyle görüşme: görüş, dinle, güven', 'Bilgi toplama: öğretmen, aile, gözlem', 'Nedenleri ayırt etme: aile, arkadaş, duygusal, öğrenme', 'Plan ve takip: plan, takip, yönlendir'],
          'Önce öğrenciyle güven ortamında görüşüp dinlerim. Öğretmen ve aileden bilgi toplarım. Düşüşün nedeninin aile sorunları, arkadaş ilişkileri, duygusal zorluk ya da öğrenme güçlüğü olup olmadığını ayırt ederim. Bir destek planı oluşturur, gerekirse uzmana yönlendirip takip ederim.'),
      ]],
    ]),
  ],
};

export const hukuk: Profession = {
  id: 'hukuk',
  name: 'Hukuk',
  icon: 'library',
  color: '#7C3A2D',
  tagline: 'Ticaret, iş, ceza, bilişim hukuku',
  tracks: [
    track('huk-ticaret', 'Ticaret & Şirketler Hukuku', 'briefcase', 'Sözleşme, şirket, birleşme', [
      ['Temeller', 'Junior', [
        q('teknik', 'Anonim şirket ile limited şirket arasındaki temel farklar nelerdir?',
          ['Asgari sermaye: sermaye', 'Ortak sorumluluğu: sorumluluk, kamu borcu', 'Pay devri: pay devri, devir', 'Yönetim organı: yönetim kurulu, müdür'],
          'Anonim şirkette pay devri daha kolaydır, yönetim yönetim kurulu tarafından yapılır ve halka açılmaya uygundur. Limited şirkette pay devri noter onayı ve genel kurul onayı gerektirir, şirket müdürlerce yönetilir; ortaklar ayrıca şirketin ödenmeyen kamu borçlarından payları oranında sorumlu olabilir. Asgari sermaye tutarları da farklıdır.'),
        q('teknik', 'Bir sözleşmeyi incelerken öncelikle nelere bakarsın?',
          ['Taraflar ve konu: taraf, konu, kapsam', 'Edimler ve süreler: edim, süre, teslim, ödeme', 'Fesih ve cezai şart: fesih, cezai şart', 'Uyuşmazlık çözümü: yetkili mahkeme, tahkim, uyuşmazlık'],
          'Tarafların doğru tanımlandığını ve sözleşmenin konusunu kontrol ederim. Karşılıklı edimleri, ödeme ve teslim sürelerini incelerim. Fesih koşulları, cezai şart ve sorumluluk sınırlamalarına bakar, uyuşmazlıkta yetkili mahkeme veya tahkim hükmünü değerlendiririm.'),
      ]],
      ['Danışmanlık Vakası', 'Mid', [
        q('vaka', 'Müvekkil şirket, bir tedarikçinin sözleşmeyi ihlal ettiğini söylüyor. Nasıl ilerlersin?',
          ['Belge inceleme: sözleşme, yazışma, belge, delil', 'İhlalin tespiti: ihlal, temerrüt', 'İhtar: ihtar, ihtarname, noter', 'Seçenekler: dava, arabuluculuk, uzlaşma, tazminat'],
          'Önce sözleşmeyi ve tüm yazışmaları inceleyip ihlalin ve zararın delillerini toplarım. Temerrüt koşullarını değerlendirir, gerekirse noter aracılığıyla ihtarname çekerim. Müvekkile zorunlu arabuluculuk, uzlaşma ve dava seçeneklerini maliyet ve süre açısından karşılaştırarak sunarım.'),
      ]],
    ]),
    track('huk-is', 'İş Hukuku', 'people', 'İşçi-işveren ilişkileri', [
      ['Temeller', 'Junior', [
        q('teknik', 'Haklı ve geçerli fesih arasındaki fark nedir?',
          ['Haklı fesih: haklı, derhal, ahlak', 'Geçerli fesih: geçerli, performans, işletme gereği', 'Bildirim süresi: bildirim, ihbar', 'Tazminat sonuçları: kıdem, ihbar tazminatı'],
          'Haklı fesih, ahlak ve iyiniyet kurallarına aykırılık gibi ağır nedenlerle iş sözleşmesinin bildirim süresi beklenmeden derhal sona erdirilmesidir. Geçerli fesih ise performans veya işletme gereklilikleri gibi nedenlerle, bildirim süresine uyularak yapılır. Sonuçlar kıdem ve ihbar tazminatı açısından farklıdır.'),
      ]],
      ['İş Hukuku Vakası', 'Mid', [
        q('vaka', 'Bir çalışan işten çıkarıldığını ve tazminatının ödenmediğini söylüyor. Nasıl ilerlersin?',
          ['Bilgi toplama: sözleşme, bordro, kıdem, belge', 'Fesih türü: fesih, haklı, geçerli', 'Arabuluculuk: arabulucu, zorunlu', 'Süreler: zamanaşımı, süre, hak düşürücü'],
          'Önce iş sözleşmesi, bordrolar ve fesih bildirimini inceleyip kıdem süresini ve fesih türünü belirlerim. Alacak kalemlerini hesaplarım. İşe iade veya alacak davasından önce zorunlu arabuluculuğa başvururum ve hak düşürücü süreler ile zamanaşımına dikkat ederim.'),
      ]],
    ]),
    track('huk-bilisim', 'Bilişim Hukuku & KVKK', 'lock-closed', 'Kişisel veri, uyum, e-ticaret', [
      ['KVKK Temelleri', 'Junior', [
        q('teknik', 'KVKK kapsamında veri sorumlusunun temel yükümlülükleri nelerdir?',
          ['Aydınlatma: aydınlatma', 'Hukuki dayanak / açık rıza: açık rıza, hukuki sebep, dayanak', 'Veri güvenliği: güvenlik, tedbir', 'VERBİS / kayıt: verbis, sicil', 'İlgili kişi hakları: başvuru, ilgili kişi'],
          'Veri sorumlusu, kişileri aydınlatma yükümlülüğünü yerine getirmeli; verileri açık rıza veya kanundaki diğer hukuki sebeplere dayanarak işlemeli; gerekli teknik ve idari güvenlik tedbirlerini almalı; şartları sağlıyorsa VERBİS’e kayıt olmalı ve ilgili kişilerin başvurularını yanıtlamalıdır.'),
      ]],
      ['Veri İhlali Vakası', 'Mid', [
        q('vaka', 'Bir şirkette müşteri verileri sızdırıldı. Hukuki olarak ne yapılmalı?',
          ['İhlali durdurma: durdur, tespit, kapsam', 'Kurula bildirim: kurul, 72 saat, bildirim', 'İlgili kişilere bildirim: ilgili kişi, müşteri, bildir', 'Kayıt ve önlem: kayıt, önlem, tekrar'],
          'Önce teknik ekiple ihlali durdurur ve kapsamını tespit ederiz. Kişisel Verileri Koruma Kurulu’na en kısa sürede ve en geç 72 saat içinde bildirim yapılır, etkilenen kişiler de bilgilendirilir. Olay kayıt altına alınır ve tekrarını önleyecek tedbirler belgelenir.'),
      ]],
    ]),
  ],
};
