import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  EmpresaVeterinaria,
  MedicoVeterinario,
} from '../models';
import {EmpresaVeterinariaRepository} from '../repositories';

export class EmpresaVeterinariaMedicoVeterinarioController {
  constructor(
    @repository(EmpresaVeterinariaRepository) protected empresaVeterinariaRepository: EmpresaVeterinariaRepository,
  ) { }

  @get('/empresa-veterinarias/{id}/medico-veterinarios', {
    responses: {
      '200': {
        description: 'Array of EmpresaVeterinaria has many MedicoVeterinario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MedicoVeterinario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<MedicoVeterinario>,
  ): Promise<MedicoVeterinario[]> {
    return this.empresaVeterinariaRepository.medicosVeterinarios(id).find(filter);
  }

  @post('/empresa-veterinarias/{id}/medico-veterinarios', {
    responses: {
      '200': {
        description: 'EmpresaVeterinaria model instance',
        content: {'application/json': {schema: getModelSchemaRef(MedicoVeterinario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof EmpresaVeterinaria.prototype.NIT,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedicoVeterinario, {
            title: 'NewMedicoVeterinarioInEmpresaVeterinaria',
            exclude: ['id'],
            optional: ['empresaVeterinariaId']
          }),
        },
      },
    }) medicoVeterinario: Omit<MedicoVeterinario, 'id'>,
  ): Promise<MedicoVeterinario> {
    return this.empresaVeterinariaRepository.medicosVeterinarios(id).create(medicoVeterinario);
  }

  @patch('/empresa-veterinarias/{id}/medico-veterinarios', {
    responses: {
      '200': {
        description: 'EmpresaVeterinaria.MedicoVeterinario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedicoVeterinario, {partial: true}),
        },
      },
    })
    medicoVeterinario: Partial<MedicoVeterinario>,
    @param.query.object('where', getWhereSchemaFor(MedicoVeterinario)) where?: Where<MedicoVeterinario>,
  ): Promise<Count> {
    return this.empresaVeterinariaRepository.medicosVeterinarios(id).patch(medicoVeterinario, where);
  }

  @del('/empresa-veterinarias/{id}/medico-veterinarios', {
    responses: {
      '200': {
        description: 'EmpresaVeterinaria.MedicoVeterinario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MedicoVeterinario)) where?: Where<MedicoVeterinario>,
  ): Promise<Count> {
    return this.empresaVeterinariaRepository.medicosVeterinarios(id).delete(where);
  }
}
