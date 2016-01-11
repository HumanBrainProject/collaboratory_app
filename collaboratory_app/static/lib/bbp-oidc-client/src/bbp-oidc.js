/* global jso_configure, jso_ensureTokens, jso_getToken, jso_wipe */
(function(exp){
    'use strict';

    /* http://andrewdupont.net/2009/08/28/deep-extending-objects-in-javascript/ */
    function deepExtend(destination, source) {
        for (var property in source) {
            if (source[property] && source[property].constructor &&
                source[property].constructor === Object) {
                destination[property] = destination[property] || {};
                deepExtend(destination[property], source[property]);
            } else {
                destination[property] = source[property];
            }
        }
        return destination;
    }

    function JsoWrapper(options) {
        var provider, jsoConfig, jsoOptions, scopes;

        provider = options.clientId + '@' + options.authServer;
        jsoConfig = {
            client_id: options.clientId,
            redirect_uri: options.redirectUri,
            authorization: options.authServer+'/authorize'+(
                options.alwaysPromptLogin ? '?prompt=login' : ''
            ),
            auth_server: options.authServer+'/',
            jsonWebKeys: options.jsonWebKeys
        };
        jsoOptions = {
            debug: options.debug,
            // should contains {access_token, scopes[], expires_in, token_type}
            token: (options.token ?
                { provider: provider, value: options.token } :
                null)
        };
        scopes = options.scopes;

        this.configure = function() {
            var providerConfig = {};
            providerConfig[provider] = jsoConfig;
            return jso_configure(providerConfig, jsoOptions);
        };

        this.ensureTokens = function() {
            var scopesToEnsure = {};
            scopesToEnsure[provider] = scopes;
            return jso_ensureTokens(scopesToEnsure);
        };

        this.getToken = function() {
            return jso_getToken(provider, scopes);
        };

        this.wipe = function() {
            return jso_wipe();
        };
    }

    /*
     * the options are:
     *  - clientId: string - Oauth client id (required)
     *  - authServer: string - authentication server url (default: https://services.humanbrainproject.eu/oidc/)
     *  - redirectUri: string - URL where to redirect after authentication.
     *    The URL must be configured in the Oauth client configuration. (default: document.URL)
     *  - scopes: array<string> - list of scopes to request (default: null)
     *  - alwaysPromptLogin: boolean - if `true` if will always prompt for credentials.
     *    For collaboratory apps MUST be `false`. (default: false)
     *  - token: string - the token, if available (default: null)
     *  - debug: boolean - flag to enable debug logs (default: false)
     */
    function BbpOidcClient(options) {
        var initialized = false,
            _ensureToken = true,
            jso;

        // default values
        var defaultOpts = {
            authServer: 'https://services.humanbrainproject.eu/oidc',
            debug: false,
            redirectUri: document.URL,
            scopes: null,
            alwaysPromptLogin: false,
            jsonWebKeys: {
                keys: [{
                    alg: 'RS256',
                    e: 'AQAB',
                    kty: 'RSA',
                    kid: 'bbp-oidc',
                    n: 'zlJpDPnGMUV5FlwQs5eIs77pdZTST29TELUT3_E1sKrN-lE4rEgbQQ5qU1KvF5669VmVeAt' +
                        '-BQ2qMjGjUyl44gq-aUkeQV7MXfYJfKHIULZMTGR0lJ4ebPRQgM5OWDNjYVbASAOz0NyO6' +
                        '46G5H5BlHZrA9ADyrZYZ4CEhfI1KBk'
                }]
            },
            token: null
        };

        var opts = deepExtend(defaultOpts, options);

        var init = function(force) {
            if (!initialized || force) {
                initialized = false;

                jso = new JsoWrapper(opts);
                jso.configure();

                // This check has to occurs every time.
                if (_ensureToken) {
                    if(!jso.getToken()) {
                        // if there's no token, check if the session with oidc is still active
                        getTokenOrLogout();
                    }
                }

                initialized = true;
            }
        };

        var login = function() {
            return jso.ensureTokens();
        };

        var logout = function() {
            // Ensure we have a token.
            var token = getToken();
            var localRemoval = function() {
                // We need to keep the token to generate
                // Bearer for this request. Hence the reset only after.
                jso.wipe();

                if (_ensureToken) {
                    login();
                }
            };

            var oReq = new XMLHttpRequest();
            oReq.onload = localRemoval;
            oReq.open('post', opts.authServer + '/slo', true);
            oReq.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            oReq.withCredentials = true;
            oReq.send(JSON.stringify({ token: token }));
        };

        var getToken = function() {
            return jso.getToken();
        };

        /**
         * checks if the session with oidc is still active; if so, tries to get
         * a new token, otherwise notifies the parent window.
         */
        var getTokenOrLogout = function() {
            var clientId = opts.clientId;
            isSessionActive(function(active) {
                if(!active) {
                    // notify the parent window that a new login is needed
                    postLogoutMsg(clientId);
                }
                // ensure token in any case
                // if active == true, it will get a new token, otherwise redirect to login
                jso.ensureTokens();
            });
        };

        var postLogoutMsg = function(clientId) {
            if(window.parent && window !== window.top) {
                window.parent.postMessage({
                    eventName: 'oidc.logout',
                    data: {
                        clientId: clientId
                    }
                }, '*');
            }
        };

        var isSessionActive = function(callback) {
            var oReq = new XMLHttpRequest();
            oReq.onload = function() {
                if(callback) {
                    callback(this.status === 200);
                }
            };

            oReq.open('get', opts.authServer + '/session', true);
            oReq.withCredentials = true;
            oReq.send();
        };

        init(true);

        return {
            setAlwaysPromptLogin: function(value) {
                opts.alwaysPromptLogin = !!value;
                init(true);
            },
            setEnsureToken: function(value) {
                _ensureToken = !!value;
                init(true);
            },
            isEnsureToken: function() {
                return _ensureToken;
            },
            getTokenOrLogout: getTokenOrLogout,
            getToken: getToken,
            wipeToken: jso.wipe,
            logout: logout,
            login: login
        };
    }

    exp.BbpOidcClient = BbpOidcClient;

})(window);
