import styled from "@emotion/styled"
import { graphql, useStaticQuery } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import Markdown from "../../common/typography/Markdown"
import Friends from "./friend-list/List"
import Footer from "./layout/Footer"
import Header from "./layout/Header"

const query = graphql`
  query {
    allMdx(filter: { slug: { eq: "about" } }) {
      edges {
        node {
          body
          slug
        }
      }
    }
  }
`

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  padding: 1.625rem 1rem 2.25rem 1rem;
  border-bottom: var(--border);
  transition: all 0.2s;

  @media (max-width: 800px) {
    padding: 1.125rem 1rem 1.75rem 1rem;
  }

  @media (max-width: 720px) {
    padding: 0.625rem 1rem 1.25rem 1rem;
  }
`

const About = () => {
  const data = useStaticQuery(query)

  return (
    <Markdown>
      <Container>
        <Header>你好</Header>
        <MDXRenderer>{data.allMdx.edges[0].node.body}</MDXRenderer>
        <Friends />
        <Footer># BLOG / ABOUT.mdx</Footer>
      </Container>
    </Markdown>
  )
}

export default About
