import { useState } from 'react';
import VideoResult from './components/VideoResult';
import SearchForm from './components/SearchForm';
import './App.css';
import { getVideoInfo, getVideoDownload } from './services/Api.ts';

type VideoInfo = {
  title: string;
  duration: number;
  durationFormatted: string;
  thumbnail: string;
};

function App() {
  const [url, setUrl] = useState('');
  const [video, setVideo] = useState<VideoInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  async function handleSearch() {
    setError(null);
    setVideo(null);
    
    if (!url.trim()) {
      setError("Por favor, insira uma URL do YouTube.");
      return;
    }

    if (!isYoutubeUrl(url)) {
      setError("Por favor, insira uma URL válida do YouTube.");
      return;
    }

    setLoading(true);
    try {
      const videoData = await getVideoInfo(url);

      setVideo({
        ...videoData,
        durationFormatted: formatDuration(videoData.duration)
      });
    } catch (error) {
      console.error("Erro search: ", error);
      
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erro ao buscar informações do vídeo. Por favor, tente novamente mais tarde.");
      }

    } finally {
      setLoading(false);
    }
    
  }

  async function handleDownload() {
    setError(null)
    setDownloading(true);

    try {
      const videoDownload = await getVideoDownload(url)

      const downloadUrl = URL.createObjectURL(videoDownload.blob)

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = videoDownload.fileName;
      
      link.click();
      
      URL.revokeObjectURL(downloadUrl);
    }
    catch (error) {
      console.log("Erro download: ", error)
      setError('Erro ao baixar. Por favor, tente novamente mais tarde.')
    }
    finally {
      setDownloading(false);
    }
  }

  function formatDuration(duration: number): string { // Convertendo a duração de segundos para minutos
      const minutes = Math.floor(duration / 60);
      const secondsRemaining = duration % 60;
      const minutesFormatted = minutes.toString().padStart(2, '0');
      const secondsFormatted = secondsRemaining.toString().padStart(2, '0');
      const durationFormatted = `${minutesFormatted}:${secondsFormatted}`;
      return durationFormatted;
  }

  function isYoutubeUrl(url: string): boolean {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname === "www.youtube.com" || 
             parsedUrl.hostname === "youtube.com" ||
             parsedUrl.hostname === "youtu.be";
    } catch {
      return false;
    }
  }

  return (
    <div className="app">
      <main className='container'>
        <h1 className="app-title">Tube Beats</h1>
        <p className="app-subtitle">
          Baixe suas músicas e vídeos favoritos do YouTube.
        </p>

        <SearchForm
          url={url}
          onChange={setUrl}
          onSearch={handleSearch}
          loading={loading}
        />

        {error && (
          <p style={{ color: 'red' }}>{error}</p>
        )}
        {video && <VideoResult video={video} onDownload={handleDownload} downloading={downloading} />}
      </main>
    </div>
  );
}

export default App;