import {Role} from "./Role";

export interface User {
  id_client:number,
  username:String,
  email:String,
  role:Role
}
