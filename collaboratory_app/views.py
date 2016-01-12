from django.shortcuts import render_to_response, render
from django.contrib.auth.decorators import login_required
from django.views.decorators.cache import never_cache
from django.conf import settings
from django.http import HttpResponseForbidden
from hbp_app_python_auth.auth import get_access_token, get_token_type, get_auth_header
from social.apps.django_app.default.models import UserSocialAuth
from uuid import UUID

from .forms import EditForm
from .models import CollaboratoryContext

import bleach
import requests


def __hbp_config(request):
    conf = settings.HBP_CONFIG
    conf['auth']['token'] = __get_client_token(request)
    return conf


def __get_client_token(request):
    try:
        social_auth = request.user.social_auth.get()
        return {
            'access_token': get_access_token(social_auth),
            'token_type': get_token_type(social_auth),
            'expires_in': __get_session_expiry_age(request),
        }
    except UserSocialAuth.DoesNotExist:
        raise exceptions.UserTypeException(request.user)


def __get_session_expiry_age(request):
    return request.session.get_expiry_age()


def __is_collaborator(request):
    '''check access depending on context'''

    svc_url = settings.HBP_COLLAB_SERVICE_URL

    context = request.GET.get('ctx')
    if not context:
        return False
    url = '%s/collab/context/%s/' % (svc_url, context)
    headers = {'Authorization': get_auth_header(request.user.social_auth.get())}
    res = requests.get(url, headers=headers)
    if res.status_code != 200:
        return False
    collab_id = res.json()['collab']['id']
    url = '%s/collab/%s/permissions/' % (svc_url, collab_id)
    res = requests.get(url, headers=headers)
    if res.status_code != 200:
        return False
    return res.json().get('UPDATE', False)


@never_cache
@login_required(login_url='/login/hbp/')
def show(request):
    '''Render the wiki page using the provided context query parameter'''
    context = UUID(request.GET.get('ctx'))
    instance = CollaboratoryContext.objects.get(ctx=context)
    try:
        instance = CollaboratoryContext.objects.get(ctx=context)
    except WikiPage.DoesNotExist:
        instance = None
    return render(request, 'show.html', {
        'context': context,
        'model': instance,
        'config': __hbp_config(request)
    })


@never_cache
@login_required(login_url='/login/hbp/')
def edit(request):
    '''Render the wiki edit form using the provided context query parameter'''

    # WARN: Uncomment the following code that check if a member is
    # member of the collab.
    #
    # It has been disabled to be able to bootstrap the lab
    # quicker.
    #
    # if not __is_collaborator(request):
    #     return HttpResponseForbidden()

    context = UUID(request.GET.get('ctx'))

    # get or build the instance
    try:
        instance = CollaboratoryContext.objects.get(ctx=context)
    except CollaboratoryContext.DoesNotExist:
        instance = CollaboratoryContext(ctx=context)

    if request.method == 'POST':
        form = EditForm(request.POST, instance=instance)
        if form.is_valid():
            instance = form.save(commit=False)
            # Clean up user input
            instance.comment = bleach.clean(instance.comment)
            instance.save()
    else:
        form = EditForm(instance=instance)

    return render(request, 'edit.html', {
        'form': form,
        'context': context,
        'config': __hbp_config(request)
    })
