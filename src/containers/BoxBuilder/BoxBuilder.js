import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Box from '../../components/Box/Box';
import BuildControls from '../../components/Box/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Box/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const MARKET_ITEM_PRICES = {
    gun: 500,
    drugs: 50,
    alcohol: 25,
    axe: 250,
    humanOrgans: 1000,
    etherum: 0.02
};

class BoxBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        marketItems: null,
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        console.log(this.props);
        axios.get( 'https://black-market-8b185.firebaseio.com/marketItems.json' )
            .then( response => {
                this.setState( { marketItems: response.data } );
            } )
            .catch( error => {
                this.setState( { error: true } );
            } );
    }

    updatePurchaseState ( marketItems ) {
        const sum = Object.keys( marketItems )
            .map( igKey => {
                return marketItems[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState( { purchasable: sum > 0 } );
    }

    addMarketItemHandler = ( type ) => {
        const oldCount = this.state.marketItems[type];
        const updatedCount = oldCount + 1;
        const updatedmarketItems = {
            ...this.state.marketItems
        };
        updatedmarketItems[type] = updatedCount;
        const priceAddition = MARKET_ITEM_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, marketItems: updatedmarketItems } );
        this.updatePurchaseState( updatedmarketItems );
    }

    removeMarketItemHandler = ( type ) => {
        const oldCount = this.state.marketItems[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedmarketItems = {
            ...this.state.marketItems
        };
        updatedmarketItems[type] = updatedCount;
        const priceDeduction = MARKET_ITEM_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState( { totalPrice: newPrice, marketItems: updatedmarketItems } );
        this.updatePurchaseState( updatedmarketItems );
    }

    purchaseHandler = () => {
        this.setState( { purchasing: true } );
    }

    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.marketItems) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.marketItems[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render () {
        const disabledInfo = {
            ...this.state.marketItems
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let box = this.state.error ? <p>Items can't be loaded!</p> : <Spinner />;

        if ( this.state.marketItems ) {
            box = (
                <Aux>
                    <Box marketItems={this.state.marketItems} />
                    <BuildControls
                        marketItemAdded={this.addMarketItemHandler}
                        marketItemRemoved={this.removeMarketItemHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice} />
                </Aux>
            );
            orderSummary = <OrderSummary
                marketItems={this.state.marketItems}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        if ( this.state.loading ) {
            orderSummary = <Spinner />;
        }
        // {salad: true, meat: false, ...}
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {box}
            </Aux>
        );
    }
}

export default withErrorHandler( BoxBuilder, axios );