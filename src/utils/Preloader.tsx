import React from 'react';
import loading from "../files/Шторм.gif";

export const Preloader = () => {
    return (
        <>
            <img alt={''} src={loading} style={{marginLeft: '50%', marginTop: '20%'}}/>
        </>
    );
}

export default Preloader;