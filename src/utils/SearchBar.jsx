import { Box, InputAdornment, styled, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderWidth: '1px',
        },
    },
});

const SearchBar = ({ value, setValue, placeholder }) => {
    return (
        <Box flexGrow={1} px={1}>
            <CssTextField
                fullWidth
                type="search"
                size='small'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoComplete="false"
                placeholder={placeholder}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </Box>)
}

export default SearchBar