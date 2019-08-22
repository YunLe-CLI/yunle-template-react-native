import { AnyAction } from 'redux';

export interface EffectsCommandMap {
    put: <A extends AnyAction>(action: A) => any,
    call: Function,
    select: Function,
    take: Function,
    cancel: Function,
    [key: string]: any,
}

export type Reducer<S> = (state: S, action: AnyAction) => S;

export type Effect = (action: AnyAction, effects: EffectsCommandMap) => void;
