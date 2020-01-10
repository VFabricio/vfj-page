# Advent of Code 2019 in PureScript - Day 1, part 1

_(This was originally published on [dev.to](https://dev.to/vfabricio/advent-of-code-2019-in-purescript-day-1-part-1-3pjj))_

## What's this about?

Hi, folks! The Advent of Code 2020 is underway! That is an annual series of small programming puzzles, released daily during Advent. You can find more details about it [here](https://adventofcode.com/2019/about "Advent of Code 2019").

Since I'm now learning PureScript, I decided to use it to solve the AoC puzzles. I intend to share my solutions here as I write them. Even though my goal is not to teach PureScript now, I hope the code will be more or less understandable even to people who are not familiar with it. If you don't understand anything, don't shy away from asking! Any suggestions of improvements will be highly appreciated too.

## The puzzle

The first part of the [day 1](https://adventofcode.com/2019/day/1 "Advent of Code 2019 - Day 1") puzzle is quite straightforward. There is a rocket, which is composed of several modules. Each module has a certain fuel requirement, according to its mass. The precise statement is:
> To find the fuel required for a module, take its mass, divide by three, round down, and subtract 2.

In the examples and in the input given the masses are always integers, so I assumed that to always be the case. Changing the code to work with floats would be easy though, so that's not a big deal.

### Computing the fuel for a single module

The implementation is quite simple:

```haskell
fuelFromMass :: Int -> Int
fuelFromMass mass = mass `div` 3 - 2
```

For those not familiar with PureScript, however, there are three things that can cause confusion here.

1. First, the `fuelFromMass :: Int -> Int` line. That is a type annotation, which means that `fuelFromMass` is a function that takes as input an `Int` (a 32 bit integer) and returns another `Int`. PureScript has type inference, what means that, for simple enough code, the compiler can figure out the types for itself, so that we don't always _have_ to write types explicitly. However, it is a good practice to provide annotations for top level bindings.
2. Notice that PureScript functions don't require parentheses for their parameters. So, `mass` is the parameter being passed to `fuelFromMass`.
3. What is that weird `div` in backquotes? `div` is just the integer division operator. The code above could also be written as
`haskell
fuelFromMass mass = (div mass 3) - 2`
However, Purescript allows functions that take two or more parameters to be used in infix position if they are enclosed in backquotes.

### Computing the total fuel

Suppose now that we have an array containing the masses of all the modules. We need to do two things: first, compute that the fuel for each one and then sum all of the results to get the total. For someone coming from an imperative background, this sounds like it call for a loop. In functional programming we reach for a [map](https://en.wikipedia.org/wiki/Map_(higher-order_function) "Wikipedia - Map") instead. The `map` function takes two arguments, a function and an array and returns a new array consisting of applying the function to all elements of the input array [^1].

So, if we have an array `moduleMasses` the corresponding fuel array is simply `map fuelFromMass moduleMasses`. Then we use the `sum` function to get the total value:

```haskell
totalFuel :: Array Int -> Int
totalFuel moduleMasses = sum (map fuelFromMass moduleMass)
```

Actually, I wrote this as `totalFuel = sum <<< (map fuelFromMass)`. I will not explain here why this is equivalent to what I showed before, because that would require me to explain currying and point-free syntax. But, if you're curious about this, ask me in the comments and I'll be glad to give more details.

### Input and Output

This is all the business logic we need. Now it's just plumbing to get the input to the `totalFuel` function and then print the result to the console. I have the input saved as a text file, where each module's mass is contained in a line. We have to:

1. Read the file into memory, generating a big string.
2. Break this string on newlines, generating an array of strings.
3. Parse each string into a number, generating an array of `Int`s.
4. Pass this array to `totalFuel`.
5. Print the return value to the console.

Let's tackle each point in order. First, how do we read a file? One important thing which I haven't mentioned so far is that, by default, PureScript compiles down to JavaScript. Therefore, is natural to use the functionality provided by NodeJS (more precisely, its `fs` module) to interact with the filesystem. One can import JavaScript into PureScript but, fortunately, that will not be necessary here. There is already the [purescript-node-fs](https://pursuit.purescript.org/packages/purescript-node-fs/5.0.1 "purescript-node-fs") library which wraps the `fs` API into a nice, type safe set of PureScript functions. All we are going to need is the `readTextFile` function. There are some subtleties here regarding how to deal with impure stuff in a pure functional language, involving the dreaded [m word](https://wiki.haskell.org/Monad "Haskell Wiki - Monad"), but that is a discussion for another day.

Once we read our text file into a string, we need to split it on newlines. The [purescript-strings](https://pursuit.purescript.org/packages/purescript-strings/4.0.1 "purescript-strings") library has the `split` function which helps us write things like:

```haskell
splitOnNewlines :: String -> Array String
splitOnNewlines someString = split (Pattern "\n") someString.
```

The next step is a bit subtle. We need to turn a `String` into an `Int`. There is a function that does it for us: `fromString` (it can be found on the `Data.Int` module). However, its type signature, `fromString :: String -> Maybe Int`, tells us that something more is going on. Why is it not simply `String -> Int`? The problem is that not every string can be parsed into an integer. For strings like `"3"`, `"58649"` or `"-9503"` there is no problem. But something like `"34.53"` cannot result in an integer. And something like `"aRandomString"` cannot be parsed into a number at all. Therefore, `fromString` has to be able to handle failure somehow and the most basic way to do that in strongly typed functional languages is with `Maybe`.

A type like `Maybe Int` contains a special value, `Nothing`, which denotes the _absence of a valid value_. Then, for example, `fromString "34.53"` returns `Nothing`, which signals that it couldn't parse its input. But what does `fromString "3"` return? It cannot be `3` because that is an `Int` and we need to return a `Maybe Int`. The way to wrap an `Int` into a `Maybe Int` is with a `Just` constructor. In other words, `fromString 3` returns `Just 3`.

At the end of the day, we need to work with `Int` and not with `Maybe Int`. So, we need to unwrap the `Just` values and decide what to do with `Nothing`. For the solution of this puzzle the last point doesn't really make a difference, since the given input contains only valid integers and no `Nothing` ins generated. However, PureScript doesn't know that and it forces us to be consistent and handle failure appropriately. We do that with the `maybe` function, which allows us to unwrap a `Maybe` [^2], while providing a default value

I wrote this step and the last as a single function

```haskell
readNumbers :: String -> Array Int
readNumbers = map (maybe 0 identity <<< fromString) <<< (split (Pattern "\n"))
```

Don't worry if you don't fully understand this. It uses some notation and ideas that I haven't explained, but nothing that will affect what comes later.

We can finally put everything together and write the complete solution:

```haskell
module Main where

import Data.Int (fromString)
import Data.String.Common (split)
import Data.String.Pattern (Pattern(..))
import Effect (Effect)
import Effect.Console (log)
import Node.Encoding (Encoding(..))
import Node.FS.Sync (readTextFile)
import Prelude (Unit, bind, div, identity, map, show, (-), ($), (<>), (<<<))

main :: Effect Unit
main = do
  text <- readTextFile ASCII "./input.txt"
  log $ "Part 1: " <> (show $ totalFuel <<< readNumbers $ text)

readNumbers :: String -> Array Int
readNumbers = map (maybe 0 identity <<< fromString) <<< (split (Pattern "\n"))

fuelFromMass :: Int -> Int
fuelFromMass mass = mass `div` 3 - 2

totalFuel :: Array Int -> Int
totalFuel = sum <<< (map fuelFromMass)
```

Hopefully, even folks who are not used to PureScript can at least get the gist of this. Once again, I will be happy to (try to) answer any questions you may have. In the next post I will tackle the part 2 of this puzzle. Thanks for reading!

[^1]: In reality, `map` is more general than this. The second argument doesn't have to be just an array, but can be any of a class of things called _functors_. That's why I avoided writing `map`'s type signature, which, in it's full glory, is `map :: forall a b f. Functor f => (a -> b) -> f a -> f b`.
[^2]: You may find it confusing that there are two things called `maybe`/`Maybe`, one being a function and another being a type, differing only by capitalization. That is fine because, basically, PureScript, has two namespaces, one for names at the value-level and another for names at the type-level and it distinguishes (this is forced by the compiler) between them with capitalization. In other words, you can't write a type with a lowercase name, nor can you write a function with an capital initial. So, it's easy to know which is which when see pairs like `maybe`/`Maybe`.
