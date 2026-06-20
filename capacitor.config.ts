import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kghtetoo.app',
  appName: 'KHNCO',
  webDir: 'out',
  server: {
    url: 'https://kghtetoo.com',
    // FIXED: Keeps your website nested securely inside the native iOS app framework
    allowNavigation: ['kghtetoo.com', '*.kghtetoo.com'],
    cleartext: true
  },
  // Native configuration rules for your Stitch AI Splash Screen
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,     // Keeps splash screen visible for 2 seconds
      launchAutoHide: true,         // Automatically hides when Next.js is fully ready
      launchFadeOutDuration: 400,   // Smoothly dissolves the splash screen over 400ms
      backgroundColor: '#09090b',   // Match your Stitch AI background to prevent flashes
      showSpinner: false,           // Hides the default iOS loading wheel for a premium look
      iosSplashTemplate: 'Storyboard' 
    }
  }
};

export default config;