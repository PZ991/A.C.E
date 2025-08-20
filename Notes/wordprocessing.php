REWORDING
create functions:
addend('')=adds a string or character to the end of a word
beforelastletter('consonant|vowel')=boolean to check if last letteris either consonant or vowel
replastletter(''.'')=checks if last letter is param1 then replace it with param2
lastletter('')=checks if the last letter is param1
duplicatelastletter()=duplicates the last letter at the end
repend('','') replaces the end param1 with param2




also create functions:
index_options =(index|'last'|'first','last'-1(before the last),'first'+1(after the first))
indextype(index_options)
also create duplicateletter(index_options,index_options,'word or string match')
also create addletter(index_options,index_options,'word or string match')
findletter('')= finds param1 on the the string
findregex('')=uses regex to find something on the string
replaceregex(''.'')=finds something on the string and replace it



also create function processwords which has input words and checks which rule is best for it based on:
create function that processes the tags and returns the word
prioritize the tags that are exactly the same, else check for the tags that are similar closest,
 prioritze the number of correct tags first then move to missing or incorrect tag counts like if one condition turns like: (correct tags =2, incorrect tag =1)
case 1: (correct tags =2, incorrect tag =3),(correct tags =1, incorrect tag =3)= choose first
case 2: (correct tags =2, incorrect tag =2),(correct tags =3, incorrect tag =4)= choose second
case 3: (correct tags =1, incorrect tag =0),(correct tags =0, incorrect tag =2)= choose first
case 4: (correct tags =2, incorrect tag =0),(correct tags =1, incorrect tag =1)= choose first