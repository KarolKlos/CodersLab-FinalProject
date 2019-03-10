import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './MarketItem.css';

class MarketItem extends Component {
    render () {
        let marketItem = null;
        switch ( this.props.type ) {
            case ( 'axe' ):
                marketItem = <div className={classes.Axe}></div>;
                break;
            case ( 'alcohol' ):
                marketItem = <div className={classes.Alcohol}></div>;
                break;
            case ( 'drugs' ):
                marketItem = <div className={classes.Drugs}></div>;
                break;
            case ( 'gun' ):
                marketItem = <div className={classes.Gun}></div>;
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