import { connectedToDB } from "@utils/database";
 import Prompt from "@models/prompt";

 export const GET = async (request) => {
    try{
        await connectedToDB();
        const prompts = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(prompts), {
        status: 201})
    }catch (error) {
        return new Response("failed to fetch all prompts", {
        status: 500})
    }
 }