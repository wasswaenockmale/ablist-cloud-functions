import { Databases } from "node-appwrite";

export default async function deleteArticles(client) {
  try {
    // Initialize database
    const database = new Databases(client);

    // calculate the date 
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Query to find articles older than one week.
    const query = [
      {
        field: 'publishedAt',
        operator: '<',
        value: oneWeekAgo.toISOString()
      }
    ];

    // find the old articles 
    const oldArticles = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_ARTICLES_COLLECTION_ID,
      query
    ).then(response => response.documents)

    oldArticles.forEach(oldArticle => {

      // delete the oldArticle.
      database.deleteDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_ARTICLES_COLLECTION_ID,
        oldArticle.$id
      ).then(response => {
        console.log("Succesfully deleted document.", response);
      }).catch(error => {
        console.log("Failed to delete document.", error);
      })
    });
  } catch (error) {
    console.log("try/catch error", error);
  }
}