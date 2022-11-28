/// <reference types="vite/client" />

export {};

declare global {
  interface Window {
    screenWidth: number;
    screenHeight: number;
    WeixinJSBridge: any;
    wx: any;
  }
}
