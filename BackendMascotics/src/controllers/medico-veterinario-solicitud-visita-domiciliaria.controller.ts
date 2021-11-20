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
  MedicoVeterinario,
  SolicitudVisitaDomiciliaria,
} from '../models';
import {MedicoVeterinarioRepository} from '../repositories';

export class MedicoVeterinarioSolicitudVisitaDomiciliariaController {
  constructor(
    @repository(MedicoVeterinarioRepository) protected medicoVeterinarioRepository: MedicoVeterinarioRepository,
  ) { }

  @get('/medico-veterinarios/{id}/solicitud-visita-domiciliarias', {
    responses: {
      '200': {
        description: 'Array of MedicoVeterinario has many SolicitudVisitaDomiciliaria',
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
    return this.medicoVeterinarioRepository.solicitudesVisitasDomiciliarias(id).find(filter);
  }

  @post('/medico-veterinarios/{id}/solicitud-visita-domiciliarias', {
    responses: {
      '200': {
        description: 'MedicoVeterinario model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudVisitaDomiciliaria)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof MedicoVeterinario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudVisitaDomiciliaria, {
            title: 'NewSolicitudVisitaDomiciliariaInMedicoVeterinario',
            exclude: ['id'],
            optional: ['medicoVeterinarioId']
          }),
        },
      },
    }) solicitudVisitaDomiciliaria: Omit<SolicitudVisitaDomiciliaria, 'id'>,
  ): Promise<SolicitudVisitaDomiciliaria> {
    return this.medicoVeterinarioRepository.solicitudesVisitasDomiciliarias(id).create(solicitudVisitaDomiciliaria);
  }

  @patch('/medico-veterinarios/{id}/solicitud-visita-domiciliarias', {
    responses: {
      '200': {
        description: 'MedicoVeterinario.SolicitudVisitaDomiciliaria PATCH success count',
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
    return this.medicoVeterinarioRepository.solicitudesVisitasDomiciliarias(id).patch(solicitudVisitaDomiciliaria, where);
  }

  @del('/medico-veterinarios/{id}/solicitud-visita-domiciliarias', {
    responses: {
      '200': {
        description: 'MedicoVeterinario.SolicitudVisitaDomiciliaria DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudVisitaDomiciliaria)) where?: Where<SolicitudVisitaDomiciliaria>,
  ): Promise<Count> {
    return this.medicoVeterinarioRepository.solicitudesVisitasDomiciliarias(id).delete(where);
  }
}
