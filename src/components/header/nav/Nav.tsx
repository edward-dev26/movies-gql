import React from 'react';
import {NavLink} from 'react-router-dom';
import style from '../Header.module.css';

const Nav = () => {
    const links = [
        {path: '/', title: 'Movies', exact: true},
        {path: '/directors', title: 'Directors'}
    ];

    return (
        <nav className={style.nav}>
            <ul>
                {
                    links.map(link => (
                        <li key={link.path}>
                            <NavLink to={link.path} activeClassName={style.active} exact={link.exact}>
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