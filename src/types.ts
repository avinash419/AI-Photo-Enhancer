export interface EnhancementHistory {
  id: string;
  original: string;
  enhanced: string;
  timestamp: number;
}

export type AppScreen = 'home' | 'editor' | 'loading' | 'result';

export interface EnhancementOptions {
  faceHd: boolean;
  upscale: boolean;
  noiseReduction: boolean;
}
