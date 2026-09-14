// Upload image file to Vercel Blob storage
import { put } from "@vercel/blob";
import { BLOB_READ_WRITE_TOKEN } from "$env/static/private";


export async function uploadImage(file) {
    const blob = await put(file.name, file, {
        access: "public",
        token: BLOB_READ_WRITE_TOKEN
    });

    return blob.url;
}