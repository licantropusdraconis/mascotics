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
  SolicitudVisitaDomiciliaria,
} from '../models';
import {PropietarioMascotaRepository} from '../repositories';

export class PropietarioMascotaSolicitudVisitaDomiciliariaController {
  constructor(
    @repository(PropietarioMascotaRepository) protected propietarioMascotaRepository: PropietarioMascotaRepository,
  ) { }

  @get('/propietario-mascotas/{id}/solicitud-visita-domiciliarias', {
    responses: {
      '200': {
        description: 'Array of PropietarioMascota has many SolicitudVisitaDomiciliaria',
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
    return this.propietarioMascotaRepository.solicitudesVisitasDomiciliarias(id).find(filter);
  }

  @post('/propietario-mascotas/{id}/solicitud-visita-domiciliarias', {
    responses: {
      '200': {
        description: 'PropietarioMascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudVisitaDomiciliaria)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof PropietarioMascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudVisitaDomiciliaria, {
            title: 'NewSolicitudVisitaDomiciliariaInPropietarioMascota',
            exclude: ['id'],
            optional: ['propietarioMascotaId']
          }),
        },
      },
    }) solicitudVisitaDomiciliaria: Omit<SolicitudVisitaDomiciliaria, 'id'>,
  ): Promise<SolicitudVisitaDomiciliaria> {
    return this.propietarioMascotaRepository.solicitudesVisitasDomiciliarias(id).create(solicitudVisitaDomiciliaria);
  }

  @patch('/propietario-mascotas/{id}/solicitud-visita-domiciliarias', {
    responses: {
      '200': {
        description: 'PropietarioMascota.SolicitudVisitaDomiciliaria PATCH success count',
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
    return this.propietarioMascotaRepository.solicitudesVisitasDomiciliarias(id).patch(solicitudVisitaDomiciliaria, where);
  }

  @del('/propietario-mascotas/{id}/solicitud-visita-domiciliarias', {
    responses: {
      '200': {
        description: 'PropietarioMascota.SolicitudVisitaDomiciliaria DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudVisitaDomiciliaria)) where?: Where<SolicitudVisitaDomiciliaria>,
  ): Promise<Count> {
    return this.propietarioMascotaRepository.solicitudesVisitasDomiciliarias(id).delete(where);
  }
}
