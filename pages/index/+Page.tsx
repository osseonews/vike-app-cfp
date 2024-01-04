import { Counter } from './Counter'
import { usePageContext } from '../../renderer/usePageContext'

export { Page }

function Page() {
  const pageContext = usePageContext()
  const posts = pageContext?.postsData|| []
  console.log ("posts", posts)
  return (
    <>
      <h1>Welcome</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
        </li>
      </ul>
    </>
  )
}
