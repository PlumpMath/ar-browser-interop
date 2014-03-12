/**
 * Copyright 2014 Wikitude GmbH.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * 
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * CARIF is used as namespace.
 */
var CARIF = window.CARIF || {};

/**
 * The CARIF parser, used to convert an XML Document into a CARIF Document object.
 * 
 * The Parser is created using new CARIF.Parser(xmlString).
 * 
 * @param xml The xml to be parsed, as XML Document.
 * 
 */
CARIF.Parser = function(xml){
	
	//the features represented as Array of XmlNode objects
	var features = null;
	
	/**
	 * parses the file and finds the root Feature nodes
	 */
	var load = function(){
		features = xml.getElementsByTagName("Feature");
	};
	
	/**
	 * returns a CARIF.Document object containing all the parsed Features.
	 * This is the public entry point for the parser to start parsing.
	 */
	this.parse = function(){
		var carifDoc = new CARIF.Document();
		if(features){
			//run through all the nodes
			for(var i = 0; i < features.length; i++){
				// extract POI information from the XmlNode
				var poi = parseFeature(features[i]);
				// add the POI to the document
				carifDoc.pois.push(poi);
			}
		}
		return carifDoc;
	};
	
	/**
	 * parses a single Feature
	 * @param feature the XmlNode representing the Feature to parse.
	 * @return the POI object with the metadata
	 */
	var parseFeature = function(feature){
		
		// create a new object
		var poi = new CARIF.Poi();
		
		// get the ID attribute
		poi.id = feature.getAttribute("id");
		
		// get name and description from the text nodes
		poi.name = getNodeValue(feature, "name");
		poi.description = getNodeValue(feature, "description");
		
		// parse the metadata section
		var metadata = feature.getElementsByTagName("metadata");
		if(metadata && metadata.length == 1){
			metadata = metadata[0];
			
			//get image link if available
			var image = metadata.getElementsByTagName("image");
			if(image && image.length == 1){
				poi.image = image[0].getAttribute("href");
			}
			
			//parse Poi actions
			poi.actions = parseActions(metadata.getElementsByTagName("action"));
		}
		
		//parse the location
		poi.location = parseLocation(feature.getElementsByTagName("Point")[0]);
		
		return poi;
	};
	
	/**
	 * parses the POI actions and returns the array of PoiAction objects
	 * 
	 * @param actions the array of XmlNodes representing all poi actions
	 */
	var parseActions = function(actions){
		var actionsArray = [];
		if(actions){
			// parse every single poi action
			for(var i = 0; i < actions.length; i++){
				actionsArray.push(parseAction(actions[i]));
			}
		}
		return actionsArray;
	};
	
	/**
	 * parses the POI action and returns the PoiAction object
	 * 
	 * @param actionNode the XmlNode representing the poi action
	 */
	var parseAction = function(actionNode){
		var action = new CARIF.PoiAction();
		//parse all attributes and text nodes
		action.mimeType = actionNode.getAttribute("mime-type");
		action.label = actionNode.getAttribute("label");
		action.uri = getNodeValue(actionNode, "uri");
		return action;
	};
	
	/**
	 * parses the Point node and returns the Location object
	 * 
	 * @param actionNode the XmlNode representing the poi action
	 */
	var parseLocation = function(pointNode){
		var locationArray = getNodeValue(pointNode, "pos").split(" ");
		var location = new CARIF.Location();
		location.longitude = parseFloat(locationArray[0]);
		location.latitude = parseFloat(locationArray[1]);
		location.altitude = locationArray[2] ? parseFloat(locationArray[2]) : null;
		return location;
	};
	
	/**
	 * takes an xml node, searches for a child text node with the given nodeName and returns the text value
	 * 
	 * @param xml the xml node
	 * @param nodeName the name of the text node to search for
	 */
	var getNodeValue = function(xml, nodeName){
		var node = xml.getElementsByTagName(nodeName);
		//console.log(node);
		return node && node.length == 1 ? $.trim(node[0].textContent) : null;
	};
	
	//immediately get the Feature nodes
	load();
};