import React from 'react';
import styles from './FormControl.module.css'
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import { Input } from 'antd';
import { FieldValidatorType } from '../../utilities/validation/validation';
const { TextArea } = Input;

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}
type PropsType = {
    types: string | undefined 
}

const InputType: React.FC<FormControlPropsType & WrappedFieldProps & PropsType> = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
            {props.types === "input" ? <Input  {...input} {...props} />
                : <TextArea  {...input} {...props} autoSize />}
            {hasError && <span className={styles.errorText}>{meta.error}</span>}
        </div>
    )
}

export function fieldValue(
    validate: Array<FieldValidatorType> | FieldValidatorType,
    name: string,
    types: string | undefined ,
    placeholder: string | undefined ,
    type: string | undefined ) {
    return <Field
        validate={validate}
        name={name}
        placeholder={placeholder}
        type={type}
        component={InputType}
        types={types}
    />
}