import React from "react";
import preloader from '../../../images/preloader.gif'

let Preloader = (props) => {
    return (
        <div>
            <img src={preloader} alt="preloader"  style={{width:'100%', height: '100%', objectFit: 'cover'}}/>
        </div>
    )
}

export default Preloader;