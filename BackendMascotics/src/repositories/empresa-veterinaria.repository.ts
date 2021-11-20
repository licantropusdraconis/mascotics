import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {EmpresaVeterinaria, EmpresaVeterinariaRelations, MedicoVeterinario} from '../models';
import {MedicoVeterinarioRepository} from './medico-veterinario.repository';

export class EmpresaVeterinariaRepository extends DefaultCrudRepository<
  EmpresaVeterinaria,
  typeof EmpresaVeterinaria.prototype.NIT,
  EmpresaVeterinariaRelations
> {

  public readonly medicosVeterinarios: HasManyRepositoryFactory<MedicoVeterinario, typeof EmpresaVeterinaria.prototype.NIT>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MedicoVeterinarioRepository') protected medicoVeterinarioRepositoryGetter: Getter<MedicoVeterinarioRepository>,
  ) {
    super(EmpresaVeterinaria, dataSource);
    this.medicosVeterinarios = this.createHasManyRepositoryFactoryFor('medicosVeterinarios', medicoVeterinarioRepositoryGetter,);
    this.registerInclusionResolver('medicosVeterinarios', this.medicosVeterinarios.inclusionResolver);
  }
}
