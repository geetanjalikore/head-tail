# TAIL 

- **TODO**
    - [ ] simplify tail function
    - [ ] Make parser for positive options (-n +2 / +2)

<br/>    

- **Maybe**

<br/>    

- **Done**
    - [X] Implement tail -c +2 file 
    - [X] Consider content instead files
    - [X] Consider count in string format
    - [X] Make tail work for -n option
        - [X] head -n +1
    - [X] Make tail work for -c option
    - [X] Consider different contract of option for tail
    - [X] simplify tail function.
    - [X] Extract lastNLines function
    - [X] Consider line count argument to tail function
    - [X] Implement tail -n 3 file
    - [X] Extract split and join functions
    - [X] Make tail work for default option
    - [X] Write an expectation for tail
    - [X] Create tailLib

<br/>    

---

# HEAD 

- **TODO**
    - [ ] Send an array of args to headMain
    - [ ] Consider returning an object of filenames and options from parseArgs

<br/>    

- **Maybe**

<br/>    

- **Done**

    - [X] convert while loop to flatMap in splitArgs function
    - [X] ~~Extract a function from splitArgs~~
    - [X] Extract function for checking fileNames length    
    - [X] Extract function for combination option check
    - [X] Separate tests of headMain and head into other file
    - [X] Format multiple files output
    - [X] Print the errors on error stream, output on output stream
    - [X] head -1
    - [X] Implement validate function for validation of args
    - [X] Change the approach of illegal option 
    - [X] Make head work for options and values without spaces
    - [X] Throw error for head -n/-c file 
    - [X] Change the structure of options
    - [X] Throw error for illegal option 
        -[X] head -k 1 file
    - [X] Make mockReadFile work for multiple files
    - [X] Make head work for more than one file
        - [X] head file1 file2 ...
        - [X] head -n 3 file1 file2 ...
        - [X] head -c 5 file1 file2 ...
    - [X] Throw error when non-existing file is provided
    - [X] Make head available at top level 
    - [X] parseArgs should parse multiple files
    - [X] Remove stringUtils 
    - [X] Throw error for more than one option
    - [X] Test parseArgs function
    - [X] head file 
    - [X] head -n 3 file 
    - [X] head -c 5 file
    - [X] head -n 1 -n 3 file
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