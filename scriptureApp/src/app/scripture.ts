export interface Scripture {
    reference: string;
    text: string;
    status: "new" | "review";
    _id?: string;
}
