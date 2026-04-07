(() => {
  const n = 4;
  const kur = [];
  const poz = [];
  let last = { x: 0, y: 0, t: 0 };
  let activeUntil = 0;

  for (let i = 0; i < n; i++) {
    const k = document.createElement("div");
    k.className = "kursor" + (i ? " cień" : "");
    document.body.appendChild(k);
    kur.push(k);
    poz.push({ x: 0, y: 0 });
  }

  document.addEventListener("pointermove", e => {
    const now = performance.now();
    const dx = e.clientX - last.x;
    const dy = e.clientY - last.y;
    const dt = now - last.t || 16;
    const speed = Math.hypot(dx, dy) / dt * 1000;
    if (speed > 1800) activeUntil = now + 300;
    last = { x: e.clientX, y: e.clientY, t: now };
    poz[0] = { x: e.clientX, y: e.clientY };
  });

  function anim() {
    for (let i = poz.length - 1; i > 0; i--) {
      poz[i].x += (poz[i - 1].x - poz[i].x) * 0.45;
      poz[i].y += (poz[i - 1].y - poz[i].y) * 0.45;
    }
    const active = performance.now() < activeUntil;
    kur.forEach((k, i) => {
      k.style.left = poz[i].x + "px";
      k.style.top  = poz[i].y + "px";
      k.classList.toggle("aktywny", active);
    });
    requestAnimationFrame(anim);
  }
  anim();

  document.addEventListener("pointerdown", e => {
    const r = document.createElement("div");
    r.className = "krąg";
    r.style.left = e.clientX + "px";
    r.style.top  = e.clientY + "px";
    document.body.appendChild(r);
    setTimeout(() => r.remove(), 800);
  });
})();
