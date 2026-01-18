import { useEffect, useRef} from 'react'







const HTML_DEFAULT = `

{code}

`



type Props = {
    slide:{ code: string },
    colors: any,
    
}

function SliderCards({slide,colors }:Props) {




    const FINAL_CODE = HTML_DEFAULT
        .replace("{colorCodes}", JSON.stringify(colors))
        .replace("{code}", slide?.code);

    const iframeRef = useRef<any>(null);

    
    useEffect(() => {
        if (!iframeRef.current) return;
        const iframe = iframeRef.current;
        const doc = iframeRef.current.contentDocument;
        if (!doc) return;

        // Write the HTML inside the iframe
        doc.open();
        doc.write(FINAL_CODE);
        doc.close();

        
    }, []);

   

    return (
        <div className='mb-5'>
            <iframe
                ref={iframeRef}
                className=" border-[2px] border-primer lg:w-[1040px] w-[800px] h-[600px] mt-2 rounded-2xl"
                sandbox="allow-scripts allow-same-origin allow-modals allow-forms allow-popups" // ✅ full sandbox permissions 
                 />
        </div>
    );
}

export default SliderCards
