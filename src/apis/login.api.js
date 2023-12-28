import {get, post} from "@/config/axios.config.js";

export const login_=function (id,password) {
    return get("/user/login?id="+id+'&password='+password)
}
