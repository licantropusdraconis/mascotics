import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import {MedicoVeterinario} from './medico-veterinario.model';
import {PropietarioMascota} from './propietario-mascota.model';
import {RegistroVisitaDomiciliaria} from './registro-visita-domiciliaria.model';
import {Mascota} from './mascota.model';

@model()
export class SolicitudVisitaDomiciliaria extends Entity {
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
  NombreMascota: string;

  @property({
    type: 'date',
    required: true,
  })
  FechaEstimadaDeAtencion: string;

  @belongsTo(() => PropietarioMascota)
  propietarioMascotaId: string;
  @belongsTo(() => MedicoVeterinario)
  medicoVeterinarioId: string;

  @hasOne(() => RegistroVisitaDomiciliaria)
  registroVisitaDomiciliaria: RegistroVisitaDomiciliaria;

  @belongsTo(() => Mascota)
  mascotaId: string;

  constructor(data?: Partial<SolicitudVisitaDomiciliaria>) {
    super(data);
  }
}

export interface SolicitudVisitaDomiciliariaRelations {
  // describe navigational properties here
}

export type SolicitudVisitaDomiciliariaWithRelations = SolicitudVisitaDomiciliaria & SolicitudVisitaDomiciliariaRelations;
