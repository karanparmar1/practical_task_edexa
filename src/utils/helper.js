export const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  return user;
};

export const Logout = () => {
  localStorage.removeItem('user');
  window.location.href = '/login';
};

export const ValidUserName = (name) => !!name?.length;

export const ValidEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  const exp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return exp.test(email);
};

export const ValidPassword = (password) => !!(password?.length > 7);

const ValidImageTypes = ['jpeg', 'jpg', 'png'];
const MAX_IMAGE_SIZE = 1;

export const bytesToMB = (bytes) => bytes / (1024 * 1024);

export const ValidImage = (file) => {
  console.log(file);
  if (file && file?.type) {
    const fileType = file.type.split('/')[1];
    const validSize = bytesToMB(file.size) <= MAX_IMAGE_SIZE;
    const validType = ValidImageTypes.find((type) => type === fileType);
    if (validSize && validType) return true;
  }
  return false;
};

export const SetCurrentUser = (user) => localStorage.setItem('user', JSON.stringify(user));
export const GetCurrentUser = () => JSON.parse(localStorage.getItem('user'));

export const StrCompare = (a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
};

export const GetAge = (bday) => {
  return ~~((Date.now() - new Date(bday)) / 31557600000);
  // const today = new Date();
  // const birthDate = new Date(bday);
  // let age = today.getFullYear() - birthDate.getFullYear();
  // const m = today.getMonth() - birthDate.getMonth();

  // if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  //   age -= 1;
  // }

  // return age < 0 ? 0 : age;
};

export const GetUsers = () => {
  const users = JSON.parse(localStorage.getItem('users'));
  return users || [];
};

export const SetUsersList = (users) => localStorage.setItem('users', JSON.stringify(users));

export const GetUesrById = (id) => GetUsers().find((user) => id === user.id);
export const GetUesrByEmail = (email) => GetUsers().find((user) => email === user.email);

export const InsertUser = (user) => {
  try {
    const users = GetUsers().concat([user]);
    SetUsersList(users);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const UpdateUser = (updatedUser) => {
  const users = GetUsers();
  const index = users.findIndex((user) => user.id === updatedUser.id);
  if (index >= 0) {
    users[index] = updatedUser;
    return SetUsersList(users);
  }
  return false;
};
