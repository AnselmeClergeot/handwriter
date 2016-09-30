/*
  This file is part of handwriter.js.

    handwriter.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    handwriter.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Foobar.  If not, see <http://www.gnu.org/licenses/>. 2
*/

var canvas;
var ctx;
var letterWidth = 59;
var fontSize = 18;

var charTableImage;
var charTable = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
				'1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
				'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
				'\'', '.', ',', ';', '!', '?', '-', ':', '(', ')', '[', ']', '/',
				'\340', '\350', '\351', '\352', '\357', '\364', '\374',
				'&', '\347',
				' '];

function drawGrid()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	for(var x = 0; x < canvas.width/fontSize; x++)
	{
		for(var y = 0; y < canvas.width/fontSize*2; y++)
		{
			ctx.drawImage(charTableImage, 11 * letterWidth, 2 * letterWidth * 2, letterWidth, letterWidth*2, x*fontSize, y*fontSize*2, fontSize, fontSize*2);
		}
	}
}
			
window.onload = function()
{
	canvas = document.getElementById("screen");
	ctx = canvas.getContext("2d");
	canvas.width = innerWidth;
	canvas.height = innerHeight / 1.7;
	charTableImage= new Image();
	charTableImage.src = "alphabet.png";
	
	charTableImage.onload = function()
	{
	drawGrid();
	}
	
}

function getIndexOfChar(character)
{
	for(var i = 0; i < charTable.length; i++)
		if(character==charTable[i])
			return i;
}


function updateString()
{
	drawGrid();
	
	var xPos = 0;
	var yPos = 0;
	
	
	
	var toWrite = document.getElementById("word").value;
	
	for(var i = 0; i < toWrite.length; i++)
	{
		
		var charac = toWrite.charAt(i);

		var x = parseInt(getIndexOfChar(charac) % 37);
		var y = parseInt(getIndexOfChar(charac) / 37);
		
		if(charac == '\n')
		{
			xPos = -1;
			yPos++;
		}
		
		ctx.drawImage(charTableImage, x * letterWidth, y * letterWidth * 2, letterWidth, letterWidth*2, xPos*fontSize, yPos*fontSize*2, fontSize, fontSize*2);
		xPos++;
	}
}