var stateCounts =[];
var statesTotal = 0;
var apiKey = "";
var zipGlobal ="";
var zipList ="";

function landingScreen(){
    stateCounts =[];
    statesTotal = 0;
    apiKey = "";
    zipGlobal ="";
    zipList ="";
    var container = document.getElementById('main');
    var landscreenHeadTag = document.createElement('h2');
    landscreenHeadTag.setAttribute('id', 'landscreenHeader');
    var landscreenHeadText = document.createTextNode('Minnesota COVID-19 Goal Tracker');
    landscreenHeadTag.appendChild(landscreenHeadText);
    container.appendChild(landscreenHeadTag);
    getApiState();
}

landingScreen();

function getApiState() {
      let requestUrl2 = `https://api.covidactnow.org/v2/states.json?apiKey=6b5476d41dfb418d82fbaf1cfaa0071c`;
      fetch(requestUrl2)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
            for (var i=0; i<53; i++){
                statesTotal += data[i].actuals.vaccinationsCompleted
                }

                var pctCalc = (statesTotal/331000000)*100;
                var totalUS = Math.round(pctCalc);
                var displayTest = document.getElementById('main');
                var blurbTag = document.createElement('p');
                var blurbText = document.createTextNode('President Biden’s goal was to have 70% of adults in the US receive COVID-19 vaccinations by the Fourth of July. At our  current rate of vaccination, we will fall slightly short of this goal; those of us who want to make 2021 a summer of closeness even amid the rise of the Delta variant better campaign to get as many people vaccinated as quickly as possible.');
                blurbTag.appendChild(blurbText);
                blurbTag.setAttribute('class', 'paragraph');
                
                var shortfall = 160000000-statesTotal
                var totalShare = shortfall*0.017047322;
                
                var totalShareRound = Math.round(totalShare);
                var totalShareRoundCommas = Math.round(totalShareRound);

                var p1Tag = document.createElement('p'); // added ".toLocaleString()" methods to large numbers needing comma-notation below -Neil
                var p1Text =document.createTextNode("Currently, only "+totalUS+" percent of Americans are vaccinated, but at LEAST half of us are ugly. This means that "+shortfall.toLocaleString()+" Americans need to be vaccinated by the 4th or President Biden will cry. Which is obviously unacceptable. So "+totalShareRound.toLocaleString()+" Minnesotans need to show their dumb faces at a vaccination site like RIGHT NOW or we'll have to eat a share of the blame for whatever resulting disgrace befalls us.");
                p1Tag.appendChild(p1Text);
                p1Tag.setAttribute('class', 'paragraph');

                var mainScreen = document.getElementById('main');

                mainScreen.appendChild(blurbTag);
                mainScreen.appendChild(p1Tag);
                loadForm();
        })
}

function loadForm(){
    var formContainer = document.getElementById('main');
    var formDeclare = document.createElement('form');
    var formtextTag = document.createElement('h2');
    var formtextText = document.createTextNode('Please enter your ZIP code:')
    formtextTag.appendChild(formtextText);
    formDeclare.setAttribute('class', 'center');
    var zipEntry = document.createElement('input');
    zipEntry.setAttribute('type','text');
    zipEntry.setAttribute('maxLength',5);
    zipEntry.setAttribute('id','zipInput')
    var submitButton = document.createElement('input');
    submitButton.setAttribute('type','button');
    submitButton.setAttribute('id', 'code');
    submitButton.setAttribute('cols',10);
    submitButton.setAttribute('rows',1);
    submitButton.setAttribute('value','submit');
    submitButton.addEventListener("click",submitZIP);
    formDeclare.appendChild(formtextTag);
    formDeclare.appendChild(zipEntry);
    formDeclare.appendChild(submitButton);
    formContainer.appendChild(formDeclare);   
}

function submitZIP(){
  var zipInput = document.getElementById('zipInput');
  zipGlobal = zipInput.value;
  var userZIP = zipInput.value;
  zipInput.value ="";

  var formAdd = document.getElementById('main');
  formAdd.innerHTML="";

  var h1Tag = document.createElement('h1');
  h1Tag.setAttribute('id','zipLoad');
  var h1Text = document.createTextNode(userZIP);
  h1Tag.appendChild(h1Text);
  formAdd.appendChild(h1Tag);
  zipLookup();
}

function yesResponse(){
  var userZip = document.getElementById('zipInput');
  var containerF = document.getElementById('main');
  containerF.innerHTML ="";

  var yesLandingTag = document.createElement('h1')
  var yesLandingText = document.createTextNode("Word? Nice! Thanks for being part of the solution!");
  console.log("OHIO STATE MUST BE DESTROYED.");
  yesLandingTag.appendChild(yesLandingText);
  yesLandingTag.setAttribute('class', 'goodHeader')
  containerF.appendChild(yesLandingTag);

  var linkIntroTag = document.createElement('p');
  var linkIntroText = document.createTextNode('Minnesota offers a variety of incentives for resident vaccinations. Claim yours today at:')
  linkIntroTag.appendChild(linkIntroText);
  linkIntroTag.setAttribute('class', 'goodText');
  containerF.appendChild(linkIntroTag);

  var linkTag = document.createElement('a');
  linkTag.setAttribute('href','https://mn.gov/covid19/vaccine-rewards/index.jsp');
  linkTag.setAttribute('target', "_blank");
  var linkText = document.createTextNode('https://mn.gov/covid19/vaccine-rewards/index.jsp');
  linkTag.appendChild(linkText);
  containerF.appendChild(linkTag);

  var questionTag = document.createElement('h2');
  var questionText = document.createTextNode('...Like a beer, do you?')
  questionTag.appendChild(questionText);
  containerF.appendChild(questionTag);

  var buttonContainer = document.createElement('form');
  buttonContainer.setAttribute('id','buttoncontainer');
  var yesButton = document.createElement('input');
  yesButton.setAttribute('type','button');
  yesButton.setAttribute('value','Sure I do.');
  yesButton.setAttribute('id', 'yesBeer');
  yesButton.addEventListener("click", yesilikeabeer);

  var noButton = document.createElement('input');
  noButton.setAttribute('type','button');
  noButton.setAttribute('value','Not Particularly...');
  noButton.setAttribute('id', 'noBeer');
  noButton.addEventListener("click", nahbeerznasty);

  buttonContainer.appendChild(yesButton);
  buttonContainer.appendChild(noButton);
  containerF.appendChild(buttonContainer);
}

function noResponse(){
  var main = document.getElementById('main');
  main.innerHTML = "";
  var header = document.createElement('div');
  header.setAttribute('id','header');

  var titleTag = document.createElement('h1');
  var titleText = document.createTextNode('Seriously? Well, same to you!');
  titleTag.appendChild(titleText);
  titleTag.setAttribute('class', 'badHeader');
  header.appendChild(titleTag);

  var divSwitcher = document.createElement('div');
  divSwitcher.setAttribute('id','videoswitcher');
  main.appendChild(divSwitcher);

  var introTag = document.createElement('h4');
  var introText = document.createTextNode("That's not too cool, brutha'. In the name of citizenship, good taste, and the memory of the late great Herman Cain, you really ought to reconsider this particular life choice you've made. ");
  introTag.appendChild(introText);
  introTag.setAttribute('class', 'badText');
  divSwitcher.appendChild(introTag);

  var introTag2 = document.createElement('p');
  var introText2 = document.createTextNode("Surely you'll concede, as a decent, God-fearing American citizen, that it's at least a possibility that you don't have all the information a body'd need to have made this choice differently.");
  introTag2.appendChild(introText2);
  introTag2.setAttribute('class', 'badText');
  divSwitcher.appendChild(introTag2);

  var linkAnchorTag = document.createElement('a');
  linkAnchorTag.setAttribute('href','https://www.cdc.gov/coronavirus/2019-ncov/vaccines/safety.html');
  linkAnchorTag.setAttribute('target', "_blank");
  linkAnchorTag.setAttribute('class','infoLinx');
  divSwitcher.appendChild(linkAnchorTag);
  var link1Tag = document.createElement('h2');
  var link1Text = document.createTextNode("Are vaccines safe?");
  link1Tag.appendChild(link1Text);
  linkAnchorTag.appendChild(link1Tag);

  var linkAnchorTag2 = document.createElement('a');
  linkAnchorTag2.setAttribute('href','https://www.youtube.com/watch?v=WyGq6cjcc3Q&ab_channel=LastWeekTonight');
  linkAnchorTag2.setAttribute('target', "_blank");
  linkAnchorTag2.setAttribute('class','infoLinx');
 
  divSwitcher.appendChild(linkAnchorTag2);
  var link2Tag = document.createElement('h2');
  var link2Text = document.createTextNode("Is Alex Jones full of shit?");
  link2Tag.appendChild(link2Text);
  linkAnchorTag2.appendChild(link2Tag);

  var linkAnchorTag3 = document.createElement('a');
  linkAnchorTag3.setAttribute('href','https://www.cdc.gov/nchs/nvss/vsrr/covid19/index.htm');
  linkAnchorTag3.setAttribute('target', "_blank");
  linkAnchorTag3.setAttribute('class','infoLinx');
  divSwitcher.appendChild(linkAnchorTag3);
  var link3Tag = document.createElement('h2');
  var link3Text = document.createTextNode("How many people have actually died from this thing?");
  link3Tag.appendChild(link3Text);
  linkAnchorTag3.appendChild(link3Tag);

  var linkAnchorTag4 = document.createElement('a');
  linkAnchorTag4.setAttribute('href', 'https://mn.gov/covid19/vaccine/find-vaccine/locations/index.jsp');
  linkAnchorTag4.setAttribute('target', "_blank");
  linkAnchorTag4.setAttribute('class', 'infoLinx');
  divSwitcher.appendChild(linkAnchorTag4);
  var link4Tag = document.createElement('h2');
  var link4Text = document.createTextNode("Where can I even go to get the shot?");
  link4Tag.appendChild(link4Text);
  linkAnchorTag4.appendChild(link4Tag);

  dunkOnyaJethro()
}

function dunkOnyaJethro(){
  var randomString = [
    {
      textInd: 1,
      burn: "; your mother was a hamster, and your father smelt of elberberries."
    },  
    {
      textInd: 2,
      burn: ", 'cause vaccinated people's dicks so hot they stolen - yo dick look just like Gary Coleman."
    },
    {
      textInd: 3,
      burn: ". I also heard that Yo mama's so poor, the ducks throw bread at her."
    },
    {
      textInd: 4,
      burn: ", unless you're fine with going through the whole rotten thing dragging your knuckles around everywhere with you."
    },
    {
      textInd: 5,
      burn: ", and it's real messed up that yo mama so fat, when she cosplayed as Maleficent dudes thought she was tryna' be Ursula."
    },
    {
      textInd: 6,
      burn: " - hard to expect any better from someone whose mama so dumb it take her two hours to watch 60 Minutes."
    },
    {
      textInd: 7,
      burn: ". Know what else, Jethro? Yo mama so broke, Nigerian princes be sending HER money."
    },
    {
      textInd: 8,
      burn: ", and if you can't behave yourself any better than that you'd be well-advised to start wearing a bicycle helmet anytime you're out in public."
    },
    {
      textInd: 9,
      burn: ", and I envy people who never have to meet you."
    },
    {
      textInd: 10,
      burn: "; you are just impossible to underestimate, it seems - even if you were a potato, mahfs'd still be like, 'there go one dumb-ass potato'."
    },
    {
      textInd: 11,
      burn: ". You resemble Rapunzel a bit: she lets down her hair, and you let down everyone you ever meet."
    },
    {
      textInd: 12,
      burn: " if you honestly think this kind of thing is going to fly; you're a real jerk, and you smell like farts."
    },
    {
      textInd: 11,
      burn: " and stop being a butthole about this kind of easy crap. GET VACCINATED, JETHRO!"
    },
    {
      textInd: 12,
      burn: ". You look like six pounds of dog crap in an eight-ounce sack - so ugly that on the day you were born the doctor slapped ya MAMA. And SHE's so damned ugly, her therapist makes her lie face down."
    },
    {
      textInd: 13,
      burn: "; lord, what a jerk you are. What did your country ever do to you? If we promise to throw you a stick, will you leave?"
    }
  ]

  for(i=0; i<randomString.length-1; i++){
    var index=Math.floor(Math.random() * randomString.length);
  }
  insultSelect = randomString[index].burn;
  setTime();
}

function setTime() {
  var secondsLeft = 5;
  var timerInterval = setInterval(function() {
    secondsLeft--;
    
    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
    }
  }, 1000);
}

function setTime2() {
  var secondsLeft = 10;
  var timerInterval = setInterval(function() {
    secondsLeft--;
    
    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage2();
    }
  }, 1000);
}

function sendMessage() {
  var main = document.getElementById("main");
  var divSwitcher = document.getElementById('divSwitcher');
  var eatItJerkTag = document.createElement("h3");
  var eatItJerkText = document.createTextNode("You really, REALLY need to rethink your whole approach to life"+insultSelect);
  eatItJerkTag.appendChild(eatItJerkText);

  eatItJerkTag.setAttribute('class', "jerkText");
  main.appendChild(eatItJerkTag);
  setTime2();
}

function sendMessage2() {
  var divSwitcher = document.getElementById('videoswitcher');
  divSwitcher.innerHTML ="";

  
  var gifTag = document.createElement('a');
    gifTag.setAttribute('href','https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO');
  
  var randomBurnGif = [
    {
      textInd: 1,
      gifVar: "./assets/images/01_oldNtired.gif"
    },
    {
      textInd: 2,
      gifVar: "./assets/images/02_idiotSammich.gif"
    },
    {
      textInd: 3,
      gifVar: "./assets/images/03_stupidFace.gif"
    },
    {
      textInd: 4,
      gifVar: "./assets/images/04_gameRecgame.gif"
    },
    {
      textInd: 5,
      gifVar: "./assets/images/05_gsgtHartman.gif"
    },
    {
      textInd: 6,
      gifVar: "./assets/images/06_frenchTaunting.gif"
    },
    {
      textInd: 7,
      gifVar: "./assets/images/07_josieP.gif"
    },
    {
      textInd: 8,
      gifVar: "./assets/images/08_theOffender.gif"
    },
    {
      textInd: 9,
      gifVar: "./assets/images/09_yaMama.gif"
    },
    {
      textInd: 10,
      gifVar: "./assets/images/10_hueySense.gif"
    },
    {
      textInd: 11,
      gifVar: "./assets/images/11_mamaSauce.gif"
    },
    {
      textInd: 12,
      gifVar: "./assets/images/12_wereHome.gif"
    },
    {
      textInd: 13,
      gifVar: "./assets/images/13_finnMom.gif"
    },
    {
      textInd: 14,
      gifVar: "./assets/images/14_peeBee.gif"
    },
    {
      textInd: 15,
      gifVar: "./assets/images/15_bmoStupid.gif"
    },
    {
      textInd: 16,
      gifVar: "./assets/images/16_garbageCan.gif"
    },
    {
      textInd: 17,
      gifVar: "./assets/images/17_uglyBandw.gif"
    },
    {
      textInd: 18,
      gifVar: "./assets/images/18_jennaDisgrace.gif"
    },
    {
      textInd: 19,
      gifVar: "./assets/images/19_housewivesTrashy.gif"
    },
    {
      textInd: 20,
      gifVar: "./assets/images/20_anchormanClassy.gif"
    },
  ]
    var gifPath = randomBurnGif[0].gifVar;
    
    for(var i=0; i<randomBurnGif.length-1; i++){
      var index=Math.floor(Math.random() * randomBurnGif.length);
    }
    var insultGif = randomBurnGif[index].gifVar;
  
    var gifSelect = document.createElement('img');
    gifSelect.setAttribute('src', insultGif);
    gifSelect.setAttribute('alt','Eat it, rube!');
    gifSelect.setAttribute('style','width:85%;height:80%;');
  
    gifTag.appendChild(gifSelect);
    main.appendChild(gifTag);
}

function yesilikeabeer(){
  var main = document.getElementById('main');
  main.innerHTML = "";
  var header = document.createElement('div');
  header.setAttribute('id','header');

  var titleTag = document.createElement('h1');
  var titleText = document.createTextNode('...well, of COURSE you like a beer!')

  titleTag.appendChild(titleText);
  main.appendChild(titleTag);

  var introTag = document.createElement('h4');
  var introText = document.createTextNode('Cheers to you! Congratulate yourself on your citizenship at one of these fine Minnesota breweries - all within 5 miles of your ZIP!');
  introTag.appendChild(introText);
  introTag.setAttribute('class', 'goodHeader');
  main.appendChild(introTag);

  var cardDisplay = document.createElement('div');
  cardDisplay.setAttribute('id','cardContainer');
  main.appendChild(cardDisplay);

  let request5 = `https://app.zipcodebase.com/api/v1/radius?apikey=1578b6e0-d5ef-11eb-b9b2-2b8eceeea297&code=${zipGlobal}&radius=5&country=us&unit=miles`;
  fetch(request5)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    var beerList = data.results;
    
    for(var i=0; i<beerList.length; i++){
      zipList = data.results[i].code;
      
      let request6 = `https://api.openbrewerydb.org/breweries?by_postal=${zipList}`;
      fetch(request6)
      .then(function(response){
        return response.json();
        console.log(response);
      })
      .then(function(data){
        
        for(let i=0; i<data.length; i++){
          
          var brewerDivTag = document.createElement('div');
          brewerDivTag.setAttribute('class',"brewerCard");
          cardDisplay.appendChild(brewerDivTag);
          
          var brewerHeadTag = document.createElement('h3');
          var brewerHeadText = document.createTextNode(data[i].name || "");
          brewerHeadTag.appendChild(brewerHeadText);
          brewerDivTag.appendChild(brewerHeadTag);
          brewerHeadTag.setAttribute('class', 'goodHeader');
          
          var brewerStreetTag = document.createElement('p');
          var brewerStreetText = document.createTextNode(data[i].street || "");
          brewerStreetTag.appendChild(brewerStreetText);
          brewerDivTag.appendChild(brewerStreetTag);
        
          var brewerCityTag = document.createElement('p');
          var brewerCityText = document.createTextNode(data[i].city || "");
          brewerCityTag.appendChild(brewerCityText);
          brewerDivTag.appendChild(brewerCityTag);

          if(data[i].phone !== null){
            var brewerPhoneRaw = data[i].phone;
            var brewerPhone1 = brewerPhoneRaw.substr(0,3);
            var brewerPhone2 = brewerPhoneRaw.substr(3,3);
            var brewerPhone3 = brewerPhoneRaw.substr(6,4);
            var brewerPhoneConcat = "("+brewerPhone1+") "+brewerPhone2+"-"+brewerPhone3;
            
            var brewerPhoneTag = document.createElement('p');
            var brewerPhoneText = document.createTextNode(brewerPhoneConcat || "");
            brewerPhoneTag.appendChild(brewerPhoneText);
            brewerDivTag.appendChild(brewerPhoneTag);

            var linkTag = document.createElement('a');
            var brewerUrlTag = document.createElement('p');
            var brewerUrlText = document.createTextNode(data[i].website_url || "");
            brewerUrlTag.appendChild(brewerUrlText);
            brewerUrlTag.setAttribute('class', "brewLinkText");
            linkTag.setAttribute('value', `${data[i].website_url}`);
            linkTag.setAttribute('href',`${data[i].website_url}`);
            linkTag.setAttribute('target', "_blank");

            linkTag.appendChild(brewerUrlTag);
            brewerDivTag.appendChild(linkTag);
          }
        }
        
      })
    }
  
})
}

function nahbeerznasty(){
  var container = document.getElementById('main');
  container.innerHTML = "";

  var header = document.createElement('div');
  header.setAttribute('id','header');

  var titleTag = document.createElement('h1');
  var titleText = document.createTextNode("Don't like beer, eh?");

  titleTag.appendChild(titleText);
  main.appendChild(titleTag);

  var introTag = document.createElement('h4');
  var introText = document.createTextNode("It's cool; there's all kinds of stuff to do this summer in Minnesota; this is a cool place. Here's some examples: ");
  introTag.appendChild(introText);
  introTag.setAttribute('class', 'goodText');
  main.appendChild(introTag);

  var linkTag = document.createElement('a');
  
  linkTag.setAttribute("value", "https://www.atlasobscura.com/things-to-do/minnesota");
  
  linkTag.setAttribute('href','');
  main.appendChild(linkTag);
  
  linkTag.setAttribute('href','https://www.atlasobscura.com/things-to-do/minnesota');
  linkTag.setAttribute('target', "_blank");
  var linkText = document.createTextNode('https://www.atlasobscura.com/things-to-do/minnesota');
  linkTag.appendChild(linkText);
  main.appendChild(linkTag);

  var attaboyTag = document.createElement('a');
    attaboyTag.setAttribute('href','https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO');
  
  var randomAttaboy = [
    {
      textInd: 1,
      attaboy: "You really are a mensch; you shouold establish a newsletter. I'd subscribe to it."
    },
    {
      textInd: 2,
      attaboy: "Truly: well done. You are a monarch amongst humankind, and your medal is assuredly in the mail."
    },
    {
      textInd: 3,
      attaboy: "You've shown the kind of citizenship, good sense, and self-respect that's going to pull us all out of this godawful mess we're in."
    },
    {
      textInd: 4,
      attaboy: "Who needs beer anyway? What you really deserve is available only a few states away; you should take all that drive and care for self and country you've shown by vaccinating yourself, and take a crack at fixing Minnesota's public ballot initiative statutes. Till then, your princess is in another castle."
    },
    {
      textInd: 5,
      attaboy: "Your country needs more just like you; way to tune out the noise and the nonsense and the rampant hocus-pocus we see all around us. Go pat yourself on the back with some cat videos or somesuch other teetotal craziness."
    },
    {
      textInd: 6,
      attaboy: "May your days be long upon the earth, and your hardships few; fair winds, and following seas."
    },
    {
      textInd: 7,
      attaboy: "I'm sure the president is grateful as all get-out! If indeed he is cognizant of anything at all, god bless his million-year-old, red-white-and-blue heart!"
    },
    {
      textInd: 8,
      attaboy: "You deserve a laurel wreath, but I'm afraid you're just gonna have to settle for continued health. Your choice shows that you deserve better, but them's the breaks."
    },
    {
      textInd: 9,
      attaboy: "You deserve a summer filled with all the closeness, physical contact, and familial warmth you've been missing since this whole godawful mess started - go and have yourself one!"
    },
    {
      textInd: 10,
      attaboy: "Thanks a bajillion, bub, bubbette, or bubX. The citizenship, stewardship of others, and discrernment you've shown in choosing to vaccinate yourself has saved the whole rotten universe. The universe thanks you."
    },
    {
      textInd: 11,
      attaboy: "Great life choice, G. Maybe spread that give-a-darn attitude around some, bring some of the elastic-waistband crowd along or something. It's a thought."
    },
    {
      textInd: 12,
      attaboy: "May others always show you the same the same compassion you've shown them by your very humane choice to vaccinate yourself on your own and their behalf."
    },
    {
      textInd: 13,
      attaboy: "Hurray for you, Vaccine-Getter! OHIO STATE MUST BE DESTROYED."
    },
    {
      textInd: 14,
      attaboy: "Minnesota needs a LOT more responsible, reality-conscious citizens like yourself. Now get out into the city this 4th of July and cause some friggin' ruckus!"
    },
    {
      textInd: 15,
      attaboy: "Nice life choices there, app user! Tell some a' yer friends, whyncha'!"
    },
    {
      textInd: 16,
      attaboy: "Outstanding, this very responsible and praiseworthy decision you've made. Plainly you are among the elect; may your enemies tremble at your step, and the unrighteous flee in terror at your approach!"
    },
    {
      textInd: 17,
      attaboy: "Your country thanks you, sir, madam, or other; good as it been to you, you very responsibly stepped up and did your bit to help get us all out of this ridiculous car-crash of a situation. You are for sure one of the good guys."
    },
    {
      textInd: 18,
      attaboy: "This whole thing is up in smoke without decent folk like yourself doing what they can to stop it happening. What kinda' person won't bother with the lowest-hanging fruit anyway? Good on ya'."
    },
    {
      textInd: 19,
      attaboy: "Americans in all their vast dispersal throughout space and time agree on this one thing if no other: it's exactly for folks just like you that Europeans stole the holy living Jesus out of this entire continent in the first place. Thanks for helping make their labour count, fellow squatter, and keep up the good work!"
    },
    {
      textInd: 20,
      attaboy: "Wow-EE, thanks a bazillion! Maybe we'll all get to go outside again soon, and breathe in good fresh air without worrying that we're all gonna' drop dead!"
    }
  ]
    
    for(i=0; i<randomAttaboy.length-1; i++){
      var index=Math.floor(Math.random() * randomAttaboy.length);
    }
    attaboySelect = randomAttaboy[index].attaboy;
    
    var attaboySelectTag = document.createElement('h3');
    var attaboySelectText = document.createTextNode(attaboySelect);
    attaboySelectTag.appendChild(attaboySelectText);
    attaboyTag.appendChild(attaboySelectTag);
    main.appendChild(attaboyTag);
}
