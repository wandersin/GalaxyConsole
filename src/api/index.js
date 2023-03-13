import coreImage from "@/api/core.image";
import coreDownload from "@/api/core.download";
import authUser from "@/api/auth.user";
import coreIndex from "@/api/core.index";
import authGroup from "@/api/auth.group";
import authRole from "@/api/auth.role";

class API {
    constructor() {
        this.coreIndex = coreIndex
        this.coreImage = coreImage
        this.coreDownload= coreDownload
        this.authUser = authUser
        this.authGroup = authGroup
        this.authRole = authRole
    }
}

export default new API()
