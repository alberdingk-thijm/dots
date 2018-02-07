#!/bin/sh

# see https://bbs.archlinux.org/viewtopic.php?id=69589

usage="$0 Version $version Help\nDependencies: libnotify, alsa-utils\nusage:\n\t $0  [OPTIONS] -c COMMAND \nCOMMAND:\n-c\tget \n\t\t(return current volume)\n\tup \n\t\t(increase volume by increment)\n\tdown \n\t\t(decrease volume by increment)\n\tmute \n\t\t(mute volume) \n\nOPTIONS:\n-i\t increment \n\t\t(the amount of db to increase/decrease)[default:2500] \n-m\t mixer \n\t\t(the device to change)[default:Master]"

command=
increment=2500
mixer="Master"

while getopts "c:i:m:h" o
do case "$o" in
    c) command=$OPTARG;;
    i) increment=$OPTARG;;
    m) mixer=$OPTARG;;
    h) echo -e "$usage"; exit 0;;
    ?) echo -e "$usage"; exit 0;;
esac
done

display_volume=0
icon_name=""
if [ "$command" = "get" ]; then
	display_volume=$(amixer get $mixer | grep -m 1 "%]" | cut -d "[" -f2|cut -d "%" -f1)
elif [ "$command" = "up" ]; then
    display_volume=$(amixer set $mixer $increment+ unmute | grep -m 1 "%]" | cut -d "[" -f2|cut -d "%" -f1)
else
	if [ "$command" = "down" ]; then
	    display_volume=$(amixer set $mixer $increment- unmute | grep -m 1 "%]" | cut -d "[" -f2|cut -d "%" -f1)
	else
		if [ "$command" = "mute" ]; then
		    if amixer get Master | grep "\[on\]"; then
			display_volume=0
			icon_name="notification-audio-volume-muted"
			amixer set $mixer mute
		    else
			display_volume=$(amixer set $mixer unmute | grep -m 1 "%]" | cut -d "[" -f2|cut -d "%" -f1)
		    fi
		else
		     echo -e $usage
		     exit 1
		fi
	fi
fi

if [ "$icon_name" = "" ]; then
    if [ "$display_volume" = "0" ]; then
        icon_name="notification-audio-volume-off"
    else
        if [ "$display_volume" -lt "33" ]; then
            icon_name="notification-audio-volume-low"
        else
            if [ "$display_volume" -lt "67" ]; then
                icon_name="notification-audio-volume-medium"
            else
                icon_name="notification-audio-volume-high"
            fi
        fi
    fi
fi

notify-send "Volume" -i $icon_name -h int:value:$display_volume -h string:synchronous:volume
