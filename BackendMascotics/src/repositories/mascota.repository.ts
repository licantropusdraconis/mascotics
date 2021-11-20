import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascota, MascotaRelations, TipoAnimal, PropietarioMascota, SolicitudVisitaDomiciliaria} from '../models';
import {TipoAnimalRepository} from './tipo-animal.repository';
import {PropietarioMascotaRepository} from './propietario-mascota.repository';
import {SolicitudVisitaDomiciliariaRepository} from './solicitud-visita-domiciliaria.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {

  public readonly tipoAnimal: BelongsToAccessor<TipoAnimal, typeof Mascota.prototype.id>;

  public readonly propietarioMascota: BelongsToAccessor<PropietarioMascota, typeof Mascota.prototype.id>;

  public readonly solicitudVisitaDomiciliarias: HasManyRepositoryFactory<SolicitudVisitaDomiciliaria, typeof Mascota.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('TipoAnimalRepository') protected tipoAnimalRepositoryGetter: Getter<TipoAnimalRepository>, @repository.getter('PropietarioMascotaRepository') protected propietarioMascotaRepositoryGetter: Getter<PropietarioMascotaRepository>, @repository.getter('SolicitudVisitaDomiciliariaRepository') protected solicitudVisitaDomiciliariaRepositoryGetter: Getter<SolicitudVisitaDomiciliariaRepository>,
  ) {
    super(Mascota, dataSource);
    this.solicitudVisitaDomiciliarias = this.createHasManyRepositoryFactoryFor('solicitudVisitaDomiciliarias', solicitudVisitaDomiciliariaRepositoryGetter,);
    this.registerInclusionResolver('solicitudVisitaDomiciliarias', this.solicitudVisitaDomiciliarias.inclusionResolver);
    this.propietarioMascota = this.createBelongsToAccessorFor('propietarioMascota', propietarioMascotaRepositoryGetter,);
    this.registerInclusionResolver('propietarioMascota', this.propietarioMascota.inclusionResolver);
    this.tipoAnimal = this.createBelongsToAccessorFor('tipoAnimal', tipoAnimalRepositoryGetter,);
    this.registerInclusionResolver('tipoAnimal', this.tipoAnimal.inclusionResolver);
  }
}
