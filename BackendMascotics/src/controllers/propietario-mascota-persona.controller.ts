import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PropietarioMascota,
  Persona,
} from '../models';
import {PropietarioMascotaRepository} from '../repositories';

export class PropietarioMascotaPersonaController {
  constructor(
    @repository(PropietarioMascotaRepository)
    public propietarioMascotaRepository: PropietarioMascotaRepository,
  ) { }

  @get('/propietario-mascotas/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to PropietarioMascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof PropietarioMascota.prototype.id,
  ): Promise<Persona> {
    return this.propietarioMascotaRepository.persona(id);
  }
}
