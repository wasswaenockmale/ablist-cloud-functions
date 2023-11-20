import { Databases, ID } from "node-appwrite";

// helper funcitons 
import getText from "./getText.js";
import getArticles from "./getArticles.js";
import getImageUrl from "./getImageUrl.js";
import getCurrentDataFromDatabase from "./getCurrentDataFromDatabase.js";

export default async function saveArticles(client) {
  // Initialize the database here.
  const database = new Databases(client);

  const articles = await getArticles();
  const currentData = await getCurrentDataFromDatabase(client);

  await Promise.all(
    articles.map(async (article) => {
      if (!currentData.includes(article.id)) {
        const articleData = {
          articleID: article.id,
          title: article.title.rendered,
          excerpt: getText(article.excerpt.rendered),
          articleContent: getText(article.content.rendered),
          resources: [],
          featured_image: `${await getImageUrl(article.featured_media) ?? ''}`,
          author: {
            name: "",
            imageUrl: "",
            ID: ""
          },
          publishedAt: article.date
        }

        // upload document
        database.createDocument(
          process.env.APPWRITE_DATABASE_ID,
          process.env.APPWRITE_ARTICLES_COLLECTION_ID,
          ID.unique(),
          articleData)
          .then(response => {
            console.log('successfully uploaded');
          })
          .catch(error => {
            console.error("An error occured", error);
          })
      }
    })
  );
}