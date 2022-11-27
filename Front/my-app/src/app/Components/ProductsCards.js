import React, { useEffect, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import GiannisUndershirt from "../images/GiannisUndershirt.jpeg"
import { selectToken } from '../Slicers/loginSlice';
import { useDispatch, useSelector } from "react-redux";
import { AddToWishlistAsync } from '../Slicers/AddToWishlistSlice';
import CustomizedDialogsModal from './Modal';
import { selectprod } from '../Slicers/GetProdByIdSlice'
import { GetAllProductsAsync, selectAllprods } from '../Slicers/GetAllProductsSlice';
import CustomizedDialogs from './TermsOfService';
import ContactUs from './ContactUs';
import ReturnPolicy from './ReturnPolicy';
import MessiModal from './Modal2';
import NestedModal from './PersonalOrderModal';
import PersonalModal from './PersonalOrderModal';

const ProductsCards = () => {
    const dispatch = useDispatch()
    const token = useSelector(selectToken)
    const [myCart, setmyCart] = useState([]);
    const [amountCng, setamountCng] = useState(0);

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
            temp.amount += item.amount;
            setamountCng(amountCng + item.amount);
            //   console.log(temp);
            setmyCart(myCart);
        } else {
            setmyCart([...myCart, item]);
            localStorage.setItem("myCart", JSON.stringify(myCart));
            setamountCng(amountCng + 1);
            // dispatch(sendCart(myCart));
        }
        localStorage.setItem("myCart", JSON.stringify(myCart));
        // dispatch(sendCart(myCart));
    };
    const PRODUCT = useSelector(selectprod) // returnes single products
    const ALLPRODUCTS = useSelector(selectAllprods) // returnes all of the products from data base

    useEffect(() => {
        dispatch(GetAllProductsAsync())
    }, [])

    // update the amount of products in the cart.
    // useEffect(() => {
    //     console.log(amountCng)
    // },[myCart.length, amountCng])
    const button = document.getElementById("wishlist-btn")

    // useEffect(() => {
    //     button.addEventListener("click", () => {
    //        alert('stop');
    //     })
    // }, [])



    return (
        <div class="header" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", justifyContent: "space-evenly" }} >
            <br></br><br></br>

            <div style={{ zIndex: 10, marginBottom: "0%" }} className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <div key={1} className="panel panel-primary">
                            <div style={{ fontSize: "medium" }} className="panel-heading">Giannis Undershirt</div> {/*name of the product */}
                            <div className="panel-body">
                                <img src={GiannisUndershirt} className="img-responsive" style={{ width: "150px", height: "185px", margin: "auto" }} alt="nice" />
                            </div>
                            <div style={{ fontSize: "30px", justifyContent: "space-around" }} className="panel-footer">
                                <button id='wishlist-btn' style={{ fontSize: "10px" }} onClick={() => dispatch(AddToWishlistAsync({ "Token": token, "prod_id": 1 }))} type="button" className="btn btn-primary" ><FavoriteBorderIcon style={{ width: "20px", height: "20px" }} ></FavoriteBorderIcon>+</button>
                                <span style={{ padding: "10px", fontSize: "20px", color: "black" }}>מחיר: 150</span>
                                <button style={{ fontSize: "10px" }} onClick={() => addToCart({
                                    _id: ALLPRODUCTS[0]._id,
                                    desc: ALLPRODUCTS[0].desc,
                                    amount: 1,
                                    price: ALLPRODUCTS[0].price,
                                })} type="button" className="btn btn-primary" >+<ShoppingBagOutlinedIcon style={{ width: "20px", height: "20px" }}></ShoppingBagOutlinedIcon></button>
                                {/* {() => dispatch(GetProdByIdAsync(Key))} */}
                            </div>
                        </div>
                    </div>
                    {/* <button onClick={() => console.table(myCart)}>show cart</button>                */}

                    <div className="col-sm-3">
                        <div key={2} className="panel panel-primary">
                            <div style={{ fontSize: "medium" }} className="panel-heading">Messi shirt</div> {/*name of the product */}
                            <div className="panel-body">
                                {/* <img src={ADundershirt} className="img-responsive" style={{ width: "150px", height: "185px", margin: "auto" }} alt="nice" /> */}
                                <MessiModal></MessiModal>
                            </div>
                            <div style={{ fontSize: "30px", justifyContent: "space-around" }} className="panel-footer">
                                <button style={{ fontSize: "10px" }} onClick={() => dispatch(AddToWishlistAsync({ "Token": token, "prod_id": 2 }))} type="button" className="btn btn-primary" ><FavoriteBorderIcon style={{ width: "20px", height: "20px" }} ></FavoriteBorderIcon>+</button>
                                <span style={{ padding: "10px", fontSize: "20px", color: "black" }}>מחיר: 150</span>
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
                    {/* COMPLETE CARD! ID=3 */}
                    <div className="col-sm-3">
                        <div key={3} className="panel panel-primary">
                            <div style={{ fontSize: "medium" }} className="panel-heading">Giannis Undershirt</div> {/*name of the product */}
                            <div className="panel-body">
                                <CustomizedDialogsModal></CustomizedDialogsModal>
                            </div>
                            <div style={{ fontSize: "30px", justifyContent: "space-around" }} className="panel-footer">
                                <button style={{ fontSize: "10px" }} onClick={() => dispatch(AddToWishlistAsync({ "Token": token, "prod_id": 3 }))} type="button" className="btn btn-primary" ><FavoriteBorderIcon style={{ width: "20px", height: "20px" }} ></FavoriteBorderIcon>+</button>
                                <span style={{ padding: "10px", fontSize: "20px", color: "black" }}>מחיר: 150</span>
                                <button style={{ fontSize: "10px" }} onClick={() => addToCart({
                                    _id: ALLPRODUCTS[2]._id,
                                    desc: ALLPRODUCTS[2].desc,
                                    amount: 1,
                                    price: ALLPRODUCTS[2].price,
                                })} type="button" className="btn btn-primary" >+<ShoppingBagOutlinedIcon style={{ width: "20px", height: "20px" }}></ShoppingBagOutlinedIcon></button>
                                {/* {() => dispatch(GetProdByIdAsync(Key))} */}
                            </div>
                        </div>
                    </div>
                    {/* COMPLETE CARD! ID=4 */}
                    <div className="col-sm-3">
                        <div key={4} className="panel panel-primary">
                            <div style={{ fontSize: "medium" }} className="panel-heading">Lebron James Undershirt</div> {/*name of the product */}
                            <div className="panel-body">
                                {/* <LebronJamesModal></LebronJamesModal> */}
                            </div>
                            <div style={{ fontSize: "30px", justifyContent: "space-around" }} className="panel-footer">
                                <button style={{ fontSize: "10px" }} onClick={() => dispatch(AddToWishlistAsync({ "Token": token, "prod_id": 3 }))} type="button" className="btn btn-primary" ><FavoriteBorderIcon style={{ width: "20px", height: "20px" }} ></FavoriteBorderIcon>+</button>
                                <span style={{ padding: "10px", fontSize: "20px", color: "black" }}>price: 200</span>
                                <button style={{ fontSize: "10px" }} onClick={() => addToCart({
                                    _id: ALLPRODUCTS[3]._id,
                                    desc: ALLPRODUCTS[3].desc,
                                    amount: 1,
                                    price: ALLPRODUCTS[3].price,
                                })} type="button" className="btn btn-primary" >+<ShoppingBagOutlinedIcon style={{ width: "20px", height: "20px" }}></ShoppingBagOutlinedIcon></button>
                                {/* {() => dispatch(GetProdByIdAsync(Key))} */}
                            </div>
                        </div>
                    </div>
                </div>
                <br />

                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="panel panel-primary">
                                <div className="panel-heading" style={{color:"white",fontSize: "medium"}}>Argentina 2022/2023</div>
                                <div className="panel-body"><PersonalModal></PersonalModal></div>
                                <div style={{color:"black", fontSize:"25px"}} className="panel-footer">150.00₪</div>
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
            <div style={{ height: "200px", marginTop: "0%" }}>
                <hr style={{ color: "white", backgroundColor: "white", height: "3px", marginTop: "60em" }}></hr>
                <CustomizedDialogs />
                <hr style={{ color: "white", backgroundColor: "white", height: "3px", marginTop: "0em" }}></hr>
                <ContactUs />
                <hr style={{ color: "white", backgroundColor: "white", height: "3px", marginTop: "0em" }}></hr>
                <ReturnPolicy />
            </div>
        </div>

    )
}


export default ProductsCards