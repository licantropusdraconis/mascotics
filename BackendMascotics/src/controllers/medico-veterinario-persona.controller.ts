import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  MedicoVeterinario,
  Persona,
} from '../models';
import {MedicoVeterinarioRepository} from '../repositories';

export class MedicoVeterinarioPersonaController {
  constructor(
    @repository(MedicoVeterinarioRepository)
    public medicoVeterinarioRepository: MedicoVeterinarioRepository,
  ) { }

  @get('/medico-veterinarios/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to MedicoVeterinario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof MedicoVeterinario.prototype.id,
  ): Promise<Persona> {
    return this.medicoVeterinarioRepository.persona(id);
  }
}
