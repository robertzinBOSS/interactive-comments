import * as React from 'react';
import moment from 'moment';
import { IComment } from '../db';
import { Form } from './Form';
import { AppContext } from '../store';
import { Score } from './Score';
import { Actions } from './Actions';

type CommentProps = {
    comment: IComment;
};

export function Comment({ comment }: CommentProps): JSX.Element {
    const {
        state: { user },
    } = React.useContext(AppContext);
    const [isReplying, setIsReplying] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [text, setText] = React.useState('');
    const isCurrentUser = comment.user.username === user.username;
    const timestamp = moment(Number(comment.createdAt));

    return (
        <>
            <div className="bg-white rounded-md p-4 md:p-6 text-grayish-blue flex flex-col md:flex-row gap-4">
                <div className="hidden md:inline-block">
                    <Score comment={comment} />
                </div>
                <div className="flex flex-col flex-wrap gap-4 w-full">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <img
                                src={comment.user.image.webp}
                                alt={`${comment.user.username} photography`}
                                className="w-8 h-8"
                            />
                            <span className="flex items-center gap-2">
                                <p className="font-bold text-dark-blue">
                                    {comment.user.username}
                                </p>
                                {isCurrentUser && (
                                    <span className="bg-moderate-blue text-white text-xs px-2 py-0.5 rounded">
                                        you
                                    </span>
                                )}
                            </span>
                            <p>
                                {timestamp.isValid()
                                    ? timestamp.fromNow()
                                    : comment.createdAt}
                            </p>
                        </div>
                        <div className="hidden md:block ml-auto">
                            <Actions
                                comment={comment}
                                setIsReplying={setIsReplying}
                                setIsEditing={setIsEditing}
                                setText={setText}
                            />
                        </div>
                    </div>
                    {!isEditing ? (
                        <p>
                            {comment.replyingTo && (
                                <span className="font-bold text-moderate-blue">
                                    @{comment.replyingTo}{' '}
                                </span>
                            )}
                            {comment.content}
                        </p>
                    ) : (
                        <Form
                            text={text}
                            setText={setText}
                            comment={comment}
                            setIsEditing={setIsEditing}
                            isEditing
                        />
                    )}
                </div>
                <div className="flex justify-between md:hidden">
                    <Score comment={comment} />
                    <Actions
                        comment={comment}
                        setIsReplying={setIsReplying}
                        setIsEditing={setIsEditing}
                        setText={setText}
                    />
                </div>
            </div>
            {isReplying && (
                <Form
                    text={text}
                    setText={setText}
                    comment={comment}
                    setIsReplying={setIsReplying}
                    isReplying
                />
            )}
            {comment.replies && comment.replies.length > 0 && (
                <div className="pl-4 md:pl-10 md:ml-10 border-l-2 border-l-grayish-blue border-opacity-10 grid gap-4">
                    {comment.replies.map(c => (
                        <Comment key={c.id} comment={c} />
                    ))}
                </div>
            )}
        </>
    );
}
