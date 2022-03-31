import { PasswordField, TextField } from "../common";
import React, { useState } from "react";
import { GenericButton } from "../common/GenericButton";
import { logIntoAccount } from "../../APIFolder/loginApi";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.username = '';
        this.state.password = '';
    }

    checkIfLoginSucc(response) {
        // const navigate = useNavigate();
        if (response.success === 1) {
            Cookies.set("username", `${this.state.username}`);
            // navigate('/');
        }
        else {
            window.alert("Password for given username is incorrect");
        }
    }



    login(username, password) {
        logIntoAccount({ "username": this.state.username, "password": this.state.password }).then(response => this.checkIfLoginSucc(response));
    }

    handleChange(e) {
        // handle state changes
        this.setState({ value: e.target.value });
    }
    setUsername(e){
        this.state.username({ value: e.target.value });
    }


    render() {
        return <section id="loginView">
            <h1>Login</h1>
            <form className="container">
                <TextField label="Username"
                    value={this.state.username}
                    setValue={x => this.setUsername(x)} />

                {/* Need to change all the generic classes to id passed in since I click on "Password" and it takes me to the Username field" */}

                <PasswordField label="Password"
                    value={this.state.password}
                    setValue={x => this.handleChange(x)} />

                <button
                    type="button"
                    onClick={() => this.login(this.state.username, this.state.password)}
                    variant="contained"
                    color="success">
                    Login
                </button>
                {/* <GenericButton label="Login" click="/loggedIn" /> */}
                <p className="mb-0">or</p>
                <GenericButton label="Sign Up" click="/signUp" />
            </form>

        </section >;
    }

}