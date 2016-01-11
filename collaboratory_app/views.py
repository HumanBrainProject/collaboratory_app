from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required
from django.views.decorators.cache import never_cache
from django.conf import settings
from hbp_app_python_auth.auth import get_access_token, get_token_type, get_auth_header
from social.apps.django_app.default.models import UserSocialAuth
from uuid import UUID


def __hbp_config(request):
    conf = settings.HBP_CONFIG
    conf['auth']['token'] = __get_client_token(request)


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


@never_cache
@login_required(login_url='/login/hbp/')
def show(request):
    '''Render the wiki page using the provided context query parameter'''
    context = UUID(request.GET.get('ctx'))
    return render_to_response('show.html', {'context': context, 'config': __hbp_config(request)})


@never_cache
@login_required(login_url='/login/hbp/')
def edit(request):
    '''Render the wiki edit form using the provided context query parameter'''
    context = UUID(request.GET.get('ctx'))
    return render_to_response('edit.html', {'context': context, 'config': __hbp_config(request)})
