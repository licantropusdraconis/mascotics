import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TipoAnimal, TipoAnimalRelations, Mascota, MedicoVeterinario} from '../models';
import {MascotaRepository} from './mascota.repository';
import {MedicoVeterinarioRepository} from './medico-veterinario.repository';

export class TipoAnimalRepository extends DefaultCrudRepository<
  TipoAnimal,
  typeof TipoAnimal.prototype.id,
  TipoAnimalRelations
> {

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof TipoAnimal.prototype.id>;

  public readonly medicoVeterinario: BelongsToAccessor<MedicoVeterinario, typeof TipoAnimal.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('MedicoVeterinarioRepository') protected medicoVeterinarioRepositoryGetter: Getter<MedicoVeterinarioRepository>,
  ) {
    super(TipoAnimal, dataSource);
    this.medicoVeterinario = this.createBelongsToAccessorFor('medicoVeterinario', medicoVeterinarioRepositoryGetter,);
    this.registerInclusionResolver('medicoVeterinario', this.medicoVeterinario.inclusionResolver);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
  }
}
