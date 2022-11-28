import { type UserModule } from "~/types";
const WeixinJSBridge = window.WeixinJSBridge;

export const install: UserModule = () => {
  // rem布局，body:font-size初始化
  (function () {
    const doc = document;
    const win = window;
    const resizeEvt =
      "orientationchange" in window ? "orientationchange" : "resize";
    const recalc = function () {
      let _w = doc.documentElement.clientWidth || doc.body.clientWidth;
      _w = _w > 640 ? 640 : _w;
      let _size = (_w / 750) * 100;
      _size = _size < 60 ? _size : 60;
      doc.documentElement.style.fontSize = `${_size}px`;
    };
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener("DOMContentLoaded", recalc, false);
  })();

  // 移除微信webview字体影响
  (function () {
    if (
      typeof WeixinJSBridge == "object" &&
      typeof WeixinJSBridge.invoke == "function"
    ) {
      handleFontSize();
    } else {
      if (document.addEventListener)
        document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
    }
    function handleFontSize() {
      WeixinJSBridge.invoke("setFontSizeCallback", { fontSize: 0 });
      WeixinJSBridge.on("menu:setfont", () => {
        WeixinJSBridge.invoke("setFontSizeCallback", { fontSize: 0 });
      });
    }
  })();
};
