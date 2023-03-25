import React from 'react'

export const SellInfoRow = ({
    floorPrice,
    maxQuantity,
    selectedQuantities,
    setSelectedQuantities,
}) => {
    const currentQuantity = selectedQuantities[floorPrice]
    const intFloorPrice = floorPrice === 'null' ? parseInt(floorPrice) : null

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
        <div style={{display: 'flex'}}>
            <div>
                {floorPrice} | {maxQuantity}
            </div>
            
            <div style={{display: 'flex'}}>
                <div onClick={decreaseQuantity}>-</div>
                <div>{currentQuantity}</div>
                <div onClick={increaseQuantity}>+</div>
            </div>
        </div>
    );
}