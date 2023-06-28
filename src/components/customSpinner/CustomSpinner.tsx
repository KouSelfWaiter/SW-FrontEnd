import React, { useContext } from 'react'
import SyncLoader from "react-spinners/SyncLoader";
import "./CustomSpinner.css"
import LoadingContext from '../../contex/LoadingContext';



function CustomSpinner() {
    const loadingContextData = useContext(LoadingContext)

    return (
        <>
            {
                loadingContextData.loadingProgress ?
                    <div className='spinner-container'>
                        <SyncLoader

                            loading={loadingContextData.loadingProgress}
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