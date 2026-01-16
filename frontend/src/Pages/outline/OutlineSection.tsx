
import { Skeleton } from "../../components/ui/skeleton"
import type { Outline } from '@/Pages/outline/Outline'
import { Button } from '../../components/ui/button'
import { Edit} from 'lucide-react'
import EditOutlineDialog from './EditOutlineDialog'

type Props ={
    loading:boolean,
    outline:Outline[],
    hendleUpdateOutline:any
}

function OutlineSection({loading, outline, hendleUpdateOutline}:Props) {
  return (
    <div className=' my-10 '>

        <h2 className='font-bold text-xl underline'>Slider outline</h2>

        {
            loading &&
            <div>
                {
                    [1,2,3,4,5,6].map((index)=>(
                        <Skeleton key={index} className='h-[60px] bg-gray-500 w-full rounded-2xl my-5'/>
                    ))
                }
            </div>
        }
        {outline?.map((item, index)=>(
            <div key={index} className="bg-white p-3 rounded-xl flex items-center gap-2 border my-5 shadow-xl">
                <h2 className=' font-bold text-xl rounded-xl p-3 bg-gray-100  text-[crimson]'>{index+1}</h2>
             <div >
                <h2 className='font-bold text-[crimson]'>{item.slidePoint}</h2>
                <p>{item.outline}</p>
            </div>
            <EditOutlineDialog outlineData={item} onUpdate={hendleUpdateOutline}>
                <Button variant={'ghost'} size={'lg'}> <Edit/> </Button>
            </EditOutlineDialog>
            
            </div>
        ))}
       
       

    </div>
  )
}

export default OutlineSection
