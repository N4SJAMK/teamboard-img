'use strict';

var config = require('../../static/board');
var markdown = require( "markdown" ).markdown;

// Max value was found by testing and its max our 
//   current version of webshot allows without breaking
var maxAllowedPixelAmount = 45000000;
var defaultTeamboardGridSize = 10;

function boardCheck(body) {
    // If board has no tickets we need to manually add tickets array here
    if(typeof body.tickets == 'undefined') {
        body.tickets = [];
    }

    switch('undefined') {
        case typeof body.background:
            return 'background not defined on request';
        case typeof body.customBackground:
            return 'customBackground not defined on request';
        case typeof body.size.width:
            return 'board width not defined on request';
        case typeof body.size.height:
            return 'board height not defined on request';
    }

    var width = config.webshot.shotSize.width * (body.size.width / defaultTeamboardGridSize);
    var height = config.webshot.shotSize.height * (body.size.height / defaultTeamboardGridSize);
    var pixels = (width * height);
    if(pixels > maxAllowedPixelAmount) {
        return 'Board size is too big for image to be taken, please lower your board size.';
    }

	return ticketsCheck(body.tickets);
}

function ticketsCheck(tickets) {
	for (var index = 0; index < tickets.length; ++index) {
        switch('undefined') {
            case typeof tickets[index].color:
                return 'color is not defined on ticket number:' + index;
            case typeof tickets[index].content:
                return 'content is not defined on ticket number:' + index;
            case typeof tickets[index].position:
                return 'position is not defined on ticket number:' + index;
            case typeof tickets[index].position.x:
                return 'position x is not defined on ticket number:' + index;
            case typeof tickets[index].position.y:
                return 'position y is not defined on ticket number:' + index;
        }

        // Change markdown text to html here 
        tickets[index].heading = markdown.toHTML( tickets[index].heading );
        tickets[index].content = markdown.toHTML( tickets[index].content );
	}

	return null;
}

module.exports = function(req, callback) {
	return callback(boardCheck(req.body));
}
