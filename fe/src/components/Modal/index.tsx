import { ModalBody, OrdersDetails, Overlay, Actions } from "./Style";
import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from "../../types/Order";
import { formatCurrency } from "../../utils/formatCurrency";

type Props = {
  visible: boolean,
  order: Order | null,
  onClose: () => void,
  onCancelOrder: () => Promise<void>;
  isLoading: boolean,
  onChangeOrderStatus: () => void
};

export function Modal({visible, order, onClose, onCancelOrder, isLoading, onChangeOrderStatus}: Props){
  if(!visible || !order){
    return null;
  }

  /* let total = 0;
  order.products.forEach(({quantity, product}) => {
    total += product.price * quantity;
  }) */

  const total = order.products.reduce((total,{product,quantity})=>{
    return total + (product.price * quantity);
  },0)

  return(
    <Overlay>
     <ModalBody>
      <header>
        <strong>Mesa {order.table}</strong>
        <button type="button" onClick={onClose}>
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
          <strong>{formatCurrency(total)}</strong>
        </div>
      </OrdersDetails>
      <Actions>
        {order.status != 'DONE' && (
          <button type="button" className="primary" disabled={isLoading} onClick={onChangeOrderStatus}>
            <span>
              {order.status === 'WAITING' && '⏱️'}
              {order.status === 'IN_PRODUCTION' && '✅'}
            </span>
            <strong>
              {order.status === 'WAITING' && 'Iniciar produção'}
              {order.status === 'IN_PRODUCTION' && 'Concluir pedido'}
            </strong>
          </button>
        )}
        <button type="button" className="secondary" onClick={onCancelOrder} disabled={isLoading}>
            <span>❌</span>
            <strong>{order.status === 'DONE' ? 'Fechar pedido' : 'Cancelar pedido'}</strong>
        </button>
      </Actions>
     </ModalBody>
    </Overlay>
  );
};
