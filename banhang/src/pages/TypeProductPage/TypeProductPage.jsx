import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";
import { useParams } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";

const TypeProductPage = () => {
  const { type } = useParams();

  const fetchProductType = async () => {
    const res = await ProductService.getProductType(type);
    return res.data;
  };

  const { data: products, isLoading } = useQuery({
    queryKey: ["products-type", type],
    queryFn: fetchProductType,
  });

  return (
    <Row gutter={16}>
      <WrapperNavbar span={4}>
        <NavbarComponent />
      </WrapperNavbar>

      <WrapperProducts span={20}>
        {products?.map((product) => (
          <CardComponent
            key={product._id}
            countInStock={product.countInStock}
            description={product.description}
            image={product.image}
            name={product.name}
            price={product.price}
            rating={product.rating}
            type={product.type}
            discount={product.discount}
            selled={product.selled}
          />
        ))}

        <div style={{ width: "100%", marginTop: 20, textAlign: "center" }}>
          <Pagination
            showQuickJumper
            defaultCurrent={1}
            total={products?.length || 0}
          />
        </div>
      </WrapperProducts>
    </Row>
  );
};

export default TypeProductPage;

console.log(TypeProductPage);