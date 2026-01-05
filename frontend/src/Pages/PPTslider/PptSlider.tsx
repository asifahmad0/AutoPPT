import { firebaseDb, GeminAiLiveModel } from "../../../config/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Project, Outline } from "../outline/Outline";
import OutlineSection from "../outline/OutlineSection";
import SliderCardFrame from "@/components/SliderCardFrame";

function PptSlider() {
  const { ProjectID } = useParams();
  const [projectDetail, setProjectDetail] = useState<Project>();
  const [loading, setLoding] = useState(false);
  const [outline, setOutline] = useState<Outline[]>();
  const [genratePPTLoding, setGenratePPTLoding] = useState(false);

  useEffect(() => {
    ProjectID && getProject();
  }, [ProjectID]);

  const getProject = async () => {
    setLoding(true);

    const docRef = doc(firebaseDb, "projects", ProjectID ?? "");
    const docSnap: any = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log("Project Not Exist");
      return;
    }

    setProjectDetail(docSnap.data());
    console.log(docSnap.data());
    if (!docSnap.data().outline) {
      docSnap.data();
    } else {
      setOutline(docSnap.data().outline);
      setProjectDetail(docSnap.data());
    }

    setLoding(false);
  };

  const imageGeneratePrompt = `const imageGeneratePrompt = Generate HTML (TailwindCSS + Flowbite UI + Lucide Icons)
   code for a 16:9Modern Dark style.{DESIGN_STYLE}. responsive design 16:9 layout, and Flowbite component structure,
    Use different different layout depends on content and style. use color from tailwindcss like primarym accent, gradient
     and bacground and any other if needed and use this color {COLORS_CODE},MetaData for Slider : {METADATA}, 
     Generate Image if needed and use Image as https://ik.imagekit.io/m5tbjdhwo/ik-genimg-prompt- {imagePrompt}/{altImageName}.jpg .
      Replace {imagePrompt} with relavant image prompt and altImageName with random image name for that image. 16: 9 ratio. 
      PPT Slider. Just give me body content only.;`;

  const dummy_slider=''

  const [ slider, setSlider]= useState<any>([])

  useEffect(() => {
    if ( projectDetail && projectDetail.outline?.length) {
      GenerateSlide();
    }
  }, [projectDetail]);



const GenerateSlide = async () => {
  if (!projectDetail) return;

  const res = await fetch("http://localhost:4000/generate-slide", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      designStyle: projectDetail.designStyle?.designGuide,
      colors: projectDetail.designStyle?.color,
      metadata: projectDetail.outline?.[0]
    }),
  });

  const data = await res.json();
  setSlider([{ code: data.html }]);
};




  
/*
  const GenerateSlide = async () => {
    const prompt = imageGeneratePrompt
      .replace("{DESIGN_STYLE}", projectDetail?.designStyle?.designGuide ?? "")
      .replace(
        "{COLORS_CODE}",
        JSON.stringify(projectDetail?.designStyle?.color)
      )
      .replace("{METADATA}", JSON.stringify(projectDetail?.outline[0]));
      

    const session = await GeminAiLiveModel.connect();
    session.send(prompt); // Provide a text prompt

    
    // Handle the model's audio output
    const messages = session.receive();
    let text:any = ''
    
    for await (const message of messages) {
      
      switch (message.type) {
        case "serverContent":
          if (message.turnComplete) {
            // TODO(developer): Handle turn completion
            console.log(text)

          } else{
            const parts = message.modelTurn?.parts;
            text += parts?.map((part:any) => part.text).join('');
            //console.log(text)
            const fineText = text.replace('```html','').replace('```','')
            
            console.log(fineText)
            
            setSlider((prev: any)=>{
              if (!prev) return[];

              const updated = [...prev];
              if (0<updated.length){
                updated[0] = { code: fineText};
              }else{
                updated[0] = { code: fineText};
              }
              return updated
            });

          }
          break;
        case "toolCall":
        // Ignore
        case "toolCallCancellation":
        // Ignore
      }
    }
  };
  //GenerateSlide()
  */

  return (
    <div className=" w-full grid grid-cols-5 p-5">
      <div className=" border cols-span-2 h-screen overflow-y-scroll p-2">
        <OutlineSection
          outline={projectDetail?.outline ?? []}
          hendleUpdateOutline={() => console.log("its working")}
          loading={loading}
        />
      </div>

      <div className=" border border-blue-700 cols-span-2">
        {slider.map((slide: any, index:number)=>{
          <SliderCardFrame 
          slide={slide} 
          key={index} 
          colors={projectDetail?.designStyle?.color ?? ''}/>
        })}
      </div>
  
  
  
  </div>

  );
}

export default PptSlider;
