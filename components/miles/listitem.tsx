import { Button } from "@nextui-org/button";

export interface ListItemProps {
    text: string;
    callback: (a: string) => Promise<void>
}

export const ListItem: React.FC<ListItemProps> = ({
    text,
    callback
}) => {
    return <div className='group hover:cursor-pointer w-full bg-black text-white rounded-md h-full py-3 px-4 border-1 border-white flex flex-row items-center drop-shadow-lg shadow-lg hover:bg-[#7fa6e4] hover:border-black transition duration-400'>
        <p className='text-base w-4/5 text-center'>{text}</p>
        <div className='opacity-0 group-hover:opacity-100 flex w-1/5 flex-col gap-y-2 h-full'>
            <Button variant={'shadow'} color={'success'} className='border-black border-2' onClick={() => {
                window.alert('Idea Selected')
            }}>Select Idea</Button>
            <Button variant={'shadow'} color={'secondary'} className='border-black border-2' onClick={async () => {
                await callback(text);
            }}>Fork Idea</Button>
        </div>
    </div>
}