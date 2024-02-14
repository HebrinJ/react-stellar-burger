export const SET_ROOT: 'SET_ROOT' = 'SET_ROOT';
export const REMOVE_ROOT: 'REMOVE_ROOT' = 'REMOVE_ROOT';

export interface ISetRoute {
    readonly type: typeof SET_ROOT,
}

export interface IRemoveRoute {
    readonly type: typeof REMOVE_ROOT,
}

export type TRouteActions = ISetRoute | IRemoveRoute;