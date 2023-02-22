import JSEncrypt from "jsencrypt";

let publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCkmOm/lZPANmPo5dee2JXV7z87f21hUMqxxbJ4SRH3bUMscexxLoTewsgLUxAapfCS/u9Sx3KySfIM4ltDPneXEEhyjgu52gadoGM49xodAhQ3w8sE0OWF0RLcvrNBTZn5xtDWxpe3FOr666w0mvnYyp1mRxG6nUgLvB24qtr+DQIDAQAB";

const encryptor = new JSEncrypt();
encryptor.setPublicKey(publicKey);

export default {
    encrypt(str) {
        return encryptor.encrypt(str);
    }
}
