import React, { useEffect, useState } from 'react';
import { CustomRadio } from './question_formats/radio';
import { RadioGroup } from '@nextui-org/react';

interface ProblemProps {
    problem: string
    choices: object[]
    note: string
}

const ProblemPage: React.FC<ProblemProps> = ({
    problem,
    choices,
    note
}) => {
    return <div className="">
        <RadioGroup label={problem} description={note}>
            {choices.map((value: any, index: number) => (
                <CustomRadio description={value.description} value={value.key} key={index}>
                    {value.content}
                </CustomRadio>
            ))}
        </RadioGroup>
    </div>
};

export default ProblemPage