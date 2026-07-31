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
  "Panagia",
  "Theologos",
  "Prinos",
  "Kazaviti",
  "Rachoni",
  "Kallirachi",
  "Skala Kallirachis",
  "Maries",
  "Skala Maries",
];

export const HOTELS: Hotel[] = [];
