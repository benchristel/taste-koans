import {test, expect, is, equals, not, debug, which} from "@benchristel/taste"

const _ = "FIXME"

test("expect()", {
  "asserts the truth"() {
    expect(_, is, true)
  },

  "works with any boolean function, even built-in ones"() {
    expect(_, Array.isArray)
  },

  "passes its first argument to the matcher function *last*"() {
    function isGreaterThan(a, b) {
      return b > a
    }
    expect(_, isGreaterThan, 9)
  },

  "can pass any number of arguments to the matcher"() {
    function isCloseTo(target, maxError, actual) {
      return Math.abs(actual - target) < maxError
    }
    expect(Math.sqrt(_), isCloseTo, 1.41, 0.01)
  },
})

test("is()", {
  "compares values using ==="() {
    expect(_, is, "hello")
    expect(_, is, 3)
  },

  "compares by pointer equality"() {
    const obj = {}
    expect(_, is, obj)
  },

  "is curried"() {
    const isZero = is(0)
    expect(_, isZero)
  },
})

test("equals()", {
  "deeply compares objects and arrays"() {
    expect(_, equals, {foo: [1]})
  },

  "is curried"() {
    const isEmptyObj = equals({})
    expect(_, isEmptyObj)
  },
})

test("not()", {
  "inverts a comparison"() {
    expect(_, not(is), _)
  },

  "works on curried functions too"() {
    expect(_, not(is("FIXME")))
  },
})

test("debug()", {
  "prints its arguments in the test results"() {
    const words = "Hello, world!".split(/[^a-zA-Z]/)
    debug("words", words)
    expect(words[1], is, "world")
  },
})

test("which()", {
  "lets you control what counts as 'equal'"() {
    function isNumeric(string) {
      return typeof string === "string"
        && /^(0|[1-9][0-9]*)$/.test(string)
    }

    expect(
      {statusCode: _},
      equals,
      {statusCode: which(isNumeric)},
    )
  },
})
