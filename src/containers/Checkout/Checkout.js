import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
	state = {
		marketItems: null,
		price: 0
	}

	componentWillMount = () => {
		const query = new URLSearchParams(this.props.location.search);
		const marketItems = {};
		let price = 0;
		for (let param of query.entries()) {
			// ['salad', '1']
			if (param[0] === 'price') {
				price = param[1];
			} else {
				marketItems[param[0]] = +param[1];
			}
		}
		this.setState({
			marketItems: marketItems,
			totalPrice: price
		});
	}

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	}

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	}

	render() {
		return (
			<div>
				<CheckoutSummary 
					marketItems={this.state.marketItems}
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutContinued={this.checkoutContinuedHandler}/>
				<Route 
					path={this.props.match.path + '/contact-data'} 
					render={(props) => (<ContactData 
						marketItems={this.state.marketItems} 
						price={this.state.totalPrice} {...props} />)} />
			</div>
		);
	}
}

export default Checkout;