export interface Nutritions {
  calories: number;
  carbohydrates: number;
  fat: number;
  protein: number;
  sugar: number;
}

export interface Fruit {
  family: string;
  genus: string;
  id: number;
  name: string;
  nutritions: Nutritions;
  order: string;
}
