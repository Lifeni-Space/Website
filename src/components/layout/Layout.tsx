import styled from "@emotion/styled"
import {
  createContext,
  DetailedHTMLProps,
  Fragment,
  HTMLAttributes,
  ReactNode,
  useContext,
  useState,
} from "react"
import { Helmet } from "react-helmet"
import { useMedia } from "react-use"
import Overlay from "../app/common/base/Overlay"
import GoTop from "../app/common/global/GoTop"
import Footer from "./footer/Footer"
import Header from "./header/Header"

export const GlobalContext = createContext<IGlobalContext>({
  showMorePosts: false,
  setShowMorePosts: () => {},
  showSidebar: false,
  setShowSidebar: () => {},
  setHideSidebar: () => {},
})

const Container = styled("div")`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

interface ContentProps {
  isCentered?: boolean
}

const Content = styled("div")<ContentProps>`
  position: relative;
  width: 100%;
  padding: 1.25rem 2rem;
  display: flex;
  align-items: ${props => (props.isCentered ? "center" : "flex-start")};
  justify-content: center;
  flex: 1;
  gap: 2rem;

  @media (max-width: 72rem) {
    gap: 1rem;
  }

  @media (max-width: 56rem) {
    padding: 1.25rem 1.5rem;
  }

  @media (max-width: 48rem) {
    padding: 0.75rem 1.25rem;
  }

  @media (max-width: 36rem) {
    padding: 0.25rem 1.25rem;
  }
`

interface LayoutProps {
  hasSidebar?: boolean
  hasHeader?: boolean
  hasFooter?: boolean
  isCentered?: boolean
  title?: string
  description?: string
  children: ReactNode | ReactNode[]
}

const Layout = ({
  hasSidebar = true,
  hasHeader = true,
  hasFooter = true,
  isCentered = false,
  title,
  description,
  children,
}: LayoutProps) => {
  const [showMorePosts, setShowMorePosts] = useState(false)
  const [showSidebar, setSidebar] = useState(false)

  return (
    <Container>
      <Helmet
        htmlAttributes={{
          lang: "zh-hans",
        }}
      >
        <title>{title ? `${title} | 记录干杯` : "记录干杯"}</title>
        <meta
          name="description"
          content={
            description ||
            "个人网站「记录干杯」，在这里记录一些技术相关的文章、尝试一些新的技术。"
          }
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700&family=JetBrains+Mono:wght@500;700&family=Noto+Sans+SC:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <GoTop />
      <GlobalContext.Provider
        value={{
          showMorePosts,
          setShowMorePosts: () => setShowMorePosts(true),
          showSidebar,
          setShowSidebar: () => setSidebar(true),
          setHideSidebar: () => setSidebar(false),
        }}
      >
        {hasHeader && <Header hasSidebar={hasSidebar} />}
        <Content isCentered={isCentered}>{children}</Content>
        {hasFooter && <Footer />}
      </GlobalContext.Provider>
    </Container>
  )
}

export default Layout

export const Main = styled("main")`
  position: relative;
  width: var(--main-width);
  max-width: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 36rem) {
    overflow: unset;
  }
`

interface SidebarElementProps {
  showSidebar: boolean
  isPinned: boolean
}

const SidebarWrapper = styled("aside")<SidebarElementProps>`
  position: ${props => (props.isPinned ? "sticky" : "relative")};
  top: 0;
  overflow: ${props => (props.isPinned ? "hidden" : "initial")};
  width: calc(var(--sidebar-width) + 4rem);
  max-width: 100%;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 72rem) {
    width: calc(var(--sidebar-width) + 2rem);
    padding: 0 1rem;
  }

  @media (max-width: 56rem) {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: ${props => (props.showSidebar ? 2000 : 1)};
    width: 32rem;
    max-width: calc(100vw - 2rem);
    height: auto;
    max-height: calc(66vh - 2rem);
    padding: 0 2rem;
    display: flex;
    border-radius: var(--border-radius);
    border: var(--border);
    background-color: var(--background);
    overflow-y: auto;
    visibility: ${props => (props.showSidebar ? "visible" : "hidden")};
    opacity: ${props => (props.showSidebar ? "1" : "0")};
    transform: translate(-50%, -50%);
    transition: ${props =>
      props.showSidebar
        ? "opacity 0.2s, background-color 0.2s, visibility 0.2s, border 0.2s"
        : "none"};
  }

  @media (max-width: 36rem) {
    padding: 0 1.25rem;
    max-height: calc(75vh - 2rem);
  }
`

const SidebarElement = styled("div")`
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 56rem) {
    max-height: unset;
  }
`

interface SidebarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  isPinned?: boolean
}

export const Sidebar = (props: SidebarProps) => {
  const isMobile = useMedia("(max-width: 56rem)")
  const { showSidebar, setHideSidebar: setHide } = useContext(GlobalContext)

  return (
    <Fragment>
      <SidebarWrapper
        {...props}
        isPinned={!!props.isPinned}
        showSidebar={showSidebar}
      >
        <SidebarElement>{props.children}</SidebarElement>
      </SidebarWrapper>
      <Overlay isOpen={isMobile && showSidebar} onClick={setHide} />
    </Fragment>
  )
}