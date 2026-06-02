import { useState, useEffect, useCallback } from 'react';
import { matchData as fallbackMatchData } from '../data/matchData';

// Helper to convert object map fallback data to array
const getFallbackMatchesList = () => {
  return Object.values(fallbackMatchData);
};

export function useMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMatches = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/matches');
      if (!response.ok) {
        throw new Error(`Failed to fetch matches: ${response.statusText}`);
      }
      const data = await response.json();
      setMatches(data);
      setError(null);
    } catch (err) {
      console.warn('API error fetching matches. Falling back to local static mock data.', err);
      // Fallback to static mock data
      setMatches(getFallbackMatchesList());
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  return { matches, loading, error, refresh: fetchMatches };
}

export function useMatch(matchId) {
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMatch = useCallback(async () => {
    if (!matchId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/matches/${matchId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch match: ${response.statusText}`);
      }
      const data = await response.json();
      setMatch(data);
      setError(null);
    } catch (err) {
      console.warn(`API error fetching match ${matchId}. Falling back to local static mock data.`, err);
      // Fallback to static mock data
      const localMatch = fallbackMatchData[matchId] || fallbackMatchData[1];
      setMatch(localMatch);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [matchId]);

  useEffect(() => {
    fetchMatch();
  }, [fetchMatch]);

  return { match, loading, error, refresh: fetchMatch };
}
