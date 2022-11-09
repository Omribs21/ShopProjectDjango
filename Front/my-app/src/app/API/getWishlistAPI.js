import axios from "axios";

const URL = "http://127.0.0.1:8000/GetWishlist/";

export function GetWishlist(data) {
    console.log(data)
    const newData = {Token:data.Token}
  return new Promise((resolve) =>
    axios.get(URL, {
        headers: {
            'Authorization': `Bearer ${data.Token}`
        }}).then((res) => resolve({ data: res.data }))
    );
}