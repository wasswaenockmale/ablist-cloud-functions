import { Databases, Query } from "node-appwrite";

export default async function getTokens(client) {
  const database = new Databases(client);

  try {
    const { total } = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_NOTIFICATION_TOKEN_COLLECTION_ID
    );

    const { documents: tokens } = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_NOTIFICATION_TOKEN_COLLECTION_ID,
      [
        Query.limit(total),
        Query.offset(0)
      ]
    )

    return tokens.map(token => token.tokenValue)
  } catch (error) {
    console.log("Error in fetching data from the database.")
  }
}