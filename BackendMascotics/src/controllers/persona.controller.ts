import { authenticate } from '@loopback/authentication';
import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import { Llaves } from '../config/llaves';
import {Credenciales, Persona} from '../models';
import {PersonaRepository} from '../repositories';
import {AutenticacionService} from '../services';
const fetch = require('node-fetch');

@authenticate("admin")//se protege el acceso
export class PersonaController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ) { }

  @post('/identificar-persona',{
    responses:{
      '200':{
        description: 'Identificacion de usuarios'
      }
    }
  })
  async identificarPersona(
    @requestBody() credenciales: Credenciales
  ){
    let p = await this.servicioAutenticacion.IdentificarPersona(credenciales.usuario, credenciales.clave)
    if (p){
      let token=this.servicioAutenticacion.GenerarTokenJWT(p);
      return{//retorno un objeto con unos datos
        datos:{
          nombre: p.Nombres,
          correo: p.Correo,
          id: p.id
        },
        tk:token
      }
    } else{
      throw new HttpErrors[401]("Datos inválidos")
    }
  }

  @post('/persona')
  @response(200, {
    description: 'Persona model instance',
    content: {'application/json': {schema: getModelSchemaRef(Persona)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersona',
            exclude: ['id'],
          }),
        },
      },
    })
    persona: Omit<Persona, 'id'>,
  ): Promise<Persona> {
    let clave = this.servicioAutenticacion.GenerarClave();
    let claveCifrada = this.servicioAutenticacion.CifrarClave(clave);
    persona.Clave = claveCifrada;
    let p = await this.personaRepository.create(persona);
    //Notificar al usuario (usar paquete node-fetch para llamados asíncronos)
    let destino = persona.Correo;//ojo, no se había creado la propiedad para el email en el modelo persona.model.ts, como es necesaria se ajusta el modelo
    let asunto = `Registro en la plataforma`;
    let contenido = `Hola ${persona.Nombres} ${persona.Apellidos}, se ha creado su usuario con los siguientes datos:\n telefono es: ${persona.Telefono},\n tipo documento de identificacion es: ${persona.TipoDocIdentificacion},\n dirección: ${persona.Direccion},\n ${clave}`;
    fetch(`${Llaves.urlServicioNotificaciones}/envio-email?destinatario=${destino}&asunto=${asunto}&mensaje=${contenido}`)
      .then((data: any) => {
        console.log(data);
      })
    return p;
    //return this.personaRepository.create(persona);
  }
  
  @authenticate.skip()//saltar la protección en esta ruta
  @get('/persona/count')
  @response(200, {
    description: 'Persona model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Persona) where?: Where<Persona>,
  ): Promise<Count> {
    return this.personaRepository.count(where);
  }

  @authenticate.skip()//saltar la protección en esta ruta
  @get('/persona')
  @response(200, {
    description: 'Array of Persona model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Persona, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Persona) filter?: Filter<Persona>,
  ): Promise<Persona[]> {
    return this.personaRepository.find(filter);
  }

  @patch('/persona')
  @response(200, {
    description: 'Persona PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Persona,
    @param.where(Persona) where?: Where<Persona>,
  ): Promise<Count> {
    return this.personaRepository.updateAll(persona, where);
  }

  @authenticate.skip()//saltar la protección en esta ruta
  @get('/persona/{id}')
  @response(200, {
    description: 'Persona model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Persona, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Persona, {exclude: 'where'}) filter?: FilterExcludingWhere<Persona>
  ): Promise<Persona> {
    return this.personaRepository.findById(id, filter);
  }

  @patch('/persona/{id}')
  @response(204, {
    description: 'Persona PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Persona,
  ): Promise<void> {
    await this.personaRepository.updateById(id, persona);
  }

  @put('/persona/{id}')
  @response(204, {
    description: 'Persona PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() persona: Persona,
  ): Promise<void> {
    await this.personaRepository.replaceById(id, persona);
  }

  @del('/persona/{id}')
  @response(204, {
    description: 'Persona DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.personaRepository.deleteById(id);
  }
}
