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
    ]),
    track('dil-ogretmeni', 'İngilizce Öğretmeni', 'language', 'Dil öğretimi, konuşma becerisi', [
      ['Dil Öğretimi', 'Junior', [
        q('teknik', 'Öğrencilerin konuşma becerisini nasıl geliştirirsin?',
          ['İletişimsel yaklaşım: iletişimsel, communicative', 'İkili / grup çalışma: ikili, pair, grup', 'Güvenli ortam: hata, korkmadan, güvenli', 'Gerçek görevler: rol, görev, task, drama'],
          'İletişimsel yaklaşımla dersin önemli bir kısmını öğrencilerin konuşmasına ayırırım. İkili ve grup çalışmalarıyla herkesin konuşma süresini artırırım. Hata yapmaktan korkmadıkları güvenli bir ortam kurarım. Rol yapma ve gerçek hayata benzeyen görevlerle dili anlamlı bağlamda kullanmalarını sağlarım.'),
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
          ['Sakin kalma: sakin, empati, dinle', 'Uygun ortam: ayrı, sakin bir yer', 'Bilgilendirme: bilgilendir, açıkla, doktor', 'Güvenlik: güvenlik, şiddet, sınır'],
          'Sakin kalır ve hasta yakınını dinleyerek kaygısını anladığımı gösteririm. Onu diğer hastaları etkilemeyecek sakin bir alana alırım. Yetki alanımdaki bilgileri açıklar, gerekirse doktorla görüşmesini sağlarım. Durum sözlü veya fiziksel şiddete dönerse sınır koyar ve güvenliği çağırırım.'),
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
    ]),
    track('diyetisyen', 'Diyetisyenlik', 'nutrition', 'Beslenme planı, danışan takibi', [
      ['Danışan Görüşmesi', 'Junior', [
        q('vaka', 'Kilo vermek isteyen yeni bir danışanla ilk görüşmeyi nasıl yaparsın?',
          ['Öykü: sağlık öyküsü, hastalık, ilaç', 'Beslenme alışkanlıkları: alışkanlık, besin tüketim, öğün', 'Ölçümler: ölçüm, boy, kilo, bel çevresi', 'Gerçekçi hedef: gerçekçi, hedef, sürdürülebilir'],
          'Önce sağlık öyküsünü, kullandığı ilaçları ve varsa hastalıklarını öğrenirim. Öğün düzenini ve beslenme alışkanlıklarını ayrıntılı olarak sorarım. Boy, kilo, bel çevresi gibi ölçümleri alırım. Danışanla birlikte sürdürülebilir ve gerçekçi hedefler belirleyip kişiye özel bir plan oluştururum.'),
      ]],
    ]),
  ],
};
