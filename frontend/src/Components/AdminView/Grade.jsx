// Library Imports
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Component Imports
import LoggedInResponsiveAppBar from '../common/LoggedInResponsiveAppBar';

// Method Imports
import { getGrades, logout } from '../../APIFolder/loginApi';

export const FriendsList = (props) => {
    // Navigate Object
    const navigate = useNavigate();

    // Component Variables
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem("currUser")));
    const [grades, setGrades] = useState(false);

    // Initial Load
    useEffect(() => {
        if (JSON.stringify(account) === "{}") {
            navigate('/');
            props.setNavigated(true);
        }
        getGrades().then(res => { 
            console.log(res);
            let tempCourses = [];
            res.map(grade => tempCourses.push(getCourseMetaById(grade.course_id).then(x => x.course_name)));
            addCourseNameToGrades(res, tempCourses);
        });
    }, []);

    // Conditions
    if (!grades) {
        return <>Loading...</>
    }

    // Component Methods
    const addCourseNameToGrades = (dummy, courses) => {
        console.log("Adding status to profile")
        let courses2 = [];
        for (const grade in dummy) {
            courses2.push({ ...dummy[grade], course_name: courses[grade] });
        }
        setGrades(courses2);
    }

    const goToClass = (course_id) => {
        navigate(`/classes/${course_id}`);
    }

    const signOut = () => {
        console.log("Logging out");
        logout().then(() => {
            localStorage.setItem("currUser", "{}")
            navigate('/');
        });
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
            username={account.username}
            profileNav={() => profileNav()}
            account={() => accountNav()} />

        <div className='container border-0 mb-3'>
            <h1 className='mt-3 col-6 float-start '>Grades List <span className='text-secondary'>({grades.length})</span></h1>
            <div className='clearfix'></div>
        </div>
        <div className='border-top mb-3'></div>
        {console.log(grades)}
        {grades.length > 0
            && <table>
                <tbody>
                    {grades.map(grade => 
                        <tr key={grade.course_id}>
                            <td>{grade.course_name}</td>
                            <td>{grade.grade}</td>

                            <td>
                                <Button variant="contained"
                                    className="btn btn-secondary"
                                    endIcon={<ArrowForwardIcon />}
                                    onClick={() => goToClass(grade.course_id)}>
                                    View Class
                                </Button>
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>}
        {grades.length === 0 && <h2>You have no grades</h2>}
    </div>
}
