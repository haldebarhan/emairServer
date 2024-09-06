export interface Menu {
  entree: string;
  pt_dej: string;
  dessert: string;
  dejeuner: { sauce: string; proteine: string; feculent: string };
  diner: { sauce: string; proteine: string; feculent: string };
  defined: Boolean;
}
