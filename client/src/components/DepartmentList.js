import React from 'react';
import {Link} from 'react-router-dom';
import NavBar from './NavBar';
import '../styles/DepartmentList.scss';

const DepartmentList = ({departments}) => (
    <>
        <NavBar />
        {departments.map(department => 
            <div className = "department" key={department.id}> 
                <h1 className="department-name">{department.name}</h1>  
                <Link to={`/departments/${department.id}/products`}>
                    <button className="shop">Shop Now</button>
                </Link>
            </div>
            
        )}
    </>
)

export default DepartmentList;
