const conf = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId : String(import.meta.env.VITE_PROJECT_ID),
    appwriteDatabaseId : String(import.meta.env.VITE_DATABASE_ID),
    appwriteAccountsCollectionId : String(import.meta.env.VITE_ACCOUNTS_COLLECTION_ID),
    appwriteRequestsCollectionId : String(import.meta.env.VITE_REQUESTS_COLLECTION_ID),
    appwriteBucketId : String(import.meta.env.VITE_BUCKET_ID),


};



export default conf;