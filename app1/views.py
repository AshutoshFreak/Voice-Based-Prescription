from django.contrib import auth
from django.shortcuts import render, redirect


# Create your views here.
from app1.generate_pdf import generate


def home(request):
    return render(request, 'a.html', {'titles': 'Django', 'link': 'https://youtube.com/'})


def expression(request):
    a = int(request.POST['text1'])
    b = int(request.POST['text2'])
    c = a + 2 * b
    return render(request, 'output.html', {'result': c})


def login(request):
    if request.method == 'POST':
        username1 = request.POST['username']
        password1 = request.POST['password']
        user = auth.authenticate(username=username1, password=password1)
        if user is not None:
            auth.login(request, user)
            return redirect('/')
        else:
            return redirect('login')

    return render(request, 'login.html')


def logout(request):
    auth.logout(request)
    return redirect('/')


def prescription(request):
    if request.method == 'POST':
        name1 = request.POST['name']
        gender1 = request.POST['gender']
        age1 = request.POST['age']
        symptoms1 = request.POST['symptoms']
        diagnosis1 = request.POST['diagnosis']
        medicines1 = request.POST['medicines']
        advices1 = request.POST['advices']
        dict1 = {"Name": name1, "Gender": gender1, "Age": age1, "Symptoms": symptoms1, "Diagnosis": diagnosis1, "Medicines": medicines1, "Advices": advices1}
        generate(dict1)
        return redirect('/')

    return render(request, 'prescription.html')

#
# def welcome(request):
#     name = user.objects.get(username)
