import React from 'react';

import classes from './Box.css';
import MarketItem from './MarketItem/MarketItem';

const box = ( props ) => {
	console.log(props);
	let transformedMarketItems = Object.keys( props.marketItems )
		.map( itemKey => {
			return [...Array( props.marketItems[itemKey] )].map( ( _, i ) => {
				return <MarketItem key={itemKey + i} type={itemKey} />;
			} );
		} )
		.reduce((arr, el) => {
			return arr.concat(el)
		}, []);
	if (transformedMarketItems.length === 0) {
		transformedMarketItems = <p>Grab some guns!</p>;
	}
	// } else {
	// 	transformedMarketItems = <p>Goooood! Keep buying!</p>
	// }
	return (
		<div className={classes.Box}>
			{transformedMarketItems}
		</div>
	);
};

export default box;