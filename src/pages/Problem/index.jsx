import React, { Fragment } from 'react'
import { Box, Paper, Stack, useMediaQuery } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SampleSplitter from "../../utils/SampleSplitter";
import { useResizable } from "react-resizable-layout";
import Discussion from './Discussion';
import Description from './Description';
import Solutions from './Solutions';
import { Outlet } from 'react-router';

function TabPanel(props) {
    const { children, value, index } = props;
    return value === index && (children);
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

function SwippableViewMd({ value, problem, handleChangeIndex }) {
    const theme = useTheme();

    return (
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
        >
            <TabPanel value={value} index={0} dir={theme.direction}>
                <Description problem={problem} />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <Discussion />
            </TabPanel>
        </SwipeableViews>
    )
}

function SwippableViewXS({ value, problem, handleChangeIndex }) {
    const theme = useTheme();

    return (
        <Fragment>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Description problem={problem} />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Solutions />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <Discussion />
                </TabPanel>
            </SwipeableViews>
        </Fragment>)
}

function Prloblem() {
    const theme = useTheme();
    const greaterThanMd = useMediaQuery(theme.breakpoints.up("md"));
    const [value, setValue] = React.useState(0);


    const {
        isDragging,
        position,
        splitterProps
    } = useResizable({
        axis: "x",
        initial: window.screen.width / 2,
        min: window.screen.width / 4,
        max: 3 * window.screen.width / 4
    });


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const problem = {
        title: 'Maximum Non-Decreasing Array Length',
        subject: 'Data Structures & Algorithm',
        votes: 1200,
        content: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to target.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

    

Example 1:

> Input: nums = [2,7,11,15], target = 9  
> Output: [0,1]  
> Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].  

Example 2:

> Input: nums = [3,2,4], target = 6  
> Output: [1,2]  

\`\`\`Python
import numpy
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        index = numpy.argsort(numpy.array(nums))
        
        i,j = 0,len(nums)-1
        while nums[index[i]] + nums[index[j]] != target:
            if nums[index[i]] + nums[index[j]] < target: i+=1
            else: j-=1
        return [index[i],index[j]]
\`\`\`
`,
    }

    const TabItems = ['Problem', 'Solutions', 'Discussion']

    const FinalTabItems = TabItems;

    if (greaterThanMd) {
        FinalTabItems.splice(1, 1);
    }

    return (
        <Fragment>
            <Stack direction='row' height='100%' boxSizing='border-box' >
                <Stack height='100%' p={{ xs: 0, md: 1 }} pr={{ md: 0 }} sx={{ width: { xs: '100%', md: position }, minWidth: { md: position } }} boxSizing='border-box' >
                    <AppBar position="sticky" sx={{ borderRadius: '5px 5px 0px 0px', backgroundColor: theme.palette.background.paper }} >
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="inherit"
                            variant={!greaterThanMd && "fullWidth"}
                            aria-label="full width tabs example"
                        > {
                                FinalTabItems.map((label, index) => {
                                    return <Tab key={label} label={label} style={{ color: theme.palette.text.primary }} {...a11yProps(index)} />
                                })
                            }
                        </Tabs>
                    </AppBar>
                    <Paper elevation={3} sx={{ m: { xs: 1, md: 0 }, height: '100%', borderRadius: { xs: '5px', md: 0 }, boxSizing: 'border-box', overflow: 'auto' }} >
                        <Box className='swippe-box' height='100%' overflow='auto' sx={{ boxSizing: 'border-box' }} >
                            {greaterThanMd ? <SwippableViewMd value={value} handleChangeIndex={handleChangeIndex} problem={problem} /> :
                                <SwippableViewXS value={value} handleChangeIndex={handleChangeIndex} problem={problem} />}
                        </Box>
                    </Paper>
                </ Stack >
                {greaterThanMd && <SampleSplitter isDragging={isDragging} {...splitterProps} />
                }
                <Box height='100%' pl={0} py={1} pr={1} sx={{ borderRadius: '5px', flexGrow: 1, display: { xs: 'none', md: 'block' } }} boxSizing='border-box' >
                    <Paper elevation={3} sx={{ height: '100%' }} >
                        <Box height='100%' overflow='auto'>
                            <Solutions />
                            {/* <Solutions /> */}
                        </Box>
                    </Paper>
                </Box>
            </Stack >
            {/* <SpeedDialOptions /> */}
        </Fragment>
    )
}

export default Prloblem;