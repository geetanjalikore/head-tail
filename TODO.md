**TODO**

- [ ] Test parseArgs function
- [ ] Make head work for more than one file
- [ ] Throw error for more than one option
- [ ] Throw error when non-exist file is provided
- [ ] Make head file available at top level 

**Maybe**

- [ ] Separate tests of headMain and head into other file

**Done**

- [X] Create parseArgs function
- [X] Create headMain function
- [X] Separate split and join functions to another file
- [X] Extract firstNLines and firstNBytes function
- [X] Extract 0 as start into constant
- [X] Create a common slice function
- [X] Make head work on content instead file without any options(default)
- [X] Implement -c option
- [X] Implement firstBytes function
- [X] Implement -n option
- [X] Accept count as an option object for head
- [X] Test head function
- [X] Correct the contract and tests of firstLines
- [X] Consider different contract for head
- [X] Rename head function to firstLines
- [X] Decide contract for firstLines
- [X] Delegate split and join responsibilies to other function
- [X] Capitalize test descriptions.
- [X] Create different functions for split and join
- [X] Extract constants for '\n'
- [X] verify mocha exists
- [X] Make directory structure src and test
- [X] Verify eslint works properly
- [X] Write first expectation