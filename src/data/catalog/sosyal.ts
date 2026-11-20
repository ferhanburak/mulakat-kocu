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
          ['Düşünce-duygu-davranış: düşünce, duygu, davranış', 'Otomatik düşünceler: otomatik düşünce, çarpıtma', 'Yapılandırılmış / kısa süreli: yapılandırılmış, kısa süreli, ev ödevi, structured, homework, ödev, gündem', 'Kanıta dayalılık: kanıt, araştırma, etkin, evidence'],
          'BDT, olayların kendisinden çok onları nasıl yorumladığımızın duygu ve davranışlarımızı belirlediğini varsayar. Otomatik düşünceler ve bilişsel çarpıtmalar fark edilip sınanır. Yapılandırılmış, genellikle kısa süreli, ev ödevleri içeren ve kanıta dayalı bir yaklaşımdır.'),
        q('teknik', 'Psikolojik değerlendirmede gizlilik ilkesi ve sınırları nelerdir?',
          ['Gizlilik: gizlilik, mahremiyet, gizli', 'Bilgilendirilmiş onam: onam, bilgilendir', 'Sınırlar: zarar, tehlike, intihar, istisna', 'Yasal yükümlülük: yasal, mahkeme, bildirim'],
          'Danışanın paylaştıkları gizlidir ve bu, ilk görüşmede bilgilendirilmiş onamla açıklanır. Ancak danışanın kendisine ya da başkasına ciddi zarar verme riski, istismar şüphesi veya mahkeme kararı gibi durumlar gizliliğin yasal istisnalarıdır.', ['Gizliliğin istisnası olmadığı: istisnası yoktur; istisnası yok; gizlilik mutlaktır; kimseye söyleyemez']),
      ]],
      ['Vaka Yaklaşımı', 'Mid', [
        q('vaka', 'İlk görüşmede danışan intihar düşüncelerinden bahsetti. Ne yaparsın?',
          ['Risk değerlendirmesi: risk, plan, değerlendir', 'Doğrudan sorma: doğrudan sor, açıkça', 'Güvenlik planı: güvenlik planı, destek', 'Yönlendirme / iş birliği: psikiyatri, yönlendir, acil', 'Kayıt / süpervizyon: kayıt, süpervizyon'],
          'Sakin kalır ve konuyu doğrudan, yargılamadan sorarım; açıkça sormak riski artırmaz. Plan, araç ve geçmiş girişim gibi risk faktörlerini değerlendiririm. Danışanla bir güvenlik planı oluşturur, gerekirse psikiyatriye ya da acile yönlendiririm. Süreci kaydeder ve süpervizyon alırım.', ['İntiharı sormanın riski artırdığı: riski artırır; aklına fikir sok; açıkça sormam; konuyu açmam']),
      ]],
      ['Süpervizyon', 'Senior', [
        q('vaka', 'Süpervizyon verdiğin bir terapistin danışanıyla mesleki sınırları aştığını fark ettin. Ne yaparsın?',
          ['Danışanın güvenliği: danışanın güvenliği, zarar', 'Doğrudan görüşme: açıkça görüş, açıkça konuş, birebir', 'Etik kurallar: etik, ethic', 'Düzeltici plan: plan, yakın süpervizyon', 'Kayıt ve bildirim: kayıt, bildir'],
          'İlk önceliğim danışanın güvenliği ve görebileceği zararı önlemektir. Terapistle konuyu suçlamadan ama açıkça görüşür, ne olduğunu kendi ağzından dinlerim. Durumu mesleki etik kurallar çerçevesinde değerlendiririm. Daha yakın süpervizyon ve gerekirse vakanın devri gibi düzeltici bir plan yaparız. Görüşmeleri kayıt altına alır, ciddi bir ihlal varsa etik kurula bildiririm.'),
      ]],
    ]),
    track('psi-orgut', 'Endüstri & Örgüt Psikolojisi', 'people', 'Seçme-yerleştirme, motivasyon', [
      ['Temeller', 'Junior', [
        q('teknik', 'Bir işe alım testinin geçerli ve güvenilir olması ne demektir?',
          ['Güvenilirlik: güvenilir, tutarlı, tekrar', 'Geçerlilik: geçerli, ölçmesi gereken, validity, ölçmeyi iddia', 'Yordama: iş performansı, yordama, işteki başarı, tahmin', 'Adalet: önyargı, adil'],
          'Güvenilirlik, testin tutarlı sonuç vermesidir (tekrarlandığında benzer puanlar). Geçerlilik, testin ölçmesi gereken şeyi ölçmesi ve iş performansını yordamasıdır. Ayrıca test farklı gruplara karşı önyargısız ve adil olmalıdır.', ['Geçerlik ile güvenirliği karıştırma: güvenilirlik testin ölçmesi gereken; güvenirlik testin ölçmesi gereken; geçerlilik ise tekrar; geçerlik ise tekrar']),
      ]],
      ['Örgüt Vakası', 'Mid', [
        q('vaka', 'Bir şirkette çalışan bağlılığı anketinde puanlar çok düştü. Nasıl ilerlersin?',
          ['Veriyi kırılımlama: kırılım, departman, analiz, segment, birim', 'Nitel derinleşme: odak grup, görüşme, focus group', 'Aksiyon planı: aksiyon, plan, yönetici', 'Geri bildirim döngüsü: paylaş, takip, tekrar ölç'],
          'Sonuçları departman ve kıdem kırılımında analiz ederek sorunun yoğunlaştığı yerleri bulurum. Odak gruplarla nedenlerini derinleştiririm. Yöneticilerle somut aksiyon planları oluşturur, sonuçları çalışanlarla paylaşır ve birkaç ay sonra tekrar ölçerim.'),
      ]],
      ['Değerlendirme Merkezi', 'Senior', [
        q('vaka', 'Bir şirkete yönetici adayları için değerlendirme merkezi (assessment center) nasıl kurarsın?',
          ['Yetkinlik modeli: yetkinlik', 'Egzersizler: vaka, rol oyunu, grup', 'Değerlendirici eğitimi: değerlendirici', 'Geçerlik ve güvenirlik: geçerlik, güvenirlik', 'Geri bildirim: geri bildirim, gelişim'],
          'Önce rolün başarısı için gereken davranışları tanımlayan bir yetkinlik modeli oluştururum. Her yetkinliği birden fazla egzersizle ölçecek şekilde vaka analizi, rol oyunu ve grup tartışması tasarlarım. Değerlendiricileri gözlem, kayıt ve puanlama konusunda eğitirim. Sonuçların geçerlik ve güvenirliğini, değerlendiriciler arası uyum ve sonraki performansla kontrol ederim. Her adaya gelişim planına dönüşen ayrıntılı bir geri bildirim veririm.'),
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
      ['Okul Programı', 'Senior', [
        q('vaka', 'Okul genelinde akran zorbalığını önleme programını nasıl tasarlarsın?',
          ['İhtiyaç belirleme: anket, ihtiyaç, needs, survey', 'Okul politikası: politika, kural', 'Öğretmen eğitimi: öğretmen eğitimi, öğretmenlere eğitim, workshop', 'Akran programı: akran', 'Veli iş birliği ve izleme: veli, izle'],
          'Önce öğrencilere anonim bir anket yaparak zorbalığın sıklığını ve nerede yaşandığını belirleyip ihtiyacı netleştiririm. Okul yönetimiyle birlikte açık kuralları olan bir zorbalık karşıtı politika oluştururuz. Öğretmen eğitimi ile erken fark etme ve doğru müdahale becerisi kazandırırım. Seyirci kalmamayı öğreten akran destek programları başlatırım. Velilerle iş birliği yapar, programın etkisini dönem sonu anketleriyle izlerim.'),
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
          ['Asgari sermaye: sermaye', 'Ortak sorumluluğu: sorumluluk, kamu borcu, sorumlu, vergi borc', 'Pay devri: pay devri, devir, devret', 'Yönetim organı: yönetim kurulu, müdür'],
          'Anonim şirkette pay devri daha kolaydır, yönetim yönetim kurulu tarafından yapılır ve halka açılmaya uygundur. Limited şirkette pay devri noter onayı ve genel kurul onayı gerektirir, şirket müdürlerce yönetilir; ortaklar ayrıca şirketin ödenmeyen kamu borçlarından payları oranında sorumlu olabilir. Asgari sermaye tutarları da farklıdır.', ['Limited ortağının sınırsız sorumlu olduğu: borçlarından sınırsız; sınırsız ve şahsen sorumlu; sınırsız sorumlu', 'AŞ pay devrine noter onayı gerektiği: anonim şirkette pay devri noter']),
        q('teknik', 'Bir sözleşmeyi incelerken öncelikle nelere bakarsın?',
          ['Taraflar ve konu: taraf, konu, kapsam, kiracı, imza yetki', 'Edimler ve süreler: edim, süre, teslim, ödeme', 'Fesih ve cezai şart: fesih, cezai şart', 'Uyuşmazlık çözümü: yetkili mahkeme, tahkim, uyuşmazlık, anlaşmazlık, mahkeme'],
          'Tarafların doğru tanımlandığını ve sözleşmenin konusunu kontrol ederim. Karşılıklı edimleri, ödeme ve teslim sürelerini incelerim. Fesih koşulları, cezai şart ve sorumluluk sınırlamalarına bakar, uyuşmazlıkta yetkili mahkeme veya tahkim hükmünü değerlendiririm.'),
      ]],
      ['Danışmanlık Vakası', 'Mid', [
        q('vaka', 'Müvekkil şirket, bir tedarikçinin sözleşmeyi ihlal ettiğini söylüyor. Nasıl ilerlersin?',
          ['Belge inceleme: sözleşme, yazışma, belge, delil', 'İhlalin tespiti: ihlal, temerrüt', 'İhtar: ihtar, ihtarname, noter', 'Seçenekler: dava, arabuluculuk, uzlaşma, tazminat'],
          'Önce sözleşmeyi ve tüm yazışmaları inceleyip ihlalin ve zararın delillerini toplarım. Temerrüt koşullarını değerlendirir, gerekirse noter aracılığıyla ihtarname çekerim. Müvekkile zorunlu arabuluculuk, uzlaşma ve dava seçeneklerini maliyet ve süre açısından karşılaştırarak sunarım.', ['Arabuluculuğun gereksiz olduğu: arabuluculuğa gitmek gerekmez; arabuluculuğa gerek yok; ihtar da çekmeye gerek']),
      ]],
      ['Birleşme & Satın Alma', 'Senior', [
        q('vaka', 'Bir şirket satın alımında hukuki durum tespiti (due diligence) sürecini nasıl yönetirsin?',
          ['Kapsam ve öncelik: kapsam, öncelik', 'Veri odası: veri oda', 'Risk alanları: sözleşme, dava, lisans', 'Raporlama: rapor, kırmızı bayrak', 'Sözleşmeye yansıtma: tazminat, beyan'],
          'Önce işlemin yapısına ve müvekkilin önceliklerine göre incelemenin kapsamını belirlerim. Satıcıdan istenecek belgelerin listesini hazırlar, sanal veri odasındaki belgeleri ekiple paylaştırırım. Önemli sözleşmeler, süren davalar, lisans ve izinler, iş hukuku ve vergi gibi risk alanlarını incelerim. Bulguları önem sırasına göre bir rapor halinde sunar, kırmızı bayrakları ayrıca vurgularım. Tespit edilen riskleri satış sözleşmesinde beyan ve tazminat hükümlerine yansıtırım.'),
      ]],
    ]),
    track('huk-is', 'İş Hukuku', 'people', 'İşçi-işveren ilişkileri', [
      ['Temeller', 'Junior', [
        q('teknik', 'Haklı ve geçerli fesih arasındaki fark nedir?',
          ['Haklı fesih: haklı, derhal, ahlak', 'Geçerli fesih: geçerli, performans, işletme gereği', 'Bildirim süresi: bildirim, ihbar', 'Tazminat sonuçları: kıdem, ihbar tazminatı'],
          'Haklı fesih, ahlak ve iyiniyet kurallarına aykırılık gibi ağır nedenlerle iş sözleşmesinin bildirim süresi beklenmeden derhal sona erdirilmesidir. Geçerli fesih ise performans veya işletme gereklilikleri gibi nedenlerle, bildirim süresine uyularak yapılır. Sonuçlar kıdem ve ihbar tazminatı açısından farklıdır.', ['Haklı ve geçerli feshi karıştırma: geçerli fesihte işveren işçiyi bildirim süresi olmadan; haklı fesihte ise ihbar süresi verilir; haklı fesihte ... ihbar süresi verilir']),
      ]],
      ['İş Hukuku Vakası', 'Mid', [
        q('vaka', 'Bir çalışan işten çıkarıldığını ve tazminatının ödenmediğini söylüyor. Nasıl ilerlersin?',
          ['Bilgi toplama: sözleşme, bordro, kıdem, belge', 'Fesih türü: fesih, haklı, geçerli', 'Arabuluculuk: arabulucu, zorunlu', 'Süreler: zamanaşımı, süre, hak düşürücü'],
          'Önce iş sözleşmesi, bordrolar ve fesih bildirimini inceleyip kıdem süresini ve fesih türünü belirlerim. Alacak kalemlerini hesaplarım. İşe iade veya alacak davasından önce zorunlu arabuluculuğa başvururum ve hak düşürücü süreler ile zamanaşımına dikkat ederim.', ['Arabuluculuk ve sürelerin önemsiz olduğu: arabuluculuğa gerek yok; süre sınırı yok; doğrudan dava açılır']),
      ]],
      ['Toplu İşten Çıkarma', 'Senior', [
        q('vaka', 'İşveren müvekkilin toplu işten çıkarma yapmak istiyor. Nelere dikkat etmesini söylersin?',
          ['Toplu çıkarma eşiği: toplu, eşik', 'Bildirim yükümlülüğü: 30 gün, bildirim', 'Sendika ile görüşme: sendika, temsilci', 'İşçi hakları: kıdem, ihbar', 'Objektif ölçütler: ölçüt, ayrımcılık'],
          'Önce çıkarılacak işçi sayısının işyerindeki işçi sayısına göre kanundaki toplu çıkarma eşiğini aşıp aşmadığına bakarız. Aşıyorsa en az 30 gün önceden sendika temsilcilerine, çalışma bölge müdürlüğüne ve İŞKUR’a yazılı bildirim yapılmalıdır. Sendika temsilcileriyle çıkarmanın önlenmesi ya da etkisinin azaltılması üzerine görüşme yapılması gerekir. İşçilerin kıdem ve ihbar tazminatı gibi hakları eksiksiz ödenmelidir. Kimin çıkarılacağı performans gibi objektif ölçütlerle belirlenmeli, ayrımcılık riski önlenmelidir.', ['Bildirimin gerekmediği: bildirim yapmasına gerek yok; bildirim gerekmez; ertesi gün çıkarabilir']),
      ]],
    ]),
    track('huk-bilisim', 'Bilişim Hukuku & KVKK', 'lock-closed', 'Kişisel veri, uyum, e-ticaret', [
      ['KVKK Temelleri', 'Junior', [
        q('teknik', 'KVKK kapsamında veri sorumlusunun temel yükümlülükleri nelerdir?',
          ['Aydınlatma: aydınlatma', 'Hukuki dayanak / açık rıza: açık rıza, hukuki sebep, dayanak', 'Veri güvenliği: güvenlik, tedbir, yetkisiz, korun', 'VERBİS / kayıt: verbis, sicil', 'İlgili kişi hakları: başvuru, ilgili kişi, talep'],
          'Veri sorumlusu, kişileri aydınlatma yükümlülüğünü yerine getirmeli; verileri açık rıza veya kanundaki diğer hukuki sebeplere dayanarak işlemeli; gerekli teknik ve idari güvenlik tedbirlerini almalı; şartları sağlıyorsa VERBİS’e kayıt olmalı ve ilgili kişilerin başvurularını yanıtlamalıdır.'),
      ]],
      ['Veri İhlali Vakası', 'Mid', [
        q('vaka', 'Bir şirkette müşteri verileri sızdırıldı. Hukuki olarak ne yapılmalı?',
          ['İhlali durdurma: durdur, tespit, kapsam', 'Kurula bildirim: kurul, 72 saat, bildirim', 'İlgili kişilere bildirim: ilgili kişi, müşteri, etkilenen, bilgilendir', 'Kayıt ve önlem: kayıt, önlem, tekrar'],
          'Önce teknik ekiple ihlali durdurur ve kapsamını tespit ederiz. Kişisel Verileri Koruma Kurulu’na en kısa sürede ve en geç 72 saat içinde bildirim yapılır, etkilenen kişiler de bilgilendirilir. Olay kayıt altına alınır ve tekrarını önleyecek tedbirler belgelenir.', ['Bildirimin zorunlu olmadığı: bildirim yapmak zorunlu değil; bildirim zorunlu değil; haber vermeye gerek yok']),
      ]],
      ['Uyum Programı', 'Senior', [
        q('vaka', 'Bir şirket için KVKK uyum programını baştan nasıl kurarsın?',
          ['Veri envanteri: envanter', 'Aydınlatma ve rıza: aydınlatma, rıza', 'VERBİS kaydı: verbis', 'Teknik ve idari tedbirler: tedbir, erişim', 'Eğitim ve denetim: eğitim, denetim'],
          'Önce birimlerle görüşüp hangi kişisel verinin hangi amaçla işlendiğini gösteren bir veri envanteri çıkarırım. Her işleme için hukuki sebebi belirler, aydınlatma metinlerini ve gerekiyorsa açık rıza metinlerini hazırlarım. Şirket yükümlüyse VERBİS kaydını yaparım. Erişim yetkileri, şifreleme ve saklama-imha politikası gibi teknik ve idari tedbirleri hayata geçiririm. Çalışanlara eğitim verir, uyumu düzenli iç denetim ile kontrol ederim.', ['Açık rızanın tek başına yettiği: açık rıza almak yeterli; rıza yeterlidir; tedbirlere gerek yok; envanterine ... gerek yok']),
      ]],
    ]),
  ],
};
