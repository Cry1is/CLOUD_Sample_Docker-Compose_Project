import { getEmailbyUsername, getFirstNamebyUsername, getLastNamebyUsername, updateAccount } from "../../APIFolder/loginApi";
import { TextField } from "../common";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { render } from "react-dom";




export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state.loadedUser = "wes"
        this.state.editMode = false;


        //Doesn't currently know what info to get from the database
        this.state.firstName = '';
        this.state.lastName = '';
        this.state.email = '';
        this.state.username = Cookies.get("username");
    }


    componentDidMount() {
        // this.state.firstName = getFirstNamebyUsername(this.state.username);
        // this.state.lastName = getLastNamebyUsername(this.state.username);
        // this.state.email = getEmailbyUsername(this.state.username);
    }



    startEditing(){
        this.state.editMode = true;
        // navigate(`/${username}`)
        this.render();
    }
    doneEditing(){
        this.state.editMode = false;
        updateAccount({ "username": this.state.username, "firstName": this.state.firstName, "lastName": this.state.lastName, "email": this.state.email });
        // navigate(`/${username}`)
        this.render();
    }

    handleChange(e) {
        // handle state changes
        this.setState({ value: e.target.value });
    }


    // Basically check if user is the same user as the loaded profile.
    // If so then allow them to edit with the edit button at the end (this edit button will update the database once done)
    // If not then display the profile without the edit buttons.

    // NOTE - IN FUTURE ADD BUTTON TO SEND FRIEND REQUEST...ONLY IF FUNCTIONALITY IS IMPLEMENTED


    render() {
        // return <h1>Hello</h1>
        if (this.state.username === this.state.loadedUser) {//Need to get loadedUser from somewhere, probably button click to get into profile
            if (this.state.editMode) {

                return <section className="userProfile">
                    <h1>{this.state.loadedUser}'s Profile</h1>
                    <TextField label="First Name :" value={this.state.firstName} setValue={e => this.handleChange(e)} />
                    <TextField label="Last Name :" value={this.state.lastName} setValue={e => this.handleChange(e)} />
                    <TextField label="Email :" value={this.state.email} setValue={e => this.handleChange(e)} />
                    <button onClick={this.doneEditing()}>Save</button>
                </section>
            }
            else {

                return <section className="userProfile">
                    <h1>{this.state.loadedUser}'s Profile</h1>
                    <h2>First Name :</h2>
                    <p>{this.state.firstName}</p>
                    <h2>Last Name :</h2>
                    <p>{this.state.lastName}</p>
                    <h2>Email :</h2>
                    <p>{this.state.email}</p>
                    <button onClick={this.startEditing()}>Edit Profile</button>
                </section>
            }
        }
        else {
            return <section className="userProfile">
                <h1>{this.state.loadedUser}'s Profile</h1>
                <h2>First Name :</h2>
                <p>{this.state.firstName}</p>
                <h2>Last Name :</h2>
                <p>{this.state.lastName}</p>
                <h2>Email :</h2>
                <p>{this.state.email}</p>
            </section>
        }
    }

}
