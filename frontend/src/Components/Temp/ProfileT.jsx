// Library Imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccountbyUsername, logout, updateAccountbyUsername } from "../../APIFolder/loginApi";

// Component Imports
import { TextField } from "../common";
import LoggedInResponsiveApBar from "../common/LoggedInResponsiveAppBar";

// Method Imports

export const Profile = (props) => {
    // Navigate Object
    const navigate = useNavigate();
    
    // Component Variables
    const [account, setAccount] = useState(undefined);
    const [editMode, setEditMode] = useState(false);
    const [online, setONline] = useState(false);

    // Initial Load
    useEffect(() => {
        if (!localStorage.currUser) {
            window.alert("Please sign in to view profiles");
            navigate('/');
        }
        else {
            // grab the currUser from localStorage
            var temp = JSON.parse(JSON.stringify(localStorage.currUser));

            // initalize the account variable
            getAccountbyUsername(temp.username).then(res => setAccount(res));
        }
    }, [editMode]);

    // Conditions
    if (!account)
        return <>Loading...</>

    // Component Methods
    const startEditing = () => {
        changeAccount({...account});
    }
    const doneEditing = () => {
        if (account.firstName && account.lastName) {
            updateAccountbyUsername(account).then(setEditMode(false));
            localStorage.currUser = JSON.stringify(account);
        }
    }
    const cancel = () => {
        setEditMode(false);
    }
    const signOut = () => {
        console.log("Logging out");
        logout().then(() => localStorage.currUser = undefined);
    }
    const profileNav = () => {
        navigate(`users/${account.username}`);
    }
    const accountNav = () => {
        navigate(`acccounts/${account.username}`);
    }
    const changeAccount = delta => setAccount({ ...account, ...delta });

    // HTML
    return <section className="userProfile">
        <LoggedInResponsiveAppBar
            pages={props.pages}
            settings={props.settings}
            signOut={()=>signOut()}
            username={JSON.parse(JSON.stringify(localStorage.currUser)).username}
            profileNav={()=>profileNav()}
            account={()=>accountNav()} />

        {/* Viewing own profile (EDITING) */}
        {JSON.parse(JSON.stringify(localStorage.currUser)).username === account.username && editMode === true &&
            <div className="container border-0 mt-5">
                <div className="row bg-light">
                    <img src="https://via.placeholder.com/300x300" className="float-start col-2 m-3 m-5" alt="" />
                    <div className="col-9 float-start mt-5">
                        <table className='table float-start'>
                            <thead>
                                <th className="col-3 fs-3 mt-5 text-start">{account.username}</th>
                                {online && <th className="col-1"><CircleIcon sx={{background:'green'}} /></th>}
                                {!online && <th className="col-1"><CircleIcon sx={{background:'red'}} /></th>}
                                <th className="col-1">
                                    <button className="btn btn-light" onClick={() => startEditing()}>Edit Profile</button>
                                </th>
                            </thead>
                            <tbody>
                                <tr className="border-0">
                                    <td className="col-3 fs-6 text-start border-0">
                                        <TextField label="First Name :" value={account.firstName} setValue={firstName => changeAccount({firstName})} />
                                    </td>
                                </tr>
                                <tr className="border-0">
                                    <td className="col-3 fs-6 text-start border-0">

                                        <TextField label="Last Name :" value={account.lastName} setValue={lastName => changeAccount({lastName})} />
                                    </td>
                                </tr>
                                {/* <tr>
                                    <td>
                                    <TextField label="Email :" value={account.email} setValue={x => changeEmail(x)} />
                                    </td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                    <div className="row mb-3">
                        <div className="col-6">
                            <button type="button" className="btn btn-secondary col-3 contained m-1 float-end" onClick={() => cancel()}>Cancel</button>
                        </div>
                        <div className="col-6">
                            <button type="button" className="btn btn-success col-3 contained m-1 float-start" onClick={() => doneEditing()}>Save</button>
                        </div>
                    </div>
                </div>
            </div>}

        {/* Viewing own profile (NOT EDITING) */}
        {JSON.parse(JSON.stringify(localStorage.currUser)).username === account.username && editMode === false &&
            <div className="container border-0 mt-5">
                <div className="row bg-light">
                    <img src="https://via.placeholder.com/300x300" className="float-start col-2 m-3 m-5" alt="" />
                    <div className="col-9 float-start mt-5">
                        <table className='table float-start'>
                            <thead>
                                <th className="col-3 fs-3 mt-5 text-start">{account.username}</th>
                                {online && <th className="col-1"><CircleIcon sx={{background:'green'}} /></th>}
                                {!online && <th className="col-1"><CircleIcon sx={{background:'red'}} /></th>}
                                <th className="col-1">
                                    <button className="btn btn-light" onClick={() => startEditing()}>Edit Profile</button>
                                </th>
                            </thead>
                            <tbody>
                                <td className="col-3 fs-6 text-start">
                                    <span className="p-0 text-capitalize">{account.firstName} </span><span className="p-0 text-capitalize" >{account.lastName}</span>
                                </td>
                                {/* <h2>Email :</h2>
                            <p>{account.email}</p> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>}

        {/* Viewing profile besides your own */}
        {JSON.parse(JSON.stringify(localStorage.currUser)).username !== account.username &&
            <div className="container border-0 mt-5">
                <div className="row bg-light">
                    <img src="https://via.placeholder.com/300x300" className="float-start col-2 m-3 m-5" alt="" />
                    <div className="col-9 float-start mt-5">
                        <table className='table float-start'>
                            <thead>
                                <th className="col-3 fs-3 mt-5 text-start">{account.username}</th>
                                {online && <th className="col-1"><CircleIcon sx={{background:'green'}} /></th>}
                                {!online && <th className="col-1"><CircleIcon sx={{background:'red'}} /></th>}
                            </thead>
                            <tbody>
                                <td className="col-3 fs-6 text-start">
                                    <span className="p-0 text-capitalize">{account.firstName} </span><span className="p-0 text-capitalize" >{account.lastName}</span>
                                </td>
                                {/* <h2>Email :</h2>
                        <p>{account.email}</p> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>}
    </section>
}