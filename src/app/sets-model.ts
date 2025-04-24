export type Sets = CardSet[];

export type NewSet = {
  title: string;
  description: string;
  cards: {
    term: string;
    definition: string;
    id: string;
  }[];
};

export type CardSet = {
  title: string;
  description: string;
  setId: string;
  cards: {
    term: string;
    definition: string;
    id: string;
  }[];
};

export type Card = {
  term: string;
  definition: string;
  id: string;
};
