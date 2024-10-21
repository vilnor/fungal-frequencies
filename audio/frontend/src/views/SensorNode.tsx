import { Node, NodeProps } from '@xyflow/react';

export default function SensorNode({
                                       id,
                                       data,
                                   }: NodeProps<Node<{ label: string }>>) {
    return (
        <div>
            <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.87 37.48">
                <g id="Layer_2-2">
                    <rect x=".5" y=".5" width="10.87" height="18.39"
                          style={{ fill: '#fff', stroke: '#047900', strokeLinejoin: 'bevel' }}/>
                    <line x1=".5" y1="18.89" x2=".5" y2="36.98"
                          style={{
                              fill: '#fff',
                              stroke: '#047900',
                              strokeLinecap: 'round',
                              strokeLinejoin: 'bevel',
                          }}/>
                    <line x1="11.37" y1="18.89" x2="11.37" y2="36.98"
                          style={{
                              fill: '#fff',
                              stroke: '#047900',
                              strokeLinecap: 'round',
                              strokeLinejoin: 'bevel',
                          }}/>
                    <line x1="5.93" y1="18.89" x2="5.93" y2="36.98"
                          style={{
                              fill: '#fff',
                              stroke: '#047900',
                              strokeLinecap: 'round',
                              strokeLinejoin: 'bevel',
                          }}/>
                    <line x1="3.22" y1="18.89" x2="3.22" y2="36.98"
                          style={{
                              fill: '#fff',
                              stroke: '#047900',
                              strokeLinecap: 'round',
                              strokeLinejoin: 'bevel',
                          }}/>
                    <line x1="8.65" y1="18.89" x2="8.65" y2="36.98"
                          style={{
                              fill: '#fff',
                              stroke: '#047900',
                              strokeLinecap: 'round',
                              strokeLinejoin: 'bevel',
                          }}/>
                    <text transform="translate(2.66 13.66)"
                          style={{ fill: '#047900', fontSize: '12px' }}>
                        <tspan x="0" y="0">{data.label}</tspan>
                    </text>
                </g>
            </svg>
        </div>
    );
}
