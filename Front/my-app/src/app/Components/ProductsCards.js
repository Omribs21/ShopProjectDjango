import React, { useEffect, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import GiannisUndershirt from "../images/GiannisUndershirt.jpeg"
import ADundershirt from "../images/AnthonyDavisUs.jpeg"
import { sendOrderAsync } from '../Slicers/orderSlice';
import { selectToken } from '../Slicers/loginSlice';
import { getProd } from '../API/getProdAPI.js';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { AddToWishlist } from '../API/addToWishlistAPI';
import { AddToWishlistAsync } from '../Slicers/AddToWishlistSlice';
import { addToCart } from '../Slicers/orderSlice';
import { addToWishList } from '../Slicers/AddToWishlistSlice';
import CustomizedDialogsModal from './Modal';
import BasicMenuQuantity from './DashboardQuantity';
import BasicMenuSizes from './DashboardSizes';
import { GetProdByIdAsync } from '../Slicers/GetProdByIdSlice';
import { selectprod } from '../Slicers/GetProdByIdSlice'
import { Key } from '@mui/icons-material';
import { GetAllProductsAsync, selectAllprods } from '../Slicers/GetAllProductsSlice';



const ProductsCards = () => {
    const dispatch = useDispatch()
    const [data, setdata] = useState([])
    const [Wishlist, setWishlist] = useState([])
    const token = useSelector(selectToken)
    const [counter, setcounter] = useState(1);
    const [myCart, setmyCart] = useState([]);
    const [total, settotal] = useState(0);
    const [amountCng, setamountCng] = useState(0);
    const [prod, setprod] = useState([])


    // run when component load
    useEffect(() => {
        setmyCart(JSON.parse(localStorage.getItem("myCart")));
    }, []);

    //run every change in the length of myCart
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
    const PRODUCT = useSelector(selectprod) // returnes single products
    const ALLPRODUCTS = useSelector(selectAllprods) // returnes all of the products from data base
    useEffect(() => {
        // dispatch(GetProdByIdAsync(2));
        dispatch(GetAllProductsAsync())
        // setprod(...prod, PRODUCT)
    }, [])


    return (
        <div style={{ zIndex: 5 }} >
            <br></br><br></br>
            <div style={{ zIndex: 10 }} className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <div key={1} className="panel panel-primary">
                            {console.log(token)}
                            <div style={{ fontSize: "medium" }} className="panel-heading">Giannis Undershirt</div> {/*name of the product */}
                            <div className="panel-body">
                                <img src={GiannisUndershirt} className="img-responsive" style={{ width: "150px", height: "185px", margin: "auto" }} alt="nice" />
                            </div>
                            <div style={{ fontSize: "30px", justifyContent: "space-around" }} className="panel-footer">
                                <button style={{ fontSize: "10px" }} onClick={() => dispatch(AddToWishlistAsync({ "Token": token, "prod_id": 1 }))} type="button" className="btn btn-primary" ><FavoriteBorderIcon style={{ width: "20px", height: "20px" }} ></FavoriteBorderIcon>+</button>
                                <span style={{ padding: "10px", fontSize: "20px" }}>מחיר: 150</span>
                                <button style={{ fontSize: "10px" }} onClick={() => addToCart({
                                    _id: ALLPRODUCTS[0]._id,
                                    desc: ALLPRODUCTS[0].desc,
                                    amount: 1,
                                    price: ALLPRODUCTS[0].price,
                                }

                                )} type="button" className="btn btn-primary" >+<ShoppingBagOutlinedIcon style={{ width: "20px", height: "20px" }}></ShoppingBagOutlinedIcon></button>
                                {/* {() => dispatch(GetProdByIdAsync(Key))} */}
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-3">
                        <div key={2} className="panel panel-primary">
                            <div style={{ fontSize: "medium" }} className="panel-heading">Anthony Davis Undershirt</div> {/*name of the product */}
                            <div className="panel-body"><img src={ADundershirt} className="img-responsive" style={{ width: "150px", height: "185px", margin: "auto" }} alt="nice" /></div>
                            <div style={{ fontSize: "30px", justifyContent: "space-around" }} className="panel-footer">
                                <button style={{ fontSize: "10px" }} onClick={() => dispatch(AddToWishlistAsync({ "Token": token, "prod_id": 2 }))} type="button" className="btn btn-primary" ><FavoriteBorderIcon style={{ width: "20px", height: "20px" }} ></FavoriteBorderIcon>+</button>
                                <span style={{ padding: "10px", fontSize: "20px" }}>מחיר: 150</span>
                                <button style={{ fontSize: "10px" }} onClick={() => addToCart({
                                    _id: ALLPRODUCTS[1]._id,
                                    desc: ALLPRODUCTS[1].desc,
                                    amount: 1,
                                    price: ALLPRODUCTS[1].price,
                                }

                                )} type="button" className="btn btn-primary" >+<ShoppingBagOutlinedIcon style={{ width: "20px", height: "20px" }}></ShoppingBagOutlinedIcon></button>
                                {/* {() => dispatch(GetProdByIdAsync(Key))} */}
                            </div>
                        </div>

                    </div>

                    <div  className="col-sm-3">
                        <div key={3} className="panel panel-primary">
                            <div style={{ fontSize: "medium" }} className="panel-heading">Giannis Undershirt</div> {/*name of the product */}
                            <div className="panel-body">
                                <CustomizedDialogsModal></CustomizedDialogsModal>
                            </div>
                            <div style={{ fontSize: "30px", justifyContent: "space-around" }} className="panel-footer">
                                <button style={{ fontSize: "10px" }} onClick={() => dispatch(AddToWishlistAsync({ "Token": token, "prod_id": 3 }))} type="button" className="btn btn-primary" ><FavoriteBorderIcon style={{ width: "20px", height: "20px" }} ></FavoriteBorderIcon>+</button>
                                <span style={{ padding: "10px", fontSize: "20px" }}>מחיר: 150</span>
                                <button style={{ fontSize: "10px" }} onClick={() => addToCart({
                                    _id: ALLPRODUCTS[2]._id,
                                    desc: ALLPRODUCTS[2].desc,
                                    amount: 1,
                                    price: ALLPRODUCTS[2].price,
                                }

                                )} type="button" className="btn btn-primary" >+<ShoppingBagOutlinedIcon style={{ width: "20px", height: "20px" }}></ShoppingBagOutlinedIcon></button>
                                {/* {() => dispatch(GetProdByIdAsync(Key))} */}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="panel panel-primary">
                            <div style={{ fontSize: "medium" }} className="panel-heading">Giannis Undershirt</div> {/*name of the product */}
                            <div className="panel-body"><img src={GiannisUndershirt} className="img-responsive" style={{ width: "70%", margin: "auto" }} alt="nice" /></div>
                            <div style={{ fontSize: "30px", justifyContent: "space-around" }} className="panel-footer">
                                <button style={{ fontSize: "10px" }} type="button" className="btn btn-primary" ><FavoriteBorderIcon style={{ width: "20px", height: "20px" }} ></FavoriteBorderIcon>+</button>
                                <span style={{ padding: "10px" }}>מחיר: 150</span>
                                <button style={{ fontSize: "10px" }} type="button" className="btn btn-primary" >+<ShoppingBagOutlinedIcon style={{ width: "20px", height: "20px" }}></ShoppingBagOutlinedIcon></button>
                            </div>

                        </div>

                    </div>
                </div>
            </div><br />

            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <div className="panel panel-primary">
                            <div className="panel-heading">BLACK FRIDAY DEAL</div>
                            <div className="panel-body"><img src="https://picsum.photos/100/100" className="img-responsive" style={{ width: "100%" }} alt="nice" /></div>
                            <div className="panel-footer">Buy 50 mobiles and get a gift card</div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="panel panel-primary">
                            <div className="panel-heading">BLACK FRIDAY DEAL</div>
                            <div className="panel-body"><img src="https://picsum.photos/100/100" className="img-responsive" style={{ width: "100%" }} alt="nice" /></div>
                            <div className="panel-footer">Buy 50 mobiles and get a gift card</div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="panel panel-primary">
                            <div className="panel-heading">BLACK FRIDAY DEAL</div>
                            <div className="panel-body"><img src="https://picsum.photos/100/100" className="img-responsive" style={{ width: "100%" }} alt="nice" /></div>
                            <div className="panel-footer">Buy 50 mobiles and get a gift card</div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="panel panel-primary">
                            <div className="panel-heading">BLACK FRIDAY DEAL</div>
                            <div className="panel-body"><img src="https://picsum.photos/100/100" className="img-responsive" style={{ width: "100%" }} alt="nice" /></div>
                            <div className="panel-footer">Buy 50 mobiles and get a gift card</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    )
}


export default ProductsCards