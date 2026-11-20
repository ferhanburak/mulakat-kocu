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
          ['INNER eşleşenler: eşleş, kesişim, iki tabloda, match, ortak kısm', 'LEFT tümü: sol, tüm, null, left table', 'Örnek kullanım: örneğin, müşteri, sipariş'],
          'INNER JOIN sadece iki tabloda da eşleşen satırları getirir. LEFT JOIN sol tablodaki tüm satırları getirir, eşleşme yoksa sağ taraf NULL olur. Örneğin hiç sipariş vermemiş müşterileri bulmak için LEFT JOIN kullanırım.', ['LEFT JOIN yalnızca eşleşenleri getirmez: left join sadece...eşleşen; left join yalnızca...eşleşen; inner join ise sol; inner join ise tüm']),
        q('teknik', 'Ortalama ile medyan arasındaki farkı ve hangisinin ne zaman yanıltıcı olduğunu anlat.',
          ['Tanım: ortadaki, toplam, böl', 'Uç değerler: uç değer, outlier, aykırı', 'Çarpık dağılım: çarpık, dağılım, maaş, gelir, skewed, distribution, dengesiz'],
          'Ortalama tüm değerlerin toplamının adede bölümüdür, medyan sıralanmış verinin ortasıdır. Uç değerler ortalamayı çeker; gelir gibi çarpık dağılımlarda medyan daha temsil edicidir.', ['Medyan en sık değer değildir: medyan en sık; medyan ise en sık', 'Uç değerler medyanı değil ortalamayı çeker: uç değerler medyanı daha çok; ortalamayı etkilemez']),
      ]],
      ['Analiz Vakaları', 'Mid', [
        q('vaka', 'Uygulamanın günlük aktif kullanıcı sayısı geçen hafta %15 düştü. Nasıl analiz edersin?',
          ['Veri doğrulama: takip, tracking, veri hatası, doğrula, rakamın gerçek, ölçümün kendisi, event kayb', 'Segmentasyon: segment, platform, ülke, kırılım', 'Dış etkenler: tatil, sezon, rakip, dış', 'İç değişiklikler: sürüm, release, kampanya, değişiklik', 'Hipotez: hipotez, varsayım'],
          'Önce verinin doğru olduğunu (tracking hatası olmadığını) kontrol ederim. Sonra platform, ülke, yeni/eski kullanıcı kırılımlarıyla düşüşün nerede yoğunlaştığına bakarım. Sürümler, kampanyalar ve tatil gibi etkenler için hipotez kurup veriyle test ederim.', ['Düşüş incelenmeden geçiştirilmez: normal dalgalanma; analiz etmeye gerek yok; kendiliğinden düzel']),
        q('teknik', 'Bir A/B testinin sonucunun güvenilir olduğundan nasıl emin olursun?',
          ['Örneklem büyüklüğü: örneklem, sample, güç, kaç kullanıcı, power', 'İstatistiksel anlamlılık: p-değer, p değer, anlamlı, güven aralığı, significant', 'Süre / erken bakma: süre, erken, hafta', 'Rastgele atama: rastgele, random'],
          'Testten önce gereken örneklem büyüklüğünü ve süreyi hesaplarım, sonuçlara erken bakıp durdurmam. Atamanın rastgele, grupların dengeli olduğunu kontrol ederim. Sonucu p-değeri ve güven aralığıyla, iş etkisiyle birlikte yorumlarım.', ['Test erken durdurulmaz: hemen durdur; bir gün bile önde', 'Anlamlılık eşiği 0.5 değildir: p-değer 0.5; p değer 0.5; p değeri 0.5']),
      ]],
      ['Paydaş Yönetimi', 'Senior', [
        q('vaka', 'Yönetici, verinin desteklemediği bir sonucu raporda görmek istiyor. Ne yaparsın?',
          ['Amacı anlama: neden, anla, amaç', 'Veriyle gösterme: veri, grafik, göster, data', 'Alternatif sunma: alternatif, öner, farklı', 'Dürüstlük: dürüst, etik, şeffaf, transparent, manipüle etmem'],
          'Önce yöneticinin asıl amacını anlamaya çalışırım. Verinin ne söylediğini net bir grafikle gösterir, şeffaf kalırım. Amaca hizmet eden, verinin desteklediği alternatif bir anlatı veya ek analiz öneririm.', ['Veri isteğe göre çarpıtılmaz: veriyi...düzenleyip; destekleyecek şekilde göster; istediği gibi hazırla; ne isterse o olur']),
      ]],
    ]),
    track('bi', 'İş Zekâsı (BI)', 'easel', 'Dashboard, veri modelleme, raporlama', [
      ['Dashboard', 'Junior', [
        q('teknik', 'İyi bir dashboard nasıl tasarlanır?',
          ['Hedef kitle: kullanıcı, kitle, kim, audience', 'Az ve öz metrik: az, odak, önemli, kalabalık yapma, ana gösterge', 'Doğru grafik türü: grafik, çizgi, çubuk, chart', 'Bağlam / karşılaştırma: hedef, önceki, karşılaştır, target, geçen ay'],
          'Önce dashboard’u kimin, hangi karar için kullanacağını netleştiririm. Az sayıda kritik metriğe odaklanır, trend için çizgi, kıyas için çubuk grafik seçerim. Her metriği hedef veya önceki dönemle karşılaştırarak bağlam veririm.', ['Çok metrik iyi dashboard demek değildir: ne kadar çok metrik; ne kadar çok bilgi; her şeyi tek ekrana; pasta grafiği her durumda']),
        q('teknik', 'Star schema (yıldız şema) nedir?',
          ['Fact tablosu: fact, olgu, olay tablo', 'Dimension tabloları: dimension, boyut', 'Raporlama hızı: hızlı, performans, sorgu', 'Örnek: satış, müşteri, ürün'],
          'Ortada ölçülebilir olayları tutan bir fact tablosu (örneğin satışlar), etrafında onu tanımlayan dimension tabloları (müşteri, ürün, tarih) bulunur. Basit join’lerle hızlı raporlama sağlar.', ['Star schema tek tablo değildir: tek bir büyük tablo; hiç join gerektirme; normalize edilmiş en']),
      ]],
      ['Veri Tutarlılığı', 'Mid', [
        q('vaka', 'İki farklı rapordaki ciro rakamı birbirini tutmuyor. Nasıl incelersin?',
          ['Tanım farkı: tanım, iade, vergi, definition, gross, brüt, kdv, return, tax, iptal', 'Filtre / tarih: filtre, tarih, saat dilimi, filter, timezone, date', 'Veri kaynağı: kaynak, tablo, source', 'Tek doğru kaynak: tek kaynak, standart, sözlük, ortak bir standart'],
          'Önce iki raporun ciro tanımını karşılaştırırım (iadeler, vergi dahil mi). Tarih filtrelerini ve saat dilimini kontrol eder, hangi tablolardan beslendiklerine bakarım. Sonunda metriği ortak bir veri sözlüğünde tek tanıma bağlarım.', ['Fark incelenmeden kapatılmaz: ortalamasını alıp; büyük olan rakamı doğru; farkın nedeni önemli değil']),
      ]],
      ['Veri Stratejisi', 'Senior', [
        q('vaka', 'Şirketin farklı birimleri aynı metrik için farklı rakamlar raporluyor. Tek bir doğru kaynak nasıl kurarsın?',
          ['Ortak metrik tanımı: tanım, sözlük, ortak, definition, catalog, katalog', 'Sahiplik / yönetişim: sahip, yönetişim, owner', 'Merkezi model: semantik, merkezi model, katman, semantic, merkezi', 'Paydaş uzlaşısı: paydaş, uzlaş, mutabık, aynı masa, workshop', 'Kalite kontrolü: test, izle, kontrol'],
          'Önce farkın nereden geldiğini görmek için her birimin hesaplama yöntemini çıkarırım. Paydaşlarla bir araya gelip metriklerin ortak tanımında uzlaşır, bunu bir metrik sözlüğüne yazarım. Her metriğin bir iş sahibi olur ve değişiklikler bir yönetişim süreciyle onaylanır. Hesaplamaları raporlarda değil, tüm panoların kullandığı merkezi bir semantik katmanda tutarım. Son olarak otomatik veri testleri ve izleme ile rakamların tutarlılığını sürekli kontrol ederim.', ['Tek birimin rakamı dayatılmaz: en büyük birimin rakamı; tartışmaya gerek yok; herkes kendi rakamını kullanabilir']),
      ]],
    ]),
    track('bilimci', 'Veri Bilimci', 'flask', 'Makine öğrenmesi, modelleme', [
      ['ML Temelleri', 'Junior', [
        q('teknik', 'Overfitting (aşırı öğrenme) nedir, nasıl önlersin?',
          ['Tanım: eğitim, ezber, genelle, training, noise, gürültü, fazla uy', 'Doğrulama: validation, doğrulama, cross', 'Düzenlileştirme: regularization, düzenli, l1, l2, dropout, early stopping, erken durdur', 'Veri / basit model: veri, basit, data, sadeleştir'],
          'Model eğitim verisini ezberleyip yeni veriye genelleyemediğinde overfitting olur. Cross-validation ile ölçer; regularization (L1/L2), dropout, daha basit model veya daha fazla veriyle önlerim.', ['Overfitting az öğrenme değildir: yeterince öğrenememe; daha da karmaşık yap; epoch sayısını artır']),
        q('teknik', 'Precision ve recall arasındaki farkı bir örnekle açıklar mısın?',
          ['Precision: precision, kesinlik', 'Recall: recall, duyarlılık, yakala', 'Ödünleşim: ödünleşim, trade, denge, eşik, threshold, ama çöp de art', 'Örnek: örneğin, spam, kanser, dolandırıcılık, diyelim, fraud'],
          'Precision, pozitif dediklerimizin ne kadarının gerçekten pozitif olduğudur; recall, gerçek pozitiflerin ne kadarını yakaladığımızdır. Örneğin kanser taramasında recall, spam filtresinde precision daha kritiktir. Eşik değeri bu dengeyi ayarlar.', ['Precision ile recall ters tanımlanmaz: recall pozitif dediklerimizin; recall, pozitif dediklerimizin; precision ise gerçek pozitif', 'İkisi arasında ödünleşim vardır: ikisi birlikte artar; ödünleşim yoktur']),
      ]],
      ['Modelleme Vakası', 'Mid', [
        q('vaka', 'Bir müşteri kaybı (churn) modeli geliştireceksin. Adımların neler?',
          ['Problem tanımı: tanım, churn, hedef, target', 'Özellik mühendisliği: özellik, feature, sinyal', 'Model ve değerlendirme: model, metrik, auc', 'İş aksiyonu: aksiyon, kampanya, iş'],
          'Önce churn’ün tanımını netleştiririm (örneğin 30 gün aktif olmamak). Kullanım sıklığı, şikâyetler gibi özellikler çıkarır, modeli AUC ve precision/recall ile değerlendiririm. Asıl değer, riskli müşterilere hedefli kampanya gibi bir iş aksiyonuna bağlanmasıdır.', ['Dengesiz veride accuracy yetmez: model mükemmel; başka metriğe bakmaya gerek yok; herkesi kalacak diye']),
      ]],
      ['Değer & Önceliklendirme', 'Senior', [
        q('vaka', 'İş birimine bir makine öğrenmesi projesinin değerini nasıl kanıtlar ve projeleri nasıl önceliklendirirsin?',
          ['İş metriği: iş metriği, gelir, maliyet, kpi, cost', 'Basit başlangıç: basit, baseline, kural', 'Deneyle kanıt: a/b, deney, experiment, pilot', 'Getiri hesabı: getiri, değer, roi', 'Risk / etik: risk, etik, yanlılık, bias'],
          'Her projeyi gelir artışı ya da maliyet düşüşü gibi somut bir iş metriğine bağlarım. Önce kural tabanlı basit bir baseline kurar, modelin bunu ne kadar geçtiğini gösteririm. Etkiyi bir A/B deneyi ile ölçerek iddiayı kanıta dönüştürürüm. Projeleri beklenen getiri ve gereken emeğe göre sıralar, değeri en hızlı gelenleri öne alırım. Veri yanlılığı ve etik risk taşıyan projeler için ek kontroller planlarım.', ['Karmaşık model değer demek değildir: ne kadar karmaşık...o kadar değerli; kıyaslamak zaman kaybı; başka bir şeye gerek yok']),
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
          ['Kullanıcı segmenti: kullanıcı, segment, persona, benim gibi', 'Problem: problem, sorun, ihtiyaç, pain point', 'Çözüm önerisi: özellik, çözüm, öner', 'Başarı metriği: metrik, ölç, oran, kpi, metric, retention'],
          'Hedef kullanıcıyı seçer, onların en büyük problemini tanımlarım. 2–3 çözüm fikrini etki/efor ile önceliklendiririm. Başarıyı örneğin haftalık tekrar kullanım oranıyla ölçerim.', ['Kullanıcıyı ve ölçümü atlamak: kullanıcıya hiç sormadan; ölçmeye gerek yok; ne kadar çok özellik']),
        q('teknik', 'Bir özellik listesini nasıl önceliklendirirsin?',
          ['Çerçeve: rice, moscow, etki, efor, impact, effort', 'Hedefle bağlantı: hedef, strateji, okr', 'Veri / geri bildirim: veri, geri bildirim, kullanıcı, feedback, data, analytics, müşteri şikâyet, müşteri talep'],
          'Önce şirket hedefleriyle bağlantıya bakarım. RICE gibi bir çerçeveyle erişim, etki, güven ve eforu puanlarım. Kullanıcı geri bildirimi ve veriyle puanları doğrular, sonucu paydaşlarla şeffaf paylaşırım.', ['Öncelik kıdemle belirlenmez: en yüksek sesle; en kıdemli kişinin']),
      ]],
      ['Metrikler', 'Mid', [
        q('vaka', 'Bir yemek siparişi uygulamasının başarısını hangi metriklerle ölçersin?',
          ['Ana metrik: north star, ana metrik, kuzey', 'Edinim: edinim, yeni kullanıcı, indirme, acquisition, install, cac, indir', 'Tutma: retention, tutma, tekrar', 'Gelir / sepet: gelir, sepet, sipariş başına, aov, ortalama sipariş', 'Karşı metrik: teslim süre, iptal, şikayet, memnuniyet, delivery, nps, guardrail, şikâyet, teslimat süre, memnun'],
          'North star olarak haftalık tamamlanan sipariş sayısını seçerim. Bunu edinim, 30 günlük tekrar sipariş ve sepet tutarıyla desteklerim. Kaliteyi korumak için teslim süresi ve iptal oranını karşı metrik olarak izlerim.', ['Tek metrik indirme değildir: tek bakmam gereken metrik indirme; indirme artıyorsa; iptaller önemli değil; teslim süresi...önemli değil']),
      ]],
      ['Strateji', 'Senior', [
        q('vaka', 'Şirket yeni bir pazara (örneğin Almanya) açılmak istiyor. Nasıl karar verirsin?',
          ['Pazar büyüklüğü: pazar, büyüklük, market, talep, potansiyel müşteri', 'Rekabet: rakip, rekabet, competitor', 'Yerelleştirme: yerel, dil, regülasyon, yasal, local, compliance, gdpr, felemenkçe, almanca', 'Pilot: pilot, test, deney, mvp, deneme'],
          'Pazar büyüklüğünü ve rekabeti çıkarırım. Dil, ödeme alışkanlıkları ve regülasyon gibi yerelleştirme maliyetlerini değerlendiririm. Tam açılış yerine bir şehirde pilot başlatıp net başarı kriterleriyle karar veririm.', ['Yeni pazar araştırmasız açılmaz: aynen tutar; yerelleştirmeye...gerek yok; pilot yapmaya gerek yok; doğrudan tüm ülkeye']),
      ]],
    ]),
    track('po', 'Ürün Sahibi / Agile', 'list', 'User story, Scrum, backlog', [
      ['Agile Temelleri', 'Junior', [
        q('teknik', 'İyi bir user story nasıl yazılır?',
          ['Format: kullanıcı olarak, istiyorum, böylece, as a, i want, so that, öğretmen olarak', 'Kabul kriterleri: kabul, kriter, acceptance, given, bitmiş say', 'Küçük ve bağımsız: küçük, bağımsız, invest, bitecek boyut, iki-üç günde', 'Değer: değer, fayda, value, kazandır'],
          '“Bir [kullanıcı] olarak [ihtiyaç] istiyorum, böylece [fayda]” formatında yazarım. Net kabul kriterleri eklerim. Story’nin bir sprintte bitecek kadar küçük, bağımsız ve test edilebilir olmasına (INVEST) dikkat ederim.', ['User story teknik görev listesi değildir: teknik bir görev listesi; kabul kriterine gerek yok']),
        q('teknik', 'Scrum’daki toplantıları ve amaçlarını anlatır mısın?',
          ['Sprint planlama: planlama, planning, planlıyoruz, planlarız', 'Günlük toplantı: daily, günlük, her sabah, her gün, stand-up', 'Sprint review: review, gözden, demo, ürün sahibine, sprint bitince', 'Retrospektif: retro, retrospektif, geriye dönük'],
          'Sprint planlamada hedef ve iş seçilir. Daily’de ekip ilerlemeyi ve engelleri paylaşır. Review’da çıkan iş paydaşlara gösterilip geri bildirim alınır. Retrospektifte ekip çalışma şeklini iyileştirmek için ne değiştireceğini konuşur.', ['Scrum toplantıları performans değerlendirmesi değildir: sadece haftalık bir toplantı; herkesin performansını değerlendir; retrospektif ise müşteriye']),
      ]],
      ['Backlog Yönetimi', 'Mid', [
        q('vaka', 'Sprint ortasında acil bir talep geldi. Ne yaparsın?',
          ['Etkiyi değerlendirme: etki, aciliyet, öncelik, urgency, kritik, ne kaybeder', 'Takas: çıkar, yerine, takas, swap, sonraki sprint, ertele', 'Ekiple konuşma: ekip, konuş, team, sync, geliştiricilerle', 'Paydaş iletişimi: paydaş, bilgilendir, stakeholder, haber ver, talep sahib'],
          'Önce talebin gerçekten acil olup olmadığını ve etkisini değerlendiririm. Gerçekten acilse ekiple konuşup sprintten eşdeğer büyüklükte bir işi çıkarırım. Değişikliği ve gerekçesini paydaşlara şeffafça bildiririm.', ['Sprint gizlice şişirilmez: hiç değiştirmeden...ek iş; fazla mesai yapar; haber vermeye gerek yok']),
      ]],
      ['Ölçekli Agile', 'Senior', [
        q('vaka', 'Birden fazla takımın aynı ürün üzerinde çalıştığı bir yapıda bağımlılıkları ve öncelikleri nasıl yönetirsin?',
          ['Ortak hedef: ortak hedef, yol harita, okr', 'Bağımlılık görünürlüğü: bağımlılık, görünür, dependency, kimin kimi', 'Ortak planlama: ortak planlama, planlama oturum, pi planning, big room', 'Tek öncelik listesi: tek bir öncelik, öncelik listesi, tek bir prioritized, tek bir backlog', 'Düzenli senkron: senkron, scrum of scrums, sync'],
          'Tüm takımları aynı ortak hedefe ve yol haritasına bağlarım; OKR’lar bunun için iyi bir araçtır. Çeyrek başında takımlarla ortak planlama oturumu yapar, bağımlılıkları bir panoda görünür hale getiririm. Ürün için tek bir öncelik listesi tutarım ki takımlar çelişen işler yapmasın. Haftalık scrum of scrums ile takımlar arasında senkron kalır, engelleri erken çözeriz.', ['Takımlar ayrı ayrı önceliklendirmez: her takımın kendi öncelik listesi; ortak plan zaman kaybı; her takım kendi işine bakar']),
      ]],
    ]),
    track('ux', 'UX/UI Tasarım', 'color-palette', 'Araştırma, akış tasarımı, kullanılabilirlik', [
      ['Araştırma', 'Junior', [
        q('teknik', 'Kullanıcı araştırması yöntemlerinden bildiklerini anlatır mısın?',
          ['Görüşme: görüşme, mülakat, interview, sohbet, birebir', 'Kullanılabilirlik testi: kullanılabilirlik, usability, test, prototip', 'Anket: anket, survey', 'Analitik: analitik, veri, ısı haritası, analytics, hotjar, oturum kayd'],
          'Nitel tarafta kullanıcı görüşmeleri ve kullanılabilirlik testleri ile “neden”i anlarım. Nicel tarafta anketler ve ürün analitiği, ısı haritalarıyla “ne kadar”ı ölçerim. Soruya göre yöntemi seçerim.', ['Tek yöntem odak grubu değildir: tek yöntem odak grubu; aynen yaparsın; test etmeye gerek kalmaz']),
        q('vaka', 'Bir tasarım kararını ikna olmayan bir paydaşa nasıl savunursun?',
          ['Kullanıcı verisi: kullanıcı, veri, araştırma, data, usability', 'İş hedefi: hedef, iş, metrik, conversion, dönüşüm', 'Alternatifler: alternatif, seçenek, versiyon', 'Test önerisi: test, a/b, deneyelim'],
          'Kararı kullanıcı araştırmasından gelen bulgulara ve iş hedefine bağlarım. Değerlendirdiğim alternatifleri ve neden elendiklerini gösteririm. Anlaşamazsak iki seçeneği A/B testi ile denemeyi öneririm.', ['Savunmadan teslim olmak ya da dayatmak: ne derse onu yaparım; bakmaya gerek yok; en iyisini ben bilirim']),
      ]],
      ['Akış İyileştirme', 'Mid', [
        q('vaka', 'Bir uygulamanın kayıt akışında terk oranı yüksek. Nasıl iyileştirirsin?',
          ['Huni analizi: huni, adım, nerede, funnel, drop-off, step', 'Adım azaltma: azalt, kısalt, sosyal giriş, indir, ertele', 'Kullanıcı testi: test, gözlem, deneme', 'Ölçüm: ölç, oran, conversion, tamamlama'],
          'Önce huni analiziyle kullanıcıların hangi adımda çıktığını bulurum. Birkaç kullanıcıyı gözlemleyerek nedenini anlarım. Gereksiz alanları kaldırır, sosyal giriş ekler, adımları kısaltırım; değişikliğin etkisini tamamlama oranıyla ölçerim.', ['Daha çok alan terk oranını düşürmez: daha çok zorunlu alan; ölçmeye gerek yok']),
      ]],
      ['Tasarım Sistemi', 'Senior', [
        q('vaka', 'Tasarım sistemi olmayan, hızla büyüyen bir üründe tasarım tutarlılığını nasıl sağlarsın?',
          ['Envanter çıkarma: envanter, denetim, audit', 'Bileşen kütüphanesi: bileşen, kütüphane, component, library, storybook', 'Tasarım tokenları: token, ilke', 'Benimsetme: benimse, geliştirici, eğitim, developer, adoption', 'Yönetişim: katkı, sürüm, yönetişim, contribution, version'],
          'Önce üründeki tüm ekranların envanterini çıkarıp bir denetim yaparım; kaç farklı buton ya da renk olduğunu görmek ikna edici olur. Renk, tipografi ve boşluk için tasarım tokenları ve temel ilkeler tanımlarım. En çok kullanılan parçalardan başlayarak tasarım ve kodda eşleşen bir bileşen kütüphanesi kurarım. Geliştiricilerle birlikte çalışıp ekiplerin sistemi benimsemesi için eğitim veririm. Katkı ve sürüm kurallarıyla bir yönetişim modeli kurarak sistemi canlı tutarım.', ['Tutarlılık sonraya bırakılmaz: büyük şirketlere göre; kendi bileşenlerini yapmalı; tutarlılık sonra düşünülür; tutarlılık kendiliğinden gelir']),
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
          ['Dönüşüm: dönüşüm, conversion, satış', 'Maliyet: cac, cpa, maliyet, cpc, kaça gel', 'Getiri: roas, roi, getiri, kaç lira ciro', 'Hedefe göre seçim: hedef, amaç, farkındalık, objective, awareness'],
          'Önce kampanya hedefini netleştiririm: farkındalık mı, satış mı. Satış hedefinde dönüşüm oranı, edinim maliyeti (CAC/CPA) ve ROAS’a; farkındalıkta erişim ve hatırlanırlığa bakarım.', ['Beğeni tek metrik değildir: tek önemli metrik beğeni; sadece büyük markalar için']),
      ]],
      ['Kampanya Vakaları', 'Mid', [
        q('vaka', '50.000 TL bütçeyle yeni bir kahve markasını nasıl tanıtırsın?',
          ['Hedef kitle: hedef kitle, persona, kitle, audience, hedefle', 'Kanal seçimi: instagram, tiktok, kanal, influencer, sosyal medya, fenomen, reels', 'Bütçe dağılımı: bütçe, dağıt, %, budget', 'Ölçüm: ölç, metrik, test, track'],
          'Hedef kitleyi 20–35 yaş şehirli kahve severler olarak tanımlarım. Bütçenin %50’sini mikro influencer’lara, %30’unu Instagram/TikTok reklamlarına, %20’sini deneme etkinliklerine ayırırım. İlk iki haftada kreatifleri test eder, bütçeyi edinim maliyetine göre kaydırırım.', ['Tüm bütçe tek ünlüye gitmez: tamamını tek bir ünlüye; ölçmeye gerek yok']),
        q('vaka', 'Kampanyanın ROAS değeri iki haftada yarıya düştü. Ne yaparsın?',
          ['Kırılım analizi: kampanya, kanal, kreatif, kırılım, breakdown, ad set, reklam set', 'Kreatif yorgunluğu: kreatif, yorgun, frekans, frequency, fatigue, sıkıl', 'Hedefleme: hedef kitle, hedefleme, targeting, audience', 'Ölçüm sorunu: takip, pixel, attribution, ölçüm'],
          'Önce ölçümün doğru çalıştığını (pixel, attribution) kontrol ederim. Sonra kanal, kampanya ve kreatif kırılımında düşüşün nerede olduğuna bakarım. Frekans yüksekse kreatif yorgunluğu vardır, yeni kreatifler ve hedefleme testleri başlatırım.', ['Sebebe bakmadan karar verilmez: hemen tamamen kapat; sebebine bakmaya gerek yok; bütçeyi iki katına']),
      ]],
      ['Bütçe & Atribüsyon', 'Senior', [
        q('vaka', 'Pazarlama bütçesini kanallar arasında nasıl dağıtırsın ve hangi kanalın gerçekten işe yaradığını nasıl ölçersin?',
          ['Hedef ve KPI: hedef, kpi, cac', 'Atribüsyon modeli: atribüsyon, son tıklama, attribution, last-click', 'Artımlılık testi: artımlı, holdout, kontrol grubu, lift', 'Marjinal dağıtım: marjinal, kaydır, marginal, mmm', 'Müşteri değeri: ltv, yaşam boyu'],
          'Önce iş hedefini ve kanal başına CAC gibi KPI’ları netleştiririm. Son tıklama atribüsyonu bazı kanalları olduğundan iyi gösterir, bu yüzden veri odaklı bir atribüsyon modeli kullanırım. Asıl etkiyi görmek için bir bölgeyi kampanyadan hariç tutan holdout testleriyle artımlı katkıyı ölçerim. Bütçeyi her kanalın marjinal getirisine göre dağıtır, getirisi düşen kanaldan yükselene kaydırırım. Kararları kısa vadeli satış yerine müşterinin yaşam boyu değeri (LTV) ile birlikte değerlendiririm.', ['Son tıklama gerçek etkiyi göstermez: son tıklama...kesin olarak gösterir; bütçenin tamamını ver']),
      ]],
    ]),
    track('icerik', 'İçerik & Sosyal Medya', 'chatbubbles', 'İçerik planı, topluluk, kriz', [
      ['İçerik Planlama', 'Junior', [
        q('vaka', 'Bir markanın sosyal medya içerik takvimini nasıl planlarsın?',
          ['Hedef / kitle: hedef, kitle, audience, goal, takipçi', 'İçerik sütunları: sütun, tema, kategori, pillar, başlık', 'Sıklık / platform: sıklık, platform, haftada, her gün', 'Ölçüm: etkileşim, erişim, ölç, engagement, reach'],
          'Önce hedefi ve kitleyi belirlerim. Eğitici, eğlendirici ve ürün odaklı gibi 3–4 içerik sütunu oluştururum. Her platform için haftalık paylaşım sıklığı belirler, etkileşim ve erişime göre takvimi her ay güncellerim.', ['Plansız ve ölçümsüz paylaşım: takvim yapmaya gerek yok; aynı içeriği aynı anda; ne kadar çok paylaşırsam']),
      ]],
      ['Topluluk & Kriz', 'Mid', [
        q('vaka', 'Bir paylaşım yanlış anlaşıldı ve tepki çekiyor. Ne yaparsın?',
          ['Hızlı yanıt: hızlı, hemen, ilk bir saat, ilk saat, aynı gün', 'Dinleme / analiz: anla, dinle, analiz, listening, sentiment', 'Özür / şeffaflık: özür, şeffaf, açıklama, apology, statement, üzgün', 'Süreç iyileştirme: süreç, onay, ders, approval, post-mortem, kural'],
          'Hızlıca durumu ve tepkinin nedenini analiz ederim. Gerekirse paylaşımı kaldırıp samimi ve şeffaf bir açıklama veya özür yayımlarım. Sonrasında benzer hatayı önlemek için içerik onay sürecini gözden geçiririm.', ['Tepkiyi bastırmak çözüm değildir: özür dilemek zayıflık; tepki gösterenleri engelle; yorum yapanları engelle; kendi kendine sönmesini']),
      ]],
      ['Marka Stratejisi', 'Senior', [
        q('vaka', 'Bir markanın sosyal medya stratejisini sıfırdan nasıl kurarsın?',
          ['Hedef kitle: hedef kitle, persona', 'Ölçülebilir hedefler: kpi, ölçülebilir, smart', 'Platform seçimi: platform, channel, kanal', 'İçerik sütunları ve ton: sütun, ton, pillar, voice', 'Ölçüm ve iyileştirme: analiz, iyileştir, optimiz, reporting'],
          'İşe hedef kitleyi tanımlayıp birkaç persona çıkararak başlarım. Marka bilinirliği ya da trafik gibi ölçülebilir hedefler ve her biri için bir KPI belirlerim. Kitlenin gerçekten vakit geçirdiği platformları seçer, her birine uygun format planlarım. Markanın sesini ve tonunu tanımlar, içerikleri üç dört içerik sütunu etrafında toplarım. Aylık analizle neyin çalıştığına bakar, planı sürekli iyileştiririm.', ['Strateji yerine viral umudu: strateji kurmaya gerek yok; takipçi sayısı tek']),
      ]],
    ]),
    track('seo', 'SEO', 'search', 'Arama motoru optimizasyonu', [
      ['SEO Temelleri', 'Junior', [
        q('teknik', 'SEO’nun teknik, içerik ve otorite (backlink) taraflarını açıklar mısın?',
          ['Teknik SEO: hız, site haritası, indeks, teknik, technical, sitemap, core web, crawl, tarayabil', 'İçerik: anahtar kelime, içerik, niyet, keyword, intent, content', 'Otorite: backlink, bağlantı, otorite, link, authority', 'Ölçüm: search console, sıralama, trafik, traffic, ranking'],
          'Teknik tarafta site hızı, site haritası ve indekslenebilirlik; içerikte arama niyetine uygun, anahtar kelimeleri doğal kullanan sayfalar; otoritede güvenilir sitelerden gelen backlinkler önemlidir. Sonuçları Search Console ve organik trafikle ölçerim.', ['Anahtar kelime doldurmak işe yaramaz: ne kadar çok tekrar; her paragrafta tekrar', 'Backlink satın alınmaz: satın alınıp; toplu eklenirse; para verip en üste']),
      ]],
      ['SEO Vakaları', 'Mid', [
        q('vaka', 'Organik trafik aniden %30 düştü. Nasıl incelersin?',
          ['Algoritma güncellemesi: algoritma, güncelleme, core update', 'Teknik hata: robots, noindex, indeks, teknik, crawl, canonical', 'Sayfa bazlı analiz: sayfa, kırılım, sorgu, page, query, breakdown', 'Rakip: rakip, competitor'],
          'Önce bir Google algoritma güncellemesiyle çakışıp çakışmadığına bakarım. Robots.txt, noindex veya yönlendirme gibi teknik hataları kontrol ederim. Search Console’da hangi sayfa ve sorguların düştüğünü bulur, rakiplerin o sorgulardaki durumunu incelerim.', ['Düşüş incelenmeden geçiştirilmez: her zaman mevsimsel; incelemeye gerek yok; kendiliğinden geri gel']),
      ]],
      ['SEO Stratejisi', 'Senior', [
        q('vaka', 'Organik trafiği bir yılda iki katına çıkarmak için nasıl bir SEO stratejisi kurarsın?',
          ['Teknik denetim: teknik, denetim, tarama, technical, audit', 'Arama niyeti: anahtar kelime, niyet, keyword, ne aradı', 'İçerik planı: konu kümesi, içerik plan, topic cluster, pillar, rehber sayfa, ana konu', 'Otorite ve bağlantı: backlink, otorite, link building, bağlantı, misafir yazar', 'Ölçüm: search console, takip, gsc'],
          'Önce sitenin teknik denetimini yapıp tarama, hız ve indeksleme sorunlarını çözerim. Anahtar kelime araştırmasını arama niyetine göre gruplar, en yüksek potansiyelli konuları seçerim. Bu konular etrafında birbirine bağlı konu kümeleri oluşturan bir içerik planı hazırlarım. Değerli içerik ve iş birlikleriyle kaliteli backlink kazanıp sitenin otoritesini artırırım. İlerlemeyi Search Console ve sıralama araçlarıyla aylık takip ederim.', ['Seri içerik ve kelime doldurmak strateji değildir: günde yüz yazı; her paragrafta tekrar; sayı arttıkça trafik']),
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
          ['İhtiyacı sorma: soru, ihtiyaç, ne için, nasıl kullan', 'Fayda odaklılık: fayda, sağlar, kolay, benefit, izlenim bırak', 'İtiraz karşılama: itiraz, pahalı, fiyat, objection, diyebilirsiniz', 'Kapanış: kapanış, satın, deneyin, teklif, close, bugün alır'],
          'Önce soru sorarım: Kalemi en çok ne için kullanıyorsunuz? Cevaba göre faydayı anlatırım. Fiyat itirazını kullanım süresiyle karşılar, bugün almasını sağlayacak net bir teklifle kapatırım.', ['Soru sormadan ısrarla satılmaz: soru sormak zaman kaybı; ısrar ettikçe']),
      ]],
      ['Pazarlık & Pipeline', 'Mid', [
        q('vaka', 'Müşteri “Rakibiniz %20 daha ucuz” diyor. Ne cevap verirsin?',
          ['Anlama: soru, anla, neye göre, sorar', 'Değer vurgusu: değer, kalite, destek, toplam maliyet', 'Karşılıklı takas: karşılığında, uzun vade, paket'],
          'Önce karşılaştırmanın neyi kapsadığını sorarım. Toplam sahip olma maliyetini, destek ve kaliteyi somut rakamlarla gösteririm. İndirim gerekiyorsa karşılığında uzun vadeli sözleşme gibi bir takas isterim.', ['Hemen fiyat eşlenmez: hemen %20 indirim; hemen rakiple eşitle', 'Rakip kötülenmez: rakibin ürünü kötü']),
        q('teknik', 'Satış hunini (pipeline) nasıl yönetirsin?',
          ['Aşamalar: aşama, huni, stage, adım', 'Nitelendirme: nitelendir, bütçe, karar verici, qualify, bant, meddic, kararı kim, parası var', 'CRM: crm, kayıt, salesforce, hubspot', 'Dönüşüm oranları: oran, dönüşüm, tahmin, conversion, forecast'],
          'Fırsatları net aşamalarda takip ederim. Her fırsatı bütçe, karar verici, ihtiyaç ve zamanlamaya göre nitelendiririm. Her şeyi CRM’e kaydeder, aşamalar arası dönüşüm oranlarıyla satış tahmini yaparım.', ['Her fırsat kapanmaz: her fırsat...kapanır; elemeye gerek yok; kesin satış diye']),
      ]],
      ['Satış Liderliği', 'Senior', [
        q('vaka', 'Satış ekibin çeyrek hedefinin %30 gerisinde. Çeyreği kurtarmak için ne yaparsın?',
          ['Pipeline analizi: pipeline, huni', 'Darboğaz tespiti: darboğaz, aşama, stage, stuck', 'Fırsat önceliklendirme: büyük fırsat, öncelik, en büyük, top 10', 'Ekip koçluğu: koçluk, birebir, coaching', 'Şeffaf tahmin: tahmin, forecast, ihtimal'],
          'Önce pipeline’ı aşama aşama inceleyip huninin nerede tıkandığını bulurum. Darboğaz teklif aşamasındaysa farklı, ilk görüşmedeyse farklı bir aksiyon gerekir. Kapanmaya en yakın ve en büyük fırsatlara öncelik verip bunlara kaynak ayırırım. Temsilcilerle birebir koçluk yaparak zorlandıkları görüşmelere birlikte hazırlanırız. Yönetime gerçekçi bir forecast sunar, tahmini her hafta güncellerim.', ['Korku ve şişirilmiş tahmin çözüm değildir: işten çıkarılacağını söyle; ulaşacakmışız gibi göster']),
      ]],
    ]),
    track('perakende', 'Perakende Satış', 'storefront', 'Mağaza, müşteri deneyimi', [
      ['Müşteri Karşılama', 'Junior', [
        q('vaka', 'Mağazaya giren bir müşteriye nasıl yaklaşırsın?',
          ['Karşılama: karşıla, selam, gülümse, greeting, hoş geldin', 'İhtiyacı sorma: soru, ihtiyaç, sorar, needs', 'Ürün önerisi: öner, ürün, recommend', 'Ek satış: ek, tamamlayıcı, çapraz, cross, upsell, yanına'],
          'Güler yüzle karşılar, baskı yapmadan alan tanırım. Açık uçlu sorularla ne aradığını anlar, ihtiyacına uygun ürünü öneririm. Uygunsa tamamlayıcı bir ürünle ek satış yaparım.', ['Müşteri sıkıştırılmaz: peşine takıl; soru sormak müşteriyi kaçırır; ne kadar ısrar']),
      ]],
      ['Zor Müşteriler', 'Mid', [
        q('vaka', 'Sinirli bir müşteri ürünü iade etmek istiyor ama iade süresi geçmiş. Ne yaparsın?',
          ['Sakin dinleme: dinle, sakin, empati, empathy', 'Politikayı açıklama: politika, kural, süre, policy, iade almıyor', 'Alternatif çözüm: alternatif, değişim, puan, yönetici, exchange, store credit, manager, eskal, değiştir', 'Müşteriyi kazanma: memnun, tekrar gel, kaybetmemeye, retention, sadık'],
          'Önce sakin şekilde dinler, empati kurarım. İade politikasını kibarca açıklarım. Değişim, mağaza puanı veya yöneticiyle istisna gibi alternatifler sunarak müşteriyi kaybetmemeye çalışırım.', ['Müşteri kaybı göze alınmaz: güvenliği çağır; kaybetmek dert değil; yapacak bir şey yok']),
      ]],
      ['Mağaza Yönetimi', 'Senior', [
        q('vaka', 'Yönettiğin mağazanın satışları bölge ortalamasının altında. Nasıl toparlarsın?',
          ['Veri analizi: dönüşüm oranı, sepet, conversion, basket', 'Trafik: trafik, ziyaretçi, footfall', 'Personel ve vardiya: personel, vardiya, staff', 'Vitrin ve stok: vitrin, stok, visual merch', 'Hedef ve takip: günlük hedef, takip, daily target'],
          'Önce mağaza trafiğini, dönüşüm oranını ve ortalama sepeti bölgeyle karşılaştırırım. Ziyaretçi az mı geliyor, yoksa gelen mi satın almıyor, bunu ayırırım. Dönüşüm düşükse personel eğitimi ve yoğun saatlere göre vardiya planı üzerinde çalışırım. Vitrin düzenini ve çok satan ürünlerin stokta olup olmadığını kontrol ederim. Ekiple günlük hedef koyar, sonuçları her gün birlikte takip ederiz.', ['Veriye bakmadan suç personele atılmaz: sorun personeldir; hepsini değiştir; rakamlara bakmaya gerek yok']),
      ]],
    ]),
    track('musteri', 'Müşteri / Hesap Yönetimi', 'headset', 'Memnuniyet, yenileme, büyüme', [
      ['Müşteri Memnuniyeti', 'Junior', [
        q('teknik', 'Müşteri memnuniyetini nasıl ölçersin?',
          ['NPS: nps, önerir misiniz, tavsiye eder', 'CSAT: csat, memnuniyet anketi, anket', 'Geri bildirim: geri bildirim, yorum, review, ticket, şikâyet, şikayet', 'Tekrar alım / kayıp: tekrar, churn, yenileme, retention, repeat, düzenli gel'],
          'NPS ile tavsiye etme eğilimini, CSAT ile belirli bir etkileşimden memnuniyeti ölçerim. Açık uçlu geri bildirimleri düzenli okurum. Asıl sonuç göstergesi olarak yenileme ve kayıp (churn) oranını takip ederim.', ['Şikâyet yokluğu memnuniyet değildir: şikâyet gelmiyorsa; şikayet gelmiyorsa; anket yapmaya gerek yok; sadece büyük şirketler; bir şey demiyorsa memnun']),
      ]],
      ['Hesap Kurtarma', 'Mid', [
        q('vaka', 'Büyük bir müşteri sözleşmeyi yenilemeyeceğini söylüyor. Ne yaparsın?',
          ['Nedeni anlama: neden, anla, dinle, root cause', 'Değeri gösterme: değer, kazanç, rapor, roi, qbr, rakamlarla göster', 'Çözüm planı: plan, çözüm, aksiyon', 'Üst yönetim desteği: yönetici, üst, executive, genel müdür'],
          'Önce gerçek nedeni anlamak için dinlerim. Şimdiye kadar sağladığımız değeri rakamlarla gösteren bir rapor hazırlarım. Sorunlara somut bir aksiyon planı sunar, gerekirse üst yönetimi de görüşmeye dahil ederim.', ['Nedeni anlamadan indirim çözüm değildir: nedenini sormaya gerek yok; sadece fiyata bakar; fiyatı yarıya']),
      ]],
      ['Müşteri Başarısı Stratejisi', 'Senior', [
        q('vaka', 'Müşteri kayıp oranını (churn) düşürmek için ekip olarak nasıl bir program kurarsın?',
          ['Kayıp nedenleri: neden, segment, reason, cohort', 'Sağlık skoru: sağlık skoru, erken uyarı, health score', 'Onboarding: onboarding', 'Proaktif temas: proaktif, düzenli, proactive', 'Ölçüm: churn oranı, nrr, retention, kayıp oran'],
          'Önce kaybedilen müşterileri segment bazında inceleyip ayrılma nedenlerini çıkarırım. Kullanım ve destek verilerinden bir sağlık skoru oluşturup erken uyarı sinyallerini tanımlarım. Müşterinin ilk haftalarındaki onboarding sürecini güçlendiririm, çünkü kayıpların çoğu orada başlar. Riskli hesaplarla proaktif ve düzenli görüşmeler planlarım. Başarıyı churn oranı ve NRR ile ölçer, programı üç ayda bir gözden geçiririm.', ['Churn tek başına indirimle çözülmez: tek yolu indirim; herkese %50 indirim; analiz etmek zaman kaybı; kayıp önemli değil']),
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
          ['Gelir tablosu: gelir tablo, kar, zarar, p&l, income statement, kâr', 'Bilanço: bilanço, varlık, yükümlülük, özkaynak, balance sheet, equity', 'Nakit akış tablosu: nakit akış, cash flow', 'Tablolar arası bağlantı: net kar, bağlan, aktar, net kâr, retained, net income, özsermayeye eklen, birbirine bağlar'],
          'Gelir tablosu dönemin gelir, gider ve net kârını gösterir. Bilanço belirli bir andaki varlık, yükümlülük ve özkaynağı gösterir. Nakit akış tablosu nakdin nasıl değiştiğini gösterir. Net kâr özkaynağa aktarılır ve nakit akışın başlangıç noktasıdır.', ['Gelir tablosu nakdi göstermez: gelir tablosu...kasasındaki para; nakdi de mutlaka; ilişkisi yoktur']),
      ]],
      ['Kapanış', 'Mid', [
        q('vaka', 'Ay sonu kapanış sürecinde neler yaparsın?',
          ['Mutabakat: mutabakat, banka', 'Tahakkuk / karşılık: tahakkuk, karşılık, accrual, provision', 'Kontrol: kontrol, doğrula, review, flux, sorgula', 'Raporlama: rapor, report, özet tablo'],
          'Banka ve cari hesap mutabakatlarını yaparım. Dönem tahakkuklarını ve karşılıkları kaydederim. Mizanı ve olağandışı hareketleri kontrol eder, ardından yönetim raporlarını hazırlarım.', ['Tahakkuk atlanmaz: ayırmaya gerek yok; o ayın gideri sayılmaz']),
      ]],
      ['Kapanışı Hızlandırma', 'Senior', [
        q('vaka', 'Ay sonu kapanışı 10 günde bitiyor. 5 güne nasıl indirirsin?',
          ['Süreç haritası: süreç, darboğaz, process, critical path', 'Otomasyon: otomasyon, mutabakat, otomatik', 'Kapanış takvimi: takvim, sorumlu, calendar, raci', 'Ön kapanış: ön kapanış, ay içinde, soft close, ay bitmeden', 'Kalite kontrol: kontrol listesi, checklist'],
          'Önce kapanış sürecinin haritasını çıkarıp hangi adımın darboğaz olduğunu bulurum. Banka ve şirketler arası mutabakat gibi tekrar eden işleri otomasyon ile hızlandırırım. Her adımın sorumlusunu ve gününü gösteren bir kapanış takvimi hazırlarım. Tahakkukları ve kontrolleri ay içinde yaparak bir ön kapanış uygularım. Hataların geri dönüş yaratmaması için bir kontrol listesiyle kaliteyi korurum.', ['Hız için kontrol atlanmaz: mutabakatları atla; kontrolleri...atla; sonraki ay düzelt; fazla mesai yaptır']),
      ]],
    ]),
    track('fin-analiz', 'Finansal Analiz', 'stats-chart', 'Nakit, değerleme, modelleme', [
      ['Analiz Temelleri', 'Junior', [
        q('vaka', 'Kârlı görünen bir şirket neden nakit sıkıntısı yaşayabilir?',
          ['Alacaklar: alacak, vade, tahsil, receivable, dso', 'Stok: stok, inventory', 'Yatırım harcaması: yatırım, capex', 'Tahakkuk ve nakit farkı: tahakkuk, nakit, fark, accrual, cash'],
          'Kâr tahakkuk esasına göre hesaplanır, nakit ise tahsil edildiğinde girer. Uzun vadeli alacaklar, artan stok veya büyük yatırım harcamaları kâr varken nakdi tüketebilir. Bu yüzden işletme sermayesini izlerim.', ['Kâr ile nakit aynı şey değildir: kâr ile nakit her zaman aynı; nakit sıkıntısı yaşayamaz; kârlıysa nakit sorunu olmaz']),
      ]],
      ['Değerleme', 'Mid', [
        q('teknik', 'Bir şirketi değerlemek için hangi yöntemleri kullanırsın?',
          ['İndirgenmiş nakit akışı: dcf, indirgenmiş nakit, bugüne indir', 'Çarpanlar: çarpan, f/k, fd/favök, multiple, benzer şirket, kaç kat, comps, ev/ebitda', 'Varsayımlar: varsayım, büyüme, iskonto, wacc, assumption, growth', 'Duyarlılık analizi: duyarlılık, senaryo, sensitivity'],
          'Gelecekteki nakit akışlarını iskonto oranıyla bugüne indiren DCF yöntemini ve benzer şirketlerin F/K, FD/FAVÖK gibi çarpanlarını birlikte kullanırım. Büyüme ve iskonto varsayımlarına duyarlılık analizi yaparak bir değer aralığı sunarım.', ['Değer ciroya eşit değildir: cirosuna eşit; çarpanlar gereksiz; varsayım yapmaya gerek yok']),
      ]],
      ['Yatırım Kararı', 'Senior', [
        q('vaka', 'Şirket yeni bir fabrikaya yatırım yapmayı düşünüyor. Bu kararı nasıl değerlendirirsin?',
          ['Nakit akış projeksiyonu: nakit akış, projeksiyon, cash flow, forecast, nakit giriş', 'NBD / İVO: net bugünkü değer, iç verim, npv, irr, bugünkü değer', 'Sermaye maliyeti: sermaye maliyeti, wacc', 'Senaryo analizi: duyarlılık, senaryo, sensitivity, worst case', 'Strateji ve risk: strateji, risk'],
          'Önce yatırım tutarını ve yıllara göre nakit akış projeksiyonunu hazırlarım. Bu nakit akışlarını şirketin sermaye maliyeti (WACC) ile iskonto ederek net bugünkü değeri hesaplarım. İç verim oranını da sermaye maliyetiyle karşılaştırırım. Talep ve fiyat varsayımları için duyarlılık ve kötü-baz-iyi senaryo analizleri yaparım. Son olarak yatırımın şirket stratejisine uyumunu ve operasyonel riskleri değerlendirip öneri sunarım.', ['Paranın zaman değeri yok sayılmaz: zaman değeri önemsiz; hesabına gerek yok']),
      ]],
    ]),
    track('denetim', 'Denetim', 'shield-checkmark', 'İç kontrol, risk, uyum', [
      ['İç Kontrol', 'Junior', [
        q('teknik', 'İç kontrol nedir, neden önemlidir?',
          ['Görevler ayrılığı: görevler ayrılığı, ayrı kişi, segregation, farklı kişi', 'Yetki / onay: onay, yetki, approval, imza', 'Risk: risk, hata, suistimal, fraud, hayali', 'Örnek: örneğin, bir keresinde'],
          'İç kontrol, hataları ve suistimali önlemek için kurulan süreçlerdir. Örneğin ödemeyi hazırlayan ile onaylayan kişinin ayrı olması (görevler ayrılığı) ve belirli tutarların üzerinde onay şartı. Finansal raporların güvenilirliğini sağlar.', ['İç kontrol yıl sonu denetimi değildir: sadece yıl sonunda; onaylaması sorun değil']),
      ]],
      ['Denetim Vakası', 'Mid', [
        q('vaka', 'Bir masraf kaleminde olağandışı bir artış fark ettin. Nasıl incelersin?',
          ['Analitik inceleme: trend, karşılaştır, analitik, variance, yoy, yan yana', 'Belge kontrolü: belge, fatura, örneklem, sample, document, vouch', 'Görüşme: görüş, sor, walkthrough, konuş', 'Raporlama: rapor, bulgu, report, finding, yazılı bildir'],
          'Önce artışı önceki dönemler ve bütçeyle karşılaştırırım. Örneklem seçip fatura ve onay belgelerini kontrol ederim. İlgili birimle görüşüp açıklama alırım, bulguları ve önerileri raporlarım.', ['İncelemeden suçlama yapılmaz: kesin biri hırsızlık; kimseye sormadan; belge incelemeye gerek yok']),
      ]],
      ['Risk Bazlı Plan', 'Senior', [
        q('vaka', 'Yıllık iç denetim planını risk bazlı olarak nasıl hazırlarsın?',
          ['Denetim evreni: denetim evreni, süreç, audit universe', 'Risk puanlama: olasılık, etki, likelihood, impact, olası', 'Önceliklendirme: yüksek risk, öncelik, high-risk', 'Kaynak planı: kaynak, kapasite, resource', 'Komite onayı: denetim komitesi, onay, audit committee'],
          'Önce şirketin tüm süreç ve birimlerini kapsayan bir denetim evreni çıkarırım. Her alanı olasılık ve etki açısından puanlar, yönetimle görüşerek bu değerlendirmeyi doğrularım. Yüksek risk taşıyan alanlara öncelik verir, düşük riskli alanları daha seyrek denetlerim. Planı ekibin kapasitesi ve uzmanlık gereksinimine göre kaynaklarla eşleştiririm. Taslak planı denetim komitesine sunup onay alır, yıl içinde risk değişirse güncellerim.', ['Risk bazlı plan atlanmaz: risk bazlı plan gereksiz; aynı derinlikte; onayına...gerek yok']),
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
          ['Pozisyonu netleştirme: ihtiyaç, yönetici, profil, gereksinim', 'Kanallar: linkedin, kariyer, kanal, ilan, forum', 'Doğrudan ulaşma: doğrudan, sourcing, mesaj', 'Referans: referans, tavsiye, referral'],
          'Önce işe alım yöneticisiyle profili ve olmazsa olmazları netleştiririm. İlanın yanında LinkedIn’de doğrudan arama yapar, kişiselleştirilmiş mesajlarla adaylara ulaşırım. Çalışan referans programını ve sektörel toplulukları da kullanırım.', ['Pasif beklemek çözüm değildir: beklemek en iyisi; doğrudan yazmak etik değil']),
        q('teknik', 'Yetkinlik bazlı mülakat nedir?',
          ['Yetkinlik tanımı: yetkinlik, beceri, competenc', 'Geçmiş davranış: geçmiş, örnek, deneyim, past, behavioral', 'Yapılandırılmış sorular: yapılandırılmış, aynı soru, standart, structured', 'Puanlama: puan, değerlendirme, ölçek, scoring, rubric, not ver'],
          'Pozisyon için kritik yetkinlikleri belirleyip her biri için adaya geçmişte yaşadığı somut örnekleri soran yapılandırılmış bir mülakattır. Tüm adaylara aynı sorular sorulur ve cevaplar ortak bir ölçekle puanlanır; bu önyargıyı azaltır.', ['Yetkinlik mülakatı varsayımsal ve serbest değildir: varsayımsal sorular sorulur; her adaya farklı sorular; sezgiyle yapılır']),
      ]],
      ['Teklif & Aday Deneyimi', 'Mid', [
        q('vaka', 'Çok istediğiniz bir aday teklifi reddetti. Ne yaparsın?',
          ['Nedeni anlama: neden, anla, sor, reason', 'Pazarlık alanı: maaş, yan hak, esnek, uzaktan, counter, bonus, remote, hybrid', 'Yöneticiyle konuşma: yönetici, bütçe, manager', 'İlişkiyi koruma: ilişki, iletişim, gelecek, talent pool, nurture, kapıyı açık'],
          'Önce reddin gerçek nedenini anlamak için adayla konuşurum. Maaş dışında esnek çalışma, yan haklar gibi pazarlık alanı varsa yöneticiyle değerlendiririm. Sonuç değişmese de ilişkiyi iyi tutarım, gelecekte yine aday olabilir.', ['Adayla bağ koparılmaz: bir daha iletişim kurmam; nedenini sormak zaman kaybı; bir daha aramam']),
      ]],
      ['İşe Alım Stratejisi', 'Senior', [
        q('vaka', 'Şirket bir yılda 100 mühendis işe almak istiyor. Bunu nasıl planlarsın?',
          ['İhtiyaç planı: ihtiyaç, rol, çeyrek', 'Kanal stratejisi: kanal, referans, üniversite', 'İşveren markası: işveren marka, employer brand', 'Mülakat kapasitesi: mülakatçı, kapasite, interviewer, capacity', 'Metrikler: dolum süresi, dönüşüm, time-to-hire, conversion'],
          'Önce yöneticilerle rol, seviye ve çeyrek bazında bir ihtiyaç planı çıkarırım. Geçmiş verilerden her kanalın verimini hesaplayıp referans programı, üniversite iş birlikleri ve doğrudan arama arasında dengeli bir kanal stratejisi kurarım. Teknik içerikler ve etkinliklerle işveren markasını güçlendiririm. Mülakatçıları eğitip kapasiteyi artırır, süreci standart adımlarla hızlandırırım. Dolum süresi, aşamalar arası dönüşüm ve teklif kabul oranını haftalık takip ederim.', ['Hız için süreç atlanmaz: mülakatları kaldır; herkese teklif; takibine gerek yok']),
      ]],
    ]),
    track('ik-is-ortagi', 'İK İş Ortağı', 'people-circle', 'Çalışan ilişkileri, performans, bağlılık', [
      ['Çalışan İlişkileri', 'Junior', [
        q('vaka', 'Bir çalışan yöneticisinden şikâyetçi olarak sana geldi. Nasıl ilerlersin?',
          ['Dinleme / gizlilik: dinle, gizli, güven, confidential, listening, aramızda kal', 'Bilgi toplama: bilgi, belge, örnek, evidence, dokümante, not al', 'Tarafsızlık: tarafsız, iki taraf, yönetici, neutral, manager', 'Takip: takip, aksiyon, çözüm, follow'],
          'Çalışanı gizlilik çerçevesinde dikkatle dinler, somut örnekleri not ederim. Tarafsız kalarak yöneticinin de görüşünü alırım. Bir çözüm planı oluşturur ve sonrasında durumu takip ederim.', ['Taraf tutmak çözüm değildir: her zaman haklı; dinlemeden; doğrudan yöneticisine ilet; hemen ilet']),
      ]],
      ['Bağlılık & Performans', 'Mid', [
        q('vaka', 'Bir ekipte çalışan devir oranı (turnover) çok yükseldi. Nasıl analiz edersin?',
          ['Veri analizi: veri, oran, kırılım, data, attrition', 'Çıkış görüşmeleri: çıkış görüşme, neden, exit interview, gidenlerle', 'Yönetici etkisi: yönetici, liderlik, manager, lider', 'Aksiyon planı: aksiyon, plan, maaş, kariyer'],
          'Önce devir oranını kıdem ve rol kırılımlarıyla incelerim. Çıkış görüşmelerinden ortak nedenleri çıkarırım; çoğu zaman yönetici ilişkisi, ücret veya kariyer gelişimi öne çıkar. Bulgulara göre yöneticiyle birlikte somut bir aksiyon planı hazırlarım.', ['Turnover\'ın tek nedeni maaş değildir: tek nedeni maaş; herkese zam; herkese maaş artışı; analiz etmeye...gerek yok']),
      ]],
      ['Değişim Yönetimi', 'Senior', [
        q('vaka', 'Bir yeniden yapılanma sürecinde çalışanların bağlılığını nasıl korursun?',
          ['Şeffaf iletişim: şeffaf, neden, transparent, town hall', 'Yöneticileri hazırlama: yönetici, hazırla, manager', 'Dinleme: dinle, anket, survey, pulse', 'Destek: destek, kariyer', 'Bağlılığı ölçme: bağlılık, takip, engagement'],
          'Değişikliğin nedenini ve çalışanlara etkisini şeffaf ve erken anlatırım; belirsizlik söylentiden daha çok zarar verir. Yöneticileri önce hazırlar, ekiplerinin sorularına cevap verebilmeleri için onlara bir rehber veririm. Kısa anketler ve odak gruplarla çalışanları dinler, kaygıları toplarım. Etkilenenlere kariyer danışmanlığı ve yeni rollere geçişte destek sağlarım. Bağlılığı düzenli nabız anketleriyle takip edip gereken yerde müdahale ederim.', ['Bilgiyi saklamak bağlılığı korumaz: son ana kadar sakla; fikrini sormaya gerek yok; hiçbir şey söylemem']),
      ]],
    ]),
  ],
};
