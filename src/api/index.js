import coreImage from "@/api/core.image";
import coreDownload from "@/api/core.download";
import authUser from "@/api/auth.user";
import coreIndex from "@/api/core.index";
import authGroup from "@/api/auth.group";
import authRole from "@/api/auth.role";
import authPermission from "@/api/auth.permission";
import prophetParameter from "@/api/prophet.parameter";
import prophetApplication from "@/api/prophet.application";
import coreVideo from "@/api/core.video";

class API {
    constructor() {
        this.coreIndex = coreIndex
        this.coreImage = coreImage
        this.coreDownload = coreDownload
        this.coreVideo = coreVideo
        this.authUser = authUser
        this.authGroup = authGroup
        this.authRole = authRole
        this.authPermission = authPermission
        this.prophetParameter = prophetParameter
        this.prophetApplication = prophetApplication
    }
}

export default new API()
