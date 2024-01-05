import React from 'react'
import TableForNewUser from 'src/views/tables/TableForNewUser'

import Err404 from 'src/pages/404'

import Cookie from 'js-cookie'

const role = Cookie.get('role')

const NewUsersList = () => {
  return role === "credit_manager" ?  (
    <div>
      NewUsersList
      <TableForNewUser />
    </div>
  ): (<Err404 />)
}

export default NewUsersList
