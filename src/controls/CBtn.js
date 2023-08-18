import React from 'react';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

export default function CBtn(props) {
    const {styles,...other}=props;
    const BootstrapButton = styled(Button)({
        position: 'absolute', right: '10px'
    })
  return (
    <BootstrapButton
    variant={props.variant}
    style={props.styles}
    {...other}
    >{props.text}
    </BootstrapButton>
  )
}
