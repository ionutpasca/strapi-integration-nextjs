import Head from 'next/head'
import { useContext } from 'react'
import { fetchAPI } from '../../lib/api'
import { createMapContext, ContextMap } from '../../lib/context'

const BookRootComponent = ({ book }) => {
  const seo = {
    metaTitle: book.attributes.title,
    metaDescription: 'Static description',
  }

  // This would be the context ix
  const Context = createMapContext('book')

  return (
    <>
      <Head>
        <title>{seo.metaTitle}</title>
        <meta property="og:title" content={seo.metaTitle} />
        <meta name="twitter:title" content={seo.metaTitle} />

        <meta name="description" content={seo.metaDescription} />
        <meta property="og:description" content={seo.metaDescription} />
        <meta name="twitter:description" content={seo.metaDescription} />
      </Head>

      <Context.Provider value={book}>
        <Book />
      </Context.Provider>
    </>
  )
}

const Book = () => {
  const context = useContext(ContextMap['book'])

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

export async function getStaticPaths() {
  const booksRes = await fetchAPI('/books', { fields: ['title'] })
  return {
    paths: booksRes.data.map((book) => ({
      params: {
        title: book.attributes.title,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const booksRes = await fetchAPI('/books', {
    filters: {
      title: params.title,
    },
    populate: '*',
  })

  return {
    props: { book: booksRes.data[0] },
    revalidate: 1,
  }
}

export default BookRootComponent
