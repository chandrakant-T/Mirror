import { useState, useEffect } from 'react';
import api from '../utils/api';

function LanguageSelector({ onLanguageChange }) {
    const [languages, setLanguages] = useState([]);
    const [selected, setSelected] = useState(63); // default JavaScript

    useEffect(() => {
        api.get('/languages')
            .then(res => setLanguages(res.data))
            .catch(err => console.error(err))
    }, [])

    function handleChange(e) {
        const id = parseInt(e.target.value)
        setSelected(id)
        onLanguageChange(id)
    }

    return (
        <select
            value={selected}
            onChange={handleChange}
            style={{
                backgroundColor: '#2d2d2d',
                color: '#fff',
                border: '1px solid #444',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer',
            }}
        >
            {languages.map(lang => (
                <option key={lang.id} value={lang.id}>
                    {lang.name}
                </option>
            ))}
        </select>
    )
}

export default LanguageSelector