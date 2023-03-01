# it's **PAYD.**
A simple bill tracking app. No non-sense.

The vision for this is an app that is for the people, local storage based so no data transfered meaning no selling of data, ever.

Alternatives to such a thing cost money, aren't easily used or just plain don't work. So I want a super simple user experience to help people manage their bills.

The local storage idea comes from the fact that so many free websites and apps make their money off of selling your data, this app will not link to any personal information but will store what you enter into it on your local machine, meaning I will never have access to your data, therefore no one else will.

I want the user experience to be very satisfying, I've always thought about paying bills as sort of a relief. When I was young and my family was poor, I remember getting to turn the lights back on or heating the house again. Though I would never wish these sort of memories on anyone else, they do inspire me to help others. So when a bill is 'payd' the UI will respond with some good vibes to make it less of a 'I hate paying bills experience' (as if, haha!) to more of a 'Nice!' feeling.

## Features to Implement:
* ~~Monthly Date Tracking / Updating : The bill lists should be labeled and organized based on when they are due, a simple 'click' to mark a bill paid should mean that it will set it's next due date to the specified time.~~ (Bi-monthly / Monthly)
* ~~Sorting : Sorting the list by due dates, or whatever the user might want.~~
* ~~View History : Although each object has a history list already, I want the user to be able to explore the history, see when they paid things and the amounts that they were etc.~~
* ~~Edit Bills : This should be fairly easy to do, just on the list, edit amounts, names, dates, delete etc.~~ Note: Lol I said this was going to be easy.
* Import / Export Data : Because the nature of this app will be local storage, I am implementing a way to export the data so that you can upload it to another device, machine etc. It will output the data in a coded string format (I learned something similar when working with World of Warcraft's Addon: weakauras, which I love). -A side note, I do know that this would mean data could leak and be exploited in this way, if someone wanted to figure out my cryptography to uncode the data, luckily this still requires no personal data at all but I will still keep this on the mind to ensure the best privacy for all users.
* Landing Page : I have a thought that the landing page should be a nice marketable page for users to understand the point of a local storage bill tracker and give a nice presentation on why they should use it, and maybe even who I am.
* Finish Styling : This is going to be a work in progress for awhile of course, I bounce back and forth between front end design and back end.
* Get a 'days until x is due' function finished, display it in the list items, update with color schemes based on how close due date is due.
* Gather User Experiences to improve app : You already know what this is, if you've cloned this and tried it out, please let me know. Coding can make one be a hermit and not think outside of the user experience.

## How is the Progress?
Well, there has been far more bugs and weirdness than I expected but I am set out on making this a great app experience. The majority of the work (and you can check the commits) have been fixing bugs that have arisen. Luckily the structure of the code is pretty solid, adding new features and fixing bugs have been pretty easy. The bugs took long because I had to track down what was going on.

We should be seeing a launch of the app soon, I am excited to show it off.
