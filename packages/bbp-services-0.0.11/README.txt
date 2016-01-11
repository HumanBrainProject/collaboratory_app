Utility to store services, their base urls and meta information.

This way, a single place can be modified, and a package uploaded, 
and all dependencies updated at once (after triggering updates on the
servers).

The 'client.py', when run, will parse the data/*.yaml files, and output a
table suitable for inclusion in confluence.
