#!/usr/bin/env python
""" HBP Collaboratory python oauth2 module """
from setuptools import setup
from hbp_app_python_auth.version import VERSION
from pip.req import parse_requirements
from optparse import Option

import pip

#This is a hack to work with newer versions of pip
if pip.__version__.startswith('1.5') or pip.__version__.startswith('6') or pip.__version__.startswith('7') :
    from pip.download import PipSession # pylint:disable=E0611
    OPTIONS = Option("--workaround")
    OPTIONS.skip_requirements_regex = None
    OPTIONS.isolated_mode = False
    INSTALL_REQS = parse_requirements("./requirements.txt", # pylint:disable=E1123
                                      options=OPTIONS,
                                      session=PipSession)
else:  # this is the production path, running on RHEL
    OPTIONS = Option("--workaround")
    OPTIONS.skip_requirements_regex = None
    INSTALL_REQS = parse_requirements("./requirements.txt", options=OPTIONS)


REQS = [str(ir.req) for ir in INSTALL_REQS]

setup(name='hbp-app-python-auth',
      version=VERSION,
      description='hbp collaboratory python oauth2 module',
      packages=['hbp_app_python_auth'],
      author='bbp platform team',
      author_email='bbp-ou-platformdev@epfl.ch',
      license='BBP-internal-confidential',
      url='http://bluebrain.epfl.ch',
      install_requires=REQS,
      )
