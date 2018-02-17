#!/bin/bash

# logout script for use with rofi
# options: cancel, logout, shut down, restart, hibernate, suspend, lock

OPTIONS="\
  logout\
  \nshutdown\
  \nrestart\
  \nhibernate\
  \nsuspend\
  \nlock\
"

echo $OPTIONS | rofi -i -dmenu
