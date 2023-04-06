import { shopItemsList } from '../constants';

export const SellTile = ({ name, setItemSelected, price }) => {
  const { seasonType, image } = shopItemsList.find((item) => item.name == name);

  return (
    <div
      className="shop-item "
      onClick={() => {
        setItemSelected(name);
      }}
    >
      <div className="season-label">{seasonType}</div>
      <div
        className={
          (seasonType != '' ? seasonType.toLowerCase() : 'other') + '-item'
        }
      >
        <img src={image} alt="crops" className="item-image"></img>
        <div className="shop-item-name">
          {name + ' - $' + parseFloat(price).toFixed(2)}
        </div>
      </div>
    </div>
  );
};
