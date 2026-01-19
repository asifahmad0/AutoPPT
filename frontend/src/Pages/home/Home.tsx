import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Sparkles, Zap, Palette, Download } from "lucide-react";

function Home() {
  const { user } = useUser();

  return (
    <div className="main w-full min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col gap-5 font-[monospace] pt-26">
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Create Stunning Presentations in Seconds
          <span className="block text-primery mt-2">with AutoPPT</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          AI-powered tool jo aapke ideas ko professional PowerPoint slides me
          convert karta hai. No design skills required.
        </p>
        
        <div className="btns mt-8 flex justify-center gap-4">

          {!user ? (
            <SignInButton mode="modal">
              <Link to={"/work"}>
                <Button className=" border border-primery py-2 px-5 text-textColor hover:text-textColor2 hover:bg-[transparent] bg-[crimson]">
                  Generate PPT Now
                </Button>
              </Link>
            </SignInButton>
          ) : (
            <Link to={"/work"}>
            <Button className=" border border-primery py-2 px-5 text-textColor hover:text-textColor2 hover:bg-[transparent] bg-[crimson]">
              Generate PPT Now
            </Button>
            </Link>
          )}

          <Button className="border border-primery py-2 px-5 hover:text-textColor hover:bg-primery hover:border-none cursor-pointer">
            Try Free Demo
          </Button>
        </div>
      </section>


{/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-10">
<h2 className="text-3xl font-bold text-center mb-12 text-primery">Why AutoPPTs?</h2>
<div className="grid md:grid-cols-4 gap-6">
<FeatureCard icon={<Zap />} title="Instant Generation" desc="Topic likho aur AI seconds me PPT bana de." />
<FeatureCard icon={<Palette />} title="Modern Design" desc="Clean, professional aur attractive slide designs." />
<FeatureCard icon={<Sparkles />} title="Smart AI Content" desc="Auto headings, bullets aur logical flow." />
<FeatureCard icon={<Download />} title="Easy Download" desc="One click me PPT download aur share." />
</div>
</section>

{/* HOW IT WORKS */}
<section className="bg-white py-10">
<div className="max-w-7xl mx-auto px-6">
<h2 className="text-3xl font-bold text-center mb-12 text-primery">How It Works</h2>
<div className="grid md:grid-cols-4 gap-6 text-center">
<StepCard step="1" text="Topic ya outline enter karo" />
<StepCard step="2" text="AI slides generate karega" />
<StepCard step="3" text="Theme aur colors customize karo" />
<StepCard step="4" text="Download your PPT" />
</div>
</div>
</section>


{/* CTA */}
<section className="py-24 text-center bg-primary text-white">
<h2 className="text-3xl font-bold">Ready to Create Your Next Presentation?</h2>
<p className="mt-4 text-white/90">Manual slides banana band karo. AI ko kaam karne do.</p>
<Button size="lg" variant="secondary" className="mt-6">
Start Creating for Free
</Button>
</section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }:any) {
return (
<Card className="text-center border-primery hover:bg-primery hover:text-textColor hover:scale-105">
<CardContent className="p-6 ">
<div className="flex justify-center mb-4  ">{icon}</div>
<h3 className="font-semibold text-lg">{title}</h3>
<p className="text-sm text-muted-foreground mt-2">{desc}</p>
</CardContent>
</Card>
);
}

export function StepCard({ step, text }:any) {
return (
<Card className=" border-primery hover:bg-primery hover:text-textColor hover:scale-105">
<CardContent className="p-6">
<div className="text-2xl font-bold text-primary mb-2">Step {step}</div>
<p className="text-muted-foreground">{text}</p>
</CardContent>
</Card>
);
}

export default Home;
