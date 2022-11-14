import {Company} from "../company/company";
import {User} from "../user/user";
/**
 * Created by Utilisateur on 19/08/2017.
 */



export class Licence {
  id: number;
  company: Company;
  admin: User;
  code: string;
  key: string;
  isActive: boolean;
  activationDate: Date;
  expiryDate: Date;
  activationCost: number;
  module: string;
  currentDate: Date;
  act: string;

  constructor() {
    this.currentDate = new Date();
    this.isActive = false;
  }
}
