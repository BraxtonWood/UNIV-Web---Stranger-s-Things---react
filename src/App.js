import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from "./components/Home";
import Listings from "./components/Listings";
import Messages from "./components/Messages";
import User from "./components/User";
import NewListing from "./components/NewListing";
import ManageListings from './components/ManageListings';
import React, {useEffect, useState} from 'react';
function App() {
  const [token, setToken] = useState('');
  const [posts, setPosts] = useState([]);
  const[username, setUsername] = useState('');
  const fetchPosts = async () => {
        const response = await fetch('https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-pt/posts');
        //console.log("response", response);
        const data = await response.json();
        //console.log('data', data);
        //let interimData = data;
        //console.log(interimData.data.posts)
        setPosts(data.data.posts);
        console.log(data);
        
    }
  
  
  
  useEffect(() => {

    
    fetchPosts();

    //console.log("interimdata",interimData);
    
}, [token])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />

        <Route path="listings" element={ <Listings posts={posts} setPosts={setPosts} token={token}/> } />

        <Route path="messages" element={ <Messages token={token} setToken={setToken}/> } />

        <Route path="user" element={ <User token={token} setToken={setToken} posts={posts} 
        username={username} setUsername={setUsername}/> } /> 

        <Route path="newListing" element={<NewListing token={token} fetchPosts={fetchPosts}/>}/>

        <Route path="manageListings" element={<ManageListings token={token} posts={posts} 
        username={username} setPosts={setPosts}
        />} />

        
        
      </Routes>
      
    </div>
  );
}

export default App;
