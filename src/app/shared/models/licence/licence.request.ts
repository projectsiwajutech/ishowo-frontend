import {Module} from "../module/module";
/**
 * Created by Utilisateur on 19/08/2017.
 */


export class LicenceRequest{
  nom_company: string;
  adresse_company: string;
  telephone_company: string;
  secteur: string;
  nom_admin: string;
  email_admin: string;
  prenom_admin: string;
  telephone_admin: any;
  fprint: string;
  module: Module;
  code: string;

  //for LARAVEL API
  id_company: number;


  constructor(){

  }

}
