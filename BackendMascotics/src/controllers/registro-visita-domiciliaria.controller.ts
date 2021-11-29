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
import {RegistroVisitaDomiciliaria} from '../models';
import {RegistroVisitaDomiciliariaRepository} from '../repositories';

@authenticate()//proteger acceso
export class RegistroVisitaDomiciliariaController {
  constructor(
    @repository(RegistroVisitaDomiciliariaRepository)
    public registroVisitaDomiciliariaRepository : RegistroVisitaDomiciliariaRepository,
  ) {}

  @post('/registro-visita-domiciliaria')
  @response(200, {
    description: 'RegistroVisitaDomiciliaria model instance',
    content: {'application/json': {schema: getModelSchemaRef(RegistroVisitaDomiciliaria)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroVisitaDomiciliaria, {
            title: 'NewRegistroVisitaDomiciliaria',
            exclude: ['id'],
          }),
        },
      },
    })
    registroVisitaDomiciliaria: Omit<RegistroVisitaDomiciliaria, 'id'>,
  ): Promise<RegistroVisitaDomiciliaria> {
    return this.registroVisitaDomiciliariaRepository.create(registroVisitaDomiciliaria);
  }

  @authenticate.skip()//saltar la protección en esta ruta
  @get('/registro-visita-domiciliaria/count')
  @response(200, {
    description: 'RegistroVisitaDomiciliaria model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(RegistroVisitaDomiciliaria) where?: Where<RegistroVisitaDomiciliaria>,
  ): Promise<Count> {
    return this.registroVisitaDomiciliariaRepository.count(where);
  }

  @authenticate.skip()//saltar la protección en esta ruta
  @get('/registro-visita-domiciliaria')
  @response(200, {
    description: 'Array of RegistroVisitaDomiciliaria model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RegistroVisitaDomiciliaria, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(RegistroVisitaDomiciliaria) filter?: Filter<RegistroVisitaDomiciliaria>,
  ): Promise<RegistroVisitaDomiciliaria[]> {
    return this.registroVisitaDomiciliariaRepository.find(filter);
  }

  @patch('/registro-visita-domiciliaria')
  @response(200, {
    description: 'RegistroVisitaDomiciliaria PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroVisitaDomiciliaria, {partial: true}),
        },
      },
    })
    registroVisitaDomiciliaria: RegistroVisitaDomiciliaria,
    @param.where(RegistroVisitaDomiciliaria) where?: Where<RegistroVisitaDomiciliaria>,
  ): Promise<Count> {
    return this.registroVisitaDomiciliariaRepository.updateAll(registroVisitaDomiciliaria, where);
  }

  @authenticate.skip()//saltar la protección en esta ruta
  @get('/registro-visita-domiciliaria/{id}')
  @response(200, {
    description: 'RegistroVisitaDomiciliaria model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RegistroVisitaDomiciliaria, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(RegistroVisitaDomiciliaria, {exclude: 'where'}) filter?: FilterExcludingWhere<RegistroVisitaDomiciliaria>
  ): Promise<RegistroVisitaDomiciliaria> {
    return this.registroVisitaDomiciliariaRepository.findById(id, filter);
  }

  @patch('/registro-visita-domiciliaria/{id}')
  @response(204, {
    description: 'RegistroVisitaDomiciliaria PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroVisitaDomiciliaria, {partial: true}),
        },
      },
    })
    registroVisitaDomiciliaria: RegistroVisitaDomiciliaria,
  ): Promise<void> {
    await this.registroVisitaDomiciliariaRepository.updateById(id, registroVisitaDomiciliaria);
  }

  @put('/registro-visita-domiciliaria/{id}')
  @response(204, {
    description: 'RegistroVisitaDomiciliaria PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() registroVisitaDomiciliaria: RegistroVisitaDomiciliaria,
  ): Promise<void> {
    await this.registroVisitaDomiciliariaRepository.replaceById(id, registroVisitaDomiciliaria);
  }

  @del('/registro-visita-domiciliaria/{id}')
  @response(204, {
    description: 'RegistroVisitaDomiciliaria DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.registroVisitaDomiciliariaRepository.deleteById(id);
  }
}
