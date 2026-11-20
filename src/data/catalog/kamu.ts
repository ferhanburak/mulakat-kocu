import { q, track, type Profession } from '../build';

export const egitim: Profession = {
  id: 'egitim',
  name: 'Eğitim',
  icon: 'school',
  color: '#2E9E5B',
  tagline: 'Sınıf, branş ve dil öğretmenliği',
  tracks: [
    track('sinif-ogretmeni', 'Sınıf Öğretmeni', 'happy', 'İlkokul, sınıf yönetimi, veli', [
      ['Sınıf Yönetimi', 'Junior', [
        q('vaka', 'Derste sürekli konuşan ve dersi bölen bir öğrenciyle nasıl ilgilenirsin?',
          ['Önleyici kurallar: kural, sınıf kuralları, baştan', 'Olumlu yaklaşım: olumlu, pekiştir, övgü', 'Birebir görüşme: birebir, neden, konuş', 'Rol / sorumluluk verme: görev, sorumluluk', 'Veli iş birliği: veli, aile'],
          'Önce sınıf kurallarını öğrencilerle birlikte baştan belirlemiş olmaya dikkat ederim. Dersi bölmeden göz teması veya yakınına gitme gibi sessiz uyarılar kullanırım. Dersten sonra öğrenciyle birebir konuşup nedenini anlamaya çalışırım. Ona sınıfta bir görev vererek enerjisini olumlu yönlendirir, olumlu davranışlarını pekiştiririm. Devam ederse veliyle iş birliği yaparım.'),
        q('teknik', 'Farklı öğrenme hızlarındaki öğrencileri aynı derste nasıl desteklersin?',
          ['Farklılaştırılmış öğretim: farklılaştır, seviye', 'Grup çalışması: grup, akran', 'Ek destek: destek, tekrar, ek etkinlik', 'Ölçme: ölç, gözlem, değerlendir'],
          'Farklılaştırılmış öğretim uygularım: aynı hedefe farklı zorluk seviyelerindeki etkinliklerle ulaşılmasını sağlarım. Akran öğrenmesi için karışık seviyeli gruplar kurarım. Hızlı öğrenenlere ek zenginleştirme etkinlikleri, zorlananlara ek tekrar ve destek veririm. Düzenli gözlem ve kısa değerlendirmelerle ilerlemeyi izlerim.'),
      ]],
      ['Veli İletişimi', 'Mid', [
        q('vaka', 'Çocuğunun notundan memnun olmayan bir veli sert bir şekilde şikâyet ediyor. Ne yaparsın?',
          ['Sakin dinleme: dinle, sakin, empati', 'Somut veri: ödev, sınav, gözlem, veri', 'Ortak plan: birlikte, plan, ev', 'Takip: takip, görüşme'],
          'Veliyi sakin şekilde sonuna kadar dinler, endişesini anladığımı gösteririm. Öğrencinin ödev, sınav ve sınıf içi gözlemlerine dayanan somut verileri paylaşırım. Okul ve ev için birlikte bir destek planı oluştururuz. Birkaç hafta sonra tekrar görüşerek ilerlemeyi takip ederim.'),
      ]],
      ['Zümre Liderliği', 'Senior', [
        q('vaka', 'Zümre başkanı olarak öğretmenler arasında ortak bir ölçme-değerlendirme standardı nasıl oluşturursun?',
          ['Ortak kazanımlar: kazanım', 'Ortak rubrik: rubrik, ölçüt', 'Sonuçları paylaşma: sonuç, paylaş', 'Mesleki gelişim: gözlem, gelişim', 'Birlikte karar: birlikte, fikir'],
          'Önce zümre toplantısında her dönem ölçeceğimiz kazanımlar üzerinde anlaşırız. Açık uçlu çalışmalar için birlikte ortak bir rubrik ve puanlama ölçütleri hazırlarız. Sınav sonuçlarını sınıflar arasında paylaşıp karşılaştırır, farkların nedenini konuşuruz. Birbirimizin derslerini gözlem yaparak mesleki gelişimi destekleriz. Kararları dayatmak yerine herkesin fikrini alarak birlikte veririz, böylece standart benimsenir.'),
      ]],
    ]),
    track('brans-ogretmeni', 'Branş Öğretmeni', 'book', 'Ortaokul ve lise, ders planı', [
      ['Ders Planı', 'Junior', [
        q('teknik', 'Etkili bir ders planında neler olur?',
          ['Kazanım / hedef: kazanım, hedef', 'Giriş / dikkat çekme: giriş, dikkat, ön bilgi', 'Etkinlik: etkinlik, uygulama, aktif', 'Ölçme: ölçme, değerlendirme, soru', 'Kapanış: özet, kapanış, ödev'],
          'Önce dersin kazanımlarını net belirlerim. Dikkat çeken bir girişle öğrencilerin ön bilgilerini harekete geçiririm. Ana bölümde öğrencilerin aktif olduğu etkinlikler planlarım. Ders içinde kısa sorularla öğrenmeyi ölçerim. Özet ve uygun bir ödevle dersi kapatırım.'),
      ]],
      ['Motivasyon', 'Mid', [
        q('vaka', 'Derse ilgisi çok düşük bir sınıfı nasıl motive edersin?',
          ['İlgiyi anlama: ilgi, neden, anket', 'Günlük hayatla bağ: günlük hayat, gerçek, örnek', 'Aktif yöntemler: oyun, proje, grup, aktif', 'Başarı deneyimi: başarı, küçük hedef, geri bildirim'],
          'Önce öğrencilerin ilgi alanlarını ve derse neden uzak durduklarını kısa bir anket veya sohbetle anlarım. Konuları gerçek hayattan örneklerle ilişkilendiririm. Oyunlaştırma, proje ve grup çalışmaları gibi aktif yöntemler kullanırım. Küçük ve ulaşılabilir hedeflerle başarı deneyimi yaşatıp olumlu geri bildirim veririm.'),
      ]],
      ['Başarıyı Artırma', 'Senior', [
        q('vaka', 'Okulunda bir dersteki başarı ortalaması yıllardır düşük. Nasıl bir iyileştirme planı önerirsin?',
          ['Veri analizi: veri, kazanım', 'Kök neden: ön bilgi, motivasyon', 'Öğretim yöntemi: yöntem, etkinlik', 'Ek destek: destek, etüt', 'Ara ölçme: ara ölçme, takip'],
          'Önce sınav verisini kazanım bazında inceleyip öğrencilerin en çok zorlandığı konuları bulurum. Sorunun ön bilgi eksikliği mi, motivasyon mu yoksa öğretim yöntemi mi olduğunu öğrenci ve öğretmenlerle konuşarak anlarım. Zümreyle birlikte daha etkileşimli etkinlikler ve farklı öğretim yöntemleri planlarım. Zorlanan öğrenciler için etüt ve akran desteği kurarım. Kısa ara ölçme sınavlarıyla ilerlemeyi takip eder, planı buna göre güncellerim.'),
      ]],
    ]),
    track('dil-ogretmeni', 'İngilizce Öğretmeni', 'language', 'Dil öğretimi, konuşma becerisi', [
      ['Dil Öğretimi', 'Junior', [
        q('teknik', 'Öğrencilerin konuşma becerisini nasıl geliştirirsin?',
          ['İletişimsel yaklaşım: iletişimsel, communicative', 'İkili / grup çalışma: ikili, pair, grup', 'Güvenli ortam: hata, korkmadan, güvenli', 'Gerçek görevler: rol, görev, task, drama'],
          'İletişimsel yaklaşımla dersin önemli bir kısmını öğrencilerin konuşmasına ayırırım. İkili ve grup çalışmalarıyla herkesin konuşma süresini artırırım. Hata yapmaktan korkmadıkları güvenli bir ortam kurarım. Rol yapma ve gerçek hayata benzeyen görevlerle dili anlamlı bağlamda kullanmalarını sağlarım.'),
      ]],
      ['Konuşma Becerisi', 'Mid', [
        q('vaka', 'Öğrencilerin konuşmaktan çekindiği bir İngilizce sınıfında konuşma becerisini nasıl geliştirirsin?',
          ['Güvenli ortam: güvenli, kaygı', 'Eşli ve grup çalışması: eşli, grup', 'Anlamlı görevler: görev, rol', 'Hazırlık süresi: hazırlık, kalıp', 'Geri bildirim: geri bildirim'],
          'Önce hata yapmanın normal olduğu güvenli bir ortam kurarak kaygıyı azaltırım. Herkesin önünde konuşmak yerine eşli ve küçük grup çalışmalarıyla başlarım. Yol tarifi ya da rol canlandırma gibi gerçek hayata yakın görevler veririm. Konuşmadan önce kısa bir hazırlık süresi ve kullanılabilecek kalıp ifadeler sunarım. Hataları anında düzeltmek yerine etkinlik sonunda toplu ve nazik bir geri bildirim veririm.'),
      ]],
      ['Program Tasarımı', 'Senior', [
        q('vaka', 'Bir dil okulunun A1–B2 seviyeleri için müfredat çerçevesini nasıl tasarlarsın?',
          ['CEFR hedefleri: cefr, seviye', 'Dört beceri: dört beceri', 'Sarmal ilerleme: sarmal, tekrar', 'Ölçme: seviye tespit, sınav', 'Materyal ve öğretmen: materyal, öğretmen'],
          'Çerçeveyi CEFR seviyelerine göre, her seviye için yapabilir ifadeleriyle tanımlarım. Okuma, dinleme, konuşma ve yazma olmak üzere dört beceriyi dengeli şekilde planlarım. Konuları sarmal bir yapıda kurarım; yapılar her seviyede tekrar edilip derinleşir. Seviye tespit sınavı ve kur sonu sınavlarıyla ölçmeyi hedeflere bağlarım. Uygun materyalleri seçer, öğretmenler için kısa bir uygulama rehberi hazırlarım.'),
      ]],
    ]),
  ],
};

export const saglik: Profession = {
  id: 'saglik',
  name: 'Sağlık',
  icon: 'medkit',
  color: '#D23C3C',
  tagline: 'Hemşirelik, eczacılık, fizyoterapi, beslenme',
  tracks: [
    track('hemsirelik', 'Hemşirelik', 'heart', 'Hasta bakımı, öncelik, iletişim', [
      ['Hasta Bakımı', 'Junior', [
        q('vaka', 'Aynı anda birden fazla hastanın ihtiyacı varsa nasıl önceliklendirirsin?',
          ['Hayati önce: hayati, acil, abc, solunum', 'Triyaj mantığı: triyaj, öncelik', 'Ekip desteği: ekip, yardım, delege', 'Kayıt: kayıt, not'],
          'Önce hayati tehlike oluşturan durumlara bakarım; hava yolu, solunum ve dolaşım sorunları her zaman önceliklidir. Diğer hastaları aciliyetine göre sıralarım. Gerekirse ekipten destek ister veya uygun işleri delege ederim. Yaptığım tüm uygulamaları doğru şekilde kayıt altına alırım.'),
        q('teknik', 'İlaç uygulamasında hataları önlemek için nelere dikkat edersin?',
          ['Doğru ilkeleri: doğru hasta, doğru ilaç, doğru doz, doğru yol, doğru zaman', 'Kimlik doğrulama: kimlik, bileklik', 'Alerji kontrolü: alerji', 'Kayıt: kayıt'],
          'İlaç uygulamasının doğru ilkelerine uyarım: doğru hasta, doğru ilaç, doğru doz, doğru yol, doğru zaman ve doğru kayıt. Hastanın kimliğini bileklikle doğrular, alerji öyküsünü kontrol ederim. Emin olmadığım bir orderı uygulamadan önce mutlaka sorarım. Uygulamadan hemen sonra kayıt yaparım.'),
      ]],
      ['Zor Durumlar', 'Mid', [
        q('vaka', 'Bir hasta yakını tedavi sürecine çok öfkeli ve personele bağırıyor. Ne yaparsın?',
          ['Sakin kalma: sakin, empati, dinle', 'Uygun ortam: ayrı, sakin bir yer, sakin bir alan', 'Bilgilendirme: bilgilendir, açıkla, doktor', 'Güvenlik: güvenlik, şiddet, sınır'],
          'Sakin kalır ve hasta yakınını dinleyerek kaygısını anladığımı gösteririm. Onu diğer hastaları etkilemeyecek sakin bir alana alırım. Yetki alanımdaki bilgileri açıklar, gerekirse doktorla görüşmesini sağlarım. Durum sözlü veya fiziksel şiddete dönerse sınır koyar ve güvenliği çağırırım.'),
      ]],
      ['Sorumlu Hemşirelik', 'Senior', [
        q('vaka', 'Sorumlu hemşire olarak serviste ilaç hatalarının arttığını fark ettin. Ne yaparsın?',
          ['Bildirim kültürü: bildir, suçlama', 'Kök neden analizi: kök neden', 'Süreç önlemi: çift kontrol, barkod', 'Eğitim: eğitim', 'İzleme: izle, oran'],
          'Önce hataların suçlama olmadan bildirilmesini teşvik ederim; bildirilmeyen hata önlenemez. Bildirimleri inceleyip yoğun saatler ya da benzer isimli ilaçlar gibi kök nedeni bulurum. Yüksek riskli ilaçlar için çift kontrol ve mümkünse barkodlu doğrulama gibi süreç önlemleri koyarım. Ekibe ilaç güvenliği üzerine kısa bir eğitim veririm. Hata oranını aylık izler, sonuçları ekiple paylaşırım.'),
      ]],
    ]),
    track('eczacilik', 'Eczacılık', 'flask', 'Danışmanlık, etkileşim, eczane yönetimi', [
      ['Hasta Danışmanlığı', 'Junior', [
        q('vaka', 'Reçetesiz ağrı kesici isteyen bir müşteriye nasıl danışmanlık yaparsın?',
          ['Bilgi alma: şikayet, ne zamandır, soru', 'Mevcut ilaçlar / hastalıklar: kullandığı ilaç, kronik, hamilelik', 'Uygun öneri: doz, uygun, öneri', 'Yönlendirme: doktora yönlendir, uyarı işaretleri'],
          'Önce şikâyetini, ne zamandır sürdüğünü ve şiddetini sorarım. Kullandığı diğer ilaçları, kronik hastalıklarını, hamilelik durumunu ve alerjilerini öğrenirim. Uygun bir ürün ve doğru doz kullanımını anlatırım. Şikâyet birkaç günde geçmezse veya uyarı işaretleri varsa doktora başvurmasını öneririm.'),
      ]],
      ['Etkileşimler', 'Mid', [
        q('vaka', 'Bir reçetede ciddi bir ilaç etkileşimi fark ettin. Ne yaparsın?',
          ['Doğrulama: kontrol, kaynak, doğrula', 'Hekimle iletişim: hekim, doktor, ara', 'Hastayı bilgilendirme: hasta, bilgilendir, açıkla', 'Kayıt: kayıt, not'],
          'Önce etkileşimi güvenilir kaynaklardan doğrularım. Ardından reçeteyi yazan hekime ulaşarak durumu bildirir, alternatif bir ilaç veya doz değişikliği öneririm. Hastayı paniğe sokmadan sürece dair bilgilendiririm. Yapılan değişikliği ve görüşmeyi kayıt altına alırım.'),
      ]],
      ['Eczane İşletmeciliği', 'Senior', [
        q('vaka', 'Eczanenin kârlılığı azalıyor. Nasıl iyileştirirsin?',
          ['Stok yönetimi: stok, miad', 'Ürün karması: dermokozmetik, takviye', 'Danışmanlık hizmeti: danışman, hizmet', 'Gider kontrolü: gider, maliyet', 'Müşteri sadakati: sadakat'],
          'Önce stok devir hızını inceleyip miadı yaklaşan ve az dönen ürünleri azaltırım. İlaç dışı gelir için dermokozmetik ve gıda takviyesi gibi ürün karmasını bölgedeki müşteri profiline göre düzenlerim. Tansiyon ölçümü gibi danışmanlık hizmetleriyle müşterinin eczaneye gelme nedenini artırırım. Personel planı ve enerji gibi gider kalemlerini gözden geçirip maliyeti düşürürüm. Düzenli hastalarla iletişimi güçlendirerek sadakat oluştururum.'),
      ]],
    ]),
    track('fizyoterapi', 'Fizyoterapi', 'walk', 'Değerlendirme, rehabilitasyon', [
      ['Değerlendirme', 'Junior', [
        q('vaka', 'Bel ağrısıyla gelen yeni bir hastayı nasıl değerlendirirsin?',
          ['Anamnez: öykü, anamnez, ne zaman', 'Kırmızı bayraklar: kırmızı bayrak, uyuşma, idrar', 'Fiziksel muayene: hareket açıklığı, kas kuvveti, test', 'Hedef belirleme: hedef, plan'],
          'Önce ayrıntılı bir öykü alırım: ağrının başlangıcı, karakteri ve günlük yaşama etkisi. Uyuşma, idrar kontrol sorunları gibi kırmızı bayrakları sorgular, varsa hekime yönlendiririm. Hareket açıklığı, kas kuvveti ve özel testlerle fiziksel muayene yaparım. Bulgulara göre hastayla birlikte ölçülebilir hedefler ve bir tedavi planı belirlerim.'),
      ]],
      ['Motivasyon', 'Mid', [
        q('vaka', 'Hasta ev egzersizlerini yapmıyor ve ilerleme durdu. Ne yaparsın?',
          ['Nedeni anlama: neden, engel, zaman', 'Programı sadeleştirme: kısa, basit, sadeleştir', 'Takip araçları: takvim, video, hatırlatma', 'Hedefle bağ: hedef, ilerleme göster'],
          'Önce egzersizleri neden yapamadığını, örneğin zaman, ağrı veya anlamamak gibi engelleri anlamaya çalışırım. Programı günlük rutine sığacak şekilde kısaltıp sadeleştiririm. Video ve hatırlatma gibi destekler veririm. Kişisel hedefini ve elde ettiği ilerlemeyi göstererek motivasyonunu artırırım.'),
      ]],
      ['Klinik Kalitesi', 'Senior', [
        q('vaka', 'Bir rehabilitasyon kliniğinde tedavi sonuçlarını nasıl ölçer ve iyileştirirsin?',
          ['Standart ölçekler: ölçek, standart', 'Başlangıç-bitiş karşılaştırması: başlangıç, karşılaştır', 'Kanıta dayalı protokol: kanıt, protokol', 'Ekip toplantısı: vaka toplantı', 'Hasta geri bildirimi: geri bildirim, memnuniyet'],
          'Her tanı grubu için ağrı ve fonksiyon gibi geçerliliği kanıtlanmış standart ölçekler belirlerim. Bu ölçümleri tedavinin başlangıcında ve sonunda yapıp karşılaştırırım. Sonuçları zayıf olan gruplar için tedaviyi kanıta dayalı protokollerle güncellerim. Düzenli vaka toplantılarında zor vakaları ekiple birlikte değerlendiririz. Hasta geri bildirimi ve memnuniyet anketleriyle süreci hasta gözünden de izlerim.'),
      ]],
    ]),
    track('diyetisyen', 'Diyetisyenlik', 'nutrition', 'Beslenme planı, danışan takibi', [
      ['Danışan Görüşmesi', 'Junior', [
        q('vaka', 'Kilo vermek isteyen yeni bir danışanla ilk görüşmeyi nasıl yaparsın?',
          ['Öykü: sağlık öyküsü, hastalık, ilaç', 'Beslenme alışkanlıkları: alışkanlık, besin tüketim, öğün', 'Ölçümler: ölçüm, boy, kilo, bel çevresi', 'Gerçekçi hedef: gerçekçi, hedef, sürdürülebilir'],
          'Önce sağlık öyküsünü, kullandığı ilaçları ve varsa hastalıklarını öğrenirim. Öğün düzenini ve beslenme alışkanlıklarını ayrıntılı olarak sorarım. Boy, kilo, bel çevresi gibi ölçümleri alırım. Danışanla birlikte sürdürülebilir ve gerçekçi hedefler belirleyip kişiye özel bir plan oluştururum.'),
      ]],
      ['Danışan Takibi', 'Mid', [
        q('vaka', 'Kilo vermede platoya giren ve motivasyonu düşen bir danışana nasıl yaklaşırsın?',
          ['Platoyu açıklama: plato, normal', 'Kayıtları inceleme: kayıt', 'Planı güncelleme: plan, güncelle', 'Küçük hedefler: küçük hedef, motivasyon', 'Kilo dışı başarılar: ölçü, enerji'],
          'Önce platonun sürecin normal bir parçası olduğunu açıklayarak danışanı rahatlatırım. Besin ve aktivite kayıtlarını birlikte inceleyip gözden kaçan alışkanlıkları buluruz. Gerekirse enerji alımını ve egzersiz planını güncelleriz. Motivasyonu artırmak için haftalık küçük hedefler koyarız. Bel ölçüsü, enerji ve uyku gibi kilo dışı başarıları da görünür kılarım.'),
      ]],
      ['Kurumsal Beslenme', 'Senior', [
        q('vaka', 'Bir şirketin yemekhanesi için sağlıklı beslenme programını nasıl kurarsın?',
          ['Mevcut durum analizi: mevcut, anket', 'Menü planlama: menü, denge', 'Etiketleme: etiket, kalori', 'Eğitim: eğitim, seminer', 'Ölçme ve takip: memnuniyet, takip'],
          'Önce mevcut menüyü analiz eder, çalışanlara beslenme alışkanlıkları üzerine kısa bir anket yaparım. Besin grupları açısından dengeli, mevsimine uygun dönüşümlü bir menü planlarım. Yemeklerin yanına kalori ve içerik bilgisi veren etiketler koyarak seçim yapmayı kolaylaştırırım. Çalışanlar için kısa seminerler ve eğitim içerikleri hazırlarım. Programı memnuniyet anketleri ve tüketim verisiyle düzenli takip ederim.'),
      ]],
    ]),
  ],
};

export const kamuMulakat: Profession = {
  id: 'kamu-mulakat',
  name: 'Kamu Sözlü Mülakatları',
  icon: 'flag',
  color: '#9C2A2A',
  tagline: 'Kurum mülakatı, uzman yardımcılığı, kamu yöneticiliği',
  tracks: [
    track('kurum-mulakati', 'Kurum Mülakatı', 'ribbon', 'KPSS sonrası sözlü sınav, motivasyon, durum soruları', [
      ['Motivasyon', 'Junior', [
        q('davranissal', 'Neden kamuda ve özellikle bu kurumda çalışmak istiyorsun?',
          ['Kamu hizmeti anlayışı: kamu hizmeti, vatandaş', 'Kurumu tanıma: kurumun görev', 'Katkın: katkı, deneyim', 'Uzun vadeli hedef: hedef, uzun vade'],
          'Kamu hizmetini vatandaşın hayatına doğrudan dokunan bir sorumluluk olarak görüyorum. Bu kurumun görev alanını ve son yıllardaki projelerini araştırdım; özellikle dijital hizmetler alanındaki çalışmaları ilgimi çekti. Üniversitede ve stajımda edindiğim veri analizi deneyimiyle bu alana katkı sağlayabileceğime inanıyorum. Uzun vadede kurumda uzmanlaşıp hizmet kalitesini artıran projelerde sorumluluk almayı hedefliyorum.'),
      ]],
      ['Mevzuat', 'Mid', [
        q('teknik', 'Kamu hizmetinin temel ilkeleri nelerdir?',
          ['Süreklilik: süreklilik, kesintisiz', 'Eşitlik: eşitlik, ayrım', 'Değişkenlik: değişkenlik, ihtiyaç', 'Tarafsızlık: tarafsız', 'Örnek: örneğin'],
          'Kamu hizmetinin temel ilkeleri süreklilik, eşitlik, değişkenlik ve tarafsızlıktır. Süreklilik ilkesine göre hizmet kesintisiz sunulmalıdır; örneğin su ya da sağlık hizmetinin durmaması gerekir. Eşitlik ilkesi, hizmetten yararlananlar arasında ayrım yapılmamasını ifade eder. Değişkenlik ilkesi, hizmetin toplumun değişen ihtiyaçlarına göre güncellenmesidir. Tarafsızlık ilkesi ise görevlinin kişisel ya da siyasi görüşlerini işine yansıtmamasıdır.'),
      ]],
      ['Durum Soruları', 'Senior', [
        q('vaka', 'Amirin senden mevzuata aykırı olduğunu düşündüğün bir işlem yapmanı istedi. Ne yaparsın?',
          ['Mevzuatı kontrol: mevzuat', 'Aykırılığı bildirme: bildir', 'Yazılı emir: yazılı', 'Suç teşkil eden emir: suç', 'Kayıt: kayıt'],
          'Önce ilgili mevzuatı kontrol ederek gerçekten bir aykırılık olup olmadığından emin olurum. Aykırıysa emri yerine getirmez, bu aykırılığı amirime saygılı bir dille bildiririm. Amirim emrinde ısrar eder ve emri yazılı olarak yenilerse, emri yerine getiririm; bu durumda sorumluluk emri verene aittir. Ancak konusu suç teşkil eden bir emri hiçbir şekilde yerine getirmem. Süreç boyunca yazışmaları kayıt altında tutarım.'),
      ]],
    ]),
    track('uzman-yardimciligi', 'Uzman Yardımcılığı', 'document-text', 'Bakanlık ve düzenleyici kurum sözlüleri', [
      ['Alan Bilgisi', 'Junior', [
        q('teknik', 'Enflasyonun nedenleri nelerdir ve kamu politikasıyla nasıl mücadele edilir?',
          ['Talep enflasyonu: talep', 'Maliyet enflasyonu: maliyet', 'Beklentiler: beklenti', 'Para politikası: para politikası, faiz', 'Maliye politikası: maliye politikası, harcama'],
          'Enflasyonun bir nedeni, toplam talebin üretim kapasitesini aşmasıyla oluşan talep enflasyonudur. Diğeri, enerji ya da kur gibi girdi fiyatlarının artmasıyla oluşan maliyet enflasyonudur. Fiyatların artacağı beklentisi de ücret ve fiyat kararlarını etkileyerek enflasyonu kalıcı hale getirebilir. Merkez bankası para politikası ile faizi artırarak talebi yavaşlatır ve beklentileri yönetir. Hükümet de maliye politikası ile kamu harcamalarını disipline ederek bu çabayı destekler.'),
      ]],
      ['Analiz & Rapor', 'Mid', [
        q('vaka', 'Kurumun bir hizmetine yönelik şikayetler arttı. Bunu inceleyen bir rapor nasıl hazırlarsın?',
          ['Amaç ve kapsam: amac, amaç, kapsam', 'Veri toplama: veri, görüşme', 'Kök neden: kök neden', 'Uygulanabilir öneriler: öneri, sorumlu', 'Rapor yapısı: özet, bulgu'],
          'Önce raporun amacını ve hangi dönemi, hangi hizmeti kapsayacağını netleştiririm. Şikayet kayıtlarından veri toplar, ilgili birimlerle ve bazı vatandaşlarla görüşme yaparım. Şikayetleri türlerine göre gruplayıp her grubun kök nedenini analiz ederim. Her bulgu için sorumlu birimi ve takvimi belli, uygulanabilir öneriler yazarım. Raporu yönetici özeti, bulgular, öneriler ve sonuç bölümleriyle sade bir yapıda sunarım.'),
      ]],
      ['Tez & Sunum', 'Senior', [
        q('teknik', 'Uzmanlık tezinin konusunu nasıl seçersin ve jüriye nasıl savunursun?',
          ['Kurumun ihtiyacı: kurum, ihtiyaç', 'Özgünlük: literatür, özgün', 'Yöntem: yöntem', 'Uygulanabilir öneri: uygulanabilir', 'Savunma: savun, soru'],
          'Konuyu seçerken önce kurumun gerçek bir ihtiyacına cevap verip vermediğine bakarım. Literatürü tarayıp konunun özgün bir katkı sunacağından emin olurum. Veri kaynaklarımı ve analiz yöntemimi en başta net şekilde tanımlarım. Tezin sonunda kurumun hemen kullanabileceği uygulanabilir öneriler sunarım. Savunmada ana bulguları kısa ve görsel bir sunumla anlatır, jürinin olası sorularına önceden hazırlanırım.'),
      ]],
    ]),
    track('kamu-yoneticiligi', 'Kamu Yöneticiliği', 'podium', 'Kaymakamlık, müdürlük, kriz ve koordinasyon', [
      ['Yönetim İlkeleri', 'Junior', [
        q('teknik', 'Merkezden yönetim ile yerinden yönetimin farkı nedir?',
          ['Merkezden yönetim: merkezden yönetim, bakanlık', 'Yetki genişliği: yetki genişliği', 'Yerinden yönetim: yerinden yönetim, belediye', 'Avantajlar: avantaj', 'İdari vesayet: vesayet'],
          'Merkezden yönetimde kamu hizmetleri bakanlıklar eliyle ve devletin tek tüzel kişiliği içinde yürütülür. Yetki genişliği bunun bir türüdür; valilik gibi taşra teşkilatı merkez adına karar alabilir. Yerinden yönetimde ise belediye ve il özel idaresi gibi ayrı tüzel kişiliği olan yerel birimler hizmeti kendi organlarıyla sunar. Yerinden yönetim yerel ihtiyaçlara hız ve katılım avantajı sağlar; merkezden yönetim ise bütünlük ve standart sağlar. Merkez, yerel yönetimler üzerinde idari vesayet yetkisiyle denetim yapar.'),
      ]],
      ['Kriz Yönetimi', 'Mid', [
        q('vaka', 'İlçende bir sel felaketi oldu. İlk 24 saatte neler yaparsın?',
          ['Can güvenliği: can güvenliği, tahliye', 'Koordinasyon merkezi: koordinasyon, afad', 'Temel ihtiyaçlar: barınma, gıda', 'Halkı bilgilendirme: duyuru, bilgilendir', 'Hasar tespiti: hasar tespit'],
          'İlk önceliğim can güvenliğidir; risk altındaki bölgelerde tahliye ve arama kurtarma çalışmalarını başlatırım. AFAD, sağlık, emniyet ve belediyenin katıldığı bir koordinasyon merkezi kurup görevleri dağıtırım. Etkilenenler için barınma, gıda, temiz su ve sağlık hizmeti gibi temel ihtiyaçları organize ederim. Halkı resmi kanallardan düzenli duyuru yaparak bilgilendirir, yanlış bilgiyi önlerim. İlk saatlerden itibaren hasar tespit ekiplerini sahaya göndererek yardım planını verilere dayandırırım.'),
      ]],
      ['Liderlik', 'Senior', [
        q('davranissal', 'Motivasyonu düşük bir kamu ekibini nasıl yönettiğini bir örnekle anlatır mısın?',
          ['Nedenleri dinleme: dinle, neden', 'Net hedefler: hedef', 'Adil iş bölümü: iş bölümü, adil', 'Takdir: takdir', 'Sonuç: sonuç'],
          'Önceki görevimde başvuru işlemlerinin geciktiği ve ekibin motivasyonunun düştüğü bir birimin başına geçtim. İlk iş her çalışanla birebir görüşüp sorunların nedenlerini dinledim. Ekiple birlikte bekleme süresini yarıya indirmek gibi net bir hedef koyduk. İş yükünü adil bir iş bölümü ile yeniden dağıttım. İyi işi toplantılarda açıkça takdir ettim. Sonuç olarak üç ayda bekleme süresi %40 azaldı ve şikayetler düştü.'),
      ]],
    ]),
  ],
};
