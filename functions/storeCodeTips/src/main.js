import { Client } from 'node-appwrite';

// This is your Appwrite function
export default async ({ req, res, log, error }) => {

  const client = new Client()
    .setEndpoint(process.env.APPWRITE_PROJECT_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  console.log("----- store code tips ------");
  return res.json({
    status: 'ok',
  });
};
