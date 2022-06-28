export const getFirebaseErr = (err: string) => err.split('/')[1].replace(').', '').split('-').join(' ');
