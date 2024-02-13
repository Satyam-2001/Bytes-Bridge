import { useTheme } from '@mui/material'

function CustomIcon({ Icon }) {
    const theme = useTheme()
    return <Icon sx={{ color: theme.palette.text.secondary }} fontSize='small' />
}

export default CustomIcon