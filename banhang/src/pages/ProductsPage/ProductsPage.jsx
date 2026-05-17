
import { useQuery } from "@tanstack/react-query";
import CardComponent from "../../components/CardComponent/CardComponent";
import * as ProductService from "../../services/ProductService";
import { WrapperProducts } from "./style";

const ProductsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => ProductService.getAllProduct("", 20),
  });

  if (isLoading) {
    return <div>Đang tải sản phẩm...</div>;
  }

  return (
    <div style={{ padding: "0 120px" }}>
      <WrapperProducts>
        {data?.data?.map((product) => (
          <CardComponent key={product._id} product={product} />
        ))}
      </WrapperProducts>
    </div>
  );
};

export default ProductsPage;

console.log(ProductsPage);

