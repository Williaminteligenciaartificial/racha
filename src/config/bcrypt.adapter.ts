import {  compareSync, genSaltSync, hashSync } from "bcrypt"
import { text } from "stream/consumers";

export const bcryptAdpter = {
    encrypt: async (text:string) => {
        const salt = genSaltSync(10);
        return hashSync(text,salt);
    }, 
    compare: async(text: string, hash: string) => {
        return compareSync(text,hash);
    },
};