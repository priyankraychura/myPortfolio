import * as THREE from 'three'

/**
 * A small virtual photo studio (soft boxes and sky-blue strips) prefiltered into an
 * environment map, so metal and glass have something to reflect. Dispose the returned target.
 */
export function createStudioEnvironment(renderer) {
    const studio = new THREE.Scene();
    const owned = [];
    const keep = (thing) => { owned.push(thing); return thing; };
    studio.add(new THREE.Mesh(
        keep(new THREE.BoxGeometry(24, 14, 24)),
        keep(new THREE.MeshBasicMaterial({ color: 0x06080c, side: THREE.BackSide }))
    ));
    const lamp = (w, h, hex, power, x, y, z) => {
        const mesh = new THREE.Mesh(
            keep(new THREE.PlaneGeometry(w, h)),
            keep(new THREE.MeshBasicMaterial({ color: new THREE.Color(hex).multiplyScalar(power), side: THREE.DoubleSide }))
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
    const target = pmrem.fromScene(studio, 0.035);
    pmrem.dispose();
    owned.forEach((thing) => thing.dispose());
    return target;
}
