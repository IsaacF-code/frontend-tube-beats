import "./VideoResult.css"
import  "../index.css";
import { formatDuration } from "../utils/formatDuration";
import type { VideoInfo } from "../types/video";

type VideoResultProps = {
    video: VideoInfo;
    onDownload: () => void;
    downloading: boolean;
};

function VideoResult({ video, onDownload, downloading }: VideoResultProps) {
    return (
        <article className="video-result">
          <img 
            className="video-thumbnail"
            src={video.thumbnail} 
            alt={video.title}
            />
            <div className="video-info">
              <h2 className="video-title">{video.title}</h2>
              <p className="video-duration">Duração: {formatDuration(video.duration)}</p>
              <button 
                type="button"
                onClick={onDownload} 
                disabled={downloading}>
                {downloading ? (
                    <>
                        <span 
                            className="loading-spinner"
                            aria-hidden="true"
                            ></span>
                        Baixando...
                    </>
                ) : (
                    "Baixar MP3"
                )}
              </button>
            </div>
        </article>
    )
}

export default VideoResult;