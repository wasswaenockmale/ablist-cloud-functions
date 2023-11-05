import axios from "axios";

export default async function getAuthorDetails() {
  try {
      await axios
    .get(process.env.AUTHOR_ENDPOINT)
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      console.log("Error has occured", error);
    })
  } catch (error) {
    console.log("There is an error", error);
  }
}