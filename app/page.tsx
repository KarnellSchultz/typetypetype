
export const config = {
    runtime: 'edge',
}

import { SignIn } from './signIn'
import { TypingGame } from './typingGame';

const Home = () => {
    return (
        <div className=''>
            <TypingGame />
            <section>
                <div>account:</div>
                <SignIn />
            </section>
        </div>
    )
}
export default Home

