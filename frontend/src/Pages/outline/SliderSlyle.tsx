import React, { useState } from 'react'

import GeometricImg from '../../assets/Geometric.jpg'
import ElegantClean from '../../assets/Elegant_Clean.jpg'
import mediumWhiteImg from '../../assets/minimal_white.jpg'
import CreativeModernImg from '../../assets/CM.jpg'
import EducationalImg from '../../assets/edu.jpg'
import CorporateImg from '../../assets/Corporate.jpg'


const Slide_Design=[
    {
        'styleName':'Modern/Geometric ',
        'color':{
            'primry':'#000080',
            'secondery':'#FFFFFF',
            'third':'#FFA500',
        },
        'designGuide':'Uses abstract shapes, clean lines, and a bold color palette to convey innovation and a contemporary feel',
        'bannerImage':GeometricImg
    },
    {
        'styleName':'Elegant/Clean',
        'color':{
            'primry':'#F5F5DC',
            'secondery':'#A52A2A',
        },

        'designGuide':'Relies on sophisticated typography, soft color gradients, and high-quality photography to create a premium, refined presentation, suitable for portfolios or high-end business',
        'bannerImage': ElegantClean
    },
    {
        'styleName':'Minimal White ',
        'color':{
            'primry':'#F5F5F5',
            'secondery':'#000000',
            'third':'#A52A2A',
        },
        'designGuide':'Employs minimal text and emphasizes images or key data points. This style reduces audience overwhelm.',
        'bannerImage':mediumWhiteImg
    },
    {
        'styleName':'Creative/Modern',
        'color':{
            'primry':'#ffffff',
            'secondery':'#ec3a1a',
            'third':'#ff821b'
        },
        'designGuide':'Suitable for creative agencies, marketing pitches, or personal projects where style is crucial.',
        'bannerImage':CreativeModernImg
    },
    {
        'styleName':'Educational',
        'color':{
            'primry':' #ffffff',
            'secondery':' #dae030',
            'third':'#27e1ac',
            'forth':'#FF6347',
        },
        'designGuide':'Prioritizes clear hierarchy and straightforward content organization (e.g., the 7-7-7 rule for text)',
        'bannerImage':EducationalImg
    },
    {
        'styleName':'Formal/Corporate',
        'color':{
            'primry':'#003366',
            'secondery':'#696969',
            'third':'#FFFFFF',
        },
        'designGuide':'Adheres to strict branding guidelines with structured layouts, charts, and diagrams.',
        'bannerImage':CorporateImg
    },
]

type Props={
    SelectSlideStyle:any
}

export type DesignStyle={
       styleName:string,
       color:any,
       designGuide:string,
       icon:string,
       bannerImage:any,
    }

 
function SliderSlyle({SelectSlideStyle}:Props) {



    const [selectedSlide, setSeledSlide]=useState<string>()






  return (
    <div className='mt-5'>
        <h2 className="font-bold  text-xl">Select Slider Theam</h2>    
        <div className={` grid grid-cols-2 md:grid-cols-3 gap-5 mt-3 p-2`} >
        {
            Slide_Design.map((design, index)=>(

                <div className={` overflow-hidden cursor-pointer hover:scale-105 
                ${design.styleName==selectedSlide? 'p-1 border-2 rounded-2xl':''}`} 
                key={index} onClick={(e)=>{setSeledSlide(design.styleName); SelectSlideStyle(design)}}>
                    <img src={design.bannerImage}
                    width={500}
                    height={250}
                    className=' w-full h-[120px] rounded-2xl object-cover ' alt={design.styleName} />
                    <h2 className='text-center font-medium mt-1'>{design.styleName}</h2>
                </div>
            ))
        }
        </div>  
    </div>
  )
}

export default SliderSlyle
