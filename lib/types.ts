export type DrinkCategory =
  | "cocktails"
  | "signature-cocktails"
  | "signature-mocktails"
  | "whiskey"
  | "cognac"
  | "tequila"
  | "champagne"
  | "shots"
  | "shisha"
  | "beer"
  | "soft-drinks"
  | "water"
  | "food"
  | "sides"
  | "soups"
  | "add-ons"
  | "suya"
  | "shawarma"
  | "wine"
  | "spirits"
  | "energy-drinks"
  | "juice"

export interface Drink {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: DrinkCategory;
  image?: string;
  ingredients?: string[];
  tags?: string[];
  popular?: boolean;
  availableIn: ("office" | "club")[];
}

export type Section = "office" | "club";
