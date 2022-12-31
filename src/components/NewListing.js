import { Link, useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from 'react';

const NewListing = ({token, fetchPosts}) => {
    //console.log(token)
    const[title,setTitle] = useState('');
    const[price,setPrice] = useState('');
    const[description, setDescription] = useState('');
    const[location, setLocation] = useState('');
    const[willDeliver, setWillDeliver] = useState(false);
    const[postResult, setPostResult] = useState([]);
    const[postSuccess, setPostSuccess] = useState(false);

    
    const handleWillDeliverCheckbox = () =>{
        if(!willDeliver){
            setWillDeliver(true);
        } else if(willDeliver){
            setWillDeliver(false);
        }
    }

    const renderHelper = (token) =>{
        //console.log(postSuccess,"postSuccess");
        //console.log(token);
        //console.log(postResult);
        if(token && postSuccess){
            console.log(postResult,"post Result");
            let post = postResult.data.post;
            return (<>
            <h4>Preview:</h4>
                        <div className='post'>
                        <h3> {post.title}</h3>
                        <div>Location: {post.location}</div>
                        <div>Price: ${post.price}</div>
                        <div>Description: {post.description}</div>
                        <div>Will Deliver?: {post.willDeliver}</div>
                        <button type="button" onClick={()=>setPostSuccess(false)}>Create Another Post</button>
                    </div>
            </>
            )
        }else if(token){
            return (<>
                <h4>Create New Listing</h4>
                <form onSubmit={handleSubmitNewListing}>
                    <input type="text" placeholder="title" value={title}
                    onChange={(event) => setTitle(event.target.value)}></input>
                    <input type="text" placeholder="price" value={price}
                    onChange={(event) => setPrice(event.target.value)}></input>
                    <input type="text" placeholder="description" value={description}
                    onChange={(event) => setDescription(event.target.value)}></input>
                    <input type="text" placeholder='location' value={location}
                    onChange={(event) => setLocation(event.target.value)}></input>
                    <br></br>
                    <label><input type="checkbox" id='willDeliver' value='willDeliver'
                    onChange={(event) => handleWillDeliverCheckbox()}></input>Will Deliver?</label>
                    <button type="submit" className='submitNewListing'>Post New Listing</button>
                </form>
                </>
                )
            
            
        }else {
            return <>
            <h4>Please Sign in to Create A Listing</h4>
            <Link to="/user">Sign In</Link>
            
            
            </>
        }
    }
    const handleSubmitNewListing = async (event) =>{
        event.preventDefault();
        // console.log("NEW POST")
        // console.log("title", title);
        // console.log("price",price);
        // console.log("description",description);
        // console.log("location",location);
        // console.log("will deliver", willDeliver);
        const response = await fetch( 'https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-pt/posts', {
            method: "POST",
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    title: `${title}`,
                    description: `${description}`,
                    price: `${price}`,
                    willDeliver: `${willDeliver}`
                }
            })
        }).then(response => response.json())
        .then(result => {
            if(result.success){
                console.log(result);
            fetchPosts();   
            setPostResult(()=>result);
            setPostSuccess(()=>true);
            }
            
        })
        .catch(console.error);
        
        
    }

    

return <>
    <div className='nav'>
        <h1>New Listing</h1>
        <Link to="/" className='nav-item'>Home</Link>
        <Link to="/listings" className='nav-item'>Listings</Link>
        <Link to="/messages" className='nav-item'>Messages</Link>
        <Link to="/user" className='nav-item'>User</Link>
        <Link to="/manageListings" className='nav-item'>Manage Listings</Link>
    </div>
    
    {renderHelper(token)}
    {/* <form onSubmit={handleSubmitNewListing}>
        <input type="text" placeholder="title" value={title}
        onChange={(event) => setTitle(event.target.value)}></input>
        <input type="text" placeholder="price" value={price}
        onChange={(event) => setPrice(event.target.value)}></input>
        <input type="text" placeholder="description" value={description}
        onChange={(event) => setDescription(event.target.value)}></input>
        <input type="text" placeholder='location' value={location}
        onChange={(event) => setLocation(event.target.value)}></input>
        <input type="checkbox" id='willDeliver' value='willDeliver'
        onChange={(event) => handleWillDeliverCheckbox()}></input>
            <lable for="willDeliver">Will Deliver?</lable>
        <button type="submit" className='submitNewListing'>Post New Listing</button>
    
    
    
    
    </form> */}
    </>
}

export default NewListing;





