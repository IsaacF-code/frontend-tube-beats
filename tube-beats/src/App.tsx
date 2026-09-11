import { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  
  return (
    <div className="App">
      <h1>Tube Beats</h1>
      <input
        type="text"
        placeholder="Digite a URL do YouTube"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        />
      <button onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
  
  async function handleSearch() {
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
  } 

}

export default App;