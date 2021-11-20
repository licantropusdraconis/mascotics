import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {RegistroVisitaDomiciliaria, RegistroVisitaDomiciliariaRelations, SolicitudVisitaDomiciliaria} from '../models';
import {SolicitudVisitaDomiciliariaRepository} from './solicitud-visita-domiciliaria.repository';

export class RegistroVisitaDomiciliariaRepository extends DefaultCrudRepository<
  RegistroVisitaDomiciliaria,
  typeof RegistroVisitaDomiciliaria.prototype.id,
  RegistroVisitaDomiciliariaRelations
> {

  public readonly solicitudVisitaDomiciliaria: BelongsToAccessor<SolicitudVisitaDomiciliaria, typeof RegistroVisitaDomiciliaria.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SolicitudVisitaDomiciliariaRepository') protected solicitudVisitaDomiciliariaRepositoryGetter: Getter<SolicitudVisitaDomiciliariaRepository>,
  ) {
    super(RegistroVisitaDomiciliaria, dataSource);
    this.solicitudVisitaDomiciliaria = this.createBelongsToAccessorFor('solicitudVisitaDomiciliaria', solicitudVisitaDomiciliariaRepositoryGetter,);
    this.registerInclusionResolver('solicitudVisitaDomiciliaria', this.solicitudVisitaDomiciliaria.inclusionResolver);
  }
}
