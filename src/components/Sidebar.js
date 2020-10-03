import React from "react"
import "../styles/Sidebar.less"

const Sidebar = ({ children, about, footer }) => (
  <aside>
    {about ? (
      <section className="about" id="about">
        <h2>Hi</h2>
        <p>
          这是我的个人网站「 记录干杯
          」，我会在这里记录一些技术相关的文章、尝试一些新的技术。
        </p>
        <p>
          我比较感兴趣的方向是 Web 前端，喜欢好看的设计，目前正在尝试使用
          TypeScript。在
          <a
            href="https://github.com/Lifeni"
            target="_blank"
            rel="noopener noreferrer"
          >
            &nbsp;GitHub&nbsp;
          </a>
          上可以找到我和我的项目。
        </p>
        <p>
          还有，
          <a
            href="https://tanakarino.cn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nanako&nbsp;
          </a>
          是我的朋友，有时间可以去他的网站看一看。
        </p>
      </section>
    ) : null}
    {children}
    {footer ? (
      <footer>
        <a
          href="http://www.beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
        >
          鲁ICP备 19006085 号
        </a>
        <a
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=37132102371392"
          target="_blank"
          rel="noopener noreferrer"
        >
          鲁公网安备 37132102371392 号
        </a>
      </footer>
    ) : null}
    <button className="expand-aside" id="expand-aside" aria-label="展开侧栏">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path
          fillRule="evenodd"
          d="M8.72 18.78a.75.75 0 001.06 0l6.25-6.25a.75.75 0 000-1.06L9.78 5.22a.75.75 0 00-1.06 1.06L14.44 12l-5.72 5.72a.75.75 0 000 1.06z"
        ></path>
      </svg>
    </button>
  </aside>
)

export default Sidebar
