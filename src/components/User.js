
import { Link, useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from 'react';

const User = ({token, setToken, posts, username, setUsername}) => {
    //const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    const[userMessage, setUserMessage] = useState('');
    const[userResult, setUserResult] = useState([]);
    console.log(token, "token")
    //console.log('token in User',token);

    
    
    //let navigate = useNavigate();
    // const home = () =>{
    //     navigate("/");
    // }

    const handleSubmitNewAccount = async (event) =>{
        event.preventDefault();
        //console.log("SubmitNewAccount started");
        const response = await fetch('https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-pt/users/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: `${username}`,
                    password:  `${password}`
                }
            })
        }).then(response => response.json())
        .then(result => {
            //console.log(result)
            setUserResult(()=>result);
            if(result.success==true){
                setToken(()=>result.data.token);
                setUserMessage(()=>`Welcome ${username}! ` + result.data.message);
            }
        })
        .catch(console.error);
    }


    const handleSubmitUser = async (event) =>{
        event.preventDefault();
        //console.log(username, password, "username and password to login");
        //console.log("submit user aka sign in init");
        const response = await fetch('https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-pt/users/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: `${username}`,
                    password:  `${password}`
                }
            })
        }).then(response => response.json())
        .then(result => {
            //console.log(result)
            setUserResult(()=>result);
            //console.log(userResult);
             if(result.success==true){
                setToken(()=>result.data.token);
                setUserMessage(()=>`Welcome ${username}! ` + result.data.message);
            };
        })
        .catch(console.error);
    }
    const handleSignOut = (event) =>{
        event.preventDefault();
        //console.log("log out init");
        setUsername('');
        setPassword('');
        setUserMessage('Goodbye');
        setUserResult([]);
        setToken('');

    }
    
    return (<>
        <div className='nav'>
            <h1>User</h1>
            <Link to="/" className='nav-item'>Home</Link>
            <Link to="/messages" className='nav-item'>Messages</Link>
            <Link to="/listings" className='nav-item'>Listings</Link>
            <Link to="/newListing" className='nav-item'>New Listing</Link>
            <Link to="/manageListings" className='nav-item'>Manage Listings</Link>
        </div>

        <h4>{userMessage}</h4>
        
        <h4>Log In</h4>
        <form onSubmit={handleSubmitUser} >
            <input type="text" placeholder="username" value={username}
            onChange={(event) => setUsername(event.target.value)}></input>
            <input type="text" placeholder="password" value={password}
            onChange={(event) => setPassword(event.target.value)}></input>
            <button type="submit" className="submitNewUser">Log In</button>
        </form>


        <h4>--OR--</h4>
        
        
        <h4>Register New Account</h4>
        <form onSubmit={handleSubmitNewAccount}>
            <input type="text" placeholder="username" max='12' value={username}
            onChange={(event) => setUsername(event.target.value)}></input>
            <input type="text" placeholder="password" min='6' max='12' value={password}
            onChange={(event) => setPassword(event.target.value)}></input>
            <input type="text" placeholder="confirm password" min='6' max='12' value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}></input>
            <button type="submit" className="submitNewUser">Submit Username and Password</button>
        </form>

        <button type="button" onClick={handleSignOut}>Log Out</button>
        
       
        </>
    )
}
export default User;