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
  SolicitudVisitaDomiciliaria,
  RegistroVisitaDomiciliaria,
} from '../models';
import {SolicitudVisitaDomiciliariaRepository} from '../repositories';

export class SolicitudVisitaDomiciliariaRegistroVisitaDomiciliariaController {
  constructor(
    @repository(SolicitudVisitaDomiciliariaRepository) protected solicitudVisitaDomiciliariaRepository: SolicitudVisitaDomiciliariaRepository,
  ) { }

  @get('/solicitud-visita-domiciliarias/{id}/registro-visita-domiciliaria', {
    responses: {
      '200': {
        description: 'SolicitudVisitaDomiciliaria has one RegistroVisitaDomiciliaria',
        content: {
          'application/json': {
            schema: getModelSchemaRef(RegistroVisitaDomiciliaria),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<RegistroVisitaDomiciliaria>,
  ): Promise<RegistroVisitaDomiciliaria> {
    return this.solicitudVisitaDomiciliariaRepository.registroVisitaDomiciliaria(id).get(filter);
  }

  @post('/solicitud-visita-domiciliarias/{id}/registro-visita-domiciliaria', {
    responses: {
      '200': {
        description: 'SolicitudVisitaDomiciliaria model instance',
        content: {'application/json': {schema: getModelSchemaRef(RegistroVisitaDomiciliaria)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof SolicitudVisitaDomiciliaria.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroVisitaDomiciliaria, {
            title: 'NewRegistroVisitaDomiciliariaInSolicitudVisitaDomiciliaria',
            exclude: ['id'],
            optional: ['solicitudVisitaDomiciliariaId']
          }),
        },
      },
    }) registroVisitaDomiciliaria: Omit<RegistroVisitaDomiciliaria, 'id'>,
  ): Promise<RegistroVisitaDomiciliaria> {
    return this.solicitudVisitaDomiciliariaRepository.registroVisitaDomiciliaria(id).create(registroVisitaDomiciliaria);
  }

  @patch('/solicitud-visita-domiciliarias/{id}/registro-visita-domiciliaria', {
    responses: {
      '200': {
        description: 'SolicitudVisitaDomiciliaria.RegistroVisitaDomiciliaria PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroVisitaDomiciliaria, {partial: true}),
        },
      },
    })
    registroVisitaDomiciliaria: Partial<RegistroVisitaDomiciliaria>,
    @param.query.object('where', getWhereSchemaFor(RegistroVisitaDomiciliaria)) where?: Where<RegistroVisitaDomiciliaria>,
  ): Promise<Count> {
    return this.solicitudVisitaDomiciliariaRepository.registroVisitaDomiciliaria(id).patch(registroVisitaDomiciliaria, where);
  }

  @del('/solicitud-visita-domiciliarias/{id}/registro-visita-domiciliaria', {
    responses: {
      '200': {
        description: 'SolicitudVisitaDomiciliaria.RegistroVisitaDomiciliaria DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(RegistroVisitaDomiciliaria)) where?: Where<RegistroVisitaDomiciliaria>,
  ): Promise<Count> {
    return this.solicitudVisitaDomiciliariaRepository.registroVisitaDomiciliaria(id).delete(where);
  }
}
