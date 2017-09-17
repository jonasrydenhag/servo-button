#!/usr/bin/python

import time
import RPi.GPIO as GPIO
import subprocess

GPIO.setmode(GPIO.BOARD)

GPIO.setup(11, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

activated = 0

try:
	while True:
		if (GPIO.input(11) == 1):
			if (activated == 0):
				activated = 1
				subprocess.call(["python", "/home/pi/bin/blueServo.py"])
				time.sleep(1)
		else:
			activated = 0

		time.sleep(0.01)
				
except KeyboardInterrupt:
	GPIO.cleanup()
