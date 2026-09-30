import "./VideoResult.css"
import { formatDuration } from "../utils/formatDuration";

type VideoResultProps = {
    video: {
        title: string;
        duration: number;
        thumbnail: string;
    };
    onDownload: () => void;
    downloading: boolean;
};

function VideoResult({ video, onDownload, downloading }: VideoResultProps) {
    return (
        <div className="video-result">
          <img 
            className="video-thumbnail"
            src={video.thumbnail} 
            alt={video.title}
            />
            <div className="video-info">
              <h2 className="video-title">{video.title}</h2>
              <p className="video-duration">Duração: {formatDuration(video.duration)}</p>
             <div>
              <button onClick={onDownload} disabled={downloading}>
                {downloading ? "Baixando...": "Baixar MP3"}
              </button>
             </div>
            </div>
        </div>
    )
}

export default VideoResult;