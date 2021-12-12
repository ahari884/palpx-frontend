import { useEffect, useState } from 'react';
import Groups from './components/Groups';
import Header from './components/Header';
import Signin from './components/Signin';
import Signup from './components/Signup';
import { AuthorizationComps } from './style';

function App() {

    const [isLoggedIn, setLoggedIn] = useState(false)

    useEffect(()=>{
        setLoggedIn(localStorage.getItem('access_token') && localStorage.getItem('isLoggedIn') ? true: false)
    })

    const updateLogin = (value) => {
        setLoggedIn(value)
    }

    const renderAuthorizedComps = () => {
        return(
            <div>
                <Groups></Groups>
            </div>
        )
    }

    const renderAuthorazationComps = () => {
        return (
            <AuthorizationComps>
                <Signin updateLogin={updateLogin}></Signin>
                <Signup></Signup>
            </AuthorizationComps>
        )
    }

    return (
        <div>
            <Header></Header>
            { isLoggedIn ? renderAuthorizedComps() :  renderAuthorazationComps()}
        </div>
    );
}

export default App;
