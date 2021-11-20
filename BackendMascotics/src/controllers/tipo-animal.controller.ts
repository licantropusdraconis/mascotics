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
import {TipoAnimal} from '../models';
import {TipoAnimalRepository} from '../repositories';

export class TipoAnimalController {
  constructor(
    @repository(TipoAnimalRepository)
    public tipoAnimalRepository : TipoAnimalRepository,
  ) {}

  @post('/tipo-animal')
  @response(200, {
    description: 'TipoAnimal model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoAnimal)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoAnimal, {
            title: 'NewTipoAnimal',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoAnimal: Omit<TipoAnimal, 'id'>,
  ): Promise<TipoAnimal> {
    return this.tipoAnimalRepository.create(tipoAnimal);
  }

  @get('/tipo-animal/count')
  @response(200, {
    description: 'TipoAnimal model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoAnimal) where?: Where<TipoAnimal>,
  ): Promise<Count> {
    return this.tipoAnimalRepository.count(where);
  }

  @get('/tipo-animal')
  @response(200, {
    description: 'Array of TipoAnimal model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoAnimal, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoAnimal) filter?: Filter<TipoAnimal>,
  ): Promise<TipoAnimal[]> {
    return this.tipoAnimalRepository.find(filter);
  }

  @patch('/tipo-animal')
  @response(200, {
    description: 'TipoAnimal PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoAnimal, {partial: true}),
        },
      },
    })
    tipoAnimal: TipoAnimal,
    @param.where(TipoAnimal) where?: Where<TipoAnimal>,
  ): Promise<Count> {
    return this.tipoAnimalRepository.updateAll(tipoAnimal, where);
  }

  @get('/tipo-animal/{id}')
  @response(200, {
    description: 'TipoAnimal model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoAnimal, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TipoAnimal, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoAnimal>
  ): Promise<TipoAnimal> {
    return this.tipoAnimalRepository.findById(id, filter);
  }

  @patch('/tipo-animal/{id}')
  @response(204, {
    description: 'TipoAnimal PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoAnimal, {partial: true}),
        },
      },
    })
    tipoAnimal: TipoAnimal,
  ): Promise<void> {
    await this.tipoAnimalRepository.updateById(id, tipoAnimal);
  }

  @put('/tipo-animal/{id}')
  @response(204, {
    description: 'TipoAnimal PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tipoAnimal: TipoAnimal,
  ): Promise<void> {
    await this.tipoAnimalRepository.replaceById(id, tipoAnimal);
  }

  @del('/tipo-animal/{id}')
  @response(204, {
    description: 'TipoAnimal DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tipoAnimalRepository.deleteById(id);
  }
}
