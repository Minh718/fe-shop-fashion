import React, { useState, useRef, useEffect } from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import { Link, useNavigate } from 'react-router-dom';
import { searchProducts } from '../../../api/productSerivce';
const dummyData = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds",
    price: 79.99,
    percent: 20,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZWFyYnVkc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    createdDate: "2023-05-01T10:30:00Z"
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 299.99,
    percent: 15,
    image: "https://images.unsplash.com/photo-1544117519-31a4b719d2d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    createdDate: "2023-04-28T14:45:00Z"
  },
  {
    id: 3,
    name: "4K Ultra HD Smart TV",
    price: 799.99,
    percent: 10,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c21hcnQlMjB0dnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    createdDate: "2023-05-02T09:15:00Z"
  }
];
function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [size, setSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);  // Create a ref for the input element
  // let recognition;
  const navigate = useNavigate();
  // Audio files for start and stop sounds
  // const startSound = new Audio('/sounds/start.mp3'); // Replace with your sound file path
  // const stopSound = new Audio('/sounds/stop.mp3'); // Replace with your sound file path

  // Check if the browser supports SpeechRecognition
  // if ('webkitSpeechRecognition' in window) {
  //   recognition = new window.webkitSpeechRecognition();
  //   recognition.continuous = false; // Stops after a single input
  //   recognition.interimResults = false; // Only final results
  //   recognition.lang = 'vi-VN'; // Set language to Vietnamese
  // }

  // Function to handle the microphone button click
  // const handleMicClick = () => {
  //   // Focus the search input when mic is clicked
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  //   }

  //   if (recognition) {
  //     if (!isListening) {
  //       // startSound.play(); // Play start sound
  //       recognition.start();
  //       setIsListening(true);

  //       recognition.onresult = (event) => {
  //         const transcript = event.results[0][0].transcript;
  //         setSearchQuery(transcript);
  //       };

  //       recognition.onend = () => {
  //         // stopSound.play(); // Play stop sound
  //         setIsListening(false);
  //       };
  //     } else {
  //       recognition.stop();
  //       // stopSound.play(); // Play stop sound
  //       setIsListening(false);
  //     }
  //   } else {
  //     alert('Speech Recognition is not supported in this browser.');
  //   }
  // };
  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery.trim() === '') {
        setSearchResults([]);
        return;
      }
      console.log(searchQuery)
      setLoading(true);
      try {
        const data = await searchProducts({ query: searchQuery });
        console.log(data)
        setSearchResults(data.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Debouncing: Delay the fetch until the user has stopped typing for 300ms
    const handler = setTimeout(() => {
      fetchData();
    }, 300);

    // Cleanup function to cancel the previous timeout
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const handleItemClick = (item) => {
    setSearchQuery("");
    navigate(`/product/${item.id}`);
  };
  return (
    <Paper
      component="form"

      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '80%',
        maxWidth: '500px',
        borderRadius: '30px',
        position: 'relative',
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Tìm kiếm sản phẩm, danh mục, thương hiệu..."
        inputProps={{ 'aria-label': 'search' }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        inputRef={inputRef}  // Assign the ref to the input element
      />
      <IconButton
        type="button"
        sx={{ p: '10px' }}
        aria-label="mic"
      // onClick={handleMicClick}
      >
        <MicIcon color={isListening ? 'primary' : 'inherit'} />
      </IconButton>
      {error && (
        <p className="text-red-500 mt-2" role="alert">
          {error}
        </p>
      )}
      {searchQuery && (
        <div className="absolute w-full mt-2 top-full max-h-[80vh] overflow-y-scroll bg-white rounded-lg shadow-lg overflow-hidden z-40">
          {searchResults.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {searchResults.map((item) => (
                <li
                  key={item.id}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition duration-150 ease-in-out"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <div className="flex items-center space-x-2">
                        <p className="text-lg font-bold text-gray-900">
                          ${(item.price * (1 - item.percent / 100)).toFixed(2)}
                        </p>
                        {item.percent > 0 && (
                          <p className="text-sm text-gray-500 line-through">
                            ${item.price.toFixed(2)}
                          </p>
                        )}
                        {item.percent > 0 && (
                          <span className="text-sm font-semibold text-green-600">
                            {item.percent}% off
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        Created on {new Date(item.createdDate).toDateString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4 text-gray-500">No results found</p>
          )}
          {searchResults.length > size && ( // Show "View more" button if there are more results
            <Link to={"products/search?query=" + searchQuery}>
              <p onClick={() => setSearchQuery("")} className="block p-4 text-center text-blue-500 font-semibold">
                View more
              </p>
            </Link>
          )}
        </div>
      )}
    </Paper>

  );
}

export default SearchBar;
