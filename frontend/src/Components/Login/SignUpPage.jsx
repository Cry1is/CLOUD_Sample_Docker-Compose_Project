import { PasswordField, SelectField, TextField } from "../common";
// import { useState } from "react";
// import { GenericButton } from "../common/GenericButton";
import { addAccount } from "../../APIFolder/loginApi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import React from "react";


export default class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        
        this.state.firstName = '';
        this.state.lastName = '';
        this.state.email = '';
        this.state.username = '';
        this.state.password = '';
        this.state.accountType = '';
        this.state.accountTypes = [
            "Student",
            "Teacher"
        ];
    }

    componentDidMount() {

    }

    handleChange(e) {
        // handle state changes
        this.setState({ value: e.target.value });
    }
    
    login(response){
        
        if (response.success === 1) {
            Cookies.set("username", `${this.state.username}`);
            // useNavigate('/');
        } else {
            window.alert("Failed to Sign Up. Username is taken");
        }
    }


    render() {
        return (<section id="loginView">
            <h1>Sign Up</h1>
            <form className="container">

                <TextField label="First Name"
                    value={this.state.firstName}
                    setValue={x => this.handleChange(x)} />
                <TextField label="Last Name"
                    value={this.state.lastName}
                    setValue={x => this.handleChange(x)} />
                <TextField label="Email"
                    value={this.state.email}
                    setValue={x => this.handleChange(x)} />
                {/* May want to use for confirmations in the future? If we can figure it out */}
                <TextField label="Username"
                    value={this.state.username}
                    setValue={x => this.handleChange(x)} />

                {/* Need to change all the generic classes to id passed in since
             I click on "Password" and it takes me to the Username field" */}

                <PasswordField label="Password"
                    value={this.state.password}
                    setValue={x => this.handleChange(x)} />
                <SelectField label="Account Type"
                    options={this.state.accountTypes}
                    value={this.state.accountType}
                    setValue={this.state.setAccountType} />
                <button
                    type="button"
                    onClick={() => addAccount({ "username": this.state.username, "password": this.state.password, "firstName": this.state.firstName, "lastName": this.state.lastName, "email": this.state.email })
                        .then(response => this.login(response))}
                    variant="contained"
                    color="success">
                    Sign Up
                </button>
                {/* <GenericButton label="Sign Up" click="/login" /> */}
            </form>

        </section>);
    }

}
