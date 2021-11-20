import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Persona} from './persona.model';
import {EmpresaVeterinaria} from './empresa-veterinaria.model';
import {SolicitudVisitaDomiciliaria} from './solicitud-visita-domiciliaria.model';

@model()
export class MedicoVeterinario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => Persona)
  personaId: string;

  @belongsTo(() => EmpresaVeterinaria)
  empresaVeterinariaId: number;

  @hasMany(() => SolicitudVisitaDomiciliaria)
  solicitudesVisitasDomiciliarias: SolicitudVisitaDomiciliaria[];

  constructor(data?: Partial<MedicoVeterinario>) {
    super(data);
  }
}

export interface MedicoVeterinarioRelations {
  // describe navigational properties here
}

export type MedicoVeterinarioWithRelations = MedicoVeterinario & MedicoVeterinarioRelations;
