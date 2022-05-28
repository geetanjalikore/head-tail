# head

``` 
usage: head [-n lines | -c bytes] [file ...]
```

```
head -help
  usage: head [-n lines | -c bytes] [file ...]

head file
  This filter displays the first 10 lines of the specified file.

head -n count file
  displays the first count lines of the specified file.

head -c count file
  displays the first count bytes of the specified file.

```

# tail

```
tail  [-r] [-q] [-c # | -n #] [file ...]
```

```
tail file
  This filter displays the last 10 lines of specified file

tail -n file
  displays the last count lines of the specified file.

tail -c file
  displays the last count bytes of the specified file.

tail -r file
  causes the input to be displayed in reverse order, by line. 

tail -q [file1 ...]
  Suppresses printing of headers when multiple files are being examined.
```