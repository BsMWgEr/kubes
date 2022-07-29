from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout, get_user_model
from .models import App, Entree, Side, Sandwich, Burger, Salad, Soup, Ingredient, Dessert, \
    Cocktail, BarIngredient, Beer, Wine, Dressing, QuizResult, QuizAnswerAttempt
from django.http import JsonResponse
import random

User = get_user_model()


def index(request):
    home = True
    current_user = 'GUEST'
    if request.user.is_authenticated:
        current_user = request.user.username
    context = {
        "current_user": current_user,
        "home": home
    }
    return render(request, 'frontpage.html', context=context)


def api(request):
    items_all = []
    other_all = []
    beer = []
    if request.GET.get('item') == 'salads':
        items_all = Salad.objects.all()
    if request.GET.get('item') == 'burgers':
        items_all = Burger.objects.all()
    if request.GET.get('item') == 'sandwiches':
        items_all = Sandwich.objects.all()
    if request.GET.get('item') == 'apps':
        items_all = App.objects.all()
    if items_all != []:
        ingredients = []
        for y in items_all:
            for q in y.ingredients.all():
                ingredients.append({y.id: q.ingredient})

        container_list = [{
            "id": x.id,
            "name": x.name,
            "description": x.description,
            "options_mods": x.options_or_mods
        } for x in items_all]

        data = {
            "response": container_list,
            "ingredients": ingredients
        }
        return JsonResponse(data)
    if request.GET.get('item') == 'soups':
        items_all = Soup.objects.all()
        ingredients = []
        for y in items_all:
            for q in y.ingredients.all():
                ingredients.append({y.id: q.ingredient})

        container_list = [{
            "id": x.id,
            "name": x.name,
            "description": x.description,
        } for x in items_all]

        data = {
            "response": container_list,
            "ingredients": ingredients
        }
        return JsonResponse(data)

    if request.GET.get('item') == 'desserts':
        other_all = Dessert.objects.all()

    if other_all != []:
        container_list = [{
            "id": x.id,
            "name": x.name
        } for x in other_all]

        data = {
            "response": container_list,
        }
        return JsonResponse(data)

    if request.GET["item"] == 'dressing':
        other_all = Dressing.objects.all()
        container_list = [{
            "id": x.id,
            "dressing": x.dressing,
            "description": x.description,
        } for x in other_all]

        data = {
            "response": container_list,
        }
        return JsonResponse(data)
    if request.GET.get('item') == 'sides':
        other_all = Side.objects.all()
        container_list = [{
            "id": x.id,
            "name": x.side
        } for x in other_all]

        data = {
            "response": container_list,
        }
        return JsonResponse(data)

    if request.GET.get('item') == 'ingredients':
        other_all = Ingredient.objects.all()
        container_list = [{
            "id": x.id,
            "ingredient": x.ingredient
        } for x in other_all]

        data = {
            "response": container_list,
        }
        return JsonResponse(data)

    if request.GET.get('item') == 'entrees':
        entree_all = Entree.objects.all()
        ingredients = []
        sides = []
        for y in entree_all:
            for q in y.ingredients.all():
                ingredients.append({y.id: q.ingredient})
            for w in y.sides.all():
                sides.append({y.id: w.side})
        
        container_list = [{
            "id": x.id,
            "name": x.name,
            "protein": x.protein,
            "description": x.description,
            "options_mods": x.options_or_mods
        } for x in entree_all]

        data = {
            "response": container_list,
            "ingredients": ingredients,
            "sides": sides
        }
        return JsonResponse(data)

    if request.GET.get('item') == 'cocktails':
        cocktails = Cocktail.objects.all()

        container_list = [{
            "id": x.id,
            "name": x.name,
            "protein": x.type,
            "description": x.description,
            "options_mods": x.options_or_mods
        } for x in cocktails]

        data = {
            "response": container_list
        }
        return JsonResponse(data)

    if request.GET.get('item') == 'wine':
        wine = Wine.objects.all()

        container_list = [{
            "id": x.id,
            "name": x.name,
            "type": x.type,
            "region": x.region,
            "description": x.description,
        } for x in wine]

        data = {
            "response": container_list
        }
        return JsonResponse(data)

    if request.GET.get('item') == 'all':
        beer = Beer.objects.all()
    if request.GET.get('item') == 'draft':
        beer = Beer.objects.filter(draft=True)
    if request.GET.get('item') == 'bottle':
        beer = Beer.objects.filter(bottle=True)
    if beer != []:
        container_list = [{
            "id": x.id,
            "name": x.name,
            "type": x.type,
            "draft": x.draft,
            "bottle": x.bottle,
            "description": x.description,
        } for x in beer]

        data = {
            "response": container_list
        }
        return JsonResponse(data)

    if request.GET.get('item') == 'questions':
        ingredients = Ingredient.objects.all()
        list_one = []
        answers_ingredients = []
        answers_description = []
        item = []
        item_name = ''
        random_number = random.randint(1, 10)

        if random_number > 5 or random_number == 1:
            entree = Entree.objects.all()
            for x in entree:
                list_one.append(x.name)
            item = entree
            item_name = 'entree'
        elif random_number == 2:
            app = App.objects.all()
            for x in app:
                list_one.append(x.name)
            item = app
            item_name = 'app'
        elif random_number == 3:
            salad = Salad.objects.all()
            for x in salad:
                list_one.append(x.name)
            item = salad
            item_name = 'salad'
        elif random_number == 4:
            burger = Burger.objects.all()
            for x in burger:
                list_one.append(x.name)
            item = burger
            item_name = 'burger'
        elif random_number == 5:
            sandwich = Sandwich.objects.all()
            for x in sandwich:
                list_one.append(x.name)
            item = sandwich
            item_name = 'sandwich'
        random_number = random.randint(0, (len(list_one) - 1))

        question_item = list_one[random_number]
        for p in item:
            if question_item == p.name:
                answers_description.append(p.description)
                for y in p.ingredients.all():
                    answers_ingredients.append(y.ingredient)

        new_array2 = []

        rand2 = random.randint(0, (len(answers_ingredients) - 1))

        new_array2.append(answers_ingredients[rand2])

        incorrect_answers = []
        for q in ingredients.all():
            incorrect_answers.append(q.ingredient)
            for t in answers_ingredients:
                if q.ingredient == t:
                    incorrect_answers.remove(t)

        new_array = []
        for x in range(3):
            rand1 = random.randint(0, (len(incorrect_answers) - 1))
            new_array.append(incorrect_answers[rand1])
            incorrect_answers.pop(rand1)

        random_question = [
            f"What is in the {question_item}?",
            f"{item_name}"
        ]

        data = {
            "question": random_question,
            "answer": new_array2,
            "incorrect": new_array,
            "answer_description": answers_description
        }
        print(data)
        return JsonResponse(data)


def question(request):
    type_ = request.GET.get('item')
    question_ = request.GET.get('question').lower()
    answer = request.GET.get('answer').lower()
    quiz_number = request.GET.get('quiz_number')
    q_count = request.GET.get('q_count')
    item = []
    if type_ == 'entree':
        item = Entree.objects.all()
    elif type_ == 'app':
        item = App.objects.all()
    elif type_ == 'sandwich':
        item = Sandwich.objects.all()
    elif type_ == 'burger':
        item = Burger.objects.all()
    elif type_ == 'salad':
        item = Salad.objects.all()
    elif type_ == 'soup':
        item = Soup.objects.all()
    response = ''
    for x in item:
        if x.name.lower() in question_.lower():
            for y in x.ingredients.all():
                if y.ingredient.lower() in answer:
                    response = 'success'

    quiz_attempt = QuizAnswerAttempt()

    quiz_attempt.user = request.user.username
    quiz_attempt.quiz_number = quiz_number

    if response == 'success':
        quiz_attempt.answer_correct = True
        if q_count == '1':
            q_correct = QuizResult.objects.filter(quiz_number=quiz_number)
            num = 0
            for x in q_correct:
                if x.correct:
                    print(x.correct)
                    num = x.correct
            num = int(num) + 1
            print(num)
            QuizResult.objects.filter(quiz_number=quiz_number).update(correct=num)
    else:
        quiz_attempt.answer_correct = False
        if q_count == '1':
            q_incorr = QuizResult.objects.filter(quiz_number=quiz_number)
            num = 0
            for x in q_incorr:
                if x.correct:
                    print(x.incorrect)
                    num = int(x.incorrect)
            num = num + 1
            print(num)
            QuizResult.objects.filter(quiz_number=quiz_number).update(incorrect=num)

    quiz_attempt.question = question_
    quiz_attempt.answer = answer
    quiz_attempt.save()
    correct = None
    incorrect = None
    quiz_result = QuizResult.objects.filter(quiz_number=quiz_number)
    for x in quiz_result:
        if x.correct:
            correct = int(x.correct)
        if x.incorrect:
            incorrect = int(x.incorrect)
    if correct == 0:
        score = 0
    else:
        score = (correct / (correct + incorrect)) * 100
        score = round(score, 1)
    QuizResult.objects.filter(quiz_number=quiz_number).update(score=score)
    print(score)
    print(type_)
    print(question_)
    print(answer)

    data = {
        "response": response
    }
    return JsonResponse(data)


def login_view(request):
    x = False
    if request.user.is_authenticated:
        return redirect('/')

    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("/")
        else:
            return render(request, "login.html", {
                "message": "LOGIN FAILED", "x": x
            })

    return render(request, "login.html")


def logout_view(request):
    logout(request)
    return render(request, "logout.html")


def results_view(request):
    q_result = True
    current_user = request.user.username
    users = []
    if request.GET.get('search_for') and request.user.is_superuser:
        user_ = request.GET.get('search_for')
        result = QuizResult.objects.filter(user=user_).order_by('-id')
        users = User.objects.all()

        results = [{
            "id": x.id,
            "user": x.user,
            "quiz_number": x.quiz_number,
            "correct": x.correct,
            "incorrect": x.incorrect,
            "score": x.score
        } for x in result]

        users_all = [{
            "id": x.id,
            "user": x.username,
        } for x in users]

        data = {
            "response": results,
            "users": users_all,
        }

        return JsonResponse(data)
    if request.GET.get('quiz_number'):
        quiz_attempts = QuizAnswerAttempt.objects.filter(quiz_number=request.GET.get('quiz_number'))

        attempts = [{
            "id": x.id,
            "user": x.user,
            "quiz_number": x.quiz_number,
            "answer_correct": x.answer_correct,
            "question": x.question,
            "answer": x.answer
        } for x in quiz_attempts]

        data = {
            "response": attempts

        }

        return JsonResponse(data)

    if request.user.is_superuser:
        result = QuizResult.objects.all().order_by('-id')
        users = User.objects.all()
    elif request.user.is_authenticated:
        result = QuizResult.objects.filter(user=request.user.username).order_by('-id')
    else:
        result = None

    context = {
        'result': result,
        'all': users,
        'current_user': current_user,
        'q_result': q_result
    }

    return render(request, 'quiz_results.html', context=context)


def quiz_id_generator(request):
    username = request.user.username
    correct = request.GET.get('correct')
    incorrect = request.GET.get('incorrect')
    total = request.GET.get('total')
    score = request.GET.get('score')

    if request.GET["quiz_number"] == 'new_quiz':
        random_string = ''
        for j in range(2):
            # Considering only upper and lowercase letters
            random_integer = random.randint(97, 97 + 26 - 1)
            flip_bit = 1  # or to allow for lowercase --> random.randint(0, 1)
            # Convert to lowercase if the flip bit is on
            random_integer = random_integer - 32 if flip_bit == 1 else random_integer
            # Keep appending random characters using chr(x)
            random_string += (chr(random_integer))

        random_number = (((random.randint(2, 20) + random.randint(2, 20)) * random.randint(10, 20)) * random.randint(2,
                                                                                                                     20) + random.randint(
            100000, 999999) + random.randint(100000, 999999))
        quiz_number = random_string + str(random_number)
        quiz_result = QuizResult()
        quiz_result.user = request.user.username
        quiz_result.quiz_number = quiz_number
        quiz_result.correct = 0
        quiz_result.incorrect = 0
        quiz_result.score = 0
        quiz_result.save()

        print(quiz_result)
        print(username)
        print(quiz_number)
        print(correct)
        print(incorrect)
        print(total)
        print(score)

        data = {
            "response": quiz_number
        }
        return JsonResponse(data)




