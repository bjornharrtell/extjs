# Sencha Cmd Image Slicer

The `sencha fs slice` command performs general image slicing and manipulation driven by
the contents of a JSON manifest file. This manifest is typically generated automatically
by `sencha package build` for a package or `sencha app build` for an application, but for
diagnostic purposes the `"theme-capture.json"` is left on disk in the build folder. This
guide describes the format of this manifest.

## Manifest Contents

The manifest file contains an array of image area definitions that further contain a set
of "slices" to produce.

    [
        {
            // The border-width of the box.
            //
            "border": {
                "b": 1,
                "l": 1,
                "r": 1,
                "t": 1
            },

            // The box or coordinates of the area within the image file being
            // processed.
            //
            "box": {
                "h": 22,
                "w": 46,
                "x": 10,
                "y": 51
            },

            // The direction of the background gradient if there is one.
            //
            "gradient": "top",

            // The border radii for top-left, top-right, bottom-right and
            // bottom-left corners.
            //
            "radius": {
                "bl": 3,
                "br": 3,
                "tl": 3,
                "tr": 3
            },

            // The side of the image to stretch for sliding-doors. This is currently
            // hard-coded to stretch to 800px.
            //
            "stretch": "bottom",

            // The slice operations to perform and the relative path to the
            // desired image.
            //
            "slices": {
                "bg": "images/btn/btn-default-small-bg.gif",
                "corners": "images/btn/btn-default-small-corners.gif",
                "sides": "images/btn/btn-default-small-sides.gif"
            }
        }
    ]

The keys of the `"slices"` object can be any of these:

  * `bg` : Extracts the box background (inside the border)
  * `frame_bg` : Extracts the box background (inside the border and border radius)
  * `corners` : A sprite consisting of the 4 rounded corners and 2 sides.
  * `sides` : A sprite consisting of the 2 sides that are not in the `ccrners`.

For each of the above, there is also a "_rtl" form that operates on the base
widget after first flipping the widget horizontally (e.g., "bg_rtl").

## Sprites

There are two special sprites produced by the slicer: corners and sides. These contain
different sub-images based on the presence and type of the background gradient.

The "corners" sprite actually contains more than just the 4 (rounded) corners: it also
has two of the sides. The two sides contained in the "corners" sprite are the two sides
that are repeated.

The "sides" sprite contains the remaining two side sub-images. These may or may not be
repeated, depending on the presence of a background gradient.

To understand the slicing operation, consider the starting frame:

        +----+--------------------------------------------------+----+
        | TL |                         TC                       | TR |
        +----+--------------------------------------------------+----+
        |    |                                                  |    |
        |    |                                                  |    |
        |    |                                                  |    |
        | ML |                                                  | MR |
        |    |                                                  |    |
        |    |                                                  |    |
        |    |                                                  |    |
        +----+--------------------------------------------------+----+
        | BL |                         BC                       | BR |
        +----+--------------------------------------------------+----+

The width and height of the cells of the sprites is equal to the maximum of the four
border radii and border widths. Typically these are symmetric on some axis, but in all
cases the sprite cells are square and use the maximum required size.

### Null or Vertical Gradient

When there is no gradient or if the gradient direction is vertical (that is, either "top"
or "bottom"), the "corners" sprite produced is 1x6 with the following layout:

        +------+
        |  TC  |  (top center side of frame)
        +------+
        |  BC  |  (bottom center side of frame)
        +------+
        |  TL  |  (top left corner)
        +------+
        |  TR  |  (top right corner)
        +------+
        |  BL  |  (bottom left corner)
        +------+
        |  BR  |  (bottom right corner)
        +------+

The "TC" and "BC" cells are used with `repeat-x` styling to fill the desired width.

The "sides" sprite is then a 2x1 sprite with this layout:

        +------+------+
        |      |      |
        |      |      |
        |  ML  |  MR  |
        |      |      |
        |      |      |
        +------+------+

If there is no gradient, the cells are used with `repeat-y` styling. Otherwise, the whole
sprite is stretched to 800px and one edge is repeated based on the `stretch` property in
the manifest. If 'stretch' is `"bottom"` then the bottom row is repeated until the sprite
has 800px height. Otherwise, the captured gradient is placed at the bottom of the cell the
top row is repeated to fill the space above the gradient.

### Horizontal Gradient

If there is a horizontal gradient (that is, either "left" or "right"), the corners sprite
produced is 3x4 with this layout:

        +------+------+------+
        |  TL  |      |      |
        +------+      |      |
        |  TR  |      |      |  ML = middle left side of frame
        +------+  ML  |  MR  |
        |  BL  |      |      |  MR = middle right side of frame
        +------+      |      |
        |  BR  |      |      |
        +------+------+------+

The "ML" and "MR" cells are styled with `repeat-y` to fill the desired height.

The "sides" sprite is a 1x2 sprite:

        +------+
        |  TC  |
        +------+
        |  BC  |
        +------+

Because this layout is only used in the presence of a gradient, these sprites are always
stretched to 800px width. The value of the `stretch` property on the manifest determines
where the column of pixels is repeated. A value of `"right"` means the right-most column
of pixels is repeated to fill 800px. A value of `"left"` will produce a cell where the
gradient is copied to the right-most end and the left-most column of pixels is repeated
to fill the space.
