import data from '../db/data.json';
import { IComment, IUser } from '../db';
import { loadFromLocalStorage } from '../utils';

export const mainState = {
    data: loadFromLocalStorage('comments'),
    user: data.currentUser as IUser,
};

type AppState = typeof mainState;
type Action =
    | { type: 'UPDATE_DATA'; payload: IComment[] }

export function appReducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case 'UPDATE_DATA': {
            return {
                ...state,
                data: action.payload,
            };
        }
        default:
            throw new Error('Invalid type!');
    }
}
