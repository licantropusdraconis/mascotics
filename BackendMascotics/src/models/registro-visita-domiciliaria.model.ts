import {Entity, model, property, belongsTo} from '@loopback/repository';
import {SolicitudVisitaDomiciliaria} from './solicitud-visita-domiciliaria.model';

@model()
export class RegistroVisitaDomiciliaria extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  FechaAtencion: string;

  @property({
    type: 'number',
    required: true,
  })
  Temperatura: number;

  @property({
    type: 'number',
    required: true,
  })
  Peso: number;

  @property({
    type: 'number',
    required: true,
  })
  FrecuenciaRespiratoria: number;

  @property({
    type: 'number',
    required: true,
  })
  FrecuenciaCardiaca: number;

  @property({
    type: 'string',
    required: true,
  })
  EstadoAnimo: string;

  @property({
    type: 'string',
    required: true,
  })
  Recomendaciones: string;

  @property({
    type: 'string',
  })
  Medicamentos?: string;

  @belongsTo(() => SolicitudVisitaDomiciliaria)
  solicitudVisitaDomiciliariaId: string;

  constructor(data?: Partial<RegistroVisitaDomiciliaria>) {
    super(data);
  }
}

export interface RegistroVisitaDomiciliariaRelations {
  // describe navigational properties here
}

export type RegistroVisitaDomiciliariaWithRelations = RegistroVisitaDomiciliaria & RegistroVisitaDomiciliariaRelations;
