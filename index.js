$(document).ready(function () {
    console.log("ready!");
    //attach a click listener to a play button
    document.getElementById('playButtonId').addEventListener('click', async () => {
        bachFlowVoice();
    })
});


const bachFlow = {
    "1": ["1", "2", "3", "4", "5", "6", "7"],
    "2": ["5", "7"],
    "3": ["6", "4", "2"],
    "4": ["5", "2", "7", "1"],
    "5": ["1", "6"],
    "6": ["4", "2"],
    "7": ["1", "6"]
}

const majorScale = {
    "Cb": ["Cb", "Db", "Eb", "Fb", "Gb", "Ab", "B"],
    "Gb": ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"],
    "Db": ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
    "Ab": ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
    "Eb": ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
    "Bb": ["Bb", "C", "D", "Eb", "F", "G", "A"],
    "F": ["F", "G", "A", "Bb", "C", "D", "E"],
    "C": ["C", "D", "E", "F", "G", "A", "B"],
    "G": ["G", "A", "B", "C", "D", "E", "F#"],
    "D": ["D", "E", "F#", "G", "A", "B", "C#"],
    "A": ["A", "B", "C#", "D", "E", "F#", "G#"],
    "E": ["E", "F#", "G#", "A", "B", "C#", "D#"],
    "B": ["B", "C#", "D#", "E", "F#", "G#", "A#"],
    "F#": ["F#", "G#", "A#", "B", "C#", "D#", "F"],
    "C#": ["C#", "D#", "E#", "F#", "G#", "A#", "C"]
}
const numberToNote = {
    "Cb": { "1": "Cb", "2": "Db", "3": "Eb", "4": "E", "5": "Gb", "6": "Ab", "7": "B" },
    "Gb": { "1": "Gb", "2": "Ab", "3": "Bb", "4": "Cb", "5": "Db", "6": "Eb", "7": "F" },
    "Db": { "1": "Db", "2": "Eb", "3": "F", "4": "Gb", "5": "Ab", "6": "Bb", "7": "C" },
    "Ab": { "1": "Ab", "2": "Bb", "3": "C", "4": "Db", "5": "Eb", "6": "F", "7": "G" },
    "Eb": { "1": "Eb", "2": "F", "3": "G", "4": "Ab", "5": "Bb", "6": "C", "7": "D" },
    "Bb": { "1": "Bb", "2": "C", "3": "D", "4": "Eb", "5": "F", "6": "G", "7": "A" },
    "F": { "1": "F", "2": "G", "3": "A", "4": "Bb", "5": "C", "6": "D", "7": "E" },
    "C": { "1": "C", "2": "D", "3": "E", "4": "F", "5": "G", "6": "A", "7": "B" },
    "G": { "1": "G", "2": "A", "3": "B", "4": "C", "5": "D", "6": "E", "7": "F#" },
    "D": { "1": "D", "2": "E", "3": "F#", "4": "G", "5": "A", "5": "B", "7": "C#" },
    "A": { "1": "A", "2": "B", "3": "C#", "4": "D", "5": "E", "6": "F#", "7": "G#" },
    "E": { "1": "E", "2": "F#", "3": "G#", "4": "A", "5": "B", "6": "C#", "7": "D#" },
    "B": { "1": "B", "2": "C#", "3": "D#", "4": "E", "5": "F#", "6": "G#", "7": "A#" },
    "F#": { "1": "F#", "2": "G#", "3": "A#", "4": "B", "5": "C#", "6": "D#", "7": "F" },
    "C#": { "1": "C#", "2": "D#", "3": "F", "4": "F#", "5": "G#", "6": "A#", "7": "C" }
}

const noteToNumber = {
    "Cb": { "Cb": "1", "Db": "2","Eb": "3", "E": "4", "Gb": "5", "Ab": "6", "B": "7" },
    "Gb": { "Gb": "1", "Ab": "2", "Bb": "3", "Cb": "4", "Db": "5", "Eb": "6", "F": "7" },
    "Db": { "Db": "1", "Eb": "2", "F": "3", "Gb": "4", "Ab": "5", "Bb": "6", "C": "7" },
    "Ab": { "Ab": "1", "Bb": "2", "C": "3", "Db": "4", "Eb": "5", "F": "6", "G": "7" },
    "Eb": { "Eb": "1", "F": "2", "G": "3", "Ab": "4", "Bb": "5", "C": "6", "D": "7" },
    "Bb": { "Bb": "1", "C": "2", "D": "3", "Eb": "4", "F": "5", "G": "6", "A": "7" },
    "F": { "F": "1", "G": "2", "A": "3", "Bb": "4", "C": "5", "D": "6", "B": "7" },
    "C": { "C": "1", "D": "2", "E": "3", "F": "4", "G": "5", "A": "6", "B": "7" },
    "G": { "G": "1", "A": "2", "B": "3", "C": "4", "D": "5", "E": "6", "F#": "7" },
    "D": { "D": "1", "E": "2", "F#": "3", "G": "4", "A": "5", "B": "6", "C#": "7" },
    "A": { "A": "1", "B": "2", "C#": "3", "D": "4", "E": "5", "F#": "6", "G#": "7" },
    "E": { "E": "1", "F#": "2", "G#": "3", "A": "4", "B": "5", "C#": "6", "D#": "7" },
    "B": { "B": "1", "C#": "2", "D#": "3", "E": "4", "F#": "5", "G#": "6", "A#": "7" },
    "F#": { "F#": "1", "G#": "2", "A#": "3", "B": "4", "C#": "5", "D#": "6", "F": "7" },
    "C#": { "C#": "1", "D#": "2", "F": "3", "F#": "4", "G#": "5", "A#": "6", "C": "7" }
}

function sing(playables) {
    for (p in playables) {
        var hrtz = playables[p].getHertz();
        console.log(playables[p].noteName + " " + playables[p].octive + " " + hrtz + " " + playables[p].duration);
        var durationFactor = 0.25;
	var noteDuration = durationFactor * playables[p].duration;
	playNote(hrtz, 'sine', noteDuration);
        playNote(hrtz, 'square', noteDuration);
        playNote(hrtz, 'triangle', noteDuration);
        playNote(hrtz, 'sawtooth', noteDuration);
    }
}

function performBeats(beats) {
	//Here I anticipate having a list of lists, one for each voice that is sounding
	// so  a voice can drop out for a 'rest' for a given beat.
	// in this format, the greatest duration value will be 1

	for(b in beats){
		// the following illustrates the datastructure for 4 beats
		//	
		//	C	G	A	F
		//	I	V	vi	IV
		//
		//[
		//	[
		//		Playable('C',1,5), // soprano
		//		Playable('G',1,4), // alto
		//		Playable('E',1,4), // tenor
		//		Playable('C',1,3) // bass
		//	],
		//	[
		//		Playable('E',1,5), // soprano
		//		Playable('G',1,4), // alto
		//		Playable('C',1,4), // tenor
		//		Playable('G',1,3) // bass
		//
		//	],	
		//	[
		//		Playable('C',1,5), // soprano
		//		//Playable('G',1,4), // OMIT alto
		//		Playable('E',1,4), // tenor
		//		Playable('A',1,3) // bass
		//
		//	],
		//	[
		//		Playable('A',1,5), // soprano
		//		Playable('C',1,4), // alto
		//		Playable('C',1,4), // tenor
		//		Playable('F',1,3) // bass
		//
		//	]
		//]
		var playables = beats[b];
		for (p in playables) {
			(function(i){window.setTimeout(function(){
				var hrtz = playables[p].getHertz();
				//console.log(playables[p].noteName + " " + playables[p].octive + " " + hrtz + " " + playables[p].duration);
				var durationFactor = 1;
				var noteDuration = durationFactor * playables[p].duration;
				playNote(hrtz, 'sine', noteDuration);
		        	playNote(hrtz, 'square', noteDuration);
		        	playNote(hrtz, 'triangle', noteDuration);
		        	playNote(hrtz, 'sawtooth', noteDuration);
    		

			}, i * 2000);}(b));
		}
	}
}

function bachFlowVoice() {
    //I'd like this to generate and complete naturally,
    // but here I'm going to start with just 20 or so bars

    //console.log("key: " + key + ", " + thisNoteA + "," + noteValueA + ", " + thisNoteB + "," + noteValueB);
    //var playableNoteA = numberToNote[key][thisNoteA];
    //var noteA = bachFlow[thisNoteA][getRandomInt(0, bachFlow[thisNoteA].length)];
    var voice = []


function bachFlowVoice() {
    //I'd like this to generate and complete naturally,
    // but here I'm going to start with just 20 or so bars

    //console.log("key: " + key + ", " + thisNoteA + "," + noteValueA + ", " + thisNoteB + "," + noteValueB);
    //var playableNoteA = numberToNote[key][thisNoteA];
    //var noteA = bachFlow[thisNoteA][getRandomInt(0, bachFlow[thisNoteA].length)];
    var voice = []
    var key = 'C#'
    var startingNote = key
    var p = Playable(key, 1, 4);
    var playable = nextBachFlow(key, p);

    for (var i = 0; i < 20; i++) {
        playable = nextBachFlow(key, playable)
        voice.push(playable)
    }
    sing(voice);
}

function bachFlowChoir() {
	//I'm taking the implementation of the single voice
	// and scaling it up to a 4 voice choir
	
	// each beat, we can choose to play a note from one of 4 voices
	var beats = []
	var key = 'C';
	
	// nice to start on a well voiced chord
	var sopNote = Playable('C', 1, 5);
	var altNote = Playable('G', 1, 4);
	var tenNote = Playable('E', 1, 4);
	var basNote = Playable('C', 1, 3);
	
    	for (var i = 0; i < 20; i++) {
		var voice = [];
        	sopNote = nextBachFlow(key, sopNote);
        	altNote = nextBachFlow(key, altNote);
        	tenNote = nextBachFlow(key, tenNote);
        	basNote = nextBachFlow(key, basNote);
        	
		voice.push(sopNote);
		voice.push(altNote);
		voice.push(tenNote);
		voice.push(basNote);

		beats.push(voice);
    	}
    	choirPerform(voice);
}


function nextBachFlow(key, playable) {
    var noteNumber = noteToNumber[key][playable.noteName]
    //console.log(noteNumber, playable, playable.noteName, playable.duration)
    var nextNoteNumber = bachFlow[noteNumber][getRandomInt(0, bachFlow[noteNumber].length)];
    var nextNote = numberToNote[key][nextNoteNumber]
    var nextPlayable = Playable(nextNote, getRandomInt(1,6), getRandomInt(3, 5));
    return nextPlayable
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function playNote(frequency, type, duration) {
    var context = new AudioContext();
    var o = null;
    var g = null;
    setTimeout(function () {
        o = context.createOscillator();
        g = context.createGain();
        o.type = type;
        o.connect(g);
        o.frequency.value = frequency;
        g.connect(context.destination);
        o.start(0);
        g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + duration);
    }, duration * 2000)
}

const Playable = (n, d, o) => {
    const noteName = n;
    const duration = d;
    const octive = o;

    return {
        noteName: noteName,
        duration: duration,
        octive: octive,
        getHertz: () => {
            var noteFreq = {
                'C0': 16.35,
                'C#0': 17.32,
                'Db0': 17.32,
                'D0': 18.35,
                'D#0': 19.45,
                'Eb0': 19.45,
                'E0': 20.60,
                'F0': 21.83,
                'F#0': 23.12,
                'Gb0': 23.12,
                'G0': 24.50,
                'G#0': 25.96,
                'Ab0': 25.96,
                'A0': 27.50,
                'A#0': 29.14,
                'Bb0': 29.14,
                'B0': 30.87,
                'C1': 32.70,
                'C#1': 34.65,
                'Db1': 34.65,
                'D1': 36.71,
                'D#1': 38.89,
                'Eb1': 38.89,
                'E1': 41.20,
                'F1': 43.65,
                'F#1': 46.25,
                'Gb1': 46.25,
                'G1': 49.00,
                'G#1': 51.91,
                'Ab1': 51.91,
                'A1': 55.00,
                'A#1': 58.27,
                'Bb1': 58.27,
                'B1': 61.74,
                'C2': 65.41,
                'C#2': 69.30,
                'Db2': 69.30,
                'D2': 73.42,
                'D#2': 77.78,
                'Eb2': 77.78,
                'E2': 82.41,
                'F2': 87.31,
                'F#2': 92.50,
                'Gb2': 92.50,
                'G2': 98.00,
                'G#2': 103.83,
                'Ab2': 103.83,
                'A2': 110.00,
                'A#2': 116.54,
                'Bb2': 116.54,
                'B2': 123.47,
                'C3': 130.81,
                'C#3': 138.59,
                'Db3': 138.59,
                'D3': 146.83,
                'D#3': 155.56,
                'Eb3': 155.56,
                'E3': 164.81,
                'F3': 174.61,
                'F#3': 185.00,
                'Gb3': 185.00,
                'G3': 196.00,
                'G#3': 207.65,
                'Ab3': 207.65,
                'A3': 220.00,
                'A#3': 233.08,
                'Bb3': 233.08,
                'B3': 246.94,
                'C4': 261.63,
                'C#4': 277.18,
                'Db4': 277.18,
                'D4': 293.66,
                'D#4': 311.13,
                'Eb4': 311.13,
                'E4': 329.63,
                'F4': 349.23,
                'F#4': 369.99,
                'Gb4': 369.99,
                'G4': 392.00,
                'G#4': 415.30,
                'Ab4': 415.30,
                'A4': 440.00,
                'A#4': 466.16,
                'Bb4': 466.16,
                'B4': 493.88,
                'C5': 523.25,
                'C#5': 554.37,
                'Db5': 554.37,
                'D5': 587.33,
                'D#5': 622.25,
                'Eb5': 622.25,
                'E5': 659.26,
                'F5': 698.46,
                'F#5': 739.99,
                'Gb5': 739.99,
                'G5': 783.99,
                'G#5': 830.61,
                'Ab5': 830.61,
                'A5': 880.00,
                'A#5': 932.33,
                'Bb5': 932.33,
                'B5': 987.77,
                'C6': 1046.50,
                'C#6': 1108.73,
                'Db6': 1108.73,
                'D6': 1174.66,
                'D#6': 1244.51,
                'Eb6': 1244.51,
                'E6': 1318.51,
                'F6': 1396.91,
                'F#6': 1479.98,
                'Gb6': 1479.98,
                'G6': 1567.98,
                'G#6': 1661.22,
                'Ab6': 1661.22,
                'A6': 1760.00,
                'A#6': 1864.66,
                'Bb6': 1864.66,
                'B6': 1975.53,
                'C7': 2093.00,
                'C#7': 2217.46,
                'Db7': 2217.46,
                'D7': 2349.32,
                'D#7': 2489.02,
                'Eb7': 2489.02,
                'E7': 2637.02,
                'F7': 2793.83,
                'F#7': 2959.96,
                'Gb7': 2959.96,
                'G7': 3135.96,
                'G#7': 3322.44,
                'Ab7': 3322.44,
                'A7': 3520.00,
                'A#7': 3729.31,
                'Bb7': 3729.31,
                'B7': 3951.07,
                'C8': 4186.01
            }
            return noteFreq[noteName + octive];
        },

    }
}
