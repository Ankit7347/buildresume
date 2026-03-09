import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Download, 
  Layout, 
  Zap, 
  ShieldCheck, 
  History 
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-primary/10">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <span className="flex h-2 w-2 rounded-full bg-primary" />
              Trusted by 50,000+ Job Seekers
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
              Craft Your Professional <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent italic">Story. Instantly.</span>
            </h1>
            
            <p className="text-xl text-slate-500 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
              Build a modern, recruiter-approved resume in minutes with our intuitive, 
              professional platform. No login required, 100% private.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
              <Link href="/builder" className="w-full sm:w-auto">
                <Button size="lg" className="w-full h-14 px-8 text-lg font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all hover:scale-105 rounded-xl">
                  Build Your Resume <Zap className="ml-2 w-5 h-5 fill-current" />
                </Button>
              </Link>
              <Link href="/builder" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full h-14 px-8 text-lg border-slate-200 hover:bg-slate-50 transition-all rounded-xl text-slate-900">
                  View Templates
                </Button>
              </Link>
            </div>

            <div className="pt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-neutral-500 animate-in fade-in duration-1000 delay-700">
              <div className="flex items-center gap-2 text-sm sm:text-base">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span>Fast & Easy</span>
              </div>
              <div className="flex items-center gap-2 text-sm sm:text-base">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span>Modern Layouts</span>
              </div>
              <div className="flex items-center gap-2 text-sm sm:text-base">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span>Privacy First</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Preview Card Mockup */}
        <div className="mt-20 container mx-auto px-4 relative max-w-5xl animate-in zoom-in-95 fade-in duration-1000 delay-500">
          <div className="relative group p-1 rounded-[2.5rem] bg-gradient-to-br from-slate-200 to-transparent border border-slate-200 shadow-2xl overflow-hidden shadow-slate-200/50">
            <div className="aspect-[16/9] bg-slate-100 overflow-hidden rounded-[2.2rem] relative">
               {/* This is where an image or mockup would go */}
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center brightness-50 contrast-125" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
               <div className="absolute bottom-8 left-8 right-8 text-left space-y-4">
                  <div className="w-20 h-2 bg-primary rounded-full" />
                  <h3 className="text-3xl font-bold text-white">Professional Builder Dashboard</h3>
                  <p className="text-slate-100 max-w-lg">Experience real-time editing with instant PDF previews. Choose between dozens of industry-specific layouts.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Layout className="w-8 h-8 text-blue-600" />}
              title="Modern UI Templates"
              description="Dozens of hand-crafted layouts optimized for both human recruiters and ATS systems."
            />
            <FeatureCard 
              icon={<History className="w-8 h-8 text-purple-600" />}
              title="Auto-Save Feature"
              description="Don't lose your work. We use localized TTL storage to keep your progress safe for 24 hours."
            />
            <FeatureCard 
              icon={<Download className="w-8 h-8 text-emerald-600" />}
              title="High-Res PDF Export"
              description="Download professional, ready-to-print PDFs with a single click. Zero watermarks."
            />
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-24 border-y border-slate-100 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full border border-primary/20">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900">No Login. No Tracking. Just Resumes.</h2>
            <p className="text-slate-500 text-lg">
              We believe your personal data should stay yours. CVFlow is built on top of browser-native 
              storage, meaning we never store your resume on our servers.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 relative overflow-hidden bg-white">
        <div className="container mx-auto px-4 text-center">
            <div className="bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-800 relative shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -z-10" />
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Ready to land your dream job?</h2>
              <p className="text-slate-400 mb-10 max-w-xl mx-auto italic font-medium text-lg">
                "The secret of getting ahead is getting started."
              </p>
              <Link href="/builder">
                <Button size="lg" className="h-16 w-full sm:w-auto px-10 text-xl font-bold rounded-2xl shadow-lg shadow-primary/20 bg-primary text-white hover:bg-primary/90">
                  Build My Resume
                </Button>
              </Link>
            </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center text-neutral-500 text-sm">
        <p>© 2026 CVFlow Premium. All rights reserved.</p>
        <p className="mt-2 text-neutral-600">Built with Next.js, Tailwind & Shadcn/ui</p>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-slate-200/50 group">
      <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
      <p className="text-slate-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
