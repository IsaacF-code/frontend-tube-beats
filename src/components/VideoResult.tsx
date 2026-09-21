import "./VideoResult.css"

type VideoResultProps = {
    video: {
        title: string;
        durationFormatted: string;
        thumbnail: string;
    };
};

function VideoResult({ video }: VideoResultProps) {
    return (
        <div className="video-result">
          <img 
            className="video-thumbnail"
            src={video.thumbnail} 
            alt={video.title}
            />
            <div className="video-info">
              <h2 className="video-title">{video.title}</h2>
              <p className="video-duration">Duração: {video.durationFormatted}</p>
            </div>
        </div>
    )
}

export default VideoResult;