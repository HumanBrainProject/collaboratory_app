'''custom encoding to json'''
import datetime
import json
from collections import deque

import task_types.TaskTypes as tt


class PlatformEncoder(json.JSONEncoder):
    """allow serializing of our type system to json """
    def default(self, obj):  # pylint: disable=E0202
        if isinstance(obj, datetime.datetime):
            return obj.isoformat()
        elif isinstance(obj, tt.JSONable):
            return obj.pre_json()
        elif isinstance(obj, (set, deque)):
            return list(obj)

        return json.JSONEncoder.default(self, obj)

    @staticmethod
    def deserialize(obj):
        '''on every dictionary, attempt to detect and deserialize the
        type/value that it might be encoding.
        Returns the value object if deserialization succeeded.
        Returns the original argument otherwise'''
        restored = tt.JSONable.post_json(obj)
        return restored or obj


def dumps(obj, pretty=False):
    '''dump to json using this encoder'''
    dump_opts = dict(sort_keys=True, indent=4, separators=(',', ': ')) if pretty else {}
    return json.dumps(obj, cls=PlatformEncoder, **dump_opts)


def loads(s, **kwargs):
    '''load from json using this decoder'''
    return json.loads(s, object_hook=PlatformEncoder.deserialize, **kwargs)
