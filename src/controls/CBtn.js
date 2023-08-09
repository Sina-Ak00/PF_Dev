import React from 'react';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

export default function CBtn(props) {
    const {styls,...other}=props;
    const BootstrapButton = styled(Button)({
        position: 'absolute', right: '10px'
    })
  return (
    <BootstrapButton
    variant={props.variant}
    {...other}
    >{props.text}
    </BootstrapButton>
  )
}
