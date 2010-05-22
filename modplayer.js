/*
ModPeriodTable[ft][n] = the period to use for note number n at finetune value ft.
Finetune values are in twos-complement, i.e. [0,1,2,3,4,5,6,7,-8,-7,-6,-5,-4,-3,-2,-1]
The first table is used to generate a reverse lookup table, to find out the note number
for a period given in the MOD file.
*/
var ModPeriodTable = [
	[1712, 1616, 1524, 1440, 1356, 1280, 1208, 1140, 1076, 1016, 960 , 906,
	 856 , 808 , 762 , 720 , 678 , 640 , 604 , 570 , 538 , 508 , 480 , 453,
	 428 , 404 , 381 , 360 , 339 , 320 , 302 , 285 , 269 , 254 , 240 , 226,
	 214 , 202 , 190 , 180 , 170 , 160 , 151 , 143 , 135 , 127 , 120 , 113,
	 107 , 101 , 95  , 90  , 85  , 80  , 75  , 71  , 67  , 63  , 60  , 56 ],
	[1700, 1604, 1514, 1430, 1348, 1274, 1202, 1134, 1070, 1010, 954 , 900,
	 850 , 802 , 757 , 715 , 674 , 637 , 601 , 567 , 535 , 505 , 477 , 450,
	 425 , 401 , 379 , 357 , 337 , 318 , 300 , 284 , 268 , 253 , 239 , 225,
	 213 , 201 , 189 , 179 , 169 , 159 , 150 , 142 , 134 , 126 , 119 , 113,
	 106 , 100 , 94  , 89  , 84  , 79  , 75  , 71  , 67  , 63  , 59  , 56 ],
	[1688, 1592, 1504, 1418, 1340, 1264, 1194, 1126, 1064, 1004, 948 , 894,
	 844 , 796 , 752 , 709 , 670 , 632 , 597 , 563 , 532 , 502 , 474 , 447,
	 422 , 398 , 376 , 355 , 335 , 316 , 298 , 282 , 266 , 251 , 237 , 224,
	 211 , 199 , 188 , 177 , 167 , 158 , 149 , 141 , 133 , 125 , 118 , 112,
	 105 , 99  , 94  , 88  , 83  , 79  , 74  , 70  , 66  , 62  , 59  , 56 ],
	[1676, 1582, 1492, 1408, 1330, 1256, 1184, 1118, 1056, 996 , 940 , 888,
	 838 , 791 , 746 , 704 , 665 , 628 , 592 , 559 , 528 , 498 , 470 , 444,
	 419 , 395 , 373 , 352 , 332 , 314 , 296 , 280 , 264 , 249 , 235 , 222,
	 209 , 198 , 187 , 176 , 166 , 157 , 148 , 140 , 132 , 125 , 118 , 111,
	 104 , 99  , 93  , 88  , 83  , 78  , 74  , 70  , 66  , 62  , 59  , 55 ],
	[1664, 1570, 1482, 1398, 1320, 1246, 1176, 1110, 1048, 990 , 934 , 882,
	 832 , 785 , 741 , 699 , 660 , 623 , 588 , 555 , 524 , 495 , 467 , 441,
	 416 , 392 , 370 , 350 , 330 , 312 , 294 , 278 , 262 , 247 , 233 , 220,
	 208 , 196 , 185 , 175 , 165 , 156 , 147 , 139 , 131 , 124 , 117 , 110,
	 104 , 98  , 92  , 87  , 82  , 78  , 73  , 69  , 65  , 62  , 58  , 55 ],
	[1652, 1558, 1472, 1388, 1310, 1238, 1168, 1102, 1040, 982 , 926 , 874,
	 826 , 779 , 736 , 694 , 655 , 619 , 584 , 551 , 520 , 491 , 463 , 437,
	 413 , 390 , 368 , 347 , 328 , 309 , 292 , 276 , 260 , 245 , 232 , 219,
	 206 , 195 , 184 , 174 , 164 , 155 , 146 , 138 , 130 , 123 , 116 , 109,
	 103 , 97  , 92  , 87  , 82  , 77  , 73  , 69  , 65  , 61  , 58  , 54 ],
	[1640, 1548, 1460, 1378, 1302, 1228, 1160, 1094, 1032, 974 , 920 , 868,
	 820 , 774 , 730 , 689 , 651 , 614 , 580 , 547 , 516 , 487 , 460 , 434,
	 410 , 387 , 365 , 345 , 325 , 307 , 290 , 274 , 258 , 244 , 230 , 217,
	 205 , 193 , 183 , 172 , 163 , 154 , 145 , 137 , 129 , 122 , 115 , 109,
	 102 , 96  , 91  , 86  , 81  , 77  , 72  , 68  , 64  , 61  , 57  , 54 ],
	[1628, 1536, 1450, 1368, 1292, 1220, 1150, 1086, 1026, 968 , 914 , 862,
	 814 , 768 , 725 , 684 , 646 , 610 , 575 , 543 , 513 , 484 , 457 , 431,
	 407 , 384 , 363 , 342 , 323 , 305 , 288 , 272 , 256 , 242 , 228 , 216,
	 204 , 192 , 181 , 171 , 161 , 152 , 144 , 136 , 128 , 121 , 114 , 108,
	 102 , 96  , 90  , 85  , 80  , 76  , 72  , 68  , 64  , 60  , 57  , 54 ],
	[1814, 1712, 1616, 1524, 1440, 1356, 1280, 1208, 1140, 1076, 1016, 960,
	 907 , 856 , 808 , 762 , 720 , 678 , 640 , 604 , 570 , 538 , 508 , 480,
	 453 , 428 , 404 , 381 , 360 , 339 , 320 , 302 , 285 , 269 , 254 , 240,
	 226 , 214 , 202 , 190 , 180 , 170 , 160 , 151 , 143 , 135 , 127 , 120,
	 113 , 107 , 101 , 95  , 90  , 85  , 80  , 75  , 71  , 67  , 63  , 60 ],
	[1800, 1700, 1604, 1514, 1430, 1350, 1272, 1202, 1134, 1070, 1010, 954,
	 900 , 850 , 802 , 757 , 715 , 675 , 636 , 601 , 567 , 535 , 505 , 477,
	 450 , 425 , 401 , 379 , 357 , 337 , 318 , 300 , 284 , 268 , 253 , 238,
	 225 , 212 , 200 , 189 , 179 , 169 , 159 , 150 , 142 , 134 , 126 , 119,
	 112 , 106 , 100 , 94  , 89  , 84  , 79  , 75  , 71  , 67  , 63  , 59 ],
	[1788, 1688, 1592, 1504, 1418, 1340, 1264, 1194, 1126, 1064, 1004, 948,
	 894 , 844 , 796 , 752 , 709 , 670 , 632 , 597 , 563 , 532 , 502 , 474,
	 447 , 422 , 398 , 376 , 355 , 335 , 316 , 298 , 282 , 266 , 251 , 237,
	 223 , 211 , 199 , 188 , 177 , 167 , 158 , 149 , 141 , 133 , 125 , 118,
	 111 , 105 , 99  , 94  , 88  , 83  , 79  , 74  , 70  , 66  , 62  , 59 ],
	[1774, 1676, 1582, 1492, 1408, 1330, 1256, 1184, 1118, 1056, 996 , 940,
	 887 , 838 , 791 , 746 , 704 , 665 , 628 , 592 , 559 , 528 , 498 , 470,
	 444 , 419 , 395 , 373 , 352 , 332 , 314 , 296 , 280 , 264 , 249 , 235,
	 222 , 209 , 198 , 187 , 176 , 166 , 157 , 148 , 140 , 132 , 125 , 118,
	 111 , 104 , 99  , 93  , 88  , 83  , 78  , 74  , 70  , 66  , 62  , 59 ],
	[1762, 1664, 1570, 1482, 1398, 1320, 1246, 1176, 1110, 1048, 988 , 934,
	 881 , 832 , 785 , 741 , 699 , 660 , 623 , 588 , 555 , 524 , 494 , 467,
	 441 , 416 , 392 , 370 , 350 , 330 , 312 , 294 , 278 , 262 , 247 , 233,
	 220 , 208 , 196 , 185 , 175 , 165 , 156 , 147 , 139 , 131 , 123 , 117,
	 110 , 104 , 98  , 92  , 87  , 82  , 78  , 73  , 69  , 65  , 61  , 58 ],
	[1750, 1652, 1558, 1472, 1388, 1310, 1238, 1168, 1102, 1040, 982 , 926,
	 875 , 826 , 779 , 736 , 694 , 655 , 619 , 584 , 551 , 520 , 491 , 463,
	 437 , 413 , 390 , 368 , 347 , 328 , 309 , 292 , 276 , 260 , 245 , 232,
	 219 , 206 , 195 , 184 , 174 , 164 , 155 , 146 , 138 , 130 , 123 , 116,
	 109 , 103 , 97  , 92  , 87  , 82  , 77  , 73  , 69  , 65  , 61  , 58 ],
	[1736, 1640, 1548, 1460, 1378, 1302, 1228, 1160, 1094, 1032, 974 , 920,
	 868 , 820 , 774 , 730 , 689 , 651 , 614 , 580 , 547 , 516 , 487 , 460,
	 434 , 410 , 387 , 365 , 345 , 325 , 307 , 290 , 274 , 258 , 244 , 230,
	 217 , 205 , 193 , 183 , 172 , 163 , 154 , 145 , 137 , 129 , 122 , 115,
	 108 , 102 , 96  , 91  , 86  , 81  , 77  , 72  , 68  , 64  , 61  , 57 ],
	[1724, 1628, 1536, 1450, 1368, 1292, 1220, 1150, 1086, 1026, 968 , 914,
	 862 , 814 , 768 , 725 , 684 , 646 , 610 , 575 , 543 , 513 , 484 , 457,
	 431 , 407 , 384 , 363 , 342 , 323 , 305 , 288 , 272 , 256 , 242 , 228,
	 216 , 203 , 192 , 181 , 171 , 161 , 152 , 144 , 136 , 128 , 121 , 114,
	 108 , 101 , 96  , 90  , 85  , 80  , 76  , 72  , 68  , 64  , 60  , 57 ]];

var ModPeriodToNoteNumber = {};
for (var i = 0; i < ModPeriodTable[0].length; i++) {
	ModPeriodToNoteNumber[ModPeriodTable[0][i]] = i;
}

function ModPlayer(mod, rate) {
	/* timing calculations */
	var ticksPerSecond = 7093789.2; /* PAL frequency */
	var ticksPerFrame; /* calculated by setBpm */
	var ticksPerOutputSample = Math.round(ticksPerSecond / rate);
	var ticksSinceStartOfFrame = 0;
	
	function setBpm(bpm) {
		/* x beats per minute => x*4 rows per minute */
		ticksPerFrame = Math.round(ticksPerSecond * 2.5/bpm);
	}
	setBpm(125);
	
	/* initial player state */
	var framesPerRow = 6;
	var currentFrame = 0;
	var currentPattern;
	var currentPosition;
	var currentRow;
	
	var channels = [];
	for (var chan = 0; chan < mod.channelCount; chan++) {
		channels[chan] = {
			playing: false,
			sample: mod.samples[0],
			finetune: 0,
			volume: 0,
			volumeDelta: 0,
			periodDelta: 0,
			arpeggioActive: false
		};
	}
	
	function loadRow(rowNumber) {
		currentRow = rowNumber;
		currentFrame = 0;
		for (var chan = 0; chan < mod.channelCount; chan++) {
			var note = currentPattern[currentRow][chan];
			if (note.period != 0 || note.sample != 0) {
				channels[chan].playing = true;
				channels[chan].samplePosition = 0;
				channels[chan].ticksSinceStartOfSample = 0; /* that's 'sample' as in 'individual volume reading' */
				if (note.sample != 0) {
					channels[chan].sample = mod.samples[note.sample - 1];
					channels[chan].volume = channels[chan].sample.volume;
					channels[chan].finetune = channels[chan].sample.finetune;
				}
				if (note.period != 0) {
					channels[chan].noteNumber = ModPeriodToNoteNumber[note.period];
					channels[chan].ticksPerSample = ModPeriodTable[channels[chan].finetune][channels[chan].noteNumber] * 2;
				}
			}
			if (note.effect != 0 || note.effectParameter != 0) {
				channels[chan].volumeDelta = 0; /* new effects cancel volumeDelta */
				channels[chan].periodDelta = 0; /* new effects cancel periodDelta */
				channels[chan].arpeggioActive = false;
				switch (note.effect) {
					case 0x00: /* arpeggio: 0xy */
						channels[chan].arpeggioActive = true;
						channels[chan].arpeggioNotes = [
							channels[chan].noteNumber,
							channels[chan].noteNumber + (note.effectParameter >> 4),
							channels[chan].noteNumber + (note.effectParameter & 0x0f)
						]
						channels[chan].arpeggioCounter = 0;
						break;
					case 0x01: /* pitch slide up - 1xx */
						channels[chan].periodDelta = -note.effectParameter;
						break;
					case 0x02: /* pitch slide down - 2xx */
						channels[chan].periodDelta = note.effectParameter;
						break;
					case 0x0a: /* volume slide - Axy */
						if (note.effectParameter & 0xf0) {
							/* volume increase by x */
							channels[chan].volumeDelta = note.effectParameter >> 4;
						} else {
							/* volume decrease by y */
							channels[chan].volumeDelta = -note.effectParameter;
						}
						break;
					case 0x0c: /* volume */
						if (note.effectParameter > 64) {
							channels[chan].volume = 64;
						} else {
							channels[chan].volume = note.effectParameter;
						}
						break;
					case 0x0f: /* tempo change */
						if (note.effectParameter == 0) {
						} else if (note.effectParameter <= 32) {
							framesPerRow = note.effectParameter;
						} else {
							setBpm(note.effectParameter);
						}
						break;
				}
			}
		}
	}
	
	function loadPattern(patternNumber) {
		currentPattern = mod.patterns[patternNumber];
		loadRow(0);
	}
	
	function loadPosition(positionNumber) {
		currentPosition = positionNumber;
		loadPattern(mod.positions[currentPosition]);
	}
	
	loadPosition(0);
	
	function getNextPosition() {
		if (currentPosition + 1 == mod.positionCount) {
			loadPosition(mod.positionLoopPoint);
		} else {
			loadPosition(currentPosition + 1);
		}
	}
	
	function getNextRow() {
		if (currentRow == 63) {
			getNextPosition();
		} else {
			loadRow(currentRow + 1);
		}
	}
	
	function doFrame() {
		currentFrame++;
		/* apply volume/pitch slide before fetching row, because the first frame of a row does NOT
		have the slide applied */
		for (var chan = 0; chan < mod.channelCount; chan++) {
			channels[chan].volume += channels[chan].volumeDelta;
			if (channels[chan].volume > 64) {
				channels[chan].volume = 64;
			} else if (channels[chan].volume < 0) {
				channels[chan].volume = 0;
			}
			channels[chan].ticksPerSample += channels[chan].periodDelta * 2;
			if (channels[chan].ticksPerSample > 4096) {
				channels[chan].ticksPerSample = 4096;
			} else if (channels[chan].ticksPerSample < 96) { /* equivalent to period 48, a bit higher than the highest note */
				channels[chan].ticksPerSample = 96;
			}
			if (channels[chan].arpeggioActive) {
				channels[chan].arpeggioCounter++;
				var noteNumber = channels[chan].arpeggioNotes[channels[chan].arpeggioCounter % 3];
				channels[chan].ticksPerSample = ModPeriodTable[channels[chan].finetune][noteNumber] * 2;
			}
		}
		
		if (currentFrame == framesPerRow) {
			getNextRow();
		}
	}
	
	this.getSamples = function(sampleCount) {
		samples = [];
		var i = 0;
		while (i < sampleCount) {
			ticksSinceStartOfFrame += ticksPerOutputSample;
			while (ticksSinceStartOfFrame >= ticksPerFrame) {
				doFrame();
				ticksSinceStartOfFrame -= ticksPerFrame;
			}
			
			leftOutputLevel = 0;
			rightOutputLevel = 0;
			for (var chan = 0; chan < mod.channelCount; chan++) {
				if (channels[chan].playing) {
					channels[chan].ticksSinceStartOfSample += ticksPerOutputSample;
					while (channels[chan].ticksSinceStartOfSample >= channels[chan].ticksPerSample) {
						channels[chan].samplePosition++;
						if (channels[chan].sample.repeatLength > 2 && channels[chan].samplePosition >= channels[chan].sample.repeatOffset + channels[chan].sample.repeatLength) {
							channels[chan].samplePosition = channels[chan].sample.repeatOffset;
						} else if (channels[chan].samplePosition >= channels[chan].sample.length) {
							channels[chan].playing = false;
							break;
						} else 
						channels[chan].ticksSinceStartOfSample -= channels[chan].ticksPerSample;
					}
					if (channels[chan].playing) {
						var rawVol = mod.data.charCodeAt(channels[chan].sample.startOffset + channels[chan].samplePosition);
						var vol = (((rawVol + 128) & 0xff) - 128) * channels[chan].volume; /* range (-128*64)..(127*64) */
						if (chan & 3 == 0 || chan & 3 == 3) {
							leftOutputLevel += vol * 3
							rightOutputLevel += vol
						} else {
							leftOutputLevel += vol
							rightOutputLevel += vol * 3
						}
						/* range of outputlevels is 128*64*2*channelCount */
						/* (well, it could be more for odd channel counts) */
					}
				}
			}
			
			samples[i] = leftOutputLevel / (128 * 128 * mod.channelCount);
			samples[i+1] = rightOutputLevel / (128 * 128 * mod.channelCount);
			i += 2;
		}
		
		return samples;
	}
}
