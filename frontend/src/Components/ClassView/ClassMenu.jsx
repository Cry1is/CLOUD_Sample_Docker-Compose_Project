import { getAccountbyId, getCoursebyId, getCourseById, getCurrUserClasses, getFriendsClasses, logout } from "../../APIFolder/loginApi";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Add from "@mui/icons-material/Add";
import Cookies from "js-cookie";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LoggedInResponsiveAppBar from "../common/LoggedInResponsiveAppBar";
import { ClassNames } from "@emotion/react";

export const ClassMenu = ({ pages, settings, setNavigated }) => {
  const [courses, setCourses] = useState([]);
  const [account, setAccount] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
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
        console.log("FL cook", Cookies.get("account_id"))
        setNavigated(true);
        navigate('/');
      }
    }
    // console.log(Cookies.get("account_id"))
    enrollable() && getCurrUserClasses(Cookies.get("account_id")).then(res => {
      console.log(res)
      let temp_courses = []
      for(const i in res)
      {
        getCoursebyId(res[i].course_id).then(course => {
          temp_courses.push(course)
          setCourses([...temp_courses])
        }) 
      }
      
    })
  }, []);
  const goToCourseAdd = () => {
    navigate('/classes/enrollment');
  }
  const enrollable = () => {
    if (JSON.parse(localStorage.getItem("currUser")).role.role_type === "student" || JSON.parse(localStorage.getItem("currUser")).role.role_type === "ta") {
      return true
    }
    return false
  }
  //TODO: put nav bar in, data intergration
  const readyToDisplay = () => {
    if (JSON.stringify(account) === "{}") {
      //god I hate that the problem was loading too fast
      return false;
    }
    return true;
  }
  const goToCourse = (course) => {
    navigate(`/classes/${course.course_id}`);
  }
  const signOut = () => {
    console.log("Logging out");
    logout().then(() => {
      localStorage.setItem("currUser", "{}")
      navigate('/');
    });
  }

  if (readyToDisplay()) {
    return <section className="ClassesMenu">
      <LoggedInResponsiveAppBar
        pages={pages}
        settings={settings}
        signOut={() => signOut()}
        account_id={JSON.parse(localStorage.getItem("currUser")).account_id}
        account_type={JSON.parse(localStorage.getItem("currUser")).role.role_type} />

<div className="mt-5"></div>      
{enrollable() && <Button variant="contained" className="bg-success m-3" onClick={() => goToCourseAdd()} endIcon={<Add />}>Add Class</Button>}
      {!enrollable() && <Button variant="contained" className="bg-success m-3" onClick={() => goToCourseAdd()} endIcon={<ArrowForwardIcon />}>Course List</Button>}

      {enrollable() && courses.length > 0 && <table className="table">
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
            return (<tr key={idx} className="container">
              <td>{course.course_name}{console.log(course)}</td>
              <td>{course.department}</td>
              <td>{course.professors.length !== 0 && course.professors.map((professor) => {
                return `${professor.last_name}, ${professor.last_name}\n`;
              })}{course.professors.length === 0 && `No Professor`}</td>

              <td className="col-3 pb-2">
                {console.log(course)}{course.grade}
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
      </table>}
      {
        enrollable() && courses.length === 0 && <div>You are not enrolled in any classes</div>
      }
    </section>
  } else {
    return <>Loading...</>
  }
};