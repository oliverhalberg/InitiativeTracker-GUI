# Initiative Tracker GUI

A GUI tool for tracking turns in turn-based TTRPG combat systems such as Dungeons and Dragons. Available for macOS, Windows, and Linux.

## Status: In beta testing - v1.0.2 is released.
- Bug fixes and new features are being added, working towards v1.1.0

## Changelog

### v1.1.0 (not yet released)
- Enabled window resizing
- Added responsive layout
- Added color themes and the ability to switch between them, as well as persistent storage of color theme choice
- Bug fixes:
    - Stepping backwards through turns now decrements the round counter, to a minumum of 1
    - Users can no longer add blank turns
    - Fixed bug where the app would crash if the "Next" button was clicked without any turns added
    - Set some max width and text break values to prevent text overflowing off of the screen and/or beyond reasonable boundaries

### Useful resources consulted
- Electron.js's [tutorial](https://www.electronjs.org/docs/latest/tutorial/tutorial-prerequisites)
- Electron.js's [documentation](https://www.electronjs.org/docs/latest/tutorial/ipc) on inter-process communication
- Clouwood Studio's [guide](https://clouwood.com/the-ultimate-guide-to-electron-with-react/) to using Electron with React
- W3Schools's [tutorial](https://www.w3schools.com/howto/howto_js_dropdown.asp) on creating dropdown menus
- This [Reddit](https://www.reddit.com/r/electronjs/comments/10dh3lz/what_is_the_proper_way_to_permanently_store_data/) thread, and particularly user `moonwave99`'s solution for storing persistent data in Electron