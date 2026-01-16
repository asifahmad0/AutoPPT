import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

const VideoSec: FC = () => {

  useEffect(() => {
  AOS.init({
    duration: 800,
    once: true,
  });
}, []);


  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handlePlayPause = (): void => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleMouseEnter = (): void => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = (): void => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative w-full bg-white z-[99999] border">
      
    </section>
  );
};

export default VideoSec;