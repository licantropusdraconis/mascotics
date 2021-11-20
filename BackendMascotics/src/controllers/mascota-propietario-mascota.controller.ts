import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Mascota,
  PropietarioMascota,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaPropietarioMascotaController {
  constructor(
    @repository(MascotaRepository)
    public mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/propietario-mascota', {
    responses: {
      '200': {
        description: 'PropietarioMascota belonging to Mascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PropietarioMascota)},
          },
        },
      },
    },
  })
  async getPropietarioMascota(
    @param.path.string('id') id: typeof Mascota.prototype.id,
  ): Promise<PropietarioMascota> {
    return this.mascotaRepository.propietarioMascota(id);
  }
}
