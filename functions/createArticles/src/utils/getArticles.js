import axios from "axios";

// Get the articles.
export default async function getArticles() {
  try {
    return await axios
      .get(`${process.env.TECH_IN_AFRICA}?page=1&per_page=20`)
      .then(response => {
        return response.data;
      })
  } catch (error) {
    console.log("Error in fetching the articles",error)
  }
}