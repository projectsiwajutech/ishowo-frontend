

import {User} from "../user/user";
import {Agency} from "../agency/agency";
import {Group} from "../group/group";


export class Profil {
  id: number;
  login: string;
  code: string;
  user: User;
  agency: Agency;
  group: Group;
  agent: Profil;
  date_of_creation: Date;
}
