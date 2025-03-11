import { useEffect, useRef } from "react";

export const UnityGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoaded = useRef<boolean>(false);

  useEffect(() => {
    // Load unity webgl
    const loadUnityGame = () => {
      const script = document.createElement("script");
      script.src = "/Build/slot.loader.js";
      script.async = true;

      script.onload = () => {
        if (!canvasRef.current) return;

        window // @ts-ignore
          .createUnityInstance(canvasRef.current, {
            dataUrl: "/Build/slot.data.gz",
            frameworkUrl: "/Build/slot.framework.js.gz",
            codeUrl: "/Build/slot.wasm.gz",
            streamingAssetsUrl: "StreamingAssets",
            companyName: "DefaultCompany",
            productName: "My project",
            productVersion: "0.1",
            doNotCaptureKeyboard: true,
          })
          .then((unityInstance: any) => {
            window.unityInstance = unityInstance;
            console.log("unity loaded");
            gameLoaded.current = true;
          })
          .catch((error: any) => {
            console.error("Unity loading error:", error);
          });
      };
      document.body.appendChild(script);
      return script;
    };
    const script = loadUnityGame();

    return () => {
      if (script && script.parentNode) {
        document.body.removeChild(script);
      }

      if (window.unityInstance) {
        window.unityInstance.Quit();
        window.unityInstance = undefined;
      }
    };
  }, []);
  return (
    <div className="unity-container">
      <canvas
        ref={canvasRef}
        id="unity-canvas"
        style={{ width: "1280px", height: "720px", background: "#444" }}
      >
        <div className="unity-loading"></div>
      </canvas>
    </div>
  );
};
