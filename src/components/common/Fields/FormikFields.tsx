import React from 'react';
import {Checkbox, Form as AntdForm, Input} from 'antd';
import {Field} from 'formik';
import CustomSelect from './CustomSelect';

export type InputPropsType = {
    name: any
    placeholder?: string
    label?: string
    type?: string
    options?: Array<any>
}

function formikField<P>(Component: React.ComponentType<P>): React.FC<InputPropsType> {
    return ({name, label, ...input}) => {
        const getProps = (value: any) => {
            if (input.type === 'checkbox') return {
                ...input,
                checked: value
            }

            return {...input}
        }

        return (
            <Field name={name}>
                {
                    ({field}: any) => (
                        <AntdForm.Item label={label}>
                            <Component {...field} {...getProps(field.value)}/>
                        </AntdForm.Item>
                    )
                }
            </Field>
        )
    }
}

export const FormikInput = formikField(Input);
export const FormikCheckbox = formikField(Checkbox);
export const FormikSelect = formikField(CustomSelect);