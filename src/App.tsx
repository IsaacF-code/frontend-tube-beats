import { useState } from 'react';
import VideoResult from './components/VideoResult';
import SearchForm from './components/SearchForm';
import './App.css';

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
      const response = await fetch("http://localhost:3000/api/video/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
        })
      })

      const data = await response.json();
      
      console.log("React: ", data);

      if (!response.ok) {
        setError(data.error);
        return;
      }
      setVideo({
        ...data.data,
        durationFormatted: formatDuration(data.data.duration)
      });
    } catch (error) {
      console.error("Erro: ", error);
      
      setError("Erro ao buscar informações do vídeo. Por favor, tente novamente mais tarde.");
    } finally {
      setLoading(false);
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
        <h1>Tube Beats</h1>

        <SearchForm
          url={url}
          onChange={setUrl}
          onSearch={handleSearch}
          loading={loading}
        />

        {error && (
          <p style={{ color: 'red' }}>{error}</p>
        )}
        {video && <VideoResult video={video} />}
      </main>
    </div>
  );
}

export default App;