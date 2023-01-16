import fetchAccounts from '@salesforce/apex/accountControllerService.fetchAccounts';

const getAccounts = () => {
    return fetchAccounts().then((result) => {
        console.log('account list service', result);
        return result;
    }).catch((error) => {
        console.log(error);
    });
};

export { getAccounts };