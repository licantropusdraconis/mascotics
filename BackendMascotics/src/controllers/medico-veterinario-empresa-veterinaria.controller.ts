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
  EmpresaVeterinaria,
} from '../models';
import {MedicoVeterinarioRepository} from '../repositories';

export class MedicoVeterinarioEmpresaVeterinariaController {
  constructor(
    @repository(MedicoVeterinarioRepository)
    public medicoVeterinarioRepository: MedicoVeterinarioRepository,
  ) { }

  @get('/medico-veterinarios/{id}/empresa-veterinaria', {
    responses: {
      '200': {
        description: 'EmpresaVeterinaria belonging to MedicoVeterinario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EmpresaVeterinaria)},
          },
        },
      },
    },
  })
  async getEmpresaVeterinaria(
    @param.path.string('id') id: typeof MedicoVeterinario.prototype.id,
  ): Promise<EmpresaVeterinaria> {
    return this.medicoVeterinarioRepository.empresaVeterinaria(id);
  }
}
