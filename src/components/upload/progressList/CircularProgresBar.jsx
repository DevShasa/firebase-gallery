import { Box, CircularProgress, Typography } from '@mui/material';


export const CircularProgresBar = ({value}) => {
    return (
        <Box>
            <CircularProgress size={60} thickness={5} variant="determinate" value={value}/>
            <Box sx={{
                position: 'absolute',
                inset: 0,
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Typography variant='caption' component="div" color="white" fontSize="1rem">
                    {Math.round(value)+'%'}
                </Typography>
            </Box>
        </Box>
    )
}
