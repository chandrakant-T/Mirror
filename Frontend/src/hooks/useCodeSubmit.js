import { useState } from 'react';
import api from '../utils/api';

function useCodeSubmit() {
    const [output, setOutput] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function submitCode(source_code, language_id, stdin) {
        setLoading(true);
        setError(null);
        setOutput(null);

        try {
            const res = await api.post('/code-submit', {
                source_code,
                language_id,
                stdin
            });
            setOutput(res.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return { output, loading, error, submitCode }
}

export default useCodeSubmit