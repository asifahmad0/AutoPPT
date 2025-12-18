import SliderSlyle, { type DesignStyle } from '@/Pages/outline/SliderSlyle'
import { firebaseDb } from '../../../config/FirebaseConfig'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import OutlineSection from '@/Pages/outline/OutlineSection'
import { GeminAiModel } from '../../../config/FirebaseConfig'
import { Loader, LoaderCircle, Merge, Sparkle } from 'lucide-react'
import { Button } from '@/components/ui/button'



export type Outline={
  slideNo:string,
  slidePoint:string,
  outline:string,
 }

 type Project ={
  userPrompt:string,
  projectID:string,
  createdAt:string,
  noOfSlide:string,
  Outline:Outline[],
  designStyle:DesignStyle,
 }
function OutlineIndex() {


 //------------------------------------------------------------------------get Project data from Firebase

  const {ProjectID} = useParams()
  const [projectDetail, setProjectDetail]= useState<any> ()
  const [loading, setLoding]=useState(false)
  const [outline, setOutline]= useState<Outline[]>()
  const [ selectStyle, setSelectStyle] = useState<DesignStyle>()
  const [genratePPTLoding, setGenratePPTLoding] = useState(false)





   useEffect(()=>{
    ProjectID && getProject()
   },[ProjectID])

  
   const getProject= async ()=>{
    
    const docRef = doc(firebaseDb, 'projects', ProjectID??'');
    const docSnap:any = await getDoc(docRef)

    if (!docSnap.exists()) {

      console.log('Project Not Exist')
      return;
    }

    setProjectDetail(docSnap.data())
    console.log(docSnap.data())
    if (!docSnap.data().outline){
    genrateSlidersOtline(docSnap.data())
  }

   }


  

 //------------------------------------------------------------------ Using PPT AI by sending prompt and genrating sliders
 
 
  
  const outline_prompt= `Genrate a PowerPoint slide outline for the topic {userTopic}. Create {noOfSlide} slides 
  in totale. Eache slide shoulde included a topic name and a 2-line descriptive outline that clearly explains what content the 
  slide will cover. Include the following structure:
  The first slide should be a welcome screen. 
  The second slide should be an Agenda screen.
  The finale slide should be a thank you screen.
  Return the response only in JSON formate,
  following this schema:
  [
  {
  "slideNo":"",
  "slidePoint":"",
  "outline":""
  }
  ]
  
  `

   const genrateSlidersOtline=async(projectData:Project)=>{   // genrating ppt contant using AI

    setLoding(true)

    // Provide a prompt that contains text
  const prompt = outline_prompt.replace("{userTopic}" , projectData?.userPrompt)
  .replace("{noOfSlide}", projectData?.noOfSlide)

  // To generate text output, call generateContent with the text input
  const result = await GeminAiModel.generateContent(prompt);

  const response = result.response;
  const text = response.text();
  console.log(text);
  const rowJSON = text.replace('```json','')
  .replace('```','')
  const JSONdata= JSON.parse(rowJSON)
  setOutline(JSONdata)
  setLoding(false)
   }


   //----------------------------------------------------------------- edited content edit on editOutlinSection and update here
   const hendleUpdateOutline =(index:string, value:Outline)=>{
    setOutline((prev)=>
    prev?.map((item)=>
    item.slideNo===index? {...item, ...value}:item))

   }

   const onGenratSlider=async()=>{

    setGenratePPTLoding(true)
    // update DB

    await setDoc(doc(firebaseDb, 'projects', ProjectID??''),{

      designStyle: selectStyle,
      outline:outline

    },{
       merge:true
    })
    setGenratePPTLoding(false)
    // navigate to slider editing page

   }



  return (
    <section className="flex justify-center mt-20 mb-5 p-3 relative ">

      <div className="max-w-2xl w-full">
        <h2 className="font-bold text-2xl">
          Setting and slider
        </h2>
        
        <SliderSlyle SelectSlideStyle={(value:DesignStyle)=> setSelectStyle(value)}/>

        <OutlineSection loading={loading} outline={outline|| []}
        hendleUpdateOutline={(index:string, value:Outline)=>hendleUpdateOutline(index,value)} />
      </div>
      <Button size={'lg'} className='bg-[crimson] text-white absolute bottom-[0]' onClick={()=>onGenratSlider()}>{ genratePPTLoding ? <LoaderCircle className='animate-spin'/> :'Create PPT '+ <Sparkle/>} </Button>
      
    </section>
  )
}

export default OutlineIndex
