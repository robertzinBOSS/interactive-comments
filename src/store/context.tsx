import * as React from 'react';
import { appReducer, mainState } from './reducer';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createContext<StateType, ActionType>(
    reducer: React.Reducer<StateType, ActionType>,
    initialState: StateType,
) {
    const defaultDispatch: React.Dispatch<ActionType> = () => initialState;
    const ctx = React.createContext({
        state: initialState,
        dispatch: defaultDispatch,
    });

    function Provider(props: React.PropsWithChildren<{}>): JSX.Element {
        const [state, dispatch] = React.useReducer(reducer, initialState);
        const value = React.useMemo(() => ({ state, dispatch }), [state]);
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <ctx.Provider value={value} {...props} />;
    }

    return [ctx, Provider] as const;
}

export const [AppContext, Provider] = createContext(appReducer, mainState);
