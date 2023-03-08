import coreImage from "@/api/core.image";
import coreDownload from "@/api/core.download";
import authUser from "@/api/auth.user";
import coreIndex from "@/api/core.index";

class API {
    constructor() {
        this.coreIndex = coreIndex
        this.coreImage = coreImage
        this.coreDownload= coreDownload
        this.authUser = authUser
    }
}

export default new API()
