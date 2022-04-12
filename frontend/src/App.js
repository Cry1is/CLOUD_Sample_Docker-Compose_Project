// Library Imports
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';

// Component Imports
import './App.css';
import { SignUpPage } from './Components/Login/SignUpPage';
import { LoginPage } from './Components/Login/LoginPage';
import { Base } from './Components/BaseView/Base';
import { Profile } from './Components/Profiles/Profile';
import { AccountInfo } from './Components/Profiles/AccountInfo';
import { UserSearch } from './Components/Profiles/UserSearch';
import { FriendsList } from './Components/Profiles/FriendsList';

// Method Imports
import { getAccountbyUsername } from './APIFolder/loginApi';

// React functional component
function App() {
  // ENTER YOUR EC2 PUBLIC IP/URL HERE
  const ec2_url = ''
  // CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
  const ec2 = false;
  // USE localhost OR ec2_url ACCORDING TO ENVIRONMENT
  const url = ec2 ? ec2_url : 'localhost'

  const [account, setAccount] = useState(null);

  // initial load
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps

    let username = Cookies.get("username");
    if (username) {
      getAccountbyUsername(username)
        .then(x => {
          if (x) {
            console.log("account found");
            console.log(x);
            localStorage.setItem("currUser", JSON.stringify(x));
            setAccount(x);
          }
          else {
            console.log("User is null after request");
            localStorage.setItem("currUser", "");
          }
        });
    }
    else {
      console.log("No cookie");
      localStorage.setItem("currUser", "");
    }
  }, []);

  //Nav bar now made available from all views (at least thats the goal)
  const [loggedInPages] = useState([
    { label: 'Dashboard', route: `/` },
    { label: 'Classes', route: `/classes` },
    { label: 'Friends', route: `/users/:username/friends` },
  ]);
  const [basePages] = useState([
    { label: 'Info', route: `/info` },
    //Add more paths here if you want more?
  ]);
  const [settings] = useState([
    // {label: 'Public Profile', route: `/users/${account.id}` }, Keep out until have an account id confirmed
    // { label: 'Account', route: `/accounts/${account.id}` }, 
    { label: 'Public Profile', route: `/users` },
    { label: 'Account', route: `/accounts` },
    { label: 'Logout', route: '/signout' }
  ]);

  return (
    <div className="App" >
      <BrowserRouter>
        <Routes>

          {/* When clicking on profile have a global hook that gets set to currViewUser  */}

          {/* TODO: Add nav bar at top to have easy access to tabs??? 
          Probably Easiest to create react component then add to each view independently.
          May want to have 3 different nav bars for the different users and 
          check what type of user when loading and return different based on which type user is...Seems decently simple to implement */}

          {/* TODO: Integrate Material UI */}
          <Route path='/' element={<Base 
            account={account}
            basePages={basePages}
            loggedInPages={loggedInPages}
            settings={settings} />} />

          {/* TODO: MAKE HOME NOT ACCESSABLE IF USER IS NOT LOGGED IN */}

          {/* TODO: Make home page nicer and more professional. */}
          <Route path='/login' element={<LoginPage />} />

          {/* <Route path='/loggedIn' element={<LoggedIn />} /> */}
          {/* TODO: Classes tab */}
          {/* TODO: Go directly to "Classes display" with  */}
          {/* TODO: When logged in need to be able to view all classes */}
          {/* TODO: Currently Enrolled classes */}

          {/* TODO: View Profile (Probably later on) */}
          {/* TODO: Specific Classes (Probably later on) */}
          {/* TODO: Account Settings (Probably later on) */}


          <Route path="/users/:username/friends" element={<FriendsList />} />

          <Route path="/users" element={<UserSearch 
            pages={loggedInPages}
            settings={settings} />} />

          <Route path='/signUp' element={<SignUpPage />} />
          <Route path="/users/:username" element={<Profile 
            pages={loggedInPages}
            settings={settings} />} />
          <Route path="/accounts/:username" element={<AccountInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
