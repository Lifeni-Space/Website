import { graphql, StaticQuery } from "gatsby"
import React from "react"
import About from "../components/about"
import Footer from "../components/footer"
import Header from "../components/header"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar"

const NotFoundPage = () => (
  <>
    <SEO title="404 Not found" />
    <Header back aside />
    <main>
      <Sidebar>
        <About page={["home", "friend", "project"]} />
      </Sidebar>
      <div className="container">
        <article id="main-content">
          <StaticQuery
            query={ImageQuery}
            render={data => {
              return (
                <img
                  src={
                    data.allFile.edges.find(edge => edge.node.name === "👀")
                      .node.publicURL
                  }
                  alt="找不到页面"
                  aria-label="找不到页面"
                  className="not-found-image"
                />
              )
            }}
          />
          <h1>你要找的页面不在这里</h1>
          <p className="subtitle">
            <svg
              aria-label="Nav Icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16"
              height="16"
            >
              <path
                fillRule="evenodd"
                d="M7.75 0a.75.75 0 01.75.75V3h3.634c.414 0 .814.147 1.13.414l2.07 1.75a1.75 1.75 0 010 2.672l-2.07 1.75a1.75 1.75 0 01-1.13.414H8.5v5.25a.75.75 0 11-1.5 0V10H2.75A1.75 1.75 0 011 8.25v-3.5C1 3.784 1.784 3 2.75 3H7V.75A.75.75 0 017.75 0zm0 8.5h4.384a.25.25 0 00.161-.06l2.07-1.75a.25.25 0 000-.38l-2.07-1.75a.25.25 0 00-.161-.06H2.75a.25.25 0 00-.25.25v3.5c0 .138.112.25.25.25h5z"
              ></path>
            </svg>
            404 PAGE NOT FOUND
          </p>
        </article>
        <Footer />
      </div>
    </main>
  </>
)

export default NotFoundPage

export const ImageQuery = graphql`
  query ImageQuery {
    allFile(filter: { relativeDirectory: { eq: "images" } }) {
      edges {
        node {
          publicURL
          name
        }
      }
    }
  }
`
