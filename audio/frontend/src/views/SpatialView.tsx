import { Node, ReactFlow, useNodesState, Viewport } from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import React, { useCallback, useState } from 'react';
import usePostPos from '../api/usePos';
import RotatableNode from './RotatableNode';
import SensorNode from './SensorNode';

const nodeTypes = {
    rotatable: RotatableNode,
    sensor: SensorNode,
};

const initialNodes = [
    {
        id: '1',
        width: 50,
        height: 50,
        connectable: false,
        draggable: false,
        selectable: false,
        position: { x: 100, y: 100 },
        data: { label: '1' },
        type: 'sensor',
    },
    {
        id: '2',
        width: 50,
        height: 50,
        connectable: false,
        draggable: false,
        selectable: false,
        position: { x: 100, y: -100 },
        data: { label: '2' },
        type: 'sensor',
    },
    {
        id: '3',
        width: 50,
        height: 50,
        connectable: false,
        draggable: false,
        selectable: false,
        position: { x: -100, y: -100 },
        data: { label: '3' },
        type: 'sensor',
    },
    {
        id: '4',
        width: 50,
        height: 50,
        connectable: false,
        draggable: false,
        selectable: false,
        position: { x: -100, y: 100 },
        data: { label: '4' },
        type: 'sensor',
    },
    {
        id: '5',
        width: 50,
        height: 50,
        connectable: false,
        draggable: false,
        selectable: false,
        position: { x: 0, y: 0 },
        data: { label: '5' },
        type: 'sensor',
    },
    {
        id: '6',
        width: 50,
        height: 50,
        connectable: false,
        position: { x: 0, y: 10 },
        data: { label: 'V' },
        type: 'rotatable',
    },
];

function SpatialView() {

    const { postPos } = usePostPos();
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

    const [viewport, setViewport] = useState<Viewport>({ x: 500, y: 500, zoom: 1 });
    const [spatialFactor, setSpatialFactor] = useState(1);
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

        await postPos(newNodes.filter((node) => node.id !== '6').map((node) => ({
            src: node.id,
            pos: {
                x: node.position.x - (userNode?.position?.x ?? 0),
                y: -(node.position.y - (userNode?.position?.y ?? 0)),
            },
        })));
    }, [nodes, spatialFactor]);
    const onNodeMove = useCallback(async (_e: React.MouseEvent, userNode: Node) => {
        await postPos(nodes.filter((node) => node.id !== '6').map((node) => ({
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
            panOnDrag={false}
            zoomOnDoubleClick={false}
            nodeExtent={[[-600, -600], [600, 600]]}
            nodeTypes={nodeTypes}
        />
    );
}

export default SpatialView;