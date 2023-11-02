import axios from 'axios';
import cheerio from 'cheerio'
import { Client, Databases } from 'node-appwrite';

function getText(htmlString) {
  const $ = cheerio.load(htmlString);

  // Extract text content from the element
  const textContent = $.text();

  // Remove extra whitespace and trim the result
  return textContent.trim();

};

export default async ({ req, res, log, error }) => {

  const client = new Client()
    .setEndpoint(process.env.APPWRITE_PROJECT_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  // Initialize the database here.
  const database = new Databases(client);

  try {

    // get the articles from the wordPress REST API 
    const articles = (await axios.get(process.env.TECH_IN_AFRICA)).data;

    // loop through all the articles and store the image they contain 
    articles.forEach(async (article) => {
      // fetch the image and store the image URL 
      const articleImageUrl = await axios
        .get(`${process.env.MEDIA_API_URL}/${article.featured_media}`)
        .then(response => response.json())
        .then(mediaData => mediaData.source_url)
      
      const dataObject = {
        articleID: article.id.toString(),
        title: article.title.rendered,
        excerpt: getText(article.excerpt.rendered),
        articleContent: getText(article.content.rendered),
        author: {
          name: "",
          imageUrl: "",
          ID: ""
        },
        resources: [],
        featured_image: `${articleImageUrl}`,
        publishedAt: article.date
      }

      console.log(dataObject)

      // const availableArticles = database.listDocuments(
      //   process.env.APPWRITE_DATABASE_ID,
      //   process.env.APPWRITE_ARTICLES_COLLECTION_ID,
      // );
    });

  } catch (error) {
    console.log("storing", error);
  }
  
  // This is what the function will return 
  return res.json({
    success: 'ok'
  });
};
