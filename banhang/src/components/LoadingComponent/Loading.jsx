const Loading = ({ isLoading, children }) => {
  return (
    <>
      {children}
      {isLoading && (
        <div style={{ marginTop: 10, textAlign: 'center' }}>
          Loading...
        </div>
      )}
    </>
  )
}

export default Loading

console.log(Loading);