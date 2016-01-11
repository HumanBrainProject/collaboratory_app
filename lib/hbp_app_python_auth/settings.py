'''
These should be overwritten by library client.
'''

# Used to access the correct environment service endpoints
# valid values are `devel`, `staging`, `prod`
ENV = 'prod'

# Your application OpenID Connect id
SOCIAL_AUTH_HBP_KEY = ''
# Your application OpenID Connect secret key
SOCIAL_AUTH_HBP_SECRET = ''
# List of super user names. When those usernames are found after login,
# they are flagged superuser
SUPER_USER_NAMES = []
# List of staff users who can access the admin pages
STAFF_USER_NAMES = []
