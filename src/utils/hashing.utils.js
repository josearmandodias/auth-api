import bcrypt from "bcryptjs";
import { createHmac } from "crypto";

export default {
    doHash: function (value, saltValue){
        const result = bcrypt.hash(value, saltValue)
        return result;
    },

    compareHash: function (value, hashedValue){
        const result = bcrypt.compare(value, hashedValue);
        return result;
    },

    hmacProcess: function (value, key){
        const result = createHmac('sha256', key).update(value).digest('hex');
        return result;
    }
}