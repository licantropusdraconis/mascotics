import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Persona, PersonaRelations, MedicoVeterinario, PropietarioMascota} from '../models';
import {MedicoVeterinarioRepository} from './medico-veterinario.repository';
import {PropietarioMascotaRepository} from './propietario-mascota.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly medicosVeterinarios: HasManyRepositoryFactory<MedicoVeterinario, typeof Persona.prototype.id>;

  public readonly propietarioMascotas: HasManyRepositoryFactory<PropietarioMascota, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MedicoVeterinarioRepository') protected medicoVeterinarioRepositoryGetter: Getter<MedicoVeterinarioRepository>, @repository.getter('PropietarioMascotaRepository') protected propietarioMascotaRepositoryGetter: Getter<PropietarioMascotaRepository>,
  ) {
    super(Persona, dataSource);
    this.propietarioMascotas = this.createHasManyRepositoryFactoryFor('propietarioMascotas', propietarioMascotaRepositoryGetter,);
    this.registerInclusionResolver('propietarioMascotas', this.propietarioMascotas.inclusionResolver);
    this.medicosVeterinarios = this.createHasManyRepositoryFactoryFor('medicosVeterinarios', medicoVeterinarioRepositoryGetter,);
    this.registerInclusionResolver('medicosVeterinarios', this.medicosVeterinarios.inclusionResolver);
  }
}
