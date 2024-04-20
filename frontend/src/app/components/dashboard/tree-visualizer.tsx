/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable new-cap */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useRef, useState } from 'react';
// import p5 from 'p5';
import * as p5 from 'p5';
import { calculateDepth, getDisplayValue, getDisplayColor } from '../../../../lib/CalculatorUtils';
import TreeNode from '../../../../lib/TreeNode';

export default function TreeVisualizer(generalization: TreeNode) {
    const [depth, setDepth] = useState(calculateDepth(generalization));
    // console.log('DEBUG', generalization);
    // console.log('DEPTH', depth);
    const parentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        import('p5').then((p5) => {
            if (typeof window === 'undefined' || !parentRef.current) return;
            parentRef.current.innerHTML = '';
            setDepth(calculateDepth(generalization));
            const parentWidth = parentRef.current.offsetWidth;
            const nodeWidth = 50;
            const nodeHeight = 50;
            const horizontalSpacing = 50;
            const verticalSpacing = 50;
            const w = parentWidth;
            const h = nodeHeight * depth + verticalSpacing;

            const drawTree = (p: p5, node: TreeNode, x: number, y: number, dx: number, dy: number) => {
                const numChildren = node.children ? node.children.length : 0;
                const spacingFactor = 2 / numChildren; // Adjust this factor as needed
                const adjustedDx = dx * spacingFactor;

                if (node.children) {
                    const startX = x - (adjustedDx * (node.children.length - 1)) / 2;
                    const startY = y + dy;
                    for (let i = 0; i < node.children.length; i += 1) {
                        const child = node.children[i];
                        const childX = startX + i * adjustedDx;
                        const childY = startY;
                        p.stroke(0);
                        p.line(x, y, childX, childY); // Draw edge
                        drawTree(p, child, childX, childY, adjustedDx, dy);
                    }
                }
                p.noStroke();
                p.fill(getDisplayColor(node));
                p.circle(x, y, 50); // Draw node
                p.fill(255);
                p.textSize(20);
                p.text(getDisplayValue(node), x - 5, y + 5); // Draw node label
            };

            const sketch = (p: p5) => {
                p.setup = () => {
                    p.createCanvas(w, h).parent(parentRef.current!);
                    p.background(255, 247, 237);
                    // p.background(255);
                    p.noLoop();
                    drawTree(p, generalization, p.width / 2, 50, 100, 50);
                    // p.translate(w / 2, 50);
                    // p.circle(0, 0, 50);
                    // p.text('forall', -15, 0);
                };
            };

            const p5Instance = new p5.default(sketch);

            return () => {
                p5Instance.remove();
            };
        });
    }, [generalization, depth]);

    return <div ref={parentRef} style={{ position: 'relative' }} className="overflow-visible" />;
}
