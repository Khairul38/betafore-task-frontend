import ProductCard from "@/components/ui/ProductCard";
import { IProduct } from "@/types/globalTypes";
import { promises as fs } from "fs";

const HomePage = async () => {
  const data = await fs.readFile(process.cwd() + "/products.json", "utf8");
  const products: IProduct[] = JSON.parse(data);

  return (
    <div>
      {/* Featured Products */}
      <div className="pt-24 pb-10">
        <div className="text-center dark:text-white pb-8">
          <p className="text-4xl font-bold mb-2">Featured Products</p>
          <p>Check & Get Your Desire Product!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-14 px-8 max-w-screen-2xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
