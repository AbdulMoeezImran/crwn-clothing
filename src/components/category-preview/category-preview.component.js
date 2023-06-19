import ProductCard from '../../components/product-card/product-card.component';
import { useSelector } from "react-redux";
import Spinner from '../spinner/spinner.component';
import { selectCategoriesIsPending } from "../../Redux/selector";
import { CategoryPreviewContainer, Title, Preview, } from "./category-preview.style";

const CategoryPreview = ({ title, products }) => {
  const isPending = useSelector(selectCategoriesIsPending)
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      {
        isPending ? <Spinner /> : <Preview>
        {products.slice(0, 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
      }
      
    </CategoryPreviewContainer>
  )
}

export default CategoryPreview