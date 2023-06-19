import React, { useState, useEffect } from 'react'
import SyncLoader from "react-spinners/SyncLoader";
import "./CustomSpinner.css"


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
                loading ?
                    <div className='spinner-container'>
                        <SyncLoader

                            loading={loading}
                            color='#ffffff'
                            size={50}

                        />
                    </div>
                    :
                    
                    <></>
                    
            }
        </>
    )
}

export default CustomSpinner