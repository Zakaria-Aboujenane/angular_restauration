export interface Commande {
  id_commande:number,
  titre:String,
  date:Date,
  fraisLivraison:number,
  valide:boolean,
  current:boolean,
  livred:boolean
}
