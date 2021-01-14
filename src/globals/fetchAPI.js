import { DataStore } from '@aws-amplify/datastore';
import { Words } from '../models';

import Amplify from "aws-amplify";
import awsExports from "../aws-exports.js";
Amplify.configure(awsExports);

export const fetchWords = async () => {
    console.log('hello there');
    return await DataStore.query(Words);
}