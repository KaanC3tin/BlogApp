const checkUserPermission = (userId: any, resourceId:any): boolean => {
    if (userId !== resourceId) {
        return false;
    }
    return true;
}

export default checkUserPermission;