import { TypeFinOperation } from '../typefinoperation/typefinoperation';
import { Profil } from './../profil/profil';
import { VirtualAccount } from './../virtualaccount/virtualaccount';


  export class FinOperation
    {
        id : number;
        account : VirtualAccount;
        amount : number;
        remaining : number;
        proof_number : string;
        description: string;
        operation_date: Date;
        operation_type: TypeFinOperation; 
        agent: Profil;
    }