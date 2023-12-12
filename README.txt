# Graphics Project 2
Martin Duffy, Jacob Desilets

## Controls
- WASD: Move the Present
- X: Rotate Scene
- C: Toggle Candle Light
- Z: Toggle Overhead Light

## Implementation
Files used:
- project2.html: main html page
- project2.js: sets up the page, controls and perspective matrices
- object.js: handles all code for rendering and transforming an object
- light.js: handles all code for rendering and applying a light
- points.js: has data for vertices of rendered objects

This is a Christmas scene where the user can move a present around on a table using the WASD keys and turn a candle on and off by pressing 'C'. Additionally, there is an overhead light that can be toggled with 'Z', and the entire scene can be rotated by pressing 'Z'.

All the objects included are textured and have a specular reflection. The perspective matrices are calculated in project2.html.

The candle object were created using blender, and the vertices and index list for that object were created using Blender's Python library.
