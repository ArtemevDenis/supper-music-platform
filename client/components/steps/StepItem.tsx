import React from 'react';


interface StepItemProps {
    error?: boolean
    title: string
}

const StepItem: React.FC<StepItemProps> = ({title, error = false, children}) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default StepItem;