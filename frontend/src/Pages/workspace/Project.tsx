
import { Button } from '@/components/ui/button'
import { Link, useNavigate} from 'react-router-dom'

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { ArrowRight, FolderIcon } from 'lucide-react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { firebaseDb } from '../../../config/FirebaseConfig'
import { useEffect, useState } from 'react'
import type { Project } from '../outline/Outline'
import { useUser } from '@clerk/clerk-react'
import ppt_img from '../../assets/ppt.png'
import moment from 'moment'

{/* projectID is Same Name jo nested route me likha he or useParame ka kame he URL me se jo 
    projectID je use nikalna or store karna lekin url me jobhi id aaye wo route me wahi name
     ho jo yaha useParams ke varieble me he*/}

function Project() {

  const[project, setProject]= useState<Project[]>([])
  const {user} = useUser()
  const [PptId, setPptId]= useState<any>([])
  const navigate = useNavigate()


  useEffect(()=>{
    user&&getProject()
  },[user])

  const getProject= async()=>{

  const q = query(collection(firebaseDb, "projects"), where("createdBy", "==", user?.primaryEmailAddress?.emailAddress ?? ''));
  const querySnapshot = await getDocs(q);


  querySnapshot.forEach((doc:any) => {
     // doc.data() is never undefined for query doc snapshots
     console.log(doc.id, " => ", doc.data());
     setProject((prev:any)=>[...prev, doc.data()])
     setPptId((prev:any)=>[...prev, doc.id])

  });
  }

const openPpt=(pptId:any)=>{
    console.log(pptId)

    
navigate('/work/project/'+pptId+'/pptslider')

  }
  
const PptDate=(timeStrap:any)=>{
  const date= moment(timeStrap).fromNow();
  return date;
}
     

  return (
    <div className=' mx-2 lg:mx-10 mt-10  '>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl ">My Projects</h2>
        <Link to='/work'>
        <Button className='bg-primery text-white text-md'>+ Create Project</Button>
        </Link>        
      </div>

      

      {project.length>0? (
              <div className="p-2 lg:p-5 w-screen grid grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-5 ">
                {project.map((items, index)=>(
                  <div onClick={()=>openPpt(PptId[index])} className=" border border-primery w-[170px] lg:w-[300px] hover:scale-105 rounded-xl shadow-xl p-4 mt-4 space-y-2" key={index}>
                    <img src={ppt_img} width={100} height={100} />
                    <h1 className='font-bold text-primery'>{items?.outline[0]?.slidePoint}</h1>
                    <div className="flex justify-between">
                      <p className='text-sm'>{items?.slides_html?.length>0?`${items?.slides_html?.length}`:"0"} Slides</p>
                    <p className='text-sm'>{PptDate(items?.createdAT)}</p>
                    </div>
                    
                    
                  </div>
                ))}
              </div>
             )
             
             :(<Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderIcon className='text-[crimson]'/>
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating
          your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button disabled={true}>Create Project</Button>
          
        </div>
      </EmptyContent>
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <a href="#">
          Learn More <ArrowRight/>
        </a>
      </Button>
               </Empty>)}


      </div>
        



  )
}

export default Project
