const appwriteCredential = {
    appwriteURL:String(import.meta.env.VITE_APPWRITE_API_ENDPOINT),
    appWriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteArticlesId: String(import.meta.env.VITE_APPWRITE_ARTICLES_ID), // collection id
    appWriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),

};
export default appwriteCredential