import coreImage from "@/api/core-image";
import authUser from "@/api/auth-user";

class API {
    constructor() {
        this.coreImage = coreImage
        this.authUser = authUser
    }
}

export default new API()
