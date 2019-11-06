import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const UserCard = props => {
  const user = props.user
  return (
    <div>
      <Link to={`/users/${user.id}`}>
        <div>
          {user.firstName} {props.user.lastName}
        </div>
        <div>{user.email}</div>
      </Link>
    </div>
  )
}

export default UserCard