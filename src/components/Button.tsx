import React from 'react'

interface ButtonProps extends React.Component {
  onClick: (event: any) => void
}

export const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <div className="button">
      <button onClick={onClick}>
        { children }
      </button>
    </div>
  )
}
