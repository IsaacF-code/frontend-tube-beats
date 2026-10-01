import type { VideoInfoResponse } from "../types/video";

type VideoDownload = {
    blob: Blob;
    fileName: string;
}

export async function getVideoInfo(url: string): Promise<VideoInfoResponse> {
    const response = await fetch("http://localhost:3000/api/video/info", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            url: url,
        }),
    });
    
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Não foi possível buscar as informações do vídeo."); 
    }
    
    return data.data;
}

export async function getVideoDownload(url: string): Promise<VideoDownload> {
    const response = await fetch("http://localhost:3000/api/video/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
        }),
      });
      
      
      if (!response.ok) {
          throw new Error ("Não foi possível baixar o áudio.");
        }
        
      const blob: Blob = await response.blob();

      const contentDisposition = response.headers.get("Content-Disposition");
      
      const match = contentDisposition?.match(/filename\*=UTF-8''(.+)/i);

      const fileName: string = match ? decodeURIComponent(match[1]) : "música.mp3";

      return {
        blob, fileName
      };

}