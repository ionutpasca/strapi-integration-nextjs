import { useContext } from 'react'
import { fetchAPI } from '../../lib/api'
import { createMapContext, ContextMap } from '../../lib/context'

const BookList = ({ books }) => {
  return books.map((book) => {
    // book.id would need to be unique id here
    const Context = createMapContext(book.id)
    return (
      <Context.Provider value={book}>
        {/* book.id would need to be unique id here */}
        <BookListItem id={book.id} />
      </Context.Provider>
    )
  })
}

const BookListItem = ({ id }) => {
  const context = useContext(ContextMap[id])

  return (
    <div>
      <h1>{context.attributes.title}</h1>
      <p>
        <span>Price:</span>
        {context.attributes.price}
      </p>
    </div>
  )
}

export async function getStaticProps() {
  const booksRes = await fetchAPI('/books', { populate: '*' })

  return {
    props: { books: booksRes.data },
    revalidate: 1,
  }
}

export default BookList
