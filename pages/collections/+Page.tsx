export { Page }
import { usePageContext } from '#root/renderer/usePageContext'
function Page() {
  const pageContext = usePageContext()
  const url_key= pageContext?.routeParams?.handle || "No Key Provided"
  return (
    <>
      <h1>Collections Page</h1>
      <p>Here we will have categories</p>
      <p>handle: {url_key}</p>
     
    </>
  )
}
