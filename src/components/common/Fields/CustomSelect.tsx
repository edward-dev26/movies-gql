import React from 'react';
import {useField} from 'formik';
import {Select} from 'antd';

type TOption = {
    value: string | number
    title: string
}

type SelectPropsType = {
    name: any
    options: Array<TOption>
    placeholder?: string
    value?: string | number
}

const {Option} = Select;

const CustomSelect: React.FC<SelectPropsType> = ({options = [], name, placeholder, value}) => {
    const [_, __, helpers] = useField(name);
    const handleChange = (value: string | number) => helpers.setValue(value);

    return (
        <Select value={value} onChange={handleChange} placeholder={placeholder}>
            {
                options.map(({value, title}) => (
                    <Option key={value} value={value}>{title}</Option>
                ))
            }
        </Select>
    )
};

export default CustomSelect;