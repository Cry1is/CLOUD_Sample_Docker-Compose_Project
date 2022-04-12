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

    // Initial Load
    useEffect(() => {
        var temp = JSON.parse(JSON.stringify(localStorage.currUser));
        if (!temp) {
            window.alert("Sign in to view the home view");
            navigate('/');
        }
    }, []);

    // Conditions

    // Component Methods
    const signOut = () => {
        logout().then(() => localStorage.currUser = '');
    }
    const profileNav = () => {
        navigate(`users/${JSON.parse(JSON.stringify(localStorage.currUser)).username}`);
    }
    const accountNav = () => {
        navigate(`accounts/${JSON.parse(JSON.stringify(localStorage.currUser)).username}`);
    }

    // HTML
    return <div>
        <LoggedInResponsiveAppBar
            pages={props.loggedInPages}
            settings={props.settings}
            signOut={() => signOut()}
            userName={JSON.parse(JSON.stringify(localStorage.currUser)).username}
            profileNav={() => profileNav()}
            account={() => accountNav()} />
    </div>
}