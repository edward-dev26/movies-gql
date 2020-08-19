import React from 'react';
import {NavLink} from 'react-router-dom';
import style from '../Header.module.css';

const Nav = () => {
    const links = [
        {path: '/movies', title: 'Movies'},
        {path: '/directors', title: 'Directors'}
    ];

    return (
        <nav className={style.nav}>
            <ul>
                {
                    links.map(link => (
                        <li key={link.path}>
                            <NavLink to={link.path} activeClassName={style.active}>
                                {link.title}
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
}

export default Nav;