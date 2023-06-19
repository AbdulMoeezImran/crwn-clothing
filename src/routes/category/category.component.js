import { useEffect, useState, Fragment } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';
import { selectCategoriesMap, selectCategoriesIsPending } from "../../Redux/selector";
import { CategoryContainer, Title } from "./category.style";

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap)
    const isPending = useSelector(selectCategoriesIsPending)
    const [products, setProducts] = useState(categoriesMap[category])

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return (
        <Fragment>
            <Title>{category.toUpperCase()}</Title>
            {
                isPending ? <Spinner/> : <CategoryContainer>
                    {products && products.map((product) => <ProductCard key={product.id} product={product} />)}
                </CategoryContainer>
            }
        </Fragment>
    )
}

export default Category