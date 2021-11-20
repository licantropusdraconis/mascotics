import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PropietarioMascota, PropietarioMascotaRelations, Persona, SolicitudVisitaDomiciliaria, Mascota} from '../models';
import {PersonaRepository} from './persona.repository';
import {SolicitudVisitaDomiciliariaRepository} from './solicitud-visita-domiciliaria.repository';
import {MascotaRepository} from './mascota.repository';

export class PropietarioMascotaRepository extends DefaultCrudRepository<
  PropietarioMascota,
  typeof PropietarioMascota.prototype.id,
  PropietarioMascotaRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof PropietarioMascota.prototype.id>;

  public readonly solicitudesVisitasDomiciliarias: HasManyRepositoryFactory<SolicitudVisitaDomiciliaria, typeof PropietarioMascota.prototype.id>;

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof PropietarioMascota.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('SolicitudVisitaDomiciliariaRepository') protected solicitudVisitaDomiciliariaRepositoryGetter: Getter<SolicitudVisitaDomiciliariaRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(PropietarioMascota, dataSource);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.solicitudesVisitasDomiciliarias = this.createHasManyRepositoryFactoryFor('solicitudesVisitasDomiciliarias', solicitudVisitaDomiciliariaRepositoryGetter,);
    this.registerInclusionResolver('solicitudesVisitasDomiciliarias', this.solicitudesVisitasDomiciliarias.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
