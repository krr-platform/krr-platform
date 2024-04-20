/* eslint-disable new-cap */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, RefObject } from 'react';
import p5 from 'p5';

export default function TreeVisualizer() {
    const breadth = 4;
    const depth = 4;
    const w = 100 + 100 * breadth;
    const h = 100 + 100 * depth;
    const parentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const sketch = (p: p5) => {
            p.setup = () => {
                const initialTop = window.innerHeight / 2 - h / 2;
                const initialLeft = window.innerWidth / 2 - w / 2;
                p.createCanvas(w, h).parent(parentRef.current!);
                // const canvas = p.createCanvas(w, h);
                // canvas.position(initialLeft, initialTop);
                p.background(220);
                p.translate(w / 2, 50);
                p.circle(0, 0, 50);
                p.text('forall', -15, 0);
            };
        };

        const p5Instance = new p5(sketch);

        return () => {
            p5Instance.remove();
        };
    });

    return <div ref={parentRef} style={{ position: 'relative' }} />;
}
