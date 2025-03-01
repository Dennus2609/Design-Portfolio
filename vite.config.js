import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        polygon: 'polygon.html',
        swoosh: 'projects/swoosh.html',
        itsfreedubai: 'projects/itsfreedubai.html',
        architecture: 'projects/architecture.html',
        music: 'projects/music.html',
        motionGraphics: 'projects/motion-graphics.html'
      }
    }
  }
}) 