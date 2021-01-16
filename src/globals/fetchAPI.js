import { DataStore } from '@aws-amplify/datastore';
import { Words } from '../models';

import Amplify from "aws-amplify";
import awsExports from "../aws-exports.js";
Amplify.configure(awsExports);

export const fetchWords = async () => {
    return await DataStore.query(Words);
}

export const saveWord = async (word, category) => {
    await DataStore.save(
    new Words({
		"word": word,
		"category": category
    }));
    console.log(`Sucessfully saved ${word}`);
}