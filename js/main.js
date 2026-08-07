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


const list = document.querySelector(".funny-links")

async function addAnimation(it) {
  await new Promise(r => setTimeout(r, 100))
  it.style.transitionDuration = "0.5s";
}

list.querySelectorAll("a").forEach(it => {
  it.style.marginLeft = `${randint(200)}px`;
  it.style.marginLeft = `${randint(200)}px`;
  blobClip(it, padding = 30, points = 12);
  it.addEventListener("mouseenter", () => blobClip(it, padding = 30, points = 12))

  addAnimation(it)
})
