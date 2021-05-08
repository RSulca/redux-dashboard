import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingresoEgreso';

export const setMonto = createAction('[Monto Component] Set Monto', props<{ montos: IngresoEgreso[] }>());
export const unSetMonto = createAction('[Monto Component] Unset Monto');