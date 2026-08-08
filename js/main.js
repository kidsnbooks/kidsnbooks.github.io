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


function randint(m) {
  return Math.random() * m
}


function expandAnim(e) {
  e.preventDefault()

  const href = this.href;
  const rect = this.getBoundingClientRect();
  const computed = getComputedStyle(this);

  console.log(href.split("/")[3])
  const color = computed.getPropertyValue(`--color-${href.split("/")[3]}`)

  const overlay = document.createElement("div");
  Object.assign(overlay.style, {
    position: "fixed",
    top: rect.top + "px",
    left: rect.left + "px",
    width: rect.width + "px",
    height: rect.height + "px",
    backgroundColor: computed.backgroundColor || "#000",
    borderRadius: "100%",
    zIndex: "9999",
    transition: "all 0.3s ease-in-out",
    pointerEvents: "none",
  });
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


document.querySelectorAll(".blob").forEach(it => {
  blobClip(it, padding = 30, points = 12);
  it.style.transition = "clip-path 1s";
  it.addEventListener("mouseenter", () => blobClip(it, padding = 30, points = 12))
})

document.querySelectorAll(".randshift").forEach(it => {
    it.style.marginLeft = `${randint(40)}%`;

    it.addEventListener("click", expandAnim)
})
