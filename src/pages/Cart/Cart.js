import React from 'react';
import { CARTLIST } from '../../../src/config.js';
import './Cart.scss';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cartList: [],
    };
  }

  postFetch = e => {
    fetch(`${CARTLIST}`, {
      method: 'PATCH',
      body: JSON.stringify({
        productID: e.target.name,
        quantity: 2,
      }),
    });
  };
  //수량 변수화, then 데이타 받아오기 그리고 바로 랜더링 되기

  componentDidMount() {
    fetch(`${CARTLIST}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          cartList: data.product,
        });
      });
  }

  handleIncrement = e => {
    const id = Number(e.target.name);
    // console.log(`props`, e.target.name);
    // console.log(`state`, this.state.cartList);

    const newCartList = [...this.state.cartList];
    // console.log(`ea`, newCartList[id].ea + 1);
    const newEa = newCartList[id].quantity + 1;
    newCartList[id] = { ...newCartList[id], quantity: newEa };

    this.setState({
      cartList: newCartList,
    });
  };

  handleDecrement = e => {
    const id = Number(e.target.name);

    const newCartList = [...this.state.cartList];
    const newEa = newCartList[id].quantity - 1;
    newCartList[id] = { ...newCartList[id], quantity: newEa };

    if (newCartList[id].quantity <= 0) {
      return;
    }

    this.setState({
      cartList: newCartList,
    });
  };

  handleDelete = e => {
    fetch(`${CARTLIST}`, {
      method: 'DELETE',
      body: JSON.stringify({
        productID: e.target.name,
      }),
    }).then(
      fetch(`${CARTLIST}`, {
        method: 'GET',
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            cartList: data.product,
          });
        })
    );
  };
  //     .then(res => res.json())
  //     .then(res => {
  //       if (res.access_token) {
  //         alert('삭제 완료');
  //         localStorage.setItem('access_token', res.access_token);
  //       } else {
  //         alert('삭제 실패');
  //       }
  //     });
  // };

  render() {
    const { cartList } = this.state;
    console.log(`render`, this.state);
    return (
      <div className="Cart">
        <div className="cartView">
          <header className="cartTop">
            <h1 className="cartTopTitle">장바구니</h1>
            <div className="cartTopButtonWrppaer">
              <button type="button" className="topBtn">
                + 제품추가
              </button>
            </div>
          </header>
          <h2 className="cartListTitle">정기구독 제품</h2>
          <ul className="cartList">
            {cartList &&
              cartList.map(
                (
                  {
                    productID,
                    productName,
                    thumbnail_image_url,
                    productPrice,
                    quantity,
                  },
                  idx
                ) => {
                  return (
                    <li className="productList" key={idx} name={productID}>
                      <input type="checkbox" />
                      <img
                        alt="비타민"
                        className="cartListImg"
                        src={thumbnail_image_url}
                      />
                      <div className="listDetail">
                        <div className="listTop">
                          <p className="listFont">{productName}</p>
                          <button
                            type="button"
                            className="removeButton"
                            onClick={this.handleDelete}
                            name={productID}
                          >
                            삭제
                          </button>
                        </div>
                        <br />
                        <div className="countButtonWrppaer">
                          <div className="btnDetail">
                            <button
                              type="button"
                              className="countButton"
                              name={idx}
                              onClick={this.handleDecrement}
                            >
                              -
                            </button>
                            <span className="countNum">{quantity}</span>
                            <button
                              type="button"
                              className="countButton"
                              name={productID}
                              onClick={this.postFetch}
                            >
                              +
                            </button>
                          </div>
                          <div className="boxRight">
                            <p className="boxPrice">
                              {productPrice * quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                }
              )}
          </ul>

          <div className="cartDetail">
            <div className="cartBox">
              <div className="cartRead">
                <p>정기구독 제품합계</p>
                <p>19,500원</p>
              </div>
              <div className="deliveryPrice">
                <p>배송비</p>
                <p>2,500원</p>
              </div>
            </div>
            <div className="productView">
              <div className="productDiscount">
                <p className="discountTitle">정기구독 할인혜택</p>
                <p>총 2,500원</p>
              </div>
              <div className="deliveryDiscount">
                <p>배송비 무료</p>
                <p>-2,500원</p>
              </div>
              <div className="pointDiscount">
                <p>포인트 할인</p>
                <p>0원</p>
              </div>
            </div>
          </div>
          <div className="cartPrice">
            <p className="totalPriceText">총 결제금액</p>
            <p className="totalPrice">19,500원</p>
          </div>
          <div className="cartFooterButtonWrppaer">
            <button
              type="submit"
              className="resultBtn"
              onClick={this.postFetch}
            >
              결제하기
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
