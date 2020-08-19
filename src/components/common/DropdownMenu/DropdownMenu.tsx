import React from 'react';
import style from './DropdownMenu.module.css';
import {Dropdown, Menu} from 'antd';
import {EllipsisOutlined} from '@ant-design/icons';
import {NavLink} from 'react-router-dom';

export type TMenuItems = {
    title: string
    action?: () => void
    path?: string
}

type PropsType = {
    menuItems: Array<TMenuItems>
}

const DropdownMenu: React.FC<PropsType> = ({menuItems}) => {
    const menu = (
        <Menu className={style.dropdown__menu}>
            {
                menuItems.map(item => (
                    <Menu.Item key={item.title} onClick={item.action}>
                        {
                            item.path
                                ? <NavLink to={item.path}>{item.title}</NavLink>
                                : item.title
                        }
                    </Menu.Item>
                ))
            }
        </Menu>
    )


    return (
        <Dropdown className={style.dropdown} overlay={menu} placement='bottomCenter' arrow>
            <EllipsisOutlined className={style.dropdown__icon}/>
        </Dropdown>
    )
};

export default DropdownMenu;