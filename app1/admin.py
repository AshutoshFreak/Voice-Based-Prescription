from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from app1.form import UserCreationForm
from app1.models import User


class UserAdmin(BaseUserAdmin):
    add_form = UserCreationForm
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'first_name', 'last_name', 'is_patient', 'is_doctor', 'password1', 'password2')}
         ),
    )


admin.site.register(User, UserAdmin)
