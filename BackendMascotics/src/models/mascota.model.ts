import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {PropietarioMascota} from './propietario-mascota.model';
import {SolicitudVisitaDomiciliaria} from './solicitud-visita-domiciliaria.model';
import {TipoAnimal} from './tipo-animal.model';

@model()
export class Mascota extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  ColorOjos: string;

  @property({
    type: 'string',
    required: true,
  })
  ColorPiel: string;

  @property({
    type: 'number',
    required: true,
  })
  Estatura: number;

  @property({
    type: 'string',
    required: true,
  })
  Raza: string;

  @belongsTo(() => TipoAnimal)
  tipoAnimalId: string;

  @belongsTo(() => PropietarioMascota)
  propietarioMascotaId: string;

  @hasMany(() => SolicitudVisitaDomiciliaria)
  solicitudVisitaDomiciliarias: SolicitudVisitaDomiciliaria[];

  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
