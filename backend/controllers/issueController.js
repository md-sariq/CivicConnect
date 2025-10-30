


// const asyncHandler = require('express-async-handler');
// const Issue = require('../models/issueModel');
// const Authority = require('../models/authorityModel'); // Ensure Authority model is imported

// // --- NEW HELPER FUNCTIONS FOR AI EMBEDDINGS ---

// /**
//  * A utility to add exponential backoff to API calls.
//  * @param {function} fetchCall - The fetch function to retry.
//  * @param {number} maxRetries - Maximum number of retries.
//  * @returns {Promise<Response>}
//  */
// const fetchWithBackoff = async (fetchCall, maxRetries = 5) => {
//   let delay = 1000; // Start with 1 second
//   for (let i = 0; i < maxRetries; i++) {
//     try {
//       const response = await fetchCall();
//       if (response.ok) {
//         return response;
//       }
//       // Do not retry on client errors (4xx), but do on server errors (5xx)
//       if (response.status >= 400 && response.status < 500) {
//         throw new Error(`Client error: ${response.status} ${response.statusText}`);
//       }
//       // If server error or rate limit, wait and retry
//       console.log(`API call failed with status ${response.status}. Retrying in ${delay / 1000}s...`);
//     } catch (error) {
//       // This catches network errors
//       console.log(`Network error during fetch: ${error.message}. Retrying in ${delay / 1000}s...`);
//     }
//     await new Promise(resolve => setTimeout(resolve, delay));
//     delay *= 2; // Double the delay for the next retry
//   }
//   throw new Error('Failed to call API after several retries.');
// };

// /**
//  * Calls the Gemini API to get a text embedding (vector) for a given text.
//  * @param {string} text - The issue description.
//  * @returns {Promise<number[]|null>} The embedding vector or null.
//  */
// const getEmbedding = async (text) => {
//   const apiKey = process.env.GEMINI_API_KEY;
//   if (!apiKey) {
//     console.warn('GEMINI_API_KEY not found. Skipping embedding.');
//     return null;
//   }
//   // We use text-embedding-004 model for generating embeddings
//   const url = `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${apiKey}`;

//   const payload = {
//     model: "models/text-embedding-004",
//     content: {
//       parts: [{ text: text }]
//     }
//   };

//   try {
//     const response = await fetchWithBackoff(() => 
//       fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       })
//     );

//     const result = await response.json();
    
//     if (result.embedding && result.embedding.values) {
//       return result.embedding.values; // This is the vector, e.g., [0.1, 0.2, ...]
//     } else {
//       console.error('AI Embedding Error: Invalid response structure from API.', result);
//       return null;
//     }
//   } catch (error) {
//     // This will catch the final error from fetchWithBackoff
//     console.error('Failed to generate embedding:', error.message);
//     return null;
//   }
// };

// // --- END OF NEW HELPER FUNCTIONS ---

// // --- NEW HELPER FUNCTIONS FOR GROUPING & SUMMARIZATION ---

// /**
//  * Calculates cosine similarity between two vectors.
//  * @param {number[]} vecA - The first embedding vector.
//  * @param {number[]} vecB - The second embedding vector.
//  * @returns {number} The similarity score (0 to 1).
//  */
// const cosineSimilarity = (vecA, vecB) => {
//   if (!vecA || !vecB || vecA.length !== vecB.length) {
//     return 0;
//   }
//   let dotProduct = 0;
//   let magA = 0;
//   let magB = 0;
//   for (let i = 0; i < vecA.length; i++) {
//     dotProduct += vecA[i] * vecB[i];
//     magA += vecA[i] * vecA[i];
//     magB += vecB[i] * vecB[i];
//   }
//   magA = Math.sqrt(magA);
//   magB = Math.sqrt(magB);
//   if (magA === 0 || magB === 0) {
//     return 0;
//   }
//   return dotProduct / (magA * magB);
// };

// /**
//  * Calculates distance between two lat/lng points using Haversine formula.
//  * @param {number} lat1 - Latitude of point 1.
//  * @param {number} lon1 - Longitude of point 1.
//  * @param {number} lat2 - Latitude of point 2.
//  * @param {number} lon2 - Longitude of point 2.
//  * @returns {number} Distance in meters.
//  */
// const getDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371e3; // Earth radius in meters
//   const φ1 = lat1 * Math.PI / 180;
//   const φ2 = lat2 * Math.PI / 180;
//   const Δφ = (lat2 - lat1) * Math.PI / 180;
//   const Δλ = (lon2 - lon1) * Math.PI / 180;

//   const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//             Math.cos(φ1) * Math.cos(φ2) *
//             Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c; // in meters
// };

// /**
//  * Calls the Gemini API to summarize a list of descriptions.
//  * @param {string[]} descriptions - An array of issue descriptions.
//  * @returns {Promise<string>} The summarized text.
//  */
// const getSummary = async (descriptions) => {
//   const apiKey = process.env.GEMINI_API_KEY;
//   if (!apiKey) {
//     console.warn('GEMINI_API_KEY not found. Skipping summary.');
//     return "Could not generate summary.";
//   }

//   const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  
//   const userPrompt = `Summarize the following citizen reports into a single, concise one-paragraph description of the problem. Combine the key details and ignore repetitive information.

// Reports:
// ${descriptions.map((d, i) => `${i + 1}. ${d}`).join('\n')}
// `;

//   const payload = {
//     contents: [{
//       parts: [{ text: userPrompt }]
//     }]
//   };

//   try {
//     const response = await fetchWithBackoff(() =>
//       fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       })
//     );

//     const result = await response.json();
//     const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
    
//     if (text) {
//       return text.trim();
//     } else {
//       console.error('AI Summary Error: Invalid response structure from API.', result);
//       return "Could not generate summary from reports.";
//     }
//   } catch (error) {
//     console.error('Failed to generate summary:', error.message);
//     return "Summary generation failed.";
//   }
// };

// // --- END OF NEW HELPER FUNCTIONS ---


// // @desc    Create a new issue and auto-assign
// // @route   POST /api/issues
// // @access  Private
// const createIssue = asyncHandler(async (req, res) => {
//   const { title, description, category, lat, lng, address, dateTime } = req.body;
  
//   // The 'req.file.path' now contains the secure URL from Cloudinary
//   let imageUrl = req.file ? req.file.path : null;

//   const longitude = parseFloat(lng);
//   const latitude = parseFloat(lat);

//   if (isNaN(longitude) || isNaN(latitude)) {
//     console.error('ERROR: Invalid latitude or longitude received from frontend.');
//     res.status(400);
//     throw new Error('Invalid location coordinates provided.');
//   }

//   const location = { type: 'Point', coordinates: [longitude, latitude] };

//   // Auto-Assignment Logic
//   const responsibleAuthority = await Authority.findOne({
//     jurisdiction: {
//       $geoIntersects: { $geometry: location }
//     }
//   });

//   if (!responsibleAuthority) {
//     console.error(`ERROR: No authority found containing the location point: ${JSON.stringify(location)}`);
//     res.status(400);
//     throw new Error('This location is not currently covered by any registered authority.');
//   }

//   // --- NEW: Generate Embedding ---
//   // We do this in a try...catch so that if the AI call fails,
//   // the issue is still created successfully.
//   let embedding = null;
//   if (description) {
//     try {
//       // Use the issue's title and description for a better embedding
//       const textToEmbed = `${title}. ${description}`;
//       embedding = await getEmbedding(textToEmbed);
//     } catch (aiError) {
//       // The getEmbedding function already logs errors,
//       // so we just ensure creation continues.
//       console.error('AI embedding generation failed, but issue creation will proceed.', aiError.message);
//     }
//   }
//   // --- END OF NEW EMBEDDINGS LOGIC ---

//   // Create the new Issue document
//   const issue = new Issue({
//     title,
//     description,
//     category,
//     imageUrl, // This will now save the Cloudinary URL
//     address,
//     location,
//     reportedBy: req.user._id,
//     assignedToAuthority: responsibleAuthority._id,
//     reportedAt: dateTime ? new Date(dateTime) : new Date(),
//     embedding: embedding, // <-- This is the new field
//   });

//   const createdIssue = await issue.save();
//   res.status(201).json(createdIssue);
// });

// // @desc    Get all issues (for Super Admin) or filtered issues (for Authority Admin)
// // @route   GET /api/issues
// // @access  Private
// const getAllIssues = asyncHandler(async (req, res) => {
//   if (!req.user) {
//     console.error('CRITICAL ERROR: req.user object is MISSING after protect middleware!');
//     res.status(500);
//     throw new Error('User authentication data missing.');
//   }

//   let query = {};
//   if (req.user.role === 'authorityAdmin') {
//     if (!req.user.authority) {
//       console.error(`ERROR: User ${req.user.email} has role 'authorityAdmin' but is missing the 'authority' field linkage!`);
//       res.status(500);
//       throw new Error('Authority admin user is not properly linked to an authority.');
//     }
//     query = { assignedToAuthority: req.user.authority };
//   }

//   try {
//     const issues = await Issue.find(query)
//       .populate('reportedBy', 'name')
//       .populate('assignedToAuthority', 'name')
//       .sort({ createdAt: -1 });
//     res.json(issues);
//   } catch (error) {
//     console.error('❌ DATABASE ERROR during Issue.find():', error);
//     res.status(500);
//     throw new Error('Failed to retrieve issues from the database.');
//   }
// });

// // --- NEW CONTROLLER FUNCTION FOR GROUPED REPORTS ---

// // @desc    Get, cluster, and summarize pending issues
// // @route   GET /api/issues/grouped
// // @access  Private (Admin)
// const getGroupedIssues = asyncHandler(async (req, res) => {
//   // 1. Define thresholds
//   const SIMILARITY_THRESHOLD = 0.85; // e.g., 85% similar
//   const DISTANCE_THRESHOLD_METERS = 200; // e.g., 200 meters

//   // 2. Fetch all pending AND in-progress issues that have an embedding
//   // --- UPDATED QUERY ---
//   const activeIssues = await Issue.find({
//     status: { $in: ['Pending', 'In Progress'] }, // <-- CHANGE: Was just 'Pending'
//     embedding: { $exists: true, $ne: [] }
//   }).populate('reportedBy', 'name').sort({ createdAt: -1 });
//   // --- END OF UPDATE ---

//   // 3. Group issues by category
//   const issuesByCategory = {};
//   for (const issue of activeIssues) { // <-- Use new variable name
//     if (!issuesByCategory[issue.category]) {
//       issuesByCategory[issue.category] = [];
//     }
//     issuesByCategory[issue.category].push(issue);
//   }

//   const finalGroupedResults = [];

//   // 4. Process each category separately
//   for (const category of Object.keys(issuesByCategory)) {
//     const issues = issuesByCategory[category];
//     const clusters = [];
//     const processedIssueIds = new Set();

//     // 5. Cluster issues within the category
//     for (let i = 0; i < issues.length; i++) {
//       if (processedIssueIds.has(issues[i]._id.toString())) {
//         continue;
//       }

//       // --- CLUSTER ISSUES OF THE SAME STATUS ---
//       // This prevents a "Pending" issue from clustering with an "In Progress" one
//       const currentStatus = issues[i].status;

//       const currentCluster = {
//         mainIssue: issues[i],
//         similarIssues: [], // Stores the full issue objects
//         descriptions: [issues[i].description],
//       };
//       processedIssueIds.add(issues[i]._id.toString());

//       const [lon1, lat1] = issues[i].location.coordinates;

//       for (let j = i + 1; j < issues.length; j++) {
//         if (processedIssueIds.has(issues[j]._id.toString())) {
//           continue;
//         }

//         // Only cluster issues that have the same status
//         if (issues[j].status !== currentStatus) {
//           continue;
//         }

//         const [lon2, lat2] = issues[j].location.coordinates;

//         // Check 1: Are they geographically close?
//         const distance = getDistance(lat1, lon1, lat2, lon2);
//         if (distance <= DISTANCE_THRESHOLD_METERS) {
          
//           // Check 2: Are their descriptions semantically similar?
//           const similarity = cosineSimilarity(issues[i].embedding, issues[j].embedding);
          
//           if (similarity >= SIMILARITY_THRESHOLD) {
//             // If yes to all, add to cluster
//             currentCluster.similarIssues.push(issues[j]);
//             currentCluster.descriptions.push(issues[j].description);
//             processedIssueIds.add(issues[j]._id.toString());
//           }
//         }
//       }
//       clusters.push(currentCluster);
//     }

//     // 6. Summarize each cluster
//     for (const cluster of clusters) {
//       let summary = cluster.mainIssue.description;
//       if (cluster.similarIssues.length > 0) {
//         // If there are multiple reports, generate a summary
//         summary = await getSummary(cluster.descriptions);
//       }

//       finalGroupedResults.push({
//         _id: cluster.mainIssue._id, // Use main issue ID as cluster ID
//         category: cluster.mainIssue.category,
//         title: cluster.mainIssue.title, // Use main issue title
//         summary: summary,
//         imageUrl: cluster.mainIssue.imageUrl, // Use main issue image
//         address: cluster.mainIssue.address,
//         reportCount: cluster.similarIssues.length + 1,
//         totalUpvotes: cluster.mainIssue.upvotes.length + cluster.similarIssues.reduce((acc, issue) => acc + issue.upvotes.length, 0),
//         status: cluster.mainIssue.status, // <-- UPDATED: Pass the group's current status
//         createdAt: cluster.mainIssue.createdAt,
//         // Include IDs of all issues in this group
//         allIssueIds: [cluster.mainIssue._id, ...cluster.similarIssues.map(i => i._id)],
//       });
//     }
//   }

//   // 7. Sort final results (e.g., by report count or date)
//   finalGroupedResults.sort((a, b) => b.reportCount - a.reportCount || new Date(b.createdAt) - new Date(a.createdAt));

//   res.json(finalGroupedResults);
// });

// // --- END OF NEW CONTROLLER FUNCTION ---


// // @desc    Get issues reported by the logged-in user
// // @route   GET /api/issues/my-issues
// // @access  Private
// const getMyIssues = asyncHandler(async (req, res) => {
//   const issues = await Issue.find({ reportedBy: req.user._id })
//     .populate('assignedToAuthority', 'name')
//     .sort({ createdAt: -1 });
//   res.json(issues);
// });

// // @desc    Get nearby issues based on user location
// // @route   GET /api/issues/nearby
// // @access  Private
// const getNearbyIssues = asyncHandler(async (req, res) => {
//   const { lat, lng } = req.query;
//   const maxDistance = 5000;

//   if (!lat || !lng) {
//       res.status(400);
//       throw new Error('Latitude and Longitude query parameters are required.');
//   }

//   const issues = await Issue.find({
//     location: {
//       $near: {
//         $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
//         $maxDistance: maxDistance,
//       },
//     },
//   }).populate('assignedToAuthority', 'name');

//   const issuesWithUpvoteStatus = issues.map(issue => ({
//     ...issue.toObject(),
//     isUpvoted: issue.upvotes.includes(req.user._id),
//   }));
//   res.json(issuesWithUpvoteStatus);
// });

// // @desc    Get single issue by ID
// // @route   GET /api/issues/:id
// // @access  Private
// const getIssueById = asyncHandler(async (req, res) => {
//   const issue = await Issue.findById(req.params.id)
//     .populate('reportedBy', 'name')
//     .populate('assignedToAuthority', 'name');
//   if (issue) {
//     res.json(issue);
//   } else {
//     res.status(404);
//     throw new Error('Issue not found');
//   }
// });

// // @desc    Update issue status
// // @route   PUT /api/issues/:id/status
// // @access  Private/AuthorityAdmin
// const updateIssueStatus = asyncHandler(async (req, res) => {
//   const { status } = req.body;
//   const updatedIssue = await Issue.findByIdAndUpdate(
//     req.params.id,
//     { status: status },
//     { new: true, runValidators: true }
//   );
//   if (updatedIssue) {
//     res.json(updatedIssue);
//   } else {
//     res.status(404);
//     throw new Error('Issue not found');
//   }
// });

// // @desc    Upvote or remove upvote for an issue
// // @route   PUT /api/issues/:id/upvote
// // @access  Private
// const upvoteIssue = asyncHandler(async (req, res) => {
//  const issue = await Issue.findById(req.params.id);
//   if (issue) {
//     const alreadyUpvoted = issue.upvotes.includes(req.user._id);
//     if (alreadyUpvoted) {
//       issue.upvotes.pull(req.user._id);
//     } else {
//       issue.upvotes.push(req.user._id);
//     }
//     await issue.save();
//     res.json({
//         upvotes: issue.upvotes,
//         isUpvoted: !alreadyUpvoted,
//     });
//   } else {
//     res.status(404);
//     throw new Error('Issue not found');
//   }
// });

// // --- NEW CONTROLLER FUNCTION FOR GROUP STATUS UPDATE ---

// // @desc    Update the status of a whole group of issues
// // @route   PUT /api/issues/group-status
// // @access  Private/AuthorityAdmin
// const updateGroupStatus = asyncHandler(async (req, res) => {
//   const { issueIds, status } = req.body;

//   // 1. Validate input
//   if (!Array.isArray(issueIds) || issueIds.length === 0) {
//     res.status(400);
//     throw new Error('No issue IDs provided.');
//   }
//   if (!status || !['In Progress', 'Resolved'].includes(status)) {
//     res.status(400);
//     throw new Error('Invalid status provided. Must be "In Progress" or "Resolved".');
//   }

//   try {
//     // 2. Perform the bulk update using $in operator
//     const updateResult = await Issue.updateMany(
//       { _id: { $in: issueIds } }, // Find all issues where _id is in the issueIds array
//       { $set: { status: status } } // Set their new status
//     );

//     if (updateResult.modifiedCount > 0) {
//       res.status(200).json({ 
//         message: `Successfully updated status for ${updateResult.modifiedCount} issues.`,
//         count: updateResult.modifiedCount 
//       });
//     } else {
//       res.status(404);
//       // --- UPDATED ERROR TEXT ---
//       throw new Error('No matching issues found to update.');
//     }
//   } catch (error) {
//     console.error('❌ DATABASE ERROR during bulk status update:', error);
//     res.status(500);
//     throw new Error('Failed to update issue statuses.');
//   }
// });

// // --- END OF NEW CONTROLLER FUNCTION ---

// // Export all controller functions
// module.exports = {
//   createIssue,
//   getAllIssues,
//   getGroupedIssues, // <-- Add new function to exports
//   getMyIssues,
//   getNearbyIssues,
//   getIssueById,
//   updateIssueStatus,
//   upvoteIssue,
//   updateGroupStatus, // <-- 3. EXPORT THE NEW FUNCTION
// };




















const asyncHandler = require('express-async-handler');
const Issue = require('../models/issueModel');
const Authority = require('../models/authorityModel'); // Ensure Authority model is imported

// --- NEW HELPER FUNCTIONS FOR AI EMBEDDINGS ---

/**
 * A utility to add exponential backoff to API calls.
 * @param {function} fetchCall - The fetch function to retry.
 * @param {number} maxRetries - Maximum number of retries.
 * @returns {Promise<Response>}
 */
const fetchWithBackoff = async (fetchCall, maxRetries = 5) => {
  let delay = 1000; // Start with 1 second
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetchCall();
      if (response.ok) {
        return response;
      }
      // Do not retry on client errors (4xx), but do on server errors (5xx)
      if (response.status >= 400 && response.status < 500) {
        throw new Error(`Client error: ${response.status} ${response.statusText}`);
      }
      // If server error or rate limit, wait and retry
      console.log(`API call failed with status ${response.status}. Retrying in ${delay / 1000}s...`);
    } catch (error) {
      // This catches network errors
      console.log(`Network error during fetch: ${error.message}. Retrying in ${delay / 1000}s...`);
    }
    await new Promise(resolve => setTimeout(resolve, delay));
    delay *= 2; // Double the delay for the next retry
  }
  throw new Error('Failed to call API after several retries.');
};

/**
 * Calls the Gemini API to get a text embedding (vector) for a given text.
 * @param {string} text - The issue description.
 * @returns {Promise<number[]|null>} The embedding vector or null.
 */
const getEmbedding = async (text) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY not found. Skipping embedding.');
    return null;
  }
  // We use text-embedding-004 model for generating embeddings
  const url = `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${apiKey}`;

  const payload = {
    model: "models/text-embedding-004",
    content: {
      parts: [{ text: text }]
    }
  };

  try {
    const response = await fetchWithBackoff(() => 
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    );

    const result = await response.json();
    
    if (result.embedding && result.embedding.values) {
      return result.embedding.values; // This is the vector, e.g., [0.1, 0.2, ...]
    } else {
      console.error('AI Embedding Error: Invalid response structure from API.', result);
      return null;
    }
  } catch (error) {
    // This will catch the final error from fetchWithBackoff
    console.error('Failed to generate embedding:', error.message);
    return null;
  }
};

// --- END OF NEW HELPER FUNCTIONS ---

// --- NEW HELPER FUNCTIONS FOR GROUPING & SUMMARIZATION ---

/**
 * Calculates cosine similarity between two vectors.
 * @param {number[]} vecA - The first embedding vector.
 * @param {number[]} vecB - The second embedding vector.
 * @returns {number} The similarity score (0 to 1).
 */
const cosineSimilarity = (vecA, vecB) => {
  if (!vecA || !vecB || vecA.length !== vecB.length) {
    return 0;
  }
  let dotProduct = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    magA += vecA[i] * vecA[i];
    magB += vecB[i] * vecB[i];
  }
  magA = Math.sqrt(magA);
  magB = Math.sqrt(magB);
  if (magA === 0 || magB === 0) {
    return 0;
  }
  return dotProduct / (magA * magB);
};

/**
 * Calculates distance between two lat/lng points using Haversine formula.
 * @param {number} lat1 - Latitude of point 1.
 * @param {number} lon1 - Longitude of point 1.
 * @param {number} lat2 - Latitude of point 2.
 * @param {number} lon2 - Longitude of point 2.
 * @returns {number} Distance in meters.
 */
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Earth radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // in meters
};

/**
 * Calls the Gemini API to summarize a list of descriptions.
 * @param {string[]} descriptions - An array of issue descriptions.
 * @returns {Promise<string>} The summarized text.
 */
const getSummary = async (descriptions) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY not found. Skipping summary.');
    return "Could not generate summary.";
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  
  const userPrompt = `Summarize the following citizen reports into a single, concise one-paragraph description of the problem. Combine the key details and ignore repetitive information.

Reports:
${descriptions.map((d, i) => `${i + 1}. ${d}`).join('\n')}
`;

  const payload = {
    contents: [{
      parts: [{ text: userPrompt }]
    }]
  };

  try {
    const response = await fetchWithBackoff(() =>
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    );

    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (text) {
      return text.trim();
    } else {
      console.error('AI Summary Error: Invalid response structure from API.', result);
      return "Could not generate summary from reports.";
    }
  } catch (error) {
    console.error('Failed to generate summary:', error.message);
    return "Summary generation failed.";
  }
};

// --- END OF NEW HELPER FUNCTIONS ---


// @desc    Create a new issue and auto-assign
// @route   POST /api/issues
// @access  Private
const createIssue = asyncHandler(async (req, res) => {
  const { title, description, category, lat, lng, address, dateTime } = req.body;
  
  // The 'req.file.path' now contains the secure URL from Cloudinary
  let imageUrl = req.file ? req.file.path : null;

  const longitude = parseFloat(lng);
  const latitude = parseFloat(lat);

  if (isNaN(longitude) || isNaN(latitude)) {
    console.error('ERROR: Invalid latitude or longitude received from frontend.');
    res.status(400);
    throw new Error('Invalid location coordinates provided.');
  }

  const location = { type: 'Point', coordinates: [longitude, latitude] };

  // Auto-Assignment Logic
  const responsibleAuthority = await Authority.findOne({
    jurisdiction: {
      $geoIntersects: { $geometry: location }
    }
  });

  if (!responsibleAuthority) {
    console.error(`ERROR: No authority found containing the location point: ${JSON.stringify(location)}`);
    res.status(400);
    throw new Error('This location is not currently covered by any registered authority.');
  }

  // --- NEW: Generate Embedding ---
  // We do this in a try...catch so that if the AI call fails,
  // the issue is still created successfully.
  let embedding = null;
  if (description) {
    try {
      // Use the issue's title and description for a better embedding
      const textToEmbed = `${title}. ${description}`;
      embedding = await getEmbedding(textToEmbed);
    } catch (aiError) {
      // The getEmbedding function already logs errors,
      // so we just ensure creation continues.
      console.error('AI embedding generation failed, but issue creation will proceed.', aiError.message);
    }
  }
  // --- END OF NEW EMBEDDINGS LOGIC ---

  // Create the new Issue document
  const issue = new Issue({
    title,
    description,
    category,
    imageUrl, // This will now save the Cloudinary URL
    address,
    location,
    reportedBy: req.user._id,
    assignedToAuthority: responsibleAuthority._id,
    reportedAt: dateTime ? new Date(dateTime) : new Date(),
    embedding: embedding, // <-- This is the new field
  });

  const createdIssue = await issue.save();
  res.status(201).json(createdIssue);
});

// @desc    Get all issues (for Super Admin) or filtered issues (for Authority Admin)
// @route   GET /api/issues
// @access  Private
const getAllIssues = asyncHandler(async (req, res) => {
  if (!req.user) {
    console.error('CRITICAL ERROR: req.user object is MISSING after protect middleware!');
    res.status(500);
    throw new Error('User authentication data missing.');
  }

  let query = {};
  if (req.user.role === 'authorityAdmin') {
    if (!req.user.authority) {
      console.error(`ERROR: User ${req.user.email} has role 'authorityAdmin' but is missing the 'authority' field linkage!`);
      res.status(500);
      throw new Error('Authority admin user is not properly linked to an authority.');
    }
    query = { assignedToAuthority: req.user.authority };
  }

  try {
    const issues = await Issue.find(query)
      .populate('reportedBy', 'name')
      .populate('assignedToAuthority', 'name')
      .sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    console.error('❌ DATABASE ERROR during Issue.find():', error);
    res.status(500);
    throw new Error('Failed to retrieve issues from the database.');
  }
});

// --- NEW CONTROLLER FUNCTION FOR GROUPED REPORTS ---

// @desc    Get, cluster, and summarize pending issues
// @route   GET /api/issues/grouped
// @access  Private (Admin)
const getGroupedIssues = asyncHandler(async (req, res) => {
  // 1. Define thresholds
  const SIMILARITY_THRESHOLD = 0.85; // e.g., 85% similar
  const DISTANCE_THRESHOLD_METERS = 200; // e.g., 200 meters

  // 2. Fetch all pending AND in-progress issues that have an embedding
  // --- UPDATED QUERY ---
  const activeIssues = await Issue.find({
    status: { $in: ['Pending', 'In Progress'] }, // <-- CHANGE: Was just 'Pending'
    embedding: { $exists: true, $ne: [] }
  }).populate('reportedBy', 'name').sort({ createdAt: -1 });
  // --- END OF UPDATE ---

  // 3. Group issues by category
  const issuesByCategory = {};
  for (const issue of activeIssues) { // <-- Use new variable name
    if (!issuesByCategory[issue.category]) {
      issuesByCategory[issue.category] = [];
    }
    issuesByCategory[issue.category].push(issue);
  }

  const finalGroupedResults = [];

  // 4. Process each category separately
  for (const category of Object.keys(issuesByCategory)) {
    const issues = issuesByCategory[category];
    const clusters = [];
    const processedIssueIds = new Set();

    // 5. Cluster issues within the category
    for (let i = 0; i < issues.length; i++) {
      if (processedIssueIds.has(issues[i]._id.toString())) {
        continue;
      }

      // --- CLUSTER ISSUES OF THE SAME STATUS ---
      // This prevents a "Pending" issue from clustering with an "In Progress" one
      const currentStatus = issues[i].status;

      const currentCluster = {
        mainIssue: issues[i],
        similarIssues: [], // Stores the full issue objects
        descriptions: [issues[i].description],
      };
      processedIssueIds.add(issues[i]._id.toString());

      const [lon1, lat1] = issues[i].location.coordinates;

      for (let j = i + 1; j < issues.length; j++) {
        if (processedIssueIds.has(issues[j]._id.toString())) {
          continue;
        }

        // Only cluster issues that have the same status
        if (issues[j].status !== currentStatus) {
          continue;
        }

        const [lon2, lat2] = issues[j].location.coordinates;

        // Check 1: Are they geographically close?
        const distance = getDistance(lat1, lon1, lat2, lon2);
        if (distance <= DISTANCE_THRESHOLD_METERS) {
          
          // Check 2: Are their descriptions semantically similar?
          const similarity = cosineSimilarity(issues[i].embedding, issues[j].embedding);
          
          if (similarity >= SIMILARITY_THRESHOLD) {
            // If yes to all, add to cluster
            currentCluster.similarIssues.push(issues[j]);
            currentCluster.descriptions.push(issues[j].description);
            processedIssueIds.add(issues[j]._id.toString());
          }
        }
      }
      clusters.push(currentCluster);
    }

    // 6. Summarize each cluster
    for (const cluster of clusters) {
      
      // --- UPDATED LOGIC: Only create a group if it has 2 or more reports ---
      if (cluster.similarIssues.length > 0) {
        // If there are multiple reports (mainIssue + similarIssues), generate a summary
        const summary = await getSummary(cluster.descriptions);

        finalGroupedResults.push({
          _id: cluster.mainIssue._id, // Use main issue ID as cluster ID
          category: cluster.mainIssue.category,
          title: cluster.mainIssue.title, // Use main issue title
          summary: summary, // Use the AI-generated summary
          imageUrl: cluster.mainIssue.imageUrl, // Use main issue image
          address: cluster.mainIssue.address,
          reportCount: cluster.similarIssues.length + 1, // This will always be 2 or more
          totalUpvotes: cluster.mainIssue.upvotes.length + cluster.similarIssues.reduce((acc, issue) => acc + issue.upvotes.length, 0),
          status: cluster.mainIssue.status, // Pass the group's current status
          createdAt: cluster.mainIssue.createdAt,
          // Include IDs of all issues in this group
          allIssueIds: [cluster.mainIssue._id, ...cluster.similarIssues.map(i => i._id)],
        });
      }
      // If cluster.similarIssues.length is 0, it's a single report and we skip it.
      // --- END OF UPDATE ---
    }
  }

  // 7. Sort final results (e.g., by report count or date)
  finalGroupedResults.sort((a, b) => b.reportCount - a.reportCount || new Date(b.createdAt) - new Date(a.createdAt));

  res.json(finalGroupedResults);
});

// --- END OF NEW CONTROLLER FUNCTION ---


// @desc    Get issues reported by the logged-in user
// @route   GET /api/issues/my-issues
// @access  Private
const getMyIssues = asyncHandler(async (req, res) => {
  const issues = await Issue.find({ reportedBy: req.user._id })
    .populate('assignedToAuthority', 'name')
    .sort({ createdAt: -1 });
  res.json(issues);
});

// @desc    Get nearby issues based on user location
// @route   GET /api/issues/nearby
// @access  Private
const getNearbyIssues = asyncHandler(async (req, res) => {
  const { lat, lng } = req.query;
  const maxDistance = 5000;

  if (!lat || !lng) {
      res.status(400);
      throw new Error('Latitude and Longitude query parameters are required.');
  }

  const issues = await Issue.find({
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
        $maxDistance: maxDistance,
      },
    },
  }).populate('assignedToAuthority', 'name');

  const issuesWithUpvoteStatus = issues.map(issue => ({
    ...issue.toObject(),
    isUpvoted: issue.upvotes.includes(req.user._id),
  }));
  res.json(issuesWithUpvoteStatus);
});

// @desc    Get single issue by ID
// @route   GET /api/issues/:id
// @access  Private
const getIssueById = asyncHandler(async (req, res) => {
  const issue = await Issue.findById(req.params.id)
    .populate('reportedBy', 'name')
    .populate('assignedToAuthority', 'name');
  if (issue) {
    res.json(issue);
  } else {
    res.status(404);
    throw new Error('Issue not found');
  }
});

// @desc    Update issue status
// @route   PUT /api/issues/:id/status
// @access  Private/AuthorityAdmin
const updateIssueStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const updatedIssue = await Issue.findByIdAndUpdate(
    req.params.id,
    { status: status },
    { new: true, runValidators: true }
  );
  if (updatedIssue) {
    res.json(updatedIssue);
  } else {
    res.status(404);
    throw new Error('Issue not found');
  }
});

// @desc    Upvote or remove upvote for an issue
// @route   PUT /api/issues/:id/upvote
// @access  Private
const upvoteIssue = asyncHandler(async (req, res) => {
 const issue = await Issue.findById(req.params.id);
  if (issue) {
    const alreadyUpvoted = issue.upvotes.includes(req.user._id);
    if (alreadyUpvoted) {
      issue.upvotes.pull(req.user._id);
    } else {
      issue.upvotes.push(req.user._id);
    }
    await issue.save();
    res.json({
        upvotes: issue.upvotes,
        isUpvoted: !alreadyUpvoted,
    });
  } else {
    // --- SYNTAX ERROR FIX ---
    res.status(404); // Was 4s04
    // --- END OF FIX ---
    throw new Error('Issue not found');
  }
});

// --- NEW CONTROLLER FUNCTION FOR GROUP STATUS UPDATE ---

// @desc    Update the status of a whole group of issues
// @route   PUT /api/issues/group-status
// @access  Private/AuthorityAdmin
const updateGroupStatus = asyncHandler(async (req, res) => {
  const { issueIds, status } = req.body;

  // 1. Validate input
  if (!Array.isArray(issueIds) || issueIds.length === 0) {
    res.status(400);
    throw new Error('No issue IDs provided.');
  }
  if (!status || !['In Progress', 'Resolved'].includes(status)) {
    res.status(400);
    throw new Error('Invalid status provided. Must be "In Progress" or "Resolved".');
  }

  try {
    // 2. Perform the bulk update using $in operator
    const updateResult = await Issue.updateMany(
      { _id: { $in: issueIds } }, // Find all issues where _id is in the issueIds array
      { $set: { status: status } } // Set their new status
    );

    if (updateResult.modifiedCount > 0) {
      res.status(200).json({ 
        message: `Successfully updated status for ${updateResult.modifiedCount} issues.`,
        count: updateResult.modifiedCount 
      });
    } else {
      res.status(404);
      // --- UPDATED ERROR TEXT ---
      throw new Error('No matching issues found to update.');
    }
  } catch (error) {
    console.error('❌ DATABASE ERROR during bulk status update:', error);
    res.status(500);
    throw new Error('Failed to update issue statuses.');
  }
});

// --- END OF NEW CONTROLLER FUNCTION ---

// Export all controller functions
module.exports = {
  createIssue,
  getAllIssues,
  getGroupedIssues, // <-- Add new function to exports
  getMyIssues,
  getNearbyIssues,
  getIssueById,
  updateIssueStatus,
  upvoteIssue,
  updateGroupStatus, // <-- 3. EXPORT THE NEW FUNCTION
};





