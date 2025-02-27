import { useRef } from "react";
import saveAs from "file-saver";
import html2canvas from "html2canvas";
import { toPng } from "html-to-image";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const rateRef = useRef(null);

  const handleDownload = async () => {
    if (!rateRef.current) {
      return;
    }
    try {
      const canvas = await html2canvas(rateRef.current, {
        backgroundColor: "white",
        useCORS: true,
        scale: 1,
        width: 350,
        height: 350,
      });

      const dataUrl = canvas.toDataURL("image/svg");

      const blob = await (await fetch(dataUrl)).blob();

      saveAs(blob, "승리요정.svg");
    } catch (error) {
      console.error("이미지 저장에 실패했습니다.", error);
    }
  };

  const handleDownload2 = async () => {
    if (!rateRef.current) {
      return;
    }
    try {
      const dataUrl = await toPng(rateRef.current, {
        cacheBust: true,
        style: {
          margin: "0",
          backgroundColor: "white",
        },
      });

      const blob = await (await fetch(dataUrl)).blob();

      saveAs(blob, "승리요정.png");
    } catch (error) {
      console.error("이미지 저장에 실패했습니다.", error);
    }
  };

  const handleShareToInstagram = async () => {
    if (!rateRef.current) {
      return;
    }

    try {
      const dataUrl = await toPng(rateRef.current, {
        cacheBust: true,
        backgroundColor: "transparent",
      });

      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "instagram-story.png", {
        type: "image/png",
      });

      // Share API를 사용하여 공유
      if (navigator.share) {
        await navigator.share({
          title: "인스타그램에 공유하기",
          text: "이미지를 공유합니다!",
          files: [file], // 여기서 파일을 포함합니다.
        });
      } else {
        alert("이 기기는 공유 기능을 지원하지 않습니다.");
      }
    } catch (error) {
      console.error("이미지 공유에 실패했습니다.", error);
    }
  };

  return (
    <div ref={rateRef}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img
            src={viteLogo}
            className="logo"
            alt="Vite logo"
            crossOrigin="anonymous"
          />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleDownload}>다운</button>
        <button onClick={handleDownload2}>다운2</button>
        <button onClick={handleShareToInstagram}>인스타그램 공유6</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
