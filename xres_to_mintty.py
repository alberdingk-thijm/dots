#!/usr/bin/python
# convert Xresources colors to mintty colors

import re
import sys

CONVERTER = {"bg": "BackgroundColour",
             "fg": "ForegroundColour",
             "blk": "Black",
             "red": "Red",
             "grn": "Green",
             "ylw": "Yellow",
             "blu": "Blue",
             "mag": "Magenta",
             "cyn": "Cyan",
             "wht": "White"}

def conv_file(xresf):
    """
    Return a string representing the Mintty version of the Xresources file.
    """

    mintlines = map(conv_line, xresf.readlines())
    return ''.join(mintlines)

def conv_name(xresname):
    """
    Return a string representing the conversion of the Xresources colour name
    to a Minttyrc colour name.
    """
    if len(xresname) == 4:
        return "Bold" + CONVERTER[xresname[1:]]
    else:
        return CONVERTER[xresname]

def conv_line(xresl):
    """
    Return a string in Mintty syntax based on the given
    Xresources-style string.
    >>> conv_line("#define bg   #000000")
    "BackgroundColour=  0,  0,  0"
    """

    # group 1 is the color, group 2 is the hex
    colorpatt = r"^#define (\w+)\s+(#\w{6})$"

    prog = re.compile(colorpatt, flags=re.M)

    match = prog.match(xresl)

    if match is not None:
        xrestype = match.group(1)
        colhex = match.group(2)
        minttytype = conv_name(xrestype)
        rgb = hex_to_rgb(colhex)

        return "{0}=\t\t\t{1}, {2}, {3}\n".format(minttytype, rgb[0], rgb[1], rgb[2])
    else:
        return xresl

def hex_to_rgb(value):
    """
    Return (red, green, blue) for the color given as #rrggbb.
    See http://stackoverflow.com/a/214657 (Jeremy Cantrell).
    """

    value = value.lstrip('#')
    lv = len(value)
    return tuple(int(value[i:i + lv // 3], 16) for i in range(0, lv, lv // 3))

def rgb_to_hex(red, green, blue):
    """
    Return color as #rrggbb for the given color values.
    See http://stackoverflow.com/a/214657 (Jeremy Cantrell).
    """
    return '#%02x%02x%02x' % (red, green, blue)

if __name__ == "__main__":
    if len(sys.argv) == 3:
        XRES = open(sys.argv[1], 'r')
        MINT = open(sys.argv[2], 'w+')
        MINT.write(conv_file(XRES))
        XRES.close()
        MINT.close()
    else:
        print "Usage:"
        print "xres_to_mintty.py .Xresources .minttyrc"
        print "Not enough arguments!"
