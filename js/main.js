const formCourses = [
  ["children", "Клуб для детей"],
  ["teenagers", "Клуб для подростков"],
  ["adults", "Клуб для взрослых"],
  ["nothing-sacred", "«Ничего святого»"],
]

function blobClip(element, padding = 12, points = 10) {
  function ellipsePoint(t, halfW, halfH) {
    const angle = t * 2 * Math.PI;
    return { x: halfW * Math.cos(angle), y: halfH * Math.sin(angle) };
  }

  function quadraticMidpointPath(points) {
    const n = points.length;
    const f2 = (v) => v.toFixed(2);
    const midpoint = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

    const start = midpoint(points[0], points[1]);
    let d = `M ${f2(start[0])} ${f2(start[1])} `;

    for (let i = 0; i < n; i++) {
      const p1 = points[(i + 1) % n];
      const p2 = points[(i + 2) % n];
      const m = midpoint(p1, p2);
      d += `Q ${f2(p1[0])} ${f2(p1[1])}, ${f2(m[0])} ${f2(m[1])} `;
    }

    return d + 'Z';
  }

  function render() {
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    if (!width || !height) return;

    const halfW = width / 2;
    const halfH = height / 2;

    const pts = Array.from({ length: points }, (_, i) => {
      const t = i / points;
      const outer = ellipsePoint(t, halfW, halfH);
      const inner = ellipsePoint(t, Math.max(halfW - padding, 0), Math.max(halfH - padding, 0));
      const f = Math.random(); // 0 = fully inset, 1 = right on the outer ellipse
      const x = inner.x + f * (outer.x - inner.x);
      const y = inner.y + f * (outer.y - inner.y);
      return [halfW + x, halfH + y];
    });

    element.style.clipPath = `path('${quadraticMidpointPath(pts)}')`;
  }

  render();
  const ro = new ResizeObserver(render);
  ro.observe(element);
  return ro;
}


function expandAnim(e) {
  e.preventDefault()

  const color = this._color
  const href = this.href;
  const rect = this.getBoundingClientRect();

  const overlay = document.createElement("div");
  Object.assign(overlay.style, {
    position: "fixed",
    top: rect.top + "px",
    left: rect.left + "px",
    width: rect.width + "px",
    height: rect.height + "px",
    backgroundColor: this._bgColor || color,
    borderRadius: "100%",
    zIndex: "9999",
    transition: "all 0.3s ease-in-out",
    pointerEvents: "none",
  });
  overlay.setAttribute("class", "animation")
  document.body.appendChild(overlay);

  void overlay.offsetWidth;

  Object.assign(overlay.style, {
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    borderRadius: "0",
    backgroundColor: color
  });

  overlay.addEventListener("transitionend", () => {
    window.location.href = href;
  }, { once: true });
}


function whenReady(el) {
  if (el.tagName !== 'IMG' || el.complete) return Promise.resolve();
  return new Promise(res => el.addEventListener('load', res, { once: true }));
}
document.querySelectorAll(".blob").forEach(it => {
  whenReady(it).then(() => {
    blobClip(it, 30, 12);          // clip-path set now, image already sized
    it.style.transition = "clip-path 1s"; // transition enabled only after
    it.addEventListener("mouseenter", () => blobClip(it, 30, 12));
  });
});


const flinks = document.querySelector(".funny-links")
if (flinks) {
  flinks.querySelectorAll("a").forEach(it => {
    const page = it.href.split("/")[3]
    const computed = getComputedStyle(it)

    it.style.backgroundColor = computed.getPropertyValue(`--color-${page}-dark`)
    it.style.color = computed.getPropertyValue(`--color-${page}-dark-fg`)

    it._color = computed.getPropertyValue(`--color-${page}`)
    it._bgColor = computed.backgroundColor
    it.addEventListener("click", expandAnim)
  })
}
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    document.querySelectorAll(".animation").forEach(el => el.remove());
  }
});

const courseSelect = document.getElementById("course-select")
if (courseSelect) {
  console.log("course-select found")

  formCourses.forEach(([id, body]) => {
    const opt = document.createElement("option")
    opt.setAttribute("value", id)
    opt.appendChild(document.createTextNode(body))

    if (id == document.body.id) {
      opt.setAttribute("selected", true)
    }
    courseSelect.appendChild(opt)
  })  
}


if ((new URLSearchParams(window.location.search)).has("submitted")) {
  document.getElementById("submitted-msg").style.display = "block"
}
