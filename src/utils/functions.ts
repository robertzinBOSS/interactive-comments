import info from '../db/data.json';
import { IComment, IUser } from '../db';

export function saveToLocalStorage(comments: IComment[]): void {
    localStorage.setItem('comments', JSON.stringify(comments));
}

export function loadFromLocalStorage(key: string): IComment[] {
    const result = localStorage.getItem(key);

    if (result) {
        return JSON.parse(result);
    }

    saveToLocalStorage(info.comments);
    return info.comments;
}

export function createComment(
    user: IUser,
    content: string,
    replyingTo?: string,
): IComment {
    return {
        id: Date.now(),
        user,
        score: 0,
        content,
        createdAt: Date.now().toString(),
        replyingTo,
        replies: [],
    };
}

export function updateReplies(
    id: number,
    data: IComment[],
    replies: IComment[],
): IComment[] {
    return data.map(d =>
        d.id === id
            ? { ...d, replies }
            : { ...d, replies: updateReplies(id, d.replies ?? [], replies) },
    );
}

export function updateContent(
    id: number,
    data: IComment[],
    content: string,
): IComment[] {
    return data.map(d =>
        d.id === id
            ? { ...d, content: content! }
            : { ...d, replies: updateContent(id, d.replies ?? [], content) },
    );
}

export function deleteComment(id: number, data: IComment[]): IComment[] {
    const temp = [...data];
    const result = [];

    for (let i = 0; i < temp.length; i++) {
        if (temp[i].id !== id) {
            temp[i].replies = deleteComment(id, temp[i].replies ?? []);
            result.push(temp[i]);
        }
    }

    return result;
}

export function updateScore(
    id: number,
    data: IComment[],
    type: 'up' | 'down',
): IComment[] {
    return data.map(d => {
        if (d.id === id) {
            if (type === 'up') {
                return { ...d, score: d.score + 1 };
            }

            return { ...d, score: d.score - 1 };
        }

        return { ...d, replies: updateScore(id, d.replies ?? [], type) };
    });
}
