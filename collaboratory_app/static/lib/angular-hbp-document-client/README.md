# angular-hbp-document-client

An AngularJS client library to access the HBP Collaboratory Storage.

JSLibAngularDocumentClient provides
the `angular-hbp-document-client` bower component.

The component `angular-hbp-document-client` provides
the `hbpDocumentClient` angular module.

The `hbpDocumentClient` module export some services and one directive:

* services:
  * `hbpEntityStore`
  * `hbpFileStore`
  * `hbpProjectStore`
* directive:
  * `<hbp-mini-browser></hbp-mini-browser>`
  * `<hbp-file-browser root="entity" entity="someFolder"></hbp-file-browser>`
  * `<hbp-file-icon entity="aFile"></hbp-file-icon>`

# Install

You can install this module using bower:

```
bower install angular-hbp-document-client --save
```

# Example

An example application can be found in the `example` folder.
You can start the server from the command line:

```bash
$ grunt serve
```

# Issues

Issue can be reported in Jira:
https://bbpteam.epfl.ch/project/issues/browse/LBK

# Need Help

Contact us:

* email: bbp-ou-platformdev@groupes.epfl.ch
