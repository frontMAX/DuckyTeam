import { Grid } from '@mui/material';
import { useState } from 'react';
import {Product, useProduct } from '../../contexts/product/ProductContext';
import ProductCard from './ProductCard';

function getRandomProducts(
  products: Product[],
  requestedNumberOfIndicies: number
) {
  const numberOfIndicies = Math.min(requestedNumberOfIndicies, products.length);
  let productsCopy = [...products];
  let randomProducts: Product[] = new Array<Product>(numberOfIndicies);

  for (let i = 0; i < numberOfIndicies; i++) {
    let index = Math.floor(Math.random() * productsCopy.length);
    randomProducts[i] = productsCopy[index];
    productsCopy.splice(index, 1);
  }

  return randomProducts;
}

function PopularDucks() {
  const { products } = useProduct();

  const [popularProducts] = useState(getRandomProducts(products, 3));

  return (
    <Grid
      container
      sx={{ gap: '1rem', alignItems: 'center', justifyContent: 'center' }}
    >
      {!!popularProducts.length &&
        popularProducts.map((product: Product) => (
          <ProductCard key={product._id} product={product} />
        ))}
    </Grid>
  );
}

export default PopularDucks;
