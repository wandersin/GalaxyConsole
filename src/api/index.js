import coreImage from "@/api/core.image";
import coreDownload from "@/api/core.download";
import authUser from "@/api/auth.user";

class API {
    constructor() {
        this.coreImage = coreImage
        this.coreDownload= coreDownload
        this.authUser = authUser
    }
}

export default new API()
