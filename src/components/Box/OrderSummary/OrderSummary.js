import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
	// This could be a functional component, doesn't have to be a class
	componentWillUpdate() {
		console.log('[OrderSummary] WillUpdate');
	}

	render () {
		const marketItemsSummary = Object.keys( this.props.marketItems )
			.map( itemKey => {
				return (
					<li key={itemKey}>
						<span style={{ textTransform: 'capitalize' }}>{itemKey}</span>: {this.props.marketItems[itemKey]}
					</li> );
			} );

		return (
			<Aux>
				<h3>Your Order</h3>
				<p>A delicious box with the following unique items:</p>
				<ul>
					{marketItemsSummary}
				</ul>
				<p><strong>Total price: {this.props.price.toFixed( 2 )} ฿</strong></p>
				<p>Continue to Checkout?</p>
				<Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
				<Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
			</Aux>
		);
	}
}

export default OrderSummary;