import * as Yup from "yup";

const usernameRegex = /^[A-Za-z0-9_-]*$/;
const passwordRegex = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/

export const signUpSchema = Yup.object({
    username: Yup.string().required("Please enter your username").matches(usernameRegex, 'The username must contain only letters, numbers, hyphens and underscores.').min(2, 'Username is too short').max(20, 'Username is too big'),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().required("Please enter your password").matches(passwordRegex, "Password must contain at least 8 characters, one uppercase, one number and one special case character"),
    confirm_password: Yup.string()
        .required("Please enter your password again")
        .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const signInSchema = Yup.object({
    username_or_email: Yup.string().required("Please enter your username or email").test('username_or_email', 'Username or Email is invalid', (value) => {
        return validateEmail(value) || validateUsername(value);
    }),
    password: Yup.string().required("Please enter your password").matches(passwordRegex, "Password must contain at least 8 characters, one uppercase, one number and one special case character"),
});


export const validateEmail = (email) => {
    return Yup.string().email().isValidSync(email)
};

export const validateUsername = (username) => {
    return Yup.string().matches(usernameRegex, 'The username must contain only letters, numbers, hyphens and underscores.').min(2, 'Username is too short').max(20, 'Username is too big').isValidSync(username);
};