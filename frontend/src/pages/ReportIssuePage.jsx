

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaCamera, FaFileUpload, FaCalendarAlt } from 'react-icons/fa';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// export default function ReportIssuePage() {
//   const [title, setTitle] = useState('');
//   const [category, setCategory] = useState('Road');
//   const [description, setDescription] = useState('');
//   const [file, setFile] = useState(null);
//   const [address, setAddress] = useState('');
//   const [latlng, setLatlng] = useState({ lat: '', lng: '' });
//   const [loadingLocation, setLoadingLocation] = useState(false);
//   const [locationError, setLocationError] = useState('');
//   const navigate = useNavigate();
//   const [dateTime, setDateTime] = useState(null);
//   const [isCameraOpen, setIsCameraOpen] = useState(false);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   const fetchAddressFromCoords = useCallback(async (lat, lng) => {
//     try {
//       const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
//       const data = await response.json();
//       setAddress(data?.display_name || 'Address not found');
//     } catch (error) {
//       console.error('Error fetching address:', error);
//       setAddress('Could not fetch address');
//     }
//   }, []);

//   const handleGetLocation = useCallback(() => {
//     if (!navigator.geolocation) {
//       setLocationError('Geolocation is not supported by your browser.');
//       return;
//     }
//     setLoadingLocation(true);
//     setLocationError('');
//     const options = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 };
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         setLatlng({ lat: latitude, lng: longitude });
//         await fetchAddressFromCoords(latitude, longitude);
//         setLoadingLocation(false);
//       },
//       (error) => {
//         let message = 'Unable to retrieve location. ';
//         if (error.code === error.PERMISSION_DENIED) message += 'Please grant permission.';
//         else if (error.code === error.POSITION_UNAVAILABLE) message += 'Location info unavailable.';
//         else if (error.code === error.TIMEOUT) message += 'Request timed out.';
//         setLocationError(message);
//         setLoadingLocation(false);
//       },
//       options
//     );
//   }, [fetchAddressFromCoords]);

//   useEffect(() => {
//     handleGetLocation();
//     setDateTime(new Date()); // Auto-capture current date and time on load
//   }, [handleGetLocation]);

//   const openCamera = async () => {
//     setCapturedImage(null);
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
//         setIsCameraOpen(true);
//         setTimeout(() => {
//           if (videoRef.current) videoRef.current.srcObject = stream;
//         }, 100);
//       } catch (err) {
//         alert("Could not access camera. Please ensure permission is granted.");
//       }
//     } else {
//       alert('Camera access not supported by this browser.');
//     }
//   };

//   const captureImage = () => {
//     if (videoRef.current) {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
//       setCapturedImage(canvas.toDataURL('image/jpeg'));
//       closeCameraStream();
//     }
//   };

//   const useCapturedImage = () => {
//     canvasRef.current.toBlob(blob => {
//       setFile(new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' }));
//       setIsCameraOpen(false);
//     }, 'image/jpeg');
//   };

//   const retakeImage = () => openCamera();

//   const closeCameraStream = () => {
//     if (videoRef.current?.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//       videoRef.current.srcObject = null;
//     }
//   };

//   const handleCloseModal = () => {
//     closeCameraStream();
//     setIsCameraOpen(false);
//   };

//   const handleFileSelect = (e) => {
//     if (e.target.files?.[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       alert('Please upload or capture an image of the issue.');
//       return;
//     }
//     try {
//       const stored = JSON.parse(localStorage.getItem('civicUser') || 'null');
//       if (!stored) return alert('You must login first');

//       const formData = new FormData();
//       formData.append('title', title);
//       formData.append('category', category);
//       formData.append('description', description);
//       formData.append('address', address);
//       formData.append('lat', latlng.lat);
//       formData.append('lng', latlng.lng);
//       formData.append('image', file);
//       formData.append('dateTime', dateTime.toISOString());

//       const headers = { Authorization: `Bearer ${stored.token}`, 'Content-Type': 'multipart/form-data' };
//       await axios.post(`${API}/issues`, formData, { headers });

//       alert('Issue reported successfully!');
//       // Reset form
//       setTitle(''); setCategory('Road'); setDescription(''); setFile(null); setAddress(''); setLatlng({ lat: '', lng: '' }); setDateTime(new Date()); handleGetLocation();
//     } catch (err) {
//       console.error(err);
//       alert(err?.response?.data?.message || 'Failed to report issue');
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold text-gray-800 mb-4">Report an Issue</h2>
//       <form onSubmit={onSubmit} className="space-y-4">
//         <input className="w-full border p-2 rounded-md" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
//         <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border p-2 rounded-md">
//           <option>Road</option> <option>Sanitation</option> <option>Electricity</option> <option>Water</option> <option>Other</option>
//         </select>
//         <textarea className="w-full border p-2 rounded-md" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Location</label>
//           <input className="w-full border p-2 mt-1 rounded-md" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} required />
//           <div className="flex items-center gap-2 mt-2">
//             <button type="button" onClick={handleGetLocation} className="px-3 py-2 bg-gray-200 rounded-md text-sm font-semibold" disabled={loadingLocation}>
//               {loadingLocation ? 'Detecting...' : 'Detect My Location'}
//             </button>
//             <div className="text-sm text-gray-600 self-center">
//               {latlng.lat ? `${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}` : 'No coordinates'}
//             </div>
//           </div>
//           {locationError && <p className="text-xs text-red-600 mt-1">{locationError}</p>}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Date & Time</label>
//           <div className="flex items-center gap-2 mt-2 p-2 bg-gray-100 rounded-md">
//             <FaCalendarAlt className="text-gray-600" />
//             <span className="text-sm text-gray-800">{dateTime ? dateTime.toLocaleString() : 'Detecting...'}</span>
//           </div>
//           <p className="text-xs text-gray-500 mt-1">Detected automatically.</p>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Add Image <span className="text-red-500">*</span></label>
//           <div className="flex items-center gap-4">
//             <label htmlFor="file-upload" className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2 border rounded-md text-sm font-medium">
//               <FaFileUpload /> <span>Choose File</span>
//             </label>
//             <input id="file-upload" type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
//             <button type="button" onClick={openCamera} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
//               <FaCamera /> <span>Use Camera</span>
//             </button>
//           </div>
//           {file && (
//             <div className="mt-4">
//               <p className="text-sm font-medium text-gray-700">Image Preview:</p>
//               <img src={URL.createObjectURL(file)} alt="Preview" className="mt-2 rounded-lg w-full h-auto" />
//             </div>
//           )}
//         </div>
//         <button type="submit" className="w-full bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700">Submit Issue</button>
//       </form>
//       <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
//       {isCameraOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
//           <div className="bg-white p-4 rounded-lg max-w-lg w-full">
//             {capturedImage ? (
//               <div>
//                 <img src={capturedImage} alt="Captured" className="rounded-lg" />
//                 <div className="flex gap-4 mt-4">
//                   <button onClick={retakeImage} className="w-full py-2 px-4 rounded-md border">Retake</button>
//                   <button onClick={useCapturedImage} className="w-full py-2 px-4 rounded-md text-white bg-blue-600">Use Image</button>
//                 </div>
//               </div>
//             ) : (
//               <div>
//                 <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg"></video>
//                 <button onClick={captureImage} className="w-full mt-4 py-2 px-4 rounded-md text-white bg-green-600">Capture</button>
//               </div>
//             )}
//             <button onClick={handleCloseModal} className="w-full mt-2 text-sm text-gray-600">Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
















import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCamera, FaFileUpload, FaCalendarAlt } from 'react-icons/fa';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function ReportIssuePage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Road');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [address, setAddress] = useState('');
  const [latlng, setLatlng] = useState({ lat: '', lng: ''}); // Corrected state name
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  const navigate = useNavigate(); // Corrected hook name
  const [dateTime, setDateTime] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false); // Corrected state name
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const fetchAddressFromCoords = useCallback(async (lat, lng) => { // Corrected func name
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`); // Fixed template literal
      const data = await response.json();
      setAddress(data?.display_name || 'Address not found');
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Could not fetch address');
    }
  }, []);

  const handleGetLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }
    setLoadingLocation(true);
    setLocationError('');
    const options = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 };
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLatlng({ lat: latitude, lng: longitude }); // Corrected state name
        await fetchAddressFromCoords(latitude, longitude); // Corrected func name
        setLoadingLocation(false);
      },
      (error) => {
        let message = 'Unable to retrieve location. '; // Corrected string
        if (error.code === error.PERMISSION_DENIED) message += 'Please grant permission.';
        else if (error.code === error.POSITION_UNAVAILABLE) message += 'Location info unavailable.';
        else if (error.code === error.TIMEOUT) message += 'Request timed out.'; // Corrected string
        setLocationError(message);
        setLoadingLocation(false);
      }, // Added comma
      options
    ); // Added closing parenthesis
  }, [fetchAddressFromCoords]); // Corrected func name

  useEffect(() => {
    handleGetLocation();
    setDateTime(new Date());
  }, [handleGetLocation]);

  const openCamera = async () => {
    setCapturedImage(null);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setIsCameraOpen(true);
        setTimeout(() => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        }, 100);
      } catch (err) {
        alert("Could not access camera. Please ensure permission is granted.");
      }
    } else {
      alert('Camera access not supported by this browser.');
    }
  }; // Added closing brace

  const captureImage = () => { // Corrected func name
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current; // Corrected ref name
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      setCapturedImage(canvas.toDataURL('image/jpeg'));
      closeCameraStream();
    }
  }; // Added closing brace

  const useCapturedImage = () => {
    canvasRef.current.toBlob(blob => { // Corrected ref name
      setFile(new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' }));
      setIsCameraOpen(false);
    }, 'image/jpeg');
  }; // Added closing brace

  const retakeImage = () => openCamera(); // Corrected func name

  const closeCameraStream = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null; // Corrected assignment
    }
  }; // Added closing brace

  const handleCloseModal = () => {
    closeCameraStream();
    setIsCameraOpen(false); // Corrected state name
  }; // Added closing brace

  const handleFileSelect = (e) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  }; // Added closing brace

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please upload or capture an image of the issue.');
      return;
    }
    try {
      const stored = JSON.parse(localStorage.getItem('civicUser') || 'null');
      if (!stored) return alert('You must login first');
      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('address', address);
      formData.append('lat', latlng.lat); // Corrected state name
      formData.append('lng', latlng.lng); // Corrected state name
      formData.append('image', file);
      formData.append('dateTime', dateTime.toISOString()); // Corrected method name
      const headers = { Authorization: `Bearer ${stored.token}`, 'Content-Type': 'multipart/form-data' }; // Fixed template literal
      await axios.post(`${API}/issues`, formData, { headers }); // Fixed template literal
      alert('Issue reported successfully!');
      // Reset form
      setTitle(''); setCategory('Road'); setDescription(''); setFile(null); setAddress(''); setLatlng({ lat: '', lng: ''}); setDateTime(new Date()); handleGetLocation(); // Corrected state name
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Failed to report issue');
    }
  }; // Added closing brace

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Report an Issue</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <input className="w-full border p-2 rounded-md" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border p-2 rounded-md">
          <option>Road</option> <option>Sanitation</option> <option>Electricity</option> <option>Water</option> <option>Other</option>
        </select>
        <textarea className="w-full border p-2 rounded-md" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input className="w-full border p-2 mt-1 rounded-md" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} required />
          <div className="flex items-center gap-2 mt-2">
            <button type="button" onClick={handleGetLocation} className="px-3 py-2 bg-gray-200 rounded-md text-sm font-semibold" disabled={loadingLocation}>
              {loadingLocation ? 'Detecting...' : 'Detect My Location'}
            </button>
            <div className="text-sm text-gray-600 self-center">
              {latlng.lat ? `${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}` : 'No coordinates'} {/* Corrected state name */}
            </div>
          </div>
          {locationError && <p className="text-xs text-red-600 mt-1">{locationError}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date & Time</label>
          <div className="flex items-center gap-2 mt-2 p-2 bg-gray-100 rounded-md">
            <FaCalendarAlt className="text-gray-600" />
            <span className="text-sm text-gray-800">{dateTime ? dateTime.toLocaleString() : 'Detecting...'}</span> {/* Corrected var name */}
          </div>
          <p className="text-xs text-gray-500 mt-1">Detected automatically.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Add Image <span className="text-red-500">*</span></label>
          <div className="flex items-center gap-4">
            <label htmlFor="file-upload" className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2 border rounded-md text-sm font-medium">
              <FaFileUpload /> <span>Choose File</span>
            </label>
            <input id="file-upload" type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
            <button type="button" onClick={openCamera} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"> {/* Removed extra brace */}
              <FaCamera /> <span>Use Camera</span>
            </button>
          </div>
          {file && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700">Image Preview:</p>
              <img src={URL.createObjectURL(file)} alt="Preview" className="mt-2 rounded-lg w-full h-auto" />
            </div>
          )}
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700">Submit Issue</button>
      </form>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      {isCameraOpen && ( // Corrected state name
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 rounded-lg max-w-lg w-full">
            {capturedImage ? ( // Corrected state name
              <div>
                <img src={capturedImage} alt="Captured" className="rounded-lg" />
                <div className="flex gap-4 mt-4">
                  <button onClick={retakeImage} className="w-full py-2 px-4 rounded-md border">Retake</button> {/* Corrected func name */}
                  <button onClick={useCapturedImage} className="w-full py-2 px-4 rounded-md text-white bg-blue-600">Use Image</button>
                </div>
              </div>
            ) : ( // Added colon
              <div>
                <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg"></video>
                <button onClick={captureImage} className="w-full mt-4 py-2 px-4 rounded-md text-white bg-green-600">Capture</button> {/* Corrected func name */}
              </div>
            )}
            <button onClick={handleCloseModal} className="w-full mt-2 text-sm text-gray-600">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
} // Removed extra brace