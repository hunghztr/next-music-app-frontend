'use client'
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {SyntheticEvent, useState} from "react";
import {Box} from "@mui/material";
import TabTrack from "@/components/track/tab-track/TabTrack";
import TabInfo from "@/components/track/tab-info/TabInfo";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const UploadTab = () =>{
    const [value, setValue] = useState(0);
    const [trackUpload, setTrackUpload] = useState({
        fileName:'',progress:0,uploadedFileName:''
    })
    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Track" disabled={value!==0} {...a11yProps(0)} />
                    <Tab label="Infomation" disabled={value!==1} {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel  value={value} index={0}>
                <TabTrack setTrackUpload={setTrackUpload} trackUpload={trackUpload} setValue={setValue}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <TabInfo trackUpload={trackUpload} />
            </CustomTabPanel>

        </Box>
    );
}
export default UploadTab;