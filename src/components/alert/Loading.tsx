import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = ({size}:{size:any}) =>{
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                minHeight: size + 20,
            }}
        >
            <CircularProgress size={size} />
        </Box>
    )
}
export default Loading;