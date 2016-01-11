'''mime-type parsing code'''


class MIMEType(object):
    '''container for MIMEtype information, largely used internally'''
    def __init__(self, type, subtype, extension, parameters, comment=''):  # pylint: disable=W0622
        self.type = type
        self.subtype = subtype
        self.extension = extension
        self.parameters = parameters or []
        self.comment = comment

    @property
    def mimetype(self):
        '''Get the MIMEType string

        Returns: string representing the MIMEType

        >>> import task_types.MimeTypes as mt
        >>> m = mt.MIMEType.from_mimestring('image/png')
        >>> m.mimetype
        'image/png'

        '''
        ret = '%s/%s' % (self.type, self.subtype)
        if self.extension:
            ret += '+' + self.extension
        if self.parameters:
            ret += ';' + ';'.join(['%s=%s' % (k, v) for k, v in self.parameters])
        return ret

    def to_dict(self):
        '''get the dictionary of all the parts in the MIMEtype

        Returns: dict of MIMEType parts

        >>> import task_types.MimeTypes as mt
        >>> m = mt.MIMEType.from_mimestring('image/png')
        >>> m.to_dict()
        {'comment': None, 'mimetype': 'image/png', 'parameters': [], \
         'extension': None, 'subtype': 'png', 'type': 'image'}

        '''
        ret = dict(self.__dict__)
        ret['mimetype'] = self.mimetype
        return ret

    @staticmethod
    def from_mimestring(mime, comment=None):
        '''create a MIMEType instance from a MIME string

        Args:
            mime(str): Standard MIME string
            comment(str): option comment

        Returns: MIMEType object

        Raisese:
            TypeError for non-string inputs

        >>> import task_types.MimeTypes as mt
        >>> m = mt.MIMEType.from_mimestring('image/png')
        >>> type(m)
        <class 'task_types.MimeTypes.MIMEType'>

        '''
        return MIMEType(comment=comment, **MIMEType._parse_mime(mime))

    @staticmethod
    def _parse_mime(mime):
        '''parse a mime string, return a dictionary containing
        type, subtype, extension, parameters (list)
        '''
        if not isinstance(mime, basestring):
            raise TypeError('Expected string got %s' % type(mime))

        ret = {}
        parts = mime.split(';')
        ret['parameters'] = [tuple([s.strip() for s in param.split('=', 1)])
                             for param in parts[1:]]
        ret['type'], subtype = parts[0].strip().split('/')

        if '+' in subtype:
            subtype, ret['extension'] = subtype.split('+')
        else:
            ret['extension'] = None

        ret['subtype'] = subtype

        return ret

    def __eq__(self, other):
        if isinstance(other, (str, unicode)):
            other = MIMEType.from_mimestring(other)

        return (self.type == other.type and
                self.subtype == other.subtype and
                # don't care about these:
                # self.extension == other.extension and
                # self.comment == other.comment and
                self.parameters == other.parameters)

    def __ne__(self, other):
        return not self == other

    def __repr__(self):
        return self.mimetype


def get_mimetype(mt):
    '''Get the value of the MIMEType corresponding to a string

    Args:
        mt: A MIMEType object or string (ex: 'image/png')

    Returns: validated MIMEType object

        >>> import task_types.MimeTypes as mt
        >>> m = mt.get_mimetype('image/png')
        >>> type(m)
        <class 'task_types.MimeTypes.MIMEType'>

    '''
    if not isinstance(mt, MIMEType):
        mt = MIMEType.from_mimestring(mt)

    return mt
