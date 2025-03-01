import { useState, FormEvent } from 'react';
import axios from 'axios';
import './App.css';

// Define types for form data
interface FormData {
  topic: string;
  numSlides: number;
  layout: 'Varied' | 'Text-Heavy' | 'Image-Focused';
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    numSlides: 5,
    layout: 'Varied',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:5001/generate', // Backend API URL
        formData,
        { responseType: 'blob' } // Ensure the response is treated as a file (PowerPoint)
      );

      // Create a temporary link to download the PowerPoint file
      const link = document.createElement('a');
      link.href = URL.createObjectURL(response.data);
      link.download = 'generated_presentation.pptx';
      link.click();
    } catch (err) {
      setError('Error generating presentation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="topic"
            placeholder="Enter Topic"
            value={formData.topic}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            type="number"
            name="numSlides"
            placeholder="Number of Slides"
            value={formData.numSlides}
            onChange={handleChange}
            min="1"
            max="20"
            required
          />
        </div>

        <div>
          <select
            name="layout"
            value={formData.layout}
            onChange={handleChange}
          >
            <option value="Varied">Varied</option>
            <option value="Text-Heavy">Text-Heavy</option>
            <option value="Image-Focused">Image-Focused</option>
          </select>
        </div>

        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Presentation'}
          </button>
        </div>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
