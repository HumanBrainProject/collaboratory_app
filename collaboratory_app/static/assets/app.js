angular.module('XkcdApp', ['hbpCommon'])
.config(['bbpOidcSessionProvider' ,function(bbpOidcSessionProvider){
    // force the app to have a token when bbpOidcSession is required for
    // the first time.
    bbpOidcSessionProvider.ensureToken(true);
    // for proper logout, we need to act on the way we login.
    // bbpOidcSessionProvider.alwaysPromptLogin(true);
}])
.controller('EditController', EditController)

function EditController($scope, $http, bbpConfig, hbpDialogFactory, hbpErrorService, bbpOidcSession) {
  var vm = this;
  bbpOidcSession.login();

  vm.xkcdData = null;

  activate();

  ////////////////////////////

  function getRandomXkcd() {
    $http.get('/random_xkcd').then(function(res) {
      vm.xkcdData = res.data;
      vm.model.xkcd_num = res.data.num;
    }).catch(notifyError);
  }

  function activate() {
    vm.model = bbpConfig.get('local.model')
    getRandomXkcd();
  }

  function notifyError(res) {
    hbpDialogFactory.error(hbpErrorService.httpError(res));
  }
}
