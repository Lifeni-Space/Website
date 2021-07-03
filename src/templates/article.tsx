import styled from "@emotion/styled"
import { graphql } from "gatsby"
import * as React from "react"
import ReactDOMServer from "react-dom/server"
import { Helmet } from "react-helmet"
import { RiCopyrightLine } from "react-icons/ri"
import AppMenu from "../components/AppMenu"
import Article from "../components/Article"
import Comment from "../components/Comment"
import Header from "../components/Header"

const Meta = styled("section")`
  time {
    display: flex;
    color: var(--font-secondary);
  }
`

const meta = ({ title, description, create_date, date }) =>
  ReactDOMServer.renderToString(
    <Meta>
      <h1>{title}</h1>
      <time>{(create_date === date ? "创建于 " : "最后编辑于 ") + date}</time>
      <p>{description}</p>
    </Meta>
  )

const Copyright = styled("span")`
  margin: 1.75rem 0 0 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--font-secondary);
`

const copyright = ({ license }) =>
  ReactDOMServer.renderToString(
    <Copyright>
      <RiCopyrightLine size="1.125em" />
      {license}
    </Copyright>
  )

const ArticlePage = ({ data }) => {
  const post = data.markdownRemark
  const frontmatter = post.frontmatter
  return (
    <>
      <Helmet>
        <title>{frontmatter.title} | 记录干杯</title>
        <meta name="description" content={frontmatter.description}></meta>
      </Helmet>
      <Header>
        <AppMenu />
      </Header>
      <Article {...frontmatter}>
        {meta(frontmatter) +
          post.html.split("</h1>")[1] +
          copyright(frontmatter)}
      </Article>
      <Comment />
    </>
  )
}

export default ArticlePage

export const PostQuery = graphql`
  query BlogArticleQuery($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        name
        description
        date(formatString: "YYYY 年 M 月 D 日")
        create_date(formatString: "YYYY 年 M 月 D 日")
        license
      }
      tableOfContents(absolute: false, maxDepth: 3)
    }
  }
`
