import styled from 'styled-components';

export const Overlay = styled.div`
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4.5px);
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
`;

export const ModalBody = styled.div`
  background: #FFFF;
  width: 480px;
  border-radius: 8px;
  padding: 16px;

  header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    strong{
      font-size: 24px;
    }
    button{
      display: flex;
      border: 0;
      background: transparent;
    }
  }
  .status-container{
    margin-top: 32px;
    small{
      font-size: 14px;
      opacity: 0.8;
    }
    div{
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
    }
  }


`;
export const OrdersDetails = styled.div`
  margin-top: 32px;
  > strong{
    font-size: 14px;
    font-weight: 500;
    opacity: 0.8;
  }
  .order-intens{
    margin-top: 16px;

    & + .item{
      margin-top: 16px;
    }
    .item{
      display: flex;
      img{
        border-radius: 6px;
      }
      .quantity{
        font-size: 14px;
        color: #666;
        display: block;
        min-width: 20px;
        margin-left: 12px;
      }
      .product-details{
        margin-left: 4px;
        strong{
          display: block;
          margin-bottom: 4px;
        }
        span{
          font-size: 14px;
          color: #666;
        }
      }
    }
  }
  .total{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
    span{
      font-size: 14px;
      font-weight: 500;
      opacity: 0.8;
    }
  }
`;
