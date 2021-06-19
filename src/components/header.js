import { Link } from "gatsby"
import React from "react"
import {
  RiArrowUpLine,
  RiDashboardLine,
  RiDiscussLine,
  RiFileList2Line,
  RiHome2Line,
  RiMenuLine,
  RiSearchLine,
} from "react-icons/ri"
import "./header.less"

const BackButton = () => (
  <Link to="/" aria-label="返回主页" title="返回主页">
    <RiHome2Line aria-label="Back Icon" />
  </Link>
)

const SearchButton = () => (
  <button onClick={() => {}} aria-label="搜索" title="搜索">
    <RiSearchLine aria-label="Search Icon" />
  </button>
)

const MenuButton = () => (
  <button onClick={() => {}} aria-label="菜单" title="菜单">
    <RiMenuLine aria-label="Menu Icon" />
  </button>
)

const GoTopButton = () => (
  <button
    onClick={() => window.scrollTo(0, 0)}
    aria-label="返回文章顶部"
    title="返回文章顶部"
  >
    <RiArrowUpLine aria-label="Go Top Icon" />
  </button>
)

const AppButton = () => (
  <button onClick={() => {}} aria-label="应用" title="应用">
    <RiDashboardLine aria-label="App Icon" />
  </button>
)

const TOCButton = () => (
  <Link to="/" aria-label="文章目录" title="文章目录">
    <RiFileList2Line aria-label="Table of Contents Icon" />
  </Link>
)

const CommentButton = () => (
  <Link to="#article-comment" aria-label="文章评论" title="文章评论">
    <RiDiscussLine aria-label="Comment Icon" />
  </Link>
)

const Header = ({ app, menu, search, back, toc, top, comment }) => (
  <header>
    <section>
      {back && <BackButton />}
      {search && <SearchButton />}
    </section>
    <section>
      {top && <GoTopButton />}
      {app && <AppButton />}
      {menu && <MenuButton />}
      {toc && <TOCButton />}
      {comment && <CommentButton />}
    </section>
  </header>
)

export default Header
