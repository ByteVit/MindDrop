import json
import sys
test_json = {
"A":".",
"a":"_.",
"B":"__.",
"C":".__",
'c':"...",
"D":".._",
"d":"._.",
"E":"..._",
"e":"-._",
"F":"_-_",
"f":"_,.",
"G":"#--",
"g": "#_#",
"H":"__=",
"h" :"_#=",
"I":"_+_",
"i":"$_$",
"J":"=[>",
"j":"_--_$",
"K":"%%%",
"k":"%@#",
"L":"\%_",
"l":"=][",
"M":"|==",
"m":"==|",
"N":"##*",
"n":"#$$",
"O":"[|]",
"o":";;;",
"P":"***",
"p":"**$**",
"Q":"=:=|",
"q":"[___]",
"R": "_%%__",
"r":"=\|/",
"S":"_&&_",
"s":"_",
"T":"!?!",
"t":"$$_",
"U":"¢€€",
"u":"**",
"v":"*****",
"V":"_*_*_*",
"W":"[[[[]]]]",
"w":"===",
"X":"##",
"x":"}{{",
"Y": "(([<>]))",
"y":"=|=",
"Z":"&&&",
"z":"©®®",
"1":"_.''.",
"2":"=[]",
"3":":::",
"4":"!?){",
"5":"_%@@",
"6":"@$$",
"7":"<>><",
"8":"[>|\|",
"9":"[%✓]",
"0":"|||\\%[|"
}

def encode_str(user_value,show_str=True):
	if  not isinstance(show_str,bool):
		print("You must set the 'show_str' property to either 'True' or 'False' in the argument parameter function")
		sys.exit(1)
	elif show_str==True:
		if user_value:
			encoded = "".join([test_json.get(char,char)for char in user_value])
			return encoded
		else:
			print("No value to Encode!")
			sys.exit(1)
	else:
		return None
		
def decode_str(encoded_str):
		reversed_str = {v : k for k,v in test_json.items()}
		decoded ="".join([reversed_str.get(char,char) for char in encoded_str])
		return decoded