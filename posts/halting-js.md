# Understanding the Halting Problem with JavaScript

_(This was originally published on [dev.to](https://dev.to/vfabricio/understanding-the-halting-problem-with-javascript-1nlk))_

Sometimes our code has bugs. Well, most of the time. Since our squishy, carbon-based brains are very limited to assess the correctness of our code, it would be nice to get computers to help us. That is what type checkers, linters and other kinds of static analyzers do.

Here I want to focus on one particular problem our programs can have: infinite loops. This might not be the most serious type of bug in the wild. However, if we try to recruit computers to help us with it, we run into a very interesting problem. Understanding this will lead us down a fascinating rabbit hole.

There are programs that always terminate (or halt, thus the name, Halting Problem) and programs that might loop forever, at least for some inputs. We would like to have a program that accepts other programs as input and tells us whether they always terminate. If you have never thought about this, stop for a minute and think about how you would try to implement such a test.

Back yet? Could you do it? It turns out it is _impossible_ to do it. I am not saying it is intractable with our current hardware, or that we haven't figured out how to do it yet. It is logically, mathematically impossible to do it and I will prove that. And, since we seem to live in a world where _everything_ can be done in JavaScript, I will use that to explain the problem.

This is going to be a proof by contradiction. We will start by assuming that we _can_ have a program that tells us whether any given program terminates. That will lead us to a contradiction, implying that our initial assumption is false.

More concretely, imagine we had a function

```javascript
    function halts(f) {
        // some magic happens here
    }
```

This should return true if `f` halts for all inputs and return false if there are any inputs for which `f` loops forever. For example, consider the following two functions:

```javascript
    function someRandomFunction(a, b) {
        if (a > b) {
            return 42;
        }
        else {
            return -1;
        }
    }
```

```javascript
    function anotherRandomFunction(a, b) {
        if (a > b) {
            return 42;
        } else {
            while(true) {}
        }
    }
```

`someRandomFunction` always halts, but `anotherRandomFunction` will loop forever if the first parameter is not larger than the second. Therefore, `halts(someRandomFunction)` should be true, while `halts(anotherRandomFunction)` should be false.

Nothing weird so far, except that I have asked you to accept that the body of that `halts` function could be filled in some meaningful way. But, if we had `halts` at our disposal, we could write a function like this:

```javascript
    function screwy(f) {
        if(halts(f)) {
            while(true) {}
        } else {
            return;
        }
    }
```

`screwy` is a higher-order function. It, like `halts`, accepts a function as input. Then it pulls a switcheroo on us: if the input function halts, `screwy` loops forever; but if the input function loops forever, `screwy` terminates. That may be a little mind bending, but it isn't absurd yet.

The absurd, however, is here...

Ready?

What does `halts(screwy)` return?

In other words, we would like to know whether `screwy` terminates for all inputs. If we can find any for which it doesn't, we can answer that in the negative. So, does it terminate when given _itself_ as input? That is, does `screwy(screwy)` ever terminate?

First, let's make sure this makes sense. Looking back at `screwy`'s definition, we see that the only condition on its input is that it's a function &mdash; this comes from the same condition being imposed on the inputs to `halts`. The input can be _any_ function. `screwy` is a function. There is no reason, then, why it couldn't be given itself as input.

But what happens then? If its input halts, `screwy` doesn't. Therefore, if `screwy` acts on itself and it halts, then it doesn't. Similary, if it doesn't halt, then it does.

Say what??? :astonished:

So, the existence of `screwy` is absurd. It is logically impossible to have such a function, since that leads to a contradiction. But how can it be impossible? I showed you the definition, it is perfectly valid JavaScript... except for that sneaky call to `halts`, which I haven't defined and whose existence we just assumed. That is the source of our paradox. If `halts` existed we would have a contradiction. Therefore, it doesn't exist. It is impossible to have a program that always tells if another given program halts. This is the very famous Halting Problem.

Let me clear up a possible misconception. I'm not saying that if you have a program in front of you it's impossible to say it whether it halts. We have seen examples both of programs that halt and programs that don't. We had no problem figuring out what was the case for each one. What the Halting Problem really says is that you can't have an algorithm that systematically answers this question for every possible program.

Now you may be asking: so what? We can't have a static analyzers that always detects infinite loops. What's the big deal? The big deal is that this reveals a deep and surprising truth about the nature of computation. There are problems that can't ever be solved algorithmically. Not now, not tomorrow, not if we spend the next billion years trying to implement them. We say that they are _undecidable_. The halting problem is the most famous, but not the only example of an undecidable problem. In fact, the standard way of proving other problems undecidable is by showing them to be equivalent to the Halting Problem. The ever useful [Wikipedia](https://en.wikipedia.org/wiki/List_of_undecidable_problems) has a list such problems.

That's what I had for you today folks. I hope you found it enlightening (or maybe even entertaining?)!

PEDANTIC DISCLAIMER - One could argue that this is not _really_ a fully rigorous, mathematical proof, since that would require us to first define precisely the semantics of JavaScript. I don't know if this has been done rigorously so OK, fair enough. But the essential idea of the proof is what I showed and what remains is "just" to formalize it, with Turing Machines or something else.

2020-02-01T11:30:00-03:00