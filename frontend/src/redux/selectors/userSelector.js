export const selectLoggedInUser = (state) => state.user.user || {};
export const selectLoggedInUserType = (state) => state.user.user.userType;
export const selectLoggedInUserPermissions = (state) => state.user.user.permissions;
