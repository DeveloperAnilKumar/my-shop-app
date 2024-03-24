import Card from "./Card.jsx";

export default function Cards({ proudcts, category }) {
  return (
    <div
      data-aos="fade-right"
      data-aos-duration="2000"
      className="font-[sans-serif]"
    >
      <div className="p-4 mx-auto lg:max-w-6xl md:max-w-4xl sm:max-w-full">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-12">
          {category}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {proudcts.map((product) => {
            return <Card key={product.id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
}
