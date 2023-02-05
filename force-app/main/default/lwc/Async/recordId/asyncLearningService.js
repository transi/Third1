import getListContact from '@salesforce/apex/ContactController.getListContact';

const getAccounts = () => {
    return getListContact().then((result) => {
        return result;
    }).catch((error) => {
        console.log('getListContact', error);
    });
};

export { getAccounts };