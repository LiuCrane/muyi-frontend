import http from '../utils/http'
// 
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */


// get请求
export function storesList(params) {
    return http.get(`/admin/stores`, params)
}
export function browseRecords(params) {
    return http.get(`/admin/media/browse_records`, params)
}
export function classes(params) {
    return http.get(`/admin/classes`, params)
}
export function simple_users(params) {
    return http.get(`/admin/simple_users`, params)
}
// get请求
export function students(params) {
    return http.get(`/admin/students`)
}
// get请求
export function uploadInfo(params) {
    return http.get(`/admin/file/upload_info`, params)
}
// post请求
export function login(params) {
    return http.post(`/admin/auth/login`, params)
}
export function getUserInfo() {
    return http.get(`/admin/me`)
}
// post请求
export function cancel(id) {
    return http.post(`/admin/stores/${id}/cancel`)
}
// get请求
export function mediaList(params) {
    return http.get(`/admin/media`, params)
}
export function newMedia(params) {
    return http.post(`/admin/media`, params)
}
export function storesUpdate(id, params) {
    return http.put(`/admin/stores/${id}`, params)
}
export function categories() {
    return http.get(`/admin/media/categories`)
}
export function upload(id, params) {
    return http.put(`/admin/stores/${id}`, params)
}
export function mediaUpdate(id, params) {
    return http.put(`/admin/media/${id}`, params)
}
export function mediaDelete(params) {
    return http.delete(`/admin/media/${params.id}`)
}
// post请求
export function getTmp_secret_key(params) {
    return http.post(`/admin/auth/login`, params)
}
// put 请求
export function putSomeAPI(params) {
    return http.put(`/putSome.json`, params)
}
// delete 请求
export function deleteListAPI(params) {
    return http.delete(`/deleteList.json`, params)
}

//审核列表
export function veriList(params) {
    return http.get(`/admin/applications`, params)
}
// 审核申请 
export function veriRequest(params) {
    return http.post(`/admin/applications/audit`,params)
}
export function veriCount() {
    return http.get(`/admin/get_application_count`)
}
