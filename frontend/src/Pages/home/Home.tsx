import { Button } from '@/components/ui/button'
import { SignInButton, useUser } from '@clerk/clerk-react'
import { Video } from 'lucide-react'
import { Link } from 'react-router-dom'

function Home() {
  
  const {user} = useUser()

  return (
    <div className='main w-full min-h-screen  
    flex flex-col items-center justify-center text-center gap-5 font-[monospace]'>
        <div className="header">
            <h1 className='font-bold text-[3em] md:text-[3em] lg:text-[3.5em] px-2'>
                From Idea to <span className='text-[crimson]'>Presentation</span> <br/>In One Click</h1>
        </div>

      <div className="desc text-[1.2em] px-3">Generativ Sleek, Editble PPTs powered by AI, Save hours on design,<br/>
      formatting, and visual content so you can focus on your story,<br/> impress your audience</div>
      
      <div className="btns flex gap-5 text-white">
        
        <Button className='border py-2 px-5 hover:text-white hover:bg-[crimson] bg-black cursor-pointer'>Watch Video <Video/></Button>
        
        { !user ?
        <SignInButton mode='modal'>
          <Link to={"/work"}>
        <Button className='border py-2 px-5 hover:text-black hover:bg-[transparent] bg-[crimson]'>Get Start</Button>
        </Link>
        </SignInButton>
        :<Button className='border py-2 px-5 hover:text-black hover:bg-[transparent] bg-[crimson]'><a href="/work">Get Start</a></Button>
        }

      </div>
    </div>
  )
}

export default Home
