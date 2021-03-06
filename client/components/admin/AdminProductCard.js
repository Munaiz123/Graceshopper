import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {toast} from 'react-toastify'
import {removeProduct} from '../../store/allProductsReducer'

const AdminProductCard = props => {
  const {id, name, photoURL, price, availibility} = props.product

  let click,
    special = false
  if (props.diffClick) {
    click = props.diffClick(props.product)
    special = true
  }
  return (
    <div className="col-4 card">
      <Link to={`/adminhub/products/${id}`}> {name}</Link>
      <div>
        <div>
          <div>
            <img src={photoURL} />
          </div>
        </div>
        <div>${price/100}</div>
        {availibility ? <div>Availible</div> : <div>Not Availible </div>}
        <div>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              special ? click() : props.delete(id)
            }}
          >
            {` ${props.buttonName} `}
          </button>
        </div>
      </div>
    </div>
  )
}
const mapState = (state, own) => ({
  buttonName: own.buttonName ? own.buttonName : 'Remove Product',
  diffClick: own.click ? own.click : false
})

const mapDeleteDispatch = dispatch => ({
  delete: id => {
    dispatch(removeProduct(id))
    toast.success('Deleted The Product!')
  }
})

export default connect(mapState, mapDeleteDispatch)(AdminProductCard)
