import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Quote.css';

// Define a predefined set of colors outside the component function
const predefinedColors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#34495e'];

const QuoteMachine = () => {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [color, setColor] = useState(getRandomColor());

    function getRandomColor() {
        // Select a random color from the predefined set
        const randomIndex = Math.floor(Math.random() * predefinedColors.length);
        return predefinedColors[randomIndex];
    }

    const getNewQuote = async () => {
        try {
            const response = await fetch('https://api.quotable.io/random');
            const data = await response.json();

            setQuote(data.content);
            setAuthor(data.author);
            setColor(getRandomColor());
        } catch (error) {
            console.error('Error fetching new quote:', error);
        }
    };

    useEffect(() => {
        getNewQuote();
    }, []);

    useEffect(() => {
        document.body.style.backgroundColor = color;
    }, [color]);

    return (
        <div id="quote-box" className="container mt-5 d-flex justify-content-center align-items-center">
            <div className="card p-4">
                <div id="text" className="mb-3 quote-text" style={{ color, overflowWrap: 'break-word', maxHeight: '150px', overflowY: 'auto' }}>
                    {quote}
                </div>
                <div id="author" className="mb-3" style={{ color }}>
                    - {author}
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <button
                            id="new-quote"
                            className="btn w-100"
                            onClick={getNewQuote}
                            style={{ backgroundColor: color, borderColor: color }}
                        >
                            New Quote
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col d-flex">
                        <div className="d-flex gap-2">
                            <SocialButton
                                id="tweet-quote"
                                url={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                    `"${quote}" - ${author}`
                                )}`}
                                color={color}
                                iconClass="fa-square-x-twitter"
                                iconColor="#000000"
                            />
                            <SocialButton
                                id="instagram-icon"
                                url={`https://www.instagram.com/your-instagram-profile`}
                                color={color}
                                iconClass="fa-instagram"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SocialButton = ({ id, url, color, iconClass, iconColor }) => (
    <a
        id={id}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn"
        style={{ backgroundColor: color, borderColor: color }}
    >
        <i className={`fab ${iconClass}`} style={{ color: iconColor }}></i>
    </a>
);

export default QuoteMachine;
