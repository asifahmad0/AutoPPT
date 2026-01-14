import { firebaseDb } from "../../../config/FirebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Project, Outline } from "../outline/Outline";
import OutlineSection from "../outline/OutlineSection";
import SliderCards from "./SliderCards";
import { Button } from "@/components/ui/button";
import { Loader, Loader2 } from "lucide-react";


function PptSlider() {
  const { ProjectID } = useParams();
  const [projectDetail, setProjectDetail] = useState<Project>();
  const [loading, setLoding] = useState(false);
  const [outline, setOutline] = useState<Outline[]>();
  const [genratePPTLoding, setGenratePPTLoding] = useState(false);
  const [sliderSaveLoder, setSliderSaveLoder]= useState( false)
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number | null>(null);



  //-------------------------------------------------------------------------------Getting project data from firebase
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
    //console.log(docSnap.data());
    if (!docSnap.data().outline) {
      docSnap.data();
    } else {
      setOutline(docSnap.data().outline);
      setProjectDetail(docSnap.data());
    }

    setLoding(false);
  };
  

  



//---------------------------------------------------------------------------------slide data sending to backend for generate slide 
const [slider, setSlider] = useState<any>([]);

  useEffect(() => {
    if (projectDetail && projectDetail.outline?.length) {
      GenerateSlide();
    }
  }, [projectDetail]);



const GenerateSlide = async () => {
    if (!projectDetail?.outline?.length) return;

    setGenratePPTLoding(true);

    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL+"generate-presentation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          designStyle: projectDetail.designStyle?.designGuide,
          colors: projectDetail.designStyle?.color,
          outline: projectDetail.outline,
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

      setSlider(
        data.slides.map((s: any) => ({
          code: s.html,
          title: s.title,
        }))
      );
    } catch (err) {
      console.error("GenerateSlide failed:", err);
    } finally {
      setGenratePPTLoding(false);
    }
     console.log(slider);
  };

 

console.log(slider);



// ----------------------------------------------------------- Slide save to firebase ---------------------------------------

  const saveSlideToFirebase = async () => {

    setSliderSaveLoder(true)
    try{
      const docRef = doc(firebaseDb, "projects", ProjectID!);

  await setDoc(docRef, {
    [`slides_html`]: slider,
    updatedAt: Date.now(),
  },{
    merge:true
  });

  
    } catch(e){
         console.log("error: ", e)
    }
    setSliderSaveLoder(false)
  
};
//------------------------------------------------------------- end-------------------------------------------------------

  return (
    <div className=" w-full flex lg:flex-row flex-col p-5">
      <div className=" lg:w-[30dvw] h-screen overflow-y-scroll p-2 -my-10">
        <OutlineSection
          outline={projectDetail?.outline ?? []}
          hendleUpdateOutline={() => console.log("its working")}
          loading={loading}
        />
      </div>

      <div className="lg:w-[70dvw] h-screen overflow-scroll p-2">
        {genratePPTLoding? <Loader/> :(slider.map((slide: any, index: number) => (
          <SliderCards
            key={index}
            slide={slide}
            colors={projectDetail?.designStyle?.color ?? {} }
            //onSelect={() => setSelectedSlideIndex(index)}
          />

        )))}
      </div>

       <Button
  className="fixed bottom-5 left-[40%] bg-primery flex items-center gap-2"
  onClick={saveSlideToFirebase}
  disabled={sliderSaveLoder}
>
  {sliderSaveLoder ? (
    <Loader2 className="animate-spin" />
  ) : (
    "Save PPT"
  )}
</Button>
    </div>
  );
}

export default PptSlider;
