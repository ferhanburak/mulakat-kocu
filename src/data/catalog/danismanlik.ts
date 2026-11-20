import { q, track, type Profession } from '../build';

export const danismanlik: Profession = {
  id: 'danismanlik',
  name: 'Danışmanlık',
  icon: 'briefcase',
  color: '#0E7C86',
  tagline: 'Vaka mülakatı, strateji, teknoloji danışmanlığı',
  tracks: [
    track('vaka-mulakati', 'Vaka Mülakatı', 'grid', 'Pazar tahmini, kârlılık, strateji vakaları', [
      ['Pazar Büyüklüğü', 'Junior', [
        q('vaka', 'Türkiye’de bir yılda kaç adet kahve kapsülü satıldığını nasıl tahmin edersin?',
          ['Yaklaşım seçimi: aşağıdan yukarı, yukarıdan aşağı', 'Segmentasyon: hane, ofis, segment', 'Varsayımlar: varsay', 'Hesaplama: milyon', 'Sağlama: sağlama, karşılaştır'],
          'Talep tarafından aşağıdan yukarı bir yaklaşım seçerim. Pazarı hane ve ofis olarak iki segmente ayırırım. Yaklaşık 25 milyon hanenin %5’inde kapsül makinesi olduğunu ve günde ortalama 2 kapsül tüketildiğini varsayarım. Bu, haneler için yılda yaklaşık 900 milyon kapsül eder; ofisler için benzer bir hesabı ekleyip toplamı bulurum. Son olarak sonucu üretici açıklamaları ya da ithalat verileriyle karşılaştırıp sağlamasını yaparım.'),
      ]],
      ['Kârlılık Vakası', 'Mid', [
        q('vaka', 'Bir restoran zincirinin kârı son iki yılda %30 düştü. Nedenini nasıl bulursun?',
          ['Kâr formülü: gelir, maliyet', 'Gelir kırılımı: müşteri sayısı, sepet', 'Maliyet kırılımı: sabit, değişken', 'Dış etkenler: rakip, enflasyon', 'Öneri: öneri'],
          'Kâr, gelir eksi maliyettir; önce düşüşün hangi taraftan geldiğini ayırırım. Gelir tarafında müşteri sayısını, ortalama sepet tutarını ve fiyatları şube bazında incelerim. Maliyet tarafında kira ve personel gibi sabit giderleri, hammadde gibi değişken giderlerden ayırırım. Yeni bir rakip ya da enflasyon nedeniyle artan hammadde fiyatları gibi dış etkenleri de kontrol ederim. Bulduğum ana nedene göre menü fiyatlaması ya da tedarik değişikliği gibi somut bir öneri sunarım.'),
      ]],
      ['Strateji Vakası', 'Senior', [
        q('vaka', 'Bir Türk perakende şirketi Orta Asya pazarına girmek istiyor. Ne tavsiye edersin?',
          ['Pazar çekiciliği: pazar büyüklüğü, büyüme', 'Rekabet: rekabet, rakip', 'Şirketin avantajı: avantaj, yetkinlik', 'Giriş modeli: ortaklık, satın alma, franchise', 'Risk ve getiri: risk, getiri'],
          'Önce hedef ülkelerin pazar büyüklüğü, büyüme hızı ve tüketici harcamalarıyla pazarın çekiciliğini değerlendiririm. Ardından yerel ve uluslararası rakiplerle rekabet yoğunluğuna bakarım. Şirketin fiyat, tedarik ya da marka gücü gibi taşınabilir bir avantajı ve yetkinliği olup olmadığını sorgularım. Giriş modeli olarak yerel bir ortaklık, satın alma ya da franchise seçeneklerini karşılaştırırım. Kur ve siyasi risk ile beklenen getiriyi birlikte değerlendirip net bir tavsiye veririm.'),
      ]],
    ]),
    track('strateji-danismani', 'Strateji Danışmanlığı', 'git-network', 'Problem çözme, müşteri yönetimi, dönüşüm', [
      ['Problem Yapılandırma', 'Junior', [
        q('vaka', 'Bir müşteri “Satışlarımız neden artmıyor?” diye soruyor. Problemi nasıl yapılandırırsın?',
          ['Net problem tanımı: tanım, ölçülebilir', 'MECE ağaç: mece, ağaç', 'Hipotez: hipotez', 'Veriyle test: veri', 'Önceliklendirme: öncelik, etki'],
          'Önce problemi net ve ölçülebilir bir tanım haline getiririm: hangi ürün, hangi pazar, hangi dönem ve hedef ne? Ardından satışları fiyat ve hacim, hacmi de müşteri sayısı ve alım sıklığı olarak ayıran MECE bir problem ağacı kurarım. Her dal için bir hipotez yazarım. Hipotezleri müşteri verisi ve görüşmelerle test ederim. Etkisi en büyük ve en hızlı test edilebilecek dallara öncelik veririm.'),
      ]],
      ['Müşteri Yönetimi', 'Mid', [
        q('vaka', 'Proje ortasında müşteri kapsamı genişletmek istiyor ama bütçe ve süre aynı. Ne yaparsın?',
          ['İhtiyacı anlama: neden, anla', 'Etki analizi: etki', 'Seçenekler: seçenek, takas', 'Yazılı mutabakat: yazılı, mutabakat', 'İlişkiyi koruma: ilişki, güven'],
          'Önce yeni talebin nedenini ve iş için önemini anlamaya çalışırım. Ekibimle birlikte talebin süre, bütçe ve kaliteye etkisini hızlıca analiz ederim. Müşteriye birkaç seçenek sunarım: ek bütçe ve süre, başka bir kapsamla takas ya da talebi ikinci faza bırakmak. Seçilen yolu yazılı bir değişiklik talebi ile mutabakata bağlarım. Bunu bir pazarlık değil ortak problem çözme gibi yöneterek ilişki ve güveni korurum.'),
      ]],
      ['Dönüşüm Programı', 'Senior', [
        q('vaka', 'Büyük bir şirketin maliyet dönüşüm programını nasıl yönetirsin?',
          ['Hedef ve baz: hedef, baz', 'Fırsat havuzu: fırsat', 'Yönetişim: pmo, yönetişim', 'Değişim yönetimi: değişim, direnç', 'Kalıcılık: kalıcı, takip'],
          'Önce yönetimle net bir tasarruf hedefi belirler, karşılaştırma için maliyet bazını sabitlerim. Birimlerle çalışarak satın alma, organizasyon ve süreç alanlarında bir fırsat havuzu oluştururum. Her girişimin sahibi ve takvimi olan, haftalık raporlayan bir PMO ve yönetişim yapısı kurarım. Çalışanların direncini azaltmak için değişim yönetimi ve açık iletişime önem veririm. Tasarrufların kalıcı olması için sonuçları finans verisiyle takip ederim.'),
      ]],
    ]),
    track('teknoloji-danismani', 'Teknoloji Danışmanlığı', 'desktop', 'ERP, dijital dönüşüm, uygulama projeleri', [
      ['İhtiyaç Analizi', 'Junior', [
        q('vaka', 'Bir müşterinin yeni bir ERP sistemine ihtiyacı olup olmadığını nasıl analiz edersin?',
          ['Mevcut süreçler: mevcut süreç', 'Sorun noktaları: manuel, hata', 'Paydaş görüşmeleri: paydaş', 'Gereksinimler: gereksinim', 'İş gerekçesi: fayda, maliyet'],
          'Önce müşterinin mevcut süreçlerini ve kullandığı sistemleri haritalarım. Manuel veri girişi, tekrar eden işler ve hata yapılan noktalar gibi sorunları tespit ederim. Finans, üretim ve satış gibi birimlerdeki paydaşlarla görüşüp beklentilerini toplarım. Bunları önceliklendirilmiş bir gereksinim listesine dönüştürürüm. Son olarak yeni sistemin maliyeti ile beklenen faydasını karşılaştıran bir iş gerekçesi hazırlarım.'),
      ]],
      ['Uygulama Projesi', 'Mid', [
        q('vaka', 'ERP canlıya geçişinden iki hafta önce kritik testlerde hatalar çıktı. Ne yaparsın?',
          ['Etki değerlendirmesi: kritik, etki', 'Düzeltme planı: düzelt, plan', 'Canlıya geçiş kararı: canlıya geçiş, ertele', 'Şeffaf iletişim: şeffaf', 'Geri dönüş planı: geri dönüş'],
          'Önce hataları iş etkisine göre sınıflandırıp hangilerinin gerçekten kritik olduğunu belirlerim. Kritik hatalar için sorumlu ve tarihleri belli bir düzeltme planı hazırlarım. Belirlediğimiz ölçütlere göre bir canlıya geçiş toplantısı yapar, risk yüksekse tarihi ertelemeyi öneririm. Müşteri yönetimine durumu şeffaf şekilde ve seçenekleriyle anlatırım. Canlıya geçilse bile sorun çıkarsa eski sisteme dönmek için bir geri dönüş planı hazır tutarım.'),
      ]],
      ['Dijital Dönüşüm', 'Senior', [
        q('vaka', 'Geleneksel bir üretim şirketi için dijital dönüşüm yol haritasını nasıl hazırlarsın?',
          ['Olgunluk değerlendirmesi: olgunluk', 'İş değeri: kullanım senaryo, değer', 'Pilot: pilot, hızlı kazanım', 'Veri altyapısı: veri, altyapı', 'İnsan ve kültür: yetkinlik, kültür'],
          'Önce şirketin dijital olgunluk seviyesini süreçler, sistemler ve veri açısından değerlendiririm. Teknolojiden değil iş değerinden başlayarak kestirimci bakım ya da talep tahmini gibi kullanım senaryolarını listeler, değerine göre sıralarım. Hızlı kazanım sağlayacak bir iki pilot ile başlayıp başarıyı gösteririm. Ölçeklemek için ortak bir veri platformu ve altyapı kurarım. Çalışanların dijital yetkinliğini geliştiren eğitimler ve bir değişim kültürü olmadan dönüşümün kalıcı olmayacağını bilirim.'),
      ]],
    ]),
  ],
};

export const mimarlik: Profession = {
  id: 'mimarlik',
  name: 'Mimarlık & Tasarım',
  icon: 'home',
  color: '#8E5B3C',
  tagline: 'Mimarlık, iç mimarlık, grafik tasarım',
  tracks: [
    track('mimar', 'Mimarlık', 'business', 'Tasarım süreci, uygulama, proje yönetimi', [
      ['Tasarım Süreci', 'Junior', [
        q('teknik', 'Portfolyondaki bir projeyi baştan sona nasıl anlatırsın?',
          ['Bağlam ve program: bağlam, arsa, program', 'Tasarım kavramı: kavram', 'Tasarım kararları: malzeme, ışık', 'Alternatifler: alternatif', 'Sonuç ve öğrenim: öğren'],
          'Önce projenin bağlamını anlatırım: arsanın özellikleri, kullanıcılar ve işlev programı. Ardından bu bağlamdan çıkan ana tasarım kavramını tek cümleyle ifade ederim. Kütle, malzeme ve gün ışığı gibi kararların bu kavrama nasıl hizmet ettiğini çizimlerle gösteririm. Denediğim alternatifleri ve neden elediğimi de paylaşırım. Son olarak projeden ne öğrendiğimi ve bugün neyi farklı yapacağımı anlatırım.'),
      ]],
      ['Uygulama', 'Mid', [
        q('vaka', 'Şantiyede uygulamanın projeden farklı yapıldığını fark ettin. Ne yaparsın?',
          ['Tespit ve belgeleme: tespit, fotoğraf', 'Etki analizi: etki, statik', 'Taraflarla görüşme: müteahhit, işveren', 'Çözüm: çözüm, revizyon', 'Önleme: denetim'],
          'Önce farkı yerinde tespit edip fotoğraf ve notlarla belgelerim. Bu farkın statik, işlev, maliyet ve takvim açısından etkisini ilgili mühendislerle değerlendiririm. Müteahhit ve işveren ile bir toplantı yapıp durumu açıkça konuşurum. Etkiye göre düzeltme ya da projede revizyon gibi bir çözüm üzerinde anlaşırız. Tekrarlanmaması için kritik imalatlardan önce yerinde denetim adımları eklerim.'),
      ]],
      ['Proje Liderliği', 'Senior', [
        q('vaka', 'Bütçesi kısılan bir projede tasarım kalitesini nasıl korursun?',
          ['Öncelikler: öncelik', 'Değer mühendisliği: değer mühendis', 'Malzeme ve sistem: malzeme', 'İşveren iletişimi: işveren', 'Ekip koordinasyonu: koordinasyon'],
          'Önce projeyi özel kılan ve vazgeçilmeyecek tasarım unsurlarını öncelik olarak belirlerim. Geri kalan kalemlerde değer mühendisliği yaparak aynı işi daha düşük maliyetle sağlayan çözümler ararım. Malzeme ve sistem seçimlerinde uzun ömürlü ama ekonomik alternatifleri değerlendiririm. Her seçeneğin etkisini işveren ile şeffaf şekilde paylaşıp kararı birlikte veririz. Mühendislik ekipleriyle sıkı koordinasyon kurarak sonradan pahalı değişikliklerin önüne geçerim.'),
      ]],
    ]),
    track('ic-mimar', 'İç Mimarlık', 'color-fill', 'Mekân, malzeme, müşteri ve bütçe', [
      ['Mekân Tasarımı', 'Junior', [
        q('vaka', 'Küçük bir stüdyo daireyi daha ferah ve işlevsel hale getirmek için ne önerirsin?',
          ['İhtiyaç analizi: ihtiyaç, yaşam', 'Çok işlevli mobilya: çok işlevli', 'Dikey depolama: depolama, dikey', 'Işık ve renk: ışık, açık renk', 'Dolaşım: dolaşım'],
          'Önce kullanıcının yaşam tarzını ve ihtiyaçlarını konuşarak öğrenirim. Açılır yatak ya da katlanır masa gibi çok işlevli mobilyalar öneririm. Duvarları tavana kadar kullanan dikey depolama çözümleriyle zemini boşaltırım. Doğal ışığı engellememeye özen gösterir, açık renk yüzeyler ve aynalarla mekânı daha geniş gösteririm. Mobilyaları rahat bir dolaşım alanı bırakacak şekilde yerleştiririm.'),
      ]],
      ['Müşteri & Bütçe', 'Mid', [
        q('vaka', 'Müşterinin istediği tasarım bütçesini aşıyor. Nasıl yönetirsin?',
          ['Önceliklendirme: öncelik', 'Alternatif malzeme: alternatif', 'Aşamalı uygulama: aşama', 'Şeffaf maliyet: şeffaf', 'Müşterinin kararı: karar'],
          'Önce müşteriyle hangi unsurların onun için en önemli olduğunu konuşup bir öncelik listesi yaparız. Görünümü benzer ama daha ekonomik alternatif malzeme ve ürünler öneririm. Bazı işleri ileri bir tarihe bırakan aşamalı bir uygulama planı sunarım. Her kalemin maliyetini şeffaf bir dökümle paylaşırım. Son kararı bilgilendirilmiş şekilde müşterinin vermesini sağlarım.'),
      ]],
      ['Stüdyo Yönetimi', 'Senior', [
        q('vaka', 'Bir iç mimarlık ofisinde aynı anda yürüyen projelerin kalite ve takvimini nasıl yönetirsin?',
          ['Proje takvimi: takvim', 'Standart süreç: standart, kontrol listesi', 'Kaynak dağılımı: kaynak, ekip', 'Tedarikçi yönetimi: tedarikçi', 'Müşteri bilgilendirme: müşteri, rapor'],
          'Tüm projeleri tek bir panoda kilometre taşlarıyla birlikte gösteren ortak bir takvim tutarım. Tasarımdan uygulamaya her aşama için standart bir süreç ve kontrol listesi kullanırız. Haftalık toplantılarda ekip ve kaynak dağılımını yükü dengeleyecek şekilde ayarlarım. Tedarikçi teslim sürelerini takip edip gecikmeleri önceden yönetirim. Müşterilere düzenli kısa raporlarla ilerlemeyi bildiririm.'),
      ]],
    ]),
    track('grafik', 'Grafik Tasarım', 'brush', 'Portfolyo, marka kimliği, kreatif yönetim', [
      ['Tasarım Süreci', 'Junior', [
        q('teknik', 'Bir logo tasarım sürecini nasıl yürütürsün?',
          ['Brief: brief, hedef kitle', 'Araştırma: araştırma, rakip', 'Eskiz ve alternatifler: eskiz', 'Geri bildirim: geri bildirim', 'Teslim ve kılavuz: kılavuz'],
          'Önce müşteriyle detaylı bir brief toplantısı yapıp markanın değerlerini ve hedef kitlesini anlarım. Sektörü ve rakip markaları araştırıp öne çıkmak için bir yön belirlerim. Bilgisayara geçmeden önce çok sayıda eskiz çizer, en güçlü üç alternatifi geliştiririm. Müşterinin geri bildirimi ile seçilen tasarımı rafine ederim. Son olarak logoyu tüm formatlarda ve kullanım kurallarını anlatan bir kılavuzla teslim ederim.'),
      ]],
      ['Müşteriyle Çalışma', 'Mid', [
        q('vaka', 'Müşteri tasarımını beğenmedi ama nedenini açıklayamıyor. Ne yaparsın?',
          ['Doğru sorular: soru', 'Referanslar: referans', 'Brief’e dönüş: brief', 'Seçenekler: seçenek', 'Gerekçelendirme: gerekçe'],
          'Savunmaya geçmek yerine meraklı sorular sorarım: renk mi, yazı mı, genel his mi rahatsız ediyor? Beğendiği ve beğenmediği referans tasarımlar isteyip ortak bir dil kurarız. Kararları tekrar brief ve hedeflerle karşılaştırırım. Farklı yönleri gösteren iki üç hızlı seçenek hazırlarım. Her seçeneğin gerekçesini anlatarak müşterinin bilinçli bir seçim yapmasına yardım ederim.'),
      ]],
      ['Kreatif Direktörlük', 'Senior', [
        q('vaka', 'Bir kampanyanın görsel dilini birden fazla tasarımcı ve kanalda nasıl tutarlı tutarsın?',
          ['Kampanya konsepti: konsept', 'Görsel kılavuz: kılavuz, şablon', 'Kanal uyarlaması: kanal, uyarla', 'Onay süreci: onay', 'Ekip geri bildirimi: geri bildirim'],
          'Önce kampanyanın tek cümlelik ana konseptini ve hissini netleştirip ekiple paylaşırım. Renk, tipografi, görsel üslup ve yerleşim kurallarını içeren kısa bir görsel kılavuz ve şablon seti hazırlarım. Sosyal medya, dış mecra ve dijital reklam için her kanala uyarlama kurallarını belirlerim. Yayından önce tüm işlerin geçtiği kısa bir onay süreci kurarım. Haftalık eleştiri toplantılarında ekibe geri bildirim vererek dili birlikte geliştiririz.'),
      ]],
    ]),
  ],
};
