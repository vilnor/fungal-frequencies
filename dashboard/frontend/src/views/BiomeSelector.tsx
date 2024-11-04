type BiomeSelectorProps = {
    onSensorClick: (sensorId: number) => void
    selectedSensors: number[]
}

/***
 * This is a custom SVG component that displays a biome selector.
 * It allows the user to select sensors by clicking on them.
 * The selected sensors are highlighted in black./
 */
function BiomeSelector({ onSensorClick, selectedSensors }: BiomeSelectorProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 2"
            viewBox="0 0 132.63 261.9"
            height={'100%'}
        >
            <g data-name="Layer 2">
                <path
                    d="M2.64 153.32h.02l-.02.03v-.03zM132.13.5 98.5 36.68H.52L34.15.5h97.98zM132.13.5v118.95l-2.14 2.31-3.25 3.5-2.14 2.3-23.97 25.77-2.13 2.3V36.68L132.13.5z"
                    style={{
                        fill: 'none',
                        stroke: '#000',
                        strokeLinejoin: 'bevel',
                    }}
                />
                <path
                    d="M2.64 153.32v.03l.02-.03h-.02Zm0 0v.03l.02-.03h-.02Z"
                    style={{
                        fill: 'none',
                        stroke: '#000',
                        strokeLinejoin: 'bevel',
                    }}
                />
                <path
                    d="M.52 36.68v118.95H98.5V36.68H.52Zm2.12 116.67v-.03h.02l-.02.03ZM93.1 155.63h5.39V258.7H93.1zM100.63 153.33V256.4l-.66.71-1.47 1.6V155.63l2.13-2.3zM.5 155.63h5.39V258.7H.5z"
                    style={{
                        fill: 'none',
                        stroke: '#000',
                        strokeLinejoin: 'bevel',
                    }}
                />
                <path
                    d="M8.03 155.63v49.24l-2.14 2.3v-51.54h2.14zM8.03 228.6v27.8l-.73.78-1.41 1.53V228.6h2.14zM129.99 121.76v51.54h-5.39v-45.74l2.14-2.3 3.25-3.5z"
                    style={{
                        fill: 'none',
                        stroke: '#000',
                        strokeLinejoin: 'bevel',
                    }}
                />
                <path
                    d="M132.13 119.45v103.08l-.58.63-1.56 1.68V173.3h.01-.01v-51.54l2.14-2.31zM130 173.3h-.01.01zM37.41 155.63v17.66l-.01.01h-5.39v-17.67h5.4zM39.54 155.63v15.51l-2.13 2.15v-17.66h2.13zM37.41 193.62h2.13v11.25h-2.13zM5.89 207.17H93.1v21.44H5.89zM124.6 173.3l-.12.13"
                    style={{
                        fill: 'none',
                        stroke: '#000',
                        strokeLinejoin: 'bevel',
                    }}
                />
                <path
                    d="M129.99 173.3v19.97l-5.39 5.8-23.97 25.77v-19.97l10.47-11.25 13.5-14.52.02-.02 5.37-5.78zM37.41 173.29l-.01.01M93.1 204.87v2.3H5.89l2.14-2.3H93.1zM37.39 193.27l-5.38 5.78M37.41 173.43H93.1v20.19H37.41z"
                    style={{
                        fill: 'none',
                        stroke: '#000',
                        strokeLinejoin: 'bevel',
                    }}
                />
                <path
                    d="m129.99 173.3-5.37 5.78-.02.02-13.5 14.52-10.47 11.25v-5.81l5.07-5.44 18.78-20.19h.12v-.13h5.39z"
                    style={{
                        fill: 'none',
                        stroke: '#000',
                        strokeLinejoin: 'bevel',
                    }}
                />
                <path
                    d="m124.48 173.43-18.78 20.19h-5.07v-20.19h23.85zM93.1 171.14v2.29H37.41v-.14l2.13-2.15H93.1zM124.62 171.14h-23.99M8.03 199.06v5.81-49.24h23.98v17.67H32L8.03 199.06z"
                    style={{
                        fill: 'none',
                        stroke: '#000',
                        strokeLinejoin: 'bevel',
                    }}
                />
                <path
                    d="M37.41 173.29v31.58h-5.4v-5.82l-5.41 5.82H8.03l23.98-25.78 5.39-5.79.01-.01zM7.54 258.35c0 1.69-1.36 3.05-3.05 3.05-1.56 0-2.85-1.17-3.02-2.69h4.42l1.41-1.52c.16.36.24.75.24 1.17ZM100.24 258.35c0 1.69-1.36 3.05-3.05 3.05-1.56 0-2.85-1.17-3.02-2.69h4.32l1.48-1.59c.17.38.26.79.26 1.24ZM129.99 193.27v31.57h-5.39v-25.77l5.39-5.8z"
                    style={{
                        fill: 'none',
                        stroke: '#000',
                        strokeLinejoin: 'bevel',
                    }}
                />
                <path
                    d="M132.05 224.84c0 1.68-1.37 3.04-3.05 3.04s-3.05-1.36-3.05-3.04h4.04l1.56-1.68c.32.48.5 1.06.5 1.68ZM37.41 173.29l-5.4.01M37.41 173.29l-.01.01M37.4 173.3l-5.39 5.79-23.98 25.78v-5.81L32 173.3h5.4zM.52 113.67c2.6-.04 4.7-.13 6.19-.2.48-.03 1.06-.01 3.78-.21 2.33-.17 2.96-.29 4.08-.18 7.07.71 8.35 2.45 13.13 3 5.72.66 5.5-1.65 13.42-2.13 6.52-.4 6.9 1.16 17.73 1.43 4.76.12 7.14.18 9.78-.38 5.15-1.1 6.46-2.92 10.96-3 3.44-.06 4.1.98 7.83 1.28 4.13.33 7.89-.59 11.09-1.92.79.12 2.11.2 3.45-.38 3.42-1.49 2.64-5.42 6.29-8.59 2.34-2.03 3.13-.98 7.03-3.64.94-.64 3.08-2.22 4.98-4.79 2.48-3.36 1.63-4.31 3.83-6.9 2.07-2.44 4.33-3.33 5.85-4.95.98-1.04 2.05-2.84 2.2-6.13M.52 155.63l.68-.73"
                    style={{
                        fill: 'none',
                        stroke: '#000',
                        strokeLinejoin: 'bevel',
                    }}
                />
                <path
                    d="m2.6 153.38 30.17-32.61"
                    style={{
                        fill: 'none',
                        stroke: '#000',
                        strokeDasharray: '0 0 2.07 2.07',
                        strokeLinejoin: 'bevel',
                    }}
                />
                <path
                    d="m33.47 120.01.68-.73"
                    style={{
                        fill: 'none',
                        stroke: '#000',
                        strokeLinejoin: 'bevel',
                    }}
                />
                <path
                    d="M132.13 119.95h-2v-1h2v1Zm-4 0h-2v-1h2v1Zm-4 0h-2v-1h2v1Zm-4 0h-2v-1h2v1Zm-4 0h-2v-1h2v1Zm-4 0h-2v-1h2v1Zm-4 0h-2v-1h2v1Zm-4 0h-2v-1h2v1Zm-4 0h-2v-1h2v1Zm-4 0h-2v-1h2v1Zm-4 0h-2v-1h2v1Zm-4 0h-2v-1h2v1Zm-4 0h-2v-1h2v1Zm-4 0h-2v-1h2v1Zm-4 0h-2v-1h2v1Zm-4 0h-2v-1h2v1Zm-4 0h-2v-1h2v1Zm-4 0h-2v-1h2v1Zm-4 0h-2v-1h2v1Zm-4 0h-2v-1h2v1Zm-4 0h-2v-1h2v1Zm-4 0h-2v-1h2v1Zm-4 0h-2v-1h2v1Zm-4 0h-2v-1h2v1Zm-4 0h-1.98v-1h1.98v1ZM34.65 118.5h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Zm0-4h-1v-2h1v2Z"
                    style={{
                        fill: '#000',
                    }}
                />
                <path
                    d="m1 113.8-.96-.27c.05-.19.11-.4.18-.61l.95.3c-.06.2-.12.4-.17.58Zm.86-2.4-.92-.4c.27-.63.58-1.24.92-1.83l.87.5c-.32.56-.61 1.15-.87 1.74Zm1.92-3.38-.81-.58c.4-.55.83-1.09 1.28-1.6l.75.66c-.43.48-.84 1-1.22 1.52Zm2.58-2.91-.67-.74c.5-.46 1.01-.88 1.52-1.24l.09-.06.57.82-.07.05c-.48.34-.96.73-1.43 1.17Zm3.15-2.22-.45-.89c.7-.35 1.34-.6 1.89-.8l.34.94c-.52.19-1.13.42-1.79.75Zm3.68-1.48-.39-.92c.6-.26 1.16-.54 1.73-.87l.5.87c-.6.35-1.21.65-1.84.92Zm3.56-2.03-.58-.82c.53-.38 1.05-.78 1.54-1.2l.65.76c-.52.44-1.06.86-1.61 1.26Zm3.11-2.65-.71-.7.16-.17c.22-.52.48-1.01.75-1.46l.85.52c-.27.44-.51.92-.73 1.42l-.1.15-.24.24Zm2.2-3.33-.73-.68c.36-.38.74-.74 1.15-1.06.15-.12.3-.22.44-.32l.56.83c-.13.09-.26.18-.39.29-.37.28-.71.6-1.03.95Zm3.09-2.09-.35-.94c.26-.1.51-.18.76-.26.37-.12.73-.24 1.09-.4l.41.91c-.39.17-.78.3-1.18.44-.24.08-.48.16-.73.25Zm3.69-1.93-.71-.7.07-.08c.48-.51.7-.92.91-1.42l.92.38c-.24.59-.53 1.11-1.11 1.72l-.09.09Zm1.96-3.61-.89-.46c.22-.43.48-.86.79-1.31.1-.15.21-.3.31-.44l.81.59c-.1.13-.2.27-.29.42-.29.42-.52.82-.73 1.21Zm2.26-3.11-.73-.69c.47-.49.97-.97 1.5-1.41l.64.77c-.5.41-.98.86-1.41 1.32ZM53.06 83.06c-.42 0-.86-.02-1.35-.07l.1-1c.72.07 1.34.08 1.92.04l.06 1c-.23.01-.48.02-.73.02Zm2.77-.3-.19-.98c.27-.05.54-.11.82-.17.36-.07.74-.15 1.14-.23l.18.98c-.4.07-.76.15-1.12.22-.29.06-.56.12-.84.17Zm-6.15-.08c-.69-.14-1.32-.3-1.98-.52l.3-.95c.63.2 1.23.36 1.88.49l-.2.98Zm21.95-.04-.06-1c.6-.04 1.16-.17 1.77-.42l.38.92c-.72.3-1.39.46-2.1.5Zm-2.1-.14-.75-.12c-.38-.06-.78-.13-1.22-.19l.14-.99c.45.06.86.13 1.24.19l.74.12-.15.99Zm-9.82-.42-.11-.99c.66-.08 1.32-.13 2.03-.16l.04 1c-.68.03-1.32.08-1.96.15Zm5.89-.11c-.41-.03-.84-.05-1.31-.06h-.66l.01-1.01h.67c.48.02.93.05 1.35.08l-.07 1Zm-19.81-.46c-.45-.15-1.06-.34-1.86-.49l.19-.98c.86.16 1.52.37 1.99.52l-.32.95Zm29.76-.32-.5-.87c.58-.33 1.16-.65 1.84-.93l.37.93c-.63.25-1.15.54-1.72.87Zm-39.4-.15-.17-.99c.67-.12 1.35-.2 2.02-.26l.09 1c-.64.06-1.3.14-1.94.25Zm5.85-.27c-.6-.05-1.22-.07-1.83-.07h-.12l-.01-1h.13c.64 0 1.28.03 1.91.08l-.08 1Zm46.93-.6c-.71 0-1.38-.02-2.02-.05l.04-1c.62.03 1.29.04 1.98.05v1Zm2.01-.02-.03-1c.64-.02 1.3-.05 1.98-.09l.06 1c-.69.04-1.37.07-2.02.09ZM84.89 80c-.56-.04-1.08-.09-1.54-.14v-.02l-.05.05c-.13-.03-.26-.05-.41-.08l.07-.41h-.06l.08-.07.09-.5c.12.02.24.04.36.07l.03-.03c.46.05.96.09 1.52.14l-.08 1Zm10.07-.11-.1-1c.71-.07 1.36-.15 1.96-.24l.14.99c-.62.09-1.28.17-2 .24Zm-15.88-.09-.18-.98c.66-.12 1.33-.18 2.01-.18l.07 1h-.07c-.62 0-1.24.05-1.83.16Zm40.6-.31c-.4 0-.77-.01-1.12-.03l.05-1c.33.02.69.03 1.07.03h.32c.19 0 .38 0 .56-.02l.04 1c-.19 0-.39.01-.58.01h-.33Zm2.95-.17-.11-.99c.64-.07 1.3-.17 1.94-.29l.19.98c-.67.13-1.35.23-2.01.31Zm-23.68 0-.18-.98c.7-.13 1.34-.27 1.94-.4l.21.98c-.62.13-1.26.27-1.97.4Zm17.56-.08c-.7-.12-1.31-.26-1.99-.42l.24-.97c.65.16 1.25.3 1.92.41l-.17.99Zm10.11-.68-.26-.97c.62-.17 1.26-.36 1.88-.57l.33.95c-.65.22-1.3.42-1.95.59Zm-23.76-.07-.2-.98a28 28 0 0 1 2-.34l.13.99c-.6.08-1.21.18-1.94.32Zm9.73-.11c-.64-.12-1.27-.21-1.93-.28l.1-1c.69.07 1.35.16 2.02.29l-.19.98Zm-5.85-.38-.04-1c.61-.03 1.26-.03 1.98-.02l.04.5v.5h-.07c-.69-.02-1.32-.01-1.91.02Zm23.72-.76-.39-.92c.66-.28 1.25-.55 1.79-.82l.44.9c-.55.27-1.17.56-1.85.85Z"
                    style={{
                        fill: '#000',
                    }}
                />
                <g
                    data-name="sensor-4"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onSensorClick(4)}
                >
                    <path
                        d="M9.15 91.13h10.87v18.39H9.15z"
                        style={{
                            fill: selectedSensors.includes(4) ? '#000' : '#fff',
                            stroke: '#000',
                            strokeLinejoin: 'bevel',
                        }}
                    />
                    <path
                        d="M9.15 109.52v18.09M20.02 109.52v18.09M14.59 109.52v18.09M11.87 109.52v18.09M17.3 109.52v18.09"
                        style={{
                            fill: 'none',
                            stroke: '#000',
                            strokeLinecap: 'round',
                            strokeLinejoin: 'bevel',
                        }}
                    />
                    <text
                        style={{
                            fill: selectedSensors.includes(4) ? '#fff' : '#000',
                            fontFamily: 'Roboto,&quot',
                            fontSize: 12,
                        }}
                        transform="translate(11.39 103.96)"
                    >
                        <tspan
                            x={0}
                            y={0}
                        >
                            {'4'}
                        </tspan>
                    </text>
                </g>
                <g
                    data-name="sensor-1"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onSensorClick(1)}
                >
                    <path
                        d="M83.14 91.28h10.87v18.39H83.14z"
                        style={{
                            fill: selectedSensors.includes(1) ? '#000' : '#fff',
                            stroke: '#000',
                            strokeLinejoin: 'bevel',
                        }}
                    />
                    <path
                        d="M83.14 109.66v18.09M94.01 109.66v18.09M88.57 109.66v18.09M85.86 109.66v18.09M91.29 109.66v18.09"
                        style={{
                            fill: '#fff',
                            stroke: '#000',
                            strokeLinecap: 'round',
                            strokeLinejoin: 'bevel',
                        }}
                    />
                    <text
                        style={{
                            fill: selectedSensors.includes(1) ? '#fff' : '#000',
                            fontFamily: 'Roboto,&quot',
                            fontSize: 12,
                        }}
                        transform="translate(85.3 104.44)"
                    >
                        <tspan
                            x={0}
                            y={0}
                        >
                            {'1'}
                        </tspan>
                    </text>
                </g>
                <g
                    data-name="sensor-5"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onSensorClick(5)}
                >
                    <path
                        d="M62.5 79.08h10.87v18.39H62.5z"
                        style={{
                            fill: selectedSensors.includes(5) ? '#000' : '#fff',
                            stroke: '#000',
                            strokeLinejoin: 'bevel',
                        }}
                    />
                    <path
                        d="M62.5 97.46v18.09M73.36 97.46v18.09M67.93 97.46v18.09M65.21 97.46v18.09M70.64 97.46v18.09"
                        style={{
                            fill: '#fff',
                            stroke: '#000',
                            strokeLinecap: 'round',
                            strokeLinejoin: 'bevel',
                        }}
                    />
                    <text
                        style={{
                            fill: selectedSensors.includes(5) ? '#fff' : '#000',
                            fontFamily: 'Roboto,&quot',
                            fontSize: 12,
                        }}
                        transform="translate(64.98 92.26)"
                    >
                        <tspan
                            x={0}
                            y={0}
                        >
                            {'5'}
                        </tspan>
                    </text>
                </g>
                <g
                    data-name="sensor-3"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onSensorClick(3)}
                >
                    <path
                        d="M37.87 66.41h10.87V84.8H37.87z"
                        style={{
                            fill: selectedSensors.includes(3) ? '#000' : '#fff',
                            stroke: '#000',
                            strokeLinejoin: 'bevel',
                        }}
                    />
                    <path
                        d="M37.87 84.8v18.09M48.73 84.8v18.09M43.3 84.8v18.09M40.59 84.8v18.09M46.02 84.8v18.09"
                        style={{
                            fill: '#fff',
                            stroke: '#000',
                            strokeLinecap: 'round',
                            strokeLinejoin: 'bevel',
                        }}
                    />
                    <text
                        style={{
                            fill: selectedSensors.includes(3) ? '#fff' : '#000',
                            fontFamily: 'Roboto,&quot',
                            fontSize: 12,
                        }}
                        transform="translate(40.59 79.08)"
                    >
                        <tspan
                            x={0}
                            y={0}
                        >
                            {'3'}
                        </tspan>
                    </text>
                </g>
                <g
                    data-name="sensor-2"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onSensorClick(2)}
                >
                    <path
                        d="M107.2 66.56h10.87v18.39H107.2z"
                        style={{
                            fill: selectedSensors.includes(2) ? '#000' : '#fff',
                            stroke: '#000',
                            strokeLinejoin: 'bevel',
                        }}
                    />
                    <path
                        d="M107.2 84.95v18.09M118.06 84.95v18.09M112.63 84.95v18.09M109.91 84.95v18.09M115.34 84.95v18.09"
                        style={{
                            fill: '#fff',
                            stroke: '#000',
                            strokeLinecap: 'round',
                            strokeLinejoin: 'bevel',
                        }}
                    />
                    <text
                        style={{
                            fill: selectedSensors.includes(2) ? '#fff' : '#000',
                            fontFamily: 'Roboto,&quot',
                            fontSize: 12,
                        }}
                        transform="translate(109.6 79.08)"
                    >
                        <tspan
                            x={0}
                            y={0}
                        >
                            {'2'}
                        </tspan>
                    </text>
                </g>
            </g>
        </svg>
    );
}

export default BiomeSelector;