# Collaboratory App Example

## Up and running

### Install your environment

```bash
virtualenv venv
. venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
```

### Trust SSL certificate

You also need to *trust the SSL certificate* in
ssl/localhost.crt. Even better is to replace it with your own.  The
procedure for generating a self-signed certificate is readily
available on-line.

### Create a new HBP OpenID Connect client

The OpenID Connect Client Manager can be found in the Collaboratory at this url:

https://collab.humanbrainproject.eu/#/collab/54/nav/1051

When configuring you test client.
1. Pick a meaningful name (probably something related to your App name)
1. Select 'Server flow' application type
1. Add to 'Authorized redirect URL' a local testing url: ```https://localhost:8000/complete/hbp/```
1. Ensure that the scopes hbp.collab, hbp.document and hbp.notification.self are checked.
1. Save your client registration

Save the "Client ID" and "Client Secret" values for the next step.

### Define your environment

Copy .env-sample to .env

Replace SECRET_KEY with the output of the following command:

OSX:
```bash
date | md5
```
Linux or Cygwin:
```bash
date | md5sum
```

Replace `HBP_OIDC_CLIENT*` with the data collected from the OpenID Connect Client Manager in the previous step.


```bash
cp .env-sample .env
```

### Start the server

You can then start the server

```bash
python manage.py runsslserver --certificate=ssl/localhost.crt --key=ssl/localhost.key
```

### Start the server
From another terminal open an example URL to test your new app:

OSX:
```bash
open https://localhost:8000?ctx=2BB5C05D-C417-4ED7-8D4D-C4F940DA8328
```

Linux:
```bash
xdg-open https://localhost:8000?ctx=2BB5C05D-C417-4ED7-8D4D-C4F940DA8328
```
