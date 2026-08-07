#let p = html.p

#let template = it => {
  html.html({
    html.head({
      html.link(
        rel: "stylesheet",
        href: "/css/main.css"
      )
    })
    it
    html.script(
      src: "/js/main.js"
    )
  })
}

#let cols(..args) = html.div(
  args.pos().map(html.div).join(),
  class: "cols",
)

#let funny-links(..args) = html.div(
  args.pos().join(),
  class: "funny-links"
)

#let rounded-image(path, ..args) = block(html.img(
  src: path,
  ..args
))
