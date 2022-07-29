from django.db import models

# Create your models here.


class Ingredient(models.Model):
    ingredient = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.ingredient}"


class Dressing(models.Model):
    dressing = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.dressing}"


class Cheese(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name}"


class Side(models.Model):
    side = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.side}"


class Soup(models.Model):
    name = models.CharField(max_length=100)
    ingredients = models.ManyToManyField(Ingredient, blank=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name}"


class Entree(models.Model):
    CHICKEN = 'chicken'
    BEEF = 'beef'
    STEAK = 'steak'
    PORK = 'pork'
    FISH = 'fish'
    Proteins = [
        (CHICKEN, 'Chicken'),
        (BEEF, 'Beef'),
        (STEAK, 'Steak'),
        (PORK, 'Pork'),
        (FISH, 'Fish'),
    ]

    name = models.CharField(max_length=100)
    protein = models.CharField(max_length=100, choices=Proteins)
    ingredients = models.ManyToManyField(Ingredient, blank=True)
    description = models.TextField(blank=True, null=True)
    sides = models.ManyToManyField(Side, blank=True)
    options_or_mods = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.name}"


class App(models.Model):
    name = models.CharField(max_length=100)
    ingredients = models.ManyToManyField(Ingredient, blank=True)
    description = models.TextField(blank=True, null=True)
    options_or_mods = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name}"


class Burger(models.Model):
    name = models.CharField(max_length=100)
    cheese = models.ForeignKey(Cheese, blank=True, null=True, on_delete=models.SET_NULL)
    ingredients = models.ManyToManyField(Ingredient, blank=True)
    description = models.TextField(blank=True, null=True)
    options_or_mods = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name}"


class Sandwich(models.Model):
    name = models.CharField(max_length=100)
    cheese = models.ForeignKey(Cheese, blank=True, null=True, on_delete=models.SET_NULL)
    ingredients = models.ManyToManyField(Ingredient, blank=True)
    description = models.TextField(blank=True, null=True)
    options_or_mods = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name}"


class Salad(models.Model):
    name = models.CharField(max_length=100)
    ingredients = models.ManyToManyField(Ingredient, blank=True)
    description = models.TextField(blank=True, null=True)
    dressing = models.ForeignKey(Dressing, blank=True, null=True, on_delete=models.SET_NULL)
    options_or_mods = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name}"


class Dessert(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name}"


class BarIngredient(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name}"


class Liquor(models.Model):
    VODKA = 'vodka'
    RUM = 'rum'
    TEQUILA = 'tequila'
    BOURBON = 'bourbon'
    WHISKEY = 'whiskey'
    SCOTCH = 'scotch'
    CORDIALS = 'cordials'

    Liquor_Types = [
        (VODKA, 'Vodka'),
        (RUM, 'Rum'),
        (TEQUILA, 'Tequila'),
        (BOURBON, 'Bourbon'),
        (WHISKEY, 'Whiskey'),
        (SCOTCH, 'Scotch'),
        (CORDIALS, 'Cordials'),
    ]
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=100, choices=Liquor_Types)

    def __str__(self):
        return f"{self.name}"


class Cocktail(models.Model):
    MIXED = 'mixed'
    FROZEN = 'frozen'
    Cocktail_Types = [
        (MIXED, 'Mixed'),
        (FROZEN, 'Frozen')
    ]
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=100, choices=Cocktail_Types)
    description = models.TextField()
    bar_ingredients = models.ManyToManyField(BarIngredient, blank=True)
    options_or_mods = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name}"


class Wine(models.Model):
    RED = 'red'
    WHITE = 'white'
    SPLITS = 'splits'
    CHAMPAGNE = 'champagne'
    Wine_Types = [
        (RED, 'Red'),
        (WHITE, 'White'),
        (SPLITS, 'Splits'),
        (CHAMPAGNE, 'Champagne'),
    ]
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=100, choices=Wine_Types)
    region = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return f"{self.name}"


class Beer(models.Model):
    LAGER = 'lager'
    IPA = 'ipa'
    Beer_Types = [
        (LAGER, 'Lager'),
        (IPA, 'IPA'),
    ]
    name = models.CharField(max_length=100)
    draft = models.BooleanField(default=False)
    bottle = models.BooleanField(default=False)
    type = models.CharField(max_length=100, choices=Beer_Types)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name}"


class Question(models.Model):
    question = models.TextField()
    answer = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.question}"


class QuizResult(models.Model):
    user = models.CharField(max_length=100)
    quiz_number = models.CharField(max_length=100)
    correct = models.CharField(max_length=3)
    incorrect = models.CharField(max_length=3)
    score = models.CharField(max_length=10)
    start_time = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    end_time = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"{self.user} {self.quiz_number} {self.score}"


class QuizAnswerAttempt(models.Model):
    user = models.CharField(max_length=100)
    quiz_number = models.CharField(max_length=100)
    answer_correct = models.BooleanField(default=False)
    question = models.CharField(max_length=100)
    answer = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.answer_correct == True:
            answer_correct = "Correct"
        else:
            answer_correct = "Incorrect"
        return f"{self.user} {self.quiz_number} {answer_correct}"





