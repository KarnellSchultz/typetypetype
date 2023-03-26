
export const config = {
    runtime: 'edge',
}

import { SignIn } from './signIn'
import { UserButton } from "@clerk/clerk-react";
import { TypingGame } from './typingGame';

const Home = () => {

    return (
        <div className=''>
            <section>
                <div>account:</div>
                <SignIn />
                {/* <UserButton /> */}
            </section>
            <TypingGame />
        </div>
    )
}
export default Home

