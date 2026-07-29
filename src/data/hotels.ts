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

export const HOTELS: Hotel[] = [];
