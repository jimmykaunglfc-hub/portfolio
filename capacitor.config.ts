import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kghtetoo.app',
  appName: 'KHNCO',
  webDir: 'public',
  server: {
    url: 'https://kghtetoo.com',
    cleartext: true,
    // Add this exact line to remove the bottom browser bar:
    allowNavigation: ['kghtetoo.com', '*.kghtetoo.com']
  }
};

export default config;