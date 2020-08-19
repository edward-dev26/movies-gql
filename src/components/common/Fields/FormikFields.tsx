import React from 'react';
import {Checkbox, Form as AntdForm, Input, Select} from 'antd';
import {Field} from 'formik';

export type InputPropsType = {
    name: any
    placeholder?: string
    label?: string
    type?: string
}

const formikField = (Component: React.ComponentType): React.FC<InputPropsType> => {
    return ({name, label, ...input}) => {
        return (
            <Field name={name}>
                {
                    ({field}: any) => (
                        <AntdForm.Item label={label}>
                            <Component {...field} {...input}/>
                        </AntdForm.Item>
                    )
                }
            </Field>
        )
    }
};

const {Option} = Select;

const CustomSelect: React.FC = () => {
    return (
        <Select defaultValue="lucy" style={{width: 120}}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
                Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
        </Select>
    )
}

export const FormikInput: React.FC<InputPropsType> = formikField(Input);
export const FormikCheckbox: React.FC<InputPropsType> = formikField(Checkbox);
export const FormikSelect: React.FC<InputPropsType> = formikField(CustomSelect);