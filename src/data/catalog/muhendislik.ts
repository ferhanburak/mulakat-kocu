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
          ['Fazla üretim: fazla üretim, aşırı üretim', 'Bekleme: bekleme', 'Taşıma / hareket: taşıma, hareket', 'Stok: stok, envanter', 'Hatalı ürün: hata, kusur, hurda'],
          'Fazla üretim, bekleme, gereksiz taşıma, fazla işlem, fazla stok, gereksiz hareket ve hatalı ürün. Yalın yaklaşım müşteriye değer katmayan bu adımları görünür kılıp azaltmayı hedefler.'),
        q('teknik', 'Darboğaz (bottleneck) nedir, nasıl tespit edersin?',
          ['Tanım: en yavaş, kapasite, darboğaz', 'Tespit: bekleyen, kuyruk, stok birik, ölç', 'Kısıtlar teorisi: kısıt, toc', 'İyileştirme: kapasite artır, dengele'],
          'Darboğaz, sistemin toplam çıktısını sınırlayan en düşük kapasiteli adımdır. Önünde iş/stok biriken ve kullanım oranı en yüksek istasyonu ölçerek bulurum. Kısıtlar Teorisi’ne göre önce o adımı tam kullanır, sonra kapasitesini artırırım.'),
      ]],
      ['İyileştirme Vakası', 'Mid', [
        q('vaka', 'Bir montaj hattında çevrim süresi hedefin %20 üzerinde. Ne yaparsın?',
          ['Mevcut durumu ölçme: zaman etüdü, ölç, gözlem', 'Hat dengeleme: dengele, iş yükü, istasyon', 'Kök neden: kök neden, 5 neden, balık kılçığı', 'Standart iş: standart, talimat, smed'],
          'Önce zaman etüdü ile her istasyonun sürelerini ölçerim. İş yükü dengesizse hat dengeleme yaparım; duruş ve ayar süreleri yüksekse SMED uygularım. Kök nedenleri 5 Neden ile bulur, iyileşmeyi standart iş talimatıyla kalıcı hale getiririm.'),
      ]],
    ]),
    track('ie-tedarik', 'Tedarik Zinciri & Lojistik', 'cube', 'Stok, talep tahmini, lojistik', [
      ['Stok Yönetimi', 'Junior', [
        q('teknik', 'Ekonomik sipariş miktarı (EOQ) ve emniyet stoğu nedir?',
          ['EOQ: eoq, ekonomik sipariş, sipariş maliyeti, elde tutma', 'Emniyet stoğu: emniyet stoğu, belirsizlik, güvenlik', 'Talep / tedarik süresi: talep, tedarik süresi, lead time', 'Hizmet seviyesi: hizmet seviyesi'],
          'EOQ, sipariş verme ve elde tutma maliyetlerinin toplamını minimize eden sipariş miktarıdır. Emniyet stoğu, talep ve tedarik süresindeki belirsizliğe karşı tutulan ek stoktur; hedef hizmet seviyesine göre belirlenir.'),
      ]],
      ['Talep & Dağıtım', 'Mid', [
        q('vaka', 'Talep tahmini sürekli sapıyor ve hem stoksuz kalma hem fazla stok var. Ne yaparsın?',
          ['Hata ölçümü: mape, hata, sapma, ölç', 'Segmentasyon: abc, segment, ürün grubu', 'Yöntem: zaman serisi, mevsimsellik, model', 'İş birliği: satış, pazarlama, s&op'],
          'Önce tahmin hatasını MAPE gibi bir metrikle ürün bazında ölçerim. Ürünleri ABC/XYZ analiziyle segmentleyip her gruba uygun yöntem (mevsimsellik içeren zaman serisi vb.) seçerim. Satış ve pazarlamanın kampanya bilgisini S&OP süreciyle tahmine katarım.'),
      ]],
    ]),
    track('ie-kalite', 'Kalite Yönetimi', 'ribbon', 'İstatistiksel kontrol, Six Sigma', [
      ['Kalite Araçları', 'Junior', [
        q('teknik', 'Kontrol grafikleri (SPC) ne işe yarar?',
          ['Süreç izleme: izle, süreç, zaman içinde', 'Kontrol limitleri: kontrol limit, ucl, lcl, sigma', 'Özel / genel neden: özel neden, genel neden, varyasyon', 'Erken müdahale: erken, müdahale'],
          'Kontrol grafikleri bir sürecin zaman içindeki değişkenliğini izler. Ortalama ve ±3 sigma kontrol limitleri dışındaki noktalar ya da anormal desenler, özel bir nedene işaret eder; böylece hata ürüne dönüşmeden müdahale edilir.'),
      ]],
      ['Six Sigma Vakası', 'Mid', [
        q('vaka', 'Müşteri şikâyetleri iki ayda ikiye katlandı. DMAIC ile nasıl ilerlersin?',
          ['Tanımla: tanımla, define, problem', 'Ölç: ölç, measure, veri', 'Analiz et: analiz, kök neden, pareto', 'İyileştir: iyileştir, improve, çözüm', 'Kontrol et: kontrol, control, sürdür'],
          'Tanımla: problemi ve hedefi netleştiririm. Ölç: şikâyetleri türüne göre sınıflandırıp veri toplarım. Analiz: Pareto ile en büyük kategorileri, balık kılçığıyla kök nedenleri bulurum. İyileştir: çözümleri pilot olarak uygularım. Kontrol: kontrol planı ve göstergelerle kazanımı sürdürürüm.'),
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
          ['Aktif güç: aktif, watt, iş yapan', 'Reaktif güç: reaktif, var, manyetik', 'Görünür güç: görünür, va', 'Güç faktörü: güç faktörü, cos, kompanzasyon'],
          'Aktif güç (W) gerçek iş yapan güçtür; reaktif güç (VAr) bobin/kondansatörlerde salınan, iş yapmayan güçtür; görünür güç (VA) ikisinin vektörel toplamıdır. Düşük güç faktörü hatlarda gereksiz akım ve kayıp yaratır, bu yüzden kompanzasyon yapılır.'),
        q('teknik', 'Bir elektrik tesisatında koruma elemanları nelerdir?',
          ['Sigorta / şalter: sigorta, şalter, mcb', 'Kaçak akım rölesi: kaçak akım, rcd', 'Topraklama: topraklama', 'Aşırı gerilim: aşırı gerilim, parafudr'],
          'Aşırı akım ve kısa devreye karşı sigorta/otomatik şalter, insan hayatı için kaçak akım rölesi, dokunma gerilimine karşı topraklama ve yıldırım/aşırı gerilime karşı parafudr kullanılır.'),
      ]],
      ['Saha Vakası', 'Mid', [
        q('vaka', 'Bir fabrikada sık sık şalter atıyor. Arızayı nasıl tespit edersin?',
          ['Güvenlik: güvenlik, enerjiyi kes, kilitle', 'Ölçüm: ölç, pens ampermetre, akım, izolasyon', 'Yük analizi: yük, aşırı yük, motor', 'Kayıt / tekrar: kayıt, zaman, tekrar'],
          'Önce güvenlik prosedürlerini (enerjiyi kesme, kilitleme) uygularım. Hangi zamanda ve hangi yükle attığını kayıt altına alırım. Pens ampermetreyle akımları, megerle izolasyonu ölçerim. Aşırı yük, kalkış akımı yüksek motor veya izolasyon hatası gibi nedenleri ayırt ederim.'),
      ]],
    ]),
    track('eee-gomulu', 'Gömülü Sistemler', 'hardware-chip', 'Mikrodenetleyici, firmware, RTOS', [
      ['Temeller', 'Junior', [
        q('teknik', 'Polling ile interrupt (kesme) arasındaki fark nedir?',
          ['Polling: polling, sürekli kontrol, döngü', 'Interrupt: interrupt, kesme, olay', 'Verimlilik: işlemci, enerji, verim', 'ISR kuralları: kısa, isr'],
          'Polling’de işlemci bir durumu döngüde sürekli kontrol eder ve boşa zaman harcar. Interrupt’ta donanım olay olduğunda işlemciyi uyarır ve ISR çalışır; bu daha verimli ve enerji dostudur. ISR’ları kısa tutmak gerekir.'),
        q('teknik', 'UART, SPI ve I2C protokollerini karşılaştırır mısın?',
          ['UART: uart, asenkron', 'SPI: spi, hızlı, chip select', 'I2C: i2c, adres, iki hat', 'Kullanım yeri: sensör, ekran, örneğin'],
          'UART iki hatlı asenkron seri iletişimdir. SPI saat hattı kullanan, hızlı, chip-select ile çok cihazlı bir protokoldür. I2C iki hat üzerinden adreslemeyle birçok cihaza bağlanır ama daha yavaştır. Örneğin sensörler için I2C, hızlı ekranlar için SPI tercih edilir.'),
      ]],
      ['Firmware Vakası', 'Mid', [
        q('vaka', 'Pil ile çalışan bir cihazın pil ömrü beklenenin yarısı. Nasıl iyileştirirsin?',
          ['Akım ölçümü: ölç, akım, profil', 'Uyku modları: uyku, sleep, düşük güç', 'Çevre birimleri: çevre birim, sensör, kapat', 'Haberleşme sıklığı: gönderim, radyo, sıklık'],
          'Önce farklı modlarda akım tüketimini ölçerim. İşlemciyi boşta derin uyku moduna alır, kullanılmayan çevre birimlerini kapatırım. Radyo gibi en çok tüketen birimlerin gönderim sıklığını azaltıp veriyi toplu gönderirim.'),
      ]],
    ]),
    track('eee-haberlesme', 'Haberleşme & RF', 'radio', 'Sinyal, modülasyon, anten', [
      ['Temeller', 'Junior', [
        q('teknik', 'Modülasyon nedir, AM ve FM arasındaki fark nedir?',
          ['Tanım: taşıyıcı, bilgi, modülasyon', 'AM: genlik, am', 'FM: frekans, fm', 'Gürültü dayanımı: gürültü, kalite, bant genişliği'],
          'Modülasyon, bilgiyi yüksek frekanslı bir taşıyıcı sinyal üzerine yüklemektir. AM’de taşıyıcının genliği, FM’de frekansı değiştirilir. FM gürültüye daha dayanıklıdır ama daha fazla bant genişliği kullanır.'),
      ]],
      ['Sistem Vakası', 'Mid', [
        q('vaka', 'Kablosuz bir bağlantıda paket kaybı yüksek. Neyi kontrol edersin?',
          ['Sinyal gücü: sinyal, rssi, snr', 'Girişim: girişim, kanal, parazit', 'Anten / mesafe: anten, mesafe, engel', 'Protokol ayarları: güç, hız, tekrar'],
          'Önce RSSI ve SNR değerlerine bakarım. Spektrum analizörü ile aynı kanalda girişim olup olmadığını kontrol eder, gerekirse kanal değiştiririm. Anten yönü, mesafe ve engelleri incelerim; iletim gücü, veri hızı ve tekrar gönderim ayarlarını optimize ederim.'),
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
          ['Elastik bölge: elastik, hooke, doğrusal', 'Akma: akma', 'Çekme dayanımı: çekme dayanımı, maksimum', 'Kopma: kopma, süneklik'],
          'Başta gerilme ile şekil değiştirme doğrusal orantılıdır (Hooke yasası, elastik bölge). Akma noktasından sonra kalıcı şekil değişimi başlar. Eğrinin tepe noktası çekme dayanımıdır, sonrasında boyun verme ve kopma gelir. Kopmaya kadar uzama sünekliği gösterir.'),
        q('teknik', 'Tolerans ve geçme (fit) türleri nelerdir?',
          ['Tolerans: tolerans, sapma, ölçü', 'Boşluklu geçme: boşluklu', 'Sıkı geçme: sıkı, pres', 'Ara geçme: ara geçme, geçiş'],
          'Tolerans, bir ölçünün kabul edilebilir sapma aralığıdır. Mil ve delik arasında her zaman boşluk kalan boşluklu geçme, her zaman sıkılık olan sıkı (pres) geçme ve ikisi arasında kalan ara geçme vardır. Seçim, parçanın dönmesi veya sabit kalması ihtiyacına göre yapılır.'),
      ]],
      ['Tasarım Vakası', 'Mid', [
        q('vaka', 'Sahada bir mil sürekli kırılıyor. Nasıl incelersin?',
          ['Kırık yüzey analizi: kırık yüzey, yorulma, plaj izi', 'Yük analizi: yük, gerilme, hesap', 'Malzeme kontrolü: malzeme, sertlik, ısıl işlem', 'Tasarım iyileştirme: çentik, köşe, radyus, tasarım'],
          'Önce kırık yüzeyini incelerim; plaj izleri yorulma kırılmasına işaret eder. Gerçek yükleri ve gerilmeleri hesaplar, kama yuvası gibi gerilme yığılması noktalarına bakarım. Malzeme ve ısıl işlemi kontrol eder, gerekirse radyusları büyütüp malzemeyi değiştiririm.'),
      ]],
    ]),
    track('me-enerji', 'Termodinamik & Enerji', 'thermometer', 'Isı transferi, HVAC, verimlilik', [
      ['Temeller', 'Junior', [
        q('teknik', 'Termodinamiğin birinci ve ikinci yasasını açıklar mısın?',
          ['Birinci yasa: enerji korunumu, birinci', 'İkinci yasa: entropi, ikinci', 'Verim sınırı: verim, carnot, %100', 'Isı akışı yönü: sıcaktan soğuğa'],
          'Birinci yasa enerjinin korunumudur: enerji yoktan var edilemez, sadece biçim değiştirir. İkinci yasa entropinin arttığını söyler; ısı kendiliğinden sıcaktan soğuğa akar ve hiçbir ısı makinesi %100 verimli olamaz, üst sınır Carnot verimidir.'),
      ]],
      ['Enerji Vakası', 'Mid', [
        q('vaka', 'Bir binanın ısınma maliyeti çok yüksek. Enerji verimliliği için ne önerirsin?',
          ['Kayıp analizi: kayıp, termal kamera, analiz', 'Yalıtım: yalıtım, pencere', 'Sistem verimi: kazan, ısı pompası, verim', 'Kontrol: termostat, otomasyon, zaman', 'Geri ödeme: geri ödeme, maliyet'],
          'Önce termal kamera ve tüketim verisiyle ısı kayıplarının nerede olduğunu bulurum. Yalıtım ve pencere iyileştirmeleri, verimli kazan veya ısı pompası ve akıllı termostat/zamanlama önerilerini geri ödeme süresine göre önceliklendiririm.'),
      ]],
    ]),
    track('me-bakim', 'Bakım & Güvenilirlik', 'build', 'Önleyici bakım, arıza analizi', [
      ['Bakım Stratejileri', 'Junior', [
        q('teknik', 'Reaktif, önleyici ve kestirimci bakım arasındaki fark nedir?',
          ['Reaktif: arıza sonrası, reaktif', 'Önleyici: periyodik, önleyici, plan', 'Kestirimci: kestirimci, titreşim, durum izleme, sensör', 'Maliyet dengesi: maliyet, duruş'],
          'Reaktif bakım arıza olduktan sonra yapılır. Önleyici bakım belirli periyotlarda planlıdır. Kestirimci bakımda titreşim, sıcaklık gibi durum verileri izlenip arıza öncesi müdahale edilir. Doğru karışım, duruş maliyeti ile bakım maliyetini dengeler.'),
      ]],
      ['Güvenilirlik Vakası', 'Mid', [
        q('vaka', 'Kritik bir pompa ayda iki kez arızalanıyor. Ne yaparsın?',
          ['Veri toplama: arıza kaydı, mtbf, veri', 'Kök neden analizi: kök neden, rca, 5 neden', 'Durum izleme: titreşim, sıcaklık, izle', 'Kalıcı çözüm: hizalama, yağlama, değiştir'],
          'Arıza kayıtlarından MTBF ve arıza türlerini çıkarırım. Kök neden analiziyle hizalama, kavitasyon veya yağlama gibi nedenleri araştırırım. Titreşim izleme ekleyip sorunu kalıcı çözer, pompa kritikse yedek planı oluştururum.'),
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
          ['Beton basınç: beton, basınç', 'Çelik çekme: çelik, donatı, çekme', 'Aderans: aderans, birlikte çalış', 'Paspayı: paspayı, korozyon'],
          'Beton basınca dayanıklı ama çekmeye zayıftır; çelik donatı çekme kuvvetlerini karşılar. İkisi aderans sayesinde birlikte çalışır. Paspayı donatıyı korozyon ve yangına karşı korur.'),
        q('teknik', 'Depreme dayanıklı yapı tasarımında temel prensipler nelerdir?',
          ['Süneklik: süneklik, sünek', 'Kuvvetli kolon zayıf kiriş: kuvvetli kolon', 'Düzenlilik: düzenli, simetri, burulma', 'Zemin etkisi: zemin', 'Yönetmelik: yönetmelik, tbdy'],
          'Yapının sünek davranması, kuvvetli kolon–zayıf kiriş ilkesi, planda ve düşeyde düzenlilik (burulma ve yumuşak kat oluşmaması) ve zemin koşullarının dikkate alınması temel prensiplerdir. Türkiye’de Bina Deprem Yönetmeliği’ne (TBDY) uyulur.'),
      ]],
      ['Yapı Vakası', 'Mid', [
        q('vaka', 'Mevcut bir binada kolonlarda çatlaklar tespit edildi. Nasıl ilerlersin?',
          ['Yerinde inceleme: yerinde, çatlak, ölç', 'Malzeme testi: karot, beton dayanımı, test', 'Analiz: analiz, model, performans', 'Güçlendirme: güçlendirme, mantolama, frp'],
          'Önce çatlakların türünü, genişliğini ve yerini inceleyip kayıt altına alırım. Karot ile beton dayanımını ve donatı durumunu tespit ederim. Yapının performans analizini yapar, sonuca göre mantolama, FRP sargı gibi güçlendirme veya yıkım kararı öneririm.'),
      ]],
    ]),
    track('ce-santiye', 'Şantiye & Proje Yönetimi', 'hammer', 'Planlama, maliyet, iş güvenliği', [
      ['Planlama', 'Junior', [
        q('teknik', 'Kritik yol yöntemi (CPM) nedir?',
          ['İş ağı: aktivite, bağımlılık, ağ', 'Kritik yol: kritik yol, en uzun', 'Bolluk: bolluk, float', 'Kullanım: süre, gecikme, takip'],
          'CPM, proje aktivitelerini bağımlılıklarıyla bir ağda gösterir. Başlangıçtan bitişe en uzun süreli yol kritik yoldur; buradaki herhangi bir gecikme projeyi geciktirir. Kritik olmayan işlerin bolluğu (float) vardır.'),
      ]],
      ['Şantiye Vakası', 'Mid', [
        q('vaka', 'Proje 3 hafta gecikmede ve bütçe aşımı var. Ne yaparsın?',
          ['Durum analizi: analiz, neden, kritik yol', 'Hızlandırma: hızlandır, ek ekip, vardiya, crashing', 'Maliyet kontrolü: maliyet, bütçe, kazanılmış değer', 'İletişim: işveren, rapor, bilgilendir'],
          'Önce gecikmenin nedenini ve kritik yolu analiz ederim. Kritik işleri ek ekip veya vardiyayla hızlandırma ve paralel yürütme seçeneklerini maliyetiyle değerlendiririm. Kazanılmış değer analiziyle bütçeyi izler, işverene gerçekçi bir revize planı sunarım.'),
      ]],
    ]),
    track('ce-geoteknik', 'Geoteknik', 'earth', 'Zemin, temel, şev', [
      ['Zemin', 'Junior', [
        q('teknik', 'Zemin etüdü neden yapılır, hangi deneyler kullanılır?',
          ['Amaç: taşıma gücü, oturma, zemin', 'Sondaj: sondaj', 'SPT: spt, standart penetrasyon', 'Laboratuvar: laboratuvar, numune'],
          'Zemin etüdü, zeminin taşıma gücünü, oturma davranışını ve yeraltı suyunu belirleyip uygun temel tipini seçmek için yapılır. Sondajlar, SPT gibi arazi deneyleri ve alınan numunelerle laboratuvar deneyleri kullanılır.'),
      ]],
      ['Temel Vakası', 'Mid', [
        q('vaka', 'Zayıf ve yeraltı suyu yüksek bir zeminde temel tipi nasıl seçilir?',
          ['Kazıklı temel: kazık', 'Radye temel: radye', 'Zemin iyileştirme: iyileştirme, jet grout, enjeksiyon', 'Su kontrolü: drenaj, su, yalıtım'],
          'Yüzeyde taşıma gücü yetersizse yükü sağlam tabakaya aktaran kazıklı temel ya da yükü geniş alana yayan radye temel düşünülür. Alternatif olarak jet grout gibi zemin iyileştirme yapılabilir. Yeraltı suyu için drenaj ve su yalıtımı planlanır.'),
      ]],
    ]),
  ],
};
