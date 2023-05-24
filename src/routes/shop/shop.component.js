import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCategories } from "../../Redux/slice";
import { getCategoriesAndDocuments } from ".././../utils/firebase/firebase.utils";

import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments({});
      dispatch(setCategories(categoriesArray));
    }
    getCategoriesMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  )
}

export default Shop