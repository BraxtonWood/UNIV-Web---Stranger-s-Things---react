import { Link } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import { render } from '@testing-library/react';

const Listings = ({posts, setPosts, token}) => {
    //const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState('');
    const [messageId, setMessageId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [display, setDisplay] = useState(posts);
    
    const handleSubmitMessage = async (event) =>{
        event.preventDefault();

        console.log("submitting message", messageId, message, token)
        const response = await fetch(`https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-pt/posts/${messageId}/messages`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              message: {
                content: `${message}`
              }
            })
          }).then(response => response.json())
            .then(result => {
              console.log(result);
            })
            .catch(console.error);
    }
    const postMatches = (post, searchTerm) =>{
        if(searchTerm === ""){
            return post
        }
        else if((post.title.toLowerCase()).includes(searchTerm.toLowerCase())){
            return post
        }
        else if((post.description.toLowerCase()).includes(searchTerm.toLowerCase())){
            return post
        }
    }
    const searchAndDisplay = (event) =>{
        event.preventDefault();
        setDisplay(posts.filter(post => postMatches(post,searchTerm)))
    }
    const renderHelper = () =>{
        if(token){
            return <div className='post-grid'>
            {
                    display.map(post => <div className='post' key={post._id}>
                        <h3>{post.title}</h3>
                        <div>Location: {post.location}</div>
                        <div>Price: ${post.price}</div>
                        <div>Description: {post.description}</div>


                        <form onSubmit={handleSubmitMessage}>
                        <input type="text" placeholder="message" value={message}
                        onChange={(event) => {
                            event.preventDefault();
                            setMessage(event.target.value);
                            //console.log("post", post)
                            setMessageId(post._id);
                        }}></input>
                        <button type="submit" className="submitMessage">Submit Message</button>
                        </form>
                    </div>)
                }
            
            </div>
        }else{
            return<div className='post-grid'>
            {
                    display.map(post => <div className='post' key={post._id}>
                        <h3>{post.title}</h3>
                        <div>Location: {post.location}</div>
                        <div>Price: ${post.price}</div>
                        <div>Description: {post.description}</div>
                        <h4>Sign in to Message Seller</h4>

                        {/* <form onSubmit={handleSubmitMessage}>
                        <input type="text" placeholder="message" value={message}
                        onChange={(event) => {
                            setMessage(event.target.value);
                            setMessageId(event.target._id);
                        }}></input>
                        <button type="submit" className="submitMessage">Submit Message</button>
                        </form> */}
                    </div>)
                }
            
            
            </div>
        }
    }
    console.log(searchTerm);
    // useEffect(() => {
    //     setDisplay(posts);
    // }, [])
    return <>
            <div className='nav'>
                <h1>Listings</h1>
                <Link to="/" className='nav-item'>Home</Link>
                <Link to="/messages" className='nav-item'>Messages</Link>
                <Link to="/user" className='nav-item'>User</Link>
                <Link to="/newListing" className='nav-item'>New Listing</Link>
                <Link to="/manageListings" className='nav-item' >Manage Listings</Link>
            </div>
            <form onSubmit={searchAndDisplay}>
                <input type="text" placeholder="Search" value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}></input>
                <button type="submit" className="submitSearch">Search By Keyword</button>
            </form>
            <button type="button" onClick={()=>{
                setSearchTerm('');
                setDisplay(posts);
                }}>Clear Search</button>
            {renderHelper()}
                
            
        </>
    
    
}
export default Listings;
