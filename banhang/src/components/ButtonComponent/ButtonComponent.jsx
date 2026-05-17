const ButtonComponent = ({ textbutton, children, style = {}, ...rest }) => {
  return (
    <button
      style={{
        background: style.background || 'red',
        color: style.color || 'white',
        padding: '10px 20px',
        minWidth: '120px',
        height: '40px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer'
      }}
      {...rest}
    >
      {textbutton || children}
    </button>
  )
}

export default ButtonComponent

console.log(ButtonComponent)