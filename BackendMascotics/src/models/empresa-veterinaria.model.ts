import {Entity, model, property, hasMany} from '@loopback/repository';
import {MedicoVeterinario} from './medico-veterinario.model';

@model()
export class EmpresaVeterinaria extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  NIT: number;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Direccion: string;

  @hasMany(() => MedicoVeterinario)
  medicosVeterinarios: MedicoVeterinario[];

  constructor(data?: Partial<EmpresaVeterinaria>) {
    super(data);
  }
}

export interface EmpresaVeterinariaRelations {
  // describe navigational properties here
}

export type EmpresaVeterinariaWithRelations = EmpresaVeterinaria & EmpresaVeterinariaRelations;
