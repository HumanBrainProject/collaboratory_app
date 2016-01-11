'''setup.py'''
# pylint: disable=F0401,E0611

import os

from setuptools import setup

import task_types

import pip
from pip.req import parse_requirements
from optparse import Option


def parse_reqs(reqs_file):
    ''' parse the requirements '''
    options = Option('--workaround')
    options.skip_requirements_regex = None
    # Hack for old pip versions: Versions greater than 1.x
    # have a required parameter "sessions" in parse_requierements
    if pip.__version__.startswith('1.'):
        install_reqs = parse_requirements(reqs_file, options=options)
    else:
        from pip.download import PipSession  # pylint:disable=E0611
        options.isolated_mode = False
        install_reqs = parse_requirements(reqs_file,  # pylint:disable=E1123
                                          options=options,
                                          session=PipSession)
    return [str(ir.req) for ir in install_reqs]

BASEDIR = os.path.dirname(os.path.abspath(__file__))
REQS = parse_reqs(os.path.join(BASEDIR, 'requirements.txt'))

config = {
    'description': 'Task Types used in BBP Project',
    'author': 'mgevaert',
    'url': 'ssh://bbpcode.epfl.ch/platform/PlatformTaskManager/',
    'author_email': 'michael.gevaert@epfl.ch',
    'version': task_types.__version__,
    'install_requires': REQS,
    'name': 'task-types',
    'packages': ['task_types'],
    'include_package_data': True,
}

setup(**config)
