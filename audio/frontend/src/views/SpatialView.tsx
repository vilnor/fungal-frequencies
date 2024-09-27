import { Node, ReactFlow, useNodesState, useReactFlow, Viewport } from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import React, { useCallback, useEffect, useState } from 'react';
import usePostPos from '../api/usePos';

const initialNodes = [
    { id: '1', connectable: false, draggable: false, position: { x: 100, y: 100 }, data: { label: '1' } },
    { id: '2', connectable: false, draggable: false, position: { x: 100, y: -100 }, data: { label: '2' } },
    { id: '3', connectable: false, draggable: false, position: { x: -100, y: -100 }, data: { label: '3' } },
    { id: '4', connectable: false, draggable: false, position: { x: -100, y: 100 }, data: { label: '4' } },
    { id: '5', connectable: false, draggable: false, position: { x: 0, y: 0 }, data: { label: '5' } },
    { id: '6', connectable: false, position: { x: 10, y: 10 }, data: { label: 'X' } },
];

function SpatialView() {
    const { postPos } = usePostPos();
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const onViewportChange = useCallback(async (v: Viewport) => {
        const newSpatialFactor = spatialFactor + (v.zoom - 1);
        const newNodes = nodes.map((node) => (
            node.id === '6' ? node : {
                ...node,
                position: {
                    x: node.position.x * newSpatialFactor,
                    y: node.position.y * newSpatialFactor,
                },
            }));
        const userNode = newNodes.find((node) => node.id === '6');

        setNodes(newNodes);
        setSpatialFactor(newSpatialFactor);
        // setViewport({ ...v, zoom: 1 });

        await postPos(newNodes.map((node) => ({
            src: node.id,
            pos: {
                x: node.position.x - (userNode?.position?.x ?? 0),
                y: -(node.position.y - (userNode?.position?.y ?? 0)),
            },
        })));
    }, [nodes]);

    const [viewport, setViewport] = useState<Viewport>({ x: 300, y: 300, zoom: 1 });
    const [spatialFactor, setSpatialFactor] = useState(1);

    const onNodeMove = useCallback(async (_e: React.MouseEvent, userNode: Node) => {
        await postPos(nodes.map((node) => ({
            src: node.id,
            pos: { x: node.position.x - userNode.position.x, y: -(node.position.y - userNode.position.y) },
        })));
    }, [nodes]);

    return (
        <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            viewport={viewport}
            onViewportChange={onViewportChange}
            onNodeDragStop={onNodeMove}
            fitView
        />
    );
}

export default SpatialView;