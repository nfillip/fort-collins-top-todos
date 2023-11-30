import Button from "@mui/material/Button";
import {useTheme } from "@mui/material";
export default function Test(){
    const theme = useTheme();
    console.log(theme.palette.primary.main)
    return (
        <>
        <Button
        variant = "contained"
        color = "primary"
        >Helo</Button>

        <Button
        variant = "contained"
        sx = {{bgcolor: "primary.light"}}
        >Helo</Button>
        </>
    )
}