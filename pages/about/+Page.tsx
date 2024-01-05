import './code.css'
import React from 'react'
//to do: try/catch for fetch, test response if ok, error message.
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
    setMutateMessage(data.message)
    setIsCreating(false)
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
  
  return (
    <>
      <h1>About</h1>
      <p>Example of using Vikew.</p>
      <p className="text-xl">{mutateMessage}</p>
      <p>
        <button disabled={isCreating} type="button" onClick={() => handleClick("hello")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Test Hello Button
        </button>
      </p>
      <p>
        <button disabled={isCreating} type="button" onClick={() => handleClick("goodbye")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Test Goodbye Button
        </button>
      </p>
      <p>
        <button disabled={isCreating} type="button" onClick={() => handleClick("error")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Test Error Message
        </button>
      </p>
    </>
  )
}
