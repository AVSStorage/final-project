interface IError {
    message: string
}
function Error ({ message } :IError) {
  return (
    <p>Something go wrong! {message}</p>
  )
}

export default Error
