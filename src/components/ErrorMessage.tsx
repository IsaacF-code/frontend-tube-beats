import "./ErrorMessage.css";

type ErrorMessageProps = {
    message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <div className="error-message">
            <span className="error-icon">⚠️</span> {message}
        </div>
    )
}

export default ErrorMessage;