import { useUser } from '@clerk/clerk-react';
import { useContext, useEffect, } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { firebaseDb} from "../../../config/FirebaseConfig.ts"
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { UserDetailContext } from '../../../context/UserDetailContext.tsx';
import PromptBox from '@/components/ui/PromptBox.tsx';
import ProjectSec from './Project.tsx';



function Workspace() {

  const {user, isSignedIn, isLoaded}= useUser()
  const {setUserDetail } = useContext(UserDetailContext)
  const location = useLocation()



  useEffect(()=>{
    user&&CreateNewUser()
    

  },[user])

  const CreateNewUser=async ()=>{
    

    //If user already existing in DB
    const docRef = doc(firebaseDb,'UserData', user?.primaryEmailAddress?.emailAddress??'' );
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()){
      //console.log("Document data: ", docSnap.data(), docSnap.data().name)
      setUserDetail(docSnap.data())
    }else{

      // Insert New User

      //console.log('no such document')
      const data={
        name:user?.fullName,
        email:user?.primaryEmailAddress?.emailAddress,
        credit:2,
      }

      await setDoc(doc(firebaseDb, 'UserData', user?.primaryEmailAddress?.emailAddress??''),{
        ...data
      })

      setUserDetail(data)
      
    }

    //If Not then only create new user recorde
  
  }


     if(!isSignedIn && isLoaded){
      
    return <Navigate to={'/'} />
  }

  return (
    <div className=' w-full pt-10'>
        
        { location.pathname === '/work'&& <div>
          <PromptBox/>
          <ProjectSec/>
            </div> }
        
        <Outlet />  {/*for accesing product page becouse product page is a childe of workspace page */}
      
    </div>
  )
}

export default Workspace
