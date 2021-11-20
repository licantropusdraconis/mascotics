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
  MedicoVeterinario,
} from '../models';
import {SolicitudVisitaDomiciliariaRepository} from '../repositories';

export class SolicitudVisitaDomiciliariaMedicoVeterinarioController {
  constructor(
    @repository(SolicitudVisitaDomiciliariaRepository)
    public solicitudVisitaDomiciliariaRepository: SolicitudVisitaDomiciliariaRepository,
  ) { }

  @get('/solicitud-visita-domiciliarias/{id}/medico-veterinario', {
    responses: {
      '200': {
        description: 'MedicoVeterinario belonging to SolicitudVisitaDomiciliaria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MedicoVeterinario)},
          },
        },
      },
    },
  })
  async getMedicoVeterinario(
    @param.path.string('id') id: typeof SolicitudVisitaDomiciliaria.prototype.id,
  ): Promise<MedicoVeterinario> {
    return this.solicitudVisitaDomiciliariaRepository.medicoVeterinario(id);
  }
}
