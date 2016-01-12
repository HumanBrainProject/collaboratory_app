from django import forms
from .models import CollaboratoryContext


class EditForm(forms.ModelForm):

    class Meta:
        model = CollaboratoryContext
        fields = ['comment', 'ctx', 'xkcd_num']
        widgets = {
            'ctx': forms.HiddenInput(),
            'comment': forms.TextInput(attrs={
                'class': 'form-control',
                'ng-model': 'vm.model.comment',
            }),
            'xkcd_num': forms.TextInput(attrs={
                'class': 'form-control',
                'ng-model': 'vm.model.xkcd_num'
            })
        }
