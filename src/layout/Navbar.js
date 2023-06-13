import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import axios from "axios";
import {useAuth} from "../context/AuthContext";
import * as IoIcons from "react-icons/io";

function Navbar() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    const userData = useAuth();

    return (
        <>
            <IconContext.Provider value={{color: '#fff'}}>
                <div className='navbar'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar}/>
                    </Link>
                    <h2 className="user-name">{userData?.user?.name} | {userData?.user?.club.name}</h2>
                    <Link style={{textDecoration: 'none'}} to="/" className="menu-bars2">
                        <h2>Football Manager</h2>
                    </Link>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose/>
                            </Link>
                        </li>
                        {(userData?.user?.authorities[0].authority==='ADMIN' && <li className={'nav-text'}>
                        <Link to='/users' >
                            <IoIcons.IoMdPeople />
                            <span>Users</span>
                        </Link>
                    </li>)}
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;