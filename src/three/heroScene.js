import * as THREE from 'three'
import { LOGO_BLADES } from '../utils/logo'

/**
 * The hero's WebGL scene: the logo's two blades extruded in brand-blue metal. On load they
 * slide together like a latch and fire a pulse; visitors can drag to spin and click to relock.
 * Returns a cleanup function. Calls `onFallback` when WebGL is unavailable.
 */
export function createHeroScene({ container, canvas, hero, onLive, onFallback }) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
        onFallback();
        return () => {};
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 12);
    const disposables = [];
    const track = (thing) => { disposables.push(thing); return thing; };

    // ---- Studio lighting: soft boxes and colored strips, prefiltered into reflections ----
    const studio = new THREE.Scene();
    studio.add(new THREE.Mesh(
        track(new THREE.BoxGeometry(24, 14, 24)),
        track(new THREE.MeshBasicMaterial({ color: 0x06080c, side: THREE.BackSide }))
    ));
    const lamp = (w, h, hex, power, x, y, z) => {
        const mesh = new THREE.Mesh(
            track(new THREE.PlaneGeometry(w, h)),
            track(new THREE.MeshBasicMaterial({ color: new THREE.Color(hex).multiplyScalar(power), side: THREE.DoubleSide }))
        );
        mesh.position.set(x, y, z);
        mesh.lookAt(0, 0, 0);
        studio.add(mesh);
    };
    lamp(12, 2.4, 0xffffff, 3.0, 0, 6.5, 0);      // overhead soft box
    lamp(1.4, 9, 0x7dd3fc, 5.0, -8, 0, 2);         // sky strip, left
    lamp(1.0, 9, 0xffffff, 3.2, 8, 0.5, 1);        // white strip, right
    lamp(9, 4, 0xa8c8f0, 0.5, 0, 1, 10);           // faint front fill
    lamp(8, 1.2, 0x38bdf8, 2.4, 0, -5.5, 5);       // sky bounce, below
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTarget = pmrem.fromScene(studio, 0.035);
    scene.environment = envTarget.texture;
    pmrem.dispose();

    // ---- The mark ----
    function shapeFrom(d) {
        const tok = d.match(/[a-zA-Z]|-?\d*\.?\d+/g);
        const shape = new THREE.Shape();
        const p = (px, py) => [px - 20, 20.6 - py];   // centre the mark, flip SVG's y axis
        let i = 0, cmd = '', x = 0, y = 0;
        const n = () => parseFloat(tok[i++]);
        while (i < tok.length) {
            if (/[a-zA-Z]/.test(tok[i])) cmd = tok[i++];
            if (cmd === 'M') { x = n(); y = n(); shape.moveTo(...p(x, y)); cmd = 'L'; }
            else if (cmd === 'L') { x = n(); y = n(); shape.lineTo(...p(x, y)); }
            else if (cmd === 'V') { y = n(); shape.lineTo(...p(x, y)); }
            else if (cmd === 'H') { x = n(); shape.lineTo(...p(x, y)); }
            else if (cmd === 'C') {
                const a = p(n(), n());
                const b = p(n(), n());
                x = n(); y = n();
                shape.bezierCurveTo(a[0], a[1], b[0], b[1], ...p(x, y));
            }
            else break;   // Z closes the blade
        }
        return shape;
    }
    const EXTRUDE = { depth: 4, bevelEnabled: true, bevelThickness: 1.1, bevelSize: 0.8, bevelOffset: -0.35, bevelSegments: 10, curveSegments: 36 };
    // Brand sky blue (#38bdf8): tinted metal faces, lighter ice-blue polished edges
    const faceMat = track(new THREE.MeshPhysicalMaterial({ color: 0x38bdf8, metalness: 1, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.1, emissive: 0x0a3d5c, emissiveIntensity: 0.9 }));
    const edgeMat = track(new THREE.MeshPhysicalMaterial({ color: 0xa8e5ff, metalness: 1, roughness: 0.12, emissive: 0x0a3d5c, emissiveIntensity: 0.5 }));

    const pivot = new THREE.Group();
    const mark = new THREE.Group();
    pivot.add(mark);
    scene.add(pivot);
    const blades = LOGO_BLADES.map((d) => {
        const geo = track(new THREE.ExtrudeGeometry(shapeFrom(d), EXTRUDE));
        geo.translate(0, 0, -EXTRUDE.depth / 2);
        const mesh = new THREE.Mesh(geo, [faceMat, edgeMat]);
        mesh.scale.setScalar(0.1);
        mark.add(mesh);
        return mesh;
    });

    // ---- Glow, dust and the lock pulse ----
    function radialTexture(stops) {
        const c = document.createElement('canvas');
        c.width = c.height = 128;
        const g = c.getContext('2d');
        const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
        stops.forEach(([o, col]) => grd.addColorStop(o, col));
        g.fillStyle = grd;
        g.fillRect(0, 0, 128, 128);
        return track(new THREE.CanvasTexture(c));
    }
    const glow = new THREE.Sprite(track(new THREE.SpriteMaterial({
        map: radialTexture([[0, 'rgba(255,255,255,1)'], [0.3, 'rgba(255,255,255,0.4)'], [1, 'rgba(255,255,255,0)']]),
        color: 0x38bdf8, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false,
    })));
    glow.scale.set(9, 9, 1);
    glow.position.z = -1.6;
    pivot.add(glow);

    const DUST = window.innerWidth < 700 ? 520 : 1100;
    const dustPos = new Float32Array(DUST * 3);
    const dustCol = new Float32Array(DUST * 3);
    const cool = new THREE.Color(0xcfe3ff);
    const skyC = new THREE.Color(0x38bdf8);
    for (let k = 0; k < DUST; k++) {
        dustPos[k * 3] = (Math.random() * 2 - 1) * 16;
        dustPos[k * 3 + 1] = (Math.random() * 2 - 1) * 9;
        dustPos[k * 3 + 2] = 3 - Math.random() * 18;
        const c = Math.random() < 0.22 ? skyC : cool;
        const lum = 0.3 + Math.random() * 0.7;
        dustCol[k * 3] = c.r * lum;
        dustCol[k * 3 + 1] = c.g * lum;
        dustCol[k * 3 + 2] = c.b * lum;
    }
    const dustGeo = track(new THREE.BufferGeometry());
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    dustGeo.setAttribute('color', new THREE.BufferAttribute(dustCol, 3));
    const dust = new THREE.Points(dustGeo, track(new THREE.PointsMaterial({
        size: 0.07, sizeAttenuation: true, vertexColors: true, transparent: true, depthWrite: false,
        blending: THREE.AdditiveBlending,
        map: radialTexture([[0, 'rgba(255,255,255,1)'], [0.45, 'rgba(255,255,255,0.5)'], [1, 'rgba(255,255,255,0)']]),
    })));
    scene.add(dust);

    const rings = [0, 1].map(() => {
        const ring = new THREE.Mesh(
            track(new THREE.RingGeometry(1, 1.025, 160)),
            track(new THREE.MeshBasicMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }))
        );
        pivot.add(ring);
        return ring;
    });

    const keyLight = new THREE.DirectionalLight(0xffffff, 2);
    keyLight.position.set(4, 6, 6);
    scene.add(keyLight);
    const cursorLight = new THREE.PointLight(0x7dd3fc, 40, 30, 2);
    cursorLight.position.set(-3, 1, 5);
    scene.add(cursorLight);

    // ---- Motion ----
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const lerp = (a, b, t) => a + (b - a) * t;
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const OPEN = 1.7;   // how far the blades start apart
    const GLIDE = 900;  // ms for the blades to slide shut
    const state = {
        t0: -1,
        visible: true,
        layoutX: 0,
        heroH: 1,
        sep: reduced ? 0 : OPEN,
        lock: reduced ? null : { start: -1, from: OPEN, unlatch: 0 },
        pulseAt: -1,
        mouse: { x: 0, y: 0, tx: 0, ty: 0 },
        drag: { active: false, rot: 0, vel: 0, lastX: 0, downX: 0, downY: 0, downT: 0 },
    };

    function relock() {
        if (state.lock || reduced) return;
        state.lock = { start: -1, from: state.sep, unlatch: 260 };
        state.pulseAt = -1;
    }

    function update(now) {
        if (state.t0 < 0) state.t0 = now;
        const t = now - state.t0;
        const m = state.mouse;
        const drag = state.drag;

        // Blades slide together like a latch, then the pulse fires on contact
        if (state.lock) {
            const L = state.lock;
            if (L.start < 0) L.start = now;
            const e = now - L.start;
            const open = L.unlatch ? 1.25 : L.from;
            if (e < L.unlatch) {
                state.sep = lerp(L.from, open, easeOutCubic(e / L.unlatch));
            } else {
                const k = clamp((e - L.unlatch) / GLIDE, 0, 1);
                state.sep = open * (1 - easeInOutCubic(k));
                if (k >= 1) {
                    if (state.pulseAt < 0) state.pulseAt = now;
                    state.lock = null;
                }
            }
        }
        let settle = 0;
        let thump = 1;
        let flash = 0;
        if (state.pulseAt > 0) {
            const since = now - state.pulseAt;
            const s = clamp(since / 320, 0, 1);
            settle = -0.07 * Math.sin(s * Math.PI) * (1 - s);
            thump = 1 + 0.035 * Math.sin(s * Math.PI);
            flash = Math.pow(1 - clamp(since / 900, 0, 1), 2);
            const pk = since / 1300;
            rings.forEach((ring, idx) => {
                const k = clamp(pk - idx * 0.12, 0, 1);
                ring.scale.setScalar(1.4 + easeOutCubic(k) * 3.8);
                ring.material.opacity = k > 0 && k < 1 ? (1 - k) * (idx ? 0.32 : 0.7) : 0;
            });
        }

        if (!reduced) {
            m.x += (m.tx - m.x) * 0.05;
            m.y += (m.ty - m.y) * 0.05;
        }
        if (!drag.active) {
            drag.rot += drag.vel;
            drag.vel *= 0.94;
        }

        const sp = reduced ? 0 : clamp(window.scrollY / state.heroH, 0, 1);
        const intro = reduced ? 1 : easeOutCubic(clamp(t / 1600, 0, 1));
        const idleY = reduced ? 0 : Math.sin(t * 0.00032) * 0.24;
        const idleX = reduced ? 0 : Math.sin(t * 0.00027 + 1.3) * 0.06;
        const bob = reduced ? 0 : Math.sin(t * 0.0009) * 0.06;

        const sep = state.sep + settle + sp * 0.6;   // scrolling away eases the latch open
        blades[0].position.set(0, sep * 0.9, sep * 0.35);
        blades[1].position.set(0, -sep * 0.9, -sep * 0.35);

        mark.rotation.y = -0.38 + idleY - 1.9 * (1 - intro) + drag.rot + m.x * 0.35 + sp * 0.9;
        mark.rotation.x = 0.1 + idleX + m.y * 0.2;
        mark.scale.setScalar((0.86 + 0.14 * intro) * thump);
        pivot.position.set(state.layoutX, bob + sp * 0.8, 0);

        glow.material.opacity = 0.42 * intro + 0.35 * flash;
        camera.position.x = m.x * 0.35;
        camera.position.y = -m.y * 0.2;
        cursorLight.position.set(state.layoutX + m.x * 5, 1 - m.y * 3, 5);
        if (!reduced) {
            dust.rotation.y = t * 0.000018;
            dust.position.y = sp * 1.2;
        }
    }

    let raf = 0;
    let disposed = false;
    let wentLive = false;
    const keepGoing = () => {
        if (disposed || !state.visible || document.hidden) return false;
        if (!reduced) return true;
        return state.drag.active || Math.abs(state.drag.vel) > 0.0004;
    };
    function frame(now) {
        raf = 0;
        update(now);
        renderer.render(scene, camera);
        if (!wentLive) { wentLive = true; onLive(); }
        if (keepGoing()) kick();
    }
    function kick() {
        if (!raf && !disposed && state.visible && !document.hidden) raf = requestAnimationFrame(frame);
    }

    function resize() {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.position.z = h < 420 ? 10.5 : (w / h < 0.9 ? 13.5 : 12);
        camera.updateProjectionMatrix();
        const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
        const desktop = window.matchMedia('(min-width: 960px)').matches;
        state.layoutX = desktop ? halfH * camera.aspect * 0.5 : 0;
        state.heroH = Math.max(hero.offsetHeight, 1);
        kick();
    }
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
        state.visible = entry.isIntersecting;
        kick();
    });
    visibilityObserver.observe(container);

    // ---- Interaction: pointer parallax, drag to spin, click to relock ----
    const onWindowPointer = (e) => {
        if (reduced || e.pointerType !== 'mouse') return;
        state.mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
        state.mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onDown = (e) => {
        const d = state.drag;
        d.active = true;
        d.lastX = d.downX = e.clientX;
        d.downY = e.clientY;
        d.downT = performance.now();
        d.vel = 0;
        canvas.setPointerCapture(e.pointerId);
        canvas.classList.add('is-grabbing');
        kick();
    };
    const onMove = (e) => {
        const d = state.drag;
        if (!d.active) return;
        const dx = e.clientX - d.lastX;
        d.lastX = e.clientX;
        d.rot += dx * 0.009;
        d.vel = dx * 0.009;
        kick();
    };
    const onUp = (e) => {
        const d = state.drag;
        if (!d.active) return;
        d.active = false;
        canvas.classList.remove('is-grabbing');
        const moved = Math.hypot(e.clientX - d.downX, e.clientY - d.downY);
        if (e.type === 'pointerup' && moved < 6 && performance.now() - d.downT < 400) relock();
        kick();
    };
    const onContextLost = (e) => {
        e.preventDefault();
        cancelAnimationFrame(raf);
        raf = 0;
        state.visible = false;
        onFallback();
    };
    window.addEventListener('pointermove', onWindowPointer, { passive: true });
    document.addEventListener('visibilitychange', kick);
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);
    canvas.addEventListener('webglcontextlost', onContextLost);

    kick();

    return () => {
        disposed = true;
        cancelAnimationFrame(raf);
        resizeObserver.disconnect();
        visibilityObserver.disconnect();
        window.removeEventListener('pointermove', onWindowPointer);
        document.removeEventListener('visibilitychange', kick);
        canvas.removeEventListener('pointerdown', onDown);
        canvas.removeEventListener('pointermove', onMove);
        canvas.removeEventListener('pointerup', onUp);
        canvas.removeEventListener('pointercancel', onUp);
        canvas.removeEventListener('webglcontextlost', onContextLost);
        disposables.forEach((thing) => thing.dispose());
        envTarget.dispose();
        renderer.dispose();
    };
}
