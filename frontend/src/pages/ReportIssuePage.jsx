// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

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

//   // This function fetches a readable address from coordinates
//   const fetchAddressFromCoords = async (lat, lng) => {
//     try {
//       const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
//       const data = await response.json();
//       if (data && data.display_name) {
//         setAddress(data.display_name);
//       } else {
//         setAddress('Address not found');
//       }
//     } catch (error) {
//       console.error('Error fetching address:', error);
//       setAddress('Could not fetch address');
//     }
//   };

// // src/pages/ReportIssuePage.jsx

// // ... inside the ReportIssuePage component ...

// const handleGetLocation = () => {
//   if (!navigator.geolocation) {
//     setLocationError('Geolocation is not supported by your browser.');
//     return;
//   }

//   setLoadingLocation(true);
//   setLocationError('');

//   // Options to request a more accurate position
//   const options = {
//     enableHighAccuracy: true, // This is the key change
//     timeout: 10000,           // Wait 10 seconds before timing out
//     maximumAge: 0,            // Don't use a cached position
//   };

//   navigator.geolocation.getCurrentPosition(
//     async (position) => {
//       const { latitude, longitude } = position.coords;
//       setLatlng({ lat: latitude, lng: longitude });
//       await fetchAddressFromCoords(latitude, longitude);
//       setLoadingLocation(false);
//     },
//     (error) => {
//       // Provide a more descriptive error message
//       let message = 'Unable to retrieve your location. ';
//       if (error.code === error.PERMISSION_DENIED) {
//         message += 'Please grant permission to access your location.';
//       } else if (error.code === error.POSITION_UNAVAILABLE) {
//         message += 'Location information is unavailable.';
//       } else if (error.code === error.TIMEOUT) {
//         message += 'The request to get user location timed out.';
//       }
//       setLocationError(message);
//       setLoadingLocation(false);
//     },
//     options // Pass the new options object here
//   );
// };
  
//   // Use useEffect to automatically run location detection on page load
//   useEffect(() => {
//     handleGetLocation();
//   }, []); // Empty dependency array means this runs once on mount

//   const handleLogout = () => {
//     localStorage.removeItem('civicUser');
//     navigate('/login');
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     // ... (rest of the submit logic is the same as before) ...
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
//       if (file) formData.append('image', file);
      
//       const headers = { Authorization: `Bearer ${stored.token}`, 'Content-Type': 'multipart/form-data' };
//       await axios.post(`${API}/issues`, formData, { headers });
//       alert('Issue reported successfully!');
//       setTitle(''); setCategory('Road'); setDescription(''); setFile(null);
//     } catch (err) {
//       console.error(err);
//       alert(err?.response?.data?.message || 'Failed to report issue');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Report an Issue</h2>
//         {/* <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">
//           Logout
//         </button> */}
//       </div>

//       <form onSubmit={onSubmit} className="space-y-4">
//         {/* ... Title, Category, Description inputs are the same ... */}
//         <input className="w-full border p-2 rounded" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
//         <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border p-2 rounded">
//           <option>Road</option>
//           <option>Sanitation</option>
//           <option>Electricity</option>
//           <option>Water</option>
//           <option>Other</option>
//         </select>
//         <textarea className="w-full border p-2 rounded" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />

//         {/* --- NEW LOCATION SECTION --- */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Location</label>
//           <input className="w-full border p-2 mt-1 rounded" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} required />
//           <div className="flex items-center gap-2 mt-2">
//             <button type="button" onClick={handleGetLocation} className="px-3 py-2 bg-gray-200 rounded text-sm hover:bg-gray-300" disabled={loadingLocation}>
//               {loadingLocation ? 'Detecting...' : 'Detect My Location'}
//             </button>
//             <div className="text-sm text-gray-600 self-center">
//               {latlng.lat ? `${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}` : 'No coordinates'}
//             </div>
//           </div>
//           {locationError && <p className="text-xs text-red-600 mt-1">{locationError}</p>}
//         </div>
//         {/* --- END NEW LOCATION SECTION --- */}

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image (Optional)</label>
//           <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
//         </div>
//         <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit Issue</button>
//       </form>
//     </div>
//   );
// }










// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

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

//   const fetchAddressFromCoords = useCallback(async (lat, lng) => {
//     try {
//       const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
//       const data = await response.json();
//       if (data && data.display_name) {
//         setAddress(data.display_name);
//       } else {
//         setAddress('Address not found');
//       }
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

//     const options = {
//       enableHighAccuracy: true,
//       timeout: 10000,
//       maximumAge: 0,
//     };

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         setLatlng({ lat: latitude, lng: longitude });
//         await fetchAddressFromCoords(latitude, longitude);
//         setLoadingLocation(false);
//       },
//       (error) => {
//         let message = 'Unable to retrieve your location. ';
//         if (error.code === error.PERMISSION_DENIED) {
//           message += 'Please grant permission to access your location.';
//         } else if (error.code === error.POSITION_UNAVAILABLE) {
//           message += 'Location information is unavailable.';
//         } else if (error.code === error.TIMEOUT) {
//           message += 'The request to get user location timed out.';
//         }
//         setLocationError(message);
//         setLoadingLocation(false);
//       },
//       options
//     );
//   }, [fetchAddressFromCoords]);

//   useEffect(() => {
//     handleGetLocation();
//   }, [handleGetLocation]);

//   const onSubmit = async (e) => {
//     e.preventDefault();
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
//       if (file) formData.append('image', file);
      
//       const headers = { Authorization: `Bearer ${stored.token}`, 'Content-Type': 'multipart/form-data' };
//       await axios.post(`${API}/issues`, formData, { headers });
      
//       alert('Issue reported successfully!');
//       // Reset form fields
//       setTitle('');
//       setCategory('Road');
//       setDescription('');
//       setFile(null);
//       setAddress('');
//       setLatlng({ lat: '', lng: '' });
//     } catch (err) {
//       console.error(err);
//       alert(err?.response?.data?.message || 'Failed to report issue');
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
//       <div className="mb-4">
//         <h2 className="text-xl font-semibold text-gray-800">Report an Issue</h2>
//       </div>

//       <form onSubmit={onSubmit} className="space-y-4">
//         <input className="w-full border p-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        
//         <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border p-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
//           <option>Road</option>
//           <option>Sanitation</option>
//           <option>Electricity</option>
//           <option>Water</option>
//           <option>Other</option>
//         </select>
        
//         <textarea className="w-full border p-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Location</label>
//           <input className="w-full border p-2 mt-1 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} required />
//           <div className="flex items-center gap-2 mt-2">
//             <button type="button" onClick={handleGetLocation} className="px-3 py-2 bg-gray-200 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-300 disabled:opacity-50" disabled={loadingLocation}>
//               {loadingLocation ? 'Detecting...' : 'Detect My Location'}
//             </button>
//             <div className="text-sm text-gray-600 self-center">
//               {latlng.lat ? `${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}` : 'No coordinates'}
//             </div>
//           </div>
//           {locationError && <p className="text-xs text-red-600 mt-1">{locationError}</p>}
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image (Optional)</label>
//           <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
//         </div>
        
//         <button className="w-full bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//           Submit Issue
//         </button>
//       </form>
//     </div>
//   );
// } 










// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaCamera, FaFileUpload } from 'react-icons/fa';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// export default function ReportIssuePage() {
//   // --- Existing State ---
//   const [title, setTitle] = useState('');
//   const [category, setCategory] = useState('Road');
//   const [description, setDescription] = useState('');
//   const [file, setFile] = useState(null); // This will now hold the File object from upload OR camera
//   const [address, setAddress] = useState('');
//   const [latlng, setLatlng] = useState({ lat: '', lng: '' });
//   const [loadingLocation, setLoadingLocation] = useState(false);
//   const [locationError, setLocationError] = useState('');
//   const navigate = useNavigate();

//   // --- New State and Refs for Camera ---
//   const [isCameraOpen, setIsCameraOpen] = useState(false);
//   const [capturedImage, setCapturedImage] = useState(null); // Holds the data URL for preview
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   // --- Existing Functions (Location, etc.) ---
//   const fetchAddressFromCoords = useCallback(async (lat, lng) => { /* ... no changes ... */ });
//   const handleGetLocation = useCallback(() => { /* ... no changes ... */ });
//   useEffect(() => { handleGetLocation(); }, [handleGetLocation]);

//   // --- New Camera Functions ---
//   const openCamera = async () => {
//     setCapturedImage(null); // Reset any previously captured image
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         setIsCameraOpen(true);
//         // We need to wait for the modal to render the video element
//         setTimeout(() => {
//           if (videoRef.current) {
//             videoRef.current.srcObject = stream;
//           }
//         }, 100);
//       } catch (err) {
//         console.error("Error accessing camera: ", err);
//         alert("Could not access the camera. Please ensure you have granted permission.");
//       }
//     } else {
//       alert('Your browser does not support camera access.');
//     }
//   };

//   const captureImage = () => {
//     if (videoRef.current) {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       const context = canvas.getContext('2d');
//       context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
//       const imageDataUrl = canvas.toDataURL('image/jpeg');
//       setCapturedImage(imageDataUrl);
//       closeCameraStream();
//     }
//   };
  
//   const useCapturedImage = () => {
//     canvasRef.current.toBlob(blob => {
//       const imageFile = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
//       setFile(imageFile); // Set the captured image as the file to be uploaded
//       setIsCameraOpen(false); // Close the modal
//     }, 'image/jpeg');
//   };

//   const retakeImage = () => {
//     openCamera();
//   };

//   const closeCameraStream = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//       videoRef.current.srcObject = null;
//     }
//   };

//   const handleCloseModal = () => {
//     closeCameraStream();
//     setIsCameraOpen(false);
//   };
  
//   const handleFileSelect = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     // ... This function's logic remains exactly the same
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
//       if (file) formData.append('image', file);
      
//       const headers = { Authorization: `Bearer ${stored.token}`, 'Content-Type': 'multipart/form-data' };
//       await axios.post(`${API}/issues`, formData, { headers });
      
//       alert('Issue reported successfully!');
//       // Reset form
//       setTitle(''); setCategory('Road'); setDescription(''); setFile(null); setAddress(''); setLatlng({ lat: '', lng: '' });
//     } catch (err) {
//       console.error(err);
//       alert(err?.response?.data?.message || 'Failed to report issue');
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold text-gray-800 mb-4">Report an Issue</h2>
//       <form onSubmit={onSubmit} className="space-y-4">
//         {/* ... Title, Category, Description, and Location inputs ... */}
        
//         {/* --- UPDATED: Image Upload Section --- */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Add Image (Optional)</label>
//           <div className="flex items-center gap-4">
//             <label htmlFor="file-upload" className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
//               <FaFileUpload />
//               <span>Choose File</span>
//             </label>
//             <input id="file-upload" type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

//             <button type="button" onClick={openCamera} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
//               <FaCamera />
//               <span>Use Camera</span>
//             </button>
//           </div>
//           {/* --- Image Preview --- */}
//           {file && (
//             <div className="mt-4">
//               <p className="text-sm font-medium text-gray-700">Image Preview:</p>
//               <img src={URL.createObjectURL(file)} alt="Preview" className="mt-2 rounded-lg w-full h-auto" />
//             </div>
//           )}
//         </div>
        
//         <button type="submit" className="w-full bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700">
//           Submit Issue
//         </button>
//       </form>

//       {/* --- Hidden Canvas for Capturing --- */}
//       <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

//       {/* --- Camera Modal --- */}
//       {isCameraOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//           <div className="bg-white p-4 rounded-lg max-w-lg w-full">
//             {capturedImage ? (
//               <div>
//                 <img src={capturedImage} alt="Captured" className="rounded-lg" />
//                 <div className="flex gap-4 mt-4">
//                   <button onClick={retakeImage} className="w-full py-2 px-4 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50">Retake</button>
//                   <button onClick={useCapturedImage} className="w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700">Use this Image</button>
//                 </div>
//               </div>
//             ) : (
//               <div>
//                 <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg"></video>
//                 <button onClick={captureImage} className="w-full mt-4 py-2 px-4 rounded-md text-white bg-green-600 hover:bg-green-700">Capture</button>
//               </div>
//             )}
//             <button onClick={handleCloseModal} className="w-full mt-2 text-sm text-gray-600 hover:text-gray-900">Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }











// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaCamera, FaFileUpload } from 'react-icons/fa';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// export default function ReportIssuePage() {
//   // --- All Original State Variables ---
//   const [title, setTitle] = useState('');
//   const [category, setCategory] = useState('Road');
//   const [description, setDescription] = useState('');
//   const [file, setFile] = useState(null);
//   const [address, setAddress] = useState('');
//   const [latlng, setLatlng] = useState({ lat: '', lng: '' });
//   const [loadingLocation, setLoadingLocation] = useState(false);
//   const [locationError, setLocationError] = useState('');
//   const navigate = useNavigate();

//   // --- New State and Refs for Camera ---
//   const [isCameraOpen, setIsCameraOpen] = useState(false);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   // --- Original Functions (Location Detection) ---
//   const fetchAddressFromCoords = useCallback(async (lat, lng) => {
//     try {
//       const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
//       const data = await response.json();
//       if (data && data.display_name) {
//         setAddress(data.display_name);
//       } else {
//         setAddress('Address not found');
//       }
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
//         let message = 'Unable to retrieve your location. Please grant permission.';
//         setLocationError(message);
//         setLoadingLocation(false);
//       },
//       options
//     );
//   }, [fetchAddressFromCoords]);

//   useEffect(() => {
//     handleGetLocation();
//   }, [handleGetLocation]);

//   // --- New Camera Functions ---
//   const openCamera = async () => {
//     setCapturedImage(null);
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
//         setIsCameraOpen(true);
//         setTimeout(() => {
//           if (videoRef.current) {
//             videoRef.current.srcObject = stream;
//           }
//         }, 100);
//       } catch (err) {
//         alert("Could not access the camera. Please ensure you have granted permission.");
//       }
//     } else {
//       alert('Your browser does not support camera access.');
//     }
//   };

//   const captureImage = () => {
//     if (videoRef.current) {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
//       const imageDataUrl = canvas.toDataURL('image/jpeg');
//       setCapturedImage(imageDataUrl);
//       closeCameraStream();
//     }
//   };

//   const useCapturedImage = () => {
//     canvasRef.current.toBlob(blob => {
//       const imageFile = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
//       setFile(imageFile);
//       setIsCameraOpen(false);
//     }, 'image/jpeg');
//   };

//   const retakeImage = () => openCamera();

//   const closeCameraStream = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//       videoRef.current.srcObject = null;
//     }
//   };

//   const handleCloseModal = () => {
//     closeCameraStream();
//     setIsCameraOpen(false);
//   };
  
//   const handleFileSelect = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   // --- Original onSubmit Function ---
//   const onSubmit = async (e) => {
//     e.preventDefault();
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
//       if (file) formData.append('image', file);
      
//       const headers = { Authorization: `Bearer ${stored.token}`, 'Content-Type': 'multipart/form-data' };
//       await axios.post(`${API}/issues`, formData, { headers });
      
//       alert('Issue reported successfully!');
//       // Reset form fields
//       setTitle(''); setCategory('Road'); setDescription(''); setFile(null); setAddress(''); setLatlng({ lat: '', lng: '' });
//     } catch (err) {
//       console.error(err);
//       alert(err?.response?.data?.message || 'Failed to report issue');
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold text-gray-800 mb-4">Report an Issue</h2>
      
//       <form onSubmit={onSubmit} className="space-y-4">
//         {/* --- All Original Form Fields are Restored --- */}
//         <input className="w-full border p-2 rounded-md" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        
//         <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border p-2 rounded-md">
//           <option>Road</option>
//           <option>Sanitation</option>
//           <option>Electricity</option>
//           <option>Water</option>
//           <option>Other</option>
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

//         {/* --- Integrated Image Upload Section with Camera Option --- */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Add Image (Optional)</label>
//           <div className="flex items-center gap-4">
//             <label htmlFor="file-upload" className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2 border rounded-md text-sm font-medium">
//               <FaFileUpload />
//               <span>Choose File</span>
//             </label>
//             <input id="file-upload" type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
//             <button type="button" onClick={openCamera} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
//               <FaCamera />
//               <span>Use Camera</span>
//             </button>
//           </div>
//           {file && (
//             <div className="mt-4">
//               <p className="text-sm font-medium text-gray-700">Image Preview:</p>
//               <img src={URL.createObjectURL(file)} alt="Preview" className="mt-2 rounded-lg w-full h-auto" />
//             </div>
//           )}
//         </div>
        
//         <button type="submit" className="w-full bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700">
//           Submit Issue
//         </button>
//       </form>

//       {/* --- Hidden Canvas and Camera Modal Logic (No changes) --- */}
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













// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaCamera, FaFileUpload } from 'react-icons/fa';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// export default function ReportIssuePage() {
//   // --- All State Variables (no changes) ---
//   const [title, setTitle] = useState('');
//   const [category, setCategory] = useState('Road');
//   const [description, setDescription] = useState('');
//   const [file, setFile] = useState(null);
//   const [address, setAddress] = useState('');
//   const [latlng, setLatlng] = useState({ lat: '', lng: '' });
//   const [loadingLocation, setLoadingLocation] = useState(false);
//   const [locationError, setLocationError] = useState('');
//   const navigate = useNavigate();
//   const [isCameraOpen, setIsCameraOpen] = useState(false);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   // --- All Functions (no changes) ---
//   const fetchAddressFromCoords = useCallback(async (lat, lng) => {
//     try {
//       const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
//       const data = await response.json();
//       if (data && data.display_name) {
//         setAddress(data.display_name);
//       } else {
//         setAddress('Address not found');
//       }
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
//         let message = 'Unable to retrieve your location. Please grant permission.';
//         setLocationError(message);
//         setLoadingLocation(false);
//       },
//       options
//     );
//   }, [fetchAddressFromCoords]);

//   useEffect(() => {
//     handleGetLocation();
//   }, [handleGetLocation]);

//   const openCamera = async () => {
//     setCapturedImage(null);
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
//         setIsCameraOpen(true);
//         setTimeout(() => {
//           if (videoRef.current) {
//             videoRef.current.srcObject = stream;
//           }
//         }, 100);
//       } catch (err) {
//         alert("Could not access the camera. Please ensure you have granted permission.");
//       }
//     } else {
//       alert('Your browser does not support camera access.');
//     }
//   };

//   const captureImage = () => {
//     if (videoRef.current) {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
//       const imageDataUrl = canvas.toDataURL('image/jpeg');
//       setCapturedImage(imageDataUrl);
//       closeCameraStream();
//     }
//   };

//   const useCapturedImage = () => {
//     canvasRef.current.toBlob(blob => {
//       const imageFile = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
//       setFile(imageFile);
//       setIsCameraOpen(false);
//     }, 'image/jpeg');
//   };

//   const retakeImage = () => openCamera();

//   const closeCameraStream = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//       videoRef.current.srcObject = null;
//     }
//   };

//   const handleCloseModal = () => {
//     closeCameraStream();
//     setIsCameraOpen(false);
//   };
  
//   const handleFileSelect = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   // --- UPDATED onSubmit Function ---
//   const onSubmit = async (e) => {
//     e.preventDefault();

//     // *** NEW: Add validation check for the image file ***
//     if (!file) {
//       alert('Please upload or capture an image of the issue.');
//       return; // Stop the submission if no file is present
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
//       formData.append('image', file); // 'if (file)' check is no longer needed
      
//       const headers = { Authorization: `Bearer ${stored.token}`, 'Content-Type': 'multipart/form-data' };
//       await axios.post(`${API}/issues`, formData, { headers });
      
//       alert('Issue reported successfully!');
//       // Reset form fields
//       setTitle(''); setCategory('Road'); setDescription(''); setFile(null); setAddress(''); setLatlng({ lat: '', lng: '' });
//     } catch (err) {
//       console.error(err);
//       alert(err?.response?.data?.message || 'Failed to report issue');
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold text-gray-800 mb-4">Report an Issue</h2>
      
//       <form onSubmit={onSubmit} className="space-y-4">
//         {/* --- Title, Category, Description, Location fields (no changes) --- */}
//         <input className="w-full border p-2 rounded-md" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
//         <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border p-2 rounded-md">
//           <option>Road</option>
//           <option>Sanitation</option>
//           <option>Electricity</option>
//           <option>Water</option>
//           <option>Other</option>
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

//         {/* --- UPDATED: Image Upload Section --- */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Add Image <span className="text-red-500">*</span>
//           </label>
//           <div className="flex items-center gap-4">
//             <label htmlFor="file-upload" className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2 border rounded-md text-sm font-medium">
//               <FaFileUpload />
//               <span>Choose File</span>
//             </label>
//             <input id="file-upload" type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
//             <button type="button" onClick={openCamera} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
//               <FaCamera />
//               <span>Use Camera</span>
//             </button>
//           </div>
//           {file && (
//             <div className="mt-4">
//               <p className="text-sm font-medium text-gray-700">Image Preview:</p>
//               <img src={URL.createObjectURL(file)} alt="Preview" className="mt-2 rounded-lg w-full h-auto" />
//             </div>
//           )}
//         </div>
        
//         <button type="submit" className="w-full bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700">
//           Submit Issue
//         </button>
//       </form>

//       {/* --- Hidden Canvas and Camera Modal Logic (No changes) --- */}
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
  const [latlng, setLatlng] = useState({ lat: '', lng: '' });
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  const navigate = useNavigate();
  const [dateTime, setDateTime] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const fetchAddressFromCoords = useCallback(async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
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
        setLatlng({ lat: latitude, lng: longitude });
        await fetchAddressFromCoords(latitude, longitude);
        setLoadingLocation(false);
      },
      (error) => {
        let message = 'Unable to retrieve location. ';
        if (error.code === error.PERMISSION_DENIED) message += 'Please grant permission.';
        else if (error.code === error.POSITION_UNAVAILABLE) message += 'Location info unavailable.';
        else if (error.code === error.TIMEOUT) message += 'Request timed out.';
        setLocationError(message);
        setLoadingLocation(false);
      },
      options
    );
  }, [fetchAddressFromCoords]);

  useEffect(() => {
    handleGetLocation();
    setDateTime(new Date()); // Auto-capture current date and time on load
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
  };

  const captureImage = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      setCapturedImage(canvas.toDataURL('image/jpeg'));
      closeCameraStream();
    }
  };

  const useCapturedImage = () => {
    canvasRef.current.toBlob(blob => {
      setFile(new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' }));
      setIsCameraOpen(false);
    }, 'image/jpeg');
  };

  const retakeImage = () => openCamera();

  const closeCameraStream = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleCloseModal = () => {
    closeCameraStream();
    setIsCameraOpen(false);
  };

  const handleFileSelect = (e) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

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
      formData.append('lat', latlng.lat);
      formData.append('lng', latlng.lng);
      formData.append('image', file);
      formData.append('dateTime', dateTime.toISOString());

      const headers = { Authorization: `Bearer ${stored.token}`, 'Content-Type': 'multipart/form-data' };
      await axios.post(`${API}/issues`, formData, { headers });

      alert('Issue reported successfully!');
      // Reset form
      setTitle(''); setCategory('Road'); setDescription(''); setFile(null); setAddress(''); setLatlng({ lat: '', lng: '' }); setDateTime(new Date()); handleGetLocation();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Failed to report issue');
    }
  };

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
              {latlng.lat ? `${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}` : 'No coordinates'}
            </div>
          </div>
          {locationError && <p className="text-xs text-red-600 mt-1">{locationError}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date & Time</label>
          <div className="flex items-center gap-2 mt-2 p-2 bg-gray-100 rounded-md">
            <FaCalendarAlt className="text-gray-600" />
            <span className="text-sm text-gray-800">{dateTime ? dateTime.toLocaleString() : 'Detecting...'}</span>
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
            <button type="button" onClick={openCamera} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
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
      {isCameraOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 rounded-lg max-w-lg w-full">
            {capturedImage ? (
              <div>
                <img src={capturedImage} alt="Captured" className="rounded-lg" />
                <div className="flex gap-4 mt-4">
                  <button onClick={retakeImage} className="w-full py-2 px-4 rounded-md border">Retake</button>
                  <button onClick={useCapturedImage} className="w-full py-2 px-4 rounded-md text-white bg-blue-600">Use Image</button>
                </div>
              </div>
            ) : (
              <div>
                <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg"></video>
                <button onClick={captureImage} className="w-full mt-4 py-2 px-4 rounded-md text-white bg-green-600">Capture</button>
              </div>
            )}
            <button onClick={handleCloseModal} className="w-full mt-2 text-sm text-gray-600">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}