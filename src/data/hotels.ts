export type Hotel = {
  id: number;
  name: string;
  town: string;
  stars: number;
  priceFrom: number;
  description: string;
  phone: string;
  email: string;
  image: string;
  offer: boolean;
};

const TOWNS = [
  "Limenas (Thassos Town)",
  "Limenaria",
  "Potos",
  "Skala Rachoni",
  "Skala Prinos",
  "Golden Beach",
  "Aliki",
  "Pefkari",
  "Astris",
  "Kinira",
  "Skala Potamias",
  "Chrysi Ammoudia",
];

const PREFIXES = [
  "Aegean", "Blue", "Golden", "Olive", "Sun", "Aegis", "Marble", "Emerald",
  "Ionian", "Villa", "Hotel", "Studios", "Alkyon", "Poseidon", "Aphrodite",
  "Athos", "Thassian", "Meltemi", "Kalypso", "Nostos", "Filoxenia", "Aktaion",
  "Coral", "Pearl", "Silver", "Amber", "Serene", "Panorama", "Bay", "Cliff",
];

const SUFFIXES = [
  "Resort", "Suites", "Boutique", "Beach Hotel", "Studios", "Villas",
  "Bay Resort", "Garden Hotel", "Sea View", "Palace", "Retreat", "Rooms",
  "Apartments", "Village", "Inn", "Lodge", "House", "Bungalows",
];

// Simple seeded PRNG for stable results
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rnd: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rnd() * arr.length)];
}

// Curated Unsplash photo IDs (hotels, greek islands, mediterranean).
const PHOTO_IDS = [
  "1566073771259-6a8506099945", "1519449556851-5720b33024e7",
  "1520250497591-112f2f40a3f4", "1571003123894-1f0594d2b5d9",
  "1445019980597-93fa8acb246c", "1551882547-ff40c63fe5fa",
  "1590490360182-c33d57733427", "1596394516093-501ba68a0ba6",
  "1542314831-068cd1dbfeeb", "1618773928121-c32242e63f39",
  "1512918728675-ed5a9ecdebfd", "1540541338287-41700207dee6",
  "1601565415267-724db0e9fbba", "1596436889106-be35e843f974",
  "1522798514-97ceb8c4f1c8", "1499696010180-025ef6e1a8f9",
  "1449824913935-59a10b8d2000", "1533105079780-92b9be482077",
  "1519666336592-e225a99dcd2f", "1602343168117-bb8ffe3e2e9f",
  "1533619043865-1f0c73b3ba1e", "1615460549969-36fa19521a4f",
  "1610530460358-dc7b53e39a11", "1502602898657-3e91760cbb34",
  "1554995207-c18c203602cb", "1444201983204-c43cbd584d93",
  "1571896349842-33c89424de2d", "1580977276076-ae4b8c219b8e",
  "1587985064135-0366536eab42", "1512453979798-5ea266f8880c",
  "1560347876-aeef00ee58a1", "1613977257363-707ba9348227",
  "1568084680786-a84f91d1153c", "1611892440504-42a792e24d32",
  "1439130490301-25e322d88054", "1470229722913-7c0e2dbbafd3",
  "1507525428034-b723cf961d3e", "1506929562872-bb421503ef21",
  "1509233725247-49e657c54213", "1580655653885-65763b2597d0",
];

function makeName(rnd: () => number, i: number) {
  const p = pick(rnd, PREFIXES);
  const s = pick(rnd, SUFFIXES);
  // Slight variety so names feel real across 220 cards
  return `${p} ${s}${rnd() < 0.15 ? " " + (i % 9 + 1) : ""}`;
}

function makePhone(rnd: () => number) {
  const a = 20000 + Math.floor(rnd() * 79999);
  const b = 10000 + Math.floor(rnd() * 89999);
  return `+30 25930 ${a}`.slice(0, 15) + ` / ${b}`;
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

export const HOTELS: Hotel[] = Array.from({ length: 220 }, (_, i) => {
  const rnd = mulberry32(i * 9301 + 49297);
  const name = makeName(rnd, i);
  const town = pick(rnd, TOWNS);
  const stars = 2 + Math.floor(rnd() * 4); // 2..5
  const priceFrom = 35 + Math.floor(rnd() * 220);
  const photoId = PHOTO_IDS[i % PHOTO_IDS.length];
  return {
    id: i + 1,
    name,
    town,
    stars,
    priceFrom,
    description: `${stars}-star ${
      stars >= 4 ? "elegant" : "cozy"
    } stay in ${town}, steps from the Aegean sea. Warm hospitality, traditional Thassian breakfast and modern amenities.`,
    phone: makePhone(rnd),
    email: `reservations@${slug(name)}.gr`,
    image: `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=800&q=70`,
    offer: rnd() < 0.22, // ~22% eligible for the free-ferry promo
  };
});

export const TOWN_LIST = TOWNS;
