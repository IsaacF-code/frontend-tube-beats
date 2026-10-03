import "./SearchForm.css";
import  "../index.css";

type SearchFormProps = {
    url: string;
    onChange: (value: string) => void;
    onSearch: () => void;
    loading: boolean;
}

function SearchForm({ url, onChange, onSearch, loading }: SearchFormProps) {
    return (
        <form className="search-form" onSubmit={(e) => {
            e.preventDefault();
            onSearch();
        }}>
            <input
            className="search-input"
            type="text"
            placeholder="Digite a URL do YouTube"
            value={url}
            onChange={(e) => onChange(e.target.value)}
            />

            <button 
                className="search-button"
                type="submit"
                disabled={loading}
                >
                {loading ? (
                    <>
                        <span 
                            className="loading-spinner"
                            aria-hidden="true"
                            ></span>
                        Buscando...
                    </>
                ) : (
                    "Buscar"
                ) }
            </button>
        </form>
    )
}

export default SearchForm;