import { useState } from 'react';

type VideoInfo = {
  title: string;
  duration: number;
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

      setVideo(data.data);
    } catch (error) {
      console.error("Erro: ", error);
      
      setError("Erro ao buscar informações do vídeo. Por favor, tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
    
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

          <p>Duração: {video.duration} segundos</p>
          <img src={video.thumbnail} alt={video.title} />
        </div>
      )}
    </div>
  );
}

export default App;