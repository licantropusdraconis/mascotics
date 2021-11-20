import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  TipoAnimal,
  MedicoVeterinario,
} from '../models';
import {TipoAnimalRepository} from '../repositories';

export class TipoAnimalMedicoVeterinarioController {
  constructor(
    @repository(TipoAnimalRepository)
    public tipoAnimalRepository: TipoAnimalRepository,
  ) { }

  @get('/tipo-animals/{id}/medico-veterinario', {
    responses: {
      '200': {
        description: 'MedicoVeterinario belonging to TipoAnimal',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MedicoVeterinario)},
          },
        },
      },
    },
  })
  async getMedicoVeterinario(
    @param.path.string('id') id: typeof TipoAnimal.prototype.id,
  ): Promise<MedicoVeterinario> {
    return this.tipoAnimalRepository.medicoVeterinario(id);
  }
}
