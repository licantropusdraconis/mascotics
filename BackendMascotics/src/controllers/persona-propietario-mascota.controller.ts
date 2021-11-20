import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Persona,
  PropietarioMascota,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaPropietarioMascotaController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/propietario-mascotas', {
    responses: {
      '200': {
        description: 'Array of Persona has many PropietarioMascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PropietarioMascota)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PropietarioMascota>,
  ): Promise<PropietarioMascota[]> {
    return this.personaRepository.propietarioMascotas(id).find(filter);
  }

  @post('/personas/{id}/propietario-mascotas', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(PropietarioMascota)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PropietarioMascota, {
            title: 'NewPropietarioMascotaInPersona',
            exclude: ['id'],
            optional: ['personaId']
          }),
        },
      },
    }) propietarioMascota: Omit<PropietarioMascota, 'id'>,
  ): Promise<PropietarioMascota> {
    return this.personaRepository.propietarioMascotas(id).create(propietarioMascota);
  }

  @patch('/personas/{id}/propietario-mascotas', {
    responses: {
      '200': {
        description: 'Persona.PropietarioMascota PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PropietarioMascota, {partial: true}),
        },
      },
    })
    propietarioMascota: Partial<PropietarioMascota>,
    @param.query.object('where', getWhereSchemaFor(PropietarioMascota)) where?: Where<PropietarioMascota>,
  ): Promise<Count> {
    return this.personaRepository.propietarioMascotas(id).patch(propietarioMascota, where);
  }

  @del('/personas/{id}/propietario-mascotas', {
    responses: {
      '200': {
        description: 'Persona.PropietarioMascota DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PropietarioMascota)) where?: Where<PropietarioMascota>,
  ): Promise<Count> {
    return this.personaRepository.propietarioMascotas(id).delete(where);
  }
}
