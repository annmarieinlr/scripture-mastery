import * as mongodb from 'mongodb';

export interface Scripture {
    reference: string;
    text: string;
    status: "new" | "review";
    _id?: mongodb.ObjectId;

}