import React from "react";
import { Button as MuButton } from "@mui/material";
// import "./Button.css";

export interface ButtonProps {
    label: string;
}

const Button = (props: ButtonProps) => {
    return <MuButton variant="contained">{props.label}</MuButton>;
};

export default Button;