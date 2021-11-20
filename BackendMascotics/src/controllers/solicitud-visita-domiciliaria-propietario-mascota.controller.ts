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
  PropietarioMascota,
} from '../models';
import {SolicitudVisitaDomiciliariaRepository} from '../repositories';

export class SolicitudVisitaDomiciliariaPropietarioMascotaController {
  constructor(
    @repository(SolicitudVisitaDomiciliariaRepository)
    public solicitudVisitaDomiciliariaRepository: SolicitudVisitaDomiciliariaRepository,
  ) { }

  @get('/solicitud-visita-domiciliarias/{id}/propietario-mascota', {
    responses: {
      '200': {
        description: 'PropietarioMascota belonging to SolicitudVisitaDomiciliaria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PropietarioMascota)},
          },
        },
      },
    },
  })
  async getPropietarioMascota(
    @param.path.string('id') id: typeof SolicitudVisitaDomiciliaria.prototype.id,
  ): Promise<PropietarioMascota> {
    return this.solicitudVisitaDomiciliariaRepository.propietarioMascota(id);
  }
}
