import React from 'react'
import { useTheme } from '@mui/material';
import AsyncSelect from 'react-select/async';
import chroma from 'chroma-js';


function TagSelector({ loadOptions, onChange, value }) {
    const muiTheme = useTheme()
    return (
        <AsyncSelect
            value={value}
            onChange={onChange}
            styles={{
                control: (provided, state) => ({
                    ...provided,
                    boxShadow: "none",
                    backgroundColor: "transparent",
                    width: "100%"
                }),
                option: (provided, { data, isDisabled, isFocused, isSelected }) => ({
                    ...provided,
                    backgroundColor: isDisabled
                        ? undefined
                        : isSelected
                            ? muiTheme.palette.text.primary
                            : isFocused
                                ? muiTheme.palette.background.default
                                : undefined,
                }),
                multiValue: (styles, { data }) => {
                    return {
                        ...styles,
                        backgroundColor: muiTheme.palette.background.default,
                    };
                },
                multiValueLabel: (styles, { data }) => ({
                    ...styles,
                    color: muiTheme.palette.text.primary,
                }),
                multiValueRemove: (styles, { data }) => ({
                    ...styles,
                    color: muiTheme.palette.text.primary,
                    ':hover': {
                        backgroundColor: muiTheme.palette.text.secondary,
                        color: muiTheme.palette.background.default,
                    },
                }),
            }}
            theme={(theme) => ({
                ...theme,
                colors: {
                    ...theme.colors,
                    danger: muiTheme.palette.text.disabled,
                    dangerLight: muiTheme.palette.background.default,
                    neutral0: chroma(muiTheme.palette.background.default).brighten().css(),
                    neutral50: muiTheme.palette.text.primary,
                    neutral80: muiTheme.palette.text.primary,
                    neutral90: muiTheme.palette.text.primary,
                },
            })}
            isMulti
            cacheOptions
            loadOptions={loadOptions}
            defaultOptions />
    )
}

export default TagSelector