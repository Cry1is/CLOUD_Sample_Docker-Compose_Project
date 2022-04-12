// Library Imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Component Imports
import { LoggedInResponsiveAppBar } from "../common/LoggedInResponsiveAppBar";

// Method Imports
import { getAccountbyUsername, logout } from "../../APIFolder/loginApi";

export const HomeView = (props) => {
    // Navigate Object
    const navigate = useNavigate();

    // Component Variables
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem("currUser")));

    // Initial Load
    useEffect(() => {
        console.log("Loading HomeView...");
        if (!localStorage.getItem("currUser")) {
            window.alert("Sign in to view the home view");
            navigate('/');
        }
        else
            getAccountbyUsername(account.username).then(x => setAccount(x));
    }, []);

    // Conditions

    // Component Methods
    const signOut = () => {
        logout().then(() => localStorage.setItem("currUser", ""));
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
            pages={props.loggedInPages}
            settings={props.settings}
            signOut={() => signOut()}
            username={account.username}
            profileNav={() => profileNav()}
            accountNav={() => accountNav()} />
    </div>
}