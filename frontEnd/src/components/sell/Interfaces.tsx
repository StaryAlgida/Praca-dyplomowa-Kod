interface Titles {
  [key: number]: {
    id: number;
    title: string;
  };
}

interface ItemInfo {
  title: string;
  electronics: boolean;
  fashion: boolean;
  home_garden: boolean;
  automotive: boolean;
  health_beauty: boolean;
  price: number;
  quantity: number;
  description: string;
}

interface TitleId {
  id: number;
  title: string;
}

export type { Titles, ItemInfo, TitleId };
