
import { Button } from '@/components/ui/button'

import { Link} from 'react-router-dom'

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { ArrowRight, FolderIcon } from 'lucide-react'

function Project() {


  {/* projectID is Same Name jo nested route me likha he or useParame ka kame he URL me se jo 
    projectID je use nikalna or store karna lekin url me jobhi id aaye wo route me wahi name
     ho jo yaha useParams ke varieble me he*/}
     

     

  return (
    <div className=' mx-5 lg:mx-20 mt-10 '>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl ">My Projects</h2>
        <Link to='/work'>
        <Button className='bg-[crimson] text-white text-md'>+ Create Project</Button>
        </Link>
        
        
      </div>
      <div className="">

             <Empty>
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
          {/* <Button variant="outline">My Project</Button> */}
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
    </Empty>


      </div>
        


        
      
    </div>
  )
}

export default Project
