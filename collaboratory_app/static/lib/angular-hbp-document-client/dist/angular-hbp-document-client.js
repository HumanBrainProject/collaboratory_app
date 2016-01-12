/**
 * @namespace core
 * @desc
 * hbpDocumentClient.Core Module
 *
 * The core module of hbpDocumentClient provides angular factories to deal
 * with various storage entities {hbpEntityStore}.
 *
 * It also provides specialized factory to accomplish task related
 * to certain specific kind of entities:
 *
 * - {hbpFileStore} to create, upload and edit file entities
 * - {hbpFolderStore} to create, upload and edit folder entities
 * - {hbpProjectStore} to create, upload and edit project entities
 *
 * @memberof hbpDocumentClient
 */
angular.module('hbpDocumentClient.core', ['bbpConfig', 'hbpCommon']);

/**
 * @namespace ui
 * @desc
 * hbpDocumentClient.UI Module
 *
 * The ui module of hbpDocumentClient provides Angular directives to commonly
 * used storage related viewers like {hbpFileBrowser}, {hbpFileMiniBrowser},
 * and {hbpFileIcon}.
 *
 * @memberof hbpDocumentClient
 */
angular.module('hbpDocumentClient.ui', ['bbpConfig', 'hbpCommon', 'hbpDocumentClientTemplates', 'hbpDocumentClient.core']);

/**
 * @namespace hbpDocumentClient
 * @desc
 * hbpDocumentClient Module
 *
 * This module is the default one, advertised in the README file. It loads
 * both hbpDocumentClient.core and hbpDocumentClient.ui.
 */
angular.module('hbpDocumentClient', ['hbpDocumentClient.core', 'hbpDocumentClient.ui']);

angular.module('hbpDocumentClientTemplates', ['templates/file-browser-folder.html', 'templates/file-browser-path.html', 'templates/file-browser-tooltip.html', 'templates/file-browser.html', 'templates/file-icon.html', 'templates/file-upload-area.html', 'templates/mini-browser.html']);

angular.module("templates/file-browser-folder.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/file-browser-folder.html",
    "<div class=\"hbp-file-browser-item hbp-file-browser-folder\"\n" +
    "    ng-dblclick=\"browserView.handleNavigation(folder)\"\n" +
    "    ng-click=\"browserView.handleFocus(folder)\"\n" +
    "    hbp-on-touch=\"browserView.handleNavigation(folder)\"\n" +
    "    ng-class=\"{'hbp-file-browser-item-selected': browserView.selectedEntity === folder}\">\n" +
    "    <div class=\"hbp-file-browser-label\">\n" +
    "        <i class=\"fa\" ng-class=\"folderIcon ? folderIcon : 'fa-folder'\"></i><span>{{folderLabel || folder._name}}</span>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/file-browser-path.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/file-browser-path.html",
    "<ul class=\"breadcrumb hbp-file-browser-path\">\n" +
    "    <li class=\"root\"\n" +
    "      ng-if=\"!browserView.isRoot\">\n" +
    "      <a href ng-click=\"browserView.handleNavigation(browserView.rootEntity)\">\n" +
    "        {{browserView.rootEntity._name || '[top]'}}\n" +
    "      </a>\n" +
    "    </li>\n" +
    "    <li ng-repeat=\"entity in ancestors\">\n" +
    "      <a href ng-click=\"browserView.handleNavigation(entity)\">\n" +
    "        {{entity._name}}\n" +
    "      </a>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "      <span class=\"active\">{{browserView.currentEntity._name || '[top]'}}</span>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("templates/file-browser-tooltip.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/file-browser-tooltip.html",
    "<div ng-init=\"browserView.defineThumbnailUrl(file)\">\n" +
    "  <div class=\"file-browser-thumbnail thumbnail\" ng-if=\"browserView.thumbnailUrl\" aria-hidden=\"true\">\n" +
    "    <img ng-src=\"{{browserView.thumbnailUrl}}\">\n" +
    "  </div>\n" +
    "  {{file._name}}\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/file-browser.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/file-browser.html",
    "<div class=\"hbp-file-browser container-fluid\" in-view-container ng-click=\"selectItem()\">\n" +
    "  <hbp-error-message hbp-error='browserView.error'></hbp-error-message>\n" +
    "  <div class=\"navbar navbar-default\">\n" +
    "    <div class=\"container-fluid\">\n" +
    "      <div class=\"nav navbar-nav navbar-text\">\n" +
    "        <hbp-file-browser-path></hbp-file-browser-path>\n" +
    "      </div>\n" +
    "      <div class=\"dropdown nav navbar-nav pull-right\" dropdown ng-if=\"browserView.canEdit\">\n" +
    "        <button type=\"button\" href class=\"btn btn-default navbar-btn dropdown-toggle\" dropdown-toggle>\n" +
    "          <span class=\"glyphicon glyphicon-plus\"></span>\n" +
    "          <span class=\"caret\"></span>\n" +
    "        </button>\n" +
    "        <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "          <li ng-if=\"browserView.canEdit\"><a href ng-click=\"browserView.startCreateFolder()\"><span class=\"fa fa-folder\"></span> Create Folder</a></li>\n" +
    "          <li ng-if=\"browserView.canEdit\"><a href ng-click=\"browserView.showFileUpload = true\"><span class=\"fa fa-file\"></span> Upload File</a></li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"hbp-file-browser-content\">\n" +
    "      <div ng-if=\"browserView.isLoading\" class=\"alert alert-info\" role=\"alert\">Loading...</div>\n" +
    "      <div class=\"file-browser-upload\" ng-if=\"browserView.showFileUpload\" >\n" +
    "        <button type=\"button\" class=\"btn close pull-right\"\n" +
    "          ng-click=\"browserView.showFileUpload = false\">\n" +
    "          <span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span>\n" +
    "        </button>\n" +
    "        <hbp-file-upload-area on-drop=\"browserView.onFileChanged(files)\" on-error=\"browserView.setError(error)\"></hbp-file-upload-area>\n" +
    "      </div>\n" +
    "      <ul>\n" +
    "          <!-- navigate up one level -->\n" +
    "          <li ng-if=\"!browserView.isRoot\" hbp-file-browser-folder=\"browserView.parent\" hbp-file-browser-folder-label=\"..\" hbp-file-browser-folder-icon=\"fa-level-up\"></li>\n" +
    "\n" +
    "          <!-- folders -->\n" +
    "          <li ng-repeat=\"folder in browserView.folders\" hbp-file-browser-folder=\"folder\"></li>\n" +
    "          <li ng-if=\"browserView.showCreateFolder\" class=\"hbp-file-browser-item\">\n" +
    "            <div class=\"hbp-file-browser-folder\">\n" +
    "              <form class=\"form form-inline\" action=\"index.html\" method=\"post\" ng-submit=\"browserView.doCreateFolder($event)\">\n" +
    "                <div class=\"input-group\">\n" +
    "                  <input type=\"text\" class=\"form-control new-folder-name\" name=\"newFolderName\" ng-model=\"browserView.newFolderName\">\n" +
    "                  <span class=\"input-group-btn\">\n" +
    "                    <input class=\"btn btn-primary\" type=\"submit\" name=\"name\" value=\"Ok\">\n" +
    "                    <button class=\"btn btn-default\" type=\"button\" ng-click=\"browserView.cancelCreateFolder()\">\n" +
    "                      <span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Cancel</span>\n" +
    "                    </button>\n" +
    "                  </span>\n" +
    "                </div>\n" +
    "              </form>\n" +
    "            </div>\n" +
    "          </li>\n" +
    "          <li class=\"hbp-file-browser-item\"\n" +
    "              ng-if=\"browserView.hasMoreFolders\">\n" +
    "            <a href class=\"hbp-file-browser-label btn\" hbp-perform-action=\"browserView.loadMoreFolders()\">\n" +
    "              <span class=\"fa fa-refresh\"></span>\n" +
    "              Load More Folders\n" +
    "            </a>\n" +
    "          </li>\n" +
    "\n" +
    "          <!-- files -->\n" +
    "          <li ng-repeat=\"file in browserView.files\"\n" +
    "              ng-dblclick=\"browseToEntity(file)\"\n" +
    "              ng-click=\"browserView.handleFocus(file)\"\n" +
    "              tooltip-template=\"'templates/file-browser-tooltip.html'\" tooltip-placement=\"bottom\" tooltip-popup-delay=\"600\"\n" +
    "              class=\"hbp-file-browser-item\"\n" +
    "              ng-class=\"{ 'hbp-file-browser-item-selected': browserView.selectedEntity === file }\">\n" +
    "              <div class=\"hbp-file-browser-label\">\n" +
    "                  <hbp-content-icon content=\"file._contentType\"></hbp-content-icon>\n" +
    "                  <span>{{file._name || file._uuid}}</span>\n" +
    "              </div>\n" +
    "          </li>\n" +
    "            <!-- uploads -->\n" +
    "          <li ng-repeat=\"uploadInfo in browserView.uploads\"\n" +
    "              ng-click=\"browserView.handleFocus(null)\"\n" +
    "              tooltip=\"{{uploadInfo.content.name}}\" tooltip-placement=\"bottom\" tooltip-popup-delay=\"600\"\n" +
    "              class=\"hbp-file-browser-item\" ng-class=\"'hbp-file-browser-state-' + uploadInfo.state\">\n" +
    "              <div class=\"hbp-file-browser-label\">\n" +
    "                  <hbp-content-icon content=\"file._contentType\"></hbp-content-icon>\n" +
    "                  <span>{{uploadInfo.content.name}}</span>\n" +
    "              </div>\n" +
    "              <div class=\"hbp-file-browser-item-upload progress\">\n" +
    "                <div class=\"progress-bar\" role=\"progressbar\"\n" +
    "                     aria-valuenow=\"{{uploadInfo.progress}}\"\n" +
    "                     aria-valuemin=\"0\" aria-valuemax=\"100\"\n" +
    "                     style=\"width: {{uploadInfo.progress.percentage}}%\">\n" +
    "                     <span class=\"sr-only\">{{uploadInfo.progress.percentage}}% Complete</span>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "          </li>\n" +
    "            <!-- load more files -->\n" +
    "          <li class=\"hbp-file-browser-item\"\n" +
    "              ng-if=\"browserView.hasMoreFiles\">\n" +
    "            <a href class=\"hbp-file-browser-label btn\" hbp-perform-action=\"browserView.loadMoreFiles()\">\n" +
    "              <span class=\"fa fa-refresh\"></span>\n" +
    "              Load more files\n" +
    "            </a>\n" +
    "          </li>\n" +
    "      </ul>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/file-icon.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/file-icon.html",
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

angular.module("templates/file-upload-area.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/file-upload-area.html",
    "<div class=\"hbp-drop-zone\" ng-class=\"{'hbp-drop-zone-drag-enter': dragEntered, 'hbp-drop-zone-drag-leave': !dragEntered}\" ng-cloak>\n" +
    "    <h4>Drop Files Here to Upload</h4>\n" +
    "    <span>or</span>\n" +
    "    <div class=\"btn btn-default hbp-drop-zone-btn-file\">\n" +
    "        Select Files <input type=\"file\" multiple onchange=\"angular.element(this).scope().onFileChanged(this.files)\" >\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/mini-browser.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/mini-browser.html",
    "<div class=\"hbp-mini-browser\">\n" +
    "    <ul ng-if=\"currentEntity.children.list === undefined\">\n" +
    "        <li><bbp-loading class=\"bbp-browser-loading\"/></li>\n" +
    "    </ul>\n" +
    "    <ul  ng-if=\"currentEntity.children.list !== undefined\">\n" +
    "        <li ng-if=\"!currentEntity.root\">\n" +
    "            <a ng-click=\"back($event)\"><i class=\"hbp-browser-entity-icon fa fa-level-up\"></i>..</a>\n" +
    "        </li>\n" +
    "        <li ng-if=\"currentEntity.children.list.length === 0\"><span class=\"no-entity\">Empty</span></li>\n" +
    "        <li ng-repeat=\"child in currentEntity.children.list\">\n" +
    "            <a ng-if=\"isBrowsable(child)\" ng-click=\"browseTo(child, $event)\" ng-mouseover=\"mouseOver(child)\">\n" +
    "                <hbp-file-icon entity=\"child\"></hbp-file-icon>\n" +
    "                {{child._name}}\n" +
    "                <button ng-if=\"isSelectable(child)\" ng-click=\"select(child, $event)\" class=\"btn btn-xs btn-default\">Select</button>\n" +
    "            </a>\n" +
    "            <span ng-if=\"!isBrowsable(child)\" ng-class=\"{disabled: !isSelectable(child)}\" ng-mouseover=\"mouseOver(child)\">\n" +
    "                <hbp-file-icon entity=\"child\"></hbp-file-icon>\n" +
    "                {{child._name}}\n" +
    "                <button ng-if=\"isSelectable(child)\" ng-click=\"select(child, $event)\" class=\"btn btn-xs btn-default\">Select</button>\n" +
    "            </span>\n" +
    "        </li>\n" +
    "        <li ng-if=\"currentEntity.children.hasNext\"><a class=\"hbp-mini-browser-more\" ng-click=\"loadMore()\">Load more</a></li>\n" +
    "    </ul>\n" +
    "</div>\n" +
    "");
}]);

(function() {
  'use strict';

  angular.module('hbpDocumentClient.ui')
  .directive('hbpFileBrowser', hbpFileBrowser)
  .directive('hbpFileBrowserPath', hbpFileBrowserPath)
  .directive('hbpFileBrowserFolder', hbpFileBrowserFolder);

  ///////////////

  /**
   * @namespace hbpFileBrowser
   * @desc
   * hbpFileBrowser Directive
   *
   * This directive renders a file browser. It accepts the following
   * attributes:
   *
   * - root: the root entity for the current browser. If root is null,
   * it will load all the visible projects.
   * - [entity]: the current entity that should be displayed.
   *
   * @example
   * <hbp-file-browser root="someProjectEntity"
   *                   entity="someSubFolderEntity">
   * </hbp-file-browser>
   *
   * @memberof hbpDocumentClient.ui
   */
  function hbpFileBrowser() {
    return {
      restrict: 'E',
      scope: {
        entity: '=?',
        root: '='
      },
      templateUrl: 'templates/file-browser.html',
      link: hbpFileBrowserLink,
      controllerAs: 'browserView',
      controller: FileBrowserViewModel
    };
  }

  /**
   * @namespace hbpFileBrowserFolder
   * @desc
   * hbpFileBrowserFolder directive is a child directive of
   * hbpFileBrowser that render a folder item within the file browser view.
   *
   * Available attributes:
   * - hbp-file-browser-folder: the folder entity
   * - [hbp-file-browser-folder-icon]: a class name to display an icon
   * - [hbp-file-browser-folder-icon]: a label name (default to folder._name)
   *
   * @example
   * <!-- minimal -->
   * <div hbp-file-browser-folder="folderEntity"></div>
   * <!-- all wings out -->
   * <div hbp-file-browser-folder="folderEntity"
   *      hbp-file-browser-folder-icon="fa fa-level-up"
   *      hbp-file-browser-label="up"></div>
   *
   * @memberof hbpDocumentClient.ui.hbpFileBrowser
   */
  function hbpFileBrowserFolder() {
    return {
      restrict: 'A',
      require: '^hbpFileBrowser',
      templateUrl: 'templates/file-browser-folder.html',
      scope: {
        folder: '=hbpFileBrowserFolder',
        folderIcon: '@hbpFileBrowserFolderIcon',
        folderLabel: '@hbpFileBrowserFolderLabel'
      },
      link: function(scope, element, attrs, ctrl) {
        // make the parent directive controller available in the scope
        scope.browserView = ctrl;
      }
    };
  }

  /**
   * @namespace hbpFileBrowserPath
   * @desc
   * hbpFileBrowserPath directive is a child of hbpFileBrowser directive
   * that renders the breadcrumb according to the file browser setup.
   *
   * @example
   * <hbp-file-browser-path></hbp-file-browser-path>
   *
   * @memberof hbpDocumentClient.ui.hbpFileBrowser
   */
  function hbpFileBrowserPath(hbpEntityStore) {
    return {
      restrict: 'E',
      require: '^hbpFileBrowser',
      templateUrl: 'templates/file-browser-path.html',
      link: function(scope, element, attrs, ctrl) {
        var handleAncestors = function(ancestors) {
          scope.ancestors = ancestors;
        };

        var update = function() {
          hbpEntityStore.getAncestors(ctrl.currentEntity, ctrl.rootEntity)
          .then(handleAncestors, ctrl.setError);
        };

        scope.browserView = ctrl;

        scope.$watch('browserView.currentEntity', update);
      }
    };
  }
  hbpFileBrowserPath.$inject = ['hbpEntityStore'];

  /**
   * @private
   */
  function hbpFileBrowserLink(scope, elt, attrs, ctrl) {
    // run the init function once, when the root has been defined.
    // this ensure the main page is not loaded first with all projects,
    // then with the correct root.
    var delWaitForRootWatcher = scope.$watch('root', function(root) {
      if(angular.isUndefined(root)) {
        return;
      }
      ctrl.init(root, scope.entity);
      var delEntityWatcher = scope.$watch('entity', ctrl.handleNavigation);
      scope.$on('$destroy', delEntityWatcher);
      delWaitForRootWatcher();
    });
    scope.$on('$destroy', delWaitForRootWatcher);
    scope.$on('hbpFileBrowser:startCreateFolder', function(evt) {
      evt.preventDefault();
      elt.find('.new-folder-name').get(0).focus();
    });
  }

  /**
   * @namespace FileBrowserViewModel
   * @desc
   * ViewModel of the hbpFileBrowser directive. This instance is
   * accessible by all direct children of the file browser.
   *
   * It is responsible to handle all the interactions between the user
   * and the services. It does not update the views directly but sends
   * the relevant events when necessary.
   * @memberof hbpDocumentClient.ui.hbpFileBrowser
   */
  function FileBrowserViewModel($scope, $log, $q, $timeout, hbpProjectStore, hbpFileStore, hbpEntityStore, hbpLoadEntityChildren) {
    var vm = this;
    vm.currentEntity = null; // the (container) entity that this view currently describe
    vm.folders = []; // array of displayed folder
    vm.hasMoreFolders = false;
    vm.files = [];   // array of displayed files
    vm.uploads = []; // array of file currently uploading
    vm.hasMoreFiles = false;
    vm.selectedEntity = null; // currently focused entity
    vm.rootEntity = null; // the top level entity;
    vm.isRoot = true;
    vm.error = null;
    vm.isLoading = true;
    vm.canEdit = false;
    vm.thumbnailUrl = null; // current file thumbnail if any

    vm.init = init;
    vm.handleFocus = handleFocusEvent;
    vm.handleNavigation = handleNavigationEvent;
    vm.loadMoreFiles = loadMoreFiles;
    vm.loadMoreFolders = loadMoreFolders;
    vm.onFileChanged = onFileChanged;
    vm.startCreateFolder = startCreateFolder;
    vm.doCreateFolder = doCreateFolder;
    vm.cancelCreateFolder = cancelCreateFolder;
    vm.defineThumbnailUrl = defineThumbnailUrl;

    //////////////////

    var currentUpdate;
    var folderLoader;
    var fileLoader;

    function init(rootEntity, currentEntity) {
      vm.rootEntity = rootEntity;
      currentUpdate = update(currentEntity || rootEntity);
    }

    /**
     * @method handleFocus
     * @desc
     * When the user focus on a browser item,
     * emit a 'hbpFileBrowser:focusChanged' event.
     *
     * The event signature is (event, newEntity, previousEntity).
     *
     * @param  {Object} entity selected entity
     * @memberof hbpDocumentClient.ui.hbpFileBrowser.FileBrowserViewModel
     */
    function handleFocusEvent(entity) {
      if (entity === vm.selectedEntity) {
        return;
      }
      $scope.$emit('hbpFileBrowser:focusChanged', entity, vm.selectedEntity);
      vm.selectedEntity = entity;
    }

    /**
     * @method handleNavigation
     * @desc When the current context change, trigger a navigation update.
     *
     * This will render the view for the new current entity. All navigations
     * are chained to ensure that the future view will end in a consistant
     * state. As multiple requests are needed to render a view, request result
     * would sometimes finish after a new navigation event already occured.
     *
     * @param  {Object} entity the new current entity
     * @return {promise} resolve when the navigation is done.
     * @memberof hbpDocumentClient.ui.hbpFileBrowser.FileBrowserViewModel
     */
    function handleNavigationEvent(entity) {
      if (angular.isUndefined(entity) || entity === vm.currentEntity) {
        return;
      }
      currentUpdate = currentUpdate.finally(function() {
        return update(entity);
      });
    }

    /**
     * Handle error case
     * @private
     */
    function setError(err) {
      $log.error('error catched by file browser:', err);
      vm.error = err;
      vm.isLoading = false;
    }

    function startCreateFolder() {
      vm.showCreateFolder = true;
      $timeout(function() {
        // the event is captured by the directive scope in order to update
        // the DOM. I choose to not update the DOM in the ViewModel but
        // rather in the directive link function.
        $scope.$emit('hbpFileBrowser:startCreateFolder');
      });
    }

    function doCreateFolder($event) {
      $event.preventDefault();
      hbpEntityStore.create('folder', vm.currentEntity, vm.newFolderName)
      .then(function(entity) {
        vm.newFolderName = '';
        return update(entity);
      })
      .then(function() {
        vm.showFileUpload = true;
      })
      .catch(setError);
    }

    function cancelCreateFolder() {
      vm.newFolderName = '';
      vm.showCreateFolder = false;
    }

    function update(entity) {
      vm.isLoading = true;
      vm.currentEntity = entity;
      vm.selectedEntity = entity; // we set the main entity has selected by default
      vm.error = null;
      vm.parent = null;
      vm.files = null;
      vm.folders = null;
      vm.uploads = [];
      vm.showFileUpload = false;
      vm.showCreateFolder = false;

      assignIsRoot(entity);
      assignCanEdit(entity);

      // special exit case for the storage root
      if (!entity) {
        return hbpProjectStore.getAll()
          .then(function(rs) {
            vm.folders = rs.result;
          })
          .then(function() {
            vm.isLoading = false;
          })
          .catch(setError);
      }

      var promises = [];

      // define the new parent entity
      if (!vm.isRoot && entity._parent) {
        promises.push(
          hbpEntityStore.get(entity._parent).then(assignParentEntity)
        );
      }

      // define the view folders
      folderLoader = hbpLoadEntityChildren(entity, {
        accept: ['folder'],
        acceptLink: false
      });
      vm.folders = folderLoader.entities;
      promises.push(
        folderLoader.promise
        .then(afterLoadFolders)
      );

      fileLoader = hbpLoadEntityChildren(entity, {
        accept: ['file'],
        acceptLink: false
      });
      vm.files = fileLoader.entities;
      promises.push(
        fileLoader.promise
        .then(afterLoadFiles)
      );

      return $q.all(promises).then(function() {
        vm.isLoading = false;
      }, setError);
    }

    /**
     * Load the next page of file entities for the current entity.
     *
     * @return {Promise} resolve when the files are loaded
     * @memberof hbpDocumentClient.ui.hbpFileBrowser.FileBrowserViewModel
     */
    function loadMoreFiles() {
      return fileLoader.next()
      .then(afterLoadFiles)
      .catch(setError);
    }

    /**
     * Load the next page of folder entities for the current entity.
     *
     * @return {Promise} resolve when the folders are loaded
     * @memberof hbpDocumentClient.ui.hbpFileBrowser.FileBrowserViewModel
     */
    function loadMoreFolders() {
      return folderLoader.next()
      .then(afterLoadFolders)
      .catch(setError);
    }

    function afterLoadFiles() {
      vm.hasMoreFiles = fileLoader.hasNext;
    }

    function afterLoadFolders() {
      vm.hasMoreFolders = folderLoader.hasNext;
    }

    function assignIsRoot(entity) {
      if (!entity) {
        vm.isRoot = true;
      } else if (!vm.rootEntity) {
        vm.isRoot = false;
      } else {
        vm.isRoot = (entity._uuid === vm.rootEntity._uuid);
      }
    }

    function assignParentEntity(entity) {
      vm.parent = entity;
    }

    /**
     * Upload files that the user just added to the uploader widget.
     *
     * @param  {Array} files array of File
     */
    function onFileChanged(files) {
      _.each(files, function(f) {
        upload(f)
        .then(function(entity) {
          vm.files.push(entity);
        });
      });
      vm.showFileUpload = false;
    }

    /**
     * Create a file entity and upload its associated content.
     *
     * @param  {File} file the file to create and upload
     * @return {Promise} resolve when the file has been uploaded
     */
    function upload(file) {
      var uploadInfo = {
        content: file,
        state: null
      };
      vm.uploads.push(uploadInfo);
      return hbpFileStore.upload(file, {
          parent: vm.currentEntity
      })
      .then(function(entity) {
        // update file status
        file.state = 'success';
        _.remove(vm.uploads, function(info) {
          return info === uploadInfo;
        });
        return entity;
      }, function(err) {
        $log.error('upload error:', err);
        uploadInfo.state = 'error';
        setError(err);
        return $q.reject(err);
      }, function(progressEvent) {
        if(progressEvent && progressEvent.lengthComputable) {
          // update file status
          uploadInfo.state = 'progress';
          uploadInfo.progress = progressEvent;
          uploadInfo.progress.percentage = (progressEvent.loaded*100)/progressEvent.total;
        }
      });
    }

    /**
     * Return a valid thumbnail URL when available.
     *
     * At this point it returns the image file if the file is an image.
     *
     * @param  {Object} file a file entity
     * @return {String} the url to download the file
     */
    function defineThumbnailUrl(file) {
      vm.thumbnailUrl = null;
      if (file._contentType && file._contentType.match(/^image\//)) {
        hbpFileStore.downloadUrl(file).then(function(res) {
          vm.thumbnailUrl = res;
        });
      }
    }

    var lastAssignCanEditRequest = $q.when();
    function assignCanEdit(entity) {
      return lastAssignCanEditRequest = lastAssignCanEditRequest.then(function() {
        if (!entity) {
          vm.canEdit = false;
          return;
        }
        return hbpEntityStore.getUserAccess(entity).then(function(acl) {
          vm.canEdit = acl.canWrite;
        });
      });
    }
  }
  FileBrowserViewModel.$inject = ['$scope', '$log', '$q', '$timeout', 'hbpProjectStore', 'hbpFileStore', 'hbpEntityStore', 'hbpLoadEntityChildren'];
}());

(function() {
  'use strict';

  angular.module('hbpDocumentClient.ui')

  /**
   * @namespace hbpFileIcon
   * @desc
   * hbp-file-icon directive represents the icon corresponding to an entity type.
   *
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
   * @memberof hbpDocumentClient.ui
   * @example
   * <div ng-controller="iconController">
   *     this is the icon for a {{entity._entityType}}: <hbp-file-icon entity="entity"></hbp-file-icon><br/>
   *     this is the icon for a: {{type}} <hbp-icon type="type"></hbp-icon>
   * </div>
   */
  .directive('hbpFileIcon', hbpFileIcon);

  ///////////////////////

  function hbpFileIcon() {
    return {
      templateUrl: 'templates/file-icon.html',
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
  }
}());
angular.module('hbpCommon');

/**
 * @namespace hbpFileUploadArea
 * @desc
 * hbpFileUploadArea directive.
 *
 * Provide an upload widget where user can stack files that should be
 * uploaded at some point. The directive doesn't proceed to upload by itself
 * but rather triggers the onDrop callback.
 *
 * The directive accepts the following attributes:
 *
 * - on-drop: a function to call when one or more files are dropped or selected
 * the callback will receive an array of File instance.
 * - on-error: a function to call when an error occurs. It receives an HbpError
 * instance in parameter.
 *
 * @example
 * <hbp-file-upload-area on-drop="handleFileUpload(files)"
 *                       on-error="handleError(error)">
 * </hbp-file-upload-area>
 * @memberof hbpDocumentClient.ui
 */
angular.module('hbpDocumentClient.ui')
.directive('hbpFileUploadArea', function() {
  'use strict';
  return {
    templateUrl: 'templates/file-upload-area.html',
    restrict: 'E',
    scope: {
      onDrop: '&',
      onError: '&',
      foldersAllowed: '='
    },
    link: function(scope, element) {

      var processDragOver = function(event) {
        event.preventDefault();
        event.stopPropagation();
      };


      var processDragEnter = function(event) {
        event.preventDefault();
        event.stopPropagation();

        scope.dragEntered = true;
        scope.$apply();
      };

      var processDragLeave = function(event) {
        event.preventDefault();
        event.stopPropagation();

        scope.dragEntered = false;
        scope.$apply();
      };

      scope.processDrop = function(event) {
        event.preventDefault();
        event.stopPropagation();

        if(!event.dataTransfer && event.originalEvent) {
          event.dataTransfer = event.originalEvent.dataTransfer;
        }

        scope.dragEntered = false;

        if(!scope.foldersAllowed) {
          var folders = getFolders(event.dataTransfer);
          if(folders.length > 0) {
            var err = new Error('Folders not allowed');
            err.name = 'foldersNotAllowed';
            err.files = folders;
            scope.onError( { error: err } );
            return false;
          }
        }

        scope.onDrop( {files: event.dataTransfer.files} );
      };

      /*
       * return the list of folders in the input dataTransfer object
       */
      function getFolders(dataTransfer) {

        var retList = [];

        // supported by chrome only
        var items = dataTransfer.items;
        if(items) {
          for(var i=0; i < items.length; i++) {
            if(items[i].webkitGetAsEntry().isDirectory) {
              retList.push(items[i].webkitGetAsEntry().name);
            }
          }

        } else {
          // check if unix folders
          var files = dataTransfer.files;
          for(var j=0; j < files.length; j++) {
            // assuming that the chances a (dropped) file is exactly multiple of 4k are low
            if(files[j].size % 4096 === 0) {
              retList.push(files[j].name);
            }
          }
        }

        // Safari is detecting the error when trying to upload it

        // not covered case: FF on OSX

        return retList;
      }

      scope.onFileChanged = function(files) {
        scope.onDrop( {files: files} );
      };

      // enter
      element.on('dragover', processDragOver);
      element.on('dragenter', processDragEnter);
      // exit
      element.on('dragleave', processDragLeave);

      element.on('drop', scope.processDrop);
    }
  };
});

(function(){
  'use strict';

  angular.module('hbpDocumentClient.ui')

    /*
     * This directive represents a small file browser with the capacity to register a callback for file selection
     */
    .directive('hbpMiniBrowser', ['hbpEntityStore', 'hbpProjectStore', function(hbpEntityStore, hbpProjectStore) {
      return {
        restrict: 'E',
        templateUrl: 'templates/mini-browser.html',
        scope: {
          selection: '&hbpSelection',
          selectable: '&hbpSelectable',
          browsable: '&hbpBrowsable',
          hovered: '&hbpHovered',
          entity: '=hbpCurrentEntity'
        },
        controller: ['$scope', '$q', function ($scope, $q) {

          // loads the entity child
          function getChildren(entity, options) {
            var root = !entity;
            var opts = _.extend({}, options);
            var writeOpts = _.extend({}, options, { access: 'write', from: null, pageSize: 0 });

            if(root) {
              return $q.all({
                  all: hbpProjectStore.getAll(opts),
                  write: hbpProjectStore.getAll(writeOpts)
                }).then( function(res) {
                  var writeProjects = _.pluck(res.write.result, '_uuid');
                  // add current users permissions to entities
                  _.forEach(res.all.result, function(project) {
                      project.canRead = true;
                      project.canWrite = writeProjects.indexOf(project._uuid) !== -1;
                  });

                  return {
                    list: res.all.result,
                    hasNext: res.all.hasMore
                  };
                });

            } else {
              // there is a parent, we display it's children
              return hbpEntityStore.getChildren(entity).then(function(res){
                return {
                  list: res.result,
                  hasNext: res.hasMore
                };
              });
            }
          }

          function initCurrentEntity(root, entity, children) {
            return {
              root: root,
              entity: entity || null,
              children: children || {}
            };
          }

          // Loads the current entity parent's children
          $scope.back = function (event) {
            event.preventDefault();

            if(!$scope.currentEntity.root) {
              var parent = $scope.currentEntity.entity._parent;
              if(parent) {

                $scope.currentEntity = initCurrentEntity(false);

                // there is a parent, we display it's children
                hbpEntityStore.get(parent).then(function(entity) {
                  $scope.currentEntity.entity = entity;
                  getChildren(entity).then(function(result) {
                    $scope.currentEntity.children = result;
                  });
                });

              } else {
                // otherwise we display the list of root entities
                $scope.currentEntity = initCurrentEntity(true);
                getChildren().then(function(result) {
                  $scope.currentEntity.children = result;
                });
              }
            }
          };

          // Loads current entity's children
          $scope.browseTo = function (child, event) {
            event.preventDefault();

            $scope.currentEntity = initCurrentEntity(false, child);

            getChildren(child).then(function(result) {
              $scope.currentEntity.children = result;
            });
          };

          $scope.loadMore = function () {
            var lastId = $scope.currentEntity.children.list[$scope.currentEntity.children.list.length - 1]._uuid;
            var addToCurrentEntity = function(res) {
              // remove the first element of the new page to avoid duplicate
              res.list.shift();
              // add new page to previous children list
              Array.prototype.push.apply($scope.currentEntity.children.list, res.list);

              $scope.currentEntity.children.hasNext = res.hasNext;
            };

            getChildren($scope.currentEntity.entity, {from: lastId}).then(addToCurrentEntity);
          };

          // Calls the selection callback if defined
          $scope.select = function (entity, event) {
            event.preventDefault();
            if($scope.selection) {
              $scope.selection()(entity);
            }
          };

          // Calls the mouse-over callback if defined
          $scope.mouseOver = function (entity) {
            if(angular.isFunction($scope.hovered())) {
              $scope.hovered()(entity);
            }
          };

          $scope.isBrowsable = function (entity) {
            return $scope.browsable() ? $scope.browsable()(entity): (
              entity._entityType !== 'file' &&
              entity._entityType !== 'link:file'
            );
          };

          $scope.isSelectable = function(entity) {
            if($scope.selectable && $scope.selectable()) {
              return $scope.selectable()(entity);
            }
            return false;
          };

          // initialize current entity with provided entity if any
          if ($scope.entity && $scope.entity._parent) {
            $scope.currentEntity = initCurrentEntity(false, {
              _uuid: $scope.entity._parent
            });
            // load all info
            hbpEntityStore.get($scope.currentEntity.entity._uuid).then(function(entity) {
              $scope.currentEntity.entity = entity;
              //load entity children
              getChildren(entity).then(function(result) {
                $scope.currentEntity.children = result;
              });
            });
          } else {
            // init empty currentEntity
            $scope.currentEntity = initCurrentEntity(true);
            // load root children (== all projects)
            getChildren().then(function(result) {
              $scope.currentEntity.children = result;
            });
          }
        }]
      };
    }]);
}());

(function() {
  'use strict';

  /**
   * @private
   * @desc
   * This factory is currently private as it needs to evolve to a more generic
   * beast.
   */
  angular.module('hbpDocumentClient.ui')
  .factory('hbpLoadEntityChildren', ['$q', 'hbpEntityStore', 'hbpErrorService', function($q, hbpEntityStore, hbpErrorService) {
    return function(parent, options) {
      return new EntityChildrenLoader($q, hbpEntityStore, hbpErrorService, parent, options);
    };
  }]);

  //////////

  function EntityChildrenLoader($q, store, errorService, parent, options) {
    var self = this;

    self.entities = [];
    self.state = null;
    self.error = null;
    self.hasNext = false;
    self.hasPrevious = false;

    self.next = next;
    self.previous = previous;

    self.promise = init();

    /////

    var filteredOptions;

    var mergeStrategies = {
      replace: function(resultSet) {
        self.hasPrevious = !!resultSet.hasPrevious;
        self.hasNext = !!resultSet.hasMore;
        self.entities.push.apply(self.entities, resultSet.result);
      },
      append: function(resultSet) {
        self.hasNext = !!resultSet.hasMore;
        resultSet.result.shift(); // remove the first result which is the
                                  // last one from the current list
        self.entities.push.apply(self.entities, resultSet.result);
      },
      prepend: function(resultSet) {
        self.hasPrevious = !!resultSet.hasPrevious;
        resultSet.result.pop(); // remove the last result which is the first
                                // from the current list
        self.entities.unshift.apply(self.entities, resultSet.result);
      }
    };

    function init() {
      filteredOptions = _.pick(options, function(v, k) {
        return ['from', 'until'].indexOf(k) === -1;
      });
      self.state = 'loading';
      return store.getChildren(parent, options)
      .then(function(resultSet) {
        mergeStrategies.replace(resultSet);
        self.state = 'ready';
      })
      .catch(errorHandler);
    }

    function next() {
      return self.promise = self.promise.then(function() {
        self.state = 'loading';
        return store.getChildren(
          parent,
          angular.extend({from: self.entities[self.entities.length-1]._uuid}, filteredOptions)
        )
        .then(function(resultSet) {
          mergeStrategies.append(resultSet);
          self.state = 'ready';
        });
      })
      .catch(errorHandler);
    }

    function previous() {
      return self.promise = self.promise.then(function() {
        self.state = 'loading';
        return store.getChildren(
          parent,
          angular.extend({until: self.entities[0]._uuid}, filteredOptions)
        )
        .then(function(resultSet) {
          mergeStrategies.prepend(resultSet);
          self.state = 'ready';
        });
      })
      .catch(errorHandler);
    }

    function errorHandler(err) {
      self.error = err;
      self.state = 'error';
      $q.reject(err);
    }
  }
}());

/**
 * @namespace hbpEntityStore
 * @desc
 * The `hbpEntityStore` service retrieve any kind of entity.
 *
 * @see Entity format: https://services-dev.humanbrainproject.eu/document/v0/ui/#!/entity/get_entity_get_0
 * @memberof hbpDocumentClient.core
 */
angular.module('hbpDocumentClient.core')
.service('hbpEntityStore', ['$http', '$q', 'bbpConfig', 'hbpIdentityUserDirectory', 'hbpDocumentClientResolveUserIds', 'hbpErrorService', function($http, $q, bbpConfig, hbpIdentityUserDirectory, hbpDocumentClientResolveUserIds, hbpErrorService) {
    'use strict';
    var baseUrl = bbpConfig.get('api.document.v0');
    var hbpEntityStore = {};
    var promises = {};

    // Ensure there is only one async `fn` run named `k` at once.
    // subsequent call to runOnce with the same `k` value will
    // return the promise of the running async function.
    var runOnce = function(k, fn) {
      if (!promises[k]) {
        promises[k] = fn().finally(function() {
          promises[k] = null;
        });
      }
      return promises[k];
    };

    /**
     * Get an entity from its id
     *
     * @function
     * @memberof hbpDocumentClient.core.hbpEntityStore
     */
    hbpEntityStore.get = function (id) {
      var url = baseUrl + '/entity/' + id;
      var k = 'GET ' + url;
      return runOnce(k, function() {
        return $http.get(url).then(function(data) {
          return data.data;
        });
      });
    };

    /**
     * Query entities by attributes or metadata.
     *
     * @function
     * @memberof hbpDocumentClient.core.hbpEntityStore
     */
    hbpEntityStore.query = function(params) {
      return $http.get(baseUrl + '/entity/', {
        params: params
      }).then(function(response) {
        return response.data;
      });
    };

    /**
     * Return true if the entity should be considered as a container.
     *
     * @function
     * @memberof hbpDocumentClient.core.hbpEntityStore
     */
    hbpEntityStore.isContainer = function(entity) {
      return (/.*(folder|release|project)$/).test(entity._entityType);
    };

    /**
     * Retrieve an array of entities from root to the current entity (where `root` and `entity` are omitted).
     * @function
     * @memberof hbpDocumentClient.core.hbpEntityStore
     */
    hbpEntityStore.getAncestors = function (entity, root) {
      // End recursion condition
      if (!entity || !entity._parent || (root && entity._parent === root._uuid)) {
        return $q.when([]);
      }

      var onError = function(err) {
        $q.reject(hbpErrorService.error({
          type: 'EntityAncestorRetrievalError',
          message: 'Cannot retrieve some ancestors from entity ' + entity._name,
          data: {
            entity: entity,
            root: root,
            cause: err
          }
        }));
      };

      var recurse = function(parent) {
        return hbpEntityStore.getAncestors(parent, root)
        .then(function(ancestors) {
          ancestors.push(parent);
          return ancestors;
        });
      };

      return hbpEntityStore.get(entity._parent)
        .then(recurse, onError);
    };

    /**
     * Retrieve the complete path of the provided entity
     *
     * @function
     * @memberof hbpDocumentClient.core.hbpEntityStore
     */
    hbpEntityStore.getPath = function (entity) {
      var deferred = $q.defer();
      var path = entity._name;
      var onError = function() {
        deferred.reject('Cannot retrieve entity path');
      };
      if (!entity._parent) {
        deferred.resolve('/'+path);
      } else {
        hbpEntityStore.get(entity._parent).then(function(parent) {
          hbpEntityStore.getPath(parent)
          .then(function(parPath) {
            path = parPath + '/' + path;
            deferred.resolve(path);
          }, onError);
        }, onError);
      }
      return deferred.promise;
    };

    var buildEntityTypeFilter = function(accept, acceptLink) {
      if (acceptLink) {
        accept = accept.concat(_.map(
          (acceptLink === true)? accept : acceptLink,
          function(type) {
            return 'link:'+type;
          })
        );
      }
      if (accept && accept.length > 0) {
        return '_entityType='+accept.join('+');
      } else {
        return;
      }
    };

    /**
     * @desc
     * Retrieve children entities of a 'parent' entity according to the options and
     * add them to the children list.
     * The returned promise will be resolved with the
     * list of fetched children and a flag indicating if more results are available
     * in the queried direction.
     *
     * Available options:
     *
     * * accept: array of accepted _entityType,
     * * acceptLink: true or an array of accepted linked _entityType,
     * * sort: property to sort on (default to '_name'),
     * * resolveUserId (=false): if true, resolve user ids to user names
     * * until: fetch results until the given id (exclusive with from)
     * * from: fetch results from the given id (exclusive with until)
     *
     * @function
     * @memberof hbpDocumentClient.core.hbpEntityStore
     */
    hbpEntityStore.getChildren = function(parent, options) {
      var d = $q.defer();
      options = angular.extend({}, options);

      $http.get(baseUrl+'/'+parent._entityType + '/' + parent._uuid + '/children', {
        params: {
          filter: buildEntityTypeFilter(options.accept, options.acceptLink),
          sort: (options.sort)? options.sort : '_name',
          from: options.from,
          until: options.until
        }
      }).then(function(res){
        var children = res.data.result;

        if (options.resolveUserId) {
          hbpDocumentClientResolveUserIds(children);
        }
        d.resolve(res.data);
      }, d.reject, d.notify);
      return d.promise;
    };

    /**
     * @desc
     * Get current user access right to the provided entity.
     *
     * The returned promise will be resolved
     * with an object literal containing three boolean
     * flags corresponding the user access:
     *
     * - canRead
     * - canWrite
     * - canManage
     *
     * @function
     * @memberof hbpDocumentClient.core.hbpEntityStore
     */
    hbpEntityStore.getUserAccess = function(entity) {
      var deferred = $q.defer();

      $q.all( {
        'acl': $http.get(baseUrl+'/'+entity._entityType + '/' + entity._uuid + '/acl'),
        'user': hbpIdentityUserDirectory.getCurrentUser()
      })
      .then( function(aggregatedData) {
        var acls = aggregatedData.acl.data; // expected resp: { 111: 'write', 222: 'manage', groupX: 'manage'}
        var user = aggregatedData.user;

        var access = {
          canRead: false,
          canWrite: false,
          canManage: false
        };

        _.forEach(acls, function(acl, id) {
          if(id === user.id || user.groups.indexOf(id) >= 0) {
            access.canRead = access.canRead || acl === 'read' || acl === 'write' || acl === 'manage';
            access.canWrite = access.canWrite || acl === 'write' || acl === 'manage';
            access.canManage = access.canManage || acl === 'manage';
          }
        });

        deferred.resolve(access);
      }, deferred.reject);

      return deferred.promise;
    };

    /**
     * Add metadata to the provided entity and returns a promise that resolves to an object
     * containing all the new metadata. The promise fails if one of the metadata already exists.
     *
     * @function
     * @memberof hbpDocumentClient.core.hbpEntityStore
     */
    hbpEntityStore.addMetadata = function(entity, metadata) {
      return $http.post(baseUrl + '/' + entity._entityType + '/' + entity._uuid + '/metadata', metadata)
        .then(function(response) {
          return response.data;
        });
    };

    /**
     * Delete metadata keys in input from the provided entity and returns a promise that resolves to an object
     * containing all the remaining metadata. The promise fails if one of the metadata doesn't exist.
     *
     * @function
     * @memberof hbpDocumentClient.core.hbpEntityStore
     */
    hbpEntityStore.deleteMetadata = function(entity, metadataKeys) {
      return $http.delete(baseUrl + '/' + entity._entityType + '/' + entity._uuid + '/metadata', { data: { keys: metadataKeys }})
        .then(function(response) {
          return response.data;
        });
    };

    hbpEntityStore.create = function(type, parent, name, options) {
      return $http.post(
        baseUrl+'/'+type.split(':')[0],
        angular.extend({
          _name: name,
          _parent: parent &&  parent._uuid || parent
        }, options)
      )
      .then(function(res) {
        return res.data;
      })
      .catch(function(err) {
        if (err.code === 0) {
          err = hbpErrorService.error({
            type: 'Aborted',
            message: 'Network unreachable',
            code: 0
          });
        } else {
          err = hbpErrorService.httpError(err);
        }
        if (err.message.match(/already exists/)) {
          err.type = 'FileAlreadyExistError';
        } else {
          err.type = 'EntityCreationError';
        }
        err.cause = err.type; // preserve legacy API
        return $q.reject(err);
      });
    };

    return hbpEntityStore;
  }]
);

// the API retrieve object using underscore names, authorize.
/*jshint camelcase:false*/

/**
 * @namespace hbpFileStore
 * @desc
 * The `hbpFileStore` service deal with file entity type.
 *
 * @see Entity format: https://services-dev.humanbrainproject.eu/document/v0/ui/#!/entity/get_entity_get_0
 * @memberof hbpDocumentClient.core
 */
angular.module('hbpDocumentClient.core')
.provider('hbpFileStore', function() {
  'use strict';

  return {
    $get: ['$http', '$q', '$log', 'bbpConfig', 'hbpEntityStore', 'hbpErrorService', function($http, $q, $log, bbpConfig, hbpEntityStore, hbpErrorService) {
      var maxFileSize = bbpConfig.get('hbpFileStore.maxFileUploadSize', 10*1024*1024);

      var hbpFileStore = {};
      var baseUrl = bbpConfig.get('api.document.v0');

      var error = function(cause, options) {
        options = options || {};
        var name = 'UploadError';

        var err = new Error(name+': '+cause+' '+options.message);
        err.cause = cause;
        err.statusText = options.message;
        err.name = name;
        err.file = options.file;
        err.entity = options.entity;
        return err;
      };

      var abortError = function() {
        return error('Aborted');
      };


      var entityUrl = function(entity) {
        return baseUrl+'/'+entity._entityType.split(':')[0]+'/'+entity._uuid;
      };

      var deleteEntity = function(entity) {
        return $http.delete(entityUrl(entity));
      };

      var uploadFile = function(file, entity, config) {
        var d = $q.defer();
        $http.post(entityUrl(entity)+'/content/upload', file, angular.extend({
            headers: {
              'Content-Type': 'application/octet-stream'
            }
          }, config)
          ).success(function(entity) {
            d.notify({
              lengthComputable: true,
              total: file.size,
              loaded: file.size
            });
            d.resolve(entity);
          }).error(function(err, status) {
            var uploadError = function() {
              if (!err || status === 0) {
                return abortError();
              } else {
                return error('UploadError', {
                  message: err.message,
                  file: file,
                  entity: entity
                });
              }
            };
            deleteEntity(entity).then(function() {
              d.reject(uploadError(err));
            }, function(deleteErr) {
              $log.error('Unable to remove previously created entity', deleteErr);
              d.reject(uploadError(err));
            });
          });
        return d.promise;
      };

      /**
       * Create file entity and upload the content of the given file.
       *
       * `options` should contain a `parent` key containing the parent entity.
       *
       * Possible error causes:
       *
       * - FileTooBig
       * - UploadError - generic error for content upload requests
       * - EntityCreationError - generic error for entity creation requests
       * - FileAlreadyExistError
       *
       * @function
       * @memberof hbpDocumentClient.core.hbpFileStore
       * @param {File} file The file descriptor to upload
       * @param {Object} options The list of options
       * @return {Promise} a Promise that notify about progress and resolve
       *   with the new entity object.
       * @memberof hbpDocumentClient.core.hbpFileStore
       */
      hbpFileStore.upload = function(file, options) {
        options = options || {};
        var d = $q.defer();
        var dAbort = $q.defer();

        d.promise.abort = function() {
          dAbort.resolve();
        };

        if (file.size > maxFileSize) {
          d.reject(error('FileTooBig', {
            message: 'The file `'+file.name+'` is too big('+file.size+' bytes), max file size is '+maxFileSize+' bytes.'
          }));
          return d.promise;
        }

        var entityOpts = {
          _contentType: file.type
        };
        hbpEntityStore.create('file', options.parent && options.parent._uuid, file.name, entityOpts)
        .then(function(entity) {
          d.notify({
            lengthComputable: true,
            total: file.size,
            loaded: 0
          });

          uploadFile(file, entity, {
            timeout: dAbort.promise,
            uploadProgress: function(event) {
              d.notify(event);
            }
          }).then(
            function(entity) {
              d.promise.abort = function() {
                deleteEntity(entity);
                dAbort.resolve();
              };
              d.resolve(entity);
            },
            d.reject,
            d.notify
          );

        }, d.reject);

        return d.promise;
      };

      /**
       * Ask for a short-lived presigned URL to be generated to download a file
       *
       * Deprecated in favor of requestDownloadUrl(entity). Will be removed as
       * of version 1.0.0
       *
       * @function
       * @memberof hbpDocumentClient.core.hbpFileStore
       */
      hbpFileStore.requestSignedUrl = function (id) {
        $log.debug('hbpFileStore.requestSignedUrl(id) is deprecated, use hbpFileStore.downloadUrl(entityOrId) instead');
        return $http.get(baseUrl+'/' + 'file/' + id + '/content/secure_link').then(function(response) {
          return response.data;
        });
      };

      /**
       * hbpFileStore. downloadUrl(entity) method asynchronously ask for a
       * short-lived, presigned URL that can be used to access and
       * download a file without authentication.
       *
       * This method is a replacement for requestSignedUrl which retrieve an
       * object containing a partial URL.
       *
       * @function
       * @memberof hbpDocumentClient.core.hbpFileStore
       */
      hbpFileStore.downloadUrl = function (entity) {
        var id = entity._uuid || entity;
        return $http.get(baseUrl+'/' + 'file/' + id + '/content/secure_link')
        .then(function(response) {
          return baseUrl + response.data.signed_url;
        }, function(err) {
          return $q.reject(hbpErrorService.httpError(err));
        });
      };

      /**
       * Retrieves the content of a file given its id.
       *
       * @function
       * @memberof module:hbpFileStor
       */
      hbpFileStore.getContent = function (id) {
        return $http({
          method: 'GET',
          url: baseUrl+'/' + 'file/' + id + '/content',
          transformResponse: function(data) { return data; }
        }).then(function(data) {
          return data.data;
        });
      };

      /**
       * Retrieve the max upload file size in bytes.
       *
       * @function
       * @memberof hbpDocumentClient.core.hbpFileStore
       */
      hbpFileStore.maxFileSize = function() {
        return maxFileSize;
      };

      return hbpFileStore;
    }]
  };
});

/**
 * @namespace hbpProjectStore
 * @desc
 * The `hbpProjectStore` service deal with file entity type.
 *
 * @see Entity format: https://services-dev.humanbrainproject.eu/document/v0/ui/#!/entity/get_entity_get_0
 * @memberof hbpDocumentClient.core
 */
angular.module('hbpDocumentClient.core')
.service('hbpProjectStore', ['$http', '$q', 'bbpConfig', 'hbpDocumentClientResolveUserIds', function($http, $q, bbpConfig, hbpDocumentClientResolveUserIds) {
  'use strict';
  var baseUrl = bbpConfig.get('api.document.v0');
  var hbpProjectStore = {};

  function getAll(options, acc) {
    var retVal = acc || [];
    return $http.get(baseUrl + '/project', {
      params: {
        sort: (options.sort)? options.sort : '_name',
        from: options.from,
        until: options.until,
        filter: options.filter,
        access: options.access,
        limit: options.pageSize > 0 ? options.pageSize : null
      }
    }).then(function(res) {
      retVal.push.apply(retVal, res.data.result);
      if(options.pageSize === 0 && res.data.hasMore) {
        var lastId = _.last(retVal)._uuid;
        var newOptions = angular.extend({}, options, { from: lastId });
        // remove the last element to avoid duplicate
        retVal.pop();

        return getAll(newOptions, retVal);
      } else {
        return {
          result: retVal,
          hasMore: res.data.hasMore
        };
      }
    });
  }

  /**
   * Retrieve all the user's projects. The returned promise will be resolved
   * with the list of fetched project and a flag indicating if more results
   * are available in the queried direction.
   *
   * Available options:
   * - sort: property to sort on,
   * - resolveUserId (=false): if true, resolve user ids to user names
   * - until: fetch results until the given id (exclusive with from)
   * - from: fetch results from the given id (exclusive with until)
   * - access: filter the result bases on acls. Values: 'read' (default), 'write'
   * - pageSize: number of results per page. Default is provided by the service.
   *             Set to '0' to fetch all records.
   *
   * @function
   * @memberof hbpDocumentClient.core.hbpDocumentClient
   */
  hbpProjectStore.getAll = function(options) {
    var d = $q.defer();
    options = angular.extend({}, options);

    getAll(options).then(function(res) {
      var projects = res.result;

      if (options.resolveUserId) {
        hbpDocumentClientResolveUserIds(projects);
      }
      d.resolve(res);
    }, d.reject, d.notify);
    return d.promise;
  };

  return hbpProjectStore;
}]);

/**
 * @private
 * This factory is undocumented as it is meant for internal use only.
 * The API is subject to change without further notice.
 */
angular.module('hbpDocumentClient')
.factory('hbpDocumentClientResolveUserIds', ['hbpIdentityUserDirectory', function(hbpIdentityUserDirectory) {
  'use strict';

  return function(entites) {
     // Get the list of user's ids and try to find thier name
    var userIds = _.map(entites, '_createdBy');

    hbpIdentityUserDirectory.get(userIds).then(function (users) {
      for (var i = 0; i < entites.length; i++) {
        var user = users[entites[i]._createdBy];
        if (user) {
          entites[i]._createdByName = user.displayName;
        } else {
          // If no name was found for user we use it's id
          entites[i]._createdByName = entites[i]._createdBy;
        }
      }
    });
  };
}]);
