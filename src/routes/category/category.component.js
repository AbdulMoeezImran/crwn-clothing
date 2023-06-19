import { useEffect, useState, Fragment } from 'react';
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import ProductCard from '../../components/product-card/product-card.component';
import Spinner from "../../components/spinner/spinner.component";
import { CategoryContainer, Title } from "./category.style";

const COLLECTION = gql`
query ($title: String){
    getCollectionsByTitle(title: $title){
      id
      title
      items{
        id
        name
        price
        imageUrl
      }
    }
  }
`

const Category = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const { loading, data } = useQuery(COLLECTION, {
        variables: {
            title: category
        }
    });

    useEffect(() => {
        if (data) {
            const { getCollectionsByTitle: { items } } = data;
            setProducts(items);
        }
    }, [category, data])

    return (
        <Fragment>
            <Title>{category.toUpperCase()}</Title>
            {
                loading ? <Spinner /> :
                    <CategoryContainer>
                        {products && products.map((product) => <ProductCard key={product.id} product={product} />)}
                    </CategoryContainer>
            }
        </Fragment>
    )
}

export default Category