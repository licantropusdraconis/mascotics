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
  PropietarioMascota,
  Mascota,
} from '../models';
import {PropietarioMascotaRepository} from '../repositories';

export class PropietarioMascotaMascotaController {
  constructor(
    @repository(PropietarioMascotaRepository) protected propietarioMascotaRepository: PropietarioMascotaRepository,
  ) { }

  @get('/propietario-mascotas/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Array of PropietarioMascota has many Mascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Mascota>,
  ): Promise<Mascota[]> {
    return this.propietarioMascotaRepository.mascotas(id).find(filter);
  }

  @post('/propietario-mascotas/{id}/mascotas', {
    responses: {
      '200': {
        description: 'PropietarioMascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mascota)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof PropietarioMascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {
            title: 'NewMascotaInPropietarioMascota',
            exclude: ['id'],
            optional: ['propietarioMascotaId']
          }),
        },
      },
    }) mascota: Omit<Mascota, 'id'>,
  ): Promise<Mascota> {
    return this.propietarioMascotaRepository.mascotas(id).create(mascota);
  }

  @patch('/propietario-mascotas/{id}/mascotas', {
    responses: {
      '200': {
        description: 'PropietarioMascota.Mascota PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {partial: true}),
        },
      },
    })
    mascota: Partial<Mascota>,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.propietarioMascotaRepository.mascotas(id).patch(mascota, where);
  }

  @del('/propietario-mascotas/{id}/mascotas', {
    responses: {
      '200': {
        description: 'PropietarioMascota.Mascota DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.propietarioMascotaRepository.mascotas(id).delete(where);
  }
}
