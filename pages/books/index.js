import { createContext, useContext } from 'react'
import { fetchAPI } from '../../lib/api'

const BookListContext = createContext(null)

const useBookListContext = () => {
  const context = useContext(BookListContext)
  if (!context) {
    throw new Error('useBookListContext must be used within a BookListContext')
  }

  return context
}

const BookList = ({ books }) => {
  return books.map((book) => {
    return (
      <BookListContext.Provider value={book}>
        <BookListItem id={book.id} />
      </BookListContext.Provider>
    )
  })
}

const BookListItem = () => {
  const context = useBookListContext()

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
