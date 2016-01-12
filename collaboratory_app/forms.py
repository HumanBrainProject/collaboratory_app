from django import forms
from .models import CollaboratoryContext


class EditForm(forms.ModelForm):

    class Meta:
        model = CollaboratoryContext
        fields = ['comment', 'ctx']
        widgets = {
            'ctx': forms.HiddenInput(),
            'comment': forms.TextInput(attrs={
                'class': 'form-control',
                'ng-model': 'vm.model.comment',
            })
        }
