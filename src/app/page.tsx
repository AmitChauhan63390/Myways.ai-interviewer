import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { MoveRight } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col  items-center justify-center p-6 md:p-24 bg-gradient-to-br from-[#091220] via-[#0d1b2a] to-[#1f2736] relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 z-0"></div>
      
  
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>

     
      <div className="relative z-10 text-center space-y-6 bg-[#1f2736]/70 backdrop-blur-lg border border-white/10 rounded-2xl p-10 md:p-12 shadow-2xl max-w-md w-full transform transition-all hover:scale-[1.02]">
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/30 rounded-full blur-2xl"></div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 leading-tight">
          MyWays AI Interview
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 opacity-80 mb-8">
          Elevate your interview experience with AI-powered assessment
        </p>
        
        <Link href="/instructions" className="block">
          <Button 
            size="lg" 
            className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 ease-in-out"
          >
            <span className="flex items-center justify-center gap-2">
              Start Your Interview
              <MoveRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </Link>
      </div>
    </main>
  )
}