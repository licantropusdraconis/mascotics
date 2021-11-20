import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SolicitudVisitaDomiciliaria,
  Mascota,
} from '../models';
import {SolicitudVisitaDomiciliariaRepository} from '../repositories';

export class SolicitudVisitaDomiciliariaMascotaController {
  constructor(
    @repository(SolicitudVisitaDomiciliariaRepository)
    public solicitudVisitaDomiciliariaRepository: SolicitudVisitaDomiciliariaRepository,
  ) { }

  @get('/solicitud-visita-domiciliarias/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota belonging to SolicitudVisitaDomiciliaria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof SolicitudVisitaDomiciliaria.prototype.id,
  ): Promise<Mascota> {
    return this.solicitudVisitaDomiciliariaRepository.mascota(id);
  }
}
