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
  TipoAnimal,
  Mascota,
} from '../models';
import {TipoAnimalRepository} from '../repositories';

export class TipoAnimalMascotaController {
  constructor(
    @repository(TipoAnimalRepository) protected tipoAnimalRepository: TipoAnimalRepository,
  ) { }

  @get('/tipo-animals/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Array of TipoAnimal has many Mascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Mascota>,
  ): Promise<Mascota[]> {
    return this.tipoAnimalRepository.mascotas(id).find(filter);
  }

  @post('/tipo-animals/{id}/mascotas', {
    responses: {
      '200': {
        description: 'TipoAnimal model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mascota)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof TipoAnimal.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {
            title: 'NewMascotaInTipoAnimal',
            exclude: ['id'],
            optional: ['tipoAnimalId']
          }),
        },
      },
    }) mascota: Omit<Mascota, 'id'>,
  ): Promise<Mascota> {
    return this.tipoAnimalRepository.mascotas(id).create(mascota);
  }

  @patch('/tipo-animals/{id}/mascotas', {
    responses: {
      '200': {
        description: 'TipoAnimal.Mascota PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {partial: true}),
        },
      },
    })
    mascota: Partial<Mascota>,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.tipoAnimalRepository.mascotas(id).patch(mascota, where);
  }

  @del('/tipo-animals/{id}/mascotas', {
    responses: {
      '200': {
        description: 'TipoAnimal.Mascota DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.tipoAnimalRepository.mascotas(id).delete(where);
  }
}
