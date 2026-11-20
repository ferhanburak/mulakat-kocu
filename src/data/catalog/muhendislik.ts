import { q, track, type Profession } from '../build';

export const endustri: Profession = {
  id: 'endustri',
  name: 'Endüstri Mühendisliği',
  icon: 'git-network',
  color: '#D98A00',
  tagline: 'Üretim, tedarik zinciri, kalite',
  tracks: [
    track('ie-uretim', 'Üretim & Yalın Yönetim', 'construct', 'Planlama, verimlilik, yalın üretim', [
      ['Temeller', 'Junior', [
        q('teknik', 'Yalın üretimdeki 7 israf türünden bildiklerini sayar mısın?',
          ['Fazla üretim: fazla üretim, aşırı üretim, fazla üret, overproduction', 'Bekleme: bekleme', 'Taşıma / hareket: taşıma, hareket', 'Stok: stok, envanter', 'Hatalı ürün: hata, kusur, hurda'],
          'Fazla üretim, bekleme, gereksiz taşıma, fazla işlem, fazla stok, gereksiz hareket ve hatalı ürün. Yalın yaklaşım müşteriye değer katmayan bu adımları görünür kılıp azaltmayı hedefler.', ['Stok israf sayılmıyor: stok tutmak israf değil; stok ne kadar fazla olursa o kadar iyi']),
        q('teknik', 'Darboğaz (bottleneck) nedir, nasıl tespit edersin?',
          ['Tanım: en yavaş, kapasite, darboğaz', 'Tespit: bekleyen, kuyruk, stok birik, ölç, yığıl, wip, birik', 'Kısıtlar teorisi: kısıt, toc', 'İyileştirme: kapasite artır, dengele, artırırım'],
          'Darboğaz, sistemin toplam çıktısını sınırlayan en düşük kapasiteli adımdır. Önünde iş/stok biriken ve kullanım oranı en yüksek istasyonu ölçerek bulurum. Kısıtlar Teorisi’ne göre önce o adımı tam kullanır, sonra kapasitesini artırırım.', ['Darboğaz en hızlı adım sanılıyor: darboğaz hattın en hızlı; darboğaz en hızlı', 'Her istasyonu hızlandırmak çıktıyı artırır sanılıyor: her istasyonu ayrı ayrı hızlandır']),
      ]],
      ['İyileştirme Vakası', 'Mid', [
        q('vaka', 'Bir montaj hattında çevrim süresi hedefin %20 üzerinde. Ne yaparsın?',
          ['Mevcut durumu ölçme: zaman etüdü, ölç, gözlem, time study, kronometre, süre tut, izle, video', 'Hat dengeleme: dengele, iş yükü, istasyon, line balanc, yamazumi, paylaştır, dağıt', 'Kök neden: kök neden, 5 neden, balık kılçığı, root cause, fishbone, 5 why', 'Standart iş: standart, talimat, smed'],
          'Önce zaman etüdü ile her istasyonun sürelerini ölçerim. İş yükü dengesizse hat dengeleme yaparım; duruş ve ayar süreleri yüksekse SMED uygularım. Kök nedenleri 5 Neden ile bulur, iyileşmeyi standart iş talimatıyla kalıcı hale getiririm.', ['Bant hızını artırmak çözüm sanılıyor: bandının hızını artır; bant hızını artır']),
      ]],
      ['Yalın Dönüşüm', 'Senior', [
        q('vaka', 'Bir fabrikada yalın dönüşüm programını nasıl başlatır ve kalıcı hale getirirsin?',
          ['Değer akışı: değer akış, vsm, value stream', 'Pilot alan: pilot, model line, model hat, deneme', 'Yönetim desteği: yönetim desteği, üst yönetim, top management, genel müdür, buy-in', 'Çalışan katılımı: kaizen, çalışan, işçi, öneri, operatör', 'Standart ve sürdürme: standart, sürdür, standard, sustain, gemba'],
          'Önce üst yönetimle hedefleri netleştirip görünür bir yönetim desteği alırım. Ana ürün ailesi için değer akış haritası çıkarıp israfların nerede olduğunu gösteririm. Tüm fabrikaya yaymadan önce bir pilot hatta başlayıp hızlı bir başarı gösteririm. Çalışanları kaizen etkinlikleriyle sürece katar, önerilerini uygularım. İyileştirmeleri standart iş talimatlarına çevirip günlük denetimlerle sürdürürüm.', ['Dönüşüm danışmana bırakılıyor: danışman ... bırak', 'Tüm fabrikada birden başlanıyor: tüm fabrikaya aynı anda']),
      ]],
    ]),
    track('ie-tedarik', 'Tedarik Zinciri & Lojistik', 'cube', 'Stok, talep tahmini, lojistik', [
      ['Stok Yönetimi', 'Junior', [
        q('teknik', 'Ekonomik sipariş miktarı (EOQ) ve emniyet stoğu nedir?',
          ['EOQ: sipariş maliyeti, elde tutma, tutma maliyet, sipariş verme, sipariş masraf, ordering cost, holding cost', 'Emniyet stoğu: belirsizlik, güvenlik, tampon, yedek, safety stock, variab', 'Talep / tedarik süresi: talep, tedarik süresi, lead time', 'Hizmet seviyesi: hizmet seviyesi, service level'],
          'EOQ, sipariş verme ve elde tutma maliyetlerinin toplamını minimize eden sipariş miktarıdır. Emniyet stoğu, talep ve tedarik süresindeki belirsizliğe karşı tutulan ek stoktur; hedef hizmet seviyesine göre belirlenir.', ['EOQ en büyük sipariş sanılıyor: eoq ... en büyük sipariş; depoya sığabilecek en büyük', 'Emniyet stoğu eskimiş stok sanılıyor: emniyet stoğu ... süresi geçmiş']),
      ]],
      ['Talep & Dağıtım', 'Mid', [
        q('vaka', 'Talep tahmini sürekli sapıyor ve hem stoksuz kalma hem fazla stok var. Ne yaparsın?',
          ['Hata ölçümü: mape, hata, sapma, ölç', 'Segmentasyon: abc, segment, ürün grubu', 'Yöntem: zaman serisi, mevsimsellik, model, exponential smoothing, üstel düzeltme, mevsim', 'İş birliği: satış, pazarlama, s&op'],
          'Önce tahmin hatasını MAPE gibi bir metrikle ürün bazında ölçerim. Ürünleri ABC/XYZ analiziyle segmentleyip her gruba uygun yöntem (mevsimsellik içeren zaman serisi vb.) seçerim. Satış ve pazarlamanın kampanya bilgisini S&OP süreciyle tahmine katarım.', ['Stoğu katlamak tahminin yerine geçmez: stoğunu iki katına; tahmin yapmaya gerek']),
      ]],
      ['Tedarik Riski', 'Senior', [
        q('vaka', 'Tek tedarikçiye bağımlı kritik bir parça için tedarik riskini nasıl yönetirsin?',
          ['Risk analizi: risk, etki', 'Alternatif tedarikçi: alternatif tedarikçi, ikinci, alternatif, dual sourcing, yedek', 'Güvenlik stoğu: güvenlik stoğu, emniyet stoğu, buffer, safety stock, tampon stok', 'Sözleşme ve ilişki: sözleşme, ilişki, anlaşma, agreement, kontrat', 'Erken uyarı: erken uyarı, izle, takip, monitor, izli'],
          'Önce bu parçanın tedarik edilememesi durumunda üretime ve gelire etkisini hesaplayarak riski ölçerim. Kısa vadede talep değişkenliğine ve tedarik süresine göre bir güvenlik stoğu tutarım. Orta vadede alternatif tedarikçi bulup kalifiye eder, ikinci bir kaynak oluştururum. Mevcut tedarikçiyle kapasite taahhüdü içeren bir sözleşme yapar, ilişkiyi güçlendiririm. Tedarikçinin finansal durumu ve teslimat performansı için erken uyarı göstergeleriyle durumu izlerim.', ['Tek tedarikçi güvenli sanılıyor: tek tedarikçi ... en güvenli; başka tedarikçiye gerek yok']),
      ]],
    ]),
    track('ie-kalite', 'Kalite Yönetimi', 'ribbon', 'İstatistiksel kontrol, Six Sigma', [
      ['Kalite Araçları', 'Junior', [
        q('teknik', 'Kontrol grafikleri (SPC) ne işe yarar?',
          ['Süreç izleme: izle, süreç, zaman içinde, process, monitor', 'Kontrol limitleri: kontrol limit, ucl, lcl, sigma, üst sınır, alt sınır, out of control', 'Özel / genel neden: özel neden, genel neden, varyasyon, özel bir neden, değişkenlik, dalgalan, special cause, common cause, variation', 'Erken müdahale: erken, müdahale, aksiyon'],
          'Kontrol grafikleri bir sürecin zaman içindeki değişkenliğini izler. Ortalama ve ±3 sigma kontrol limitleri dışındaki noktalar ya da anormal desenler, özel bir nedene işaret eder; böylece hata ürüne dönüşmeden müdahale edilir.', ['Kontrol limitleri tolerans sanılıyor: kontrol limitleri müşterinin; kontrol limitleri tolerans']),
      ]],
      ['Six Sigma Vakası', 'Mid', [
        q('vaka', 'Müşteri şikâyetleri iki ayda ikiye katlandı. DMAIC ile nasıl ilerlersin?',
          ['Tanımla: tanımla, define, problem, netleştir', 'Ölç: ölç, measure, veri, kayıt, sayı', 'Analiz et: analiz, kök neden, pareto, sebep, analyze', 'İyileştir: iyileştir, improve, çözüm, düzelt', 'Kontrol et: kontrol, control, sürdür, takip'],
          'Tanımla: problemi ve hedefi netleştiririm. Ölç: şikâyetleri türüne göre sınıflandırıp veri toplarım. Analiz: Pareto ile en büyük kategorileri, balık kılçığıyla kök nedenleri bulurum. İyileştir: çözümleri pilot olarak uygularım. Kontrol: kontrol planı ve göstergelerle kazanımı sürdürürüm.', ['Veri olmadan çözüme atlanıyor: ilk adım hemen çözüm; veriye gerek yok']),
      ]],
      ['Kalite Sistemi', 'Senior', [
        q('vaka', 'ISO 9001 belgesi olan ama müşteri şikayetleri artan bir şirkette kalite sistemini nasıl etkin hale getirirsin?',
          ['Şikayet analizi: şikayet, pareto, şikâyet, complaint', 'Süreç sahipliği: süreç sahibi, process owner, owner, sahibi, sorumlu', 'Düzeltici faaliyet: düzeltici, kök neden, capa, 8d', 'KPI takibi: kpi, gösterge', 'Kalite kültürü: kültür, eğitim'],
          'Belge olması sistemin çalıştığı anlamına gelmez; önce şikayetleri pareto ile sınıflandırıp en büyük sorunları bulurum. Her süreç için gerçek yetkisi olan bir süreç sahibi belirlerim. Şikayetler için kök neden analizine dayalı düzeltici faaliyetler açıp etkinliğini kontrol ederim. Hata oranı ve müşteri şikayeti gibi KPI’ları yönetim toplantılarında düzenli takip ederim. Çalışanlara eğitim vererek kaliteyi denetim için değil günlük işin parçası olarak gören bir kültür kurarım.', ['Belge sistemin çalıştığını gösterir sanılıyor: sistem zaten etkin; belgeyi yenilemek yeterli; şikayetler müşterilerin hatası; belgesi varsa sistem çalışıyor']),
      ]],
    ]),
  ],
};

export const elektrik: Profession = {
  id: 'elektrik',
  name: 'Elektrik-Elektronik Müh.',
  icon: 'flash',
  color: '#C99A00',
  tagline: 'Güç, gömülü sistemler, haberleşme',
  tracks: [
    track('eee-guc', 'Güç Sistemleri', 'flash', 'Enerji iletimi, koruma, yenilenebilir', [
      ['Temeller', 'Junior', [
        q('teknik', 'Aktif, reaktif ve görünür güç arasındaki fark nedir? Güç faktörü neden önemlidir?',
          ['Aktif güç: aktif, watt, iş yapan, real power, faydalı iş', 'Reaktif güç: reaktif, var, manyetik, reactive', 'Görünür güç: görünür, va, apparent', 'Güç faktörü: güç faktörü, cos, kompanzasyon, power factor'],
          'Aktif güç (W) gerçek iş yapan güçtür; reaktif güç (VAr) bobin/kondansatörlerde salınan, iş yapmayan güçtür; görünür güç (VA) ikisinin vektörel toplamıdır. Düşük güç faktörü hatlarda gereksiz akım ve kayıp yaratır, bu yüzden kompanzasyon yapılır.', ['Reaktif güç iş yapar sanılıyor: reaktif güç de iş yapar; reaktif güç iş yapar', 'Düşük güç faktörü iyi sanılıyor: güç faktörünün 1 olması kötü; düşük olması tasarruf']),
        q('teknik', 'Bir elektrik tesisatında koruma elemanları nelerdir?',
          ['Sigorta / şalter: sigorta, şalter, mcb', 'Kaçak akım rölesi: kaçak akım, rcd', 'Topraklama: topraklama, toprakla, toprak hat, ground', 'Aşırı gerilim: aşırı gerilim, parafudr, surge, spd, ani gerilim'],
          'Aşırı akım ve kısa devreye karşı sigorta/otomatik şalter, insan hayatı için kaçak akım rölesi, dokunma gerilimine karşı topraklama ve yıldırım/aşırı gerilime karşı parafudr kullanılır.', ['Sigorta insanı korur sanılıyor: sigorta insanı; kaçak akım rölesine gerek yok', 'Topraklama her yerde gerekmez sanılıyor: topraklama ... sadece büyük; topraklamaya gerek yok']),
      ]],
      ['Saha Vakası', 'Mid', [
        q('vaka', 'Bir fabrikada sık sık şalter atıyor. Arızayı nasıl tespit edersin?',
          ['Güvenlik: güvenlik, enerjiyi kes, kilitle, loto, kilit, elektriği kes', 'Ölçüm: ölç, pens ampermetre, akım, izolasyon, megger, meger, clamp', 'Yük analizi: yük, aşırı yük, motor, load, overload', 'Kayıt / tekrar: kayıt, zaman, tekrar, log, not ed, saat'],
          'Önce güvenlik prosedürlerini (enerjiyi kesme, kilitleme) uygularım. Hangi zamanda ve hangi yükle attığını kayıt altına alırım. Pens ampermetreyle akımları, megerle izolasyonu ölçerim. Aşırı yük, kalkış akımı yüksek motor veya izolasyon hatası gibi nedenleri ayırt ederim.', ['Büyük şalter takmak çözüm sanılıyor: daha büyük amper; büyük amperli']),
      ]],
      ['Şebeke Planlama', 'Senior', [
        q('vaka', 'Yenilenebilir enerji payı artan bir şebekede kararlılığı nasıl sağlarsın?',
          ['Kesintili üretim: kesintili, değişken, intermittent', 'Enerji depolama: depolama, batarya, bess, storage', 'Esneklik: esnek, talep tarafı, demand response, talep yönet, yük azalt, flexib', 'Üretim tahmini: tahmin, forecast', 'Frekans ve iletim: frekans, iletim, frequency, grid, inertia, atalet'],
          'Güneş ve rüzgâr üretimi kesintili ve değişken olduğu için arz ile talebi anlık dengelemek zorlaşır. Bu nedenle hava durumuna dayalı doğru üretim tahmini planlamanın temelidir. Fazla üretimi saklayıp gerektiğinde veren batarya gibi enerji depolama sistemleri eklerim. Hızlı devreye giren esnek santraller ve talep tarafı katılımıyla esnekliği artırırım. İletim kapasitesini güçlendirip frekans kontrolü için gerekli yardımcı hizmetleri planlarım.', ['Yenilenebilir üretim sabit sanılıyor: sabit üretim yapar; depolamaya gerek yok; kararlılığı zaten artırır']),
      ]],
    ]),
    track('eee-gomulu', 'Gömülü Sistemler', 'hardware-chip', 'Mikrodenetleyici, firmware, RTOS', [
      ['Temeller', 'Junior', [
        q('teknik', 'Polling ile interrupt (kesme) arasındaki fark nedir?',
          ['Polling: polling, sürekli kontrol, döngü', 'Interrupt: interrupt, kesme, olay', 'Verimlilik: işlemci, enerji, verim', 'ISR kuralları: kısa, isr'],
          'Polling’de işlemci bir durumu döngüde sürekli kontrol eder ve boşa zaman harcar. Interrupt’ta donanım olay olduğunda işlemciyi uyarır ve ISR çalışır; bu daha verimli ve enerji dostudur. ISR’ları kısa tutmak gerekir.', ['Polling daha verimli sanılıyor: polling her zaman ... verimli; polling daha verimli', 'ISR uzun olabilir sanılıyor: isr içinde istediğin kadar uzun; isr ... uzun işlem yapabilir']),
        q('teknik', 'UART, SPI ve I2C protokollerini karşılaştırır mısın?',
          ['UART: uart, asenkron', 'SPI: spi, hızlı, chip select', 'I2C: i2c, adres, iki hat', 'Kullanım yeri: sensör, ekran, örneğin'],
          'UART iki hatlı asenkron seri iletişimdir. SPI saat hattı kullanan, hızlı, chip-select ile çok cihazlı bir protokoldür. I2C iki hat üzerinden adreslemeyle birçok cihaza bağlanır ama daha yavaştır. Örneğin sensörler için I2C, hızlı ekranlar için SPI tercih edilir.', ['I2C en hızlısı sanılıyor: i2c en hızlı', 'SPI iki hatlı sanılıyor: spi ise sadece iki hat; spi iki hat', 'UART senkron sanılıyor: uart senkron']),
      ]],
      ['Firmware Vakası', 'Mid', [
        q('vaka', 'Pil ile çalışan bir cihazın pil ömrü beklenenin yarısı. Nasıl iyileştirirsin?',
          ['Akım ölçümü: ölç, akım, profil, multimetre, current', 'Uyku modları: uyku, sleep, düşük güç', 'Çevre birimleri: çevre birim, sensör, kapat, peripheral, clock gating', 'Haberleşme sıklığı: gönderim, radyo, sıklık, ble, advertising, interval, gönder, lora'],
          'Önce farklı modlarda akım tüketimini ölçerim. İşlemciyi boşta derin uyku moduna alır, kullanılmayan çevre birimlerini kapatırım. Radyo gibi en çok tüketen birimlerin gönderim sıklığını azaltıp veriyi toplu gönderirim.', ['Sürekli açık kalmak pili korur sanılıyor: sürekli açık kalırsa; saat frekansını en yükseğe']),
      ]],
      ['Ürün Mimarisi', 'Senior', [
        q('vaka', 'Sahada binlerce cihazı olan bir üründe güvenli uzaktan güncelleme (OTA) mimarisini nasıl tasarlarsın?',
          ['İmzalı imaj: imza, doğrula, sign, secure boot', 'İki bölüm ve geri dönüş: iki bölüm, geri dön, partition, a/b, rollback, eski sürüm, yedek', 'Kademeli dağıtım: kademeli, staged, canary, rollout, aşamalı', 'Kesintiye dayanıklılık: kesinti, kesil, yarıda, power loss, atomic', 'İzleme: izle, izli, monitor, telemetr'],
          'Firmware imajlarını dijital olarak imzalar, cihazın yüklemeden önce imzayı doğrulamasını sağlarım. Flash belleği iki bölüm olarak tasarlarım; yeni sürüm açılmazsa cihaz otomatik olarak eski sürüme geri döner. Güncellemeyi önce küçük bir gruba, sonra kademeli olarak tüm filoya dağıtırım. Güç kesintisi ya da bağlantı kopması gibi durumlarda güncellemenin yarım kalıp cihazı bozmamasını garanti ederim. Cihazlardan gelen sürüm ve hata bilgisini izleyip sorun görürsem dağıtımı durdururum.', ['Herkese aynı anda dağıtmak güvenli sanılıyor: tüm cihazlara aynı anda; imzaya gerek yok']),
      ]],
    ]),
    track('eee-haberlesme', 'Haberleşme & RF', 'radio', 'Sinyal, modülasyon, anten', [
      ['Temeller', 'Junior', [
        q('teknik', 'Modülasyon nedir, AM ve FM arasındaki fark nedir?',
          ['Tanım: taşıyıcı, bilgi, modülasyon, carrier, modulation', 'AM: genlik, am', 'FM: frekans, fm', 'Gürültü dayanımı: gürültü, kalite, bant genişliği, noise, bandwidth, parazit, bant'],
          'Modülasyon, bilgiyi yüksek frekanslı bir taşıyıcı sinyal üzerine yüklemektir. AM’de taşıyıcının genliği, FM’de frekansı değiştirilir. FM gürültüye daha dayanıklıdır ama daha fazla bant genişliği kullanır.', ['AM ve FM karıştırılıyor: am\'de frekans değiştirilir; am’de frekans değiştirilir; fm\'de genlik değiştirilir; fm’de genlik değiştirilir', 'AM gürültüye dayanıklı sanılıyor: am gürültüye daha dayanıklı']),
      ]],
      ['Sistem Vakası', 'Mid', [
        q('vaka', 'Kablosuz bir bağlantıda paket kaybı yüksek. Neyi kontrol edersin?',
          ['Sinyal gücü: sinyal, rssi, snr', 'Girişim: girişim, kanal, parazit, interference', 'Anten / mesafe: anten, mesafe, engel', 'Protokol ayarları: güç, hız, tekrar, retry, power'],
          'Önce RSSI ve SNR değerlerine bakarım. Spektrum analizörü ile aynı kanalda girişim olup olmadığını kontrol eder, gerekirse kanal değiştiririm. Anten yönü, mesafe ve engelleri incelerim; iletim gücü, veri hızı ve tekrar gönderim ayarlarını optimize ederim.', ['Gücü artırmak her zaman çözer sanılıyor: gücünü sonuna kadar artır; her zaman çözüm budur', 'Girişim önemsiz sanılıyor: girişim ... önemli değil']),
      ]],
      ['Ağ Planlama', 'Senior', [
        q('vaka', 'Bir şehirde yeni bir mobil baz istasyonu ağı planlarken nelere dikkat edersin?',
          ['Kapsama: kapsama, coverage', 'Kapasite: kapasite, kullanıcı yoğunluğu, capacity, small cell, küçük hücre', 'Frekans ve girişim: frekans, girişim, frequency, interference', 'Saha ve maliyet: saha, maliyet, site, tco, kira, pahalı', 'Ölçüm ve optimizasyon: drive test, optimiz, ölçüm'],
          'Önce şehrin coğrafyası ve binalarına göre bir kapsama hedefi ve yayılım modeli oluştururum. Kullanıcı yoğunluğu yüksek bölgelerde kapasite için daha küçük hücreler planlarım. Komşu hücreler arasındaki girişimi azaltmak için frekans planlaması yaparım. Saha kiralama, enerji ve kurulum maliyetini dikkate alarak istasyon yerlerini seçerim. Kurulumdan sonra drive test ölçümleriyle ağı optimize ederim.', ['Girişim önemsiz sanılıyor: girişim sorun olmaz; bütün istasyonlara aynı frekans']),
      ]],
    ]),
  ],
};

export const makine: Profession = {
  id: 'makine',
  name: 'Makine Mühendisliği',
  icon: 'cog',
  color: '#5A6B85',
  tagline: 'Tasarım, enerji, bakım',
  tracks: [
    track('me-tasarim', 'Tasarım & İmalat', 'cog', 'CAD, malzeme, toleranslar', [
      ['Temeller', 'Junior', [
        q('teknik', 'Gerilme-şekil değiştirme (stress-strain) eğrisini açıklar mısın?',
          ['Elastik bölge: elastik, hooke, doğrusal, elastic, linear', 'Akma: akma, yield', 'Çekme dayanımı: çekme dayanımı, maksimum, uts', 'Kopma: kopma, süneklik, fracture, ductil, brittle'],
          'Başta gerilme ile şekil değiştirme doğrusal orantılıdır (Hooke yasası, elastik bölge). Akma noktasından sonra kalıcı şekil değişimi başlar. Eğrinin tepe noktası çekme dayanımıdır, sonrasında boyun verme ve kopma gelir. Kopmaya kadar uzama sünekliği gösterir.', ['Eğri tamamen doğrusal sanılıyor: eğrinin tamamı doğrusal', 'Akma kopma sanılıyor: akma noktası ... koptuğu nokta']),
        q('teknik', 'Tolerans ve geçme (fit) türleri nelerdir?',
          ['Tolerans: tolerans, sapma, ölçü, tolerance', 'Boşluklu geçme: boşluklu, clearance', 'Sıkı geçme: sıkı, pres, interference', 'Ara geçme: ara geçme, geçiş, transition'],
          'Tolerans, bir ölçünün kabul edilebilir sapma aralığıdır. Mil ve delik arasında her zaman boşluk kalan boşluklu geçme, her zaman sıkılık olan sıkı (pres) geçme ve ikisi arasında kalan ara geçme vardır. Seçim, parçanın dönmesi veya sabit kalması ihtiyacına göre yapılır.', ['Sıkı ve boşluklu geçme karıştırılıyor: sıkı geçmede mil delikten küçük; boşluklu geçmede ise mil delikten büyük; boşluklu geçmede mil delikten büyük', 'Dar tolerans hep iyi sanılıyor: tolerans ne kadar dar olursa o kadar iyi']),
      ]],
      ['Tasarım Vakası', 'Mid', [
        q('vaka', 'Sahada bir mil sürekli kırılıyor. Nasıl incelersin?',
          ['Kırık yüzey analizi: kırık yüzey, yorulma, plaj izi, fatigue, fractograf, beach mark', 'Yük analizi: yük, gerilme, hesap, fea, stress', 'Malzeme kontrolü: malzeme, sertlik, ısıl işlem, hardness, heat treatment', 'Tasarım iyileştirme: çentik, köşe, radyus, tasarım, fillet, radius'],
          'Önce kırık yüzeyini incelerim; plaj izleri yorulma kırılmasına işaret eder. Gerçek yükleri ve gerilmeleri hesaplar, kama yuvası gibi gerilme yığılması noktalarına bakarım. Malzeme ve ısıl işlemi kontrol eder, gerekirse radyusları büyütüp malzemeyi değiştiririm.', ['Kırık incelenmeden çap büyütülüyor: kırık yüzeyine bakmaya gerek yok; sadece çapı']),
      ]],
      ['Maliyet Odaklı Tasarım', 'Senior', [
        q('vaka', 'Yeni bir ürünün maliyetini %15 düşürmen istendi. Tasarım tarafında nasıl yaklaşırsın?',
          ['Maliyet kırılımı: maliyet kırılım, pareto, cost breakdown, bom', 'Değer mühendisliği: değer mühendis, va/ve, value engineering, işlev', 'İmalata uygun tasarım: imalat, montaj, dfm, dfa, part count', 'Standart parça ve malzeme: standart parça, malzeme, off-the-shelf, katalog, hazır parça', 'Doğrulama: test, doğrula, validation'],
          'Önce ürünün maliyet kırılımını çıkarıp pareto ile en pahalı parçalara odaklanırım. Değer mühendisliği oturumlarında her parçanın işlevini sorgular, gereksiz özellikleri çıkarırım. İmalat ve montaj kolaylığı için parça sayısını azaltır, toleransları gözden geçiririm. Özel parçalar yerine standart parça ve daha uygun malzeme alternatiflerini değerlendiririm. Her değişikliği test ile doğrulayarak kalite ve güvenlikten ödün vermediğimden emin olurum.', ['Test atlanabilir sanılıyor: testlere gerek yok; teste gerek yok; müşteri farkı anlamaz']),
      ]],
    ]),
    track('me-enerji', 'Termodinamik & Enerji', 'thermometer', 'Isı transferi, HVAC, verimlilik', [
      ['Temeller', 'Junior', [
        q('teknik', 'Termodinamiğin birinci ve ikinci yasasını açıklar mısın?',
          ['Birinci yasa: enerji korunumu, birinci, first law, energy conservation, enerji kaybolmaz', 'İkinci yasa: entropi, ikinci, entropy, second law', 'Verim sınırı: verim, carnot, %100, efficiency', 'Isı akışı yönü: sıcaktan soğuğa'],
          'Birinci yasa enerjinin korunumudur: enerji yoktan var edilemez, sadece biçim değiştirir. İkinci yasa entropinin arttığını söyler; ısı kendiliğinden sıcaktan soğuğa akar ve hiçbir ısı makinesi %100 verimli olamaz, üst sınır Carnot verimidir.', ['%100 verim mümkün sanılıyor: %100 verimle çalışabilir; yüzde yüz verimle çalışabilir', 'Isı soğuktan sıcağa kendiliğinden akar sanılıyor: soğuktan sıcağa kendiliğinden akar']),
      ]],
      ['Enerji Vakası', 'Mid', [
        q('vaka', 'Bir binanın ısınma maliyeti çok yüksek. Enerji verimliliği için ne önerirsin?',
          ['Kayıp analizi: kayıp, termal kamera, analiz, heat loss, audit, thermograph', 'Yalıtım: yalıtım, pencere, insulation', 'Sistem verimi: kazan, ısı pompası, verim, boiler, heat pump, kombi', 'Kontrol: termostat, otomasyon, zaman, bms, schedul', 'Geri ödeme: geri ödeme, maliyet, payback, roi, geri öde'],
          'Önce termal kamera ve tüketim verisiyle ısı kayıplarının nerede olduğunu bulurum. Yalıtım ve pencere iyileştirmeleri, verimli kazan veya ısı pompası ve akıllı termostat/zamanlama önerilerini geri ödeme süresine göre önceliklendiririm.', ['Kazanı sürekli en yüksekte çalıştırmak tasarruf sanılıyor: sürekli çalışan kazan daha az; en yüksek sıcaklıkta çalıştır', 'Yalıtım sadece yazın işe yarar sanılıyor: yalıtım ... sadece yazın']),
      ]],
      ['Enerji Yönetimi', 'Senior', [
        q('vaka', 'Bir tesisin enerji tüketimini azaltmak için nasıl bir program yürütürsün?',
          ['Enerji etüdü: etüt, ölçüm, etüd, audit, sub-meter, baseline', 'Büyük tüketiciler: büyük tüketici, significant energy, seu, kompresör', 'İyileştirme projeleri: atık ısı, yalıtım, frekans, vfd, heat recovery, kaçak', 'Geri ödeme süresi: geri ödeme, payback', 'Sürekli izleme: izle, 50001, izli, monitor, enpi'],
          'Önce sayaç ve ölçüm verileriyle bir enerji etüdü yapıp tüketimin dağılımını çıkarırım. Kompresör, kazan ve soğutma gibi büyük tüketicilere odaklanırım. Atık ısı geri kazanımı, yalıtım ve motorlarda frekans konvertörü gibi projeleri listelerim. Projeleri yatırım tutarı ve geri ödeme süresine göre önceliklendiririm. ISO 50001 yaklaşımıyla tüketimi sürekli izleyip hedeflerle karşılaştırırım.', ['Büyük motor az enerji harcar sanılıyor: büyük motor daha az enerji; ölçüm yapmaya gerek yok']),
      ]],
    ]),
    track('me-bakim', 'Bakım & Güvenilirlik', 'build', 'Önleyici bakım, arıza analizi', [
      ['Bakım Stratejileri', 'Junior', [
        q('teknik', 'Reaktif, önleyici ve kestirimci bakım arasındaki fark nedir?',
          ['Reaktif: arıza sonrası, reaktif, run-to-failure, corrective', 'Önleyici: periyodik, önleyici, plan, time-based, preventive', 'Kestirimci: kestirimci, titreşim, durum izleme, sensör, condition, pdm, predictive, vibration', 'Maliyet dengesi: maliyet, duruş, downtime, cost'],
          'Reaktif bakım arıza olduktan sonra yapılır. Önleyici bakım belirli periyotlarda planlıdır. Kestirimci bakımda titreşim, sıcaklık gibi durum verileri izlenip arıza öncesi müdahale edilir. Doğru karışım, duruş maliyeti ile bakım maliyetini dengeler.', ['Kestirimci bakım arıza sonrası sanılıyor: kestirimci bakım ... bozulduktan sonra', 'Önleyici bakım arıza olunca yapılır sanılıyor: önleyici bakım ise arıza olunca; önleyici bakım arıza olunca']),
      ]],
      ['Güvenilirlik Vakası', 'Mid', [
        q('vaka', 'Kritik bir pompa ayda iki kez arızalanıyor. Ne yaparsın?',
          ['Veri toplama: arıza kaydı, mtbf, veri, bakım defter, failure history, kayıt', 'Kök neden analizi: kök neden, rca, 5 neden', 'Durum izleme: titreşim, sıcaklık, izle, vibration, monitor', 'Kalıcı çözüm: hizalama, yağlama, değiştir, hizala, alignment, seal'],
          'Arıza kayıtlarından MTBF ve arıza türlerini çıkarırım. Kök neden analiziyle hizalama, kavitasyon veya yağlama gibi nedenleri araştırırım. Titreşim izleme ekleyip sorunu kalıcı çözer, pompa kritikse yedek planı oluştururum.', ['Sık arıza normal sanılıyor: için normaldir; bir şey yapmaya gerek yok']),
      ]],
      ['Bakım Stratejisi', 'Senior', [
        q('vaka', 'Arıza kaynaklı duruşları azaltmak için bir tesisin bakım stratejisini nasıl dönüştürürsün?',
          ['Kritiklik analizi: kritik, critical', 'Kestirimci bakım: kestirimci, titreşim, condition monitoring, predictive', 'OEE ve MTBF: oee, mtbf', 'Yedek parça planı: yedek parça, spare part', 'Otonom bakım: otonom, operatör, autonomous, tpm'],
          'Önce ekipmanları üretime etkisine göre kritiklik analizi ile sınıflandırırım. Kritik ekipmanlarda titreşim ve sıcaklık sensörleriyle kestirimci bakıma geçerim. Başarıyı OEE ve arızalar arası ortalama süre (MTBF) ile ölçerim. Kritik ekipmanlar için yedek parça stoğunu ve bakım planını gözden geçiririm. Temizlik ve basit kontrolleri operatörlere vererek otonom bakımı başlatırım.', ['Kritiklik analizi gereksiz sanılıyor: kritiklik analizine gerek yok', 'Operatör bakıma karışmamalı sanılıyor: operatörler makineye asla dokunmamalı; operatörler ... asla dokunmamalı']),
      ]],
    ]),
  ],
};

export const insaat: Profession = {
  id: 'insaat',
  name: 'İnşaat Mühendisliği',
  icon: 'business',
  color: '#C2410C',
  tagline: 'Yapı, şantiye, geoteknik',
  tracks: [
    track('ce-yapi', 'Yapı & Statik', 'business', 'Taşıyıcı sistem, deprem', [
      ['Temeller', 'Junior', [
        q('teknik', 'Betonarmede beton ve çeliğin rolleri nelerdir?',
          ['Beton basınç: basınç, basma, compress, ezil', 'Çelik çekme: donatı, çekme, tensile, rebar, demir', 'Aderans: aderans, birlikte çalış, bond, tutun, kavra', 'Paspayı: paspayı, korozyon, örtü, pas, cover'],
          'Beton basınca dayanıklı ama çekmeye zayıftır; çelik donatı çekme kuvvetlerini karşılar. İkisi aderans sayesinde birlikte çalışır. Paspayı donatıyı korozyon ve yangına karşı korur.', ['Beton çekmeye dayanıklı sanılıyor: beton çekmeye ... dayanıklı; çelik ise basıncı taşır; çelik basıncı taşır', 'Paspayı gereksiz sanılıyor: paspayı sadece görüntü; paspayına gerek yok']),
        q('teknik', 'Depreme dayanıklı yapı tasarımında temel prensipler nelerdir?',
          ['Süneklik: süneklik, sünek, ductil, esne', 'Kuvvetli kolon zayıf kiriş: kuvvetli kolon, strong column, güçlü kolon, zayıf kiriş', 'Düzenlilik: düzenli, simetri, burulma, regular, soft story, yumuşak kat', 'Zemin etkisi: zemin, soil', 'Yönetmelik: yönetmelik, tbdy'],
          'Yapının sünek davranması, kuvvetli kolon–zayıf kiriş ilkesi, planda ve düşeyde düzenlilik (burulma ve yumuşak kat oluşmaması) ve zemin koşullarının dikkate alınması temel prensiplerdir. Türkiye’de Bina Deprem Yönetmeliği’ne (TBDY) uyulur.', ['Kolon kirişten zayıf olabilir sanılıyor: kolonlar kirişlerden zayıf olabilir; zemin önemli değil; çok rijit ve ağır olması']),
      ]],
      ['Yapı Vakası', 'Mid', [
        q('vaka', 'Mevcut bir binada kolonlarda çatlaklar tespit edildi. Nasıl ilerlersin?',
          ['Yerinde inceleme: yerinde, çatlak, ölç', 'Malzeme testi: karot, beton dayanımı, test, core, laboratuvar', 'Analiz: analiz, model, performans, hesap, pushover', 'Güçlendirme: güçlendirme, mantolama, frp, manto, cfrp, jacket, retrofit'],
          'Önce çatlakların türünü, genişliğini ve yerini inceleyip kayıt altına alırım. Karot ile beton dayanımını ve donatı durumunu tespit ederim. Yapının performans analizini yapar, sonuca göre mantolama, FRP sargı gibi güçlendirme veya yıkım kararı öneririm.', ['Kolon çatlağı kozmetik sanılıyor: her zaman kozmetik; sadece sıva çatlağı', 'Boyamak yeterli sanılıyor: boyayıp kapatmak yeterli; teste gerek yok']),
      ]],
      ['Mevcut Yapılar', 'Senior', [
        q('vaka', 'Mevcut bir binanın deprem performansını nasıl değerlendirir ve güçlendirme kararını nasıl verirsin?',
          ['Yerinde inceleme: inceleme, karot, survey, core', 'Beton dayanımı: beton, dayanım, concrete', 'Performans analizi: analiz, performans', 'Güçlendirme seçenekleri: güçlendirme, perde, retrofit, shear wall, mantola', 'Maliyet-fayda: maliyet, yıkıp, cost, yıkım, demolit'],
          'Önce yerinde inceleme yapıp projeyle uygulamayı karşılaştırır, donatı tespiti ve karot örnekleri alırım. Karotlarla beton dayanımını, tespitlerle donatı durumunu belirlerim. Bu verilerle yönetmeliğe uygun bir performans analizi yapıp binanın hedef performansı sağlayıp sağlamadığına bakarım. Yetersizse betonarme perde ekleme ya da kolon mantolama gibi güçlendirme seçeneklerini değerlendiririm. Güçlendirme maliyeti yeni yapıya yakınsa yıkıp yeniden yapmanın daha doğru olduğunu öneririm.', ['Ayakta duran bina sağlam sanılıyor: ayakta durduğuna göre; analize gerek yok', 'Güçlendirme hep pahalı sanılıyor: güçlendirme her zaman ... pahalı']),
      ]],
    ]),
    track('ce-santiye', 'Şantiye & Proje Yönetimi', 'hammer', 'Planlama, maliyet, iş güvenliği', [
      ['Planlama', 'Junior', [
        q('teknik', 'Kritik yol yöntemi (CPM) nedir?',
          ['İş ağı: aktivite, bağımlılık, ağ, activity, network, predecessor', 'Kritik yol: kritik yol, en uzun, critical path', 'Bolluk: bolluk, float', 'Kullanım: süre, gecikme, takip'],
          'CPM, proje aktivitelerini bağımlılıklarıyla bir ağda gösterir. Başlangıçtan bitişe en uzun süreli yol kritik yoldur; buradaki herhangi bir gecikme projeyi geciktirir. Kritik olmayan işlerin bolluğu (float) vardır.', ['Kritik yol en kısa yol sanılıyor: kritik yol projedeki en kısa; kritik yol ... en kısa', 'Kritik işlerin bolluğu var sanılıyor: kritik yoldaki işlerin bolluğu en fazla; kritik yoldaki işler ... kayabilir']),
      ]],
      ['Şantiye Vakası', 'Mid', [
        q('vaka', 'Proje 3 hafta gecikmede ve bütçe aşımı var. Ne yaparsın?',
          ['Durum analizi: analiz, neden, kritik yol, critical path, slippage', 'Hızlandırma: hızlandır, ek ekip, vardiya, crashing, fast-track, taşeron, hafta sonu, mesai', 'Maliyet kontrolü: maliyet, bütçe, kazanılmış değer, evm, cpi, harcama', 'İletişim: işveren, rapor, bilgilendir, client, recovery plan'],
          'Önce gecikmenin nedenini ve kritik yolu analiz ederim. Kritik işleri ek ekip veya vardiyayla hızlandırma ve paralel yürütme seçeneklerini maliyetiyle değerlendiririm. Kazanılmış değer analiziyle bütçeyi izler, işverene gerçekçi bir revize planı sunarım.', ['İşveren bilgilendirilmiyor: işverene hiçbir şey; durumu gizle; testleri atla']),
      ]],
      ['Maliyet Kontrolü', 'Senior', [
        q('vaka', 'Proje bütçesini %20 aşma riski var. Ne yaparsın?',
          ['Sapma analizi: sapma, kalem, variance', 'Alternatif çözümler: alternatif, değer mühendis, ve öneri, value engineering', 'Sözleşme ve değişiklikler: sözleşme, değişiklik, change order, claim, hak talebi', 'İşveren iletişimi: işveren, client', 'Kazanılmış değer: kazanılmış değer, evm, cpi'],
          'Önce bütçe sapmasını iş kalemi bazında inceleyip aşımın nereden geldiğini bulurum. Malzeme fiyatı, verimlilik kaybı ya da kapsam artışı gibi nedenleri ayırırım. Kalan işler için değer mühendisliği ile kaliteyi düşürmeyen alternatif çözümler ararım. Kapsam değişikliği varsa sözleşmeye göre değişiklik talebi hazırlarım. İşveren ile erken ve şeffaf iletişim kurar, ilerlemeyi kazanılmış değer yöntemiyle haftalık izlerim.', ['İşverene haber vermeden malzeme değiştiriliyor: haber vermeden ... ucuz malzeme; işverene haber vermeden']),
      ]],
    ]),
    track('ce-geoteknik', 'Geoteknik', 'earth', 'Zemin, temel, şev', [
      ['Zemin', 'Junior', [
        q('teknik', 'Zemin etüdü neden yapılır, hangi deneyler kullanılır?',
          ['Amaç: taşıma gücü, oturma, zemin, bearing, settlement, otur', 'Sondaj: sondaj, borehole, kuyu', 'SPT: spt, standart penetrasyon', 'Laboratuvar: laboratuvar, numune, lab, sample, örnek'],
          'Zemin etüdü, zeminin taşıma gücünü, oturma davranışını ve yeraltı suyunu belirleyip uygun temel tipini seçmek için yapılır. Sondajlar, SPT gibi arazi deneyleri ve alınan numunelerle laboratuvar deneyleri kullanılır.', ['Zemin etüdü her binada gerekmez sanılıyor: sadece çok katlı binalarda; gözle kontrol etmek yeterli']),
      ]],
      ['Temel Vakası', 'Mid', [
        q('vaka', 'Zayıf ve yeraltı suyu yüksek bir zeminde temel tipi nasıl seçilir?',
          ['Kazıklı temel: kazık, pile, deep foundation', 'Radye temel: radye, mat foundation, raft', 'Zemin iyileştirme: iyileştirme, jet grout, enjeksiyon, ground improvement, stone column', 'Su kontrolü: drenaj, su, yalıtım, dewater, waterproof'],
          'Yüzeyde taşıma gücü yetersizse yükü sağlam tabakaya aktaran kazıklı temel ya da yükü geniş alana yayan radye temel düşünülür. Alternatif olarak jet grout gibi zemin iyileştirme yapılabilir. Yeraltı suyu için drenaj ve su yalıtımı planlanır.', ['Yeraltı suyu sorun değil sanılıyor: yeraltı suyu temele zarar vermez; yalıtıma gerek yok; tekil temel en iyisi']),
      ]],
      ['Derin Kazılar', 'Senior', [
        q('vaka', 'Derin bir kazıda komşu binalara zarar verme riskini nasıl yönetirsin?',
          ['Zemin etüdü: zemin etüd, sondaj, geotechnical, investigation', 'İksa tasarımı: iksa, ankraj, anchor, shoring, secant', 'Yeraltı suyu: yeraltı suyu, drenaj, dewater', 'İzleme: inklinometre, ölçüm, inclinometer, monitoring', 'Komşu bina tespiti: tespit, komşu'],
          'Önce sondajlarla yeterli bir zemin etüdü yapıp zemin parametrelerini belirlerim. Kazı derinliği ve zemine göre fore kazık ve ankraj gibi bir iksa sistemi tasarlarım. Yeraltı suyu varsa drenaj ve su kesme önlemlerini planlarım. Kazıdan önce komşu binaların mevcut durumunu fotoğraf ve raporla tespit ederim. Kazı süresince inklinometre ve deplasman ölçümleriyle iksayı izleyip sınır değer aşılırsa çalışmayı durdururum.', ['İksa gereksiz sanılıyor: iksaya gerek yok; zemin kendini taşır; tek seferde tam derinliğe']),
      ]],
    ]),
  ],
};
