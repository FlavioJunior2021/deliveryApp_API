import { Container } from "./Style";
import { Order } from "../../types/Order";
import { OrdersBoard } from "../OrdersBoard";

export function Orders() {

  const order = [{
    "_id":"23523523523523523",
    "table": "2",
    "price": 35,
    "status": "WAITING",
    "products":[{
        "_id":"23523523523523523",
        "quantity": 2,
        "product":{
            "name": "Coca Cola",
            "price": 7,
            "imagePath":"1676470202136-coca-cola.png"
        }
    }]
  }]
  const order2 = [{
    "_id":"23523523523523523",
    "table": "2",
    "price": 35,
    "status": "IN_PRODUCTION",
    "products":[{
        "_id":"23523523523523523",
        "quantity": 8,
        "product":{
            "name": "Coca Cola",
            "price": 7,
            "imagePath":"1676470202136-coca-cola.png"
        }
    }]
  }]

  return (
    <Container>
      <OrdersBoard
        icon="🕛"
        title="Fila de espera"
        orders={order}
      />
      <OrdersBoard
        icon="🧑‍🍳"
        title="Em produção"
        orders={order2}
      />
      <OrdersBoard
        icon="✅"
        title="Feito"
        orders={[]}
      />
    </Container>
  )
};
