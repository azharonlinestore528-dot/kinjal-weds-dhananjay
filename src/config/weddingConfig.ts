export type EventThemeVariant = 'ganesh' | 'haldi' | 'grahshanti' | 'wedding';

export interface BilingualEventConfig {
  id: EventThemeVariant;
  englishName: string;
  gujaratiName: string;
  subtitle: string;
  date: string;
  time: string;
  description: string;
  venueLabel: string;
  isVenueConfirmed: boolean;
  artworkSrc?: string;
  artworkAlt: string;
}

export const weddingConfig = {
  couple: {
    bride: 'Kinjal',
    groom: 'Dhananjay',
    displayUpper: 'KINJAL & DHANANJAY',
    displayCalligraphy: 'Kinjal & Dhananjay',
  },
  invitation: {
    message: 'Together with their families, they invite you to celebrate their wedding.',
    date: '17 February 2027',
    dateUpper: '17 FEBRUARY 2027',
    time: '6:00 PM – 8:30 PM',
    timeIsoTarget: '2027-02-17T18:00:00+05:30', // Udaipur IST 6:00 PM
    venueName: 'The Grand Ballroom',
    venueLocation: 'Hotel Palace, Udaipur, Rajasthan',
    venueFull: 'The Grand Ballroom, Hotel Palace, Udaipur, Rajasthan.',
    receptionNote: 'Reception & Wedding Feast to follow.',
  },
  scratchCard: {
    eyebrow: 'Royal Keepsake Seal',
    initialTitle: 'A Special Day Awaits...',
    initialPrompt: 'Scratch to reveal our wedding date.',
    revealedCouple: 'KINJAL & DHANANJAY',
    revealedDate: '17 FEBRUARY 2027',
    revealedTime: '6:00 PM – 8:30 PM',
    popupHeadline: 'Our Wedding Day Is Revealed!',
    popupDate: '17 February 2027',
    popupTime: '6:00 PM – 8:30 PM · Udaipur, Rajasthan',
  },
  lunch: {
    englishName: 'Wedding Day Lunch',
    gujaratiName: 'લગ્ન ભોજન સમારોહ',
    date: '17 February 2027',
    // Configurable: leave empty until confirmed so timing is never invented
    confirmedTime: '' as string,
    unconfirmedTimeNotice: 'Lunch timing will be shared upon confirmation.',
    venueNote: 'Dining courtyard details will be shared with guests via WhatsApp.',
  },
  rsvp: {
    headline: 'Your presence would make our celebration even more special.',
    subtext: 'Stay connected with us for wedding updates and pre-wedding celebration details.',
    // Set whatsappNumber (country code + digits, e.g., "9198XXXXXXXX") once verified.
    whatsappNumber: '' as string,
    whatsappPrefillMessage:
      'Namaste! We are delighted to stay connected for Kinjal & Dhananjay’s royal wedding celebrations (15–17 February 2027).',
  },
  maps: {
    destinationQuery: 'Hotel Palace, Udaipur, Rajasthan',
    coordinates: null as { lat: number; lng: number } | null,
  },
  assets: {
    palaceDoorsVideo: '/assets/aistudio/Palace_doors_opening_for_wedding_5d79b019_be44724a.mp4',
    lotusArchDoorImage: '/assets/aistudio/e8fc6b19-8181-4ee6-be7e-ff9ddc5da284_ad6d1dbc.jpg',
    chhatriPavilionImage: '/assets/aistudio/b6b2168a-1180-4ebd-ad64-b9513fc3a16e_cb3fe323.jpg',
    udaipurPalaceArchImage: '/assets/aistudio/aede9782-a7d7-4f6d-ba58-d434fa8e9bb0_a32986a6.jpg',
    miniatureMusiciansImage: '/assets/aistudio/08d6a697-491d-49bc-a339-2fd9c62a65f5_b026d5e2.jpg',
    royalProcessionImage: '/assets/aistudio/97ebb9fe-cd68-44bd-a1fe-32082fa05510_c3e6cb97.jpg',
    // Clean bespoke watermark-free generated assets
    royalPeacockImage: '/src/assets/images/royal_peacock_lotus_1795268172948.jpg',
    maroonLotusDiyaImage: '/src/assets/images/maroon_lotus_diya_1795268173704.jpg',
    ganeshPujaImage: '/src/assets/images/ganesh_puja_artwork_1795268175524.jpg',
    haldiFloralImage: '/src/assets/images/haldi_floral_artwork_1795268176363.jpg',
  },
  events: [
    {
      id: 'ganesh',
      englishName: 'Ganesh Puja',
      gujaratiName: 'ગણેશ પૂજા',
      subtitle: 'Auspicious Invocation & Saffron Blessings',
      date: '15 February 2027',
      time: '9:30 AM',
      description:
        'Invoking Lord Ganesha’s divine grace with sacred chants, marigold garlands, saffron tilak, and family blessings as the wedding festivities begin.',
      venueLabel: 'Venue details will be shared on WhatsApp once confirmed.',
      isVenueConfirmed: false,
      artworkSrc: '/src/assets/images/ganesh_puja_artwork_1795268175524.jpg',
      artworkAlt: 'Traditional Indian miniature Ganesh Puja painting with saffron marigold arch and glowing diyas',
    },
    {
      id: 'haldi',
      englishName: 'Haldi Ceremony',
      gujaratiName: 'હળદી સમારોહ',
      subtitle: 'Golden Turmeric & Marigold Floral Courtyard',
      date: '16 February 2027',
      time: '10:00 AM – 11:00 AM',
      description:
        'A joyful morning filled with radiant turmeric blessings, cascading yellow marigold and jasmine garlands, folk songs, and sunlit laughter.',
      venueLabel: 'Venue details will be shared on WhatsApp once confirmed.',
      isVenueConfirmed: false,
      artworkSrc: '/src/assets/images/haldi_floral_artwork_1795268176363.jpg',
      artworkAlt: 'Brass urli bowl of golden turmeric surrounded by yellow marigold and jasmine garlands',
    },
    {
      id: 'grahshanti',
      englishName: 'Grah Shanti Puja',
      gujaratiName: 'ગ્રહ શાંતિ પૂજા',
      subtitle: 'Sacred Kalash & Celestial Harmony Ritual',
      date: '17 February 2027',
      time: '10:00 AM – 12:00 PM',
      description:
        'A serene morning prayer seeking cosmic peace, ancestral blessings, and harmony for Kinjal and Dhananjay before the evening wedding ceremony.',
      venueLabel: 'Venue details will be shared on WhatsApp once confirmed.',
      isVenueConfirmed: false,
      artworkAlt: 'Sacred Mangal Kalash and golden lotus mandala artwork for Grah Shanti Puja',
    },
    {
      id: 'wedding',
      englishName: 'Wedding Ceremony',
      gujaratiName: 'લગ્ન સમારોહ',
      subtitle: 'The Royal Baraat, Varmala & Sacred Pheras',
      date: '17 February 2027',
      time: '6:00 PM – 8:30 PM',
      description:
        'Underneath the illuminated floral mandap, royal elephants and joyful music herald the union of Kinjal and Dhananjay as they take seven sacred vows.',
      venueLabel: 'The Grand Ballroom, Hotel Palace, Udaipur, Rajasthan.',
      isVenueConfirmed: true,
      artworkSrc: '/assets/aistudio/97ebb9fe-cd68-44bd-a1fe-32082fa05510_c3e6cb97.jpg',
      artworkAlt: 'Royal Indian miniature wedding procession with caparisoned elephants and golden howdah',
    },
  ] satisfies BilingualEventConfig[],
} as const;

export function getGoogleMapsUrl(): string {
  if (weddingConfig.maps.coordinates) {
    const { lat, lng } = weddingConfig.maps.coordinates;
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    weddingConfig.maps.destinationQuery
  )}`;
}

export function getWhatsAppUrl(): string | null {
  const digits = weddingConfig.rsvp.whatsappNumber.replace(/\D/g, '');
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(
    weddingConfig.rsvp.whatsappPrefillMessage
  )}`;
}
