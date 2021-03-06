import React from 'react'
import {connect} from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import CartItem from './CartItem'
import {toast} from 'react-toastify'
import {removeFromCart, fetchCart, checkoutCart} from '../store/cartReducer'
import {me} from '../store/user'

const addressToString = add => {
  const {
    shipping_address_city,
    shipping_address_country,
    shipping_address_country_code,
    shipping_address_line1,
    shipping_address_state,
    shipping_name,
    billing_address_city,
    billing_address_country,
    billing_address_country_code,
    billing_address_line1,
    billing_address_state,
    billing_name
  } = add
  const shipping = `${shipping_name}\n${shipping_address_line1}\n${shipping_address_city} ${shipping_address_state}\n${shipping_address_country_code}`
  const billing = `${billing_name}\n${billing_address_line1}\n${billing_address_city} ${shipping_address_state}\n${shipping_address_country_code}`
  return {shipping, billing}
}

class Cart extends React.Component {
  constructor() {
    super()
    this.handleToken = this.handleToken.bind(this)
  }
  componentDidMount() {
    this.props.getCart()
    this.props.checkUser()
  }

  handleToken(token, addresses) {
    // paid for
    // console.log(token, addresses)
    const shipping = addressToString(addresses).shipping
    console.log('SHIPPING:\t', shipping)
    this.props.checkout(shipping, token.email)
    toast.success('Your cart was ordered!')
  }

  render() {
    let cartTotal = 0
    const cart = this.props.cart ? this.props.cart : []
    return (
      <div className="container">
        <div className="row">
          {cart.map(item => {
            const multi = item.ProductOrder? item.ProductOrder.quantity : 1
            cartTotal +=
              item.price * multi
            return (
              <CartItem
                key={item.id}
                item={item}
                removeFromCart={this.props.removeFromCart}
              />
            )
          })}
        </div>
        <br />
        <div className="d-flex justify-content-center">
          {cart.length ? (
            <StripeCheckout
              stripeKey="pk_test_kZmJSR4cNZc7FGBq3pfyRkaH00UmOKDepu"
              token={this.handleToken}
              amount={cartTotal}
              name="Your Cart"
              billingAddress
              shippingAddress
              email={this.props.email}
            />
          ) : (
            <h2>Your cart is empty... buy our mangos</h2>
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart,
    email: state.user ? state.user.email : ''
  }
}

const mapProps = dispatch => {
  return {
    removeFromCart: id => {
      dispatch(removeFromCart(id))
      toast.success('Removed From Cart')
    },
    checkUser: () => dispatch(me()),
    getCart: () => dispatch(fetchCart()),
    checkout: (address, email) => dispatch(checkoutCart(address, email))
  }
}

export default connect(mapState, mapProps)(Cart)
