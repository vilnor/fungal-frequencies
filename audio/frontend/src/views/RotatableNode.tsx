import { NodeProps, Node, useUpdateNodeInternals } from '@xyflow/react';
import { useEffect, useRef, useState } from 'react';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';
import usePostRot from '../api/useRot';

export default function RotatableNode({
  id,
  data,
}: NodeProps<Node<{label: string}>>) {
  const rotateControlRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const [rotation, setRotation] = useState(0);
  const {postRot} = usePostRot();

  useEffect(() => {
    if (!rotateControlRef.current) {
      return;
    }

    const selection = select<Element, unknown>(rotateControlRef.current);
    const dragHandler = drag().on('drag', async (evt) => {
      const dx = evt.x - 100;
      const dy = evt.y - 100;
      const rad = Math.atan2(dx, dy);
      const deg = rad * (180 / Math.PI);
      setRotation(180 - deg);
      updateNodeInternals(id);
      await postRot(deg)
    });

    selection.call(dragHandler);
  }, [id, updateNodeInternals]);

  return (
    <>
      <div
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
        className="react-flow__node-default"
      >
        <div
          ref={rotateControlRef}
          style={{
            display: 'block',
          }}
          className={`nodrag rotateHandle`}
        />
        <div>
          {data.label}
        </div>
      </div>
    </>
  );
}
