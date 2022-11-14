import {Profil} from "../profil/profil";
import {Company} from "../company/company";
/**
 * Created by Utilisateur on 26/03/2017.
 */

export class Agency {
  id: number;
  name: string;
  address: string;
  company: Company;
  agent: Profil;
}
