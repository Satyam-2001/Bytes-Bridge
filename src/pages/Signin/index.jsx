import React, { Fragment, useContext, useState } from 'react'
import { Stack, Box, Typography, Paper, Avatar, Snackbar, Alert } from '@mui/material'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import PasswordInput from '../../utils/PasswordInput';
import { useFormik } from 'formik'
import { signInSchema, validateUsername, validateEmail } from '../../schemas/auth';
import { callAPI } from '../../services/callAPI';
import AuthBox from '../../UI/AuthBox';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Signin = (props) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { signin } = useContext(AuthContext)

    const signInHandler = async (values) => {
        try {
            const data = await callAPI('post', 'user/signin', values)
            signin(data.user, data.token)
            if (searchParams.has('next')) {
                navigate(decodeURIComponent(searchParams.get('next')))
            }
            else {
                navigate('/')
            }
            // setAuthValues(values)
        }
        catch (e) {
            throw e;
        }
    }

    const initialValues = {
        username_or_email: "",
        password: "",
    };

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, status } =
        useFormik({
            initialValues,
            validationSchema: signInSchema,
            validateOnChange: true,
            validateOnBlur: false,
            //// By disabling validation onChange and onBlur formik will validate on submit.
            onSubmit: async (values, action) => {
                try {
                    const { username_or_email, password } = values
                    let user = { password }
                    if (validateEmail(username_or_email)) {
                        user['email'] = username_or_email
                    }
                    else {
                        user['username'] = username_or_email
                    }
                    await signInHandler(user)
                    action.resetForm();
                }
                catch (e) {
                    action.setStatus(e.response.data.msg || 'Unknown error occured')
                }

            },
        });

    // console.log(values, errors)

    return (
        <AuthBox title='Sign In' onSubmit={handleSubmit}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="username_or_email"
                label="Username or email"
                name="username_or_email"
                value={values.username_or_email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.username_or_email && touched.username_or_email}
            />
            {errors.username_or_email && touched.username_or_email && (
                <Typography color='error'>
                    {errors.username_or_email}
                </Typography>
            )}
            <PasswordInput
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password && touched.password}
            />
            {errors.password && touched.password && (
                <Typography color='error'>
                    {errors.password}
                </Typography>
            )}
            {status && (
                <Typography color='error'>
                    {status}
                </Typography>
            )}
        </AuthBox>
    )
}

export default Signin