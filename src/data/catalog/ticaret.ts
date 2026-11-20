import { q, track, type Profession } from '../build';

export const disTicaret: Profession = {
  id: 'dis-ticaret',
  name: 'Dış Ticaret & Lojistik',
  icon: 'boat',
  color: '#1B6A8F',
  tagline: 'İhracat, lojistik operasyon, gümrük',
  tracks: [
    track('dis-ticaret-uzmani', 'Dış Ticaret Uzmanı', 'globe', 'Incoterms, ödeme şekilleri, pazar geliştirme', [
      ['Temeller', 'Junior', [
        q('teknik', 'FOB ve CIF teslim şekilleri arasındaki fark nedir?',
          ['Incoterms: incoterms', 'FOB: fob', 'CIF: cif, sigorta', 'Navlun: navlun', 'Risk geçişi: risk'],
          'İkisi de deniz taşımacılığında kullanılan Incoterms kurallarıdır. FOB’da satıcı malı yükleme limanında gemiye yükleyene kadar sorumludur; navlunu ve sigortayı alıcı öder. CIF’te ise satıcı varış limanına kadar navlunu ve asgari sigorta maliyetini öder. Ancak iki kuralda da risk, mal yükleme limanında gemiye yüklendiğinde alıcıya geçer. Yani CIF’te maliyet sorumluluğu ile risk farklı noktalarda biter.'),
      ]],
      ['Ödeme & Risk', 'Mid', [
        q('vaka', 'İlk kez çalışacağın yurt dışı bir alıcı peşin ödemeyi kabul etmiyor. Hangi ödeme şeklini önerirsin?',
          ['Risk değerlendirmesi: ülke riski, alıcı', 'Akreditif: akreditif', 'Vesaik mukabili: vesaik', 'İhracat sigortası: sigorta', 'Kademeli güven: kademeli'],
          'Önce alıcının finansal durumunu ve ülke riskini değerlendiririm. İlk işlem için bankaların ödemeyi garanti ettiği akreditif en güvenli seçenektir. Alıcı akreditif maliyetine itiraz ederse, belgelerin ödeme karşılığında teslim edildiği vesaik mukabili ödemeyi düşünebilirim. Riski azaltmak için Türk Eximbank’ın ihracat kredi sigortasını da kullanabilirim. Güven oluştukça kademeli olarak daha esnek ödeme şekillerine geçmeyi öneririm.'),
      ]],
      ['Pazar Geliştirme', 'Senior', [
        q('vaka', 'Şirketinin ihracatını yeni bir pazara açmak için nasıl bir plan yaparsın?',
          ['Pazar seçimi: pazar, veri', 'Rekabet ve fiyat: rekabet, fiyat', 'Mevzuat ve belgeler: mevzuat, sertifika', 'Satış kanalı: distribütör, fuar', 'Devlet destekleri: destek'],
          'Önce ithalat istatistikleri gibi verilerle ürünümüze talebi yüksek ve büyüyen pazarları belirlerim. Seçtiğim pazarda rekabet yapısını ve fiyat seviyelerini inceleyip konumlanmamızı netleştiririm. Ürünün o ülkenin mevzuat, etiket ve sertifika şartlarına uygunluğunu kontrol ederim. Bir distribütör ile çalışma ya da doğrudan satış gibi kanalları değerlendirir, sektör fuarları ve ticaret heyetleriyle bağlantı kurarım. Pazara giriş maliyetini azaltmak için ihracata yönelik devlet desteklerinden yararlanırım.'),
      ]],
    ]),
    track('lojistik', 'Lojistik Operasyon', 'bus', 'Taşıma modları, operasyon, depo ağı', [
      ['Taşıma Modları', 'Junior', [
        q('teknik', 'Karayolu, denizyolu ve havayolu taşımacılığını hangi durumlarda tercih edersin?',
          ['Havayolu: havayolu, acil', 'Denizyolu: denizyolu, hacim', 'Karayolu: karayolu, kapıdan kapıya', 'Maliyet ve süre: maliyet, süre', 'Kombine taşıma: kombine'],
          'Havayolunu acil, küçük hacimli ve yüksek değerli yükler için tercih ederim; hızlıdır ama pahalıdır. Denizyolu büyük hacimli ve acil olmayan yükler için en ekonomik seçenektir. Karayolu kapıdan kapıya teslim ve yakın mesafeler için esneklik sağlar. Seçim yaparken her zaman maliyet ile teslim süresi arasındaki dengeye bakarım. Gerektiğinde deniz ve karayolunu birleştiren kombine taşımacılık ile ikisinin avantajını kullanırım.'),
      ]],
      ['Operasyon Vakası', 'Mid', [
        q('vaka', 'Müşterinin kritik sevkiyatı limanda gümrükte takıldı ve teslim tarihi yaklaşıyor. Ne yaparsın?',
          ['Nedeni öğrenme: neden, eksik belge', 'Müşteriyi bilgilendirme: müşteri', 'Hızlı çözüm: müşavir', 'Alternatif plan: alternatif', 'Tekrarı önleme: kontrol listesi'],
          'Önce gümrük müşavirimizle konuşup bekletmenin nedenini öğrenirim; çoğu zaman eksik belge ya da hatalı bir beyan olur. Müşteriyi durum ve tahmini süre hakkında hemen dürüstçe bilgilendiririm. Eksik belgeyi tamamlatmak ya da düzeltme yapmak için müşavirle birlikte süreci hızlandırırım. Teslim tarihi kritikse ürünün bir kısmını havayoluyla göndermek gibi alternatif bir plan hazırlarım. Sonrasında aynı sorunun tekrarlanmaması için sevkiyat öncesi bir belge kontrol listesi oluştururum.'),
      ]],
      ['Ağ Tasarımı', 'Senior', [
        q('vaka', 'Bir e-ticaret şirketi için depo ağını nasıl tasarlarsın?',
          ['Talep dağılımı: talep, bölge', 'Hizmet seviyesi: teslim süresi', 'Maliyet dengesi: stok, taşıma maliyeti', 'Depo konumu ve sayısı: depo', 'Senaryo modelleme: senaryo'],
          'Önce siparişlerin bölge bazında talep dağılımını ve büyüme beklentisini çıkarırım. Şirketin hedeflediği teslim süresi, örneğin ertesi gün teslimat, ağın temel kısıtıdır. Depo sayısı arttıkça teslim süresi ve taşıma maliyeti düşer ama stok ve işletme maliyeti artar; bu dengeyi kurarım. Talebin yoğunlaştığı bölgelere yakın depo konumları belirlerim. Farklı depo sayıları için senaryo modelleme yaparak toplam maliyeti en düşük çözümü seçerim.'),
      ]],
    ]),
    track('gumruk', 'Gümrük & Uyum', 'shield-checkmark', 'GTİP, gümrük rejimleri, uyum', [
      ['Gümrük Temelleri', 'Junior', [
        q('teknik', 'GTİP nedir ve yanlış sınıflandırmanın sonuçları nelerdir?',
          ['Tarife kodu: gtip, kod', 'Vergi oranı: vergi', 'İzin ve kısıtlamalar: izin, kısıtlama', 'Ceza riski: ceza', 'Bağlayıcı tarife bilgisi: bağlayıcı tarife'],
          'GTİP, eşyanın uluslararası armonize sisteme dayanan 12 haneli gümrük tarife istatistik kodudur. Bu kod eşyaya uygulanacak gümrük vergisi oranını belirler. Ayrıca eşyanın tabi olduğu izin, kısıtlama ve belge gerekliliklerini de etkiler. Yanlış sınıflandırma eksik vergi ödenmesine, ceza ve gecikmelere yol açabilir. Emin olunmadığında teknik inceleme yapılmalı ve gerekirse Bağlayıcı Tarife Bilgisi alınmalıdır.'),
      ]],
      ['Uyum Vakası', 'Mid', [
        q('vaka', 'İç kontrolde geçmiş beyannamelerde hatalı kıymet beyanı tespit ettin. Ne yaparsın?',
          ['Kapsam tespiti: kapsam, dönem', 'Etkiyi hesaplama: vergi farkı', 'Kendiliğinden düzeltme: düzelt, pişmanlık', 'Kök neden: kök neden', 'Kontrol önlemi: kontrol, eğitim'],
          'Önce hatanın hangi dönemi ve kaç beyannameyi etkilediğini belirleyerek kapsamı çıkarırım. Doğru kıymetle eksik ya da fazla ödenen vergi farkını hesaplarım. Yönetime ve gümrük müşavirimize durumu bildirip idare tespit etmeden kendiliğinden düzeltme ve pişmanlık imkânlarını değerlendiririm. Hatanın kök nedenini, örneğin navlun ya da lisans bedelinin kıymete eklenmemesini bulurum. Süreçe yeni bir kontrol adımı ekler, ilgili ekibe eğitim veririm.'),
      ]],
      ['Stratejik Uyum', 'Senior', [
        q('vaka', 'Şirketin için Yetkilendirilmiş Yükümlü (YYS) statüsü almak için nasıl bir yol izlersin?',
          ['Faydalar: fayda, hız', 'Kriterler: kriter, mali yeterlilik', 'Öz değerlendirme: öz değerlendirme, boşluk', 'Süreç ve güvenlik: güvenlik', 'Başvuru ve denetim: başvuru, denetim'],
          'Önce YYS statüsünün daha az fiziki kontrol ve hızlı gümrük işlemi gibi faydalarını yönetime anlatıp destek alırım. Gümrük mevzuatına uyum, kayıt sistemi, mali yeterlilik ve güvenlik gibi kriterleri incelerim. Şirketi bu kriterlere göre bir öz değerlendirme ile ölçüp boşluk analizi yaparım. Eksik kalan süreçleri ve tesis güvenliği önlemlerini tamamlarım. Ardından başvuruyu yapar, yerinde denetime ekiple birlikte hazırlanırım.'),
      ]],
    ]),
  ],
};
