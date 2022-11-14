import {Profil} from "../profil/profil";
import {Licence} from "../licence/licence";
/**
 * Created by Utilisateur on 02/08/2017.
 */


export class Company {

  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  logo: string;
  description: string;
  agent: Profil;
  currentLicence: Licence;
}
