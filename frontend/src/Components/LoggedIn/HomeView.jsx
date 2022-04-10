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
    const [account, setAccount] = useState(undefined);

    // Initial Load
    useEffect(() => {
        console.log(JSON.parse(JSON.stringify(localStorage.currUser)));
        if (!localStorage.currUser) {
            window.alert("Sign in to view the home view");
            navigate('/');
        }
        else {
            // grab the currUser from localStorage
            var temp = JSON.parse(JSON.stringify(localStorage.currUser));

            // initalize the account variable
            getAccountbyUsername(temp.username).then(x => setAccount(x));
        }
    }, []);

    // Conditions
    if (!account) {
        console.log(JSON.parse(JSON.stringify(localStorage.currUser)));
        window.alert("Invalid currUser");
        navigate('/');
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