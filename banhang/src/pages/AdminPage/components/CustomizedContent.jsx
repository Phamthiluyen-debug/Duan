

const CustomizedContent = ({ data, setKeySelected }) => {
  return (
    <div>
      <h2>Tổng quan</h2>
      {Object.keys(data || {}).map((key) => (
        <p
          key={key}
          style={{ cursor: 'pointer' }}
          onClick={() => setKeySelected(key)}
        >
          {key}: {data[key]}
        </p>
      ))}
    </div>
  )
}

export default CustomizedContent
console.log(CustomizedContent);