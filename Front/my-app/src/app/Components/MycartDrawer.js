import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useDispatch, useSelector } from 'react-redux'
import { GetWishlistAsync } from '../Slicers/getWishlistSlice'
import { selectproductswishlist } from '../Slicers/getWishlistSlice'
import { selectToken } from '../Slicers/loginSlice'
import { GetAllProductsAsync, selectAllprods } from '../Slicers/GetAllProductsSlice'
import { RemoveFromWishlistAsync } from '../Slicers/RemoveFromWishlistSlice';
import { Link, Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MyCartDrawer() {
    const [state, setState] = React.useState({
        right: false,
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const [myCart, setmyCart] = useState([]);
    const [amountCng, setamountCng] = useState(0);
    const token = useSelector(selectToken)
    const [MyPesonalCart, setMyPesonalCart] = useState([])


    // useEffect(() => {
    //     setMyPesonalCart(JSON.parse(localStorage.getItem('MyPersonalCart')));
    // }, [MyPesonalCart.length])

    //run when component load
    useEffect(() => {
        setmyCart(JSON.parse(localStorage.getItem("myCart")));
    }, [myCart.length]);

    // useEffect(() => {
    //     setMyPesonalCart(JSON.parse(localStorage.getItem("MyPesonalCart")));
    // }, [MyPesonalCart.length]);




    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            style={{ backgroundColor: "#DDDDDD" }}
        >

        </Box>
    );

    const notify = () => {
            toast.info('Log in first', {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
    }
    return (
        <div>

            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button style={{ color: "white" }} onClick={toggleDrawer(anchor, true)}>
                        <lord-icon
                            src="https://cdn.lordicon.com/medpcfcy.json"
                            trigger="hover"
                            colors="primary:#ffffff">
                        </lord-icon>
                    </Button>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {list(anchor)}
                        <div>
                            {/* <div>
                                <h1 class="animate__animated animate__backInDown" style={{ textAlign: "center" }}>My cart</h1>
                                <Divider />
                                {console.log(myCart.length)}
                                {console.log(myCart)}
                                {myCart.length > 0 ? myCart.map((prod) =>
                                    <div class="animate__animated animate__backInRight" style={{ fontSize: "15px" }}>
                                        Product: {prod.desc}<br></br>
                                        Price:{prod.price}<br></br>
                                        Amount:{prod.amount}<br></br>
                                        Total:{prod.price * prod.amount}

                                        <Divider />
                                    </div>
                                ) : null}
                            </div>
                            <div style={{ display: "flex", marginTop: "0%", flexDirection: "row", justifyContent: "center" }}>
                                <button class="animate__animated animate__backInUp" style={{ marginTop: "5%", marginBottom: "5%", width: "100%", fontSize: "20px", color: "white", backgroundColor: "dodgerblue" }}>Buy!</button>
                            </div> */}
                            {MyPesonalCart.length > 0 ? MyPesonalCart.map((prod) =>
                                <div>
                                    {prod.desc}


                                </div>
                            ) : null}
                            {token != '' ? <Link to="/final_buy"><button>Final buy</button></Link>:<button onClick={notify}>Buy</button>}
                           
                        </div>
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}
