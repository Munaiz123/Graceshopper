import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'

class SingleProduct extends React.Component {
  componentDidMount() {
    const projectId = this.props.match.params.id
    this.props.fetchProduct(projectId)
  }
  render() {
    const {singleProduct} = this.props

    let categories = singleProduct.categories
    let reviews = singleProduct.review


<<<<<<< HEAD
    if(categories && reviews){
    return (
      <div>
        <img src={singleProduct.photoURL} />
        <h1>{singleProduct.name}</h1>
        <table>
          <tbody>
            <tr>
              <td>Price</td>
              <td>{singleProduct.price}</td>
            </tr>
            <tr>
              <td>Stock</td>
              <td>{singleProduct.inventory}</td>
            </tr>
            <tr>
              <td>Category</td>
              <td>{categories[0].name}</td>
            </tr>

          </tbody>
        </table>
        <p>{singleProduct.description}</p>
        <div>
              <div>Reviews </div>
              <div>{
                reviews.map(review =>{return <p>{review.reviewText}</p>}
                )}</div>
          </div>
        <button type="button" onClick={this.props.addToCart}>
          Add to cart
        </button>
      </div>
    )
    } else return <div></div>
=======
    if (categories) {
      return (
        <div>
          <img src={singleProduct.photoURL} />
          <h1>{singleProduct.name}</h1>
          <table>
            <tbody>
              <tr>
                <td>Price</td>
                <td>{singleProduct.price}</td>
              </tr>
              <tr>
                <td>Stock</td>
                <td>{singleProduct.inventory}</td>
              </tr>
              <tr>
                {categories.length > 0 ? (
                  <td>Category: {categories[0].name}</td>
                ) : (
                  <td />
                )}
              </tr>
            </tbody>
          </table>
          <p>{singleProduct.description}</p>
          <button type="button" onClick={this.props.addToCart}>
            Add to cart
          </button>
        </div>
      )
    } else return <div />
>>>>>>> f2735e6c0e200fc3c00410163c997a2987940803
  }
}

const mapState = state => {
  return {
    singleProduct: state.singleProduct
  }
}

const mapDispatch = dispatch => {
  return {
    addToCart: () => dispatch({type: 'TEMP'}),
    fetchProduct: id => dispatch(fetchProduct(id))
  }
}
export default connect(mapState, mapDispatch)(SingleProduct)
