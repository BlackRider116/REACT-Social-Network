import React from 'react';
import styles from './FormControl.module.css'
import { Field } from "redux-form";
import { Input } from 'antd';
const { TextArea } = Input;

const InputType = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
            {props.types === "input" ? <Input  {...input} {...props} />
                : <TextArea  {...input} {...props} autoSize />}
            {hasError && <span className={styles.errorText}>{meta.error}</span>}
        </div>
    )
}

export const fieldValue = (validate, name, types, placeholder, type) => {
    return <Field
        validate={validate}
        name={name}
        placeholder={placeholder}
        type={type}
        component={InputType}
        types={types}
    />
}