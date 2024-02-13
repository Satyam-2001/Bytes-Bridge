import React from 'react'
import { Stack } from '@mui/material'
import CustomIcon from './CustomIcon';
import FormatValue from './FoematValue';

function IconView({ Icon, value }) {

    return (
        <Stack direction='row' alignItems='center' justifyContent={'flex-end'} gap={1}>
            <CustomIcon Icon={Icon} />
            <FormatValue value={value} />
        </Stack>)
}

export default IconView