import appwriteCredential from "../config/Config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
   client = new Client()
   account;

    constructor (){
 this.client
 .setEndpoint(appwriteCredential.appwriteURL)
 .setProject(appwriteCredential.appWriteProjectId);

 this.account = new Account(this.client);
    }
    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create({
                userId:ID.unique(),
                email:email,
                password:password,
                name:name,
            })
            if(userAccount ) {
                return this.login({ email, password });

            }
            else {
                return userAccount
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async login({email,password}){
        try {
    const result =    await this.account.createEmailPasswordSession({
            email:email,
            password:password
        })
          if(result){
                return result;
        }else
            return result
        } catch (error) {
            console.log(error)
            throw error;
        }
    }


    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log(error);
            
        }
        return null;
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        } catch(error){
            console.log(error);
            throw error;
        }
    }
    async getUserProfile(){
        try{
          const user = await this.account.get();
           return user;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }
    async changeName(updatedName){
        try{
            await this.account.updateName(
                {
                    name: updatedName
                }
            );
        }
        catch(error){
             console.log(error);
            throw error;
        }  
    }
    async changePassword(oldPassword,currentPassword){
        try{
            await this.account.updatePassword(
                {
                    password:currentPassword,
                     oldPassword:oldPassword,
                }
            );
        }
        catch(error){
             console.log(error);
            throw error;
        }  
    }

}



const authService = new AuthService()
export default authService
