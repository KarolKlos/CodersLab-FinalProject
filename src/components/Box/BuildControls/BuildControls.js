import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Gun', type: 'gun' },
    { label: 'Drugs', type: 'drugs' },
    { label: 'Alcohol', type: 'alcohol' },
    { label: 'Axe', type: 'axe' },
    { label: 'Etherum', type: 'etherum' },
    { label: 'Human organs', type: 'humanOrgans' },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)} ฿</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.marketItemAdded(ctrl.type)}
                removed={() => props.marketItemRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>ORDER NOW</button>
    </div>
);

export default buildControls;