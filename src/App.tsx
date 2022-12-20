import * as React from 'react';

import { Comment, Form } from './components';
import { AppContext } from './store';

export default function App(): JSX.Element {
    const {
        state: { data },
    } = React.useContext(AppContext);
    const [text, setText] = React.useState('');

    return (
        <main>
            <div className="p-5 flex flex-col gap-4 md:max-w-3xl md:mx-auto">
                {data.map(c => (
                    <Comment key={c.id} comment={c} />
                ))}
                <Form text={text} setText={setText} />
            </div>
        </main>
    );
}
