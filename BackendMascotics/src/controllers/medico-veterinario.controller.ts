import { authenticate } from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {MedicoVeterinario} from '../models';
import {MedicoVeterinarioRepository} from '../repositories';

@authenticate()//protección de acceso
export class MedicoVeterinarioController {
  constructor(
    @repository(MedicoVeterinarioRepository)
    public medicoVeterinarioRepository : MedicoVeterinarioRepository,
  ) {}

  @post('/medico-veterinario')
  @response(200, {
    description: 'MedicoVeterinario model instance',
    content: {'application/json': {schema: getModelSchemaRef(MedicoVeterinario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedicoVeterinario, {
            title: 'NewMedicoVeterinario',
            exclude: ['id'],
          }),
        },
      },
    })
    medicoVeterinario: Omit<MedicoVeterinario, 'id'>,
  ): Promise<MedicoVeterinario> {
    return this.medicoVeterinarioRepository.create(medicoVeterinario);
  }

  @authenticate.skip()//saltar la protección en esta ruta
  @get('/medico-veterinario/count')
  @response(200, {
    description: 'MedicoVeterinario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MedicoVeterinario) where?: Where<MedicoVeterinario>,
  ): Promise<Count> {
    return this.medicoVeterinarioRepository.count(where);
  }

  @authenticate.skip()//saltar la protección en esta ruta
  @get('/medico-veterinario')
  @response(200, {
    description: 'Array of MedicoVeterinario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MedicoVeterinario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MedicoVeterinario) filter?: Filter<MedicoVeterinario>,
  ): Promise<MedicoVeterinario[]> {
    return this.medicoVeterinarioRepository.find(filter);
  }

  @patch('/medico-veterinario')
  @response(200, {
    description: 'MedicoVeterinario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedicoVeterinario, {partial: true}),
        },
      },
    })
    medicoVeterinario: MedicoVeterinario,
    @param.where(MedicoVeterinario) where?: Where<MedicoVeterinario>,
  ): Promise<Count> {
    return this.medicoVeterinarioRepository.updateAll(medicoVeterinario, where);
  }

  @authenticate.skip()//saltar la protección en esta ruta
  @get('/medico-veterinario/{id}')
  @response(200, {
    description: 'MedicoVeterinario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MedicoVeterinario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(MedicoVeterinario, {exclude: 'where'}) filter?: FilterExcludingWhere<MedicoVeterinario>
  ): Promise<MedicoVeterinario> {
    return this.medicoVeterinarioRepository.findById(id, filter);
  }

  @patch('/medico-veterinario/{id}')
  @response(204, {
    description: 'MedicoVeterinario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedicoVeterinario, {partial: true}),
        },
      },
    })
    medicoVeterinario: MedicoVeterinario,
  ): Promise<void> {
    await this.medicoVeterinarioRepository.updateById(id, medicoVeterinario);
  }

  @put('/medico-veterinario/{id}')
  @response(204, {
    description: 'MedicoVeterinario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() medicoVeterinario: MedicoVeterinario,
  ): Promise<void> {
    await this.medicoVeterinarioRepository.replaceById(id, medicoVeterinario);
  }

  @del('/medico-veterinario/{id}')
  @response(204, {
    description: 'MedicoVeterinario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.medicoVeterinarioRepository.deleteById(id);
  }
}
