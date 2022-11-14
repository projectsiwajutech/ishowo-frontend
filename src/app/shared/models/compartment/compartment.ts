/**
 * Created by Utilisateur on 26/03/2017.
 */

import { Agency }           from '../../models/agency/agency';
import {Profil} from "../profil/profil";

export class Compartment {
  id: number;
  name: string;
  agency: Agency;
  agent: Profil;
}
