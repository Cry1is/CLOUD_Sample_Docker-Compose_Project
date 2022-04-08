// Library Imports
import React from "react";
import { useNavigate } from "react-router-dom";

// Component Imports
import { HomeView } from "./HomeViewT"

// Method Imports

export const Base = (props) => {
    // Navigate Object
    const navigate = useNavigate();

    // Component Variables

    // Initial Load

    // Conditions

    // Component Methods
    const onSignIn = () => {
        console.log("signing in");
        navigate('/login');
    }
    const onSignUp = () => {
        console.log("signing up");
        navigate('/signUp');
    }

    // HTML
    return <section className="baseView">
        {/*if the user is not logged in*/}
        {!localStorage.currUser && <div>
            <BaseResponsiveAppBar pages={basePages}
            signIn={() => onSignIn()}
            signUp={() => onSignUp()} />
            <h1 className="mb-4">Welcome</h1>
            <h2 className="">This is the base page to be updated with logo and stuff</h2>
        </div>}
        {/*if the user is logged in*/}
        {localStorage.currUser && <HomeView props />}
    </section>
}