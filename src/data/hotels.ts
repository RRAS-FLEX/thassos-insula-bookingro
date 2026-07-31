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

export const TOWN_LIST = [
  "Aliki",
  "Astris",
  "Chrysi Ammoudia",
  "Golden Beach",
  "Kallirachi",
  "Kazaviti",
  "Kinira",
  "Limenaria",
  "Limenas (Thassos Town)",
  "Maries",
  "Panagia",
  "Pefkari",
  "Potos",
  "Prinos",
  "Rachoni",
  "Skala Kallirachis",
  "Skala Maries",
  "Skala Potamias",
  "Skala Prinos",
  "Skala Rachoni",
  "Theologos",
];

export const HOTELS: Hotel[] = [];
