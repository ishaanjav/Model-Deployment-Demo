import './App.css';
import { useState } from 'react';

function App() {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('/modal_labs.jpeg');

  const handleSubmit = async () => {
    if (!inputText.trim()) {
      alert('Please enter some text');
      return;
    }

    setIsLoading(true);
    try {

    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while generating the image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Generation</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter your text here..."
            className="text-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Submit'}
          </button>
        </div>
        <div className="image-container">
          <img
            src={imageUrl}
            alt="Generated"
            className="generated-image"
          />
        </div>
      </header>
    </div>
  );
}

export default App;
