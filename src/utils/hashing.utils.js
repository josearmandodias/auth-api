import bcrypt from "bcryptjs";

export default {
    doHash: function (value, saltValue){
        const result = bcrypt.hash(value, saltValue)
        return result;
    }
}