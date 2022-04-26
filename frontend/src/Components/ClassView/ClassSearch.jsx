// Library Imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Add from "@mui/icons-material/Add";
import Cookies from "js-cookie";
import ClearIcon from '@mui/icons-material/Clear';

// Component Imports
import LoggedInResponsiveAppBar from "../common/LoggedInResponsiveAppBar";
import { TextField } from "../common";

// Method Imports
import {getAllCourses} from "../../APIFolder/loginApi"


export const ClassSearch = ({ pages, settings, setNavigated }) => {
    // Component Variables
    const [account, setAccount] = useState({});
    const [courses, setCourses] = useState([]);

    const [dummy, setDummy] = useState(0);


    const signOut = () => {
        console.log("Logging out");
        logout().then(() => {
            localStorage.setItem("currUser", "{}");
            navigate('/');
        });
    }

    const profileNav = () => {
        navigate(`users/${account.username}`);
    }

    const accountNav = () => {
        navigate(`accounts/${account.username}`);
    }

    const readyToDisplay = () => {
        console.log("profiles", profiles);
        if (profiles !== undefined && profiles[0] !== undefined && profiles[0].status !== undefined) {
            return true;
        }
        return false;
    }

    // HTML
    if (readyToDisplay()) {
        return <div>
            <LoggedInResponsiveAppBar
                pages={pages}
                settings={settings}
                signOut={() => signOut()}
                username={account.username}
                profileNav={() => profileNav()}
                account={() => accountNav()} />

            <div className="container border-0 mt-3">
                <div className="container border-0 col-3 float-start">
                    <TextField label="Search by Course Name" value={username} setValue={setUsername} />
                </div>
                <div className="clearfix"></div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th className="col-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {console.log("RENDER", typeof (profiles))}
                    {profiles.map((profile, idx) => {
                        return (displayUser(profile) && <tr key={idx} className="container">

                            <td>{profile.username}</td>
                            <td>{profile.first_name}</td>
                            <td>{profile.last_name}</td>

                            <td className="col-3 pb-2">
                                {profile.status === 2 &&
                                    <Button variant="contained" className="bg-primary col-7 m-1 mt-0 mb-0" onClick={() => { handleFriendRequest(profile.account_id, 1).then(setDummy(dummy + 1)) }} endIcon={<Add />}>Accept Request</Button>
                                }
                                {profile.status === 2 &&
                                    <Button variant="contained" className="bg-danger col-2" onClick={() => { handleFriendRequest(profile.account_id, 0).then(setDummy(dummy + 1)) }}><ClearIcon /></Button>
                                }
                                {profile.status === 1 &&
                                    <Button variant="contained" disabled endIcon={<Add color='disabled' />}>Sent Request</Button>
                                }
                                {profile.status === 0 &&
                                    <Button variant="contained" className="bg-success" onClick={() => { sendFriendRequest(profile.account_id).then(setDummy(dummy + 1)) }} endIcon={<Add />}>Add Friend </Button>
                                }
                                {profile.status === 4 &&
                                    <Button variant="contained" disabled endIcon={<ClearIcon color='disabled' />}>Redacted</Button>
                                }
                            </td>
                            <td>
                                <Button variant="contained"
                                    className="btn bg-secondary"
                                    endIcon={<ArrowForwardIcon />}
                                    onClick={() => goToProfile(profile)}>
                                    View Profile
                                </Button>
                            </td>

                        </tr>)
                    })}
                </tbody>
            </table>
        </div>

    }
    else {
        return <>Loading...</>
    }
}