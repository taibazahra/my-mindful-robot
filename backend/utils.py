import random

def get_affirmation():
    affirmations = [
        "You are doing your best and that is enough.",
        "You are capable of amazing things.",
        "Your presence matters in this world.",
        "You radiate calm and kindness.",
    ]
    return random.choice(affirmations)

def get_mindfulness_tip():
    tips = [
        "Take a deep breath in for 4 seconds, hold for 4, exhale for 4.",
        "Do a 2-minute body scan – feel your toes to head.",
        "Notice 5 things you can see, 4 you can touch, 3 you can hear...",
    ]
    return random.choice(tips)
