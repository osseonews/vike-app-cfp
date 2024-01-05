import { Counter } from './Counter'
import { usePageContext } from '../../renderer/usePageContext'

export { Page }

function Page() {
  const pageContext = usePageContext()
  const posts = pageContext?.postsData|| []
  console.log ("posts", posts)
  return (
    <>
      <h1 className="text-3xl font-bold underline">Welcome</h1>
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
