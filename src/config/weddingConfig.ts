import ganeshPujaImage from '../assets/images/ganesh_puja_artwork_1795268175524.jpg';
import haldiFloralImage from '../assets/images/haldi_floral_artwork_1795268176363.jpg';
import maroonLotusDiyaImage from '../assets/images/maroon_lotus_diya_1795268173704.jpg';
import royalPeacockImage from '../assets/images/royal_peacock_lotus_1795268172948.jpg';

export type EventThemeVariant = 'ganesh' | 'haldi' | 'grahshanti' | 'wedding';

export interface BilingualEventConfig {
  id: EventThemeVariant;
  englishName: string;
  gujaratiName: string;
  subtitle: string;
  date: string;
  time: string;
  coverSealText: string;
  coverPrompt: string;
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
    timeIsoTarget: '2027-02-17T18:00:00+05:30',
    venueName: 'The Grand Ballroom',
    venueLocation: 'Hotel Palace, Udaipur, Rajasthan',
    venueFull: 'The Grand Ballroom, Hotel Palace, Udaipur, Rajasthan.',
    receptionNote: 'Reception to follow.',
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
    confirmedTime: '' as string,
    unconfirmedTimeNotice: 'Lunch timing will be shared upon confirmation.',
    venueNote: 'Dining courtyard details will be shared with guests via WhatsApp.',
  },
  rsvp: {
    headline: 'Your presence would make our celebration even more special.',
    subtext: 'Stay connected with us for wedding updates and pre-wedding celebration details.',
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
    royalPeacockImage,
    maroonLotusDiyaImage,
    ganeshPujaImage,
    haldiFloralImage,
  },
  keepsakePresets: [
    {
      id: 'peacock-sanctum',
      label: 'Royal Peacock & Lotus',
      src: royalPeacockImage,
      prompt:
        'Pink lotus petals drift softly across the serene golden palace frame as sunlight glimmers gently over emerald foliage while the regal peacock rests gracefully.',
    },
    {
      id: 'udaipur-arch',
      label: 'Udaipur Palace Terrace',
      src: '/assets/aistudio/aede9782-a7d7-4f6d-ba58-d434fa8e9bb0_a32986a6.jpg',
      prompt:
        'A warm Rajasthani breeze sways the bougainvillea blossoms along the carved golden palace balcony while distant Aravalli mist shimmers in golden hour light.',
    },
    {
      id: 'chhatri-pavilion',
      label: 'Floral Chhatri Pavilion',
      src: '/assets/aistudio/b6b2168a-1180-4ebd-ad64-b9513fc3a16e_cb3fe323.jpg',
      prompt:
        'Delicate rose and bougainvillea petals float peacefully around the sunlit Rajasthani marble chhatri pavilion while hanging brass lanterns sway lightly.',
    },
    {
      id: 'royal-baraat',
      label: 'Royal Baraat Procession',
      src: '/assets/aistudio/97ebb9fe-cd68-44bd-a1fe-32082fa05510_c3e6cb97.jpg',
      prompt:
        'Soft rose and marigold petals shower down gently over the ceremonial royal elephant baraat under glowing evening palace lanterns.',
    },
  ],
  events: [
    {
      id: 'ganesh',
      englishName: 'Ganesh Puja',
      gujaratiName: 'ગણેશ પૂજા',
      subtitle: 'Chapter I · Auspicious Invocation & Saffron Blessings',
      date: '15 February 2027',
      time: '9:30 AM',
      coverSealText: 'શ્રી ગણેશાય નમઃ',
      coverPrompt: 'Continue scrolling to unfold invitation',
      description:
        'Invoking Lord Ganesha’s divine grace with sacred chants, marigold garlands, saffron tilak, and family blessings as the wedding festivities begin.',
      venueLabel: 'Venue details will be shared on WhatsApp once confirmed.',
      isVenueConfirmed: false,
      artworkSrc: ganeshPujaImage,
      artworkAlt:
        'Traditional Indian miniature Ganesh Puja painting with saffron marigold arch and glowing diyas',
    },
    {
      id: 'haldi',
      englishName: 'Haldi Ceremony',
      gujaratiName: 'હળદી સમારોહ',
      subtitle: 'Chapter II · Golden Turmeric & Marigold Courtyard',
      date: '16 February 2027',
      time: '10:00 AM – 11:00 AM',
      coverSealText: 'શુભ હળદી',
      coverPrompt: 'Continue scrolling to unfold invitation',
      description:
        'A joyful morning filled with radiant turmeric blessings, cascading yellow marigold and jasmine garlands, folk songs, and sunlit laughter.',
      venueLabel: 'Venue details will be shared on WhatsApp once confirmed.',
      isVenueConfirmed: false,
      artworkSrc: haldiFloralImage,
      artworkAlt:
        'Brass urli bowl of golden turmeric surrounded by yellow marigold and jasmine garlands',
    },
    {
      id: 'grahshanti',
      englishName: 'Grah Shanti Puja',
      gujaratiName: 'ગ્રહ શાંતિ પૂજા',
      subtitle: 'Chapter III · Sacred Kalash & Celestial Harmony',
      date: '17 February 2027',
      time: '10:00 AM – 12:00 PM',
      coverSealText: 'શુભ ગ્રહ શાંતિ',
      coverPrompt: 'Continue scrolling to unfold invitation',
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
      subtitle: 'Chapter IV · The Royal Baraat, Varmala & Pheras',
      date: '17 February 2027',
      time: '6:00 PM – 8:30 PM',
      coverSealText: 'શુભ વિવાહ',
      coverPrompt: 'Continue scrolling to unfold the royal wedding invitation',
      description:
        'Underneath the illuminated floral mandap, royal elephants and joyful procession welcome the union of Kinjal and Dhananjay as they take seven sacred vows.',
      venueLabel: 'The Grand Ballroom, Hotel Palace, Udaipur, Rajasthan.',
      isVenueConfirmed: true,
      artworkSrc: '/assets/aistudio/97ebb9fe-cd68-44bd-a1fe-32082fa05510_c3e6cb97.jpg',
      artworkAlt:
        'Royal Indian miniature wedding procession with caparisoned elephants and golden howdah',
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
