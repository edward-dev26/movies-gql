import React from 'react';
import style from './FixedButton.module.css';
import {Affix} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {NavLink} from 'react-router-dom';

type PropsType = {
    onClick?: (event: React.MouseEvent) => void,
    path?: string
}

const FixedButton: React.FC<PropsType> = ({onClick, path}) => {
    return (
        <Affix style={{position: 'fixed', bottom: 30, right: 30}}>
            {
                path
                    ? <NavLink to={path} className={style.button}>
                        <PlusOutlined/>
                    </NavLink>
                    : <button onClick={onClick} className={style.button}>
                        <PlusOutlined/>
                    </button>
            }
        </Affix>
    );
};

export default FixedButton;