// Library Imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

// Component Imports
import LoggedInResponsiveAppBar from "../common/LoggedInResponsiveAppBar";

// Method Imports
import { logout } from "../../APIFolder/loginApi";

export const HomeView = (props) => {
    // Navigate Object
    const navigate = useNavigate();

    // Component Variables
    const [account, setAccount] = useState(undefined);

    // Initial Load
    useEffect(() => {
        if (!localStorage.currUser)
            navigate('/');
    }, [account])

    // Conditions
    if (!account) {
        setAccount(JSON.parse(JSON.stringify(localStorage.currUser)));
    }

    // Component Methods
    const signOut = () => {
        logout().then(() => localStorage.currUser = undefined);
    }
    const profileNav = () => {
        navigate(`users/${account.username}`);
    }
    const accountNav = () => {
        navigate(`accounts/${account.username}`);
    }

    // HTML
    return <div>
        <LoggedInResponsiveAppBar
            pages={props.pages}
            settings={props.settings}
            signOut={() => signOut()}
            userName={account.username}
            profileNav={() => profileNav()}
            account={() => accountNav()} />
    </div>
}