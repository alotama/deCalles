import React, { FC } from 'react';

interface inputProps {
    label: string,
    value: string,
    onChange: (e: any) => void,
}

const Input: FC<inputProps> = ({
    label,
    value,
    onChange,
}) => {
    return (
        <>
            <label>
                <span className='text-base text-gray-800 pr-1'>{label}</span>
                <input
                    className='border'
                    type="text" value={value} onChange={onChange} />
            </label>
        </>
    )
}

export default Input;