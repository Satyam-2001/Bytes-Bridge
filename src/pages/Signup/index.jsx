import React, { Fragment, useContext, useState } from 'react'
import { Stack, Box, Typography, Paper, Avatar, Snackbar, Alert } from '@mui/material'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import logo from '../../assets/logo.png'
import PasswordInput from '../../utils/PasswordInput';
import { useFormik } from 'formik'
import { signUpSchema } from '../../schemas/auth';
import { callAPI } from '../../services/callAPI';
import AuthBox from '../../UI/AuthBox';
import OTPInput from 'react-otp-input';
import './index.css'
import { OTPSchema } from '../../schemas/otp';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const OTPForm = (props) => {
    const initialValues = {
        otp: ''
    }

    const { values, handleSubmit, errors, touched, setFieldValue } =
        useFormik({
            initialValues,
            validationSchema: OTPSchema,
            validateOnChange: true,
            validateOnBlur: false,
            //// By disabling validation onChange and onBlur formik will validate on submit.
            onSubmit: async (values, action) => {
                try {
                    const data = await props.onSubmit(values)
                    action.resetForm()
                }
                catch (e) {
                    action.setFieldError('otp', e.response.data.msg || 'Unknown error occured')
                }
                // callAPI('post', 'signup/otp', values).then(console.log)
                //// to get rid of all the values after submitting the form
            },
        });

    return (
        <AuthBox title={'Verify OTP'} onSubmit={handleSubmit}>
            <Typography variant='h6'>
                We've sent you a code via email.
            </Typography>
            <Typography variant='h6' >
                To complete the verification process please enter the 4 digit code below.
            </Typography>
            <OTPInput
                inputStyle="inputStyle"
                numInputs={4}
                onChange={(value) => setFieldValue('otp', value)}
                renderSeparator={<span> </span>}
                value={values.otp}
                inputType={'number'}
                renderInput={(props) => <input name='otp' {...props} />}
                shouldAutoFocus
            />
            {errors.otp && touched.otp && (
                <Typography color='error'>
                    {errors.otp}
                </Typography>
            )}
            <Button sx={{ margin: 1 }} onClick={props.resendOTPHandler}>
                Resend
            </Button>
        </AuthBox>
    )
}

const SignUpForm = (props) => {
    const initialValues = {
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    };

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: signUpSchema,
            validateOnChange: true,
            validateOnBlur: false,
            //// By disabling validation onChange and onBlur formik will validate on submit.
            onSubmit: async (values, action) => {
                try {
                    const user_data = { ...values }
                    delete user_data.confirm_password
                    await props.onSubmit(user_data)
                    action.resetForm();
                }
                catch (e) {
                    if (e.response?.status === 406) {
                        action.setErrors(e.response.data)
                    }
                }
            },
        });

    return (
        <AuthBox title='Sign Up' onSubmit={handleSubmit}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.username && touched.username}
                autoFocus
            />
            {errors.username && touched.username && (
                <Typography color='error'>
                    {errors.username}
                </Typography>
            )}
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email && touched.email}
            />
            {errors.email && touched.email && (
                <Typography color='error'>
                    {errors.email}
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
            <PasswordInput
                required
                fullWidth
                id="confirm_password"
                label="Confirm Password"
                name="confirm_password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.confirm_password && touched.confirm_password}
            />
            {errors.confirm_password && touched.confirm_password && (
                <Typography color='error'>
                    {errors.confirm_password}
                </Typography>
            )}
        </AuthBox>
    )
}

const Signup = (props) => {
    const { signin } = useContext(AuthContext)

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [authValues, setAuthValues] = useState(undefined)
    const [snackBarMessage, setSnackBarMessage] = useState()

    const signUpHandler = async (values) => {
        try {
            const data = await callAPI('post', 'user/otp', values)
            setAuthValues(values)
        }
        catch (e) {
            throw e
        }
    }

    const resendOTPHandler = async () => {
        try {
            const data = await callAPI('post', 'user/otp/resend', authValues)
            setSnackBarMessage('OTP has been sent successfully!')
        }
        catch (e) {
            setSnackBarMessage('An error occured in sending OTP!')
        }
    }

    const verifyOTPHandler = async (values) => {
        try {
            const data = await callAPI('post', 'user/signup', { ...authValues, otp: values.otp })
            signin(data.user, data.token)
            if (searchParams.has('next')) {
                navigate(decodeURIComponent(searchParams.get('next')))
            }
            else {
                navigate('/')
            }
        }
        catch (e) {
            console.log(e)
            throw e;
        }
    }



    const handleClose = () => {
        setSnackBarMessage(false)
    }

    return (
        <Fragment>
            {!authValues ? <SignUpForm onSubmit={signUpHandler} /> : <OTPForm onSubmit={verifyOTPHandler} resendOTPHandler={resendOTPHandler} />}
            <Snackbar
                autoHideDuration={5000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={Boolean(snackBarMessage)}
                onClose={handleClose}
                message={snackBarMessage}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </Fragment>
    )
}

export default Signup