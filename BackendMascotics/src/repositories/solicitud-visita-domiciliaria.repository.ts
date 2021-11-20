import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {MedicoVeterinario, PropietarioMascota, RegistroVisitaDomiciliaria, SolicitudVisitaDomiciliaria, SolicitudVisitaDomiciliariaRelations, Mascota} from '../models';
import {MedicoVeterinarioRepository} from './medico-veterinario.repository';
import {PropietarioMascotaRepository} from './propietario-mascota.repository';
import {RegistroVisitaDomiciliariaRepository} from './registro-visita-domiciliaria.repository';
import {MascotaRepository} from './mascota.repository';

export class SolicitudVisitaDomiciliariaRepository extends DefaultCrudRepository<
  SolicitudVisitaDomiciliaria,
  typeof SolicitudVisitaDomiciliaria.prototype.id,
  SolicitudVisitaDomiciliariaRelations
> {

  public readonly propietarioMascota: BelongsToAccessor<PropietarioMascota, typeof SolicitudVisitaDomiciliaria.prototype.id>;

  public readonly medicoVeterinario: BelongsToAccessor<MedicoVeterinario, typeof SolicitudVisitaDomiciliaria.prototype.id>;

  public readonly registroVisitaDomiciliaria: HasOneRepositoryFactory<RegistroVisitaDomiciliaria, typeof SolicitudVisitaDomiciliaria.prototype.id>;

  public readonly mascota: BelongsToAccessor<Mascota, typeof SolicitudVisitaDomiciliaria.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PropietarioMascotaRepository') protected propietarioMascotaRepositoryGetter: Getter<PropietarioMascotaRepository>, @repository.getter('RegistroVisitaDomiciliariaRepository') protected registroVisitaDomiciliariaRepositoryGetter: Getter<RegistroVisitaDomiciliariaRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('MedicoVeterinarioRepository') protected medicoVeterinarioRepositoryGetter: Getter<MedicoVeterinarioRepository>,
  ) {
    super(SolicitudVisitaDomiciliaria, dataSource);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
    this.medicoVeterinario = this.createBelongsToAccessorFor('medicoVeterinario', medicoVeterinarioRepositoryGetter,);
    this.registerInclusionResolver('medicoVeterinario', this.medicoVeterinario.inclusionResolver);
    this.registroVisitaDomiciliaria = this.createHasOneRepositoryFactoryFor('registroVisitaDomiciliaria', registroVisitaDomiciliariaRepositoryGetter);
    this.registerInclusionResolver('registroVisitaDomiciliaria', this.registroVisitaDomiciliaria.inclusionResolver);
    this.propietarioMascota = this.createBelongsToAccessorFor('propietarioMascota', propietarioMascotaRepositoryGetter,);
    this.registerInclusionResolver('propietarioMascota', this.propietarioMascota.inclusionResolver);
  }
}
