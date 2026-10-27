import { GalleryCategory, GalleryImage } from './gallery.model.js';

// Product photos hosted on Amazon's image CDN (m.media-amazon.com), collected from amazon.in search results.
// `imageId` is the CDN file id; the frontend builds sized URLs from it (e.g. `<imageId>._AC_SX400_.jpg`).
type Seed = [title: string, imageId: string, price: number];

const SEEDS: Record<GalleryCategory, Seed[]> = {
  Headphones: [
    ['boAt Rockerz 480 Wireless Headphones', '711l4y8aNlL', 1499],
    ['boAt Rockerz 411 Wireless Headphones', '71QdB7hDCAL', 1099],
    ['Zebronics Thunder Wireless Headphones', '61FpBOJiWHL', 624],
    ['boAt Rockerz Plus 435 Bluetooth Headphones', '617G2COzpeL', 1599],
    ['boAt Rockerz 650 Pro Headphones', '51o1ooDqHwL', 2899],
    ['Zebronics Thunder Neo Wireless Headphones', '61LU0K7SF3L', 599],
    ['boAt Rockerz 512 ANC Headphones', '51cDHMYsohL', 2799],
    ['Sony WH-CH520 Wireless Headphones', '41lArSiD5hL', 2989],
  ],
  'Smart watches': [
    ['Fire-Boltt Ninja X Ring Smart Watch', '61wT6-UtrlL', 999],
    ['NoiseFit Halo AMOLED Smart Watch', '71aTghUQfqL', 2799],
    ['Fire-Boltt Ninja Call Pro Max Smart Watch', '61C+LPKx+4L', 899],
    ['Noise Vortex Plus AMOLED Smart Watch', '61QiBo-sPTL', 1999],
    ['Noise Twist Go Round Dial Smart Watch', '61BoaOUf+KL', 1599],
    ['Noise Alt Watch 1 with Built-in GPS', '61C1OUyfgLL', 5499],
    ['GOBOULT Trail Smart Watch', '71+Em5KJCcL', 1399],
    ['T800 Smart Watch, 1.99" Display', '61JRSFg2DlL', 499],
  ],
  'Running shoes': [
    ['Boldfit Running Shoes', '719ojmA9G7L', 1099],
    ['OFF LIMITS Running Shoes', '61BOzG+G1TL', 1419],
    ['SPARX Running Shoes', '71yJoYJ81nL', 1174],
    ['ASIAN Running Shoes', '61utX8kBDlL', 569],
    ['BRUTON Running Shoes', '719uGTxwMWL', 398],
    ['PUMA Running Shoes', '51GOpp8rAJL', 1289],
    ['Red Tape Running Shoes', '71olqxrKH5L', 1441],
    ['Campus Running Shoes', '61DtkP2ktlL', 1399],
  ],
  Cameras: [
    ['Sony Alpha ILCE-6100 Mirrorless Camera', '71SsP7PGEVL', 74990],
    ['Sony Alpha ZV-E10 Mirrorless Vlog Camera', '712ywHZbdNL', 61490],
    ['Canon EOS R100 Mirrorless Camera', '81Tib6mb8eL', 44989],
    ['Canon EOS R50 Mirrorless Camera', '81LskAU5h1L', 64989],
    ['Sony Alpha ZV-E10 II Vlog Camera', '81ST9EJe9QL', 96990],
    ['Sony Alpha ILCE-6700 Mirrorless Camera', '71NZHYzkyzL', 158990],
    ['Fujifilm X-M5 Mirrorless Camera', '71g-a2u+--L', 85499],
  ],
};

export const GALLERY_IMAGES: GalleryImage[] = Object.entries(SEEDS).flatMap(([category, seeds]) =>
  seeds.map(([title, imageId, price]) => ({ title, imageId, price, category: category as GalleryCategory })),
).map((item, i) => ({ id: i + 1, ...item, alt: `${item.title} product photo` }));
