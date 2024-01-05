import './code.css'
import React from 'react'

export { Page }

function Page() {
  const [isCreating, setIsCreating] = React.useState(false)
  const [isError, setIsError] = React.useState(false)
  const [mutateMessage, setMutateMessage] = React.useState<string>("")
  //console.log ("count", count)
  const handleClick = async (message: string) => {
    setIsCreating(true)
    const res = await fetch(`/api/${message}`, {
      //body: JSON.stringify(fetchBody),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'get',
    })
    const data = await res.json()
    console.log (data)
/*
    if (!result.success) {
      setIsCreating(false)
      setIsError(true)
      setMutateMessage(result.message)
    }
    setIsCreating(false)
    setMutateMessage(result.message)
    */
  }
  if (isError) {
    return (<div>Error: {mutateMessage}</div>)
  }
  const message = "hello"
  return (
    <>
      <h1>About</h1>
      <p>Example of using Vikew.</p>
      <p>
        <button disabled={isCreating} type="button" onClick={() => handleClick(message)}>
          Test Button
        </button>
      </p>
    </>
  )
}
