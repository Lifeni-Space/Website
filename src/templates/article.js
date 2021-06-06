import { graphql } from "gatsby"
import React, { useEffect, useRef } from "react"
import Comment from "../components/comment"
import Seo from "../components/seo"
import "./article.less"
import "./toc.less"

const ArticleMeta = ({ frontmatter }) => {
  let create = frontmatter.create_date
  let modify = frontmatter.date

  if (create.slice(0, 5) === modify.slice(0, 5)) {
    modify = modify.slice(6)
  }

  return (
    <section className="meta">
      <span title={`创建日期：${create}`} className="create-date">
        {create}
      </span>
      {frontmatter.create_date !== frontmatter.date && (
        <>
          <span className="divider">{" / "}</span>
          <span title={`修改日期：${modify}`} className="modify-date">
            {modify}
          </span>
        </>
      )}
    </section>
  )
}

const ArticlePage = ({ data }) => {
  const post = data.markdownRemark
  const articleRef = useRef()
  useEffect(() => {
    const tables = articleRef.current.querySelectorAll("table")
    tables.forEach(table => {
      const wrapper = document.createElement("div")
      const clone = table.cloneNode(true)
      wrapper.className = "table-wrapper"
      wrapper.appendChild(clone)
      table.replaceWith(wrapper)
    })
  }, [data])

  return (
    <div className="screen article">
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description}
      />
      <div className="container">
        <main>
          <ArticleMeta frontmatter={post.frontmatter} />
          <article
            ref={articleRef}
            id="main-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <Comment />
        </main>
        <aside>
          <nav
            className="toc"
            dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
          />
        </aside>
      </div>
    </div>
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
