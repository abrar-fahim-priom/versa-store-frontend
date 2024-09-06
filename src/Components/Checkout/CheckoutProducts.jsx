import { Link } from "react-router-dom";

const CheckoutProducts = ({ item }) => {
  console.log(item);
  const { name, coverImage, currentPrice, slug, category } = item;

  return (
    <div key={name} className="flex gap-2">
      <div className="relative size-16 overflow-hidden rounded-xl">
        <img
          fill
          src={coverImage}
          alt={name}
          className="size-full object-contain object-center"
        />
        <Link className="absolute inset-0" href={`/products/${slug}`} />
      </div>

      <div className="flex grow items-center justify-between">
        <div>
          <h3 className="text-sm font-medium leading-tight">
            <Link href={`/products/${slug}`}>{name}</Link>
          </h3>
          <span className="text-xs text-neutral-500">{category}</span>
        </div>
        <div>
          <span className="text-sm">${currentPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProducts;
