import React from 'react';
import useTimeToStingTime from "../../hooks/useTimeToStingTime";

interface TrackProgressProps {
    left: number,
    right: number,
    onChange: (e) => void,
    type: string
}

const TrackProgress: React.FC<TrackProgressProps> = ({right, left, type, onChange}) => {


    const hmsLeft = useTimeToStingTime(left)
    const hmsRight = useTimeToStingTime(right)

    return (
        <div style={{display: "flex"}}>
            <input
                type="range"
                min={0}
                max={right}
                onChange={onChange}
                value={left}
            />
            {/*<div>{left} / {right}</div>*/}
            {type === 'number' && <div>{left} / {right}</div>}
            {type === 'time' && <div>{hmsLeft} / {hmsRight}</div>}
        </div>
    );
};

export default TrackProgress;