// Letters archive — monthly love letters from Sept 2025 onward
// Each letter is one card in a swipeable timeline.

const LETTERS = [
  {
    id: 'oct-2025',
    date: 'Sep 28 – Oct 4, 2025',
    monthLabel: 'Octubre',
    title: 'Tu cumpleaños',
    body: [
      "As beautiful as you are on the outside, you are just as beautiful on the inside. God took his time when creating you. Perfecting every line and curve of your body, and planting a beautiful soul within.",
      "You are my coffee in the morning, you lift me up and make me feel alive.",
    ],
  },
  {
    id: 'nov-2025',
    date: 'November 4, 2025',
    monthLabel: 'Noviembre',
    title: 'Un mes oficial',
    body: [
      "It's been a month since we've made it official, and it has been amazing ever since. To have the opportunity to love you is nothing but a blessing. I'm so grateful to be able to call myself your boyfriend.",
      "I always feel so loved and appreciated by you, and it's the best feeling ever. I love so many things about you, from your beautiful smile, your funny jokes, and even the way you express yourself. I'm so lucky to have you in my life, mi amor.",
    ],
  },
  {
    id: 'dec-2025',
    date: 'December 4, 2025',
    monthLabel: 'Diciembre',
    title: 'Mi cariño',
    salutation: 'Mi amor,',
    body: [
      "When I first saw you in person on June 7th, I knew early on that I wanted to be with you for the rest of my life. It was a feeling that stayed with me ever since, one that was hard to keep to myself, a feeling deeper than words could ever express.",
      "In the eyes and heart of the Lord, I lived through him to show you love in a way I knew best. Gracefully, you received and reciprocated it in a form I never knew love could be. It's something I cherish ever so deeply.",
      "Mi corazón, I want to spend every single moment with you; from mornings to nights, breakfast to dinner, smooth to wrinkled skin, and dark to grey hair. In a world where sound is scarce for me, your voice is the one I yearn for most. Of all the warm and comfiest places, your arms are where I want to be. Under all the weights I carry, the thoughts of you give me strength.",
      "Mi cariño, I love you with all of my heart and soul. I am so blessed to have you in my life, for you make it beautiful and sound.",
    ],
  },
  {
    id: 'christmas-2025',
    date: 'December 25, 2025',
    monthLabel: 'Navidad',
    title: 'Mi compromiso',
    salutation: 'Mi amor,',
    body: [
      "Over the last 7 months since we've first met, my love for you has grown day by day. I have enjoyed every single moment we've shared together. It has been truly special to be able to create so many memories with you in such a short time. I know deep down in my heart, that I want to continue growing what we have together.",
      "Mi corazón,",
      "I am committed to you, in continuing to grow our relationship into something deeper and more meaningful with you as time goes on. I wanted to give you this gift as a symbol of my commitment to this promise. I love you with all of my heart and soul. Thank you for blessing my life with your love.",
    ],
  },
  {
    id: 'feb-2026',
    date: 'February 4, 2026',
    monthLabel: 'Febrero',
    title: 'Mi aire, mi sol, mi vida',
    salutation: 'Mi amor,',
    body: [
      "Just when I thought I was deeply in love, I fall deeper and deeper in love with you. What I feel now is incomparable to what I felt in the beginning. It grows exponentially as the days go by with every kiss, every hug, and every funny joke you share with me.",
      "When we are not together, seconds feel like minutes, minutes feel like hours, hours feel like days, days feel like weeks. I yearn to be with you again the moment we say goodbye for a little bit, because I think about you every moment of the day.",
      "There's nothing I want more than to experience what life has to offer with you by my side. Every time we lock eyes, it feels like I'm falling in love with you all over again. I am so blessed by the Lord to have met you, and words can't even describe how grateful and thankful I am to be able to call you mi novia hermosa.",
      "Tú eres mi aire, mi sol, y mi vida.",
    ],
  },
  {
    id: 'valentines-2026',
    date: 'February 14, 2026',
    monthLabel: 'San Valentín',
    title: '¿Quieres ser mi San Valentín?',
    salutation: 'Mi amor,',
    body: [
      "There's no one that I'd rather share Valentine's Day with than you. You are the love of my life, and I feel blessed to have you by my side. Nothing could ever take me away from loving you, only my last breath could silence what I feel. And even then, I'd spend eternity searching for you until we meet again.",
      "I have no doubt in my heart that we are destined to be together. Deep in my heart, it feels like God planned this all out for us. Every moment we share is never a dull experience. It's as if the world has become brighter because you're in it. It is very beautiful and profound.",
      "I love you with all of my heart. There's not a single moment where I don't fall deeply in love with you within first glance of the morning. \"How beautiful,\" I think to myself. You're so infatuating and infectious with your beautiful smile all around.",
      "You are the most beautiful woman in the world. I love every single thing about you, from parts of you I've seen and the parts of you I've yet to discover.",
      "Mi amor, will you be my valentine, forever and always?",
    ],
    spanish: [
      "Mi amor,",
      "No hay nadie con quien preferiría compartir el Día de San Valentín más que contigo. Eres el amor de mi vida y me siento bendecido de tenerte a mi lado. Nada podría apartarme de amarte; solo mi último aliento podría silenciar lo que siento. Y aun así, pasaría la eternidad buscándote hasta que nos encontremos de nuevo.",
      "No tengo ninguna duda en mi corazón de que estamos destinados a estar juntos. En lo más profundo de mí, siento que Dios planeó todo esto para nosotros. Cada momento que compartimos nunca es aburrido; es como si el mundo se hubiera vuelto más luminoso porque tú estás en él. Es algo muy bello y profundo.",
      "Te amo con todo mi corazón. No hay un solo momento en el que no me enamore profundamente de ti con la primera mirada de la mañana. \"Qué hermosa\", pienso para mí. Eres tan cautivadora y contagiosa con tu hermosa sonrisa, que ilumina todo a tu alrededor.",
      "Eres la mujer más hermosa del mundo. Amo cada cosa de ti: las partes que ya he visto y las que aún me faltan por descubrir.",
      "Mi amor, ¿quieres ser mi San Valentín, por siempre y para siempre?",
    ],
  },
  {
    id: 'mar-2026',
    date: 'March 4, 2026',
    monthLabel: 'Marzo',
    title: 'A new chapter',
    body: [
      "No matter how far you are, my heart will always be with you. This chapter of us living in Casa Grande was nothing short of amazing, and a blessing.",
      "I'm excited to see what this new chapter holds for us, even though I will miss you a lot when you move to Tucson. I'll be thinking about you while we're apart, and looking forward to seeing you on the weekends.",
      "Te amo con todo mi corazón. There's nothing I wouldn't do for you.",
    ],
  },
  {
    id: 'apr-2026',
    date: 'April 4, 2026',
    monthLabel: 'Abril',
    title: 'Half a year',
    salutation: 'Mi Corazón,',
    body: [
      "I can't believe it's been half a year already. I'm the luckiest man in the world to be able to say that I love you. I wouldn't change it for anything else in the world, you are everything that I asked for and more.",
      "No matter how far apart we are from each other, I find myself thinking about you all day every day and missing you every single second that we're not together. The distance only shows me how much more I love you. I constantly think about holding you close to me in so many different ways. You are extremely desirable in both a mental and physical way.",
      "You are the love of my life, the person that I want to spend every single day and night together with. I cherish you so deeply, that a single thought of you makes my heart warm. It's the very thing that makes life so much more beautiful. No matter what, I will always strive to make you feel loved and appreciated.",
      "My love for you has grown more and more as the days go by, and I am blessed to even receive yours, for it is so priceless. I feel so grateful to God for bringing me such an amazing and gorgeous woman. I find myself feeling so enamored by your striking presence, glowing eyes, and your beautiful smile. You are truly a fascinating woman. I admire everything about you, from your sexy confidence to your unwavering love and kindness towards others.",
      "You inspire me to be a better man, not only for myself, but for you, even though nothing that I can provide will ever come close to what you truly deserve, which is everything that life has to offer. I thank the Lord for such a godly woman, for I worship the very ground you stand on.",
      "Mamicita, only you have my soul, and there's nothing that I wouldn't do for you. Mi amor, my heart belongs to you and I will only serve you.",
    ],
  },
  {
    id: 'bonus',
    date: 'A special place',
    monthLabel: 'Bonus',
    title: 'Special place in my heart',
    body: [
      "You have a very special place in my heart. There's so many things that I love about you, I can't help but smile when I'm around you. I'm so grateful to have you in my life, for I won't take a single moment of your presence and love for granted.",
      "I appreciate all the little things you do for me, the amazing meals, and kind gestures that speak loudly about your love and care for me. God is good and always has been. Thank you for bringing me closer to him, by sharing your special hour of Sundays with me.",
      "I love you so much. Buenas noches mi corazón ♥",
      "Mi amor, I love you with all of my heart. It truly was special the first day we met. I look forward to growing with you and experiencing all that life has to offer with you. It's a privilege to be able to receive your love and care ♥",
    ],
  },
];

// Upcoming months (placeholders) — auto-generated from current date forward.
// The 4th of each upcoming month + romantic holidays.
const UPCOMING = [
  { id: 'may-2026',     date: 'May 4, 2026',        monthLabel: 'Mayo',         tease: 'soon, mi amor' },
  { id: 'jun-2026',     date: 'June 4, 2026',       monthLabel: 'Junio',        tease: 'medio año más' },
  { id: 'jul-2026',     date: 'July 4, 2026',       monthLabel: 'Julio',        tease: 'soon, mi vida' },
  { id: 'aug-2026',     date: 'August 4, 2026',     monthLabel: 'Agosto',       tease: 'pronto, mi amor' },
  { id: 'sep-28-2026',  date: 'September 28, 2026', monthLabel: 'Septiembre',   tease: 'tu cumpleaños' },
  { id: 'oct-2026',     date: 'October 4, 2026',    monthLabel: 'Aniversario',  tease: 'un año juntos · nuestro aniversario' },
];

Object.assign(window, { LETTERS, UPCOMING });
