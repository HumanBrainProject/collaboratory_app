from django.core import validators
from django.db import models


class CollaboratoryContext(models.Model):
    """A generic HBP Software"""
    software_name_validator = validators.RegexValidator(r'^[0-9a-zA-Z_-]*$')

    ctx = models.UUIDField(unique=True)
    comment = models.CharField(max_length=140, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta(object):
        '''meta'''
        ordering = ['ctx']

    # UUIDField is not supported by automatic JSON serializer
    # so we add a method that retrieve a more convenient dict.
    def as_json(self):
        return {
            'title': self.title,
            'text': self.text,
            'ctx': str(self.ctx),
        }

    def __unicode__(self):
        return str.format("{0}({1})", self.ctx, + self.comment)

    @models.permalink
    def get_absolute_url(self):
        return reverse('clbctx_show', args=[str(self.ctx)])
