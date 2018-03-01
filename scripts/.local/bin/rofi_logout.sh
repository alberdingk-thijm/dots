#!/bin/bash

# logout script for use with rofi
# options: cancel, logout, shut down, restart, hibernate, suspend, lock

OPTIONS="cancel|logout|shutdown|restart|hibernate|suspend|lock"

choice=$(echo "$OPTIONS" | rofi -sep '|' -i -dmenu -p "Exit: ")

case $choice in
    "cancel") ;;
    "logout")
        # execute logout
        ;;
    "shutdown")
        # execute shutdown
        sudo shutdown -h now
        ;;
    "restart")
        # execute restart
        sudo reboot
        ;;
    "hibernate")
        # execute hibernate
        ;;
    "suspend")
        # execute suspend
        sudo zzz
        ;;
    "lock")
        # execute lock
        dm-tool lock
        ;;
esac
