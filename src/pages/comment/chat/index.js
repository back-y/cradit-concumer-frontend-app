import { useCallback } from 'react';
import Talk from 'talkjs';
import { Session, Chatbox } from '@talkjs/react';
import Cookies from 'js-cookie'

// const name = Cookies.get(name)
// const id = Cookies.get(id)
// const email = Cookies.get(email)
// const role = Cookies.get(role)

function ChatComponent() {
    const syncUser = useCallback(
        () =>
            new Talk.User({
                id: Cookies.get('id'),
                name: Cookies.get('name'),
                email: Cookies.get('email'),
                photoUrl: 'https://talkjs.com/new-web/avatar-7.jpg',
                welcomeMessage: 'Hi!',
                role: Cookies.get('role'),
            }),
        []
    );

    const syncConversation = useCallback((session) => {
        // JavaScript SDK code here
        const conversation = session.getOrCreateConversation('welcome');

        const other = new Talk.User({
            id: Cookies.get('id'),
            name: Cookies.get('name'),
            email: Cookies.get('email'),
            photoUrl: 'https://talkjs.com/new-web/avatar-8.jpg',
            welcomeMessage: 'Hey, how can I help?',
            role: Cookies.get('role'),
        });
        conversation.setParticipant(session.me);
        conversation.setParticipant(other);

        return conversation;
    }, []);

    return (
        <Session appId="tnFB3QuL" syncUser={syncUser}>
            <Chatbox
                syncConversation={syncConversation}
                style={{ width: '100%', height: '500px' }}
            ></Chatbox>
        </Session>
    );
}

export default ChatComponent;