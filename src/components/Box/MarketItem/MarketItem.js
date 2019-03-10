import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './MarketItem.css';
import imageGun from '../../../assets/images/ak47-icon-kalashnikov-machine-gun-260nw-371846962.jpg'
import imageAxe from '../../../assets/images/axe.jpeg'
import imageDrugs from '../../../assets/images/drugs.jpg'

class MarketItem extends Component {
	render () {
		let marketItem = null;
		switch ( this.props.type ) {
			case ( 'axe' ):
				marketItem = <img src={imageAxe}></img>;
				break;
			case ( 'alcohol' ):
				marketItem = <div className={classes.Alcohol}></div>;
				break;
			case ( 'drugs' ):
				marketItem = <img src={imageDrugs}></img>;
				break;
			case ( 'gun' ):
				marketItem = <img src={imageGun}></img>;
				break;
			case ( 'humanOrgans' ):
				marketItem = <div className={classes.HumanOrgans}></div>;
				break;
			case ( 'etherum' ):
				marketItem = <div className={classes.Etherum}></div>;
				break;    
			default:
				marketItem = null;
		}
		return marketItem;
	}
}

MarketItem.propTypes = {
		type: PropTypes.string.isRequired
};

export default MarketItem;