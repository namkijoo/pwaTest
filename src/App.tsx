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
      // 1️⃣ HTML 요소 → PNG 변환
      const dataUrl = await toPng(rateRef.current, {
        cacheBust: true,
        style: {
          margin: "0",
          backgroundColor: "white",
        },
      });

      // 2️⃣ Data URL → Blob 변환
      const blob = await (await fetch(dataUrl)).blob();

      // 3️⃣ Blob → File 변환 (iOS에서 인식 가능)
      const file = new File([blob], "story.png", { type: "image/png" });

      // 4️⃣ FormData를 활용해 이미지 전달 준비
      const formData = new FormData();
      formData.append("file", file);

      // 5️⃣ iOS 인스타그램 스토리 공유 Deep Link 실행
      const instagramURL = `instagram-stories://share?source_application=com.yourapp.bundleid`;

      // 6️⃣ iOS에서 `window.location.href`로 실행 (PWA 지원)
      window.location.href = instagramURL;
    } catch (error) {
      console.error("스토리 공유 실패:", error);
      alert(
        "스토리 공유가 지원되지 않는 환경입니다. 인스타그램 앱에서 직접 업로드해주세요!"
      );
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
        <button onClick={handleShareToInstagram}>인스타그램 공유</button>
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
