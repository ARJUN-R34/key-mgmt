const { getRequest, postRequest, accessTokenRequest, getAccessToken } = require('./utils');
const { BASE_URL } = require('./config')

const realmName = 'testrealm';
const username = 'arjun1709@gmail.com';
const password = 'password';

async function registerClient({ clientName: clientId, redirectUris }) {
    const { response } = await getClientIdAndSecret({ clientId });

    if (response) {
        return { error: [ { name: 'clientId', message: 'client id already exists.' } ] }
    }

    const { response: token, error: err } = await getAccessToken();

    if (err) {
        return { err };
    }

    const registerClientUrl = `${BASE_URL}/${realmName}/clients`;

    const params = {
        clientId,
        protocol: 'openid-connect',
        publicClient: false,
        bearerOnly: false,
        redirectUris
    }

    const { error: fail } = await postRequest({ params, url: registerClientUrl, accessToken: token.accessToken });
  
    if (fail) {
        return { error: fail };
    }
      
    return { response: 'Successfully registered the client.' }
}

async function getClientIdAndSecret({ clientId }) {
    const { response: token, error: err } = await getAccessToken();

    if (err) {
        return { err };
    }

    const clientIdUrl = `${BASE_URL}/${realmName}/clients?clientId=${clientId}`;

    const { response: clientid } = await getRequest({ url: clientIdUrl, accessToken: token.accessToken });

    if (clientid.length === 0) {
        return { error: [ { name: 'client', message: 'This client does\'nt exist.' } ] }
    }

    const client = clientid[0].id;

    const clientSecretUrl = `${BASE_URL}/${realmName}/clients/${client}/client-secret`;

    const { response: clientSecret, error: fail } = await getRequest({ url: clientSecretUrl, accessToken: token.accessToken });

    if (fail) {
        return { error: [ { name: 'client', message: 'This client does\'nt exist.' } ] }
    }
    
    return { response: { clientId: client, clientSecret: clientSecret.value } }
}

async function authorizeCreds({ clientId, clientSecret }) {
    const url = `${BASE_URL}/${realmName}/protocol/openid-connect/token`;

    const params = {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'password',
        username,
        password
    }

    const { response, error } = await accessTokenRequest({ params, url });
  
    if (response) {
      const { access_token, refresh_token } = response;
      return { response: { accessToken: access_token, refreshToken: refresh_token } };
    }

    return { error };
}

module.exports = { registerClient, getClientIdAndSecret, authorizeCreds }
