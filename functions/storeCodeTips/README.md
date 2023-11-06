# storeCodeTips

## 🧰 Usage

### POST /

- Saves coding tips to the database.


**Response**

Sample `200` Response:

```json
{
  "status": "ok",
}
```

## ⚙️ Configuration

| Setting           | Value         |
|-------------------|---------------|
| Runtime           | Node (18.0)   |
| Entrypoint        | `src/main.js` |
| Build Commands    | `npm install` |
| Permissions       | `any`         |
| Timeout (Seconds) | 15            |

## 🔒 Environment Variables

##### Appwrite variables 
APPWRITE_PROJECT_ENDPOINT
APPWRITE_PROJECT_ID
APPWRITE_DATABASE_ID
APPWRITE_ARTICLES_COLLECTION_ID
APPWRITE_API_KEY

##### codeTips endpoints.