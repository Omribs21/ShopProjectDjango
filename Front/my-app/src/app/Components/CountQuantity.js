import { fontSize } from '@mui/system';
import React, { useState } from 'react';
import { useEffect } from 'react';

const CountQuantity = () => {

    const [count, setCount] = useState(0);
    const [Quantitycount, setQuantitycount] = useState(0)

    return (
        <div>
            <p style={{fontSize:"15px"}}>Quantity:{count} </p>
            <input style={{ width: "45%", margin: "auto", blockSize: "30px", fontSize: "15px" }} type={"number"}  min={0}max={10} value={Quantitycount} onChange={(e) => setQuantitycount(e.target.value)} />
            <button style={{fontSize:"12px"}} onClick={() => setCount(Quantitycount)}>
                Add
            </button>


        </div>
    )
}

export default CountQuantity
export const amount = (state) => state.Quantitycount;