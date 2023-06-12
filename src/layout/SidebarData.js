import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Team',
        path: '/team',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
    },
    {
        title: 'Games',
        path: '/games',
        icon: <IoIcons.IoIosFootball/>,
        cName: 'nav-text'
    },
    {
        title: 'Table',
        path: '/table',
        icon: <FaIcons.FaTable />,
        cName: 'nav-text'
    },
    {
        title: 'Transfer Market',
        path: '/players',
        icon: <FaIcons.FaCartPlus />,
        cName: 'nav-text'
    },
    {
        title: 'Users',
        path: '/users',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
    }
];