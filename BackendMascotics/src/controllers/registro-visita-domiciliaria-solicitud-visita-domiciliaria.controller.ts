import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  RegistroVisitaDomiciliaria,
  SolicitudVisitaDomiciliaria,
} from '../models';
import {RegistroVisitaDomiciliariaRepository} from '../repositories';

export class RegistroVisitaDomiciliariaSolicitudVisitaDomiciliariaController {
  constructor(
    @repository(RegistroVisitaDomiciliariaRepository)
    public registroVisitaDomiciliariaRepository: RegistroVisitaDomiciliariaRepository,
  ) { }

  @get('/registro-visita-domiciliarias/{id}/solicitud-visita-domiciliaria', {
    responses: {
      '200': {
        description: 'SolicitudVisitaDomiciliaria belonging to RegistroVisitaDomiciliaria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudVisitaDomiciliaria)},
          },
        },
      },
    },
  })
  async getSolicitudVisitaDomiciliaria(
    @param.path.string('id') id: typeof RegistroVisitaDomiciliaria.prototype.id,
  ): Promise<SolicitudVisitaDomiciliaria> {
    return this.registroVisitaDomiciliariaRepository.solicitudVisitaDomiciliaria(id);
  }
}
