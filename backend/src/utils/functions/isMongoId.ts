import mongoose from "mongoose"
const ObjectId = mongoose.Types.ObjectId;

const isValidMongoId = (id: string) => {
    if (ObjectId.isValid(id)) {
        if ((String)(new ObjectId(id)) === id) {
            return true
        }
    }
    return false;
}

export default isValidMongoId;