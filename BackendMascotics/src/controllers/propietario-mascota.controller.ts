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
import {PropietarioMascota} from '../models';
import {PropietarioMascotaRepository} from '../repositories';

export class PropietarioMascotaController {
  constructor(
    @repository(PropietarioMascotaRepository)
    public propietarioMascotaRepository : PropietarioMascotaRepository,
  ) {}

  @post('/propietario-mascota')
  @response(200, {
    description: 'PropietarioMascota model instance',
    content: {'application/json': {schema: getModelSchemaRef(PropietarioMascota)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PropietarioMascota, {
            title: 'NewPropietarioMascota',
            exclude: ['id'],
          }),
        },
      },
    })
    propietarioMascota: Omit<PropietarioMascota, 'id'>,
  ): Promise<PropietarioMascota> {
    return this.propietarioMascotaRepository.create(propietarioMascota);
  }

  @get('/propietario-mascota/count')
  @response(200, {
    description: 'PropietarioMascota model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PropietarioMascota) where?: Where<PropietarioMascota>,
  ): Promise<Count> {
    return this.propietarioMascotaRepository.count(where);
  }

  @get('/propietario-mascota')
  @response(200, {
    description: 'Array of PropietarioMascota model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PropietarioMascota, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PropietarioMascota) filter?: Filter<PropietarioMascota>,
  ): Promise<PropietarioMascota[]> {
    return this.propietarioMascotaRepository.find(filter);
  }

  @patch('/propietario-mascota')
  @response(200, {
    description: 'PropietarioMascota PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PropietarioMascota, {partial: true}),
        },
      },
    })
    propietarioMascota: PropietarioMascota,
    @param.where(PropietarioMascota) where?: Where<PropietarioMascota>,
  ): Promise<Count> {
    return this.propietarioMascotaRepository.updateAll(propietarioMascota, where);
  }

  @get('/propietario-mascota/{id}')
  @response(200, {
    description: 'PropietarioMascota model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PropietarioMascota, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PropietarioMascota, {exclude: 'where'}) filter?: FilterExcludingWhere<PropietarioMascota>
  ): Promise<PropietarioMascota> {
    return this.propietarioMascotaRepository.findById(id, filter);
  }

  @patch('/propietario-mascota/{id}')
  @response(204, {
    description: 'PropietarioMascota PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PropietarioMascota, {partial: true}),
        },
      },
    })
    propietarioMascota: PropietarioMascota,
  ): Promise<void> {
    await this.propietarioMascotaRepository.updateById(id, propietarioMascota);
  }

  @put('/propietario-mascota/{id}')
  @response(204, {
    description: 'PropietarioMascota PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() propietarioMascota: PropietarioMascota,
  ): Promise<void> {
    await this.propietarioMascotaRepository.replaceById(id, propietarioMascota);
  }

  @del('/propietario-mascota/{id}')
  @response(204, {
    description: 'PropietarioMascota DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.propietarioMascotaRepository.deleteById(id);
  }
}
