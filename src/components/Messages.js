import { Link } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
const Messages = ({token}) => {
    //const[me, setMe] = useState([]);
    const[messages, setMessages] = useState([]);
    //console.log(me.messages)
    const fetchMe = async () =>{
        const response = await fetch('https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-pt/users/me', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          }).then(response => response.json())
            .then(result => {
              console.log(result);
              setMessages(result.data.messages);
            })
            .catch(console.error);
          
    }

    const renderHelper = () =>{
        if(token){
            console.log("messages",messages);
            return <>
                {messages.map(message => <div className='post'>
                    <h3>From: {message.fromUser.username}</h3>
                    <div>Message: {message.content}</div>
                </div>)}
            
            </>
   
        }else{
            return <>
            <h4>Sign in to View Messages</h4>
            </>
        }}
    
    useEffect(() => {
            fetchMe();
        }, [token])
    return (<>
        <div className='nav'>
            <h1>Messages</h1>
            <Link to="/" className='nav-item'>Home</Link>
            <Link to="/listings" className='nav-item'>Listings</Link>
            <Link to="/user" className='nav-item'>User</Link>
            <Link to="/newListing" className='nav-item'>NewListing</Link>
            <Link to="/manageListings" className='nav-item'>Manage Listings</Link>
        </div>
        {renderHelper()}
        
        
    </>
    )
}
export default Messages;