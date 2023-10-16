// Tách riêng type của event ra 1 biến riêng là clearAccessTokenUserProfileEventMessage
const clearAccessTokenUserProfileEvent = new Event("FinishedClearAccessTokenUserProfileFromLocalStorage");
export default clearAccessTokenUserProfileEvent;
