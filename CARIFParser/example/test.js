/**
 * Example how to use the converter
 * @param xml the xml as an Xml Document
 */
function startTest(doc){
	//create the parser with the XmlDocument
	var parser = new CARIF.Parser(doc);
	//parse it
	var doc = parser.parse();

	alert(doc.pois.length + " Features parsed!");
}