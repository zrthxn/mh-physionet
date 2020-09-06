import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../ContextProvider'

export default function Header() {
  const context = useContext(AppContext)

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/challenges">Challenges</Link>
          </li>
          <li>
            <Link to="/patients">Patients</Link>
          </li>
        </ul>

        {/* <div className="user">
          <div className="coins">
            { context.state.coinCount }
          </div>
          <div className="name">{ context.state.user }</div>
        </div> */}
      </nav>
    </header>
  )
}
