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
  Mascota,
  SolicitudVisitaDomiciliaria,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaSolicitudVisitaDomiciliariaController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/solicitud-visita-domiciliarias', {
    responses: {
      '200': {
        description: 'Array of Mascota has many SolicitudVisitaDomiciliaria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudVisitaDomiciliaria)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SolicitudVisitaDomiciliaria>,
  ): Promise<SolicitudVisitaDomiciliaria[]> {
    return this.mascotaRepository.solicitudVisitaDomiciliarias(id).find(filter);
  }

  @post('/mascotas/{id}/solicitud-visita-domiciliarias', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudVisitaDomiciliaria)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudVisitaDomiciliaria, {
            title: 'NewSolicitudVisitaDomiciliariaInMascota',
            exclude: ['id'],
            optional: ['mascotaId']
          }),
        },
      },
    }) solicitudVisitaDomiciliaria: Omit<SolicitudVisitaDomiciliaria, 'id'>,
  ): Promise<SolicitudVisitaDomiciliaria> {
    return this.mascotaRepository.solicitudVisitaDomiciliarias(id).create(solicitudVisitaDomiciliaria);
  }

  @patch('/mascotas/{id}/solicitud-visita-domiciliarias', {
    responses: {
      '200': {
        description: 'Mascota.SolicitudVisitaDomiciliaria PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudVisitaDomiciliaria, {partial: true}),
        },
      },
    })
    solicitudVisitaDomiciliaria: Partial<SolicitudVisitaDomiciliaria>,
    @param.query.object('where', getWhereSchemaFor(SolicitudVisitaDomiciliaria)) where?: Where<SolicitudVisitaDomiciliaria>,
  ): Promise<Count> {
    return this.mascotaRepository.solicitudVisitaDomiciliarias(id).patch(solicitudVisitaDomiciliaria, where);
  }

  @del('/mascotas/{id}/solicitud-visita-domiciliarias', {
    responses: {
      '200': {
        description: 'Mascota.SolicitudVisitaDomiciliaria DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudVisitaDomiciliaria)) where?: Where<SolicitudVisitaDomiciliaria>,
  ): Promise<Count> {
    return this.mascotaRepository.solicitudVisitaDomiciliarias(id).delete(where);
  }
}
