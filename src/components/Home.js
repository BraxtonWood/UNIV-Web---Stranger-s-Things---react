import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return(
        <div className="nav">
        <h1>Home Page</h1>
        <Link to="/listings" className='nav-item'>Listings</Link>
        <Link to="/messages" className='nav-item'>Messages</Link>
        <Link to="/user" className='nav-item'>User</Link>
        <Link to="/newListing" className='nav-item'>New Listing</Link>
        <Link to="/manageListings" className='nav-item'>Manage Listings</Link>

        </div>
    );
}
export default Home;