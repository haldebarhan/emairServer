import { Report } from 'src/models/Report';

export class ProductsUsedCalculation {
  data: Report;

  constructor(report: Report) {
    this.data = report;
  }

  breakfastFoods() {
    const headcount = this.data.petit_dejeuner.effectif;
    const foods = this.data.petit_dejeuner.denrees.map((item) => {
      const ration = item.ration;
      const eq = item.eq;
      var numberOfProducts = (ration * headcount) / eq;
      return {
        produit: item.produit,
        quantite: Math.ceil(numberOfProducts),
        um: item.mesure,
      };
    });

    return foods;
  }

  lunchFoods() {
    const headcount = this.data.dejeuner.effectif;
    const lunch = this.data.dejeuner.denrees.map((item) => {
      const ration = item.ration;
      const eq = item.eq;
      var numberOfProducts = (ration * headcount) / eq;
      return {
        produit: item.produit,
        quantite: Math.ceil(numberOfProducts),
        um: item.mesure,
      };
    });

    const hdFoods = this.data.hors_doeuvre.denrees.map((item) => {
      const ration = item.ration;
      const eq = item.eq;
      var numberOfProducts = (ration * headcount) / eq;
      return {
        produit: item.produit,
        quantite: Math.ceil(numberOfProducts),
        um: item.mesure,
      };
    });

    const dessertFoods = this.data.dessert.denrees.map((item) => {
      const ration = item.ration;
      const eq = item.eq;
      var numberOfProducts = (ration * headcount) / eq;
      return {
        produit: item.produit,
        quantite: Math.ceil(numberOfProducts),
        um: item.mesure,
      };
    });

    const foods = lunch.concat(dessertFoods).concat(hdFoods);
    return foods;
  }

  dinerFoods() {
    const headcount = this.data.diner.effectif;
    const foods = this.data.diner.denrees.map((item) => {
      const ration = item.ration;
      const eq = item.eq;
      var numberOfProducts = (ration * headcount) / eq;
      return {
        produit: item.produit,
        quantite: Math.ceil(numberOfProducts),
        um: item.mesure,
      };
    });

    return foods;
  }

  getBreakfastHeadcount() {
    return this.data.petit_dejeuner.effectif;
  }
  getLunchHeadcount() {
    return this.data.dejeuner.effectif;
  }
  getDinerHeadcount() {
    return this.data.diner.effectif;
  }

  getBreackFastRecipe() {
    return this.data.petit_dejeuner.recette;
  }
  getHDRecipe() {
    return this.data.hors_doeuvre.recette;
  }
  getLunchRecipe() {
    return this.data.dejeuner.recette;
  }
  getDessertRecipe() {
    return this.data.dessert.recette;
  }
  getDinerRecipe() {
    return this.data.diner.recette;
  }

  getTotalFoods(){
    return this.combineAllMeals(this.dinerFoods());
  }

  combineAllMeals(diner: object[]) {
    const combined = {};
    const dayMeals = this.combineDayMeals(
      this.breakfastFoods(),
      this.lunchFoods(),
    );
    dayMeals.forEach((item: any) => {
      if (!combined[item.produit]) {
        combined[item.produit] = {
          produit: item.produit,
          matin: item.matin,
          soir: item.soir,
          unite: item.unite,
        };
      } else {
        combined[item.produit].soir += item.quantite;
      }
    });

    diner.forEach((item: any) => {
      if (!combined[item.produit]) {
        combined[item.produit] = {
          produit: item.produit,
          matin: 0,
          soir: item.quantite,
          unite: item.um,
        };
      } else {
        combined[item.produit].soir += item.quantite;
      }
    });
    return Object.values(combined);
  }

  combineDayMeals(breakfast: object[], lunch: object[]) {
    const combined = {};
    breakfast.forEach((item: any) => {
      if (!combined[item.produit]) {
        combined[item.produit] = {
          produit: item.produit,
          matin: item.quantite,
          unite: item.um,
          soir: 0,
        };
      } else {
        combined[item.produit].matin += item.quantite;
      }
    });

    lunch.forEach((item: any) => {
      if (!combined[item.produit]) {
        combined[item.produit] = {
          produit: item.produit,
          matin: item.quantite,
          unite: item.um,
          soir: 0,
        };
      } else {
        combined[item.produit].matin += item.quantite;
      }
    });

    return Object.values(combined);
  }
}
