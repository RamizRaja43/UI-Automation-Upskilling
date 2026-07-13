export const constants = {
    homePageURL: `https://automationexercise.com/`,
    signUpPage: 'https://automationexercise.com/signup',
    accountPage: 'https://automationexercise.com/account_created',
    signUpName: 'John Abraham',
    firstName: 'John',
    lastName: 'Britto',
    companyName: 'Velcro Industries',
    address: 'PO 3259',
    address2: 'Waltmart',
    state: 'LA',
    city: 'Alaska',
    zipcode: '99611',
    mobileNumber: '1234599611',
    days: '06',
    months: 'July',
    years: '1997',


    loginemailid: 'user_1783686120484@example.com',
    loginemailpassword: 'user0484'


}

export const loginTestData = [
    {
        desc: 'Invalid Email Format',
        email: 'user123-at-mail.com',
        pass: 'Password123!',
        validationType: 'client'
    },
    {
        desc: 'Empty Password Field',
        email: 'validuser@mail.com',
        pass: '',
        validationType: 'client'
    },
    {
        desc: 'Empty Email Field',
        email: '',
        pass: 'Password123!',
        validationType: 'client'
    },
    {
        desc: 'Incorrect Password Combo',
        email: 'wrongauth@mail.com',
        pass: 'WrongPass999!',
        validationType: 'server'
    },
    {
        desc: 'Valid Credentials',
        email: 'user_1783669400834@example.com',
        pass: 'user0834',
        validationType: 'server'
    }
];