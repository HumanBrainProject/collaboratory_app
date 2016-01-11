'''helper functions to generate human-friendly strings containing
serialised objects of types derived from BaseType or BaseObject.
'''

import ast


def object_to_string_call(obj):
    '''write a string that represents the arguments required to build a
    a value object of this type.
    used for serializing the object to a human-readable string
    '''
    items = obj.to_dict().items()
    args = ', '.join(['%s=%s' % (k, repr(v)) for k, v in items])
    return '%s(%s)' % (obj.__class__.__name__, args)


def object_from_string_call(string):
    '''deserialize a value object encoded in a string
    used for serializing the object to a human-readable string

    expected format is: TargetTypeName(object-params)
    note that TargetTypeName has to be the name of a type targeted
    by one of our type classes or a type classes itself.
        ie:  long is the target of LongType
             'long(10)' -> 10L
        ie:  bool is the target of BoolType
             'bool('True')' -> True
        ie:  URI is the target of URIType
             'URI('h5', '/a/b')' -> URI(category='h5', path='/a/b')
    '''
    try:
        ast_parse = ast.parse(string, mode='eval').body
    except SyntaxError:
        raise ValueError('Expected string of format Typename(object-params). Got %s' % string)

    from task_types.TaskTypes import ALL_TYPES
    from task_types.TaskOps import CallTuple, parse_val

    if isinstance(ast_parse, ast.Name) and string in ALL_TYPES:
        call_tuple = \
            CallTuple(ast_parse.id, None, [], {})

    elif isinstance(ast_parse, ast.Call):
        call_tuple = parse_val(ast_parse)

    else:
        raise ValueError('Expected basic type or string of format '
                         'Typename(object-params). Got %s (ast %s)' %
                         (string, type(ast_parse)))

    return _object_from_call(call_tuple, ALL_TYPES)


def _object_from_call(call_tuple, allowed_types):
    '''build an object (type or value) from a CallTuple.
    Deals with recursive type objects (like lists).'''

    from task_types.TaskOps import CallTuple

    type_name = call_tuple.name or call_tuple.attr

    if type_name not in allowed_types:
        raise ValueError('Type %s not found for deserialization. '
                         'Expected one of %s' %
                         (type_name, allowed_types.keys()))

    type_class = allowed_types[type_name]

    def build_arg_call_tuple(arg):
        '''if this object takes any type object as an argument, build it'''
        if isinstance(arg, CallTuple):
            return _object_from_call(arg, allowed_types)
        elif isinstance(arg, list):
            return map(build_arg_call_tuple, arg)
        else:
            return arg

    args = map(build_arg_call_tuple, call_tuple.args)

    def build_kwarg_call_tuple(pair):
        '''if this object takes any type object as an argument, build it'''
        return pair[0], build_arg_call_tuple(pair[1])

    kwargs = map(build_kwarg_call_tuple, call_tuple.kwargs.items())
    kwargs = dict(kwargs)

    #pylint-disable: using * or ** magics
    restored_object = type_class(*args, **kwargs)

    return restored_object
