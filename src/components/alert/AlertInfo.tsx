import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface IProps{
    openMessage:boolean;
    setOpenMessage : (value : boolean) => void;
    resMessage:string;
}
const AlertInfo = ({openMessage,setOpenMessage,resMessage}:IProps)=>{
    return (
        <Snackbar
            open={openMessage}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert
                onClose={() => setOpenMessage(false)}
                severity="error" sx={{ width: '100%' }}>
                {resMessage}
            </Alert>
        </Snackbar>
    )
}
export default AlertInfo;