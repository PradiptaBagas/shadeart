export interface Poster {
  id: string;
  title: string;
  category: 'Film' | 'Song' | 'Company';
  description: string;
  productionDetails: string;
  images: string[];
  aspectRatio: '4:5' | '16:9';
  orientation: 'portrait' | 'landscape';
  price: string;
}

export const posters: Poster[] = [
  {
    id: '1',
    title: 'The Black Parade',
    category: 'Song',
    description: 'A cinematic exploration of urban loneliness under neon lights.',
    productionDetails: 'Creation by Shade Team | Shot on 35mm | 2024',
    images: [
      '/mcr.png',
    ],
    aspectRatio: '4:5',
    orientation: 'portrait',
    price: '$25.00'
  },
  {
    id: '2',
    title: 'Echoes of Silence',
    category: 'Song',
    description: 'Visual representation of the hit single "Echoes".',
    productionDetails: 'Art Direction by Shade | Digital Illustration | 2023',
    images: [
      '/mcr.png'
    ],
    aspectRatio: '4:5',
    orientation: 'portrait',
    price: '$20.00'
  },
  {
    id: '3',
    title: 'The Last Train',
    category: 'Film',
    description: 'A nostalgic look at the golden era of rail travel.',
    productionDetails: 'Vintage Series | Photography | 2024',
    images: [
      '/mcr.png'
    ],
    aspectRatio: '4:5',
    orientation: 'portrait',
    price: '$25.00'
  },
  {
    id: '4',
    title: 'Horizon Corp',
    category: 'Company',
    description: 'Minimalist branding poster for Horizon Technologies.',
    productionDetails: 'Corporate Identity Project | Vector Art | 2024',
    images: [
      '/Realityclub.jpg'
    ],
    aspectRatio: '16:9',
    orientation: 'landscape',
    price: '$30.00'
  },
  {
    id: '5',
    title: 'Stellar Voyage',
    category: 'Film',
    description: 'Epic space opera visual concept.',
    productionDetails: 'Sci-Fi Collection | Digital Matte Painting | 2024',
    images: [
      '/Realityclub.jpg'
    ],
    aspectRatio: '16:9',
    orientation: 'landscape',
    price: '$35.00'
  },
  {
    id: '6',
    title: 'Midnight Jazz',
    category: 'Song',
    description: 'Album cover art for the "Midnight Sessions" jazz collection.',
    productionDetails: 'Graphic Design | Mixed Media | 2023',
    images: [
      '/oasis.png'
    ],
    aspectRatio: '4:5',
    orientation: 'portrait',
    price: '$22.00'
  },
  {
    id: '7',
    title: 'Urban Jungle',
    category: 'Company',
    description: 'Sustainability campaign poster for GreenCity.',
    productionDetails: 'Environmental Awareness | Photography | 2024',
    images: [
      '/oasis.png'
    ],
    aspectRatio: '4:5',
    orientation: 'portrait',
    price: '$25.00'
  },
  {
    id: '8',
    title: 'Velvet Sky',
    category: 'Song',
    description: 'Dreamy visuals for the synth-pop track "Velvet".',
    productionDetails: 'Abstract Series | Digital Art | 2023',
    images: [
      '/oasis.png'
    ],
    aspectRatio: '4:5',
    orientation: 'portrait',
    price: '$20.00'
  },
  {
    id: '9',
    title: 'Apex Peak',
    category: 'Company',
    description: 'Promotional poster for Apex Outdoor Gear.',
    productionDetails: 'Adventure Series | Photography | 2024',
    images: [
      '/Realityclub.jpg'
    ],
    aspectRatio: '16:9',
    orientation: 'landscape',
    price: '$28.00'
  },
  {
    id: '10',
    title: 'Apex Peak',
    category: 'Company',
    description: 'Promotional poster for Apex Outdoor Gear.',
    productionDetails: 'Adventure Series | Photography | 2024',
    images: [
      '/Realityclub.jpg'
    ],
    aspectRatio: '16:9',
    orientation: 'landscape',
    price: '$28.00'
  }
];