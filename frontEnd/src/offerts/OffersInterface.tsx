interface Offer {
  username: string;
  company_name: string;
  id: number;
  title: string;
  electronics: boolean;
  fashion: boolean;
  home_garden: boolean;
  automotive: boolean;
  health_beauty: boolean;
  price: string;
  picture: string;
  quantity: number;
  description: string;
}

interface Offers {
  count: number;
  next: string;
  previous: string;
  results: Offer[];
}

export type { Offer, Offers };
