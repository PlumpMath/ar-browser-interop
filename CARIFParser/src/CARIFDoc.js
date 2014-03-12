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
 * A CARIF Document holds an array of POIs (Features) defined in the CARIF file
 */
CARIF.Document = function(){
	this.pois = [];
};

/**
 * A POI holds all metadata for a Feature.
 * 
 * <ul>
 *   <li><b>id</b>: The ID of the Feature/POI</li>
 *   <li><b>name</b>: The name of the Feature/POI</li>
 *   <li><b>description</b>: The description of the Feature/POI</li>
 *   <li><b>image</b>: The URL to the image of the Feature/POI</li>
 *   <li><b>location</b>: The location object of the Feature/POI</li>
 *   <li><b>actions</b>: The array of actions associated with this POI</li>
 * </ul>
 */
CARIF.Poi = function(){
	this.id = null;
	this.name = null;
	this.description = null;
	this.image = null;
	this.location = null;
	this.actions = [];
};

/**
 * A Location holds the location information for a Feature/POI.
 * 
 * <ul>
 *   <li><b>latitude</b>: latitude in WGS84</li>
 *   <li><b>longitude</b>: longitude in WGS84</li>
 *   <li><b>altitude</b>: altitude in WGS84</li>
 * </ul>
 */
CARIF.Location = function(){
	this.latitude = null;
	this.longitude = null;
	this.altitude = null;
};

/**
 * PoiAction holds all information for an action associated with a POI.
 * 
 * <ul>
 *   <li><b>mimeType</b>: The mimeType of the action; Check the CARIF specification for accepted mimeTypes.
 *   					 The parser can understand any mimeType defined in CARIF.PoiAction.TYPE.</li>
 *   <li><b>label</b>: The label of the action that will be added on the button</li>
 *   <li><b>uri</b>: The URI for the action</li>
 * </ul>
 */
CARIF.PoiAction = function(){
	this.mimeType = null;
	this.label = null;
	this.uri = null;
	/**
	 * getType
	 * Returns the type of the PoiAction based on the mimeType (see CARIF.PoiAction.TYPE for available types)
	 */
	this.getType = function(){
		if(!this.mimeType){
			return null;
		} else if(this.mimeType == "text/html"){
			return this.TYPE.OPEN_WEBPAGE;
		} else if(this.mimeType == "application/send-sms"){
			return this.TYPE.SEND_SMS;
		} else if(this.mimeType == "application/send-email"){
			return this.TYPE.SEND_EMAIL;
		} else if(this.mimeType == "application/call"){
			return this.TYPE.CALL;
		} else if(this.mimeType == "application/route-to"){
			return this.TYPE.ROUTE_TO;
		} else if(this.mimeType.match("^audio/")){
			return this.TYPE.PLAY_AUDIO;
		} else if(this.mimeType.match("^video/")){
			return this.TYPE.PLAY_VIDEO;
		} else {
			return null;
		}
	};
};

/**
 * PoiAction.TYPE holds any type the parser can understand. The following types are available:
 * 
 * <ul>
 *   <li><b>OPEN_WEBPAGE</b>: Opens the webpage specified by the uri in the POI action</li>
 *   <li><b>PLAY_AUDIO</b>: Plays the Audio specified by the uri in the POI action</li>
 *   <li><b>PLAY_VIDEO</b>: Plays the Video in full-screen specified by the uri in the POI action</li>
 *   <li><b>SEND_SMS</b>: Sends an SMS to the number specified in the uri of the POI action</li>
 *   <li><b>SEND_EMAIL</b>: Sends an Email to the address specified in the uri of the POI action</li>
 *   <li><b>CALL</b>: Initiates a call to the number specified in the uri of the POI action</li>
 *   <li><b>ROUTE_TO</b>: Displays the route to the coordinates specified in the uri of the POI action</li>
 * </ul>
 */
CARIF.PoiAction.prototype.TYPE = {
	OPEN_WEBPAGE : 1,
	PLAY_AUDIO : 2,
	PLAY_VIDEO : 3,
	SEND_SMS : 4,
	SEND_EMAIL : 5,
	CALL : 6,
	ROUTE_TO : 7
};