import React from 'react'
import Button from 'react-bootstrap/esm/Button';

export const SellInfoRow = ({
    floorPrice,
    currPrice,
    maxQuantity,
    selectedQuantities,
    setSelectedQuantities,
}) => {
    const currentQuantity = selectedQuantities[floorPrice]

    const increaseQuantity = () => {
        if (currentQuantity + 1 > maxQuantity) return;

        let selectedQuantitiesCopy = JSON.parse(JSON.stringify(selectedQuantities))
        selectedQuantitiesCopy[floorPrice] += 1

        setSelectedQuantities(selectedQuantitiesCopy)
    }; 

    const decreaseQuantity = () => {
        if (currentQuantity -1 < 0) return;

        let selectedQuantitiesCopy = JSON.parse(JSON.stringify(selectedQuantities))
        selectedQuantitiesCopy[floorPrice] -= 1

        setSelectedQuantities(selectedQuantitiesCopy)
    }; 

    return (
        <tr>
            {floorPrice == 'null' ? <td>{currPrice.toFixed(2)}</td> 
            :(parseInt(floorPrice) < currPrice ? ( <td><div style={{display: 'flex', justifyContent: 'center'}}>
                {floorPrice} <div style={{color: 'green'}}> &rarr; {currPrice.toFixed(2)}</div>
            </div></td> ) : (
                <td>{parseInt(floorPrice).toFixed(2)}</td>
            ))
            }
            
            <td>{maxQuantity}</td>
                
            <td>
                <div className='quantity-input-grid'>
                    <Button className="sell-quantity-button" onClick={decreaseQuantity}>-</Button>
                    <div>{currentQuantity}</div>
                    <Button className="sell-quantity-button" onClick={increaseQuantity}>+</Button>
                </div>
            </td>
        </tr>
    );
}