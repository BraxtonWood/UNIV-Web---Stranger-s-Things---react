import {Link} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
const ManageListings = ({token, posts, username, setPosts}) => {
    const [postEditMode, setPostEditMode] = useState(false);
    const[title,setTitle] = useState('');
    const[price,setPrice] = useState('');
    const[description, setDescription] = useState('');
    const[location, setLocation] = useState('');
    const[willDeliver, setWillDeliver] = useState(false);
    //const[messageViewMode, setMessageViewMode] = useState(false);
    const[me, setMe] = useState({})

    const handleWillDeliverCheckbox = () =>{
        if(!willDeliver){
            setWillDeliver(true);
        } else if(willDeliver){
            setWillDeliver(false);
        }
    }
    
    const handleDelete = async (postId) =>{
        console.log("token",token);
        console.log("postId",postId);
        const response = await fetch(`https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-pt/posts/${postId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            }).then(response => response.json())
            .then(result => {
                console.log(result);
                if(result.success){
                    console.log("postId",postId);
                    console.log("posts",posts);

                    const newPosts = posts.filter(post => post._id !==postId);
                    console.log(newPosts);
                    console.log(newPosts);
                    setPosts(newPosts);
                }
                
            })
            .catch(console.error);
    }

    const handleEdit = async (postId) =>{
        const response = await fetch(`http://strangers-things.herokuapp.com/api/2209-ftb-mt-web-pt/posts/${postId}`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              post: {
                title: {title},
                description: {description},
                price: {price},
                location: {location},
                willDeliver: {willDeliver}
              }
            })
          }).then(response => response.json())
            .then(result => {
              console.log(result);
            })
            .catch(console.error);
    }
                
            
    const renderHelper = () =>{
        if(postEditMode ){
            console.log("post Edit mode")
            if(username){
                return <>
                {
                        posts.filter(post => post.author.username == username).map(filteredPosts => (<div className='post' key={filteredPosts._id}>
                            
                            <form onSubmit={handleEdit}>
                                <h3>{filteredPosts.title}</h3>
                                <input type="text" placeholder="New Title" value={title}
                                onChange={(event) => setTitle(event.target.value)}></input>
                                
                                <h3>${filteredPosts.price}</h3>
                                <input type="text" placeholder="New price in $" value={price}
                                onChange={(event) => setPrice(event.target.value)}></input>
                                
                                <h3>{filteredPosts.description}</h3>
                                <input type="text" placeholder=" New Description" value={description}
                                onChange={(event) => setDescription(event.target.value)}></input>
                                
                                <h3>{filteredPosts.location}</h3>
                                <input type="text" placeholder='location' value={location}
                                onChange={(event) => setLocation(event.target.value)}></input>
                                <br></br>
                                <label><input type="checkbox" id='willDeliver' value='willDeliver'
                                onChange={(event) => handleWillDeliverCheckbox()}></input>Will Deliver?</label>
                                <button type="submit" className='submitNewListing'>Submit Edit</button>
                            </form>
                            
                            

                            <button type="button" onClick={()=> {
                                handleDelete(filteredPosts._id)
                            }}>Delete</button>
                        
                        </div>))
                    }
                    </>
            }else{
                return <>
                    <h4>Sign in to Manage Listings</h4>
                </>
            }
    }else if(!postEditMode){
        if(username){
            return <>
            {
                    posts.filter(post => post.author.username == username).map(filteredPosts => (<div className='post' key={filteredPosts._id}>
                        <h3>{filteredPosts.title}</h3>
                        <div>Location: {filteredPosts.location}</div>
                        <div>Price: ${filteredPosts.price}</div>
                        <div>Description: {filteredPosts.description}</div>
                        
                        


                        <button type="button" onClick={()=> {
                            setPostEditMode(true);
                        }}>Edit</button>

                        <button type="button" onClick={()=> {
                            handleDelete(filteredPosts._id)
                        }}>Delete</button>
                    
                    </div>))
                }
                </>
        }else{
            return <>
                <h4>Sign in to Manage Listings</h4>
            </>
        }
    }
    }

    
// useEffect(() => {
//         fetchMe();
//     }, [token])

    return(
        <>
        <div className='nav'>
                <h1>Manage Listings</h1>
                <Link to="/" className='nav-item'>Home</Link>
                <Link to="/messages" className='nav-item'>Messages</Link>
                <Link to="/user" className='nav-item'>User</Link>
                <Link to="/newListing" className='nav-item'>New Listing</Link>
                <Link to="/listings" className='nav-item'>Listings</Link>
            </div>
            {renderHelper()}
                {/* {
                    posts.map(post => <div key={post._id}>
                        <h3>{post.title}</h3>
                        <div>Location: {post.location}</div>
                        <div>Price: ${post.price}</div>
                        <div>Description: {post.description}</div>
                    
                    </div>)
                } */}
        </>
    )
}
export default ManageListings;