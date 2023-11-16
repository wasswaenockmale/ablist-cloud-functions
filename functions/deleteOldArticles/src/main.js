import { Client } from 'node-appwrite';
import deleteArticles from './utils/deleteArticles.js';

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_PROJECT_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  try {
    // delete articles older than a week.
    await deleteArticles(client);
  } catch (error) {
    console.log("Failed to delete articles older than a week.", error.message);
  }

  // `res.json()` is a handy helper for sending JSON
  return res.json({
    success: 'ok',
  });
};
