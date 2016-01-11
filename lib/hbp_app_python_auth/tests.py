'''Tests'''

from nose.tools import eq_, ok_
from unittest import TestCase
from mock import MagicMock

from mock import patch

from hbp_app_python_auth.auth import get_auth_header

EXPIRED_TOKEN = '''eyJhbGciOiJSUzI1NiJ9.\
eyJleHAiOjE0MzgyNjEyNzgsImF1ZCI6WyJwb3J0YWwtY2xpZW50Il0sImlzcyI6Imh0dHBzOlwvXC9zZXJ2aWNlcy1k\
ZXYuaHVtYW5icmFpbnByb2plY3QuZXVcL29pZGNcLyIsImp0aSI6ImY0NzViODQ1LWU5NGItNDMzZi1iZjY2LWJiZTVh\
NzQ1OTMwMyIsImhicF9zaWQiOiJqdjFqN3NtMXhxYm51Znp6dGxpbW5jb2QiLCJpYXQiOjE0MzgwODg0Nzh9.waCurhY\
k_DfrO4q5YE5OOzFo1I_XJFEXPt1OCYC9QqqRplF-CEEhmw9sec48PcAKh6_47xZtJL4cS_xch3S1NIchvqvXcZUqPQ8\
9snFlVvrvcYIf0SlN44B5WB55_Qj1kWxHGjqNANq4qa0tEoG2yKu65OtSJia3B3aCsB6S1q8'''

NEW_TOKEN = '''NEW_TOKEN'''

class HbpAuthTest(TestCase):

    def test_hbp_auth(self):
        with patch('bbp_services.client.get_services') as m:
            m.return_value = {'oidc_service': {'prod': {'url': 'url', 'api_url': 'api_url'}}}
            from hbp_app_python_auth.auth import HbpAuth

            auth = HbpAuth()

            httpResponseMock = MagicMock()
            httpResponseMock.get = MagicMock(return_value=[{ 'immutable': True, 'primary': True, 'value': 'email@dot.com' }])

            details = auth.get_user_details(httpResponseMock)
            eq_(details['email'], 'email@dot.com')

            eq_(auth.revoke_token_params('token', 'uuid'), {'token': 'token'})

            eq_(auth.revoke_token_headers('token', 'uuid'), {'Content-type': 'application/json'})

    def test_get_user_profile(self):
        def profile_for_user(username, staff=[], superuser=[]):
            from hbp_app_python_auth.auth import HbpAuth
            import hbp_app_python_auth.settings as s
            def details_side_effect(key):
                if key == 'username':
                    return username
                elif key == 'familyName':
                    return 'Bob'
                elif key == 'givenName':
                    return 'Brain'
                elif key == 'emails':
                    return [{ 'immutable': True, 'primary': True, 'value': '%s@example.com' % username }]
            s.SUPER_USER_NAMES = superuser
            s.STAFF_USER_NAMES = staff
            auth = HbpAuth()
            httpResponseMock = MagicMock()
            httpResponseMock.get.side_effect = details_side_effect
            details = auth.get_user_details(httpResponseMock)
            return details

        eq_(profile_for_user('bob').get('is_superuser'), None)
        eq_(profile_for_user('bob').get('is_staff'), None)
        eq_(profile_for_user('bob', superuser=['bob']).get('is_superuser'), True)
        eq_(profile_for_user('bob', superuser=['bob']).get('is_staff'), None)
        eq_(profile_for_user('bob', staff=['bob']).get('is_superuser'), None)
        eq_(profile_for_user('bob', staff=['bob']).get('is_staff'), True)
        eq_(profile_for_user('bob', staff=['bob'], superuser=['bob']).get('is_superuser'), True)
        eq_(profile_for_user('bob', staff=['bob'], superuser=['bob']).get('is_staff'), True)

    @patch('requests.get')
    def test_auth_header(self, mock_request_response):
        social_auth = MagicMock()
        social_auth.extra_data = {'access_token': EXPIRED_TOKEN, 'refresh_token': 'refresh_token', 'token_type': 'Bearer'}
        backend = MagicMock()
        backend.refresh_token.return_value = {'access_token': NEW_TOKEN}
        social_auth.get_backend_instance.return_value = backend
        mock_request_response.return_value.status_code = 200
        eq_('Bearer ' + NEW_TOKEN, get_auth_header(social_auth))
