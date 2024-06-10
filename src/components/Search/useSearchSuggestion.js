import { useQuery } from 'react-query';
import { fetchSuggestions } from '../../data/juegos';

const useSearchSuggestion = () => {
  const { data: suggestions, isLoading } = useQuery(
    'suggestions',
    fetchSuggestions,
    {
      refetchOnWindowFocus: false,
    }
  );

  const suggestionTexts = suggestions
    ? suggestions.map((suggestion) => suggestion.nombre)
    : [];

  return { suggestions: suggestionTexts, isLoading };
};

export default useSearchSuggestion;
