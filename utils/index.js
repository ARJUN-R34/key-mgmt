const axios = require('axios');
const qs = require('qs');

const realmName = 'testrealm';
const username = 'arjun1709@gmail.com';
const password = 'password';

async function getRequest({ url, accessToken }) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return { response: response.data };
  } catch (error) {
    return { error: error.response.data };
  }
}

async function accessTokenRequest({ params, url }) {
    try {
      const response = await axios({
        url,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(params),
      });

      return { response: response.data };
    } catch (error) {
      return { error: error.response.data };
    }
}

async function postRequest({ params, url, accessToken }) {
  try {
    const response = await axios({
      url,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: params,
    });

    return { response: response.data };
  } catch (error) {
    return { error: error.response.data };
  }
}

async function getAccessToken() {
  const url = `http://localhost:8080/auth/realms/${realmName}/protocol/openid-connect/token`;
  const params = {
      client_id: 'admin-cli',
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

module.exports = { getRequest, postRequest, accessTokenRequest, getAccessToken };