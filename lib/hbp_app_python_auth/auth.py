'''OAuth2 authentication handler'''
from social.backends.oauth import BaseOAuth2
from bbp_services.client import get_services
from jwt import decode as jwt_decode

import time

import hbp_app_python_auth.settings as s


def get_auth_header(social_auth):
    '''Return authentication header'''
    return '%s %s' % (get_token_type(social_auth), get_access_token(social_auth))


def get_token_type(social_auth):
    '''Get token type, which is Bearer'''
    return social_auth.extra_data['token_type']


def get_access_token(social_auth):
    '''Return the access token for the given user, after ensuring that it
    has not expired, or refreshing it if so.'''

    access_token = social_auth.extra_data['access_token']
    refresh_token = social_auth.extra_data['refresh_token']
    decoded_token = jwt_decode(access_token, options={'verify_signature': False,
                                                      'verify_nbf': False,
                                                      'verify_exp': False,
                                                      'verify_aud': False})
    expires_on = decoded_token['exp']

    if expires_on - 60 <= int(time.time()):
        backend = social_auth.get_backend_instance()
        new_token_response = backend.refresh_token(token=refresh_token)
        access_token = new_token_response['access_token']
        social_auth.extra_data['access_token'] = access_token
        social_auth.save()

    return access_token


class HbpAuth(BaseOAuth2):
    '''HBP OpenID Connect authentication backend'''

    name = 'hbp'

    oidc_service = get_services()['oidc_service'][s.ENV]
    oidc_url = oidc_service['url']
    oidc_api_url = oidc_service['api_url']

    AUTHORIZATION_URL = oidc_url + 'authorize'

    ACCESS_TOKEN_URL = oidc_url + 'token'
    ACCESS_TOKEN_METHOD = 'POST'

    REVOKE_TOKEN_URL = oidc_url + 'revoke'
    REVOKE_TOKEN_METHOD = 'GET'

    USER_DATA_URL = oidc_api_url + '/user/me'

    REDIRECT_STATE = False

    EXTRA_DATA = [
        ('refresh_token', 'refresh_token', True),
        ('expires_in', 'expires'),
        ('token_type', 'token_type', True),
    ]

    def get_key_and_secret(self):
        """Return tuple with Consumer Key and Consumer Secret for current
        service provider. Must return (key, secret), order *must* be respected.
        """
        return s.SOCIAL_AUTH_HBP_KEY, s.SOCIAL_AUTH_HBP_SECRET

    def uses_redirect(self):
        '''Return True if this provider uses redirect url method,
        otherwise return false. We return false so auth_html can
        return our custom script to logout if necessary'''
        return False

    def auth_html(self):
        '''Return login HTML content'''
        return '''
            <html><body><script>
                var oReq = new XMLHttpRequest();
                oReq.onload = function() {
                    if (this.status !== 200 && window.parent && window !== window.top) {
                        window.parent.postMessage({eventName: "oidc.logout",
                                                   data: { clientId: "%s"}},
                                                   "*");
                    } else {
                        window.location.href = "%s"
                    };
                };
                oReq.open("get", "%ssession", true);
                oReq.withCredentials = true;
                oReq.send();
            </script></body></html>''' % (s.SOCIAL_AUTH_HBP_KEY, self.auth_url(), self.oidc_url)

    def revoke_token_params(self, token, uid):
        return {'token': token}

    def revoke_token_headers(self, token, uid):
        return {'Content-type': 'application/json'}

    def get_user_details(self, response):
        '''Return user details from HBP account'''
        email = next(obj['value'] for obj
                     in response.get('emails') if obj['primary'])

        data = {'username': response.get('username'),
                'email': email or '',
                'first_name': response.get('familyName'),
                'last_name': response.get('givenName'), }
        # only set those if there is a positive match to allow resetting
        # existing values
        if data['username'] in s.SUPER_USER_NAMES:
            data['is_superuser'] = True
        if data['username'] in s.STAFF_USER_NAMES:
            data['is_staff'] = True
        return data

    def user_data(self, access_token, *args, **kwargs):
        '''Return user data from HBP API'''
        return self.get_json(self.USER_DATA_URL, headers={
            'Authorization': 'Bearer %s' % access_token
        })
