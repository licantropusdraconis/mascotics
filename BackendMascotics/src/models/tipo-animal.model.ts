import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {MedicoVeterinario} from './medico-veterinario.model';

@model()
export class TipoAnimal extends Entity {
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
  TipoAnimal: string;

  @hasMany(() => Mascota)
  mascotas: Mascota[];

  @belongsTo(() => MedicoVeterinario)
  medicoVeterinarioId: string;

  constructor(data?: Partial<TipoAnimal>) {
    super(data);
  }
}

export interface TipoAnimalRelations {
  // describe navigational properties here
}

export type TipoAnimalWithRelations = TipoAnimal & TipoAnimalRelations;
