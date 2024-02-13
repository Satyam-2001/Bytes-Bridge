const { useEffect, useState, createContext } = require("react");

export const AuthContext = createContext({
    user: {
        id: 0,
        username: '',
        email: '',
        avatar: '',
    },
    signin: () => { },
    signout: () => { },
})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined)

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) setUser(JSON.parse(user))
    }, [])

    const signin = (user, token) => {
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }

    const signout = () => {
        setUser(undefined)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    const authValue = {
        user,
        signin,
        signout,
    }

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    )
}