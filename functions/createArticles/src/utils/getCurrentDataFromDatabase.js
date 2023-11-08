import { Databases } from "node-appwrite";

export default async function getCurrentDataFromDatabase(client) {
  const database = new Databases(client);
  try {
    const res = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_ARTICLES_COLLECTION_ID
    )
    const articleIDs = res.documents.map(rowData => rowData.articleID);
    return articleIDs;
  } catch (error) {
    console.log("Error in fetching data from the database", error);
    throw error; // You might want to propagate the error
  }
}
