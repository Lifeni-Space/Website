require("prismjs/themes/prism-solarizedlight.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")

exports.onRouteUpdate = () => {
  const block = document.querySelectorAll(".gatsby-highlight")
  if (block.length) {
    block.forEach(e => {
      const copy = document.createElement("button")
      const copy$ = document.createElement("button")
      copy.className = "copy-button"
      copy$.className = "copy-button dollar"
      copy.textContent = "Copy"
      copy$.textContent = "Copy Without $"
      copy.onclick = b => {
        navigator.clipboard
          .writeText(
            b.target.parentElement.firstElementChild.firstElementChild
              .textContent
          )
          .then(() => {
            b.target.textContent = "Copied"
          })
          .catch(err => {
            console.log("复制出错", err)
          })
      }
      copy$.onclick = b => {
        navigator.clipboard
          .writeText(
            b.target.parentElement.firstElementChild.firstElementChild.textContent.replace(
              /\$ /g,
              ""
            )
          )
          .then(() => {
            b.target.textContent = "Copied"
          })
          .catch(err => {
            console.log("复制出错", err)
          })
      }
      e.appendChild(copy)
      if (e.dataset.language === "bash") {
        e.appendChild(copy$)
      }
    })
  }

  const top = document.querySelector("#go-top")
  if (top) {
    const title = document.querySelector("#header-title")
    const about = document.querySelector("#about")
    window.addEventListener("scroll", () => {
      window.requestAnimationFrame(() => {
        const scrollTop = document.querySelector("html").scrollTop
        if (scrollTop > 160) {
          top.classList.remove("hide")
          title.classList.add("show")
          if (about) {
            about.classList.add("light")
          }
        } else {
          top.classList.add("hide")
          title.classList.remove("show")
          if (about) {
            about.classList.remove("light")
          }
        }
      })
    })

    top.addEventListener("click", () => {
      window.scrollTo(0, 0)
    })
  }

  const like = document.querySelector("#like-it")
  if (like) {
    like.addEventListener("click", () => {
      const popover = document.querySelector("#popover")
      const h2 = document.querySelector("#popover h2")
      const h3 = document.querySelector("#popover h3")
      fetch("https://api.lifeni.life/like", {
        method: "POST",
      })
        .then(response => response.text())
        .then(count => {
          h2.textContent = `❤ × ${count}`
          h3.textContent = `感谢支持`
          popover.classList.add("show")
          like.classList.add("fill")
          setTimeout(() => {
            popover.classList.remove("show")
          }, 3000)
        })
    })
  }

  const info = document.querySelector("#article-info")
  if (info) {
    info.addEventListener("click", () => {
      const popover = document.querySelector("#popover")
      popover.classList.add("show")
      setTimeout(() => {
        popover.classList.remove("show")
      }, 5000)
    })
  }

  const expand = document.querySelector("#expand-aside")
  if (expand) {
    expand.addEventListener("click", () => {
      const aside = document.querySelector("aside")
      aside.classList.toggle("expand")
    })
  }

  const expand2 = document.querySelector("#expand-aside-header")
  if (expand2) {
    expand2.addEventListener("click", () => {
      const aside = document.querySelector("aside")
      aside.classList.toggle("expand")
    })
  }
}