export interface MealProps {
  title: string;
  ingredients: string[];
}
export interface Menu {
  salad?: MealProps;
  vegetable?: MealProps;
  protein?: MealProps;
  carbo?: MealProps;
  grain?: MealProps;
  fruit?: MealProps;
}
