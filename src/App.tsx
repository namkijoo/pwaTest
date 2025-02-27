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

      // 2️⃣ Base64 데이터 추출 (data:image/png;base64,... 제거)
      const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");

      // 3️⃣ Blob 변환
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length)
        .fill(0)
        .map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });

      // 4️⃣ FormData 생성
      const formData = new FormData();
      formData.append("backgroundImage", blob);

      // 5️⃣ 인스타그램 스토리 공유를 위한 Deep Link 실행
      const shareURL = `instagram-stories://share`;

      // 6️⃣ iOS에서 Intent를 사용해 공유 실행
      const file = new File([blob], "story.png", { type: "image/png" });

      try {
        await navigator.share({
          files: [file],
          title: "인스타그램 스토리 공유",
          text: "스토리에 자동 추가됨",
          url: shareURL,
        });

        // Deep Link 실행
        window.location.href = shareURL;
      } catch (shareError) {
        console.error("📌 공유 실패: ", shareError);
        alert(
          "스토리 공유가 지원되지 않는 환경입니다. 인스타그램 앱에서 직접 업로드해주세요!"
        );
      }
    } catch (error) {
      console.error("스토리 공유 실패:", error);
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
        <button onClick={handleShareToInstagram}>인스타그램 공유2</button>
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
