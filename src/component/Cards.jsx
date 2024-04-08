import CardItem from "./CardItem"

export default function Cards({ products, category  }) {
  return (
    <div
    
      className="font-[sans-serif]"
    >
      <div className="p-4 mx-auto lg:max-w-6xl md:max-w-4xl sm:max-w-full">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-12">
          {category}
        </h2>
        <div className="flex justify-evenly gap-8 flex-wrap">
          {products?.map((product) => {
            return <CardItem key={product._id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
}
