import React, { useState } from 'react'
import { Button } from './button'
import { Loader, ArrowUpIcon, LoaderCircle, Send, } from 'lucide-react'
import Project from '@/Pages/workspace/Project'
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc } from 'firebase/firestore';
import { firebaseDb } from '../../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { Value } from '@radix-ui/react-select';













function PromptBox() {


const  [Prompt, setPrompt]=useState<string>('')
const [NoOfSlide, setNoOfSlide]=useState<string>('No Of Slide')
const [isLoding, setLoding]=useState<boolean>(false)
const {user}=useUser()
const navigate = useNavigate()

const isEmpty = !(Prompt.trim() )//&& slidePage



 const CreatProject= async()=>{

 setLoding(true)

 // Save project to DB
 const ProjectID = uuidv4();
 console.log(ProjectID)

 await setDoc(doc(firebaseDb, 'projects', ProjectID),{
    projectId:ProjectID,
    userPrompt:Prompt,
    noOfSlide:NoOfSlide,
    createdBy:user?.primaryEmailAddress?.emailAddress,
    createdAT:Date.now()

 })
setPrompt('')
 setLoding(false)
 navigate('/work/project/'+ProjectID+'/outline')




 }




  return (
    <div className=' w-full flex flex-col items-center justify-center font-[monospace] text-center gap-7 mt-5'>
        <div className="context">
            <h1 className='text-[2em] md:text-[3em] font-bold '>Describe your topic, we'll design the slides!</h1>
            <p className='  md:text-[1.5em]'>You design will be saved as new project</p>
        </div>

        <div className="prompArea border md:p-3 p-2 rounded-[20px]">
            <textarea value={Prompt} onChange={(e)=>setPrompt(e.target.value)} 
            className=' border-none w-[90dvw] h-[20dvh] md:w-[40dvw] md:h-[20dvh] text-[1.2em] outline-none p-3' name="prompt" placeholder='How can i help you...'></textarea>
            
            
            <div className="slidbtn flex items-center justify-between">    
            <Select onValueChange={(value) => setNoOfSlide(value)}>
                <SelectTrigger  className="w-[150px]">
                  <SelectValue placeholder={NoOfSlide} />
                </SelectTrigger>
                <SelectContent className='bg-white'>
                  <SelectItem value="4 to 6" >4 to 6</SelectItem>
                  <SelectItem value="6 to 8">6 to 8</SelectItem>
                  <SelectItem value="8 to 10">8 to 10</SelectItem>
                </SelectContent>
            </Select>

            <Button onClick={()=>CreatProject()} className='border p-2 rounded-full cursor-pointer bg-[crimson] text-white' 
             disabled={isEmpty}> { isLoding? <LoaderCircle className='animate-spin'/> : <ArrowUpIcon/>} </Button>
            </div>

        </div>

        
    </div>
  )
}

export default PromptBox
