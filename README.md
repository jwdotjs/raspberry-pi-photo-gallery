# Raspberry Pi Photo Gallery

This is an Express app that can be used in parallel with the Raspberry Pi Camera
script (https://github.com/jwdotjs/raspberry-pi-camera).

This app reads files from an S3 bucket and displays them on the index page.

You will need to create a credentials.js file in the root of the folder
that exports an object. The object should have your AWS S3 key, secret, and bucket.