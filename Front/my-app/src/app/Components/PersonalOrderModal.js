import React, { useEffect, useState, useRef } from 'react'
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
import ArgentinaShirt from '../images/ArgentinaShirt.jpeg'
import ArgentinaShirtBack from '../images/ArgentinaShritBack.jpeg'
import ArgentinaCarousel from './ArgentinaCarousel';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
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
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function PersonalModal() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        // clean();
    };

    const [Size, setSize] = useState("")
    const [Quantitycount, setQuantitycount] = useState(0)
    const [BackName, setBackName] = useState("")
    const [BackNumber, setBackNumber] = useState(0)
    const [myCart, setmyCart] = useState([])
    const [amountCng, setamountCng] = useState(0)
    const [Comments, setComments] = useState("")

    // create the data for choosing the patch and handle it.
    const options = [
        { value: '', text: '--Choose an option--' },
        { value: 'empty', text: 'without' },
        { value: 'SpanishLeague', text: 'Spanish League' },
        { value: 'FrenchLeague', text: 'French League' },
        { value: 'ChampionsLeague', text: 'Champions League' },
    ];
    const [selected, setSelected] = useState(options[0].value);

    const handleChange = event => {
        console.log(event.target.value);
        setSelected(event.target.value);
    };

    // Create empty textBox
    const ref = useRef(null);

    const handleClickComments = event => {
        // 👇️ access textarea value
        console.log(ref.current.value);
        setComments(ref.current.value);
    };

    const clean = () => {
        setSize("");
        setQuantitycount(0);
        setBackName("");
        setBackNumber(0);
    }
    // Check if modal is closed to clean the data
    useEffect(() => {
        if (!open) { clean(); }
    }, [open])


    useEffect(() => {
        console.table(myCart);
        localStorage.setItem("myCart", JSON.stringify(myCart));
    }, [myCart.length, amountCng]);

    const addToCart = (item) => {
        let temp = myCart.find((x) => x._id === item._id);
        if (temp) {
            //   console.log(temp);
            temp.amount += item.amount;
            //   console.log(temp);
            setmyCart(myCart);
        } else {
            setmyCart([...myCart, item]);
            localStorage.setItem("myCart", JSON.stringify(myCart));
            // dispatch(sendCart(myCart));
        }
        console.table(myCart);
        localStorage.setItem("myCart", JSON.stringify(myCart));
        // dispatch(sendCart(myCart));
    };

    return (
        <div>
            <Button onClick={handleClickOpen}>
                <img style={{ width: "250px", height: "250px" }} src={ArgentinaShirt}></img>
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <p style={{ fontSize: "20px", textAlign: 'center' }}>Argentina Shirt 2022/2023</p>
                    <p style={{ fontSize: "35px", textAlign: 'center' }}>150₪</p>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div>
                        <div>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                                <div style={{ display: "flex", flexDirection: "column", fontSize: "15px" }}>
                                    <p style={{ fontSize: "15px" }}>Please choose the following:</p>
                                    Name at the back:
                                    <input required placeholder='Choose Name' value={BackName} onChange={(e) => setBackName(e.target.value)} /><br></br>
                                    Number at the back:
                                    <input required style={{ width: "45%", marginLeft: "0px", blockSize: "30px", fontSize: "15px" }} type={"number"} min={0} max={99} value={BackNumber} onChange={(e) => setBackNumber(e.target.value)} /><br></br>
                                    Patch:
                                    <select style={{ marginLeft: "0px", marginRight: "10px" }} value={selected} onChange={handleChange}>
                                        {options.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.text}
                                            </option>
                                        ))}
                                    </select><br></br>
                                    Size:
                                    <div style={{ padding: "10px" }}>
                                        <form>
                                            <input type="radio" id="small" name="check" value="S" onChange={(e) => setSize(e.target.value)} />
                                            <label style={{ fontSize: "20px", paddingRight: "10px" }} htmlFor="small">S</label>
                                            <input type="radio" id="medium" name="check" value="M" onChange={(e) => setSize(e.target.value)} />
                                            <label style={{ fontSize: "20px", paddingRight: "10px" }} htmlFor="medium">M</label>
                                            <input type="radio" id="large" name="check" value="L" onChange={(e) => setSize(e.target.value)} />
                                            <label style={{ fontSize: "20px", paddingRight: "10px" }} htmlFor="large">L</label>
                                            <input type="radio" id="xlarge" name="check" value="XL" onChange={(e) => setSize(e.target.value)} />
                                            <label style={{ fontSize: "20px", paddingRight: "10px" }} htmlFor="xlarge">XL</label>
                                            <input type="radio" id="xxlarge" name="check" value="XXL" onChange={(e) => setSize(e.target.value)} />
                                            <label style={{ fontSize: "20px", paddingRight: "10px" }} htmlFor="xxlarge">XX-L</label>{" "}
                                        </form>
                                    </div>
                                    Quantity:
                                    <input required style={{ width: "45%", marginLeft: "0px", blockSize: "30px", fontSize: "15px" }} type={"number"} min={1} max={10} value={Number(Quantitycount)} onChange={(e) => setQuantitycount(e.target.value)} />
                                </div>
                                <div style={{ paddingLeft: "15px" }}>
                                        <img style={{ width: "250px", height: "250px" }} src={ArgentinaShirt}></img>
                                </div>
                            </div><br></br>
                            <div>
                                <label style={{ fontSize: "15px" }} htmlFor="message">Comments:</label><br></br>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <textarea rows={1} style={{ fontSize: "15px" }} ref={ref} id="message" name="message" />
                                    <button style={{ marginLeft: "10px" }} onClick={handleClickComments}>Save</button>
                                </div>
                            </div>
                            <hr></hr>
                            <div>

                                <p style={{ paddingTop: "0px" }}>Quantity:{Quantitycount}</p>
                                <p style={{ paddingTop: "0px" }}>Price:150 </p>
                                <p>Total: {Quantitycount * 150}₪</p><br></br>
                            </div>
                        </div>
                    </div>
                </DialogContent>

                <Button style={{ fontSize: "large", color: "white", backgroundColor: "#1E90FF" }} onClick={() => addToCart({
                    _id: myCart.length+1,
                    desc: 'argentina shirt',
                    amount: Number(Quantitycount),
                    Number: BackNumber,
                    price: 150,
                    size: Size,
                    patch: selected,
                    comments: Comments,
                })}>
                    {/* onClick={handleClose} */}
                    Add to cart
                </Button>


            </BootstrapDialog>
        </div>
    );
}
