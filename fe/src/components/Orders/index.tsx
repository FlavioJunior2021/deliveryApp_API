import { Container } from "./Style";
import { Order } from "../../types/Order";
import { OrdersBoard } from "../OrdersBoard";

export function Orders() {
  return (
    <Container>
      <OrdersBoard
        icon="🕛"
        title="Fila de espera"
        orders={[]}
      />
      <OrdersBoard
        icon="🧑‍🍳"
        title="Em produção"
        orders={[]}
      />
      <OrdersBoard
        icon="✅"
        title="Feito"
        orders={[]}
      />
    </Container>
  )
};
