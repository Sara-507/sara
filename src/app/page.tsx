'use client';

import { useState } from 'react';

export default function Home() {
  const [storyInputs, setStoryInputs] = useState({
    who: '',
    where: '',
    what: ''
  });
  const [story, setStory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStoryInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateStory = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storyInputs),
      });

      if (!response.ok) {
        throw new Error('Failed to generate story');
      }

      const data = await response.json();
      setStory(data.story);
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error('Error generating story or image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-blue-100 to-purple-100">
      <main className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-600">Story Maker</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Who is in your story?</label>
              <input
                type="text"
                name="who"
                value={storyInputs.who}
                onChange={handleInputChange}
                placeholder="a friendly dragon"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Where does it happen?</label>
              <input
                type="text"
                name="where"
                value={storyInputs.where}
                onChange={handleInputChange}
                placeholder="a magical castle"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">What happens?</label>
              <input
                type="text"
                name="what"
                value={storyInputs.what}
                onChange={handleInputChange}
                placeholder="made new friends"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              onClick={generateStory}
              className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition-colors font-medium text-lg"
            >
              Create My Story!
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <p className="text-lg text-gray-700">Creating your story and illustration...</p>
          </div>
        ) : story && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">Your Story</h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">{story}</p>
            {imageUrl && (
              <div className="mt-4">
                <h3 className="text-xl font-bold text-purple-600 mb-3">Story Illustration</h3>
                <img
                  src={imageUrl}
                  alt="Story illustration"
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
