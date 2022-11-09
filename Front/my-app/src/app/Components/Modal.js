import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import GiannisUndershirt from "../images/GiannisUndershirt.jpeg"
import Grid2 from '@mui/material/Unstable_Grid2';
import CountQuantity, { amount } from './CountQuantity';
import ChooseSize from './ChooseSize';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogsModal() {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [Quantitycount, setQuantitycount] = useState(0)
    const [Size, setSize] = useState("")
    return (
        <div>
            <Button onClick={handleClickOpen}>
                <img src={GiannisUndershirt} className="img-responsive" style={{ width: "70%", margin: "auto" }} alt="nice" />
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <p style={{ textAlign: "center", fontSize: "20px" }}>GiannisUndershirt</p>
                    <p style={{ textAlign: "center", fontSize: "20px" }}>Price: 150</p>

                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                        <Typography gutterBottom>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <div>
                                    <p style={{ fontSize: "20px" }}>Quantity:{Quantitycount} </p>
                                    <input style={{ width: "45%", margin: "auto", blockSize: "30px", fontSize: "15px" }} type={"number"} min={0} max={10} value={Quantitycount} onChange={(e) => setQuantitycount(e.target.value)} />
                                </div>
                                <div style={{padding:"10px"}}>
                                    <form>
                                        <input type="radio" id="small" name="a" value="S" onChange={(e) => setSize(e.target.value)} />
                                        <label style={{fontSize:"20px"}} for="small">Small</label><br></br>
                                        <input type="radio" id="medium" name="a" value="M" onChange={(e) => setSize(e.target.value)} />
                                        <label style={{fontSize:"20px"}} for="medium">Medium</label><br></br>
                                        <input type="radio" id="large" name="a" value="L" onChange={(e) => setSize(e.target.value)} />
                                        <label style={{fontSize:"20px"}} for="large">Large</label><br></br>
                                        <input type="radio" id="xlarge" name="a" value="XL" onChange={(e) => setSize(e.target.value)} />
                                        <label style={{fontSize:"20px"}} for="xlarge">X-Large</label><br></br>
                                        <input type="radio" id="xxlarge" name="a" value="XXL" onChange={(e) => setSize(e.target.value)} />
                                        <label style={{fontSize:"20px"}} for="xxlarge">XX-Large</label>{" "}
                                    </form>
                                </div>

                            </div>

                            <p style={{ fontSize: "20px" }}>
                                Order details:

                                Total Amount:{Quantitycount} <br></br>

                                Size:{Size}
                            </p>
                        </Typography>
                        <Typography gutterBottom>
                            <img src={GiannisUndershirt} className="img-responsive" style={{ width: "70%", margin: "auto" }} alt="nice" />
                        </Typography>
                    </div>
                    <p style={{ fontSize: "15px" }}>Product desc:
                       Giaanis under shirt
                    </p>
                </DialogContent>
                <DialogActions>
                    <Button style={{ fontSize: "large" }} autoFocus onClick={handleClose}>
                        Add to cart
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
