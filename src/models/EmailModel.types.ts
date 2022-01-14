interface EmailModelType{
    id: number,
    host: string,
    name: string,
    password: string,
    used: Date,
    verified: Date,
    createdAt: Date,
    updatedAt: Date
}

export default EmailModelType;