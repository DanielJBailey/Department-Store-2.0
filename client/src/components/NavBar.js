import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/NavBar.scss';

const NavBar = () => (
    <div className="navigation">
        <Link to="/">Home</Link>
    </div>
)

export default NavBar;