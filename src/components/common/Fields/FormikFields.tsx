import React from 'react';
import {Checkbox, Form as AntdForm, Input} from 'antd';
import {Field} from 'formik';
import CustomSelect from './CustomSelect';
import {FieldProps} from 'formik/dist/Field';
import {FieldMetaProps} from 'formik/dist/types';

type TValidate = (value: string) => string | undefined

export type InputPropsType = {
    name: any
    placeholder?: string
    label?: string
    type?: string
    options?: Array<any>
    validators?: Array<TValidate>
}

function formikField(Component: React.ComponentType<any>): React.FC<InputPropsType> {
    return ({name, label, validators, ...input}) => {
        const getProps = (value: any) => {
            if (input.type === 'checkbox') return {
                ...input,
                checked: value
            }

            return {...input}
        }

        const validate = (value: string) => {
            let errorMessage;

            if (validators && validators.length) {
                for (let validator of validators) {
                    errorMessage = validator(value);

                    if (errorMessage) break;
                }
            }

            return errorMessage;
        };

        const isError = (meta: FieldMetaProps<any>) => meta.touched && meta.error ? 'error' : 'success'

        return (
            <Field name={name} validate={validate}>
                {
                    ({field, meta}: FieldProps) => (
                        <AntdForm.Item
                            label={label}
                            validateStatus={isError(meta)}
                            help={meta.touched && meta.error}
                        >
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