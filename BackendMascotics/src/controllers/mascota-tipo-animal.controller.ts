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
  TipoAnimal,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaTipoAnimalController {
  constructor(
    @repository(MascotaRepository)
    public mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/tipo-animal', {
    responses: {
      '200': {
        description: 'TipoAnimal belonging to Mascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoAnimal)},
          },
        },
      },
    },
  })
  async getTipoAnimal(
    @param.path.string('id') id: typeof Mascota.prototype.id,
  ): Promise<TipoAnimal> {
    return this.mascotaRepository.tipoAnimal(id);
  }
}
