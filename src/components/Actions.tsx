import * as React from 'react';
import { Modal } from './Modal';
import { IComment } from '../db';
import { AppContext } from '../store';

type ActionsProps = {
    comment: IComment;
    setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    setText: React.Dispatch<React.SetStateAction<string>>;
};

export function Actions({
    setIsReplying,
    setIsEditing,
    setText,
    comment,
}: ActionsProps): JSX.Element {
    const {
        state: { user },
    } = React.useContext(AppContext);
    const [isOpen, setIsOpen] = React.useState(false);
    const isCurrentUser = comment.user.username === user.username;

    return (
        <>
            {isCurrentUser ? (
                <div className="flex items-center gap-4 md:gap-6">
                    <button
                        type="button"
                        className="flex items-center gap-2 transition-all duration-300 hover:opacity-50"
                        onClick={() => setIsOpen(true)}
                    >
                        <img
                            src="/assets/svgs/icon-delete.svg"
                            alt="Delete icon"
                        />
                        <p className="font-bold text-soft-red">Delete</p>
                    </button>
                    <button
                        type="button"
                        className="flex items-center gap-2 transition-all duration-300 hover:opacity-50"
                        onClick={() => {
                            setIsEditing(prev => !prev);
                            setText(
                                `${
                                    comment.replyingTo
                                        ? `@${comment.replyingTo} `
                                        : ''
                                }${comment.content}`,
                            );
                        }}
                    >
                        <img src="/assets/svgs/icon-edit.svg" alt="Edit icon" />
                        <p className="font-bold text-moderate-blue">Edit</p>
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    className="flex items-center gap-2 transition-all duration-300 hover:opacity-50"
                    onClick={() => {
                        setIsReplying(prev => !prev);
                        setText(`@${comment.user.username}, `);
                    }}
                >
                    <img src="/assets/svgs/icon-reply.svg" alt="Reply icon" />
                    <p className="font-bold text-moderate-blue">Reply</p>
                </button>
            )}

            {isOpen && (
                <Modal id={comment.id} isOpen={isOpen} closeModal={setIsOpen} />
            )}
        </>
    );
}
