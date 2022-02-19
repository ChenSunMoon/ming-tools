/**
 * 文件路径转名称
 * @param fullPath
 */
export const path2name = (fullPath:string):string => {
    const lasI = fullPath.lastIndexOf('\\')
    return fullPath.substring(lasI + 1, fullPath.length)
}
export const getFolder = (fullPath:string):string => {
    const lasI = fullPath.lastIndexOf('\\')
    return fullPath.substring(0,lasI + 1)
}
