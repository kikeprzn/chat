const getRecipientEmail = (users, user_logged_in) =>
  users?.filter((userToFilter) => userToFilter !== user_logged_in?.email)[0];

export default getRecipientEmail;
