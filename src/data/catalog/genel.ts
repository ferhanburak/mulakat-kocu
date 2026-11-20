import { q, track, type Profession } from '../build';

/** English behavioural set appended to the English interview units. */
const EN_BEHAVIOURAL = [
  q('davranissal', 'Tell me about a time you disagreed with a colleague. How did you handle it?',
    ['Situation: project, team, situation', 'Listening: listen, understand, perspective', 'Action: discussed, meeting, proposed, i suggested', 'Result: result, agreed, resolved, delivered'],
    'In my last project a teammate and I disagreed on the scope of a feature before a deadline. I set up a short meeting and listened to his concerns first. Then I suggested comparing both options by cost and impact. As a result we agreed on a smaller first version and delivered on time.', ['Ignoring the colleague: simply ignore; i am usually right']),
  q('davranissal', 'Tell me about a mistake you made and what you learned from it.',
    ['Ownership: mistake, my fault, responsib, i missed', 'Fix: fixed, solved, rolled back', 'Learning: learned, lesson', 'Changed behaviour: now i, since then, checklist'],
    'I once shipped a release with a short test plan and a bug reached production. I took responsibility and we rolled it back within an hour. I learned that skipping checks costs more than it saves. Since then I always use a release checklist.', ['Blaming others: manager\'s fault; nothing to learn']),
  q('davranissal', 'Where do you see yourself in five years?',
    ['Growth: grow, develop, learn', 'Expertise / leadership: expert, lead, mentor', 'Link to company: company, here, role'],
    'In five years I want to be a strong expert in my field. I would also like to mentor junior colleagues and lead small projects. I see this role as the right place to start that journey because of the scale of your products.', ['Not planning to stay: my own business; short stop']),
];

export const genel: Profession = {
  id: 'genel',
  name: 'Mülakat Türleri',
  icon: 'chatbubbles',
  color: '#0E8F9F',
  tagline: 'Her meslekte karşına çıkan mülakatlar',
  general: true,
  tracks: [
    track('ik-mulakati', 'Genel / İK Mülakatı', 'person', 'Kendini tanıt, zayıf yönün, neden biz?', [
      ['İlk İzlenim', 'Junior', [
        q('vaka', 'Kendinizi kısaca tanıtır mısınız?',
          ['Güncel rol / eğitim: şu an, mezun, çalışıyorum, okuyorum', 'İlgili deneyim: deneyim, proje, yıl', 'Somut başarı: başardım, artırdım, %, sonuç', 'Neden buradasın: bu pozisyon, bu rol, şirket'],
          'Şu an X şirketinde iki yıldır analist olarak çalışıyorum. Bu sürede raporlama süreçlerini otomatikleştirip ekibin haftalık iş yükünü %30 azalttım. Veriyle karar alınan ortamlarda çalışmayı seviyorum. Bu pozisyon da tam olarak bu deneyimi daha büyük ölçekte kullanabileceğim bir rol.', ['CV\'ye yönlendirme: cv\'mde yazıyor; cv\'mden okuy; oradan okursanız']),
        q('vaka', 'Neden şirketimizde çalışmak istiyorsunuz?',
          ['Şirketi araştırma: ürün, hizmet, değer, kültür', 'Kendi hedefiyle bağ: hedef, gelişim, kariyer', 'Katkı: katkı, katabilirim, deneyimim'],
          'Ürünlerinizi bir süredir kullanıcı olarak takip ediyorum ve özellikle müşteri odaklı yaklaşımınızı değerli buluyorum. Kariyerimde ölçeği büyük problemler üzerinde çalışmak istiyorum. Önceki deneyimimle ekibinize hızlı bir şekilde katkı sağlayabileceğimi düşünüyorum.', ['Şirkete ilgisizlik: herhangi bir şirket; benim için fark etmez']),
      ]],
      ['Zor Sorular', 'Mid', [
        q('vaka', 'En büyük zayıf yönünüz nedir?',
          ['Gerçek bir zayıflık: zayıf, zorlan, geliştirmem, sabırsız, eksik yön, hayır demekte', 'Farkındalık: fark ettim, geri bildirim', 'Geliştirme adımı: çalışıyorum, eğitim, uyguluyorum, öğreniyorum, hazırlıyor, hedef koyuyorum', 'İlerleme: artık, sonuç, daha iyi'],
          'Kalabalık toplantılarda fikrimi söylemekte zorlandığımı bir yöneticimin geri bildirimiyle fark ettim. Bunun için toplantılardan önce notlarımı hazırlıyor ve en az bir öneri paylaşmayı kendime hedef koyuyorum. Son altı ayda iki sunumu ben yaptım. Artık bu konuda kendimi çok daha rahat hissediyorum.', ['Sahte zayıflık: mükemmeliyetçi olmam; fazla iyi yapıyorum; zayıflık sayılmaz; zayıf yönüm yok']),
        q('vaka', 'Mevcut işinizden neden ayrılmak istiyorsunuz?',
          ['Olumlu dil: öğrendim, teşekkür, değerli', 'İleriye dönük gerekçe: gelişim, büyüme, yeni, sorumluluk, geliş', 'Eski işvereni kötülememe: kötülemeden, olumlu, çok şey öğrendim, değer veriyorum, minnettar, sayesinde, kaçmıyorum, iyi bir dönem, teşekkür borçlu'],
          'Mevcut şirketimde çok şey öğrendim ve ekibime değer veriyorum. Ancak orada ulaşabileceğim sorumluluk seviyesinin sınırına geldim. Daha büyük ölçekte ve yeni alanlarda gelişebileceğim bir rol arıyorum, bu pozisyon da bunu sunuyor.', ['Eski işvereni kötüleme: yöneticim berbat; berbat biri; değer vermiyor; kurtulmak istiyorum']),
      ]],
      ['Kapanış', 'Senior', [
        q('vaka', 'Neden sizi işe almalıyız?',
          ['İlana uygunluk: gereksinim, aradığınız, ilan', 'Kanıtlı başarı: başardım, sonuç, %', 'Farklılaştırıcı: farklı, ayrıca, benzersiz, çalışkan, hızlı öğren', 'Kısa ve net: özetle, kısaca'],
          'İlanda aradığınız üç temel yetkinliği, yani veri analizi, paydaş yönetimi ve proje takibini son iki yılda bizzat yürüttüm. Örneğin yürüttüğüm bir projede müşteri kaybını %12 azalttık. Ayrıca teknik ekiple iş birimleri arasında köprü kurabiliyorum. Özetle ilk günden katkı sağlayacak ve hızlı öğrenecek biriyim.', ['Kibirli iddia: ancak ben yapabilirim; adayların hiçbiri']),
        q('vaka', 'Bize sormak istediğiniz bir soru var mı?',
          ['Rol hakkında soru: rol, ilk 90 gün, beklenti, başarı', 'Ekip / kültür: ekip, kültür, çalışma şekli', 'Gelişim: gelişim, eğitim, kariyer yolu', 'Sonraki adım: süreç, sonraki adım'],
          'Evet, birkaç sorum var. Bu rolde ilk 90 günde başarıyı nasıl tanımlıyorsunuz? Ekip genelde nasıl çalışıyor ve kararlar nasıl alınıyor? Bu pozisyonda gelişim ve kariyer yolu nasıl ilerliyor? Son olarak süreçteki bir sonraki adımı öğrenebilir miyim?', ['Sadece maaş ve izin sorma: maaşı ne zaman; tek önemli soru']),
      ]],
    ], { behavioural: null }),
    track('ingilizce', 'İngilizce Mülakat', 'language', 'English interview practice', [
      ['Basics', 'Junior', [
        q('vaka', 'Tell me about yourself.',
          ['Current role: currently, i work, i am a, graduated', 'Relevant experience: experience, years, project', 'Achievement: achieved, increased, reduced, %', 'Why this role: this role, this position, your company'],
          'I am currently a software developer with two years of experience at a fintech company. I mainly work on backend services and I reduced our API response times by 40 percent last year. I enjoy solving performance problems. That is why this role, with its focus on scale, really interests me.', ['Pointing to the CV: on my cv; read it there']),
        q('vaka', 'Why do you want to work for our company?',
          ['Research: product, mission, values, culture', 'Personal fit: goal, passion, interest, want to work on', 'Contribution: contribute, bring, add value, can help'],
          'I have been following your products for a while and I admire your focus on customers. I want to work on problems at a larger scale. I believe my experience can help your team from day one.', ['No interest in the company: any company would; does not matter which']),
      ]],
      ['Tough Questions', 'Mid', [
        q('vaka', 'What is your greatest weakness?',
          ['Real weakness: weakness, struggle, not good at, hard to, impatient', 'Awareness: realized, feedback', 'Improvement: working on, practice, practis, course', 'Progress: now, better, improved'],
          'I used to find it hard to delegate tasks. My manager gave me feedback about this last year. Since then I have been practising by sharing tasks early and checking in regularly. Now my team delivers faster and I can focus on more important work.', ['Fake weakness: i am a perfectionist; i work too hard; not really a weakness']),
        q('vaka', 'What are your salary expectations?',
          ['Research: research, market, range', 'Range: between, range', 'Flexibility: flexible, total package, benefits', 'Turn back: budget, role'],
          'Based on my research and my experience, I am looking for a range between X and Y. I am flexible depending on the total package, including benefits and growth opportunities. Could you share the budget you have for this role?', ['Rigid demand: not accept anything less; nothing to discuss']),
      ]],
      ['Closing', 'Senior', [
        q('vaka', 'Why should we hire you?',
          ['Match: requirements, you need, looking for', 'Proof: achieved, delivered, result', 'Unique value: also, unique, different, fast learner, hard working'],
          'You are looking for someone who can build reliable services and work closely with product teams. I have done exactly that for two years and delivered projects that cut costs by 20 percent. I also enjoy mentoring, so I can help the team grow.', ['Arrogant claim: nobody else can; best candidate you will ever']),
      ]],
    ], { behavioural: EN_BEHAVIOURAL, lang: 'en' }),
    track('maas', 'Maaş Pazarlığı', 'cash', 'Beklenti, teklif, karşı teklif', [
      ['Beklentini Söylemek', 'Junior', [
        q('vaka', 'Maaş beklentiniz nedir?',
          ['Araştırma: araştırma, piyasa, emsal, maaş veri, anket, sektördeki', 'Aralık verme: aralık, arası', 'Toplam paket: yan hak, toplam paket, prim, benefit, sigorta', 'Esneklik: esnek, konuşabiliriz'],
          'Piyasa araştırmam ve deneyimim doğrultusunda net X ile Y arasında bir aralık bekliyorum. Elbette yan haklar ve prim dahil toplam paketi birlikte değerlendirmek isterim. Bu konuda esnek bir şekilde konuşabiliriz.', ['Katı tavır: aşağısını kabul etmem; pazarlık ... yapmam']),
        q('vaka', 'Mevcut maaşınızı öğrenebilir miyim?',
          ['Kibar sınır: kibarca, paylaşmak yerine, odaklanmak, tercih ederim', 'Beklentiye yönlendirme: beklenti, bu rol', 'Değer odaklılık: sorumluluk, değer, katkı'],
          'Mevcut maaşım yerine bu rolün sorumluluklarına uygun bir değerlendirme yapmayı tercih ederim. Bu pozisyon için beklentim X ile Y arasında. Bu aralığın, rolün getireceği sorumluluk ve katkıyla uyumlu olduğunu düşünüyorum.', ['Yanlış beyan: yüksek söylerim; kontrol edemezsiniz']),
      ]],
      ['Pazarlık', 'Mid', [
        q('vaka', 'Teklifimiz beklentinizin altında. Ne düşünüyorsunuz?',
          ['Teşekkür / olumlu ton: teşekkür, heyecan, memnun', 'Gerekçeli karşı teklif: gerekçe, deneyim, piyasa, karşı teklif, sorumluluk, önceki iş', 'Alternatif kalemler: yan hak, uzaktan, eğitim, prim, değerlendirme', 'Kapanış: ortak nokta, uzlaş, ortak bir nokta'],
          'Teklifiniz için teşekkür ederim, bu rol için gerçekten heyecanlıyım. Ancak deneyimim ve piyasa verileri göz önüne alındığında X tutarının daha uygun olduğunu düşünüyorum. Maaşta esneklik yoksa altı ay sonra performans değerlendirmesi, prim veya uzaktan çalışma gibi kalemleri konuşabiliriz. Ortak bir noktada buluşabileceğimize inanıyorum.', ['Tehditkâr ton: hakaret gibi; hemen giderim']),
      ]],
      ['Karşı Teklif', 'Senior', [
        q('vaka', 'İstifa ettiğinizde mevcut şirketiniz karşı teklif yaptı. Nasıl karar verirsiniz?',
          ['Ayrılma nedenine dönme: neden, ayrılma, sebep', 'Sadece para değil: para, maaş, gelişim, kültür, ücret, rakam, öğrenme, büyüme', 'Uzun vade: uzun vade, kariyer, yıl sonra, ileri götür', 'Profesyonel iletişim: profesyonel, teşekkür, net'],
          'Önce ayrılma kararımı neden verdiğime geri dönerim. Sorun sadece maaş değil de gelişim veya kültür ise karşı teklif bunu çözmez. Uzun vadeli kariyer hedeflerime hangisinin daha uygun olduğuna bakarım. Kararımı her iki tarafa da teşekkür ederek net ve profesyonel şekilde iletirim.', ['Sadece paraya bakmak: hemen kabul ederim; para her zaman']),
      ]],
    ], { behavioural: null }),
    track('yeni-mezun', 'Yeni Mezun & Staj', 'school', 'Deneyimin azken öne çıkmak', [
      ['Deneyim Az, Potansiyel Çok', 'Junior', [
        q('vaka', 'İş deneyiminiz yok. Neden sizi seçmeliyiz?',
          ['Projeler: proje, bitirme, kulüp, gönüllü', 'Öğrenme hızı: hızlı öğren, öğrendim, kendi kendime', 'Somut örnek: örneğin, sonuç', 'Motivasyon: istekli, motivasyon, heyecan, heves'],
          'Profesyonel deneyimim az olsa da okulda üç gerçek proje geliştirdim. Örneğin bitirme projemde bir kafeterya için sipariş uygulaması yaptık ve 200 öğrenci kullandı. Yeni bir teknolojiyi kısa sürede kendi kendime öğrenebiliyorum. Bu rolde öğrenmeye ve katkı sağlamaya çok istekliyim.', ['Deneyimi küçümseme: deneyim ... önemli değil; diploma her şeyi']),
        q('davranissal', 'Okulda bir takım projesinde yaşadığınız bir zorluğu anlatır mısınız?',
          ['Durum: dönem, sınıf, kişilik, bitirme, dersinde, dersi', 'Zorluk: zorluk, sorun, gecikme, anlaşmazlık, teslim etmedi, zor ol, yapmadı, zorland', 'Senin aksiyonun: ben, yaptım, üstlendim, önerdim', 'Sonuç: sonuç, teslim, not'],
          'Bir dönem projesinde takım arkadaşlarımızdan biri son haftaya kadar kendi bölümünü teslim etmedi. Durumu takımla konuşup işleri yeniden dağıtmayı önerdim ve eksik kısmın bir bölümünü ben üstlendim. Ayrıca günlük kısa görüşmeler başlattık. Sonuç olarak projeyi zamanında teslim ettik ve en yüksek notu aldık.', ['Zorluğu inkâr etme: hiç zorluk yaşamadım; tek başıma yaptım']),
      ]],
      ['Zor Sorular', 'Mid', [
        q('vaka', 'Not ortalamanız neden düşük?',
          ['Dürüstlük: dürüst, kabul', 'Bağlam: çalışıyordum, proje, sorumluluk', 'Telafi eden kanıt: proje, sertifika, staj, başarı', 'İleriye bakış: öğrendim, artık, öğretti'],
          'Dürüst olmak gerekirse ilk iki yılımda derslere yeterince odaklanmadım. Son iki yılda ise yarı zamanlı çalışırken ortalamamı her dönem yükselttim. Ayrıca iki sertifika programı tamamladım ve bir stajda canlıya çıkan bir proje geliştirdim. Bu süreç bana zaman yönetimini öğretti.', ['Suçu başkasına atma: hocaların suçu; haksızlık yaptılar']),
      ]],
      ['Teklif Aşaması', 'Senior', [
        q('davranissal', 'İlk iş teklifini değerlendirirken nelere bakarsın? Birden fazla teklifin olsa nasıl karar verirsin?',
          ['Öğrenme fırsatı: öğren, mentor', 'Ekip ve yönetici: ekip, yönetici, takım', 'Ücret ve yan haklar: ücret, yan hak, maaş, benefit', 'Şirket ve sektör: şirket, sektör', 'Uzun vadeli hedef: kariyer hedef, uzun vade'],
          'Kariyerimin başında en çok neyi öğreneceğime ve bir mentor desteği olup olmayacağına bakarım. Mülakatlarda tanıştığım ekip ve yöneticinin çalışma tarzı benim için çok önemli. Ücret ve yan hakları piyasayla karşılaştırırım ama tek ölçüt yapmam. Şirketin ve sektörün büyüme durumunu araştırırım. Birden fazla teklifim olsa bunları uzun vadeli kariyer hedefime en çok hangisinin yaklaştırdığına göre puanlayıp karar veririm.', ['Sadece ücrete bakmak: sadece maaşa bakarım; her zaman en iyi seçim']),
      ]],
    ]),
  ],
};
