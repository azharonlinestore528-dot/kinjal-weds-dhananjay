import ganeshRoomBackdrop from '../assets/images/palace_room_ganesh_1795296241579.jpg';
import ganeshArtworkLegacy from '../assets/images/ganesh_puja_artwork_1795268175524.jpg';
import haldiFloralImage from '../assets/images/haldi_floral_artwork_1795268176363.jpg';
import haldiRoomBackdrop from '../assets/images/palace_room_haldi_1795296241903.jpg';
import grahshantiRoomBackdrop from '../assets/images/palace_room_grahshanti_1795296241838.jpg';
import weddingRoomBackdrop from '../assets/images/palace_room_wedding_1795296240627.jpg';
import maroonLotusDiyaImage from '../assets/images/maroon_lotus_diya_1795268173704.jpg';
import royalPeacockImage from '../assets/images/royal_peacock_lotus_1795268172948.jpg';
import bougainvilleaBranchCutout from '../assets/decor/bougainvillea_branch.webp';
import royalPeacockCutout from '../assets/decor/royal_peacock.webp';
import lotusClusterCutout from '../assets/decor/lotus_cluster.webp';
import hangingLotusCutout from '../assets/decor/hanging_lotus_single.webp';
import kalashCoconutCutout from '../assets/decor/kalash_coconut.webp';
import elephantBananaCutout from '../assets/decor/elephant_banana.webp';
import coconutPalmCutout from '../assets/decor/coconut_palm.webp';
import gardenChhatriCutout from '../assets/decor/garden_chhatri.webp';
import royalFloralGateImage from '../assets/images/royal_floral_gate_1795298728019.jpg';

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
  roomTitle: string;
  description: string;
  venueLabel: string;
  isVenueConfirmed: boolean;
  artworkSrc?: string;
  artworkAlt: string;
  roomBackdropSrc: string;
  roomBackdropAlt: string;
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
    royalFloralGateImage,
    lotusArchDoorImage: '/assets/aistudio/e8fc6b19-8181-4ee6-be7e-ff9ddc5da284_ad6d1dbc.jpg',
    chhatriPavilionImage: '/assets/aistudio/b6b2168a-1180-4ebd-ad64-b9513fc3a16e_cb3fe323.jpg',
    udaipurPalaceArchImage: '/assets/aistudio/aede9782-a7d7-4f6d-ba58-d434fa8e9bb0_a32986a6.jpg',
    royalPeacockImage,
    maroonLotusDiyaImage,
    ganeshPujaImage: ganeshArtworkLegacy,
    haldiFloralImage,
  },
  decor: {
    bougainvilleaBranch: bougainvilleaBranchCutout,
    royalPeacock: royalPeacockCutout,
    lotusCluster: lotusClusterCutout,
    hangingLotus: hangingLotusCutout,
    kalashCoconut: kalashCoconutCutout,
    elephantBanana: elephantBananaCutout,
    coconutPalm: coconutPalmCutout,
    gardenChhatri: gardenChhatriCutout,
  },
  blessings: {
    englishHeading: 'Blessings of Our Families',
    gujaratiHeading: 'પરિવારજનોના આશીર્વાદ',
    gujaratiVerseOne:
      'બે પરિવારોનો પવિત્ર સંગમ,\nબે હૃદયોની નવી શરૂઆત.\nઆપના પ્રેમ, આશીર્વાદ અને ઉપસ્થિતિથી\nઆ શુભ પ્રસંગ વધુ સુંદર બની રહેશે.',
    gujaratiVerseTwo:
      'આપ સૌ પરિવારજનોને હાર્દિક આમંત્રણ.\nપધારીને નવદંપતીને આશીર્વાદ આપશો\nઅને અમારી ખુશીઓમાં સહભાગી બનશો.',
  },
  events: [
    {
      id: 'ganesh',
      englishName: 'Ganesh Puja',
      gujaratiName: 'ગણેશ પૂજા',
      subtitle: 'Chapter I · Auspicious Saffron Invocation',
      date: '15 February 2027',
      time: '9:30 AM',
      coverSealText: 'શ્રી ગણેશાય નમઃ',
      coverPrompt: 'TAP TO OPEN',
      roomTitle: 'The Saffron Temple Courtyard',
      description:
        'Invoking Lord Ganesha’s divine grace with sacred chants, marigold garlands, saffron tilak, and family blessings as the wedding festivities begin.',
      venueLabel: 'Venue details will be shared on WhatsApp once confirmed.',
      isVenueConfirmed: false,
      artworkSrc: ganeshArtworkLegacy,
      artworkAlt:
        'Traditional Indian miniature Ganesh Puja painting with saffron marigold arch and glowing diyas',
      roomBackdropSrc: ganeshRoomBackdrop,
      roomBackdropAlt:
        'Traditional Rajasthani sandstone temple courtyard with carved cusped arches, glowing diyas, and pink lotus garlands',
    },
    {
      id: 'haldi',
      englishName: 'Haldi Ceremony',
      gujaratiName: 'હળદી સમારોહ',
      subtitle: 'Chapter II · Golden Turmeric & Marigold Morning',
      date: '16 February 2027',
      time: '10:00 AM – 11:00 AM',
      coverSealText: 'શુભ હળદી',
      coverPrompt: 'OPEN YOUR INVITATION',
      roomTitle: 'The Sunlit Marigold Pavilion',
      description:
        'A joyful morning filled with radiant turmeric blessings, cascading yellow marigold and jasmine garlands, folk songs, and sunlit laughter.',
      venueLabel: 'Venue details will be shared on WhatsApp once confirmed.',
      isVenueConfirmed: false,
      artworkSrc: haldiFloralImage,
      artworkAlt:
        'Brass urli bowl of golden turmeric surrounded by yellow marigold and jasmine garlands',
      roomBackdropSrc: haldiRoomBackdrop,
      roomBackdropAlt:
        'Sunlit Udaipur palace courtyard pavilion decorated with bright yellow marigold flower jhoomars and mango leaves',
    },
    {
      id: 'grahshanti',
      englishName: 'Grah Shanti Puja',
      gujaratiName: 'ગ્રહ શાંતિ પૂજા',
      subtitle: 'Chapter III · Sacred Kalash & Celestial Harmony',
      date: '17 February 2027',
      time: '10:00 AM – 12:00 PM',
      coverSealText: 'શુભ ગ્રહ શાંતિ',
      coverPrompt: 'TAP TO OPEN',
      roomTitle: 'The Golden Sandstone Darbar',
      description:
        'A serene morning prayer seeking cosmic peace, ancestral blessings, and harmony for Kinjal and Dhananjay before the evening wedding ceremony.',
      venueLabel: 'Venue details will be shared on WhatsApp once confirmed.',
      isVenueConfirmed: false,
      artworkAlt: 'Sacred Mangal Kalash and golden lotus mandala artwork for Grah Shanti Puja',
      roomBackdropSrc: grahshantiRoomBackdrop,
      roomBackdropAlt:
        'Serene ivory and antique gold Rajasthani darbar chamber with mandala dome and brass kalash borders',
    },
    {
      id: 'wedding',
      englishName: 'Wedding Ceremony',
      gujaratiName: 'લગ્ન સમારોહ',
      subtitle: 'Chapter IV · The Royal Baraat, Varmala & Pheras',
      date: '17 February 2027',
      time: '6:00 PM – 8:30 PM',
      coverSealText: 'શુભ વિવાહ',
      coverPrompt: 'OPEN YOUR INVITATION',
      roomTitle: 'The Grand Royal Maroon Palace',
      description:
        'Underneath the illuminated floral mandap, royal elephants and joyful procession welcome the union of Kinjal and Dhananjay as they take seven sacred vows.',
      venueLabel: 'The Grand Ballroom, Hotel Palace, Udaipur, Rajasthan.',
      isVenueConfirmed: true,
      artworkSrc: '/assets/aistudio/97ebb9fe-cd68-44bd-a1fe-32082fa05510_c3e6cb97.jpg',
      artworkAlt:
        'Royal Indian miniature wedding procession with caparisoned elephants and golden howdah',
      roomBackdropSrc: weddingRoomBackdrop,
      roomBackdropAlt:
        'Grand royal maroon and gold Indian wedding palace courtyard at twilight with glowing chandeliers and floral mandap',
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
