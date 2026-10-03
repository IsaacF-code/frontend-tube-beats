import "./ErrorMessage.css";

type ErrorMessageProps = {
    message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <div 
            className="error-message"
            role="alert">
            <span
                className="error-icon"
                aria-hidden="true" 
            >⚠️</span> 
            <span>{message}</span>
        </div>
    )
}

export default ErrorMessage;