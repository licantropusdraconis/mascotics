import { authenticate } from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {EmpresaVeterinaria} from '../models';
import {EmpresaVeterinariaRepository} from '../repositories';

@authenticate("admin")//se protege el acceso
export class EmpresaVeterinariaController {
  constructor(
    @repository(EmpresaVeterinariaRepository)
    public empresaVeterinariaRepository : EmpresaVeterinariaRepository,
  ) {}

  @post('/empresa-veterinaria')
  @response(200, {
    description: 'EmpresaVeterinaria model instance',
    content: {'application/json': {schema: getModelSchemaRef(EmpresaVeterinaria)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpresaVeterinaria, {
            title: 'NewEmpresaVeterinaria',
            
          }),
        },
      },
    })
    empresaVeterinaria: EmpresaVeterinaria,
  ): Promise<EmpresaVeterinaria> {
    return this.empresaVeterinariaRepository.create(empresaVeterinaria);
  }

  @authenticate.skip()//saltar la protección en esta ruta
  @get('/empresa-veterinaria/count')
  @response(200, {
    description: 'EmpresaVeterinaria model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EmpresaVeterinaria) where?: Where<EmpresaVeterinaria>,
  ): Promise<Count> {
    return this.empresaVeterinariaRepository.count(where);
  }

  @authenticate.skip()//saltar la protección en esta ruta
  @get('/empresa-veterinaria')
  @response(200, {
    description: 'Array of EmpresaVeterinaria model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EmpresaVeterinaria, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EmpresaVeterinaria) filter?: Filter<EmpresaVeterinaria>,
  ): Promise<EmpresaVeterinaria[]> {
    return this.empresaVeterinariaRepository.find(filter);
  }

  @patch('/empresa-veterinaria')
  @response(200, {
    description: 'EmpresaVeterinaria PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpresaVeterinaria, {partial: true}),
        },
      },
    })
    empresaVeterinaria: EmpresaVeterinaria,
    @param.where(EmpresaVeterinaria) where?: Where<EmpresaVeterinaria>,
  ): Promise<Count> {
    return this.empresaVeterinariaRepository.updateAll(empresaVeterinaria, where);
  }

  @get('/empresa-veterinaria/{id}')
  @response(200, {
    description: 'EmpresaVeterinaria model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EmpresaVeterinaria, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EmpresaVeterinaria, {exclude: 'where'}) filter?: FilterExcludingWhere<EmpresaVeterinaria>
  ): Promise<EmpresaVeterinaria> {
    return this.empresaVeterinariaRepository.findById(id, filter);
  }

  @patch('/empresa-veterinaria/{id}')
  @response(204, {
    description: 'EmpresaVeterinaria PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpresaVeterinaria, {partial: true}),
        },
      },
    })
    empresaVeterinaria: EmpresaVeterinaria,
  ): Promise<void> {
    await this.empresaVeterinariaRepository.updateById(id, empresaVeterinaria);
  }

  @put('/empresa-veterinaria/{id}')
  @response(204, {
    description: 'EmpresaVeterinaria PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() empresaVeterinaria: EmpresaVeterinaria,
  ): Promise<void> {
    await this.empresaVeterinariaRepository.replaceById(id, empresaVeterinaria);
  }

  @del('/empresa-veterinaria/{id}')
  @response(204, {
    description: 'EmpresaVeterinaria DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.empresaVeterinariaRepository.deleteById(id);
  }
}
