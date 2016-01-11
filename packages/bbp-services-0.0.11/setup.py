'''setup.py'''

# pylint: disable=F0401,E0611

try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup

import bbp_services
import pip
from pip.req import parse_requirements
from optparse import Option

options = Option("--workaround")
options.skip_requirements_regex = None
if pip.__version__.startswith('1.'):
    install_reqs = parse_requirements('requirements.txt', options=options)
else:
    from pip.download import PipSession  # pylint:disable=E0611
    options.isolated_mode = False
    install_reqs = parse_requirements('requirements.txt',  # pylint:disable=E1123
                                      options=options,
                                      session=PipSession)
reqs = [str(ir.req) for ir in install_reqs]

config = {
    'name': 'bbp-services',
    'description': 'Utility to more easily find service names, urls, etc',
    'author': 'mgevaert',
    'url': 'http://bluebrain.epfl.ch',
    'author_email': 'michael.gevaert@epfl.ch',
    'version': bbp_services.__version__,
    'install_requires': reqs,
    'packages': ['bbp_services'],
    'scripts': [],
    'include_package_data': True,
}

setup(**config)
