import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Persona} from './persona.model';
import {SolicitudVisitaDomiciliaria} from './solicitud-visita-domiciliaria.model';
import {Mascota} from './mascota.model';

@model()
export class PropietarioMascota extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => Persona)
  personaId: string;

  @hasMany(() => SolicitudVisitaDomiciliaria)
  solicitudesVisitasDomiciliarias: SolicitudVisitaDomiciliaria[];

  @hasMany(() => Mascota)
  mascotas: Mascota[];

  constructor(data?: Partial<PropietarioMascota>) {
    super(data);
  }
}

export interface PropietarioMascotaRelations {
  // describe navigational properties here
}

export type PropietarioMascotaWithRelations = PropietarioMascota & PropietarioMascotaRelations;
