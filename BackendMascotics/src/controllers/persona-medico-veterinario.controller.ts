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
  MedicoVeterinario,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaMedicoVeterinarioController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/medico-veterinarios', {
    responses: {
      '200': {
        description: 'Array of Persona has many MedicoVeterinario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MedicoVeterinario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<MedicoVeterinario>,
  ): Promise<MedicoVeterinario[]> {
    return this.personaRepository.medicosVeterinarios(id).find(filter);
  }

  @post('/personas/{id}/medico-veterinarios', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(MedicoVeterinario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedicoVeterinario, {
            title: 'NewMedicoVeterinarioInPersona',
            exclude: ['id'],
            optional: ['personaId']
          }),
        },
      },
    }) medicoVeterinario: Omit<MedicoVeterinario, 'id'>,
  ): Promise<MedicoVeterinario> {
    return this.personaRepository.medicosVeterinarios(id).create(medicoVeterinario);
  }

  @patch('/personas/{id}/medico-veterinarios', {
    responses: {
      '200': {
        description: 'Persona.MedicoVeterinario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedicoVeterinario, {partial: true}),
        },
      },
    })
    medicoVeterinario: Partial<MedicoVeterinario>,
    @param.query.object('where', getWhereSchemaFor(MedicoVeterinario)) where?: Where<MedicoVeterinario>,
  ): Promise<Count> {
    return this.personaRepository.medicosVeterinarios(id).patch(medicoVeterinario, where);
  }

  @del('/personas/{id}/medico-veterinarios', {
    responses: {
      '200': {
        description: 'Persona.MedicoVeterinario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(MedicoVeterinario)) where?: Where<MedicoVeterinario>,
  ): Promise<Count> {
    return this.personaRepository.medicosVeterinarios(id).delete(where);
  }
}
