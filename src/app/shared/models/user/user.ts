import {Profil} from "../profil/profil";
/**
 * Created by Utilisateur on 26/03/2017.
 */

export class User {
  id: number;
  firstname: string;
  lastname: string;
  phone: any;
  email: string;
  address: string;
  balance: number;
  agent: Profil;
  date_of_creation: Date;
}

