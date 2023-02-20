import { useState } from "react";
import { Order } from "../../types/Order";
import { Modal } from "../Modal";
import { Orders } from "../Orders";
import { Bord, OrdersContainer } from "./Style";

type Props = {
  icon: string,
  title: string,
  orders: Order[]
}

export function OrdersBoard({ icon, title, orders }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);

  function handleOpenModal(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  return (
    <Bord>
      <Modal
        visible={isModalVisible}
        order={selectedOrder}
      />
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>
      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map((order) => (
            <button type="button" key={order._id} onClick={() => handleOpenModal(order)}>
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Bord>
  )
};
