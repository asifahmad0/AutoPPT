import { firebaseDb, GeminAiLiveModel } from "../../../config/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Project, Outline } from "../outline/Outline";
import OutlineSection from "../outline/OutlineSection";
import SliderCards from "./SliderCards";

const dummy_Slider= `<body class="bg-[#121212] font-sans antialiased text-[#FFFFFF] w-screen h-screen overflow-hidden flex flex-col">
    <!-- Header Section -->
    <header class="w-full bg-[#003366] text-[#FFFFFF] py-6 px-12 flex justify-between items-center shadow-lg relative z-10">
        <div class="flex items-center space-x-4">
            <!-- Lucide Icon for Theme (e.g., Leaf for Green Energy) -->
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-leaf">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                <path d="M2 21s1.5-1.7 2-2c1.33-1.33 4.8-2.3 6-2"/>
            </svg>
            <h1 class="text-4xl font-extrabold tracking-tight">Welcome to Our Green Energy Project!</h1>
        </div>
        <span class="text-2xl font-semibold text-[#696969]">Slide 1</span>
    </header>

    <!-- Main Content Area (16:9 Aspect Ratio within screen) -->
    <main class="flex-grow w-full flex bg-[#1a1a1a] p-12 relative overflow-hidden">
        <!-- Subtle background effects for modern dark theme -->
        <div class="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-[#0a0a0a] opacity-90"></div>
        <!-- Grid pattern overlay for texture and depth -->
        <div class="absolute inset-0 opacity-5" style="background-image: url('data:image/svg+xml;utf8,<svg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'><g fill=\'%23696969\' fill-opacity=\'0.2\'><circle cx=\'10\' cy=\'10\' r=\'1\'/></g></svg>');"></div>

        <div class="relative z-10 flex w-full h-full space-x-12">
            <!-- Left Column: Outline Text and Key Points -->
            <section class="w-1/2 flex flex-col justify-center pr-8">
                <h2 class="text-3xl font-bold mb-6 text-[#FFFFFF]">Overview: Sustainable Energy for Our Future</h2>
                <p class="text-xl leading-relaxed text-[#696969] mb-4">
                    Get ready to explore the exciting world of sustainable energy sources that power our future.
                </p>
                <p class="text-xl leading-relaxed text-[#696969]">
                    This presentation will introduce you to green energy and its importance for our planet.
                </p>

                <!-- Placeholder for additional structured content / Key Focus Areas -->
                <div class="mt-8">
                    <h3 class="text-2xl font-semibold mb-4 text-[#FFFFFF]">Key Focus Areas:</h3>
                    <ul class="list-none space-y-3">
                        <li class="flex items-start">
                            <!-- Lucide Icon: Check Circle for list items -->
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle mr-3 mt-1 text-green-500 flex-shrink-0">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                <path d="m9 11 3 3L22 4"/>
                            </svg>
                            <span class="text-lg text-[#696969]">Understanding renewable resources and their environmental benefits.</span>
                        </li>
                        <li class="flex items-start">
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle mr-3 mt-1 text-green-500 flex-shrink-0">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                <path d="m9 11 3 3L22 4"/>
                            </svg>
                            <span class="text-lg text-[#696969]">Exploring innovative technologies driving the green energy revolution.</span>
                        </li>
                        <li class="flex items-start">
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle mr-3 mt-1 text-green-500 flex-shrink-0">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                <path d="m9 11 3 3L22 4"/>
                            </svg>
                            <span class="text-lg text-[#696969]">The economic and social impact of transitioning to sustainable practices.</span>
                        </li>
                    </ul>
                </div>
            </section>

            <!-- Right Column: Image/Diagram Placeholder -->
            <aside class="w-1/2 flex items-center justify-center relative rounded-xl overflow-hidden shadow-2xl border border-gray-700">
                <img src="https://ik.imagekit.io/m5tbjdhwo//ik-genimg-prompt-sustainable_energy_sources_solar_panels_wind_turbines/green_energy_future.jpg"
                     alt="Sustainable energy sources like solar panels and wind turbines with a globe"
                     class="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500 ease-in-out">
                <div class="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6">
                    <p class="text-xl font-bold text-white">Powering the Future with Green Energy</p>
                </div>
            </aside>
        </div>
    </main>

    <!-- Footer Section -->
    <footer class="w-full bg-[#003366] text-[#696969] py-4 px-12 text-center text-sm relative z-10 border-t border-gray-700">
        &copy; 2023 Green Energy Project. All rights reserved.
    </footer>
</body>`

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
    //console.log(docSnap.data());
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



  const [ slider, setSlider]= useState<any>([])

  useEffect(() => {
    if ( projectDetail && projectDetail.outline?.length) {
      GenerateSlide();
    }
  }, [projectDetail]);



const GenerateSlide = async () => {
  if (!projectDetail) return;
  
  try {
    const res = await fetch("http://localhost:4000/generate-slide", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        designStyle: projectDetail.designStyle?.designGuide,
        colors: projectDetail.designStyle?.color,
        metadata: projectDetail.outline?.[0],
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Backend Error:", errorText);
      return;
    }

    const data = await res.json();

    if (!data?.html) {
      console.error("HTML missing in response", data);
      return;
    }

    setSlider([{ code: data.html }]); // ✅ SIMPLE & SAFE
  } catch (err) {
    console.error("GenerateSlide failed:", err);
  }
};



console.log(slider)


  return (
    <div className=" w-full grid grid-cols-2 p-5">
      <div className=" border lg:w-[30dvw] cols-span-2 h-screen overflow-y-scroll p-2">
        <OutlineSection
          outline={projectDetail?.outline ?? []}
          hendleUpdateOutline={() => console.log("its working")}
          loading={loading}
        />
      </div>

      <div className=" border lg:w-[70dvw] border-blue-700 cols-span-2">
        {slider.map((slide: any, index: number)=>(
          <SliderCards 
          key={index} 
          slide={slide}
          colors={projectDetail?.designStyle?.color ?? {}}/>
        ))}
      </div>
  
  
  
  </div>

  );
}

export default PptSlider;
