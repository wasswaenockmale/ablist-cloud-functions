import { Databases } from "node-appwrite";

export default async function getCurrentDataFromDatabase(client) {
  // database.
  const database = new Databases(client);
  try {
    // get the documents.
    console.log(process.env.APPWRITE_ARTICLES_COLLECTION_ID);
    const data = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_ARTICLES_COLLECTION_ID,
    )
      .then(response => response.documents)
      .catch(error => {
        console.log("Error in fetching data from the database", error);
      })
    
    if (data) {
      return data.map(async (rowData) => {
        return rowData.articleID
      })
    }
    return []
  } catch (error) {
    console.log("Get current data error", error);
  }
}