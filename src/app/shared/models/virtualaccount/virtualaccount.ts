/**
 * Created by Utilisateur on 04/06/2017.
 */

import {Profil} from "../profil/profil";
import {Bank} from "../bank/bank";
import {AccountType} from "../accounttype/accounttype";
/**
 * Created by Utilisateur on 26/03/2017.
 */

export class VirtualAccount {
  id: number;
  name: string;
  code: string;
  amount: number;
  bank: Bank;
  account_type: AccountType;
  agent: Profil;
  beneficiaire: Profil;
}

