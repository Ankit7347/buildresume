import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { FileText } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md transition-colors">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-slate-900 rounded-lg group-hover:rotate-12 transition-transform shadow-lg shadow-slate-900/10">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 italic">CV<span className="text-primary tracking-normal">Flow</span></span>
        </Link>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/builder" className="hidden sm:block">
            <Button variant="ghost" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all rounded-lg font-medium">Templates</Button>
          </Link>
          <Link href="/builder">
            <Button size="sm" className="sm:size-default bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20">
              Build Resume
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
