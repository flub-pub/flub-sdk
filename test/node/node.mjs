import FlubSDK from '../../build/index.js'

// Instantiate FlubClient
const FlubClient = new FlubSDK.Client({
    baseUrl: 'http://127.0.0.1:8787'
})
console.log(FlubClient);

// Login with user
(async () => {
    const loginResponse = await FlubClient.AuthUser.login({
        email: 'testuser1@flub.pub',
        password: 'password123'
    })
    console.log('loginResponse', loginResponse);
})()
