Flow to test extension update locally (w/o Web Store).
------------------------------------------------------

### Directory contents: ###
----        ------------------------------
What        Description
----        ------------------------------
1.0/        unpacked v1.0 of the extension
1.1/        unpacked v1.1 of the extension
1.0.crx     packed version of 1.0
1.1.crx     packed version of 1.1
1.1.pem     private key used for packing
updates.xml update url
----        ------------------------------

### Usage: ###
* The extension id would be: kceeijgopjjdcemmehgjnohdekkmghgh
* Copy updates.xml to www root's autoupdate/simple_extension/ dir.
* Copy 1.1.crx to www root's autoupdate/simple_extension/1.1.crx
* Run chromium with --extensions-update-frequency=30
* Go to chrome://extensions page, install 1.0.crx via drag and drop.
* Wait for a minute-ish.
* Close and open chromium.
* You should see "update requires new permission" warning in
  hotdog menu for the extension and the extension would be disabled.
