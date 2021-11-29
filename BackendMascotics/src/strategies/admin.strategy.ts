import { AuthenticationStrategy } from "@loopback/authentication";
import { service } from "@loopback/core";
import { HttpErrors, Request } from "@loopback/rest";
import { UserProfile } from "@loopback/security";
import parseBearerToken from "parse-bearer-token";
import { AutenticacionService } from "../services";

export class EstrategiaAdministrador implements AuthenticationStrategy{
    name:string='admin';
    //con el constructor inyecto servicios o repositorios que necesite
    constructor(
        @service(AutenticacionService)
        public servicioAutenticacion: AutenticacionService
    ){}
    //método authenticate que ejecuta la EstrategiaAdministrador
    async authenticate(request: Request): Promise<UserProfile | undefined>{
        //obtener el token
        let token=parseBearerToken(request);
        //validar el token
        if(token){
            let datos = this.servicioAutenticacion.ValidarTokenJWT(token);
            if(datos){
                //if datos.data pues en persona.controller se llama data
                //si tuviera roles, en el token podría o debería incluirlo
                //if(datos.data.role) //si tengo roles uso la opcion role como no tengo uso perfil
                let perfil:UserProfile=Object.assign({
                    nombre: datos.data.nombre
                });
                return perfil;
            }else{
                throw new HttpErrors[401]("Token incluido es inválido")    
            }
        }else{
            throw new HttpErrors[401]("No se ha incluido token en la solicitud")
        }
    }
}