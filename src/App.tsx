import { useState } from 'react';

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

  return (
    <div className="App">
      <h1>Tube Beats</h1>
      <input
        type="text"
        placeholder="Digite a URL do YouTube"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Buscando..." : "Buscar"}
      </button>

      {error && (
        <p style={{ color: 'red' }}>{error}</p>
      )}
      {video && (
        <div>
          <h2>{video.title}</h2>

          <p>Duração: {video.durationFormatted}</p>
          <img src={video.thumbnail} alt={video.title} />
        </div>
      )}
    </div>
  );
}

export default App;