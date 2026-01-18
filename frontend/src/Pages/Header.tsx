import { useContext } from 'react'
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'
import { Gem } from 'lucide-react'
import { UserDetailContext } from '../../context/UserDetailContext'

function Header() {

  const {user} = useUser()
  const {userDetail, setUserDetail} = useContext(UserDetailContext)

  return (
    <div>
        <div className="nav fixed bg-white shadow h-[50px] w-full flex flex-nowrap items-center justify-between px-2 lg:px-3">
            <div className="font-bold text-[1.2] text-[2em] min-w-max ml-2 font-[monospace]"><span className='text-[crimson] '>Auto</span>PPT</div>
            <div className='hidden md:block min-w-max'>
              <ul className='flex gap-2 lg:gap-10'>
                <li className=' nav-li px-3 py-2 mt-[-5px] hover:text-white relative '><span className=' nav-span w-full  absolute  '></span><a className=' px-3 py-2' href="/">Home</a></li>
                <li className=' nav-li px-3 py-2 mt-[-5px] hover:text-white relative '><span className=' nav-span w-full  absolute  '></span><a className=' px-3 py-2' href="/about">About</a></li>
                <li className=' nav-li px-3 py-2 mt-[-5px] hover:text-white relative '><span className=' nav-span w-full  absolute  '></span><a className=' px-3 py-2' href="/work">Workspace</a></li>
                <li className=' nav-li px-3 py-2 mt-[-5px] hover:text-white relative '><span className=' nav-span w-full  absolute  '></span><a className=' px-3 py-2' href="/work/project">Project</a></li>
                <li className=' nav-li px-3 py-2 mt-[-5px] hover:text-white relative '><span className=' nav-span w-full  absolute  '></span><a className=' px-3 py-2' href="/contact">Contact</a></li>
              </ul>
            </div>

             {!user ?
             <SignInButton mode='modal'>
              <Button className='border py-2 px-5 hover:text-black text-white hover:bg-[transparent] bg-[crimson] cursor-pointer'>Login</Button>
             </SignInButton>
             : <div className=" flex flex-nowrap items-center gap-2 font-bold">
                 <UserButton/>
                 <div className="flex items-center bg-[antiquewhite] p-[7px] rounded-xl text-[1.2em] gap-1"><Gem/>{userDetail?.credit} </div>
             </div>            
            } 

            
        </div>
      
    </div>
  )
}

export default Header
