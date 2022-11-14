/**
 * Created by Utilisateur on 21/05/2017.
 */



import {Profil} from "../profil/profil";
import {User} from "../user/user";


export class SaleTarget {
  id: number;
  agent: Profil;
  start_date: Date;
  end_date: Date;
  amount_target: number;
  amount_obtained: number;
  is_reached: boolean;

  constructor() {
  }

}
