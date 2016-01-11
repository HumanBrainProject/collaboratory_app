from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required
from django.conf import settings
from uuid import UUID


@login_required(login_url='/login/hbp/')
def show(request):
    '''Render the wiki page using the provided context query parameter'''
    context = UUID(request.GET.get('ctx'))
    return render_to_response('show.html', {'context': context})


@login_required(login_url='/login/hbp/')
def edit(request):
    '''Render the wiki edit form using the provided context query parameter'''
    context = UUID(request.GET.get('ctx'))
    return render_to_response('edit.html', {'context': context})
