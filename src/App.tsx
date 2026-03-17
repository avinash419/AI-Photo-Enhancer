import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Image as ImageIcon, 
  History, 
  Settings, 
  Sparkles, 
  ArrowLeft, 
  Download, 
  Share2, 
  CheckCircle2, 
  Zap,
  Maximize2,
  User,
  Eraser,
  Home as HomeIcon,
  LayoutGrid,
  Palette,
  Lightbulb
} from 'lucide-react';
import { AppScreen, EnhancementHistory, EnhancementOptions } from './types';
import { enhanceImage } from './services/geminiService';

// --- Components ---

const SplashScreen = ({ progress }: { progress: number }) => (
  <div className="relative flex h-screen w-full flex-col items-center justify-center bg-background-dark p-6 overflow-hidden">
    {/* Animated Background Elements */}
    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.3, 0.2],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[100px]"
    />
    <motion.div 
      animate={{ 
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.4, 0.3],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px]"
    />
    
    <div className="flex w-full max-w-md flex-col items-center gap-12 z-10">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative flex flex-col items-center gap-8"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary/40 rounded-full blur-3xl animate-pulse"></div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative bg-center bg-no-repeat aspect-square bg-cover rounded-full h-64 w-64 border-4 border-primary/50 shadow-neon overflow-hidden"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAD2vopOhRdOxQesdtYBZHmENJjkzeQ4rc7MV1aSuRjflbQe9413JOyfXeBrA7rBN5BvbNAclCr34K3EXnJNWP3SxnL2C0wLHRXyz-pGSB_Ke_v8P666M1RszBUeT38B-JYC3BZ3MqXoCpLs8cZo0kHBUsI9XtL9QA7E6RHHFsDZoXWcTMFqcAGmvYAGXaukoMGNSTRwxiTrtj_530fv2Rw7XrwosK43BpE09_5G3MYgJhITI9fXupiI5meBOlHlH97IyxULsoqfa7J")' }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
          </motion.div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.5 }}
            className="absolute -top-4 -right-4 bg-primary p-4 rounded-full shadow-lg shadow-primary/50 z-20"
          >
            <Sparkles className="text-white size-8" />
          </motion.div>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <motion.h1 
            initial={{ letterSpacing: "0.2em", opacity: 0 }}
            animate={{ letterSpacing: "-0.02em", opacity: 1 }}
            className="text-slate-100 text-6xl font-black tracking-tighter mb-2"
          >
            ENHANCE <span className="text-primary italic">IT</span>
          </motion.h1>
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-primary/50"></span>
            <p className="text-primary font-bold tracking-[0.3em] text-xs uppercase">AI NEURAL ENGINE</p>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-primary/50"></span>
          </div>
        </div>
      </motion.div>

      <div className="w-full flex flex-col gap-6 mt-8">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <p className="text-slate-100 text-xl font-bold tracking-tight">Optimizing...</p>
            <p className="text-primary/60 text-[10px] font-bold uppercase tracking-widest">Vibrant Aesthetic V4</p>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-primary text-4xl font-black">{progress}</span>
            <span className="text-primary/60 text-sm font-bold">%</span>
          </div>
        </div>
        <div className="h-3 w-full rounded-full bg-white/5 border border-white/10 p-[2px] overflow-hidden">
          <motion.div 
            className="h-full rounded-full bg-gradient-to-r from-primary-dark via-primary to-primary-light shadow-neon"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", bounce: 0 }}
          />
        </div>
      </div>
    </div>
    
    <div className="absolute bottom-10 flex flex-col items-center gap-2">
      <div className="flex gap-2">
        {[0, 1, 2].map(i => (
          <motion.div 
            key={i}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            className="size-1 bg-primary rounded-full"
          />
        ))}
      </div>
      <p className="text-slate-500 text-[10px] font-bold tracking-[0.4em] uppercase opacity-40">
        Hyper-Resolution Stable
      </p>
    </div>
  </div>
);

const HomeScreen = ({ onSelectImage, history }: { onSelectImage: (file: File) => void, history: EnhancementHistory[] }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-50 flex items-center bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl p-5 border-b border-primary/5 justify-between">
        <div className="flex items-center gap-3">
          <div className="text-primary flex size-11 shrink-0 items-center justify-center bg-primary/10 rounded-2xl shadow-inner-glow">
            <Sparkles className="size-6" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-slate-900 dark:text-white text-lg font-black leading-none tracking-tight">AI SPARK</h2>
            <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mt-1">Pro Enhancer</p>
          </div>
        </div>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-white/5"
        >
          <Settings className="size-5" />
        </motion.button>
      </header>

      <main className="flex-1 px-5 py-8 max-w-2xl mx-auto w-full">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-10"
        >
          <h1 className="text-slate-900 dark:text-white tracking-tight text-5xl font-black leading-[0.9] mb-3">
            Ready to <br/> <span className="text-primary italic">glow up?</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Transform your photos with neural magic.</p>
          
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && onSelectImage(e.target.files[0])}
          />
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => fileInputRef.current?.click()}
            className="group relative mt-8 w-full overflow-hidden rounded-3xl h-28 bg-primary text-white shadow-2xl shadow-primary/40 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-primary to-primary-dark"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="relative z-10 flex items-center gap-5">
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md border border-white/30 group-hover:rotate-6 transition-transform">
                <ImageIcon className="size-8" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-2xl font-black tracking-tight uppercase">Select Photo</span>
                <span className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Gallery or Camera</span>
              </div>
            </div>
            <div className="absolute -right-6 -bottom-6 opacity-10 rotate-12">
              <Sparkles className="size-32" />
            </div>
          </motion.button>
        </motion.div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-slate-900 dark:text-white text-xl font-black tracking-tight">Recent Magic</h2>
          <button className="text-primary text-xs font-black uppercase tracking-widest hover:opacity-70 transition-opacity">See All</button>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {(history.length > 0 ? history.map(h => h.enhanced) : [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCNL76gm9fd4dE0kj0cmM0vUhEUAAXdSIObTkI8HADXLkxkgLY8Zve7w8f-kfH6RHAO0_kAvCDSNPYtoR0zSw-Urz6syi9knYU6t2BqTYkRYH-nStWtMkbjoWfdKnDa26tiFfbygwfggd9EfAXn2y7j_-gMiLLmqgRVaVlpdB8VG_gDlv4WPHWRm14CzpyE4oDJNKEEZO4Za1lwiT7fMCznhRtrS1V_SEuqLrIxtSlpUdBYOiNljZ3hzlMHgyKWLN2hjEBXo8atUGf5",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAmlEGHMtIOVIFUn9-IY0Wc_f-ekdavi5xsgWKSo-veSdXEcYxbZ3WJ9gK764qYSGOBjO4bNfykZeIriYmurElOk22wtNioT1qQbXvKFg51FlWcXjeFB6XbpQ8yYWOnJvs555U9r0JbnGJPvjLufYcOciFSTn1PcB2io64AI0d8dMK6r1014wZ5Coj4eOyHIuOBYOJRwzkNcM625qnSjGUkNkTdrBJm4Kcuz6CC2V2snvtREkC-_ZArTsPipTG69L3Nw7ItDYgollOs",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuByJbnbPir1S2DGqK92fmT4-BdaVn8jl2HjBoNB10GQXO_nMhkN65tqLmG5cHjJgHRTvYqVvkI4WoSpgEJ3wA8-4sEN60PzgiINQVn3XJhLN48d7iqb1m1Wha05VdpAnTS_8H3m5jqc60EULAtA3_mXJgTh4f02j4heZKcT1Ix5nSihrM-KqOvHN2mW8bq5plwtest7MUxdeI4oWjbfSLWQLOWUywYVtdqI9qCLeaF7d9jTaaO9qlOvUbZb3OlcNVc4CwTJaNmEBX5S",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDLTZaAvKtfO5P3YMGbmgr8cop4nGE6Hg97Y7XoFZXMMmqyiaZzoGbIlhZP4ZFIUQC-3f8pSm_8ger1_R4wh0ZAbyax1XRXrt8mY_rXUKYQGqcfMIdJ1IwQrGAg8-nQHQnmdfdbqj0EC4Ook-XwiltNmo4w4ps87RANfcVzti4IgOPenLMxNxCTkH4yJ-o5S-my1uPEZdhGcOKoVPwPjvDnhkkc60Bch2Y9nZUGTE3Ur5zFO3pyUVvFaXdm9an1eMk7T4CappHa04ux"
          ]).map((url, i) => (
            <motion.div 
              key={i} 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-xl transition-all hover:border-primary/50"
            >
              <img src={url} alt="Recent" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-3 right-3 glass-dark p-1.5 rounded-xl">
                <CheckCircle2 className="text-primary size-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <div className="fixed bottom-28 right-6 z-50">
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-white shadow-2xl shadow-primary/50 border-2 border-white/20"
        >
          <Camera className="size-8" />
        </motion.button>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 glass-dark border-t border-white/5 px-6 pb-8 pt-4 z-40">
        <div className="flex max-w-2xl mx-auto justify-between items-center">
          <button className="flex flex-col items-center gap-1 text-primary">
            <HomeIcon className="size-6" />
            <p className="text-[9px] font-black uppercase tracking-widest">Home</p>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-500">
            <LayoutGrid className="size-6" />
            <p className="text-[9px] font-black uppercase tracking-widest">Gallery</p>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-500">
            <Palette className="size-6" />
            <p className="text-[9px] font-black uppercase tracking-widest">Styles</p>
          </button>
        </div>
      </nav>
    </div>
  );
};

const EditorScreen = ({ image, onEnhance, onBack }: { image: string, onEnhance: (opts: EnhancementOptions) => void, onBack: () => void }) => {
  const [options, setOptions] = useState<EnhancementOptions>({
    faceHd: true,
    upscale: false,
    noiseReduction: true
  });

  const tools = [
    { id: 'faceHd', label: 'Face HD', sub: 'Neural detail recovery', icon: User },
    { id: 'upscale', label: 'Upscale 4x', sub: 'Ultra resolution output', icon: Maximize2 },
    { id: 'noiseReduction', label: 'Denoise', sub: 'Remove grain & artifacts', icon: Eraser },
  ];

  return (
    <div className="relative flex h-screen w-full flex-col bg-background-dark overflow-hidden">
      <header className="flex items-center p-5 justify-between border-b border-white/5">
        <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} className="flex size-11 items-center justify-center rounded-2xl bg-white/5">
          <ArrowLeft className="text-white size-5" />
        </motion.button>
        <h2 className="text-white text-lg font-black tracking-tight">EDITOR</h2>
        <motion.button whileTap={{ scale: 0.9 }} className="flex size-11 items-center justify-center rounded-2xl bg-white/5">
          <History className="text-white size-5" />
        </motion.button>
      </header>

      <main className="flex-1 overflow-y-auto pb-40">
        <div className="px-5 mt-6 max-w-xl mx-auto">
          <motion.div 
            layoutId="main-image"
            className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden border-2 border-white/10 shadow-2xl bg-slate-900"
          >
            <img src={image} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 glass-dark px-4 py-2 rounded-2xl flex items-center gap-3">
              <div className="size-2 rounded-full bg-primary animate-ping"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Original Preview</span>
            </div>
          </motion.div>

          <div className="mt-10">
            <h3 className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-6">Neural Tools</h3>
            <div className="flex flex-col gap-4">
              {tools.map((tool) => (
                <motion.button 
                  key={tool.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setOptions(prev => ({ ...prev, [tool.id]: !prev[tool.id as keyof EnhancementOptions] }))}
                  className={`flex items-center justify-between p-4 rounded-3xl border transition-all ${
                    options[tool.id as keyof EnhancementOptions] 
                      ? 'bg-primary/10 border-primary/40 shadow-neon' 
                      : 'bg-white/5 border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`size-12 rounded-2xl flex items-center justify-center transition-colors ${
                      options[tool.id as keyof EnhancementOptions] ? 'bg-primary text-white' : 'bg-white/10 text-white/40'
                    }`}>
                      <tool.icon className="size-6" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className={`font-black tracking-tight ${options[tool.id as keyof EnhancementOptions] ? 'text-white' : 'text-white/40'}`}>
                        {tool.label}
                      </span>
                      <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{tool.sub}</span>
                    </div>
                  </div>
                  <div className={`size-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    options[tool.id as keyof EnhancementOptions] ? 'bg-primary border-primary' : 'border-white/10'
                  }`}>
                    {options[tool.id as keyof EnhancementOptions] && <CheckCircle2 className="text-white size-4" />}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-6 glass-dark border-t border-white/5">
        <div className="max-w-xl mx-auto">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onEnhance(options)}
            className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 shadow-neon"
          >
            <Zap className="size-6 fill-current" />
            ENHANCE NOW
            <Zap className="size-6 fill-current" />
          </motion.button>
          <div className="flex justify-center items-center gap-2 mt-4">
            <div className="h-[1px] w-4 bg-white/10"></div>
            <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em]">Cost: 2 Credits</p>
            <div className="h-[1px] w-4 bg-white/10"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ResultScreen = ({ original, enhanced, onBack }: { original: string, enhanced: string, onBack: () => void }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const pos = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, pos)));
  };

  const handleSave = () => {
    const link = document.createElement('a');
    link.href = enhanced;
    link.download = `enhanced-photo-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        const blob = await (await fetch(enhanced)).blob();
        const file = new File([blob], 'enhanced-photo.png', { type: 'image/png' });
        await navigator.share({
          files: [file],
          title: 'My AI Enhanced Photo',
          text: 'Check out this photo I enhanced with AI Spark!',
        });
      } else {
        // Fallback: Copy to clipboard or just alert
        handleSave();
        alert("Sharing not supported on this browser. Image saved instead!");
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="bg-background-dark min-h-screen flex flex-col overflow-hidden">
      <nav className="flex items-center justify-between p-5 border-b border-white/5 glass-dark sticky top-0 z-50">
        <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} className="flex size-11 items-center justify-center rounded-2xl bg-white/5">
          <ArrowLeft className="text-white size-5" />
        </motion.button>
        <h1 className="text-white text-lg font-black tracking-tight uppercase">Magic Complete</h1>
        <div className="size-11"></div>
      </nav>

      <main className="flex-1 flex flex-col items-center max-w-2xl mx-auto w-full p-5 gap-8 overflow-y-auto pb-32">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative px-8 py-3 glass-dark border-2 border-primary rounded-3xl flex items-center gap-3 shadow-neon"
        >
          <Sparkles className="text-primary size-5 fill-current" />
          <span className="text-white font-black tracking-[0.3em] uppercase text-xs">Neural Success</span>
          <CheckCircle2 className="text-primary size-5" />
        </motion.div>

        <div 
          ref={containerRef}
          onMouseMove={handleMove}
          onTouchMove={handleMove}
          className="w-full relative aspect-[3/4] rounded-[3rem] overflow-hidden border-2 border-white/10 bg-slate-900 shadow-2xl cursor-col-resize"
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${enhanced})` }} />
          <div 
            className="absolute inset-0 overflow-hidden border-r-2 border-primary shadow-neon"
            style={{ width: `${sliderPos}%` }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center grayscale brightness-50 contrast-75 blur-[2px]" 
              style={{ backgroundImage: `url(${original})`, width: `${100 / (sliderPos / 100)}%` }}
            />
            <div className="absolute top-6 left-6 glass-dark px-4 py-2 rounded-2xl text-[10px] uppercase font-black tracking-widest border border-white/10">Before</div>
          </div>
          <div className="absolute top-6 right-6 bg-primary px-4 py-2 rounded-2xl text-[10px] uppercase font-black tracking-widest shadow-neon">Enhanced</div>
          
          <div 
            className="absolute top-0 bottom-0 w-1 bg-primary shadow-neon"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-12 bg-primary rounded-full flex items-center justify-center shadow-neon border-4 border-white">
              <Sparkles className="text-white size-6 fill-current" />
            </div>
          </div>
        </div>

        <div className="w-full px-4">
          <div className="flex justify-between items-end mb-4">
            <div className="flex flex-col">
              <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Neural Precision</p>
              <p className="text-xl font-black text-white tracking-tight">Quality Score</p>
            </div>
            <p className="text-4xl font-black text-primary">98<span className="text-lg opacity-50">%</span></p>
          </div>
          <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-[2px] border border-white/10">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary-dark to-primary-light rounded-full shadow-neon"
              initial={{ width: 0 }}
              animate={{ width: '98%' }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 w-full">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="flex items-center justify-center gap-3 bg-primary text-white font-black py-5 rounded-[2rem] shadow-neon"
          >
            <Download className="size-6" />
            SAVE
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleShare}
            className="flex items-center justify-center gap-3 bg-white/5 text-white font-black py-5 rounded-[2rem] border border-white/10"
          >
            <Share2 className="size-6" />
            SHARE
          </motion.button>
        </div>

        <div className="w-full p-6 glass-dark rounded-[2.5rem] border border-white/5">
          <div className="flex items-start gap-4">
            <div className="bg-primary/20 p-3 rounded-2xl">
              <Lightbulb className="text-primary size-6" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-widest">Neural Tip</h3>
              <p className="text-xs text-white/40 mt-2 leading-relaxed">Try the <span className="text-primary font-bold">Anime Style</span> filter to transform this portrait into a high-fidelity digital masterpiece.</p>
            </div>
          </div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 glass-dark border-t border-white/5 px-6 pb-8 pt-4 z-40">
        <div className="flex max-w-2xl mx-auto justify-between items-center">
          <button onClick={onBack} className="flex flex-col items-center gap-1 text-slate-500">
            <HomeIcon className="size-6" />
            <p className="text-[9px] font-black uppercase tracking-widest">Home</p>
          </button>
          <button className="flex flex-col items-center gap-1 text-primary">
            <Sparkles className="size-6" />
            <p className="text-[9px] font-black uppercase tracking-widest">Magic</p>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-500">
            <History className="size-6" />
            <p className="text-[9px] font-black uppercase tracking-widest">History</p>
          </button>
        </div>
      </nav>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('home');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [history, setHistory] = useState<EnhancementHistory[]>([]);

  const handleSelectImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      setScreen('editor');
    };
    reader.readAsDataURL(file);
  };

  const handleEnhance = async (options: EnhancementOptions) => {
    if (!selectedImage) return;
    
    setScreen('loading');
    setLoadingProgress(0);
    
    // Faster simulation for better perceived performance
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        // Faster increments
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    try {
      // Client-side resizing to speed up upload and processing
      const resizedImage = await resizeImage(selectedImage, 1024);
      const result = await enhanceImage(resizedImage, options);
      
      setEnhancedImage(result);
      setLoadingProgress(100);
      
      const newHistoryItem: EnhancementHistory = {
        id: Date.now().toString(),
        original: selectedImage,
        enhanced: result,
        timestamp: Date.now()
      };
      setHistory(prev => [newHistoryItem, ...prev]);
      
      setTimeout(() => {
        setScreen('result');
      }, 300);
    } catch (error) {
      alert("Enhancement failed. Please try again.");
      setScreen('editor');
    } finally {
      clearInterval(interval);
    }
  };

  // Helper to resize image for faster API processing
  const resizeImage = (base64Str: string, maxSide: number): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSide) {
            height *= maxSide / width;
            width = maxSide;
          }
        } else {
          if (height > maxSide) {
            width *= maxSide / height;
            height = maxSide;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.src = base64Str;
    });
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {screen === 'home' && (
          <motion.div 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <HomeScreen onSelectImage={handleSelectImage} history={history} />
          </motion.div>
        )}

        {screen === 'editor' && selectedImage && (
          <motion.div 
            key="editor"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <EditorScreen 
              image={selectedImage} 
              onEnhance={handleEnhance} 
              onBack={() => setScreen('home')} 
            />
          </motion.div>
        )}

        {screen === 'loading' && (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SplashScreen progress={loadingProgress} />
          </motion.div>
        )}

        {screen === 'result' && selectedImage && enhancedImage && (
          <motion.div 
            key="result"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ResultScreen 
              original={selectedImage} 
              enhanced={enhancedImage} 
              onBack={() => setScreen('home')} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
