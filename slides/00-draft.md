Core message: use approval tests to put existing code under tests quickly without understanding it.

Who is working with existing code?
Who is working with existing code that you didn't wrote?
Who is working with existing code that you didn't wrote and is not tested?

Let me tell you a story of 2 teams.

Team #1 wants to try out a new feature. The code they need to change is not fully tested, and they don't know all of it. They estimate it to 2 weeks of work. They put 2 senior devs to work on that: 1 for the back-end, 1 for the front-end. After 2 weeks, they ship the feature. Unfortunately, they see something broke 1h after the release and that some customers can't pay anymore. They revert the change to stop the fire. They spend 30min together investigating. They find the root cause: in some conditions, some data is not present and the code didn't expected this scenario. They add a conditional, revert the revert, patch the code and ship again. In the following 2 weeks, they find out other little unexpected bugs that they fix progressively.

Team #2 also wants to try out a new feature. The code they need to change is not fully tested, and they don't know all of it. They estimate it to 3 weeks of work, as they'd start with 2 weeks of cleaning the code first. Turns out cleaning the code took 3 weeks. After 4 weeks, they finally ship the feature. No regression appeared once the code was in prod.

Which team did the best job in delivering the feature?

It depends.

If Team #1 mistakes cost a lot of money, that could be terrible for the company.
But if the feature turns not to be relevant, Team #2 spent too much time finding it out.

But for sure: there is an even better way to do this.

My name is Nicolas. I'm a web dev. Twitter and website.

I work at a company named Busbud. We do an app to search, compare and book intercity bus tickets across the world. If you travel to Bulgaria and want to go from Sofia to Plovdiv, you can use Busbud app and pay in CAD.

Our codebase is 3 major repos, 8 years old. I've been working at Busbud for 2 years. I'm the 3rd oldest engineer, out of 20 devs. Most of the code we're dealing with, we didn't wrote in the first place. Inherited code. Some of the code is tested, but it's rare to have all scenarios covered. How do we do?

First, this talk won't be enough. So I recommend you to read these books: WEWLC first, then Refactoring. Then, go on understandlegacycode.com. I'm writing a lot about that. You'll find out more.

Ok, back to our problem: how to best deal with untested, existing code you have to change?

3 approaches:
1. Think hard about the code. Don't break things. Mitigate risk by putting your best devs + test on a Preview env + code review + monitor once in prod. Still, that's crossing fingers. That's Edit and Pray. It's playing with fire. It's playing your luck that you don't do any mistake. But the codebase is huge, most of it you didn't wrote and you can't anticipate every possible scenario. If you're unlucky some day, that can cost a lot. And it's stressful. Team #1
2. Put the code under test. Clean the code. Then change the code. That's great. But that can also take a lot of time. You need to read the code, take notes, draw graphs to understand the dependencies, figure out how it works so you can write the tests how what it should do, after. It's safe, but it's slow. You can have a hard time sell that to your team. They'll beg you for a solution, a compromise. Team #2.
3. The compromise is to put existing code into tests without having to understand it. Not completely at least. You want to set up anti-regression tests that will tell you when you break something. But you want that fast.

Discover Approval Testing.

Consider the code as a black box. You don't care what's inside yet.
It has inputs and outputs.
You want to take a picture of the output for a given set of inputs. That's a snapshot. You'll use this snapshot to verify the code still behave as before after you've changed it.
Then, you'll find all the combinations of inputs that create different outputs. So you cover everything.

Once this is done, you've your anti-regression tests suite. You'll feel confident you can now touch the code.
Next step is to refactor the code. Snapshot tests got your back.
When the code is refactored, it should be easier to change and test.
Write a test to illustrate the change you want to make. See it fail. Then make the test pass. You're done.

Later, you'll need to change current behavior of the code. Snapshot tests will fail, that's their job. What you do is you write better tests to illustrate the new behavior. Test should fail (behavior not implemented). You make it pass. You delete the failing snapshot test. Ultimately, you'll delete all the snapshot tests. They are not the goal, they are a mean to get you covered in the first place. Not ideal, but useful.

2 types of inputs: direct and implicit.
2 types of outputs: direct and side-effects.

Let's try this technique on Gilded Rose kata. It's the easy scenario (direct - direct). We won't have time to cover in details the more complex ones, but I'll give you tips to try that out on your codebase. To go further, go on understandlegacycode.com.

Gilded Rose Kata: coding exercise to practice refactoring. You need to change code. How to make the change simple? You need to refactor. How do you know you didn't break current behavior? You need to put tests. You can read and try to understand what the code should do to write the tests. Or you can try to write the tests from the specs. It'll take you a long time. And maybe that's not even what the code is actually doing.

1. Identify output.
2. Indentify inputs.
3. Write a basic test with simplest inputs. Get the output.
4. Use jest snapshots for that.
5. What do we cover? Use test coverage to find what's missing.
6. Vary the inputs to cover more.
7. We've covered everything, are we safe? Mutate code to check if a test is failing. If not, find another variation of inputs.
8. Done!

Here's my library to reduce boilerplate with jest.

See, we were able to cover that in the talk. You don't know precisely how the code is implemented, but you covered everything with tests. Now you can play and refactor.

What if inputs are implicit? Pass them as params. It's ugly but you need that first. It's better than breaking prod. It's Breaking Dependency. Just do that, don't be smart, because it's risky: you don't have the tests yet.

What if outputs are side-effects? Introduce a sensing variable. Add a param with default noop. Call that param with values of the side-effects calls. In tests, make that param generate the snapshot. Compare the snapshots.

There's more because it's a case-by-case situation and it's only a 40min talk. But these are things you can try to get moving. To learn more, go on understandlegacycode.com.
