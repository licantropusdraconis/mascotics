import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {MedicoVeterinario, MedicoVeterinarioRelations, Persona, EmpresaVeterinaria, SolicitudVisitaDomiciliaria} from '../models';
import {PersonaRepository} from './persona.repository';
import {EmpresaVeterinariaRepository} from './empresa-veterinaria.repository';
import {SolicitudVisitaDomiciliariaRepository} from './solicitud-visita-domiciliaria.repository';

export class MedicoVeterinarioRepository extends DefaultCrudRepository<
  MedicoVeterinario,
  typeof MedicoVeterinario.prototype.id,
  MedicoVeterinarioRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof MedicoVeterinario.prototype.id>;

  public readonly empresaVeterinaria: BelongsToAccessor<EmpresaVeterinaria, typeof MedicoVeterinario.prototype.id>;

  public readonly solicitudesVisitasDomiciliarias: HasManyRepositoryFactory<SolicitudVisitaDomiciliaria, typeof MedicoVeterinario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('EmpresaVeterinariaRepository') protected empresaVeterinariaRepositoryGetter: Getter<EmpresaVeterinariaRepository>, @repository.getter('SolicitudVisitaDomiciliariaRepository') protected solicitudVisitaDomiciliariaRepositoryGetter: Getter<SolicitudVisitaDomiciliariaRepository>,
  ) {
    super(MedicoVeterinario, dataSource);
    this.solicitudesVisitasDomiciliarias = this.createHasManyRepositoryFactoryFor('solicitudesVisitasDomiciliarias', solicitudVisitaDomiciliariaRepositoryGetter,);
    this.registerInclusionResolver('solicitudesVisitasDomiciliarias', this.solicitudesVisitasDomiciliarias.inclusionResolver);
    this.empresaVeterinaria = this.createBelongsToAccessorFor('empresaVeterinaria', empresaVeterinariaRepositoryGetter,);
    this.registerInclusionResolver('empresaVeterinaria', this.empresaVeterinaria.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
