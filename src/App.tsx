import { useState } from 'react';
import VideoResult from './components/VideoResult';
import SearchForm from './components/SearchForm';
import './App.css';
import { getVideoInfo, getVideoDownload } from './services/Api';
import { isYoutubeUrl } from './utils/isYoutubeUrl';
import type { VideoInfo } from './types/video';
import ErrorMessage from './components/ErrorMessage';

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

      setVideo(videoData);
    } catch (error) {
      console.error("Erro ao buscar informações do vídeo: ", error);
      
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
    setError(null);
    setDownloading(true);

    try {
      const videoDownload = await getVideoDownload(url);

      const downloadUrl = URL.createObjectURL(videoDownload.blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = videoDownload.fileName;
      
      link.click();
      
      URL.revokeObjectURL(downloadUrl);
    }
    catch (error) {
      console.error("Erro ao baixar o áudio: ", error)

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Erro ao baixar. Por favor, tente novamente mais tarde.');
      }
    }
    finally {
      setDownloading(false);
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

        {error && <ErrorMessage message={error} />}
        {video && <VideoResult video={video} onDownload={handleDownload} downloading={downloading} />}
      </main>
    </div>
  );
}

export default App;