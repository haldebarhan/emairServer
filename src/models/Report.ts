export interface Report {
  petit_dejeuner: {
    recette: string;
    effectif: number;
    denrees: {
      produit: string;
      ration: number;
      unite: string;
      uc: string;
      mesure: string;
      eq: number;
    }[];
  };
  dejeuner: {
    recette: string;
    effectif: number;
    denrees: {
      produit: string;
      ration: number;
      unite: string;
      uc: string;
      mesure: string;
      eq: number;
    }[];
  };

  hors_doeuvre: {
    recette: string;
    effectif: number;
    denrees: {
      produit: string;
      ration: number;
      unite: string;
      uc: string;
      mesure: string;
      eq: number;
    }[];
  };

  dessert: {
    recette: string;
    effectif: number;
    denrees: {
      produit: string;
      ration: number;
      unite: string;
      uc: string;
      mesure: string;
      eq: number;
    }[];
  };

  diner: {
    recette: string;
    effectif: number;
    denrees: {
      produit: string;
      ration: number;
      unite: string;
      uc: string;
      mesure: string;
      eq: number;
    }[];
  };
}
