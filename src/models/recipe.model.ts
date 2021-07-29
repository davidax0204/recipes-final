import { Ingredient } from './ingrediants.model';

export class Recipe {
  public name: string;
  public decription: string;
  public imagePath: string;
  public ingrediants: Ingredient[];

  constructor(
    name: string,
    decription: string,
    imagePath: string,
    ingrediants: Ingredient[]
  ) {
    this.name = name;
    this.decription = decription;
    this.imagePath = imagePath;
    this.ingrediants = ingrediants;
  }
}
