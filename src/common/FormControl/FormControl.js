import React from 'react';
import styles from './FormControl.module.css'


export const InputType = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
            <div>
                {props.types === "input" ? <input {...input} {...props} /> : <textarea {...input} {...props} />}
            </div>
            {hasError && <span className={styles.errorText}>{meta.error}</span>}
        </div>
    )
}