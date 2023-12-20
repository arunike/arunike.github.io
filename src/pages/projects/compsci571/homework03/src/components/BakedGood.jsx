import React, { useState } from 'react';

export default function BakedGood(props) {
    const [quantity, setQuantity] = useState(0);

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    }

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(prev => prev - 1);
        }
    }

    const featuredStyles = {
        backgroundColor: '#00CCFF',
        fontWeight: 'bold',
        padding: '15px',
        borderRadius: '10px',
        margin: '10px 0',
        boxShadow: '3px 5px 10px #888888'
    };

    const regularStyles = {
        padding: '15px',
        borderRadius: '10px',
        margin: '10px 0',
        boxShadow: '0 4px 8px #000000'
    };

    const buttonStyle = {
        padding: '5px 10px',
        margin: '0 5px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#AFE1AF',
        color: 'white'
    };

    const bakedGood = props.featured ? featuredStyles : regularStyles;

    return <div style={bakedGood}>
        <h2>{props.name}</h2>
        <p>{props.description}</p>
        <p>${props.price}</p>
        <div>
            <button style={buttonStyle} className="inline" onClick={decreaseQuantity} disabled={quantity <= 0}>-</button>
            <p className="inline">{quantity}</p>
            <button style={buttonStyle} className="inline" onClick={increaseQuantity}>+</button>
        </div>
    </div>
}