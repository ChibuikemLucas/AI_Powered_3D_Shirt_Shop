import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config(); // Load environment variables

const router = express.Router();

// Hugging Face API endpoint for text-to-image generation
const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2';

// Ensure the API key is loaded correctly
if (!process.env.HUGGINGFACE_API_KEY) {
  console.error("Error: HUGGINGFACE_API_KEY is not set in the .env file.");
  process.exit(1); // Exit the application if the API key is missing
}

// Log request details for debugging
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Headers:", req.headers); // Logs all incoming request headers
  next();
});

// GET route for testing the server
router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL.E ROUTES' });
});

// POST route to generate images using Hugging Face's Stable Diffusion model
router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // Log the prompt received in the request body
    console.log("Prompt received:", prompt);

    // Call Hugging Face API to create an image using Stable Diffusion
    const response = await axios.post(HUGGINGFACE_API_URL, 
      {
        inputs: prompt
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`
        }
      }
    );

    // Extract and send the generated image URL or base64 data
    const imageUrl = response.data[0]?.url; // Assuming the model returns an image URL
    console.log("Image generated successfully."); // Log success
    res.status(200).json({ photo: imageUrl });
  } catch (error) {
    // Handle errors and log details for debugging
    console.error("Error calling Hugging Face API:", error.message);

    if (error.response) {
      console.error("Error details:", error.response.data);
    }

    res.status(500).json({
      message: 'Something went wrong. Check server logs for details.',
    });
  }
});

export default router;
