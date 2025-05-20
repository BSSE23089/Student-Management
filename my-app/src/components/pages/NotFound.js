import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, AlertCircle, ChevronLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        <div className="mb-6 relative">
          {/* 404 with gradient styling */}
          <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
            404
          </h1>
          
          {/* Alert icon positioned on top of the 404 */}
          <div className="absolute -top-5 -right-5 bg-gray-800 rounded-full p-2 border-4 border-gray-900">
            <AlertCircle size={40} className="text-red-400" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved. 
          Please check the URL or navigate back to the home page.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Go back button */}
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft size={20} className="mr-2" />
            Go Back
          </button>
          
          {/* Home button */}
          <button 
            onClick={() => navigate('/')}
            className="flex items-center justify-center px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Home size={20} className="mr-2" />
            Home Page
          </button>
        </div>
        
        {/* Custom visual indicator for the 404 error */}
        <div className="mt-12 flex justify-center">
          <div className="bg-gray-800 rounded-lg p-4 inline-flex items-center">
            <div className="flex space-x-2">
              {[...Array(4)].map((_, index) => (
                <div 
                  key={index} 
                  className={`w-3 h-3 rounded-full ${
                    index === 1 ? 'bg-red-500' : 'bg-gray-600'
                  } ${
                    index === 1 ? 'animate-pulse' : ''
                  }`}
                ></div>
              ))}
            </div>
            <span className="ml-3 text-gray-500 text-sm font-mono">
              error_page_not_found
            </span>
          </div>
        </div>
      </div>
      
      {/* Visual decoration: floating cubes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-24 left-16 opacity-10 transform -rotate-12">
          <div className="w-16 h-16 border-2 border-indigo-400 animate-pulse"></div>
        </div>
        <div className="absolute bottom-16 right-24 opacity-10 transform rotate-12">
          <div className="w-20 h-20 border-2 border-purple-400 animate-pulse"></div>
        </div>
        <div className="absolute top-1/2 left-1/4 opacity-10 transform -rotate-45">
          <div className="w-12 h-12 border-2 border-blue-400 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;