import React, { useState } from 'react';
import { FaScroll } from 'react-icons/fa'; 
import "./SearchBar.css"; 
import { Configuration, OpenAIApi } from 'openai'; 

const SearchBar = (props: {onSearch: (value:string | null) => void; response: string | null; loading: boolean; setLoading: (value:boolean) => void;}) => {

    const [query, setQuery] = useState<string>('');
    
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if(Response){
            props.onSearch(null); // If there already is a previous response, set to null to avoid overlap with loading text
        }
        props.setLoading(true);
        try {
            const response = await fetch('/api/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: ` Do NOT suggest a watch that would be classified as a fashion watch! And do NOT include the command in the response before the Suggest in my query! Suggest a watch based on: ${query}.` }), 
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();

            const responseContent = data.choices[0]?.message?.content || 'No valid response received';

            props.onSearch(responseContent);
        } catch (error) {
            console.error('Error fetching data from your server:', error);
            props.onSearch('Sorry, I could not fetch any watch suggestions at this time.');
        } finally {
            props.setLoading(false); 
        }
    };
      
    
    return (
        <div className="search-bar-container">
            <input
                className="search-bar-input"
                type="text"
                id="fname"
                name="fname"
                placeholder="Tell me about your dream watch...."
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className="search-bar-button" type="submit" onClick={handleSubmit}>
                <FaScroll />
            </button>
        </div>
    );
};

export default SearchBar;
