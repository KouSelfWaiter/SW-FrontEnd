import React, { useState, useEffect, CSSProperties } from 'react'
import ClipLoader from "react-spinners/ClipLoader";


function CustomSpinner() {

    let [loading, setLoading] = useState<boolean>(false);
    let [color, setColor] = useState("#ffffff");

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }, [])

    return (
        <>
        {
            loading?
        <ClipLoader

            loading={loading}
            color='#663300'
            size={150}
     
        />
        :
        <h1>Selam</h1>
        }
        </>
    )
}

export default CustomSpinner