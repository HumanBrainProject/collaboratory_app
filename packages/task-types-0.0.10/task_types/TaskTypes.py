''' module includes the types that tasks can use, and methods for
checking that types conform to expected types
'''
#disable warnings on circular import, it should be handled correctly
# pylint: disable=R0401

import types

import task_types.TaskOps
import task_types.MimeTypes as mt
from task_types.serialization import object_to_string_call

import logging
L = logging.getLogger(__name__)


class JSONable(object):
    '''an object that can be to converted to/from a json-friendly format'''

    def pre_json(self):
        '''get this object in a json-friendly format (dict)'''
        return {'object': self.__class__.__name__,
                'contents': JSONable.data_hierachy_pre_json(self.to_dict())}

    @staticmethod
    def post_json(json_rep):
        '''restore an object from its json-friendly representation (dict).
           return None otherwise'''
        if isinstance(json_rep, dict):
            if 'object' in json_rep and 'contents' in json_rep:
                cl = ALL_TYPES[json_rep['object']]
                restored_contents = JSONable.data_hierachy_post_json(json_rep['contents'])
                built = cl(**restored_contents)
                return built

        return None

    @staticmethod
    def data_hierachy_pre_json(original):
        '''Traverse a hierarchy of lists and dictionaries to pre_json any JSONable object'''

        if isinstance(original, (tuple, list)):
            return [JSONable.data_hierachy_pre_json(o) for o in original]

        elif isinstance(original, dict):
            return dict((k, JSONable.data_hierachy_pre_json(v)) for k, v in original.items())

        elif isinstance(original, JSONable):
            json_data = original.pre_json()
            L.debug('transformed object from %s to %s', original, json_data)
            return json_data
        else:
            return original

    @staticmethod
    def data_hierachy_post_json(json_data):
        '''Traverse a hierarchy of lists and dictionaries to post_json any JSONable object'''

        if isinstance(json_data, (tuple, list)):
            return [JSONable.data_hierachy_post_json(o) for o in json_data]
        else:
            restored = JSONable.post_json(json_data)
            if restored:
                L.debug('restored object from %s to %s', json_data, restored)
                return restored
            elif isinstance(json_data, dict):
                return dict((k, JSONable.data_hierachy_post_json(v)) for k, v in json_data.items())
            else:
                return json_data

    def to_dict(self):
        '''return a dict with keys set to our properties
        used for serializing the object to JSON
        '''
        raise NotImplementedError


class BaseType(JSONable):
    '''BaseType for our custom types, do not instantiate
    '''
    target_type = None

    def __init__(self, desc=None, default_value=None):
        if type(self) is BaseType:
            raise ValueError('Cannot directly instantiate BaseType')
        self.desc = desc
        self.default_value = default_value

    def type_conforms(self, value_object):
        '''Allow for more fine grained type checking

        Note: Analogous to python's isinstanceof

        Returns: False if the type of the value object does not match \
                 that specified by this type object in a fine grained way.

        '''
        raise NotImplementedError

    def build_value(self, *args, **kwargs):
        '''Attempt to build a value object of this type

         Note: This might mean coercing the type of the argument to the correct one
         for base types.

         Returns: None for failure
         '''
        raise NotImplementedError

    def to_dict(self):
        '''Return a dict with keys set to our properties
        '''
        ret = {}
        if self.desc is not None:
            ret['desc'] = self.desc
        if self.default_value is not None:
            ret['default_value'] = self.default_value
        return ret

    @classmethod
    def from_dict(cls, d):
        '''convert back from a dictionary'''
        return cls(**d)

    def __repr__(self):
        return object_to_string_call(self)

    def __eq__(self, other):
        return (type(self) == type(other) and
                self.desc == other.desc and
                self.default_value == other.default_value)

    def __ne__(self, other):
        return not self == other


class PythonBaseType(BaseType):
    ''' All supported python types are derived from this
    '''
    def __init__(self, **kwargs):
        '''Takes the type that best conforms with this type object's
        description and uses it to coerce basic python types.

        For example LongType accepts ints and longs but prefers longs
        '''
        # TODO do build_value for default values of non-basic-python types
        if 'default_value' in kwargs:
            kwargs['default_value'] = self.build_value(kwargs['default_value'])
        super(PythonBaseType, self) .__init__(**kwargs)

    # pylint-disable: Arguments differ because overridden method takes **
    def build_value(self, value_object):  # pylint: disable=W0221
        if self.type_conforms(value_object):
            # pylint-disable: Not callable. But it is!
            return self.target_type(value_object)  # pylint: disable=E1102
        return None

    def type_conforms(self, value_object):
        raise NotImplementedError


class StringType(PythonBaseType):
    '''Represents strings either unicode or asccii.
    Allows descriptions, and added properties.

    >>> from task_types import TaskTypes as tt
    >>> t = tt.StringType()
    >>> t.build_value('asdf')
    u'asdf'
    >>> t.build_value(100)
    # returns None, since 100 is not a str or unicode)
    '''
    target_type = unicode

    def __init__(self, **kwargs):
        super(StringType, self).__init__(**kwargs)

    def type_conforms(self, value_object):
        return isinstance(value_object, (str, unicode))


class DoubleType(PythonBaseType):
    '''Represents doubles or floats.

    >>> from task_types import TaskTypes as tt
    >>> t = tt.DoubleType()
    >>> t.build_value(1)
    1.0
    >>> t.build_value('one hundred')
    # returns None, since 'one hundred' is not a number

    '''
    target_type = float

    def __init__(self, **kwargs):
        super(DoubleType, self) .__init__(**kwargs)

    def type_conforms(self, value_object):
        return isinstance(value_object,
                          (types.FloatType, types.IntType, types.LongType))


class LongType(PythonBaseType):
    '''Represents integers, long, short, signed or unsigned.
    Allows descriptions, and added properties.

    >>> from task_types import TaskTypes as tt
    >>> t = tt.LongType()
    >>> t.build_value(1)
    1L
    >>> t.build_value('one hundred')
    # returns None, since 'one hundred' is not a number

    '''
    target_type = long

    def __init__(self, **kwargs):
        super(LongType, self).__init__(**kwargs)

    def type_conforms(self, value_object):
        return isinstance(value_object, (int, long))


class BooleanType(PythonBaseType):
    '''Represents booleans. It will accept and cast integers and
    the string literals 'true' and 'false' (case insensitive).
    Allows descriptions, and added properties.

    >>> from task_types import TaskTypes as tt
    >>> t = tt.BooleanType()
    >>> t.build_value(1)
    True
    >>> t.build_value('True')
    True
    >>> t.build_value('one hundred')
    # returns None, since 'one hundred' is not a boolean
    '''
    target_type = bool

    def __init__(self, **kwargs):
        super(BooleanType, self) .__init__(**kwargs)

    def type_conforms(self, value_object):
        return isinstance(value_object,
                          (types.BooleanType, types.LongType, types.IntType))

    # pylint-disable: Arguments differ because overridden method takes **
    def build_value(self, value_object):  # pylint: disable=W0221
        '''coerce to bool, if it's a int/bool/long.
        cast from string if it looks like a literal
        '''
        built = super(BooleanType, self).build_value(value_object)

        if built is None and isinstance(value_object, str):
            if 'true' == value_object.lower():
                built = True
            elif 'false' == value_object.lower():
                built = False

        return built


class ListOf(BaseType):
    '''Allows for grouping of like objects, which must pass the normal type checking

    The ListOf type allows for an iterable to be introduced into the type
    system.  The elements of iterable *must* be composed of all of the same
    type, and an exception is raised when type checking happens if they do not.

    >>> from task_types import TaskTypes as tt
    >>> t = tt.ListOf(tt.LongType)
    >>> t.build_value([1, 2, 3])
    [1L, 2L, 3L]
    >>> t.build_value([1, 'two', 3])
    [1L, None, 3L]
    #Note: 'two' is not a LongType, so it's serialized to None
    >>> t.build_value('asdf')
    [None, None, None, None]
    #Note: 'asdf' is iterable, but each the letters are not numbers, so they each return None

    '''
    target_type = list

    def __init__(self, subtype, **kwargs):
        subtype = task_types.TaskOps.convert_to_types(subtype)
        self.subtype = task_types.TaskOps.ensure_typename(subtype)
        super(ListOf, self) .__init__(**kwargs)

    def __eq__(self, other):
        return (super(ListOf, self).__eq__(other) and
                self.subtype == other.subtype)

    def to_dict(self):
        ret = super(ListOf, self).to_dict()
        ret['subtype'] = self.subtype
        return ret

    def type_conforms(self, value_object):
        if not isinstance(value_object, list):
            L.debug('Object is of type %s instead of type list',
                    type(value_object))
            return False

        for item in value_object:
            if not self.subtype.type_conforms(item):
                L.debug('Object %s in list is of type %s insteado of type %s',
                        item, type(item), self.subtype)
                return False

        return True

    # pylint-disable: Arguments differ because overridden method takes **
    def build_value(self, value_object):  # pylint: disable=W0221
        # coerce contents
        return [self.subtype.build_value(item) for item in value_object]


class BaseObject(JSONable):  # pylint: disable=W0223
    '''
    BaseObject for our custom objects, do not instantiate
    '''

    def __repr__(self):
        return object_to_string_call(self)


class URI(BaseObject):
    '''
    A unique identifier for a file.

    For example, URI('image/png', '0000') represents a single png file that is stored
    as a document with id '0000'.

    Along with a unique identifier of the resource (most likely a file), it contains the
    the MIME-like type of the object that links it to a unique URIType.

    '''

    def __init__(self, category, document):
        ''' creates a URI

        Args:
            category(URI/str/URIType): The MIMEType of the URI
            document(str): the associated document identifier

        >>> from task_types import TaskTypes as tt
        >>> tt.URI('image/png', '1be6a01e-d133-11e3-ae3c-b8ca3a8b13f6')
        URI(category='image/png', document='1be6a01e-d133-11e3-ae3c-b8ca3a8b13f6')

        '''

        super(URI, self) .__init__()
        if isinstance(category, URIType):
            self.category = mt.get_mimetype(category.category)
        elif isinstance(category, mt.MIMEType):
            self.category = category
        else:
            self.category = mt.get_mimetype(category)
        self.document = document

    def __eq__(self, other):
        return (type(self) == type(other) and
                self.category == other.category and
                self.document == other.document)

    def __ne__(self, other):
        return not self == other

    def to_dict(self):
        '''return a dict with keys set to our properties'''
        return {'category': self.category.mimetype, 'document': self.document}


class URIType(BaseType):
    '''Represents a class of files.

    For example, URIType('image/png') represents all files that are png images.

    More specifically, a URIType is description of a group of URI objects with common properties.
    The relationship of URIType to URI is analogous to LongType to 1L.

    The value of the 'category' is a `MIMEType`.  Two URITypes are equal when
    they have exactly the same category.

    The categories, in addition to being used for type checking, also are use
    by the document server and the content display servers to correctly display
    content.

    '''
    target_type = URI

    def __init__(self, category, **kwargs):
        '''Init a URIType

        Args:
            category(URI/str/URIType): The MIMEType of the URI

        >>> from task_types import TaskTypes as tt
        >>> tt.URIType('image/png')
        URIType(category='image/png')

        '''
        self.category = mt.get_mimetype(category)
        super(URIType, self) .__init__(**kwargs)

    def to_dict(self):
        ret = super(URIType, self).to_dict()
        ret['category'] = self.category.mimetype
        return ret

    # pylint-disable: Arguments differ because overridden method takes **
    def build_value(self, value_object):  # pylint: disable=W0221
        '''build typed uri from string'''
        if isinstance(value_object, (str, unicode)):
            return URI(category=self.category.mimetype, document=value_object)
        elif isinstance(value_object, URI):
            return value_object
        return None

    def type_conforms(self, value_object):
        if not isinstance(value_object, URI):
            return False
        return self.category == value_object.category


# Types allowed for parameter definitions (in the task decorator)
_ALLOWED_TYPES_CLASSES = set([
    StringType, DoubleType, LongType, BooleanType,
    ListOf, URIType, ])

# Maps the name used to identify a serialized type object to its class
_ALLOWED_TYPES_DICT = dict([
    (c.__name__, c) for c in _ALLOWED_TYPES_CLASSES])

# Target types of all allowed types.
# Maps the name used to identify a serialized value object to its target class
_ALLOWED_TARGET_TYPES_DICT = dict(
    [(c.target_type.__name__, c.target_type) for c in _ALLOWED_TYPES_CLASSES])


ALLOWED_TYPES = _ALLOWED_TYPES_DICT.keys()

ALL_TYPES = dict(_ALLOWED_TYPES_DICT.items() +
                 _ALLOWED_TARGET_TYPES_DICT.items())
