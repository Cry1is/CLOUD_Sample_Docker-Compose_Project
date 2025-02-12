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
import { doSignOut, TextField } from "../common";

// Method Imports
import { getAllCourses, getCoursebyId, logout, getAccountbyId } from "../../APIFolder/loginApi"


export const AddClasses = ({ pages, settings, setNavigated }) => {
    // Navigate Object
    const navigate = useNavigate();
    if (localStorage.getItem("currUser") === null)
        localStorage.setItem("currUser", "{}");

    // Component Variables
    const [account, setAccount] = useState({});
    const [courses, setCourses] = useState(false);
    const [cName, setCName] = useState('');
    const [dummy, setDummy] = useState(0);

    useEffect(() => {
        console.log("running");
        var temp_courses = [];
        getAllCourses().then(async clssRes => {
            console.log("Getting requests")

            for (const i in clssRes) {
                let course = await getCoursebyId(clssRes[i].course_id)
                temp_courses.push(course);
            }
            console.log("temp_courses", temp_courses);
            setCourses(temp_courses);
        });

    }, [dummy]);

    // Conditions
    if (JSON.stringify(account) === "{}") {
        let account_id = Cookies.get("account_id");
        if (account_id) {
            getAccountbyId(account_id)
                .then(account => {
                    if (account) {
                        localStorage.setItem("currUser", JSON.stringify(account));
                        setAccount(account);
                    }
                    else {
                        console.log("User is null after request");
                    }
                });
        }
        else {
            setNavigated(true);
            navigate('/');
        }
    }

    // Component Methods
    const goToCourse = course => {
        navigate(`/classes/${course.course_id}`);
    }

    const goToWaitlist = course => {
        navigate(`/waitlist/${course.course_id}`);
    }

    const goToSchedule = () => {
        navigate(`/classes/enroll`);
    }


    const enrollable = () => {
        if (account.role.role_type === "student" || account.role.role_type === "ta") {
            console.log("Enrollable")
            return true;
        }
        console.log("Not Enrollable")
        return false;
    }
    const signOut = () => { doSignOut().then(() => navigate('/')) };
    const find = (course) => {

        if (course.course_name.indexOf(cName) !== -1) {
            return true
        }
        return false;
    }

    // HTML
    if (!!courses && courses.length !== 0) {
        return <div>
            <LoggedInResponsiveAppBar
                pages={pages}
                settings={settings}
                signOut={() => signOut()}
                account_id={JSON.parse(localStorage.getItem("currUser")).account_id}
                account_type={JSON.parse(localStorage.getItem("currUser")).role.role_type} />

            <div className="container border-0 mt-3">
                {enrollable() && <button type="button" className="float-end btn btn-success mt-3" onClick={() => goToSchedule()}>Schedule</button>}
                <div className="container border-0 col-3 float-start">
                    <TextField label="Course Name" value={cName} setValue={setCName} />
                </div>
                <div className="clearfix"></div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th className="col-3">Name</th>
                        <th className="col-3">Department</th>
                        <th className="col-3">Professor</th>
                        <th className="col-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course, idx) => {
                        return (find(course) && <tr key={idx} className="container">
                            <td>{course.course_name}{console.log(course)}</td>
                            <td>{course.department}</td>
                            <td>{course.professors.length !== 0 && course.professors.map((professor) => {
                                return `${professor.last_name}, ${professor.last_name}\n`;
                            })}{course.professors.length === 0 && `No Professor`}</td>

                            <td className="col-3 pb-2">
                                {JSON.parse(localStorage.getItem("currUser")).role.role_type === "admin" && <Button variant="contained"
                                    className="btn bg-warning"
                                    endIcon={<ArrowForwardIcon />}
                                    onClick={() => goToWaitlist(course)}>
                                    View waitlist
                                </Button>}
                            </td>
                            <td className="col-3">
                                <Button variant="contained"
                                    className="btn bg-secondary"
                                    endIcon={<ArrowForwardIcon />}
                                    onClick={() => goToCourse(course)}>
                                    View course
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