import * as React from 'react';
import { saveToLocalStorage, updateScore } from '../utils';
import { AppContext } from '../store';
import { IComment } from '../db';

type ScoreProps = {
    comment: IComment;
};

export function Score({ comment }: ScoreProps): JSX.Element {
    const {
        state: { data },
        dispatch,
    } = React.useContext(AppContext);

    function handleClick(type: 'up' | 'down'): void {
        const newData = updateScore(comment.id, data, type);
        dispatch({ type: 'UPDATE_DATA', payload: newData });
        saveToLocalStorage(newData);
    }

    return (
        <div className="flex md:flex-col items-center gap-5 bg-very-light-gray px-3 py-1.5 rounded-lg">
            <button
                type="button"
                className="transition-all duration-300 hover:brightness-50"
                onClick={() => handleClick('up')}
            >
                <img
                    src="/assets/svgs/icon-plus.svg"
                    alt="Plus icon"
                    className="md:w-4"
                />
            </button>
            <p className="font-bold text-moderate-blue">{comment.score}</p>
            <button
                type="button"
                className="transition-all duration-300 hover:brightness-50"
                onClick={() => handleClick('down')}
            >
                <img
                    src="/assets/svgs/icon-minus.svg"
                    alt="Minus icon"
                    className="md:w-4"
                />
            </button>
        </div>
    );
}
