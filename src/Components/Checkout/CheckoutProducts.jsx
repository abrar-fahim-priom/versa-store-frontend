import { Link } from "react-router-dom";

const CheckoutProducts = ({ item }) => {
  const { name, images, price, discount, _id, selectedType, quantity } = item;

  // Calculate the current price after discount
  const currentPrice = price * (1 - discount / 100);

  return (
    <div key={_id} className="flex gap-2">
      <div className="relative xl:mt-16 size-16 overflow-hidden rounded-xl">
        <img
          src={images[0]?.url}
          alt={name}
          className="size-full object-contain object-center"
        />
        <Link className="absolute inset-0" to={`/products/${_id}`} />
      </div>

      <div className="flex grow items-center justify-between">
        <div>
          <h3 className="text-sm font-medium leading-tight">
            <Link to={`/products/${_id}`}>{name}</Link>
          </h3>
          <span className="text-xs text-neutral-500">{selectedType}</span>
        </div>
        <div>
          <span className="text-sm">${currentPrice.toFixed(2)}</span>
          <span className="text-xs text-neutral-500"> x {quantity}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProducts;
