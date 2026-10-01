import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { createStudioEnvironment } from './studio'

/**
 * A fixed full-screen scene behind the whole home page: blue metal, frosted glass and wireframe
 * shapes spread down the length of the page. Scrolling flies the camera past them (nearer shapes
 * move faster), scroll speed spins them, and the pointer adds a little parallax.
 * Returns a cleanup function; does nothing when WebGL is unavailable.
 */
export function createBackgroundScene({ canvas }) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.matchMedia('(max-width: 759px)').matches;

    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, alpha: true, powerPreference: 'high-performance' });
    } catch {
        return () => {};
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 80);
    camera.position.set(0, 0, 10);
    const envTarget = createStudioEnvironment(renderer);
    scene.environment = envTarget.texture;
    scene.fog = new THREE.Fog(0x07090d, 9, 26);   // far shapes fade into the page

    const owned = [];
    const keep = (thing) => { owned.push(thing); return thing; };

    const metal = keep(new THREE.MeshPhysicalMaterial({
        color: 0x38bdf8, metalness: 1, roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.12,
        emissive: 0x0a3d5c, emissiveIntensity: 0.7,
    }));
    const glass = keep(new THREE.MeshPhysicalMaterial({
        color: 0xbfe8ff, metalness: 0, roughness: 0.18, transmission: 1, thickness: 1.2, ior: 1.45,
        transparent: true, opacity: 0.9,
    }));
    const wire = keep(new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45 }));

    const geometries = [
        keep(new THREE.IcosahedronGeometry(1, 0)),
        keep(new THREE.TorusGeometry(0.85, 0.3, 32, 96)),
        keep(new THREE.OctahedronGeometry(1, 0)),
        keep(new THREE.TorusKnotGeometry(0.65, 0.22, 160, 20)),
        keep(new RoundedBoxGeometry(1.4, 1.4, 1.4, 4, 0.22)),
        keep(new THREE.DodecahedronGeometry(1, 0)),
        keep(new THREE.CylinderGeometry(0.75, 0.75, 0.32, 48)),   // a coin, or a lock's dial
    ];

    // Where each shape lives along the page (0 = top, 1 = bottom), deterministic so the layout
    // feels designed rather than random on every visit
    const COUNT = mobile ? 10 : 18;
    const SPAN = 46;   // world units the camera travels from top to bottom of the page
    let seed = 7;
    const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    const shapes = [];
    for (let i = 0; i < COUNT; i++) {
        const geo = geometries[i % geometries.length];
        const kind = i % 3;   // 0 metal, 1 glass, 2 wireframe
        let object;
        if (kind === 2) {
            object = new THREE.LineSegments(keep(new THREE.EdgesGeometry(geo, 18)), wire);
        } else {
            object = new THREE.Mesh(geo, kind === 0 ? metal : glass);
        }
        const side = i % 2 === 0 ? 1 : -1;
        const spread = mobile ? [1.6, 3.2] : [3.6, 7.2];
        const z = -7 + rand() * 7.5;
        const frac = 0.05 + (i / (COUNT - 1)) * 0.95;
        object.userData = {
            baseX: side * (spread[0] + rand() * (spread[1] - spread[0])),
            baseY: -frac * SPAN + (rand() - 0.5) * 2,
            z,
            depth: 1 + (z + 7) * 0.09,          // nearer shapes scroll past faster
            spin: new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).multiplyScalar(0.6),
            phase: rand() * Math.PI * 2,
        };
        object.scale.setScalar((mobile ? 0.5 : 0.7) + rand() * 0.7);
        object.rotation.set(rand() * 3, rand() * 3, rand() * 3);
        scene.add(object);
        shapes.push(object);
    }

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(5, 6, 8);
    scene.add(keyLight);
    const rim = new THREE.PointLight(0x7dd3fc, 30, 30, 2);
    rim.position.set(-6, 2, 4);
    scene.add(rim);

    const state = { scroll: 0, lastScroll: window.scrollY, spinBoost: 0, mx: 0, my: 0, tmx: 0, tmy: 0, t0: -1 };
    const docSpan = () => Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);

    function update(now) {
        if (state.t0 < 0) state.t0 = now;
        const t = (now - state.t0) / 1000;
        const y = window.scrollY;
        const velocity = y - state.lastScroll;
        state.lastScroll = y;
        state.scroll = y / docSpan();
        state.spinBoost += (Math.min(Math.abs(velocity) * 0.02, 1.5) - state.spinBoost) * 0.08;
        state.mx += (state.tmx - state.mx) * 0.04;
        state.my += (state.tmy - state.my) * 0.04;

        const travel = state.scroll * SPAN;
        shapes.forEach((s) => {
            const d = s.userData;
            const float = reduced ? 0 : Math.sin(t * 0.6 + d.phase) * 0.25;
            s.position.set(d.baseX, d.baseY + travel * d.depth + float, d.z);
            if (!reduced) {
                const rate = 0.004 + state.spinBoost * 0.03;
                s.rotation.x += d.spin.x * rate * 2;
                s.rotation.y += d.spin.y * rate * 2;
                s.rotation.z += d.spin.z * rate;
            }
        });
        camera.position.x = state.mx * 0.6;
        camera.position.y = -state.my * 0.4;
        camera.lookAt(0, 0, 0);
    }

    let raf = 0;
    let disposed = false;
    const frame = (now) => {
        raf = 0;
        update(now);
        renderer.render(scene, camera);
        if (!reduced && !document.hidden && !disposed) raf = requestAnimationFrame(frame);
    };
    const kick = () => { if (!raf && !disposed && !document.hidden) raf = requestAnimationFrame(frame); };

    const resize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        kick();
    };
    const onPointer = (e) => {
        if (reduced || e.pointerType !== 'mouse') return;
        state.tmx = (e.clientX / window.innerWidth) * 2 - 1;
        state.tmy = (e.clientY / window.innerHeight) * 2 - 1;
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', kick, { passive: true });   // reduced motion: redraw on scroll only
    window.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('visibilitychange', kick);
    kick();

    return () => {
        disposed = true;
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
        window.removeEventListener('scroll', kick);
        window.removeEventListener('pointermove', onPointer);
        document.removeEventListener('visibilitychange', kick);
        owned.forEach((thing) => thing.dispose());
        envTarget.dispose();
        renderer.dispose();
    };
}
