import ProductDescriptiontab from "./ProductDescriptiontab";

const ProductTabs = ({ description }) => {
  return (
    <div className="mb-16">
      <h3 className="mb-3 text-2xl font-semibold dark:text-white">About</h3>
      <div className="divide-y divide-primary/20 border-y border-primary/20 dark:divide-neutral-300 dark:border-neutral-300">
        <ProductDescriptiontab description={description} />
      </div>
    </div>
  );
};

export default ProductTabs;
