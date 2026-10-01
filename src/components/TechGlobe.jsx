import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

/**
 * A slowly turning 3D sphere of tool labels. Each label sits on a Fibonacci sphere; every frame
 * the points are rotated and projected, with depth driving scale, opacity and stacking order.
 * Drag to spin it. Pauses when off screen and stays still with reduced motion.
 */
export default function TechGlobe({ items }) {
    const globeRef = useRef(null);
    const itemRefs = useRef([]);

    useEffect(() => {
        const globe = globeRef.current;
        const els = itemRefs.current;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const count = els.length;
        const golden = Math.PI * (3 - Math.sqrt(5));
        const points = els.map((_, i) => {
            const y = 1 - (i / (count - 1)) * 2;
            const r = Math.sqrt(1 - y * y);
            const theta = golden * i;
            return [Math.cos(theta) * r, y, Math.sin(theta) * r];
        });

        let radius = 160;
        let rotX = -0.35;
        let rotY = 0;
        let velY = reduced ? 0 : 0.0035;
        let velX = 0;
        let dragging = false;
        let lastX = 0;
        let lastY = 0;
        let visible = true;
        let raf = 0;

        const render = () => {
            const cx = Math.cos(rotX), sx = Math.sin(rotX);
            const cy = Math.cos(rotY), sy = Math.sin(rotY);
            points.forEach(([x, y, z], i) => {
                const x1 = x * cy + z * sy;            // spin around the vertical axis
                const z1 = -x * sy + z * cy;
                const y2 = y * cx - z1 * sx;           // then tilt toward the viewer
                const z2 = y * sx + z1 * cx;
                const depth = (z2 + 1) / 2;            // 0 = back, 1 = front
                const el = els[i];
                el.style.transform = `translate(-50%, -50%) translate3d(${(x1 * radius).toFixed(1)}px, ${(y2 * radius).toFixed(1)}px, 0) scale(${(0.62 + depth * 0.48).toFixed(3)})`;
                el.style.opacity = (0.22 + depth * 0.78).toFixed(3);
                el.style.zIndex = String(Math.round(depth * 100));
            });
        };

        const frame = () => {
            raf = 0;
            if (!dragging) {
                rotY += velY;
                rotX += velX;
                velX *= 0.95;
                if (!reduced) velY += (0.0035 - velY) * 0.02;   // ease back to the idle spin
            }
            rotX = Math.max(-1.1, Math.min(1.1, rotX));
            render();
            if (visible && (!reduced || dragging || Math.abs(velY) > 0.0002)) raf = requestAnimationFrame(frame);
        };
        const kick = () => { if (!raf && visible) raf = requestAnimationFrame(frame); };

        const resize = () => {
            radius = globe.clientWidth * 0.36;
            render();
        };
        resize();
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(globe);
        const visibilityObserver = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            kick();
        });
        visibilityObserver.observe(globe);

        const onDown = (e) => {
            dragging = true;
            lastX = e.clientX;
            lastY = e.clientY;
            globe.setPointerCapture(e.pointerId);
            globe.classList.add('is-grabbing');
            kick();
        };
        const onMove = (e) => {
            if (!dragging) return;
            velY = (e.clientX - lastX) * 0.006;
            velX = -(e.clientY - lastY) * 0.006;
            rotY += velY;
            rotX += velX;
            lastX = e.clientX;
            lastY = e.clientY;
            kick();
        };
        const onUp = () => {
            dragging = false;
            globe.classList.remove('is-grabbing');
            kick();
        };
        globe.addEventListener('pointerdown', onDown);
        globe.addEventListener('pointermove', onMove);
        globe.addEventListener('pointerup', onUp);
        globe.addEventListener('pointercancel', onUp);
        kick();

        return () => {
            cancelAnimationFrame(raf);
            resizeObserver.disconnect();
            visibilityObserver.disconnect();
            globe.removeEventListener('pointerdown', onDown);
            globe.removeEventListener('pointermove', onMove);
            globe.removeEventListener('pointerup', onUp);
            globe.removeEventListener('pointercancel', onUp);
        };
    }, [items]);

    return (
        <div>
            <div className="rd-globe" ref={globeRef} aria-hidden="true">
                {items.map(({ label, icon }, i) => (
                    <span key={label} className={'rd-globe-item' + (icon ? '' : ' no-icon')} ref={(el) => { itemRefs.current[i] = el; }}>
                        {icon && <img src={icon} alt="" width="16" height="16" draggable="false" />}
                        {label}
                    </span>
                ))}
            </div>
            <p className="rd-globe-hint">Drag to spin</p>
        </div>
    )
}

TechGlobe.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string.isRequired, icon: PropTypes.string })).isRequired,
}
