import React from 'react'
import Head from 'next/head'

const Home = (props) => {
  return (
    <>
      <div className="home-container">
        <Head>
          <title>Strapi integration</title>
          <meta property="og:title" content="Strapi integration" />
          <meta
            property="og:image"
            content="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/464e1cc9-e0c4-4dfc-a7f8-d2f6ede25305/3bf153a8-9d22-4c69-977b-773411d1b0f9?org_if_sml=1"
          />
        </Head>
        <h1 className="dsadsasda">Heading</h1>
      </div>
      <style jsx>
        {`
          .home-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
        `}
      </style>
    </>
  )
}

export default Home
