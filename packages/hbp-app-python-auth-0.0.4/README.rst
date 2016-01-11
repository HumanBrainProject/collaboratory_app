hbp-app-python-auth
===================

A python library package which provides HBP python OAuth2 module

Installation
------------

.. code:: console

        $ virtualenv venv
        $ source venv/bin/activate
        (venv)$ pip install hbp-app-python-auth

Configuration
-------------

.. code:: python

        # configure which environment service endpoints should be used
        import hbp_app_python_auth.settings as auth_settings

        ENV = 'prod'
        auth_settings.ENV = ENV

        auth_settings.SOCIAL_AUTH_HBP_KEY = 'client key'
        auth_settings.SOCIAL_AUTH_HBP_SECRET = 'client secret'

        auth_settings.SUPER_USER_EMAILS = ['super@example.com',]
        auth_settings.STAFF_USER_NAMES = ['bozo@example.com', 'super@example.com',]

        from hbp_app_python_auth.auth import HbpAuth
