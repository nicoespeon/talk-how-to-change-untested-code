## Intro (2min)

Who is working with existing code?
Who is working with existing code that you didn't wrote?
Who is working with existing code that you didn't wrote and is not tested?

## The Problem (2min)

You need to change code. When you're done, you want to know that:

- your new feature is working
- the rest of the existing behavior is preserved

But this code is not tested.
Also, it's hard to understand.
Oh, and deadline is next week.

> The code requires significant changes to support unit tests. I have deadlines to meet!

## Who am I? (3min)

My name is Nicolas Carlo, @nicoespeon.

I'm a web dev. I work at a company named Busbud. We do an app to search, compare and book intercity bus tickets across the world. If you travel to LATAM, you can use Busbud app and pay in CAD.

Our codebase is 3 major repos, 8 years old. Most of the code, someone else wrote it then left the company. How do we keep moving on fast?

This talk won't be enough. I recommend you to read these books: Working Effectively with Legacy Code & Refactoring.

Then, go on understandlegacycode.com. I'm writing a lot about that. You'll find out more.

Ok, back to our problem: how to change untested code when deadline is really short?

## 3 solutions (5min)

### 1. The naive. Edit and pray.

Change the code from what you understand.
Test manually.
Pray you didn't broke anything.

Very common. Stressful. Create bugs you need to fix after the deadline.
There's a better way.

### 2. The ideal. Write the damn tests

Write automated tests to check code behavior.
Reverse engineer the specs from the code.
Refactor the code to put tests on it.
Add your feature on the cleaner code.

Ideal. Takes time and skills. You'll miss the deadline.

So, do we give up? Are we doomed to 1) because of arbitrary deadlines?

### 3. The pragmatic compromise. Approval tests.

Characterization tests. Snapshot tests.

3 steps recipe:

1. 📸 Generate an output you can snapshot
2. ✅ Use test coverage to find all input combinations
3. 👽 Use mutations to verify your snapshots

Let's see that on a live example: the Gilded Rose kata.

## The Gilded Rose refactoring kata (23min)

Gilded Rose Kata: coding exercise to practice refactoring.

You need to change code. How to make the change simple? You need to refactor. How do you know you didn't break current behavior? You need to put tests. You can read and try to understand what the code should do to write the tests. Or you can try to write the tests from the specs. It'll take you a long time. And maybe that's not even what the code is actually doing.

0. Introduce the tools.
1. Identify output.
1. Indentify inputs.
1. Write a basic test with simplest inputs. Get the output.
1. Use jest snapshots for that.
1. What do we cover? Use test coverage to find what's missing.
1. Vary the inputs to cover more.
1. We've covered everything, are we safe? Mutate code to check if a test is failing. If not, find another variation of inputs.
1. Done!
1. Use jest-extended-snapshot to simplify

## Let's recap (1min)

3 steps recipe:

1. 📸 Generate an output you can snapshot
2. ✅ Use test coverage to find all input combinations
3. 👽 Use mutations to verify your snapshots

## What to do next? (2min)

You're safe now. 2 options:

1. If you have enough time, refactor the code first.
2. If you don't, create your code elsewhere and call it.

That way, you can test the code you add.

## Why you should NOT keep these tests (3min)

Snapshot tests are not that awesome:

1. you capture existing behavior, bugs included

2. tests will fail whenever you change the behavior, even if it’s intended

They are noisy and provide low value. If you keep them, they'll fail whenever you change the code.

So people will just update them. They won't be useful anymore. They just get in the way.

3. you can’t read the tests and understand what the code does

Delete them. Or have a plan to replace them with proper tests, after the deadline is over.

## Conclusion (2min)

This technique is to help you deliver with a short deadline, without breaking the code.

3 steps recipe:

1. 📸 Generate an output you can snapshot
2. ✅ Use test coverage to find all input combinations
3. 👽 Use mutations to verify your snapshots

To learn more techniques, understandlegacycode.com. Newsletter, weekly concrete tips to deal with Legacy Code.

Here are the resources of this talk (slides, repo & info): TODO: bit.ly to ULC dedicated page.
