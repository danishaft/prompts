import { connectedToDB } from "@utils/database";
import Prompt from "@models/prompt";

//GET (read)
 export const GET = async (request, {params}) => {
    try{
        await connectedToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');
        if(!prompt) return new Response("prompt not found", {status: 404})

        return new Response(JSON.stringify(prompt), {
        status: 201})
    }catch (error) {
        return new Response("failed to fetch all prompts", {
        status: 500})
    }
 }

 //PATCH (update)
 export const PATCH = async (request, {params}) => {
    const { prompt, tag } = await request.json();

    try{
        await connectedToDB();
        const existingPrompt = await Prompt.findById(params.id);
        if(!existingPrompt) return new Response("Prompt not found", {status: 404})

        existingPrompt.prompt = prompt
        existingPrompt.tag = tag;

        await  existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), {status: 200})
    }catch (error){
        return new Response("failed to update prompt", {status: 500})
    }
 }

 //DELETE (delete)
 export const DELETE = async (request, {params}) => {
    console.log(params)
    try{
        await connectedToDB()

        await Prompt.findByIdAndRemove(params.id);
        return new Response("Prompt deleted successfully", {status: 200})
    }catch (error) {
        return new Response("failed to delete prompt", {status: 500})
    }
 }