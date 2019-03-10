import React from 'react';

import classes from './Box.css';
import MarketItem from './MarketItem/MarketItem';

const box = ( props ) => {
    console.log(props);
    let transformedMarketItems = Object.keys( props.marketItems )
        .map( igKey => {
            return [...Array( props.marketItems[igKey] )].map( ( _, i ) => {
                return <MarketItem key={igKey + i} type={igKey} />;
            } );
        } )
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (transformedMarketItems.length === 0) {
        transformedMarketItems = <p>Grab some guns!</p>;
    }
    return (
        <div className={classes.Box}>
            {transformedMarketItems}
        </div>
    );
};

export default box;