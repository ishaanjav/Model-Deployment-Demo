import './App.css';
import { useState } from 'react';

function App() {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleSubmit = async () => {
    if (!inputText.trim()) {
      alert('Please enter some text');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `<YOUR MODAL ENDPOINT HERE>?prompt=${encodeURIComponent(inputText)}`,
        {
          method: 'GET',
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Convert the response to a blob
      const videoBlob = await response.blob();
      // Create a URL for the blob
      const videoObjectUrl = URL.createObjectURL(videoBlob);
      // Update the video source
      setVideoUrl(videoObjectUrl);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while generating the video');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Generation</h1>
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
        <div className="video-container">
          {videoUrl ? (
            <video
              controls
              className="generated-video"
              style={{ maxWidth: '100%', maxHeight: '500px' }}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p>Generated video will appear here</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
