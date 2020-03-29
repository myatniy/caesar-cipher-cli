# caesar-cipher-cli

CLI tool accepts 4 options (short alias and full name):

1.  **-s, --shift**: a shift (required option).
2.  **-i, --input**: an input file.
3.  **-o, --output**: an output file.
4.  **-a, --action**: an action encode/decode (required option).

**Usage example:**

```bash
$ node my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
```

```bash
$ node my_caesar_cli --action encode --shift 7 --input plain.txt --output encoded.txt
```

```bash
$ node my_caesar_cli --action decode --shift 7 --input decoded.txt --output plain.txt
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`
