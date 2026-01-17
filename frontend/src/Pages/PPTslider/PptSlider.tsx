import { firebaseDb } from "../../../config/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import type { Project, Outline } from "../outline/Outline";
import OutlineSection from "../outline/OutlineSection";
import SliderCards from "./SliderCards";
import { Button } from "@/components/ui/button";
import {  Loader2 } from "lucide-react";
import PptxGenJS from "pptxgenjs";
import * as htmlToImage from 'html-to-image';
import PptSlideSkeleton from "./PptSlideSkeleton";



function PptSlider() {
  const { ProjectID } = useParams();
  const [projectDetail, setProjectDetail] = useState<Project>();
  const [loading, setLoding] = useState(false);
  const [outline, setOutline] = useState<Outline[]>();
  const [genratePPTLoding, setGenratePPTLoding] = useState(false);
  const [sliderSaveLoder, setSliderSaveLoder]= useState( false)
  const [isRegenerating, setIsRegenerating] = useState(false);




  //-------------------------------------------------------------------------------Getting project data from firebase
  useEffect(() => {
    ProjectID && getProject();
  }, [ProjectID]);

  const getProject = async () => {
    setLoding(true);
    console.log(outline,isRegenerating)

    const docRef = doc(firebaseDb, "projects", ProjectID ?? "");
    const docSnap: any = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log("Project Not Exist");
      return;
    }

    if (!docSnap.data().outline) {
      console.log(docSnap.data());
    } else {
      setOutline(docSnap.data().outline);
      setProjectDetail(docSnap.data());
    }

    setLoding(false);
  };
  

  



//---------------------------------------------------------for generate slide by sending slide data to backend  
const [slider, setSlider] = useState<any>([]);

  

  useEffect(() => {
  const slidaar = projectDetail?.slides_html;

  if (!slidaar || slidaar.length === 0) {
    GenerateSlide();
  } else {
    setSlider(
      slidaar
    );
    
  }
}, [projectDetail]);


const GenerateSlide = async () => {
    if (!projectDetail?.outline?.length) return;

    setGenratePPTLoding(true);

    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL+"generate-presentation", { //https://autoppt-iain.onrender.com/
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          designStyle: projectDetail.designStyle?.designGuide,
          colors: projectDetail.designStyle?.color,
          outline: projectDetail.outline,
          userPrompt: projectDetail.userPrompt,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Backend error:", err);
        return;
      }

      const data = await res.json();

      if (!data?.slides) {
        console.error("Slides missing", data);
        return;
      }

      const slidesData = data.slides.map((s: any) => ({
      code: s.html,
      title: s.title,
    }));

    // ✅ UI ke liye
    setSlider(slidesData);

    // ✅ DIRECT Firebase save (no timing issue)
    await saveSlideToFirebase(slidesData);

  } catch (err) {
    console.error(err);
  } finally {
    setGenratePPTLoding(false);
    setIsRegenerating(false);
  }
};

 
const handleRegenerate = () => {
  setIsRegenerating(true);
  GenerateSlide();
};



// ----------------------------------------------------------- Slide save to firebase ---------------------------------------

  const saveSlideToFirebase = async (slidesData: any[]) => {

    setSliderSaveLoder(true)
    try{
      const docRef = doc(firebaseDb, "projects", ProjectID!);

  await setDoc(docRef, {
    [`slides_html`]: slidesData,
    updatedAt: Date.now(),
  },{
    merge:true
  });

  
    } catch(e){
         console.log("error: ", e)
    }
    setSliderSaveLoder(false);
  
};





//-------------------------------------------------------------Export PPT-------------------------------------------------------

const containerRef = useRef<HTMLDivElement | null>(null)
const [downloadLoding, setDownloadLoding] = useState(false)

const exportPPT= async()=> {
  
  if (!containerRef.current) return;
  setDownloadLoding(true)
  const pptx = new PptxGenJS()
  const iframes =containerRef.current.querySelectorAll("iframe")
  console.log(iframes)
  for (let i =0; i<iframes.length; i++){
    const iframe = iframes[i] as HTMLIFrameElement;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) continue;

    const slideNode = 
    (iframeDoc.querySelector("body > div") as HTMLElement) || (iframeDoc.body as HTMLElement);
    if (!slideNode) continue;
    console.log(`Exporting slide ${i + 1}...`);
    const dataUrl = await htmlToImage.toPng(slideNode, {quality:1})

    const slide = pptx.addSlide()
    slide.addImage({
      data: dataUrl,
      x: 0,
      y: 0,
      w: 10,
      h: 5.625,
    });
    console.log(slide)
  }
  
  setDownloadLoding(false)
  pptx.writeFile({fileName:"MyProjectPPT.pptx"})
}






  return (
    <div className=" w-full flex lg:flex-row flex-col p-5 ">
      <div className=" lg:w-[30dvw] h-screen overflow-y-scroll p-2 -my-10">
        <OutlineSection
          outline={projectDetail?.outline ?? []}
          hendleUpdateOutline={() => console.log("its working")}
          loading={loading}
        />
      </div>

      <div className="lg:w-[70dvw] w-[100dvw] h-screen overflow-scroll p-2 " ref={containerRef}>
        { genratePPTLoding? (
    Array.from({ length: 5 }).map((_, i) => (
      <PptSlideSkeleton key={i} />
    ))
  ) :(slider.map((slide: any, index: number) => (
          <SliderCards
            key={index}
            slide={slide}
            colors={projectDetail?.designStyle?.color ?? {}}
          />
        )))}
      </div>

       <div className="btn absolute -bottom-30 left-[40%]  flex items-center gap-10 ">
        <Button
           className=" bg-primery text-textColor hover:scale-105"
           onClick={
             slider?.length > 0
               ? handleRegenerate
               : GenerateSlide
           }
           disabled={genratePPTLoding || sliderSaveLoder} >

           {genratePPTLoding ? ( <Loader2 className="animate-spin" />) 
           : slider?.length > 0 ? ("Regenerate PPT") 
           : ( "Generate PPT")}
        </Button>


        <Button
               className=" border border-primery text-textColor2 hover:scale-105 hover:bg-primery hover:text-textColor"
               onClick={exportPPT}
               disabled={sliderSaveLoder}>
               {downloadLoding ? ( <Loader2 className="animate-spin" /> ) : ( "Download PPT" )} 
        </Button>

        
       
       </div>
       
    </div>
  );
}

export default PptSlider;
