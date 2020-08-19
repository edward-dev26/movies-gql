import React from 'react';
import {Layout} from 'antd';
import style from './Header.module.css';
import Nav from './nav/Nav';

const {Header} = Layout;

const HeaderContainer = () => {
    return (
        <Header className={style.header}>
            <h1>Movies</h1>
            <Nav/>
        </Header>
    )
};

export default HeaderContainer;