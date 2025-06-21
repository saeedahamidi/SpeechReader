const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

//console.log(main)
const data = [
  {image: './img/drink.jpg',text: "I'm Thirsty"},
  { image: './img/food.jpg',  text: "I'm Hungry"},
  {image: './img/tired.jpg',text: "I'm Tired"},
  {image: './img/hurt.jpg',text: "I'm Hurt" },
  {image: './img/happy.jpg',text: "I'm Happy"},
  {image: './img/angry.jpg',text: "I'm Angry"},
  {image: './img/sad.jpg',text: "I'm Sad"},
  {image: './img/scared.jpg', text: "I'm Scared"},
  {image: './img/outside.jpg',text: 'I Want To Go Outside'},
  {image: './img/home.jpg',text: 'I Want To Go Home'},
  {image: './img/school.jpg',text: 'I Want To Go To School'},
  {image: './img/grandma.jpg',text: 'I Want To Go To Grandmas'}
];
// Create speech boxes
//calling function for every item in array we have many way like "forloop,for of,while,loop"

// for (let index = 0; index < data.length; index++) {
//     createBox(data[index])
// }

// let i=0;
// while (i<data.length) {
//     createBox(data[i]);
//     i++
// }

// for (const i of data) {
//     createBox(i);
// }
// But the beast way for calling feunction is "ForEach"
data.forEach(createBox);

function createBox(item) {
  const box = document.createElement('div');
  //console.log(box)
  const { image, text } = item;
  //console.log(item)
  box.classList.add('box');
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;
box.addEventListener('click',()=>{
    SetTextMessage(text);
    speakText();

    box.classList.add('active');
    setTimeout(() => {
        box.classList.remove('active')
    }, 800);
})
  main.appendChild(box);
}
//console.log(main)
const message= new SpeechSynthesisUtterance();
// Set text
function SetTextMessage(text) {
    message.text = text;
  }
  
  // Speak text
  function speakText() {
    speechSynthesis.speak(message);
  }

// Toggle text box
toggleBtn.addEventListener('click', () =>
    document.getElementById('text-box').classList.toggle('show')
  );
  // Close button
  closeBtn.addEventListener('click', () =>
    document.getElementById('text-box').classList.remove('show')
  );
  // Store voices
let voices = [];
//console.log(voices)
function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;
    //console.log(option)
    option.innerText = `${voice.name} ${voice.lang}`;
    voicesSelect.appendChild(option);
  });
 
}
//console.log(voicesSelect)
// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);
//Read Text Button
readBtn.addEventListener('click',()=>{
    SetTextMessage(textarea.value);
    speakText();
})
getVoices();