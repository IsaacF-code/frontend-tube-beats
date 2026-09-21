import "./SearchForm.css";

type SearchFormProps = {
    url: string;
    onChange: (value: string) => void;
    onSearch: () => void;
    loading: boolean;
}

function SearchForm({ url, onChange, onSearch, loading }: SearchFormProps) {
    return (
        <div className="search-form">
            <input
            className="search-input"
            type="text"
            placeholder="Digite a URL do YouTube"
            value={url}
            onChange={(e) => onChange(e.target.value)}
            />

            <button 
                className="search-button"
                onClick={onSearch} 
                disabled={loading}
                >
                {loading ? "Buscando..." : "Buscar"}
            </button>
        </div>
    )
}

export default SearchForm;