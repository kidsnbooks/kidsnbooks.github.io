#let p = html.p

#let template(it, id: "index") = {
  set text(lang: "ru")

  show title: link.with("/")

  html.html({
    html.head({
      html.link(
        rel: "stylesheet",
        href: "/css/main.css"
      )
      html.meta(
        charset: "utf-8"
      )
      html.link(rel: "preconnect", href: "https://fonts.googleapis.com")
      html.link(rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous")
      html.link(href: "https://fonts.googleapis.com/css2?family=Libertinus+Sans:ital,wght@0,400;0,700;1,400&family=Libertinus+Serif:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap", rel: "stylesheet")
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

#let cols(..args, widths: (), gap: 0, cascade: 0) = {
  html.div(
    args.pos().zip(widths + (none,) * 99, range(99))
    .map(((body, basis, n)) => {
      let style = (
          (if basis != none {("flex-basis: " + repr(basis),)} else {()}) +
          (if cascade != 0 {("margin-top: " + str(n * cascade) + "px",)} else {()})
      ).join(", ")
      
      html.div(
        body,
        ..(if style != none {(style: style)} else {(:)})
      )
    }).join(),

    class: "cols",
    ..(if gap != 0 {(style: "gap: " + str(gap) + "px",)})
  )
}

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

#let pop(body, margin: none) = html.p(
  body,
  class: "pop blob",
  ..(if margin != none {(style: "margin: " + margin)})
)

#let shifted = html.p.with(
  class: "shifted"
)

#let align-right = html.p.with(
  style: "text-align: right"
)

#let margin(..args, body) = html.div(
  body,
  class: "fit",
  style: "margin: " + args.pos().join(" ")
)

#let center(body, max-width: none) = html.div(
  body,
  class: "center",
  ..(if max-width != none {(style: "max-width: " + str(max-width) + "px")})
)
