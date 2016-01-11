angular.module('hbp-common-templates', ['templates/breadcrumb.html', 'templates/content-description.html', 'templates/content-icon.html', 'templates/dialog-alert.html', 'templates/dialog-confirmation.html', 'templates/error-alert.html', 'templates/error-message.html', 'templates/icon.html', 'templates/userSelector.html', 'templates/usercard.html']);

angular.module("templates/breadcrumb.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/breadcrumb.html",
    "<ol class=\"breadcrumb\">\n" +
    "    <li ng-repeat=\"item in parentItems\"\n" +
    "        ><a ng-href=\"{{urlForState(item.state, item.stateParams)}}\"\n" +
    "            ><hbp-icon type=\"item.type\"></hbp-icon>\n" +
    "            <span class=\"breadcrumb-item-name {{item.class}}\">{{item.name}}</span\n" +
    "        ></a\n" +
    "    ></li\n" +
    "    ><li\n" +
    "        ><hbp-icon type=\"currentItem.type\"></hbp-icon>\n" +
    "        <span class=\"breadcrumb-item-name {{currentItem.class}}\">{{currentItem.name}}</span\n" +
    "    ></li>\n" +
    "</ol>\n" +
    "");
}]);

angular.module("templates/content-description.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/content-description.html",
    "<span ng-switch=\"content\">\n" +
    "    <span ng-switch-when=\"application/vnd.bbp.FeatureExtract.Dependency+txt\">Text FeatureExtract</span>\n" +
    "    <span ng-switch-when=\"application/vnd.bbp.SimulationProtocol.StimulationConfig\">Simulation Configuration</span>\n" +
    "    <span ng-switch-when=\"application/vnd.bbp.SimulationProtocol.ReportingConfig\">Reporting Configuration</span>\n" +
    "    <span ng-switch-when=\"application/vnd.bbp.Circuit.Config+config\">Circuit Configuration</span>\n" +
    "    <span ng-switch-when=\"application/vnd.bbp.Circuit.Config\">Circuit Configuration</span>\n" +
    "    <span ng-switch-when=\"application/vnd.bbp.Circuit.Combination\">Circuit Combination</span>\n" +
    "    <span ng-switch-when=\"application/vnd.bbp.Circuit.Combination+xml\">XML Circuit Combination</span>\n" +
    "    <span ng-switch-when=\"application/vnd.bbp.Simulation.BlueConfig\">BlueConfig File</span>\n" +
    "    <span ng-switch-when=\"application/vnd.bbp.Simulation.HOC\">HOC Simulation</span>\n" +
    "    <span ng-switch-when=\"application/vnd.bbp.bundle.Image.png\">Image Bundle</span>\n" +
    "    <span ng-switch-when=\"application/zip\">Archive</span>\n" +
    "    <span ng-switch-when=\"application/rar\">Archive</span>\n" +
    "    <span ng-switch-when=\"application/json\">JSON</span>\n" +
    "    <span ng-switch-when=\"application/txt\">Plain Text</span>\n" +
    "    <span ng-switch-when=\"text/plain\">Plain Text</span>\n" +
    "    <span ng-switch-when=\"image/jpeg\">JPEG Image</span>\n" +
    "    <span ng-switch-when=\"image/png\">PNG Image</span>\n" +
    "    <span ng-switch-when=\"image/gif\">GIF Image</span>\n" +
    "    <span ng-switch-when=\"video/avi\">AVI Video</span>\n" +
    "    <span ng-switch-when=\"video/mpg\">MPEG Video</span>\n" +
    "    <span ng-switch-when=\"model/vnd.bbp.Morphology.Morphology\">Morphology</span>\n" +
    "    <span ng-switch-when=\"model/vnd.bbp.Morphology.Morphology+asc\">ASCI Morphology</span>\n" +
    "    <span ng-switch-when=\"model/vnd.bbp.Morphology.Morphology+h5\">H5 Morphology</span>\n" +
    "    <span ng-switch-when=\"model/vnd.bbp.Morphology.NeuronDB\">DAT NeuronDB</span>\n" +
    "    <span ng-switch-when=\"model/vnd.bbp.Morphology.NeuronDB+dat\">DAT NeuronDB</span>\n" +
    "    <span ng-switch-default>{{fallback}}</span>\n" +
    "</span>\n" +
    "");
}]);

angular.module("templates/content-icon.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/content-icon.html",
    "<span class=\"bbp-browser-entity-icon\" ng-switch=\"content\">\n" +
    "    <i ng-switch-when=\"application/zip\" class=\"fa fa-file-archive-o\"></i>\n" +
    "    <i ng-switch-when=\"application/rar\" class=\"fa fa-file-archive-o\"></i>\n" +
    "    <i ng-switch-when=\"application/txt\" class=\"fa fa-file-text-o\"></i>\n" +
    "    <i ng-switch-when=\"text/plain\" class=\"fa fa-file-text-o\"></i>\n" +
    "    <i ng-switch-when=\"application/pdf\" class=\"fa fa-file-pdf-o\"></i>\n" +
    "    <i ng-switch-when=\"image/jpeg\" class=\"fa fa-file-image-o\"></i>\n" +
    "    <i ng-switch-when=\"image/png\" class=\"fa fa-file-image-o\"></i>\n" +
    "    <i ng-switch-when=\"image/gif\" class=\"fa fa-file-image-o\"></i>\n" +
    "    <i ng-switch-when=\"application/json\" class=\"fa fa-file-code-o\"></i>\n" +
    "    <i ng-switch-when=\"video/avi\" class=\"fa fa-file-video-o\"></i>\n" +
    "    <i ng-switch-when=\"video/mpeg\" class=\"fa fa-file-video-o\"></i>\n" +
    "    <i ng-switch-default class=\"fa fa-file-o\"></i>\n" +
    "</span>\n" +
    "");
}]);

angular.module("templates/dialog-alert.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/dialog-alert.html",
    "<div class=\"modal-header\"  >\n" +
    "    <button type=\"button\" class=\"close\" ng-click=\"$close()\" aria-hidden=\"true\">&times;</button>\n" +
    "    <h4 class=\"modal-title\">{{title}}</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body {{htmlClass}}\">\n" +
    "    <ng-include src=\"alertContentUrl\"></ng-include>\n" +
    "    {{alertContent}}\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-default\" ng-click=\"$close()\">{{label}}</button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/dialog-confirmation.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/dialog-confirmation.html",
    "<div class=\"modal-header\"  >\n" +
    "    <button type=\"button\" ng-show=\"closable\" class=\"close\" ng-click=\"$dismiss('cancel')\" aria-hidden=\"true\">&times;</button>\n" +
    "    <h4 class=\"modal-title\">{{title}}</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    <alert ng-if=\"error\" type=\"danger\">{{error.reason}}</alert>\n" +
    "    <ng-include ng-if=\"confirmationContentUrl\" src=\"confirmationContentUrl\"></ng-include>\n" +
    "    {{confirmationContent}}\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-default\" ng-click=\"$dismiss('cancel')\">{{cancelLabel}}</button>\n" +
    "    <button class=\"btn btn-danger\" ng-click=\"$close()\">{{confirmLabel}}</button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/error-alert.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/error-alert.html",
    "<div class=\"alert alert-danger\">[{{error.type}}] {{error.message}}</div>\n" +
    "<pre><code>{{error | json}}</code></pre>\n" +
    "");
}]);

angular.module("templates/error-message.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/error-message.html",
    "<alert type=\"danger\" ng-if=\"error\">\n" +
    "    <div ng-switch on=\"error.type\">\n" +
    "        <div ng-switch-when=\"Validation\">\n" +
    "                Validation errors<span ng-show=\"error.data\">:</span>\n" +
    "            <ul>\n" +
    "            <li ng-repeat=\"(attr, errors) in error.data\">{{attr}}: {{errors.join(', ')}}</li>\n" +
    "        </ul>\n" +
    "        </div>\n" +
    "        <div ng-switch-default>\n" +
    "            {{error.message}}\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</alert>");
}]);

angular.module("templates/icon.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/icon.html",
    "<span class=\"bbp-browser-entity-icon\" ng-switch=\"type\">\n" +
    "    <i ng-switch-when=\"root\" class=\"glyphicon glyphicon-home\"></i>\n" +
    "    <i ng-switch-when=\"project\" class=\"glyphicon glyphicon-hdd\"></i>\n" +
    "    <i ng-switch-when=\"folder\" class=\"glyphicon glyphicon-folder-open\"></i>\n" +
    "    <i ng-switch-when=\"file\" class=\"glyphicon glyphicon-file\"></i>\n" +
    "    <i ng-switch-when=\"release\" class=\"glyphicon glyphicon-lock\"></i>\n" +
    "    <i ng-switch-when=\"link:folder\" class=\"glyphicon glyphicon-link\"></i>\n" +
    "    <i ng-switch-when=\"link:file\" class=\"glyphicon glyphicon-link\"></i>\n" +
    "    <i ng-switch-when=\"link:project\" class=\"glyphicon glyphicon-link\"></i>\n" +
    "    <i ng-switch-when=\"link:release\" class=\"glyphicon glyphicon-link\"></i>\n" +
    "</span>\n" +
    "");
}]);

angular.module("templates/userSelector.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/userSelector.html",
    "<div class=\"input-group hbp-user-selector\" ng-class=\"{'has-error': false}\">\n" +
    "    <input class=\"form-control\" ng-model=\"newUser\" type=\"text\" placeholder=\"type user name\"\n" +
    "      typeahead=\"user as user.displayName for user in getUsers($viewValue)\"\n" +
    "      typeahead-editable=\"false\"\n" +
    "      typeahead-on-select=\"selectUser()\"\n" +
    "      typeahead-min-length=\"3\"\n" +
    "      ng-keypress=\"noSubmitOnEnter($event)\"\n" +
    "      name=\"new-user\"\n" +
    "      ng-disabled=\"selectionDisabled\">\n" +
    "    <span class=\"input-group-btn\">\n" +
    "      <button ng-click=\"selectUser()\" class=\"btn btn-default\" type=\"button\"><i class=\"glyphicon glyphicon-plus\"></i></button>\n" +
    "    </span>\n" +
    "</div>");
}]);

angular.module("templates/usercard.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/usercard.html",
    "<div ng-if=\"user\" class=\"hbp-usercard hbp-card hbp-card-default\">\n" +
    "    <h3 class=\"hbp-usercard-name\">\n" +
    "        {{user.displayName}}\n" +
    "    </h3>\n" +
    "    <div class=\"hbp-usercard-pix\">\n" +
    "        <img ng-src=\"{{user.picture}}\" ng-if=\"user.picture\" />\n" +
    "        <hbp-generated-icon hbp-text=\"user.displayName\" ng-if=\"!user.picture\"></hbp-generated-icon>\n" +
    "    </div>\n" +
    "    <div class=\"hbp-usercard-institution\" ng-if=\"institution\">\n" +
    "        <span class=\"hbp-usercard-institution-title\">{{institution.title}}</span>,\n" +
    "        <span class=\"hbp-usercard-institution-name\">{{institution.name}}</span>,\n" +
    "        <span class=\"hbp-usercard-institution-dept\">{{institution.department}}</span>\n" +
    "    </div>\n" +
    "    <div class=\"hbp-usercard-contact\">\n" +
    "        <a class=\"hbp-usercard-contact-item hbp-usercard-email\" target=\"_top\" href=\"mailto:{{email}}\" ng-if=\"email\"><span class=\"glyphicon glyphicon-envelope\"></span> {{email}}</a>\n" +
    "        <span class=\"hbp-usercard-contact-item hbp-usercard-phone\" ng-if=\"phone\"><span class=\"glyphicon glyphicon-phone\"></span> {{phone}}</span>\n" +
    "        <span class=\"hbp-usercard-contact-item hbp-usercard-im-list\" ng-if=\"ims.length\"><span class=\"glyphicon glyphicon-bullhorn\"></span>\n" +
    "            <span class=\"hbp-usercard-im\" ng-repeat=\"im in ims\">\n" +
    "                {{im.value}}({{im.type}})\n" +
    "            </span>\n" +
    "        </span>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

/**
 * hbpUtil Module
 */
(function() {
  'use strict';

  angular.module('hbpUtil', [])
  .factory('hbpUtil', hbpUtil);

  /**
   * @namespace hbpUtil
   * @desc Application wide util functions
   */
  function hbpUtil($q, $http, hbpErrorService) {
    /**
     * @name ResultSetEOL
     * @desc error thrown when hbpUtil.ResultSet is crawled when at an
     *       extremity.
     */
    var ResultSetEOL = hbpErrorService.error({
        type: 'ResultSet::EOL',
        message: 'End of list reached'
    });

    var service = {
        format: format,
        paginatedResultSet: paginatedResultSet,
        ferr: ferr,
        ResultSetEOL: ResultSetEOL,
        arrayOf: arrayOf
    };
    return service;

    ////////////

    /**
     * @name ferr
     * @desc return a rejected promise containing an Ajax error wrapped
     *       into an HbpError.
     * @param  {HTTPError} err
     * @return {HbpError}
     * @memberOf Factories.hbpUtil
     */
    function ferr(err) {
        return $q.reject(hbpErrorService.httpError(err));
    }

    /**
     * @name paginatedResultSet
     * @memberOf hbpUtil
     * @desc
     * Return a promise that will resolve once the result set first page is loaded.
     *
     * The promise contains the `instance` of the result set as well.
     *
     * @param  {Object} res     a HTTPResponse or a promise which resolve to a HTTPResponse
     * @param  {Object} options configuration
     * @param  {string} nextUrlKey name of the attribute containing the URL to fetch next results
     * @param  {string} previousUrlKey name of the attribute containing the URL to fetch previous results
     * @param  {string} resultKey name of the attribute containing an array with all the results
     * @return {ResultSet}      a new instance of ResultSet
     */
    function paginatedResultSet(res, options) {
        return new ResultSet(res, options).promise;
    }

    /**
     * @name ResultSet
     * @memberOf hbpUtil
     * @desc
     * Build a result set with internal support for fetching next and previous results.
     *
     * @param {Object} pRes
     * @param {Object} options
     * @see {hbpUtil.paginatedResultSet}
     */
    function ResultSet(pRes, options) {
        var self = this;

        self.results = [];
        self.error = null;
        self.hasNext = null;
        self.hasPrevious = null;
        self.promise = null;
        self.errorHandler = null;
        self.next = next;
        self.previous = previous;
        self.count = -1;

        options = angular.extend({
            resultKey: 'results',
            nextUrlKey: 'next',
            previousUrlKey: 'previous'
        }, options);

        self.promise = $q.when(pRes)
        .then(initialize)
        .catch(handleError);
        self.promise.instance = self;

        /**
         * @name next
         * @memberOf hbpUtil.ResultSet
         * @desc
         * Retrieve the next result page.
         *
         * @return {Object} a promise that will resolve when the next page is fetched.
         */
        function next() {
            return enqueue(function() {
                if (!self.hasNext) {
                    return $q.reject(ResultSetEOL);
                }
                return $http.get(self.nextUrl)
                .then(handleNextResults);
            });
        }

        /**
         * @name previous
         * @memberOf hbpUtil.ResultSet
         * @desc
         * Retrieve the previous result page
         *
         * @return {Object} a promise that will resolve when the previous page is fetched.
         */
        function previous() {
            return enqueue(function() {
                if (!self.hasPrevious) {
                    return $q.reject(ResultSetEOL);
                }
                return $http.get(self.previousUrl)
                .then(handlePreviousResults);
            });
        }

        function handleNextResults(res) {
            var rs = res.data;
            self.results.push.apply(self.results, rs[options.resultKey]);
            counting(rs);
            bindNext(rs);
            return self;
        }

        function handlePreviousResults(res) {
            var rs = res.data;
            self.results.unshift.apply(self.results, rs[options.resultKey]);
            counting(rs);
            bindPrevious(rs);
            return self;
        }

        function handleError(res) {
            self.error = hbpErrorService.httpError(res);
            if(angular.isFunction(options.errorHandler)) {
                options.errorHandler(self.error);
            }
            return $q.reject(self.error);
        }

        function bindNext(rs) {
            self.nextUrl = rs[options.nextUrlKey];
            self.hasNext = !!self.nextUrl;
        }

        function bindPrevious(rs) {
            self.previousUrl = rs[options.previousUrlKey];
            self.hasPrevious = !!self.previousUrl;
        }

        function counting(rs) {
            if (rs.count) {
                self.count = rs.count;
            }
        }

        function enqueue(fn) {
            self.promise = $q
            .when(self.promise.then(fn))
            .catch(handleError);
            self.promise.instance = self;
            return self.promise;
        }

        function initialize(res) {
            handleNextResults(res);
            bindPrevious(res.data);
            return self;
        }
    }

    /**
     * @name format
     * @memberOf hbpUtil
     * @desc
     * Convenient method to retrieve a formatted string by replacing {1} markup
     * by corresponding argument in the second parameter.
     *
     * @param  {String} input the format string
     * @param  {Array} args  the arguments to infer
     * @return {String}       a formatted string
     */
    function format(input, args) {
        if(!angular.isArray(args)) {
            args = [ args ];
        }

        return input.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    }

    /**
     * @name arrayOf
     * @memberOf hbpUtil
     * @desc
     * If the given paramter is not an array, return it wrapped in a new array.
     *
     * @param  {any} obj if not an array, the value will be wrapped in one
     * @return {Array}  `obj` or an array containing `obj`
     */
    function arrayOf(obj) {
        return _.isArray(obj) ? obj : [obj];
    }

    return hbpUtil;
  }
  hbpUtil.$inject = ["$q", "$http", "hbpErrorService"];
}());

/**
 * hbpIdentity Module
 * @namespace hbpIdentity
 */
angular.module('hbpIdentity', ['hbpUtil', 'bbpConfig']);

/**
 * hbpIdentity.hbpIdentityGroupStore Factory
 * @namespace hbpIdentity
 */
(function() {
    'use strict';

    angular.module('hbpIdentity')
    .factory('hbpIdentityGroupStore', groupStore);

    /**
     * @namespace hbpIdentityGroupStore
     * @desc
     * hbpIdentity.groupStore factory let you retrieve and edit groups.
     *
     * @memberOf hbpIdentity
     */
    function groupStore($rootScope, $q, $http, $cacheFactory, bbpConfig, hbpUtil, hbpIdentityUtil) {
      var groupsCache = $cacheFactory('hbpGroupsCache');
      var groupApiUrl = bbpConfig.get('api.user.v0') + '/group/';

      var service = {
          get: get,
          getByName: getByName,
          getMembers: getMembers,
          addMembers: addMembers,
          removeMembers: removeMembers,
          list: list
      };
      return service;
      ///////////////////

      /**
       * @name get
       * @memberOf hbpIdentity.hbpIdentityGroupStore
       * @desc
       * Return a promise that will resolve to a group
       * based on the given `id`.
       *
       * In case of error, the promise is rejected with a `HbpError` instance.
       *
       * @param  {String} groupId
       * @return {Promise} a promise that resolve to a group
       */
      function get(groupId) {
          return $http.get(groupApiUrl+ groupId).then(function(resp) {
              return resp.data;
          }, hbpUtil.ferr);
      };

      /**
       * @name getMembers
       * @memberOf hbpIdentity.hbpIdentityGroupStore
       * @desc
       * Return a promise that will resolve to a paginatedResultSet of userId
       * representing all the members of `groupId`.
       *
       * In case of error, the promise is rejected with a `HbpError` instance.
       *
       * @param  {String}  groupId
       * @return {Promise} resolve to a hbpUtil.ResultSet instance
       */
      function getMembers(groupId) {
          return hbpUtil.paginatedResultSet($http.get(groupApiUrl + groupId + '/members'));
      }

      /**
       * @name addMembers
       * @memberOf hbpIdentity.hbpIdentityGroupStore
       * @desc
       * Adds all the user in `userIds` to the group `groupId`.
       * `userIds` can be either an array of ids or a single id.
       * Returns a promise that will resolve to a list of current group members.
       *
       * In case of error, the promise is rejected with a `HbpError` instance.
       *
       * @param  {String} groupId
       * @parame {Array}  userIds a list of user id string to add to this group
       * @return {Promise} resolve to a hbpUtil.ResultSet instance
       */
      function addMembers(groupId, userIds) {
        var reqData = {
            users: hbpUtil.arrayOf(userIds)
        };
        return hbpUtil.paginatedResultSet($http.put(groupApiUrl+ groupId + '/members', reqData));
      }

      /**
       * @name removeMembers
       * @memberOf hbpIdentity.hbpIdentityGroupStore
       * @desc
       * Removes all the user in `userIds` from the group `groupId`.
       * `userIds` can be either an array of ids or a single id.
       * Returns a promise that will resolve to a list of current group members.
       *
       * In case of error, the promise is rejected with a `HbpError` instance.
       * @param  {[type]} groupId [description]
       * @param  {[type]} userIds [description]
       * @return {[type]}         [description]
       */
      function removeMembers(groupId, userIds) {
          var reqData = {
              users: hbpUtil.arrayOf(userIds)
          };

          return hbpUtil.paginatedResultSet($http({
              method: 'DELETE',
              url: groupApiUrl+ groupId + '/members',
              data: reqData,
              headers: {'Content-Type': 'application/json'}
          }));
      }

      /**
       * @name getByName
       * @memberOf hbpIdentity.hbpIdentityGroupStore
       * @desc
       * return the group with the given name.
       * @param {String} groupName
       * @param {Array}  userIds a list of user id string to add to this group
       * @return {Promise} resolve to a group instance
       */
      function getByName(groupName) {
          var group = groupsCache.get(groupName);
          if(group) {
              return $q.when(group);
          }
          return list({
              filter: { name: groupName }
          }).then(function(resp) {
              if(resp.results.length === 1) {
                  groupsCache.put(groupName, resp.results[0]);
                  return resp.results[0];
              } else if(resp.results.length === 0) {
                  return undefined;
              } else {
                  return $q.reject(hbpErrorService.error({
                    type: 'UnexpectedResult',
                    message: 'More than one result has been retrieved'
                  }));
              }
          });
        }

        /**
         * @name list
         * @memberOf hbpIdentity.hbpIdentityGroupStore
         * @desc
         * Retrieves a list of users filtered, sorted and paginated according to the options.
         *
         * The returned promise will be resolved with the list of fetched user profiles.
         *
         * Available options:
         *
         * - sort: properties to sort on. prepend '-'' to reverse order.
         * - page: page to be loaded (default: 0)
         * - pageSize: max number or items to be loaded (default: 10)
         * - filter: fiter object, wildcard admitted in the values
         *
         * @return {Promise} resolves to a hbpUtil.ResultSet instance
         */
        function list(options) {
            var params = hbpIdentityUtil.queryParams(options);
            return hbpUtil.paginatedResultSet($http.get(groupApiUrl, {
                params: params
            }));
        }
    }
    groupStore.$inject = ["$rootScope", "$q", "$http", "$cacheFactory", "bbpConfig", "hbpUtil", "hbpIdentityUtil"];
}());

/**
 * hbpIdentity.userDirectory module
 * @namespace hbpIdentity
 */
(function() {
  'use strict';
  angular.module('hbpIdentity')
  .factory('hbpIdentityUserDirectory', userDirectory);

  ////////////

  /**
   * @namespace userDirectory
   * @desc
   * `hbpIdentityUserDirectory` service let you retrieve and edit user and groups.
   *
   * @memberOf hbpIdentity
   */
  function userDirectory($rootScope, $q, $http, $cacheFactory, bbpConfig, hbpUtil, hbpIdentityUtil){
    var userCache = $cacheFactory('hbpUserCache');
    var APIUrl = bbpConfig.get('api.user.v0');
    var userApiUrl = APIUrl + '/user';
    var groupApiUrl = APIUrl + '/group';
    // key used to store the logged in user in the cache
    var currentUserKey = '_currentUser_';
    var adminsGroupId = 'S12578'; // S12578 > bbp-ou-platformdev

    $rootScope.$on('user:disconnected', function() {
        userCache.removeAll();
    });

    // Create requests with a maximum length of 2000 chars
    var splitInURl = function (source, urlPrefix, destination) {
        if (source.length > 0) {
            var url = urlPrefix + source[0];
            for(var i = 1; i < source.length; i++) {
                if(url.length + source[i].length + 1 < 2000) {
                    // If we still have enough room in the url we add the id to it
                    url += '%2B' + source[i]; // %2B means +
                } else {
                    // We flush the call and start a new one
                    destination.push(url);
                    url = urlPrefix + source[i];
                }
            }
            destination.push(url);
        }
    };

    var addToCache = function (addedUserList, response) {
        for(var i = 0; i < addedUserList.length; i++) {
            var addedUser = addedUserList[i];
            if(addedUser.displayName === undefined) {
                addedUser.displayName = addedUser.name;
            }
            // add to response
            response[addedUser.id] = addedUser;
            // add to cache
            userCache.put(addedUser.id, addedUser);
        }
    };

    // Return a promise with an map of id->userInfo based on the
    // provided list of IDs.
    var getPromiseId2userInfo = function(ids) {
        var deferred = $q.defer();

        var uncachedUser = [];
        var uncachedGroup = [];
        var response = {};
        var urls = [];

        var rejectDeferred = function() {
            deferred.reject.apply(deferred, ids);
        };
        var processResponseAndCarryOn = function (data) {
            addToCache(data.data.result, response);
            if(urls && urls.length > 0) {
                return $http.get(urls.shift()).then(processResponseAndCarryOn, rejectDeferred);
            } else {
                deferred.resolve(response);
            }
        };

        _.forEach(ids, function(id) {
            var user = userCache.get(id);
            if(user) { // The id is already cached
                response[id] = user;
            } else {
                if(id[0] === 'S') {
                    // The id is from a group
                    uncachedGroup.push(id);
                } else {
                    // The id is from a user
                    uncachedUser.push(id);
                }
            }
        });

        if(uncachedUser.length + uncachedGroup.length === 0) {
            // All ids are already available -> we resolve the promise
            deferred.resolve(response);
        } else {
            // Get the list of URLs to call
            splitInURl(uncachedUser, userApiUrl + '?filter=id=', urls);
            splitInURl(uncachedGroup, groupApiUrl + '?filter=id=', urls);

            // Async calls and combination of result
            $http.get(urls.shift()).then(processResponseAndCarryOn, rejectDeferred);
        }

        return deferred.promise;
    };

    var isGroupMember = function(groups) {
        return this.getCurrentUser().then(function(user) {
            var groupList = _.isArray(groups) ? groups : [groups];
            return _.some(groupList, function (group){
                return user.groups.indexOf(group) > -1;
            });
        });
    };

    return {
        /**
         * @name get
         * @desc
         * Return a promise that will resolve to a list of groups and users
         * based on the given array of `ids`.
         *
         * In case of error, the promise is rejected with a `HbpError` instance.
         *
         * @memberOf hbpIdentity.hbpIdentityUserDirectory
         * @function
         */
        get: getPromiseId2userInfo,

        /**
         * @name getCurrentUserOnly
         * @desc
         * Return a promise that will resolve to the current user, NOT including group
         * info.
         *
         * In case of error, the promise is rejected with a `HbpError` instance.
         *
         * @memberOf hbpIdentity.hbpIdentityUserDirectory
         * @function
         */
        getCurrentUserOnly: function() {
            var user = userCache.get(currentUserKey);
            if(user) {
                return $q.when(user);
            }
            // load it from user profile service
            return $http.get(userApiUrl + '/me').then(
                function(userData) {
                    // merge groups into user profile
                    var profile = userData.data;

                    // add to cache
                    userCache.put(currentUserKey, profile);
                    return profile;
                }, hbpUtil.ferr);
        },

        /**
         * @name getCurrentUser
         * @desc
         * Return a promise that will resolve to the current user.
         *
         * In case of error, the promise is rejected with a `HbpError` instance.
         *
         * @memberOf hbpIdentity.hbpIdentityUserDirectory
         * @function
         */
        getCurrentUser: function() {
            var user = userCache.get(currentUserKey);
            if(user && user.groups) {
                return $q.when(user);
            }

            var request = {};
            if(!user){
                request.user = this.getCurrentUserOnly();
            }
            request.groups = $http.get(userApiUrl + '/me/groups');
            // load it from user profile service
            return $q.all(request).then(function(aggregatedData) {
                // merge groups into user profile
                var profile = aggregatedData.user || user;
                profile.groups = aggregatedData.groups.data.result;

                // add to cache
                userCache.put(currentUserKey, profile);
                return profile;
            }, hbpUtil.ferr);
        },

        /**
         * @name create
         * @desc
         * Create the given `user`.
         *
         * The method return a promise that will resolve to the created user instance.
         * In case of error, a `HbpError` instance is retrieved.
         *
         * @memberOf hbpIdentity.hbpIdentityUserDirectory
         * @function
         */
        create: function (user) {
            return $http.post(userApiUrl, user).then(
                function() {
                    return user;
                },
                hbpUtil.ferr
            );
        },

        /**
         * @name update
         * @desc
         * Update the described `user` with the given `data`.
         *
         * If data is omitted, `user` is assumed to be the updated user object that
         * should be persisted. When data is present, user can be either a `User`
         * instance or the user id.
         *
         * The method return a promise that will resolve to the updated user instance.
         * Note that this instance is a copy of the user. If you own a user instance
         * already, you cannot assume this method will update it.
         *
         * @memberOf hbpIdentity.hbpIdentityUserDirectory
         * @function
         */
        update: function(user, data) {
            data = data || user;
            var id = (typeof user === 'string' ? user : user.id);
            return $http.put(userApiUrl + '/' + id, data).then(
                function() {
                    userCache.remove(id);
                    var cachedCurrentUser = userCache.get(currentUserKey);
                    if (cachedCurrentUser && cachedCurrentUser.id === id) {
                        userCache.remove(currentUserKey);
                    }
                    return getPromiseId2userInfo([id]).then(
                        function(users) {
                            return _.first(_.values(users));
                        }
                    );
                },
                hbpUtil.ferr
            );
        },

        /**
         * @name list
         * @desc
         * Retrieves a list of users filtered, sorted and paginated according to the options.
         *
         * The returned promise will be resolved with the list of fetched user profiles
         * and 2 fuctions (optional) to load next page and/or previous page.
         * {{next}} and {{prev}} returns a promise that will be resolved with an object
         * like the one returned by the current function.
         *
         * Return object example:
         * {
         *    results: [...],
         *    next: function() {},
         *    prev: function() {}
         * }
         *
         * Available options:
         *
         * * sort: properties to sort on. prepend '-'' to reverse order.
         * * page: page to be loaded (default: 0)
         * * pageSize: max number or items to be loaded (default: 10)
         * * filter: fiter object, wildcard admitted in the values
         * * managedOnly: returns only the users managed by the current logged in user
         *
         *
         * @memberOf hbpIdentity.hbpIdentityUserDirectory
         * @function
         */
        list: function(options) {
            var params = hbpIdentityUtil.queryParams(options);
            var endpoint = userApiUrl;
            if(options && options.managedOnly) {
                endpoint += '/managed';
            }

            return hbpUtil.paginatedResultSet($http.get(endpoint, {
              params: params
            }), {
              resultKey: 'result'
            });
        },

        /**
         * @name isAdmin
         * @desc
         * Return a promise that will resolve to true if the current user is an administrator.
         *
         * @memberOf hbpIdentity.hbpIdentityUserDirectory
         * @function
         */
        isAdmin: function() {
            return this.getCurrentUser().then(function(user) {
                return user.groups && user.groups.indexOf(adminsGroupId) > -1;
            });
        },

        /**
         * @name isGroupMember
         * @desc
         * Return a promise that will resolve to true if the current user is a member of one of the groups in input.
         *
         * `groups` can be either a string or an array.
         *
         * @memberOf hbpIdentity.hbpIdentityUserDirectory
         * @function
         */
        isGroupMember: isGroupMember
    };
  }
  userDirectory.$inject = ["$rootScope", "$q", "$http", "$cacheFactory", "bbpConfig", "hbpUtil", "hbpIdentityUtil"];

}());

/**
 * hbpIdentity.util Factory
 * @namespace hbpIdentity
 */
(function() {
  'use strict';

  angular.module('hbpIdentity')
  .factory('hbpIdentityUtil', hbpIdentityUtil);

  ///////////////

  /**
   * @namespace hbpIdentityUtil
   * @desc
   * hbpIdentityUtil grouprs together useful function for the hbpIdentity module.
   * @memberOf hbpIdentity
   */
  function hbpIdentityUtil() {
    var service = {
      queryParams: queryParams
    }
    return service;
  }

  /**
   * @name queryParams
   * @memberOf hbpIdentity.hbpIdentityUtil
   * @desc
   * Accept an object with the following attributes:
   *
   * - page: the result page to load (default: 0)
   * - pageSize: the size of a page (default: 25)
   * - filter: an Object containing the field name as key and
   *           the query as a String or an Array of strings
   * - sort: the ordering columns as a string or an array of string
   *
   * @param  {Object} options sort and filter keys
   * @return {Object}         params suitable for $http requests
   */
  function queryParams(options) {
      var defaultOptions = {
          page: 0,
          pageSize: 10
      };
      var opt = angular.extend(defaultOptions, options);

      var filterStr;
      if(opt.filter) {
          var filterArr = _.map(opt.filter, function(val, key) {
              if(_.isArray(val)) {
                  val = val.join('+');
              }
              return key + '=' + val;
          });
          filterStr = filterArr.join();
      }

      var sortStr;
      if(opt.sort) {
          if(_.isArray(opt.sort)) {
              sortStr = opt.sort.join();
          } else {
              sortStr = _(opt.sort).toString();
          }
      }

      return {
          page: opt.page,
          pageSize: opt.pageSize,
          filter: filterStr,
          sort: sortStr
      };
  }
}());

'use strict';
angular.module('hbpCommonUI', ['ui.bootstrap']);
angular.module('hbpCommon', [
  'hbp-common-templates',
  'ui.router',
  'bbpConfig', 'bbpOidcClient',
  // hbpCommon included modules
  'hbpUtil',
  'hbpIdentity',
  'hbpCommonUI'
]);
window.hbpCommonVersion = '2.0.0-dev.3';

angular.module('hbpCommon')
/**
 * hbpMetaNavigationController is used to manage the menu on the top right
 * of the site, including user name and settings.
 */
.controller('hbpMetaNavigationCtrl', [
    '$rootScope', '$scope', '$state', 'hbpIdentityUserDirectory', 'bbpOidcSession',
    function($rootScope, $scope, $state, hbpIdentityUserDirectory, bbpOidcSession){
        'use strict';
        hbpIdentityUserDirectory.getCurrentUser().then(function(profile) {
            $scope.currentUser = profile;
        });

        $scope.logout = function() {
            bbpOidcSession.logout().then(function() {
                $rootScope.$broadcast('user:disconnected');
                $scope.currentUser = null;
            });
        };
    }
]);

angular.module('hbpCommon')
/**
 * hbpBreadcrumb generates a standard looking breadcrumb.
 *
 * @description
 * hbpBreadcrumb generates the breadcrumb from an array
 * of items where the first item is the top element and the last item
 * the current one. It generates the URL based on the angular-ui-router
 * service. It will display each item using a hbp-icon directive and the
 * item name. The item will be clickable, the URL being generated using
 * angular-ui-router API (state & params).
 *
 * Each item of the `items` array should match the following interface:
 *
 * * it MUST have a `name` property which will be this item breadcrumb value
 * * it MUST have a `type` property that will be passed to a hbp-icon directive
 * * it MUST have a `state` property equals to the ui-router state
 * * it MIGHT have a `params` property equals to the ui-router state-params
 * * it MIGHT have a `class` property that will be inserted in the dom
 *
 * @example
 <example module="breadcrumbExample">
     <file name="index.html">
         <div ng-controller="exampleController">
            <hbp-breadcrumb items="items"></hbp-breadcrumb>
         </div>

         <script>
         angular.module('breadcrumbExample', ['hbpCommon'])
         .controller('exampleController', function($scope) {
            $scope.items = [{
                name: 'Home',
                type: 'folder',
                state: 'home'
            }, {
                name: 'Project 1',
                type: 'folder',
                state: 'project',
                params: { id: '334' }
            }, {
                name: 'Project Logo',
                type: 'image/png',
                state: 'file',
                params: { id: '1233325' }
            }];
         })
         </script>
     </file>
 </example>
 */
.directive('hbpBreadcrumb', ['$state', function($state) {
    'use strict';
    return {
        restrict: 'E',
        templateUrl: 'templates/breadcrumb.html',
        scope: {
            items: '='
        },
        link: function(scope) {
            var urlForState = function(state, params) {
                return $state.href(state, params);
            };
            var update = function() {
                scope.parentItems = scope.items && scope.items.slice(0, scope.items.length-1);
                scope.currentItem = scope.items && scope.items[scope.items.length-1];
            };
            var init = function() {
                scope.$watch('items', update);
                scope.urlForState = urlForState;
                update();
            };
            init();
        }
    };
}]);

angular.module('hbpCommon')
/**
 * This directive displays a human readable version of an entity's content
 *
 * @example
    <example module="testModule">
      <file name="script.js">
        var myApp = angular.module("testModule",['hbpCommon']);
        myApp.controller('Controller', ['$scope', function($scope) {
            $scope.contentTypes = [ 'image/png', 'image/jpeg', 'application/vnd.bbp.Simulation.BlueConfig'];
        }]);
      </file>
      <file name="index.html">
        <div ng-controller="Controller">
            <p>mimeType: <select ng-options="ct for ct in contentTypes" ng-model="selectedContentType"></select></p>
            <p>description: <hbp-content-description content="selectedContentType"></hbp-content-description></p>
        </div>
      </file>
    </example>
 */
.directive('hbpContentDescription', function() {
    'use strict';
    return {
        templateUrl: 'templates/content-description.html',
        restrict: 'E',
        scope: {
            content: '=?'
        },
        link: function(scope) {
            if(scope.content) {
                var splited = scope.content.split('/');
                if (splited.length > 1) {
                    scope.fallback = splited[1];
                } else {
                    scope.fallback = splited[0];
                }
            }
        }
    };
});

angular.module('hbpCommon')
/**
 * This directive represents the icon corresponding to an entity's content
 *
 * @example
    <example module="testModule">
       <file name="script.js">
        var myApp = angular.module("testModule",['hbpCommon']);
        myApp.controller('Controller', ['$scope', function($scope) {
            $scope.file= {
                name: 'wallpaper.png',
                contentType: 'image/png'
            };
          }]);
      </file>
      <file name="index.html">
        <div ng-controller="Controller">
            <hbp-content-icon content="file.contentType"></hbp-content-icon>{{file.name}}
        </div>
      </file>
    </example>
 */
.directive('hbpContentIcon', function() {
    'use strict';
    return {
        templateUrl: 'templates/content-icon.html',
        restrict: 'E',
        scope: {
            content: '=?'
        }
    };
});

'use strict';
angular.module('hbpCommon')
/**
 * hbp-error-message directive displays an error.
 *
 * ## Parameters
 *
 * ### hbp-error
 *
 * hbp-error is a HbpError instance, built by the HbpErrorService
 *
 * @example
    <example module='testModule'>
       <file name='script.js'>
        var myApp = angular.module('testModule',['hbpCommon']);
        myApp.controller('Controller', ['$scope', function($scope) {
            $scope.error= {
                code: 422,
                data: { email: [ 'Invalid e-mail address'] },
                message: 'Validation error.',
                type: 'Validation'
            };
            $scope.errorPermissions= {
                code: 403,
                message: 'Permission denied.',
                type: 'PermissionDenied'
            };
          }]);
      </file>
      <file name='index.html'>
        <div ng-controller='Controller'>
            Validation error:
            <hbp-error-message hbp-error='error'></hbp-error-message>
            Permission denied error:
            <hbp-error-message hbp-error='errorPermissions'></hbp-error-message>
        </div>
      </file>
    </example>
 */
.directive('hbpErrorMessage', function() {
    return {
        restrict: 'E',
        scope: {
            error: '=?hbpError'
        },
        templateUrl: 'templates/error-message.html'
    };
});

angular.module('hbpCommon')
/**
 * Take the first letter of the two first word and generate an icon
 * from them.
 *
 * The icon is based on a background color picked in a list. The index is based
 * on the modulo of the first letter charcode. The two letter are display
 * in white at the center of the logo.
 *
 * The current implementation use a canvas to generate the image but SVG might
 * be a far better idea here.
 */
.directive('hbpGeneratedIcon', function() {
    'use strict';
    return {
        restrict: 'E',
        scope: {
            text: '=hbpText',
            color: '=hbpColor',
            size: '=?hbpSize'
        },
        template: '<canvas width="{{width}}" height="{{height}}" hbp-hires-canvas></canvas>',
        link: {
            post: function(scope, element) {
                element.addClass('hbp-generated-icon');

                var draw = function() {
                    if (!(scope.text && scope.width && scope.height)) {
                        return;
                    }
                    var canvas = element[0].childNodes[0];
                    var width = canvas.width;
                    var height = canvas.height;

                    var words = scope.text.split(/\s+/, 2);
                    var initials = (''+words[0][0]+(words[1]?words[1][0]:words[0][1])).toUpperCase();

                    var bgColor = scope.color;
                    if(!bgColor) {
                        // an official color set has to be found.
                        var colors = ['#ee936d', '#ea6153', '#f8bd93', '#308298', '#e54639', '#4b8f9e', '#457493', '#456e91'];
                        var colorIndex = (7*initials.charCodeAt(0) * 13*initials.charCodeAt(1)) % colors.length;
                        bgColor = colors[colorIndex];
                    }
                    element.attr('style', 'width:'+scope.width+'px; height:'+scope.height+'px');
                    var ctx = element[0].childNodes[0].getContext('2d');
                    var fontFace = 'Arial';
                    var fontSize = 176;
                    ctx.fillStyle = bgColor;
                    ctx.fillRect (0, 0, width, height);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = '#ffffff';
                    // lower the font size until the text fits the canvas
                    do {
                        fontSize -= 4;
                        ctx.font = fontSize + 'px ' + fontFace;
                    } while (fontSize > 10 && ctx.measureText(initials).width > width * 0.75 );
                    ctx.fillText(initials, width / 2, height / 2);
                };

                scope.$watch('[text,width,height]', draw, true);
                scope.width = scope.size || element[0].offsetWidth;
                scope.height = scope.size || element[0].offsetHeight;
                draw();
            }
        }
    };
});

angular.module('hbpCommon')
.directive('hbpHiresCanvas', ["hbpHiResService", function(hbpHiResService) {
    'use strict';
    return {
        link: {
            post: function(scope, elt, attr) {
                var ratio = hbpHiResService.pixelRatio();

                var fixResFn = function(attr) {
                    return function(value) {
                        if (!value) {
                            return;
                        }
                        var orig = value;
                        elt.css(attr, orig+'px').prop(attr, orig * ratio);
                    };
                };

                if (hbpHiResService.isHiResScreen()) {
                    elt[0].getContext('2d').transform(ratio, 0, 0, ratio, 0, 0);
                }

                attr.$observe('width', fixResFn('width'));
                attr.$observe('height', fixResFn('height'));
            }
        }
    };
}]);

angular.module('hbpCommon')
/**
 * This directive represents the icon corresponding to an entity type.
 * It's possible to provide the type as a string (attribute: `type`)
 * or an entity object (attribute: `entity`) having a property named `_entityType`.
 *
 * admitted values for type/_entityType:
 * * root
 * * project
 * * folder
 * * file
 * * release
 * * link:folder
 * * link:file
 * * link:project
 * * link:release
 *
 * @example
    <example module="iconExample">
        <file name="script.js">
            angular.module('iconExample', ['hbpCommon'])
                .controller('iconController', function($scope) {
                    $scope.entity = { _entityType: 'project' };
                    $scope.type = 'folder';
                }
            );
        </file>
        <file name="index.html">
            <div ng-controller="iconController">
            this is the icon for a {{entity._entityType}}: <hbp-icon entity="entity"></hbp-icon><br/>
            this is the icon for a: {{type}} <hbp-icon type="type"></hbp-icon>
        </div>
        </file>
    </example>
 */
.directive('hbpIcon', function() {
    'use strict';
    return {
        templateUrl: 'templates/icon.html',
        restrict: 'E',
        scope: {
            entity: '=?',
            type: '=?'
        },
        link: function(scope) {
            if (!scope.type && scope.entity) {
                scope.type = scope.entity._entityType;
            }
        }
    };
});

/* hbpCommonUI Module
 * @namespace hbpCommonUI
 */
angular.module('hbpCommonUI')
/**
 * @name hbpLoading
 * @memberOf hbpCommonUI
 *
 * @desc
 * hbpLoading directive display a simple loading message. If a promise
 * is given, the loading indicator will disappear once it is resolved.
 *
 * @param {Object} hbp-promise             an optional promise
 * @param {string} hbp-message             text replacement for the element content.
 *
 * @example
 <hbp-loading hbp-promise="myAsyncFunc()" hbp-message="'Loading My Async Func'">
 </hbp-loading>
 */
.directive('hbpLoading', function() {
    'use strict';
    return {
        restrict: 'E',
        scope: {
            promise: '=hbpPromise',
            message: '=hbpMessage'
        },
        template: '<div class="hbp-loading" ng-if="loading"><span class="glyphicon glyphicon-refresh hbp-spinning"></span> {{message}}</div>',
        link: function(scope) {
            scope.loading = true;
            scope.message = scope.message || 'Loading...';
            if (scope.promise) {
                var complete = function() { scope.loading = false; };
                scope.promise.then(complete, complete);
            }
        }
    };
});

angular.module('hbpCommon')
/*
 * This directive is used to attach a listener to a 'touch' event only.
 */
.directive('hbpOnTouch', ['$parse',
    function($parse) {
        'use strict';
        return {
            restrict: 'A',
            compile: function($element, attr) {
                var fn = $parse(attr.hbpOnTouch);
                return function(scope, element) {
                    element.on('touchend', function(event) {
                        event.preventDefault();
                        var callback = function() {
                            fn(scope, {
                                $event: event
                            });
                        };
                        scope.$apply(callback);
                    });
                };
            }
        };
    }
]);

/* hbpCommonUI Module
 * @namespace hbpCommonUI
 */
angular.module('hbpCommonUI')
/**
 * @name hbpPerformAction
 * @memberOf hbpCommonUI
 *
 * @desc
 * hbpPerformAction directive run an action when the given control is clicked.
 * it can be added as an attribute. While the action is running, the control
 * is disabled.
 *
 * @param {function} hbp-perform-action  the code to run when the button is clicked.
 *                                       this function must return a promise.
 * @param {string}   hbp-loading-message text replacement for the element content.
 *
 * @example
 <div ng-controller="myController">
    <input class="btn btn-primary" type="submit" hbp-perform-action="doSomething()">
 </div>
 */
.directive('hbpPerformAction', [function() {
    'use strict';
    return {
        restrict: 'A',
        scope: {
            action: '&hbpPerformAction'
        },
        link: function(scope, element, attrs) {
            var loading = false;
            var onComplete = function() {
                element.html(scope.text);
                element.attr('disabled', false);
                element.removeClass('loading');
                loading = false;
            };
            var run = function() {
                loading = true;
                if (scope.loadingMessage) {
                    element.html(scope.loadingMessage);
                }
                element.addClass('loading');
                element.attr('disabled', true);
                scope.action().then(onComplete, onComplete);
            };
            scope.loadingMessage = attrs.hbpLoadingMessage;
            scope.text = scope.text || element.html();
            element.on('click', run);
        }
    };
}]);

angular.module('hbpCommon')
    .directive('hbpUserSelector', ["$q", "$http", "bbpConfig", "hbpUtil", "hbpIdentityUserDirectory", function($q, $http, bbpConfig, hbpUtil, hbpIdentityUserDirectory) {
        'use strict';
        return {
            restrict: 'EA',
            scope: {
                exclude: '=hbpUserExclude',
                onUserSelect: '&hbpOnSelect'
            },
            templateUrl: function(tElement, tAttrs) {
                return tAttrs.hbpTemplate || 'templates/userSelector.html';
            },
            controller: ["$scope", function($scope) {
                $scope.idsToExclude = [];
                $scope.$watch('exclude', function(newValue) {
                    if(newValue && newValue.length > 0 && newValue[0].id) {
                        $scope.idsToExclude = _.pluck($scope.exclude, 'id');
                    } else if(newValue) {
                        $scope.idsToExclude = newValue;
                    }
                });

                $scope.noSubmitOnEnter = function(e) {
                    if (e.which === 13) { // 13 == 'Enter' keycode
                        e.preventDefault();
                    }
                };

                $scope.getUsers = function(filter) {
                    var users = [];
                    return hbpIdentityUserDirectory.list({
                        filter: {
                            displayName: '*' + filter+ '*'
                        }
                    }).then(function(res) {
                        _.forEach(res.results, function(item) {
                            if($scope.idsToExclude.indexOf(item.id) < 0) {
                                users.push(item);
                            }
                        });
                        return users;
                    }, hbpUtil.ferr);
                };

                $scope.selectUser = function() {
                    var result = $scope.onUserSelect({user: $scope.newUser});
                    $scope.selectionDisabled = true;

                    var reEnableSelector = function() {
                        $scope.selectionDisabled = false;
                        $scope.newUser = '';
                    };

                    $q.when(result).then(reEnableSelector, reEnableSelector);
                };
            }]
        };
    }]);

angular.module('hbpCommon')
.directive('hbpUsercard', function() {
    'use strict';
    return {
        restrict: 'EA',
        scope: {
            user: '=hbpUser'
        },
        templateUrl: function(tElement, tAttrs) {
            return tAttrs.hbpTemplate || 'templates/usercard.html';
        },
        link: {
            pre: function(scope) {
                scope.$watch('user', function(newValue) {
                    scope.institution = newValue && _.find(newValue.institutions, 'primary');
                    scope.email = newValue && _(newValue.emails).filter('primary').pluck('value').first();
                    scope.phone = newValue && _(newValue.phones).filter('primary').pluck('value').first();
                    scope.ims = newValue && newValue.ims;
                });
            }
        }
    };
});

angular.module('hbpCommon')
/**
 * Filter `hbpDollarToNewLine` convert any dollar chars not part of a word by
 * a single line return character.
 *
 * @example
 <example module="hbpDollarToNewLineExample">
  <file name="index.html">
      <div ng-controller="exampleController">
         <h4>Before</h4>
         <pre>{{value}}</pre>
         <h4>After</h4>
         <pre>{{value | hbpDollarToNewLine}}</pre>
      </div>

      <script>
      angular.module('hbpDollarToNewLineExample', ['hbpCommon'])
      .controller('exampleController', function($scope) {
         $scope.value = "$Hello $ Wo$rld$"
      })
      </script>
  </file>
 </example>
 */
.filter('hbpDollarToNewLine', function() {
    'use strict';
    return function(text) {
        return text && text.replace(/ \$ /g, '\n');
    };
});

angular.module('hbpCommon')
/**
 * Filter `hbpYesNo` is used to convert truthy values to the string 'Yes' and
 * falsy values to the string 'No'.
 *
 * @example
  <example module="hbpYesNoExample">
      <file name="index.html">
          <div ng-controller="exampleController">
             <h4>Conversion examples</h4>
             <table>
                <thead>
                    <tr><th>Value</th><th>Result</th></tr>
                </thead>
                <tbody>
                    <tr ng-repeat="v in values"><td>{{v | json}}</td><td>{{v | hbpYesNo}}</td></tr>
                </tbody>
             </table>
          </div>

          <script>
          angular.module('hbpYesNoExample', ['hbpCommon'])
          .controller('exampleController', function($scope) {
             $scope.values = ['', true, false, 0, 1, 'Yes', 'No', null, undefined];
          })
          </script>
      </file>
  </example>
 */
.filter('hbpYesNo', function() {
    'use strict';
    return function(value) {
        if (!value || ['0', 'false', 'no'].indexOf(value.toString().toLowerCase()) > -1) {
            return 'No';
        } else {
            return 'Yes';
        }
    };
});

'use strict';
angular.module('hbpCommon')
/**
 * @namespace hbpCollabStore
 * @desc
 * Provide a javascript client to query the Collab REST service.
 */
.service('hbpCollabStore', ["$log", "$q", "$cacheFactory", "$http", "bbpConfig", "hbpIdentityUserDirectory", "hbpErrorService", "hbpUtil", function($log, $q, $cacheFactory, $http, bbpConfig, hbpIdentityUserDirectory, hbpErrorService, hbpUtil) {
    var fsuc = null;
    var urlBase = bbpConfig.get('api.collab.v0');
    var collabUrl = urlBase + '/collab/';
    var myCollabsUrl = urlBase + '/mycollabs/';
    var contextUrl = collabUrl + 'context/';
    var collabCache = $cacheFactory('hbpCollabStoreCollabs');

    var Collab = this.Collab = function() {};
    Collab.prototype = {
        toJson: function() {
            return {
                id: this.id,
                title: this.title,
                content: this.content
            };
        },
        update: function(attrs) {
            _.each(['id', 'title', 'content'], function(a) {
                if (attrs[a] !== undefined) {
                    this[a] = attrs[a];
                }
            }, this);
        }
    };
    Collab.fromJson = function(json) {
        if (json.toJson) {
            return json;
        }
        var c = new Collab();
        c.id = json.id;
        c.created = new Date(json.created);
        c.edited = new Date(json.edited);
        c.title = json.title;
        c.content = json.content;
        c.deleted = json.deleted;
        c.toJson = function() {
            return {
                id: json.id,
                title: c.title,
                content: c.content,
                deleted: c.deleted
            };
        };
        return c;
    };

    var Context = this.Context = function() {};
    Context.fromJson = function(json) {
        var c = new Context();
        c.context = json.context;
        c.appId = json['app_id'];
        c.name = json.name;
        c.navId = json.id;
        c.collab = Collab.fromJson(json.collab);
        c.toJson = function() {
            return {
                context: json.context,
                appId: json['app_id'],
                name: c.name
            };
        };
        return c;
    };

    var ongoingCollabGetRequests = {};
    var getPromiseFromCache = function(key) {
        var collab = collabCache.get(key);
        if (collab) {
            return $q.when(collab);
        }
        if (ongoingCollabGetRequests[key]) {
            return ongoingCollabGetRequests[key];
        }
    };

    var getter = function(url, key) {
        if (!key) {
            return $q.reject(hbpErrorService.error({message: 'id parameter is required'}));
        }

        var promise = getPromiseFromCache(key);
        if (promise) {
            return promise;
        }

        ongoingCollabGetRequests[key] = $http.get(url + key + '/').then(function(res) {
            ongoingCollabGetRequests[key] = null;
            return Collab.fromJson(res.data);
        }, function(res) {
            ongoingCollabGetRequests[key] = null;
            return hbpUtil.ferr(res);
        });
        return ongoingCollabGetRequests[key];
    };

    var cacheCollabWithLabel = function(collab, label) {
        // ensure the collab is in cache for this label
        // to avoid duplicate reference for it.
        if (!collab._label) {
            collab._label = label;
            collabCache.put(label, collab);
            collabCache.put(collab.id, collab);
        }
        return collab;
    };

    this.get = function(id) {
        id = (id && id.id) || id;
        return getter(collabUrl, id).then(function(collab) {
            collabCache.put(collab.id, collab);
            return collab;
        });
    };

    this.getByLabel = function(label) {
        return getter(urlBase + '/r/', label).then(function(collab) {
            // Ensure the collab has not been fetched by id already.
            // This might occurs if the collab was fetched by id the first
            // time. In this case, no way to know its associated label.
            var promise = getPromiseFromCache(collab.id);
            if (promise) {
                return promise.then(function(c) {
                    return cacheCollabWithLabel(c, label);
                });
            } else {
                return cacheCollabWithLabel(collab, label);
            }
        });
    };

    /**
     * @name list
     * @memberOf hbpCollabStore
     * @desc
     * list return the a hbpUtil.ResultSet instance containing the collab
     * matching the given parameters.
     *
     * @param {Object} [options] the request options
     * @param {string} [options.search] search string to filter the results
     * @param {(string|string[])} [options.id] string or array of collab ids
     * @param {int}    [options.pageSize=25] number of result per page
     * @param {int}    [options.page] the page to retrive
     * @param {Object} [options.params] DEPRECATED any query parameter
     * @param {string} [options.url] DEPRECATED overide the default URL
     * @return {hbpUtil.ResultSet} a result set of results
     */
    this.list = function(options) {
        var url = collabUrl;
        var request;
        // support old signature (url, options)
        if (angular.isString(options)) {
            url = options;
            options = arguments[1];
        }
        options = angular.extend({}, options);

        if (angular.isArray(options.id)) {
            options.id = options.id.join(',');
        }

        if (options.pageSize) {
            options['page_size'] = options.pageSize;
        }

        if (options.url) { // Deprecated URL support
            request = $http.get(options.url);
        } else {
            request = $http.get(url, {
              params: angular.extend(
                {},
                options.params,
                _.pick(options, ['search', 'id', 'page_size', 'page'])
              )
            });
        }
        return hbpUtil.paginatedResultSet(request, {
          factory: Collab.fromJson
        });
    };

    /**
     * @name mine
     * @memberOf hbpCollabStore
     * @description
     * `mine` return a hbpUtil.ResultSet of the user collabs.
     *
     * @param {Object} [options] request options
     * @param {string} [options.search] search string to filter the results
     * @param {int}    [options.pageSize] number of result per page
     * @param {int}    [options.page] the page to retrive
     * @return {hbpUtil.ResultSet} the current user collabs
     */
    var mine = function(options) {
        options = angular.extend({}, options);
        var params = angular.extend({}, _.pick(options, ['search']));
        return hbpUtil.paginatedResultSet($http.get(myCollabsUrl, {params: params}), {
            factory: Collab.fromJson
        });
    };
    this.mine = mine;

    this.create = function(jsonCollab) {
        var c = Collab.fromJson(jsonCollab);
        return $http.post(collabUrl, c.toJson()).then(function(res) {
            c.update(res.data);
            collabCache.put(c.id, c);
            return c;
        }, hbpUtil.ferr);
    };
    this.save = function(jsonCollab) {
        var c = Collab.fromJson(jsonCollab);
        return $http.put(collabUrl + c.id + '/', c).then(function(res) {
            c.update(res.data);
            collabCache.put(c.id, c);
            return c;
        }, hbpUtil.ferr);
    };
    this.delete = function(collab) {
        return $http.delete(collabUrl + collab.id + '/').then(
            function() {
                collabCache.remove(collab.id);
                if (collab._label) {
                    collabCache.remove(collab._label);
                }
            }, hbpUtil.ferr
        );
    };


    //
    // Context Endpoint
    // ----------------
    var ongoingContextRequests = {};
    this.context = {
        get: function(uuid) {
            if (!uuid) {
                return $q.reject(hbpErrorService.error({message: 'uuid parameter is required'}));
            }
            // return the promise of an ongoing request
            if (ongoingContextRequests[uuid]) {
                return ongoingContextRequests[uuid];
            }
            // proceed to the request
            ongoingContextRequests[uuid] = $http.get(contextUrl + uuid + '/', {cache: true})
            .then(function(res) {
                ongoingContextRequests[uuid] = null;
                return Context.fromJson(res.data);
            }, function(res) {
                ongoingContextRequests[uuid] = null;
                return hbpUtil.ferr(res);
            });
            return ongoingContextRequests[uuid];
        }
    };


    //
    // Team Endpoint
    // ----------------
    var rolesCache = {};

    var returnPromise = function(val) {
        return $q.when(val);
    };

    // Return a team resource instance for the given collab ID
    this.team = {
        add: function(collabId, userId) {
            return $http.put(collabUrl + collabId + '/team/', {users: [userId]}).then(fsuc, hbpUtil.ferr);
        },
        delete: function(collabId, userId) {
            return $http({
                method: 'DELETE',
                url: collabUrl + collabId + '/team/',
                data: {'users': [userId]},
                headers: {'Content-Type': 'application/json'}
            }).then(fsuc, hbpUtil.ferr);
        },
        list: function(collabId) {
            return $http.get(collabUrl + collabId + '/team/')
            .then(function(res) {
                var indexedTeam = _.indexBy(res.data, 'user_id');
                return hbpIdentityUserDirectory.list({
                    pageSize: 0,
                    filter: {
                        id: _.keys(indexedTeam)
                    }
                }).then(function(data) {
                    return _.reduce(data.results, function(res, user) {
                        var membershipInfo = indexedTeam[parseInt(user.id, 10)];
                        if (membershipInfo) {
                            if(!rolesCache[collabId]) {
                                rolesCache[collabId] = {};
                            }
                            rolesCache[collabId][membershipInfo['user_id']] = membershipInfo.role;

                            res.push(angular.extend({}, user, {
                                membershipId: membershipInfo['user_id'],
                                role: membershipInfo.role
                            }));
                        }
                        return res;
                    }, []);
                });
            }, hbpUtil.ferr);
        },
        userInTeam: function(collabId) {
            return hbpIdentityUserDirectory.getCurrentUserOnly().then(function(me) {
                return $http.get(collabUrl + collabId + '/team/')
                .then(function(list) {
                    return _.indexBy(list.data, 'user_id')[parseInt(me.id, 10)] !== undefined;
                });
            });
        },
        roles: {
            get: function(collabId, userId) {
                if(!userId) {
                    $log.debug('Must provide userId: ', collabId, userId);
                    return;
                }
                if(!rolesCache[collabId]) {
                    rolesCache[collabId] = {};
                }
                if(rolesCache[collabId] && rolesCache[collabId][userId]) {
                    return returnPromise(rolesCache[collabId][userId]);
                } else {
                    return $http.get(collabUrl + collabId + '/team/role/' + userId + '/')
                    .then(function(res) {
                        rolesCache[collabId][userId] = res.data.role;
                        return returnPromise(rolesCache[collabId][userId]);
                    }, function(res) {
                        if(res.status === 404) {
                            rolesCache[collabId][userId] = undefined;
                            return returnPromise(rolesCache[collabId][userId]);
                        } else {
                            hbpUtil.ferr(res);
                        }
                    });
                }
            },
            set: function(collabId, userId, role) {
                var thisUrl = collabUrl + collabId + '/team/role/' + userId + '/';
                if(rolesCache[collabId] && rolesCache[collabId][userId]) {
                    rolesCache[collabId][userId] = role;
                    return $http.put(thisUrl, {role: role}).then(fsuc, function(resp) {
                        if(resp.status === 404) { // should have been a POST...
                            return $http.post(thisUrl, {role: role}).then(fsuc, hbpUtil.ferr);
                        } else {
                            return hbpUtil.ferr(resp);
                        }
                    });
                } else {
                    if(!rolesCache[collabId]) {
                        rolesCache[collabId] = {};
                    }
                    rolesCache[collabId][userId] = role;
                    return $http.post(thisUrl, {role: role}).then(fsuc, hbpUtil.ferr);
                }
            }
        }
    };
}]);

'use strict';
//TODO manage empty values in get
//TODO manage pagination
//TODO manage 2 ways databinding properly
angular.module('hbpCommon')

.service('hbpConfigStore', ["$http", "bbpConfig", "hbpUtil", function($http, bbpConfig, hbpUtil) {
    var configUrl = bbpConfig.get('api.collab.v0') + '/config/';

    this.get = function(ctxId) {
        return $http.get(configUrl + ctxId + '/').then(function(res) {
            return res.data;
        }, hbpUtil.ferr);
    };
    this.list = function(param) {
        return hbpUtil.getList(configUrl, param)();
    };
    this.create = function(cfg) {
        return $http.post(configUrl, cfg).then(function(res) {
            return res.data;
        }, hbpUtil.ferr);
    };
    this.save = function(cfg) {
        return $http.put(configUrl + cfg.context + '/', cfg).then(function(res) {
            return res.data;
        }, hbpUtil.ferr);
    };
    this.delete = function(cfg) {
        $http.delete(configUrl + cfg.context + '/').then(null, hbpUtil.ferr);
    };
}]);

angular.module('hbpCommon')
/**
 * `hbpDialogFactory` provides generic UI dialog.
 *
 *
 * ### `{promise} hbpDialogFactory.confirm({Object} options)` method
 *
 * Displays a confirmation dialog, return a promise which resolved if confirmed.
 *
 * - param {Object} options The options parameter accepts the following keys:
 *   - scope: the scope to be used
 *   - title: the title of the dialog
 *   - confirmLabel: text for the confirmation label
 *   - cancelLabel: text for the cancelation label
 *   - template: a template string to be used as the dialog content
 *   - templateUrl: URL of a template that should be used as the dialog
 *                  content.
 *
 * - return {promise} A promise that will be resolved if the dialog is
 *                    confirmed.
 *
 *
 * ### Method `hbpDialogFactory.error({HbpError}error)`
 *
 * Notify the user about the given error.
 *
 * param {HbpError} error: the error to display
 */
.factory('hbpDialogFactory',['$modal', '$log', '$q', '$rootScope', '$compile', '$templateCache',
    'hbpErrorService',
    function($modal, $log, $q, $rootScope, $compile, $templateCache, hbpErrorService){
    'use strict';

    function confirm(options) {
        options = _.extend({
            scope: $rootScope,
            title: 'Confirm',
            confirmLabel: 'Yes',
            cancelLabel: 'No',
            template: 'Are you sure?',
            closable: true
        }, options);

        var modalScope = options.scope.$new();
        modalScope.title = options.title;
        modalScope.confirmLabel = options.confirmLabel;
        modalScope.cancelLabel = options.cancelLabel;
        modalScope.confirmationContent = options.template;
        modalScope.confirmationContentUrl = options.templateUrl;
        modalScope.closable = options.closable;

        var instance = $modal.open({
            templateUrl: 'templates/dialog-confirmation.html',
            show: true,
            backdrop: 'static',
            scope: modalScope,
            keyboard: options.keyboard || options.closable
        });
        return instance.result;
    }
    function error(err) {
        var scope = $rootScope.$new();
        scope.error = err;
        return alert({
            class: 'error',
            title: 'Error!',
            label: 'Close',
            scope: scope,
            templateUrl: 'templates/error-alert.html'
        });
    }

    function alert(options) {
        if (typeof options === 'string') {
            return deprecatedAlert.apply(window, arguments);
        }
        options = _.extend({
            scope: $rootScope,
            title: 'Message',
            label: 'Close',
            class: 'default'
        }, options);

        var modalScope = options.scope.$new();
        modalScope.title = options.title;
        modalScope.label = options.label;
        modalScope.alertContentUrl = options.templateUrl;
        modalScope.alertContent = options.template;
        modalScope.htmlClass = options.class;

        var instance = $modal.open({
            templateUrl:'templates/dialog-alert.html',
            show: true,
            backdrop:'static',
            scope: modalScope
        });
        return instance.result;
    }

    function deprecatedAlert(templateUrl, title, scope) {
        $log.warn('hbpDialogFactory.alert(templateUrl, title, scope) is deprecated.');
        $log.log('Use hbpDialogFactory.alert(options) instead');

        return alert({
            templateUrl: templateUrl,
            title: title,
            scope: scope
        });
    }

    return {
        // Alert message with a single 'close' button, based on the provided template
        alert: alert,

        error: error,

        confirm: confirm,

        /**
         * @deprecated
         *
         * Confirmation message with a cancel button and a configurable 'action' button, based on the provided template
         */
        confirmation: function (templateUrl,  action, title, actionName, scope) {
            $log.warn('hbpDialogFactory.confirmation is deprecated.');
            $log.log('Use hbpDialogFactory.confirm instead');

            return confirm({
                scope: scope,
                title: title,
                confirmLabel: actionName,
                cancelLabel: 'cancel',
                templateUrl: templateUrl
            }).then(function() {
                if (!action) {
                    return;
                }
                return action(scope).then(null, function(data) {
                    var error;
                    if (typeof data === 'string') {
                        error = hbpErrorService.error({
                            type: 'Error',
                            message: data
                        });
                    } else if (data) {
                        if (! data.status ) {
                            data = {
                                status: -1,
                                data: data
                            };
                        }
                        error = hbpErrorService.httpError(data);
                    } else {
                        error = hbpErrorService.error();
                    }
                    alert({
                        title: 'Error',
                        class: 'alert-danger',
                        template: error.message
                    });
                    return $q.reject(error);
                });
            });
        }
    };
}]);

angular.module('hbpCommon')
/**
 * `hbpErrorService` provides helper functions that all return an `HbpError` instance given a context object.
 *
 * ### Class HbpError
 *
 * HbpError describes a standard error object used
 * to display error message or intropect the situation.
 *
 * Error declare the following properties:
 *
 * * `type` a camel case name of the error type.
 * * `message` a human readable message of the error that should
 * be displayed to the end user.
 * * `data` any important data that might help the software to
 * inspect the issue and take a recovering action.
 * * `code` an error numerical code.
 *
 * Only `type`, `message`, and `code` should be considered to be present.
 * They receive default values when not specified by the situation.
 *
 *
 * ### Method `{HbpError}hbpErrorService.httpError({HttpResponse}response)`
 *
 * return a `HbpError` instance built from a HTTP response.
 *
 * In an ideal case, the response contains json data with an error object.
 * It also fallback to a reason field and fill default error message for
 * standard HTTP status error.
 *
 *
 * ### Method `{HbpError}hbpErrorService.error({Object}options)`
 *
 * Build an `HbpError` instance from the provided options.
 *
 * - param  {Object} options argument passed to HbpError constructor
 * - return {HbpError} the resulting error
 */
.service('hbpErrorService', function() {
    'use strict';

    var HbpError = function(options) {
        options = angular.extend({
            type: 'UnknownError',
            message: 'An unknown error occured.',
            code: -1
        }, options);
        this.type = options.type;
        this.message = options.message;
        this.data = options.data;
        this.code = options.code;
    };

    return {
        httpError: function(response) {
            // return argument if it is already an
            // instance of HbpError
            if (response && response instanceof HbpError) {
                return response;
            }

            if (response.status === undefined) {
                return new HbpError({
                    message: 'Cannot parse error, invalid format.'
                });
            }
            var error = new HbpError({code: response.status});

            if (error.code === 0) {
                error.type = 'ClientError';
                error.message = 'The client cannot run the request.';
                return error;
            }
            if (error.code === 404 ) {
                error.type = 'NotFound';
                error.message = 'Resource not found';
                return error;
            }
            if (error.code === 403 ) {
                error.type = 'Forbidden';
                error.message = 'Permission denied: you are not allowed to display the page or perform the operation';
                return error;
            }
            if (error.code === 502) {
                error.type = 'BadGateway';
                error.message = '502 Bad Gateway Error';
                if (response.headers('content-type') === 'text/html') {
                    var doc = document.createElement( 'div' );
                    doc.innerHTML = response.data;
                    var titleNode = doc.getElementsByTagName('title')[0];
                    if (titleNode) {
                        error.message = titleNode.innerHTML;
                    }
                }
                return error;
            }
            if (response.data) {
                var errorSource = response.data;
                if (errorSource.error) {
                    errorSource = errorSource.error;
                }
                if (errorSource.type) {
                    error.type = errorSource.type;
                }
                if (errorSource.data) {
                    error.data = errorSource.data;
                }
                if (errorSource.message) {
                    error.message = errorSource.message;
                } else if (errorSource.reason) {
                    error.type = 'Error';
                    error.message = errorSource.reason;
                }

                if(!errorSource.type && !errorSource.data &&
                    !errorSource.message && !errorSource.reason) {
                    // unkown format, return raw data
                    error.data = errorSource;
                }
            }
            return error;
        },
        error: function(options) {
            if (options && options instanceof HbpError) {
                return options;
            }
            return new HbpError(options);
        }
    };
});

angular.module('hbpCommon')
/**
 * `hbpHiResolution` service provides helpers to deal with
 * screen pixel ratio.
 */
.service('hbpHiResService', function() {
    'use strict';
    return {
        isHiResScreen: function() {
            return (
                ('devicePixelRatio' in window && window.devicePixelRatio > 1) ||
                ('matchMedia' in window && window.matchMedia('(min-resolution:144dpi)').matches)
            );
        },
        pixelRatio: function() {
            return window.devicePixelRatio || 1;
        }
    };
});

angular.module('hbpCommon')
/**
 * This service contains utility functions dedicated to the UI.
 */
.service('hbpUiUtil', ['$window', '$document', '$q', 'hbpErrorService',
    function($window, $document, $q, hbpErrorService){
        'use strict';

        // Test wether the given element
        // is part of the viewport
        function isInViewport(selector) {
            if (selector.find) {
                selector = selector[0];
            }
            var rect = selector.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= ($window.innerHeight ||
                    $document.documentElement.clientHeight) &&
                rect.right <= ($window.innerWidth ||
                    $document.documentElement.clientWidth)
            );
        }

        // Manages the display of error in a dialog after a rest call, typically used with
        // Angular UI's modal dialog.
        //
        // This function will generate a 'close' function that takes as first parameter the
        // modals 'native' close function followed by an arbitrary number of arguments.
        //
        // Once this function is called it will first try to call the 'submitCall' function with
        // all the optional argument provided above.
        // - If this succeeds then the close methode will be called.
        // - If this fails then the error field of the provided scope will be filed with the
        //   error message
        var dialogSubmissionRestCallErrorHandler = function (submitCall, scope) {
            return function(closeMethod) {
                var callArguments = Array.prototype.slice.call(arguments);
                callArguments.shift();

                return submitCall.apply(this, callArguments).then(function(response){
                    closeMethod(response);
                }, function (response) {
                    scope.error = hbpErrorService.httpError(response);
                    $q.reject(scope.error);
                });
            };
        };

        return {
            isInViewport: isInViewport,
            dialogSubmissionRestCallErrorHandler: dialogSubmissionRestCallErrorHandler
        };
    }
])

/**
 * filter to serialize a Date object into a string
 * with the format: 'yyyy-MM-dd HH:mm:ss'
 *
 * @example
    <example module="dateFormatModule">
        <file name="script.js">
            var myApp = angular.module("dateFormatModule",['hbpCommon']);
            myApp.controller('DateController', ['$scope', function($scope) {
                $scope.now = new Date();
              }]);
        </file>
        <file name="index.html">
            <div ng-controller="DateController">
                <p>without filter: {{now}}</p>
                <p>with hbpDatetime filter: <b>{{now | hbpDatetime}}</b></p>
            </div>
        </file>
    </example>
 */
.filter('hbpDatetime', ['$filter', function($filter) {
    'use strict';
    return function(date) {
        return $filter('date')(date, 'yyyy-MM-dd HH:mm:ss');
    };
}])

/**
 * filter to capitalize a string
 *
 * @example
    <example module="capitalizerModule">
        <file name="script.js">
            var myApp = angular.module("capitalizerModule",['hbpCommon']);
            myApp.controller('CapitalizerController', ['$scope', function($scope) {
                $scope.lastname = 'dummet';
              }]);
        </file>
        <file name="index.html">
            <div ng-controller="CapitalizerController">
                Lastname: <input ng-model="lastname">
                <p>Hello Mr. <b>{{lastname | hbpCapitalize}} </b></p>
            </div>
        </file>
    </example>
 */
.filter('hbpCapitalize', [function() {
    'use strict';
    return function(string) {
        return string.charAt().toUpperCase() + string.substring(1);
    };
}])

/**
 * filter to render a markdown string as HTML
 *
 * @example
    <example module="markdownModule">
        <file name="script.js">
            var myApp = angular.module("markdownModule",['hbpCommon']);
            myApp.controller('MarkdownController', ['$scope', function($scope) {
                $scope.markdownHtml = [
                    'An h1 header',
                    '============',
                    '',
                    'Paragraphs are separated by a blank line.',
                    '',
                    '2nd paragraph. *Italic*, **bold**, and `monospace`. Itemized lists',
                    'look like:',
                    '',
                    '  * this one',
                    '  * that one',
                    '  * the other one',
                    '',
                    'Note that --- not considering the asterisk --- the actual text',
                    'content starts at 4-columns in.',
                    '',
                    '> Block quotes are',
                    '> written like so.',
                    '>',
                    '> They can span multiple paragraphs,',
                    '> if you like.',
                    '',
                    'Use 3 dashes for an em-dash. Use 2 dashes for ranges (ex., "it\'s all',
                    'in chapters 12--14"). Three dots ... will be converted to an ellipsis.',
                    'Unicode is supported'
                ].join('\n');
              }]);
        </file>
        <file name="index.html">
            <div ng-controller="MarkdownController">
                Markdown: <input ng-model="markdownHtml">
                <p><strong>Unformatted:</strong></p>
                <p>{{markdownHtml}}</p>
                <p><strong>Formatted using ng-bind-html:</strong></p>
                <p ng-bind-html="markdownHtml | hbpMarkdown"></p>
                <p><strong>Formatted using filter:</strong></p>
                <p><div>{{markdownHtml | hbpMarkdown}}</div></p>
            </div>
        </file>
    </example>
 */
.filter('hbpMarkdown', ['$sce', function($sce) {
    'use strict';
    return function(string) {
        if(string !== undefined) {
            return $sce.trustAsHtml(marked(string, { sanitize: true }));
        }
    };
}])

// Add goToPrevious method to $rootScope
.run(['$rootScope', '$log', '$state', '$stateParams', '$location', '$window',
    function($rootScope, $log, $state, $stateParams, $location, $window) {
        'use strict';
        var stateCount = 0;
        $rootScope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState) {
            // We don't count replace navigation or empty state navigation.
            if (fromState && fromState.name && !$location.$$replace) {
                stateCount ++;
            }
        });

        /**
         * Enable a back behaviours based on windows.history behaviors
         *
         * We don't use the states directly as this will break with the native
         * window.history behaviors.
         *
         * If a call to this method would result in a real navigation, it
         * is replaced by a call to `defaultState` instead. if defaultState
         * is not defined, it will do nothing.
         *
         * @param {String} defaultState first argument to pass to $state.go()
         * @param {Object} defaultParams second argument to pass to $state.go()
         */
        $rootScope.goToPrevious = function(defaultState, defaultParams) {
            if (stateCount > 0) {
                stateCount--;
                $window.history.go(-1);
            } else if(defaultState) {
                $state.go(defaultState, defaultParams);
            } else {
                $log.error('no previous state, cannot navigate back.');
            }
        };
    }
]);

angular.module('hbpCommon')

.config(['$httpProvider', function($httpProvider) {
    'use strict';

    // Override XMLHttpRequest to hack into setRequestHeader.
    // Header keys are the only things angular let us pass to requests
    // so intercepting a special key to modify xhr properties is
    // probably the best hack we can do to keep the rest of the code sane.
    window.XMLHttpRequest = (function(OrigXMLHttpRequest) {
        return function() {
            var xhr = new OrigXMLHttpRequest();
            xhr.setRequestHeader = (function(orig) {
                return function(name, value) {
                    if (name === 'HBP-AngularProgressEventMixin') {
                        value.call(xhr, xhr);
                    } else {
                        orig.apply(this, arguments);
                    }
                };
            }(xhr.setRequestHeader));
            return xhr;
        };
    }(window.XMLHttpRequest));

    $httpProvider.interceptors.push('hbpXhrProgressEventInterceptor');
}])

/**
 * Add support for tracking progress events using angular.
 */
.factory('hbpXhrProgressEventInterceptor', function() {
    'use strict';

    return {
        request: function(config) {
            if (config.uploadProgress || config.progress) {
                config.headers['HBP-AngularProgressEventMixin'] = function(xhr) {
                    if (config.uploadProgress) {
                        xhr.upload.addEventListener('progress', config.uploadProgress, false);
                    }
                    if (config.progress) {
                        xhr.addEventListener('progress', config.progress, false);
                    }
                };
            }
            return config;
        }
    };
});
