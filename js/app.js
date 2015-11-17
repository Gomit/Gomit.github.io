
    // drawing the accordion

$( "#accordion" ).accordion({
      heightStyle: "fill"
    });
// get a reference to the house icon
var $house = $(".imag");

// get the offset position of the kinetic container
var $stageContainer = $("#container");
var stageOffset = $stageContainer.offset();
var offsetX = stageOffset.left;
var offsetY = stageOffset.top;

// create the Kinetic.Stage and layer
var stage = new Kinetic.Stage({
    container: 'container',
    width: 600,
    height: 600
});

// grid data
var CELL_SIZE = 40,
    w = 15,
    h = 15,
    W = w * CELL_SIZE,
    H = h * CELL_SIZE;

// function of drawing the grid in the container
var make_grid = function(layer) {
    var r = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: W,
        height: H,
        fill: "white"
    });
    layer.add(r);
    for (i = 0; i < w + 1; i++) {
        var I = i * CELL_SIZE;
        var l = new Kinetic.Line({
            stroke: "grey",
            strokeWidth: 0.5,
            points: [I, 0, I, H]
        });
        layer.add(l);
    }

    for (j = 0; j < h + 1; j++) {
        var J = j * CELL_SIZE;
        var l2 = new Kinetic.Line({
            stroke: "grey",
            strokeWidth: 0.5,
            points: [0, J, W, J]
        });
        layer.add(l2);
    }
    return r;
};

var layer = new Kinetic.Layer();
//var chambre = new Kinetic.Group();
var rect = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: CELL_SIZE,
    height: CELL_SIZE,
    fill: "white",
    stroke: "grey",
    strokeWidth: 0.5
});
var gr = make_grid(layer);

// add the shape to the layer
layer.add(rect);
// add the layer to the stage
stage.add(layer);

/************************************/
function Picture (x, y, name, url, eqpt_id){
    this.x = x;
    this.y = y;
    this.name = name;
    this.url = url;
    this.id = "#house_"+eqpt_id ;
}
/*Pictures = [{"x": Picture.x,
            "y": Picture.y,
            "name": Picture.name,
            "url": Picture.url,
            "eqpt_id": Picture.eqpt_id
           }];*/
var image1 = new Picture(null, null, "television","tv.png",1);
var xi = image1.x;
/************************************/


//create a group
var group = new Kinetic.Group({
    draggable: true //make group draggable
});
    var rec = new Kinetic.Rect({
            x: 10,
            y: 330,
            width: 600,
            height: 600
            
          });
    group.add(rec);
    //return group;
group.on('mouseover', function() {
        document.body.style.cursor = 'pointer';
      });
      group.on('mouseout', function() {
        document.body.style.cursor = 'pointer';
      });
layer.add(group);
stage.add(layer);

// make the images draggable
$house.draggable({
    helper: 'clone',
    cursor: 'pointer',
    revert: 'invalid'
});
$(".room").draggable({
    helper: 'clone',
    cursor: 'pointer',
    revert: 'invalid'
});

$(".roome").draggable({
    helper: 'clone',
    cursor: 'pointer',
    revert: 'invalid'
});

// make the Kinetic Container a dropzone
$stageContainer.droppable({
    drop: dragDrop
});

// handle a drop into the Kinetic container
function dragDrop(e, ui) {
    // get the drop point
    var x = parseInt(ui.offset.left - offsetX, 10);
    var y = parseInt(ui.offset.top - offsetY, 10);

    // get the drop payload (here the payload is the image)
    var element = ui.draggable;
    var data = element.data("url");
    var theImage = element.data("image");

    // create a new Kinetic.Image at the drop point
    // be sure to adjust for any border width (here border==1)
    var image = new Kinetic.Image({
        name: data,
        x: x,
        y: y,
        image: theImage,
        draggable: true
    });    
    
     image.on('dblclick', function() {
        image.remove();
        layer.draw();
    });
    
    var $clone = ui.helper.clone();
    // all clones are draggable
    // if clone is shape then draggable + resizable
    
    if (!$clone.is('.inside-droppable')) {
        $(this).append($clone.addClass('inside-droppable').draggable({
          containment: $stageContainer,
          tolerance: 'fit',
          cursor: 'pointer',
          position: 'relative', //     Kommatecken??
          grid: [10, 10]             
                })); //Graderna hittas i 'jquery.ui.rotatable.js'. Sök på namnet 'rotation snap'
        $clone.append('Double click to delete');
        if ($clone.is(".imag") === false) {
                $clone.resizable({
                  containment: $stageContainer,
                  grid: [50, 50],//     Kommatecken??
                  handles: 'all'
                }).rotatable({snap: true});

        }
/* //När jag klickar så låt rotationsknappen synas
        $clone.on('click', function(e){
                // Måste använda 'clone.' på något vis för det är det som säger att du använder just den du trycker på, ex: $clone.is(".ui-rotatable-handle").show();
              $(".ui-rotatable-handle").show();
              //$clone.selectable();
                //$clone.css('display', 'inline')
              e.stopPropagation();
        });

        $(document).on('click', function() {
            $(".ui-rotatable-handle").hide();  
        });
*/
/*
          $clone.click(function(event) {
            if ($(event.target).is(".room")) {
                $(".ui-rotatable-handle").show();
            } else {
                $(".ui-rotatable-handle").hide();
            }
          });
*/
/*
        $clone.resizable({
            handles: {
                'nw': '#nwgrip',
                'ne': '#negrip',
                'sw': '#swgrip',
                'se': '#segrip',
                'n': '#ngrip',
                'e': '#egrip',
                's': '#sgrip',
                'w': '#wgrip'
            }
        });

          $clone.resizable({
            handle: {
              'n':'.ui-resizable-n', 
              'e':'.ui-resizable-e',
              's':'.ui-resizable-s',
              'w':'.ui-resizable-w',
              'ne': '.ui-resizable-ne',
              'se': '.ui-resizable-se',
              'sw': '.ui-resizable-sw',
              'nw': '.ui-resizable-nw'
            }
          })
        

        
        {
              'n':'.ui-resizable-n id="ngrip" ', 
              'e':'.ui-resizable-e id="egrip"',
              's':'.ui-resizable-s id="sgrip"',
              'w':'.ui-resizable-w id="wgrip"',
              'ne': '.ui-resizable-ne id="negrip"',
              'se': '.ui-resizable-se id="segrip"',
              'sw': '.ui-resizable-sw id="swgrip"',
              'nw': '.ui-resizable-nw id="nwgrip"'
            }


        $clone.on("click", function () {
          alert("hello");
        });
        */

        $clone.on('dblclick', function () {
            $clone.remove();
            layer.draw();
        });


/*
        $clone.keydown( function (e) {
            if (e.keyCode == 46) {
            $clone.remove();
            layer.draw();
            }
        });
*/

        $clone.css({top: y, left: x, position:'absolute'});
    }




    group.add(image);
    layer.add(group);
    stage.add(layer);

}
$('#target3').resizable().rotatable(); $('#draggable3').draggable();



