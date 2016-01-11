#!/usr/bin/env python
import os
import sys

# Add lib in path to simplify this lab
# use pip instead for normal behaviors
sys.path.append(os.path.join(os.path.dirname(__file__), "lib"))

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "collaboratory_app.settings")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
