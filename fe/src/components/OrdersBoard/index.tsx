import { Order } from "../../types/Order";
import { Bord, OrdersContainer } from "./Style";

type Props = {
  icon: string,
  title: string,
  orders: Order[]
}

export function OrdersBoard({icon, title, orders}: Props) {
  return (
    <Bord>
      <header>
        <span>
          {icon}
        </span>
        <strong>
          {title}
        </strong>
        <span>
          (1)
        </span>
      </header>
      <OrdersContainer>
        <button type="button">
          <strong>
            Mesa 2
          </strong>
          <span>
            2 itens
          </span>
        </button>
      </OrdersContainer>
    </Bord>
  )
};
