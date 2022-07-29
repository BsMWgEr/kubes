from django.contrib import admin
from .models import Ingredient, Side, Soup, Salad, Sandwich, Entree, Burger, App, \
    Cheese, Dessert, Dressing, Question, BarIngredient, Cocktail, Liquor, Wine, \
    Beer, QuizResult, QuizAnswerAttempt

# Register your models here.
admin.site.register(Soup)
admin.site.register(Salad)
admin.site.register(Sandwich)
admin.site.register(Burger)
admin.site.register(Dessert)
admin.site.register(Cheese)
admin.site.register(Dressing)
admin.site.register(Question)
admin.site.register(BarIngredient)
admin.site.register(Cocktail)
admin.site.register(Liquor)
admin.site.register(Beer)
admin.site.register(Wine)
admin.site.register(QuizResult)
admin.site.register(QuizAnswerAttempt)



@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ('ingredient',)

@admin.register(Side)
class SideAdmin(admin.ModelAdmin):
    list_display = ('side',)

@admin.register(Entree)
class EntreeAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(App)
class AppAdmin(admin.ModelAdmin):
    list_display = ('name',)
