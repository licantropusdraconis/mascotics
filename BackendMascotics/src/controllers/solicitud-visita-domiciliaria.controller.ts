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
import {SolicitudVisitaDomiciliaria} from '../models';
import {SolicitudVisitaDomiciliariaRepository} from '../repositories';

export class SolicitudVisitaDomiciliariaController {
  constructor(
    @repository(SolicitudVisitaDomiciliariaRepository)
    public solicitudVisitaDomiciliariaRepository : SolicitudVisitaDomiciliariaRepository,
  ) {}

  @post('/solicitud-visita-domiciliaria')
  @response(200, {
    description: 'SolicitudVisitaDomiciliaria model instance',
    content: {'application/json': {schema: getModelSchemaRef(SolicitudVisitaDomiciliaria)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudVisitaDomiciliaria, {
            title: 'NewSolicitudVisitaDomiciliaria',
            exclude: ['id'],
          }),
        },
      },
    })
    solicitudVisitaDomiciliaria: Omit<SolicitudVisitaDomiciliaria, 'id'>,
  ): Promise<SolicitudVisitaDomiciliaria> {
    return this.solicitudVisitaDomiciliariaRepository.create(solicitudVisitaDomiciliaria);
  }

  @get('/solicitud-visita-domiciliaria/count')
  @response(200, {
    description: 'SolicitudVisitaDomiciliaria model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SolicitudVisitaDomiciliaria) where?: Where<SolicitudVisitaDomiciliaria>,
  ): Promise<Count> {
    return this.solicitudVisitaDomiciliariaRepository.count(where);
  }

  @get('/solicitud-visita-domiciliaria')
  @response(200, {
    description: 'Array of SolicitudVisitaDomiciliaria model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SolicitudVisitaDomiciliaria, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SolicitudVisitaDomiciliaria) filter?: Filter<SolicitudVisitaDomiciliaria>,
  ): Promise<SolicitudVisitaDomiciliaria[]> {
    return this.solicitudVisitaDomiciliariaRepository.find(filter);
  }

  @patch('/solicitud-visita-domiciliaria')
  @response(200, {
    description: 'SolicitudVisitaDomiciliaria PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudVisitaDomiciliaria, {partial: true}),
        },
      },
    })
    solicitudVisitaDomiciliaria: SolicitudVisitaDomiciliaria,
    @param.where(SolicitudVisitaDomiciliaria) where?: Where<SolicitudVisitaDomiciliaria>,
  ): Promise<Count> {
    return this.solicitudVisitaDomiciliariaRepository.updateAll(solicitudVisitaDomiciliaria, where);
  }

  @get('/solicitud-visita-domiciliaria/{id}')
  @response(200, {
    description: 'SolicitudVisitaDomiciliaria model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SolicitudVisitaDomiciliaria, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SolicitudVisitaDomiciliaria, {exclude: 'where'}) filter?: FilterExcludingWhere<SolicitudVisitaDomiciliaria>
  ): Promise<SolicitudVisitaDomiciliaria> {
    return this.solicitudVisitaDomiciliariaRepository.findById(id, filter);
  }

  @patch('/solicitud-visita-domiciliaria/{id}')
  @response(204, {
    description: 'SolicitudVisitaDomiciliaria PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudVisitaDomiciliaria, {partial: true}),
        },
      },
    })
    solicitudVisitaDomiciliaria: SolicitudVisitaDomiciliaria,
  ): Promise<void> {
    await this.solicitudVisitaDomiciliariaRepository.updateById(id, solicitudVisitaDomiciliaria);
  }

  @put('/solicitud-visita-domiciliaria/{id}')
  @response(204, {
    description: 'SolicitudVisitaDomiciliaria PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() solicitudVisitaDomiciliaria: SolicitudVisitaDomiciliaria,
  ): Promise<void> {
    await this.solicitudVisitaDomiciliariaRepository.replaceById(id, solicitudVisitaDomiciliaria);
  }

  @del('/solicitud-visita-domiciliaria/{id}')
  @response(204, {
    description: 'SolicitudVisitaDomiciliaria DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.solicitudVisitaDomiciliariaRepository.deleteById(id);
  }
}
