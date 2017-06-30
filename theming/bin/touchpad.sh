#!/bin/bash

STATE=$(synclient -l | grep -c 'TouchpadOff.*=.*0')
synclient TouchpadOff=$STATE
if [ $STATE -eq 1 ]
then
	# echo "Touchpad disabled."
	notify-send 'Touchpad' 'Disabled' -i \
		/usr/share/icons/Numix-Square-Light/16/apps/input-touchpad.svg
else
	# echo "Touchpad enabled."
	notify-send 'Touchpad' 'Enabled' -i \
		/usr/share/icons/Numix-Square-Light/16/apps/input-touchpad.svg
fi
