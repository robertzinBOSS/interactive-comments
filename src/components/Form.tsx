import * as React from 'react';
import { IComment } from '../db';
import {
    createComment,
    saveToLocalStorage,
    updateContent,
    updateReplies,
} from '../utils';
import { AppContext } from '../store';

type FormProps = {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    comment?: IComment;
    isReplying?: boolean;
    setIsReplying?: React.Dispatch<React.SetStateAction<boolean>>;
    isEditing?: boolean;
    setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Form({
    setIsEditing,
    setIsReplying,
    isReplying,
    isEditing,
    comment,
    text,
    setText,
}: FormProps): JSX.Element {
    const {
        state: { user, data },
        dispatch,
    } = React.useContext(AppContext);

    function handleSubmit(e: React.FormEvent): void {
        e.preventDefault();
        if (!text) return;

        const str = text.split(/@[a-z]+,?\s*/g)[1];
        let newComments;

        if (isReplying) {
            const replies = [
                ...(comment!.replies || []),
                {
                    ...createComment(user, str ?? text, comment!.user.username),
                },
            ];
            newComments = updateReplies(comment!.id, data, replies);
            setIsReplying!(false);
        } else if (isEditing) {
            newComments = updateContent(comment!.id, data, str ?? text);
            setIsEditing!(false);
        } else {
            newComments = [...data, createComment(user, text)];
        }

        dispatch({ type: 'UPDATE_DATA', payload: newComments });
        saveToLocalStorage(newComments);
    }

    return (
        <form
            onSubmit={e => {
                handleSubmit(e);
                setText('');
            }}
            className={`bg-white rounded-md gap-4 flex  ${
                !isEditing ? 'p-4 md:p-6' : 'flex-col'
            }`}
        >
            {!isEditing && (
                <img
                    src={user.image.webp}
                    alt={`${user.username} photography`}
                    className="w-10 h-10 hidden md:inline-block"
                />
            )}
            <label htmlFor="comment" className="w-full">
                <textarea
                    id="comment"
                    value={text}
                    onChange={e => {
                        setText(e.target.value);
                    }}
                    rows={3}
                    placeholder="Add a comment..."
                    className="w-full focus:outline-none focus:border-grayish-blue border border rounded-md p-4 resize-none"
                />
            </label>

            {!isEditing ? (
                <div className="flex items-center md:items-start justify-between uppercase">
                    <img
                        src={user.image.webp}
                        alt={`${user.username} photography`}
                        className="w-8 h-8 md:hidden"
                    />
                    <button
                        type="submit"
                        className="uppercase bg-moderate-blue px-6 py-2 text-very-light-gray rounded-md transition-all duration-300 hover:opacity-50"
                    >
                        {isReplying ? 'Reply' : 'Send'}
                    </button>
                </div>
            ) : (
                <button
                    type="submit"
                    className="bg-moderate-blue text-white rounded-md px-4 py-2 md:self-end uppercase transition-all duration-300 hover:opacity-50"
                >
                    Update
                </button>
            )}
        </form>
    );
}
