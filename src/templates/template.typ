#let p = html.p

#let template(it, id: "index") = {
  set text(lang: "ru")

  html.html({
    html.head({
      html.link(
        rel: "stylesheet",
        href: "/css/main.css"
      )
      html.meta(
        charset: "utf-8"
      )
    })
    html.body(
      it,
      id: id
    )
    html.script(
      src: "/js/main.js"
    )
  },
  lang: "ru")
}

#let subtitle = html.p.with(class: "subtitle")

#let cols(..args) = html.div(
  args.pos().map(html.div).join(),
  class: "cols",
)

#let funny-links(..args) = {
  show link: it => html.a(
    it.body,
    href: it.dest,
    class: "blob randshift"
  )

  html.div(
    args.pos().join(),
    class: "funny-links"
  )

}

#let rounded-image(path, ..args) = block(html.img(
  src: path,
  ..args
))

#let pop = html.p.with(
  class: "pop blob randshift"
)

#let shifted = html.p.with(
  class: "shifted"
)

#let align-right = html.p.with(
  style: "text-align: right"
)
