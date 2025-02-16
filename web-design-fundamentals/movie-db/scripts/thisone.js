#target photoshop


var dialog = new Window('dialog', 'ihawp.com');

dialog.closeNav = dialog.add('button', undefined, 'Close Navigation');

dialog.closeNav.onClick = function() {
	dialog.close();
}


function layerSetExists(layer, layerSetName) {
    if (layer.typename === "LayerSet") {
        for (var i = 0; i < layer.layerSets.length; i++) {
            if (layer.layerSets[i].name === layerSetName) {
                return true;
            }
        }
    }
    return false;
}


var doc = app.activeDocument;
var save = [];
var layers = [];
for (var i = 0; i < doc.layers.length; i++) {
    var layer = doc.layers[i];
    if (layer.typename === "LayerSet") {
        var layerSetName = "Movies Container";
	if (layerSetExists(layer, layerSetName)) {
		layers.push(layer.name);
		save.push(layer);
	}
    }
}

var staticText = dialog.add('statictext', undefined, "starter text");

var dropdown = dialog.add('dropdownlist', undefined, layers);
dropdown.selection = 0;

var showw = dialog.add('button', undefined, 'Show');
showw.onClick = function() {
    if (dropdown.selection) {
        var selectedIndex = dropdown.selection.index;
        var layer = save[selectedIndex];

        for (var i = 0; i < layer.layerSets.length; i++) {
            var container = layer.layerSets[i];

            for (var j = 0; j < container.layerSets.length; j++) {
                var movieOverlayLayerSet = container.layerSets[j];

		for (var l = 0; l < movieOverlayLayerSet.layerSets.length; l++) {
			var banana = movieOverlayLayerSet.layerSets[l]

                	if (banana.name === "Movie Overlay") {
                    		banana.visible = true;
			}
		}
            }
        }
    }
}

var hide = dialog.add('button', undefined, 'Hide');
hide.onClick = function() {
    if (dropdown.selection) {
        var selectedIndex = dropdown.selection.index;
        var layer = save[selectedIndex];

        for (var i = 0; i < layer.layerSets.length; i++) {
            var container = layer.layerSets[i];

            for (var j = 0; j < container.layerSets.length; j++) {
                var movieOverlayLayerSet = container.layerSets[j];

		for (var l = 0; l < movieOverlayLayerSet.layerSets.length; l++) {
			var banana = movieOverlayLayerSet.layerSets[l]

                	if (banana.name === "Movie Overlay") {
                    		banana.visible = false;
			}
		}
            }
        }
    }
};

dialog.show();
