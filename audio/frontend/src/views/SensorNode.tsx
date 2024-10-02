import { Node, NodeProps } from '@xyflow/react';

export default function SensorNode({
  id,
  data,
}: NodeProps<Node<{label: string}>>) {
  return (
    <>
      <div
        className="custom-node"
      >
          {data.label}
      </div>
    </>
  );
}
