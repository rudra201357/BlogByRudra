import appwriteCredential from "../config/Config";
import { Databases, ID, Storage, Query, Client} from "appwrite";

export class Services {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(appwriteCredential.appwriteURL)
            .setProject(appwriteCredential.appWriteProjectId);

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                appwriteCredential.appWriteDatabaseId,
                appwriteCredential.appWriteArticlesId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
    async updatePost(slug, { title, content, featuredImage, status, userId }) {
        try {
            return await this.databases.updateDocument(
                appwriteCredential.appWriteDatabaseId,
                appwriteCredential.appWriteArticlesId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                appwriteCredential.appWriteDatabaseId,
                appwriteCredential.appWriteArticlesId,
                slug,
            )
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                appwriteCredential.appWriteDatabaseId,
                appwriteCredential.appWriteArticlesId,
                slug
            )
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async listPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                appwriteCredential.appWriteDatabaseId,
                appwriteCredential.appWriteArticlesId,
                queries
            )
        } catch (error) {
            console.log(error)
            return false;
        }
    }
    async listMyPosts(userId) {
        try {
            return await this.databases.listDocuments(
                appwriteCredential.appWriteDatabaseId,
                appwriteCredential.appWriteArticlesId,
                 [
                    Query.equal('userId', userId), 
                ]
            )
        } catch (error) {
            console.log(error)
            throw error;
           
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                appwriteCredential.appWriteBucketId,
                ID.unique(),
                file,
                // [Permission.read(Role.any())]
            )
        } catch (error) {
            console.log(error)
            return false;
        }
    }
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                appwriteCredential.appWriteBucketId,
                fileId

            )
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    getFilePreview(fileId) {
        if (!fileId) return "";

        return this.bucket.getFileView(
           appwriteCredential.appWriteBucketId,
            fileId,
        );
    }
};

const service = new Services();
export default service;
