/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable new-cap */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useRef, useState } from 'react';
import * as p5 from 'p5';
import { calculateDepth, getDisplayValue, getDisplayColor } from '../../../../lib/CalculatorUtils';
import TreeNode from '../../../../lib/TreeNode';

export default function GeneralizationVisualizer(generalization: TreeNode) {
    const [depth, setDepth] = useState(calculateDepth(generalization));
    const parentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        import('p5').then((p5) => {
            if (typeof window === 'undefined' || !parentRef.current) return;
            parentRef.current.innerHTML = '';
            setDepth(calculateDepth(generalization));
            const parentWidth = parentRef.current.offsetWidth;
            const nodeWidth = 50;
            const nodeHeight = 50;
            const horizontalSpacing = parentWidth / 10;
            const verticalSpacing = 60;
            const w = parentWidth;
            const h = nodeHeight * depth + verticalSpacing + (verticalSpacing - nodeHeight) * depth;

            const drawGeneralization = (p: p5, node: TreeNode, x: number, y: number, dx: number, dy: number, level: number) => {
                const numChildren = node.children ? node.children.length : 0;
                const spacingFactor = (depth - level);
                const adjustedDx = (dx * spacingFactor) / numChildren;
                if (node.children) {
                    const startX = x - (adjustedDx * (node.children.length - 1)) / 2;
                    const startY = y + dy;
                    for (let i = 0; i < node.children.length; i += 1) {
                        const child = node.children[i];
                        const childX = startX + i * adjustedDx;
                        const childY = startY;
                        p.stroke(0);
                        p.line(x, y, childX, childY); // Draw edge
                        drawGeneralization(p, child, childX, childY, dx, verticalSpacing, level + 1);
                    }
                }
                p.noStroke();
                p.fill(getDisplayColor(node));
                p.circle(x, y, 50);
                p.fill(255);
                p.textSize(20);
                if (node.type === 'LOGICAL_IMPLICATION' || node.type === 'LOGICAL_EQUIVALENT') {
                    p.text(getDisplayValue(node), x - 10, y + 5);
                } else if (node.value && node.value[0] === ':') {
                    p.text(getDisplayValue(node), x - 12, y + 5);
                } else {
                    p.text(getDisplayValue(node), x - 5, y + 5);
                }
            };

            const sketch = (p: p5) => {
                p.setup = () => {
                    p.createCanvas(w, h).parent(parentRef.current!);
                    p.background(255, 247, 237);
                    drawGeneralization(p, generalization, p.width / 2, verticalSpacing, horizontalSpacing, verticalSpacing, 1);
                    p.noLoop();
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
