import { Client } from 'node-appwrite';

import saveArticles from './utils/saveArticles.js';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_PROJECT_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  try {
    // save articles to the database 
    await saveArticles(client);

  } catch (er) {
    console.error("An error occurred:", er);
  }
  
  // This is what the function will return 
  return res.json({
    success: 'ok'
  });
};
