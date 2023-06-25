import React from 'react'
import { useParams } from 'react-router-dom';


interface RouteParams {
    id: string;
    [key: string]: string | undefined;
  }

function BasketPage() {

  const { id } = useParams<RouteParams>();

  return (
    <div>BasketPage</div>
  )
}

export default BasketPage