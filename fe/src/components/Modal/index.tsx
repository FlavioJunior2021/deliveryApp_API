import { ModalBody, OrdersDetails, Overlay } from "./Style";
import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from "../../types/Order";
import { formatCurrency } from "../../utils/formatCurrency";

type Props = {
  visible: boolean,
  order: Order | null,
};

export function Modal({visible, order}: Props){
  if(!visible || !order){
    return null;
  }
  return(
    <Overlay>
     <ModalBody>
      <header>
        <strong>Mesa {order.table}</strong>
        <button type="button">
          <img src={closeIcon} alt="close" />
        </button>
      </header>
      <div className="status-container">
        <small>status do pedido</small>
        <div>
          <span>
            {order.status === 'WAITING' && '🕛'}
            {order.status === 'IN_PRODUCTION' && '🧑‍🍳'}
            {order.status === 'DONE' && '✅'}
          </span>
          <strong>
            {order.status === 'WAITING' && 'Fila de espera'}
            {order.status === 'IN_PRODUCTION' && 'Em preparação'}
            {order.status === 'DONE' && 'Pronto!'}
          </strong>
        </div>
      </div>
      <OrdersDetails>
        <strong>Itens</strong>
        <div className="order-intens">
          {order.products.map(({_id, product, quantity})=>(
            <div className="item" key={_id}>
              <img
                src={`http://localhost:3001/uploads/${product.imagePath}`}
                alt={product.name}
                width="56px"
                height="28.51px"
              />
              <span className="quantity">
                {quantity}x
              </span>
              <div className="product-details">
                <strong>{product.name}</strong>
                <span>{formatCurrency(product.price)}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="total">
          <span>Total</span>
          <strong>23523</strong>
        </div>
      </OrdersDetails>
     </ModalBody>
    </Overlay>
  );
};
