import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { CARTLIST_API } from '../../../config';

import ProductIcon from './ProductIcon/ProductIcon';
import ProductDescription from './ProductDescription/ProductDescription';

import { AiOutlinePlus } from 'react-icons/ai';

import './ProductCard.scss';

export class ProductCard extends Component {
  addCart = event => {
    const { cart_exist } = this.props.productCard;
    if (cart_exist) {
      return;
    }

    event.preventDefault();
    const newProductCard = { ...this.props.productCard };
    newProductCard.cart_exist = true;
    this.props.changeProductCard(newProductCard, this.props.index);

    fetch(`${CARTLIST_API}`, {
      method: 'POST',
      headers: { Authorization: localStorage.getItem('access_token') },
      body: JSON.stringify({
        productID: event.target.name,
      }),
    });
  };

  render() {
    const { backgroundColor } = this.props;

    const {
      productName,
      icon_image_url,
      thumbnail_image_url,
      summary,
      productTablet,
      productPrice,
      cart_exist,
      productID,
    } = this.props.productCard;

    return (
      <li className="ProductCard" style={{ backgroundColor }}>
        <Link to={`product/${this.props.productCard.productID}`}>
          <header className="productCardHeader">
            <div className="nameBox">
              <h2>
                <strong>{productName}</strong>
              </h2>

              <ul className="icon">
                {icon_image_url.map((iconImage, idx) => (
                  <ProductIcon key={idx} icon_image_url={iconImage} />
                ))}
              </ul>
            </div>
            <div className="pillImgBox">
              {/* <img
                className="pillImage"
                alt={productName}
                src={thumbnail_image_url}
              /> */}
            </div>
          </header>
          <section className="productCardBody">
            <div className="descriptonBox">
              <ul className="description">
                {summary.map((descriptionItem, idx) => (
                  <ProductDescription key={idx} summary={descriptionItem} />
                ))}
              </ul>
            </div>
            <div className="quantityAndpriceBox">
              <p className="quantity">{productTablet}일분</p>
              <p className="price">
                {parseInt(productPrice).toLocaleString()}원
              </p>
            </div>
          </section>
          <footer className="productCardFooter">
            <p className="add">더보기</p>
            <button
              name={productID}
              className="cartBtn"
              disabled={cart_exist}
              onClick={this.addCart}
            >
              {!cart_exist && <AiOutlinePlus className="addIcon" />}
              {cart_exist ? '장바구니 추가됨' : '장바구니 담기'}
            </button>
          </footer>
        </Link>
      </li>
    );
  }
}

export default withRouter(ProductCard);
