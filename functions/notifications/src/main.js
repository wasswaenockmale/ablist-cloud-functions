import { Expo } from 'expo-server-sdk';
import { Client } from 'node-appwrite';
import getTokens from './utils/getTokens.js';

const title = 'New Opportunity Available!';
const messageBody = `Explore the latest opportunity! Don\'t miss out on this exciting opportunity. Tap to view details`;

export default async ({ req, res, log, error }) => {

  const client = new Client()
    .setEndpoint(process.env.APPWRITE_PROJECT_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY)
  
  const pushTokens = await getTokens(client);

  const message = [];

  for (let token of pushTokens) {
    if (!Expo.isExpoPushToken(token)) {
      console.log(`Push token ${token} is not a valid Expo push token`)
      continue;
    }

    message.push({
      to: token,
      sound: 'default',
      title: title,
      body: messageBody
    });

    const chunks = Expo.prototype.chunkPushNotifications(message);

    let ticket = [];

    (async () => {
      for (let chunk of chunks) {
        try {
          let ticketChunk = await Expo.prototype.sendPushNotificationsAsync(chunk);
          console.log(ticketChunk);
          ticket.push(ticketChunk)
        } catch (error) {
          console.log(`${error} in sending chunk`)
        }
      }
    })();
  }
  
  return res.json({
    status: 'ok'
  });
};
