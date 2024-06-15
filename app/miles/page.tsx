'use client'

import { Button, Textarea } from "@nextui-org/react"
import { useState } from "react";
import { suggestions } from "./import";
import { ListItem } from "@/components/miles/listitem";



export default function Page() {
    const [text, setText] = useState('');
    const [showIdeas, setShowIdeas] = useState<string[] | null>(null);
    const [forkIdea, setForkedIdea] = useState<string | null>(null);
    const [showForkIdeas, setShowForkIdeas] = useState<string[] | null>(null);

    const callback = async (s: string) => {
        setForkedIdea(s);
        const ideas = await suggestions(s, 'fork');
        setShowForkIdeas(ideas);
    }


    return <main className='w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-black'>
        {showIdeas == null && <div className='w-1/2 h-1/2 flex flex-col gap-y-3'>
            <Textarea minRows={6} value={text} onValueChange={setText} />
            <div className='flex flex-row w-full items-center justify-center'>
                <Button variant={'ghost'} className='px-2 py-2 text-2xl' color={'warning'} onClick={async () => {
                    const ideas = await suggestions(text, 'new_idea');
                    console.log(ideas)
                    setShowIdeas(ideas);
                }}>
                    Generate {'  '} &#x1F52E;
                </Button>
            </div>
        </div>}
        {showIdeas && forkIdea == null && <div className='w-full h-1/2 flex flex-col gap-y-3'>
            <h1 className='text-white self-center text-center text-3xl'>User Input: <span className='p-2 border-1 border-white rounded-md font-semibold'>{text}</span></h1>
            <h1 className='text-white self-center text-center text-3xl'>Generated Ideas</h1>
            <div className='w-4/5 h-full grid grid-cols-2 grid-rows-4 self-center py-5 gap-y-4 gap-x-4'>
                {showIdeas.map((text, index) => (<ListItem key={index} text={text} callback={callback} />))}
            </div>
            
        </div>}
        {forkIdea && showForkIdeas && <div className='w-full h-1/2 flex flex-col gap-y-3'>
            <h1 className='text-white self-center text-center text-xl'>Forked Idea: <span className='p-2 border-1 border-white rounded-md font-semibold'>{forkIdea}</span></h1>
            <h1 className='text-white self-center text-center text-3xl'>Generated Ideas</h1>
            <div className='w-4/5 h-full grid grid-cols-2 grid-rows-4 self-center py-5 gap-y-4 gap-x-4'>
                {showForkIdeas.map((text, index) => (<ListItem key={index} text={text} callback={callback} />))}
            </div>
            
        </div>}
    </main>
}

