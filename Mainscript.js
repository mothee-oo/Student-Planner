//digital clock

function CreateClock(){
    //get the current date
    const CurrentDate = new Date();
    //get current hours and amke the digits double 
    const hours = CurrentDate.getHours().toString().padStart(2 , "0");
    const minutes = CurrentDate.getMinutes().toString().padStart(2 , "0");
    //creeate a variable based on the clock element
    var TimeString = document.getElementById("clock").innerHTML;
    TimeString = `${hours}:${minutes}`;
    //send it backto the page 
    document.getElementById("clock").innerHTML = TimeString;
    
   
}
CreateClock();
//updates the clock every 1 secon
setInterval(CreateClock , 1000);

// ADD CLASSES 


let ClassContainer = document.getElementsByClassName("class-boxes")[0];
let button = document.getElementById("Add-btn");
let ClassName = document.getElementById("classname").value;
let code = document.getElementById("class-code").value;
let AssignmentNo = document.getElementById("assignment-number").value;
  
    function AddClass(){
        let ClassName = document.getElementById("classname").value;
        let code = document.getElementById("class-code").value;
        let AssignmentNo = document.getElementById("assignment-number").value;

        //creates an element that is the container of the class that will be added when you press the button
        let course = document.createElement("div");
        course.innerHTML = `<div class="Classes">
                    <div class="class-input">
                      <textarea  class ="class"  placeholder="Class 1.."></textarea>
                      <textarea class ="class-code" placeholder="code"></textarea>
                      <textarea  class ="assignment-number"  placeholder="# Assignments"></textarea>
                     </div> 
                </div>`;
    //adds the class to the container in the html page
    ClassContainer.appendChild(course);
    ClassContainer.insertBefore(course, button);


    let deleteBtn = document.createElement("div");
    deleteBtn.innerHTML = "\u0078"; // This is called  a unicode charector
    course.appendChild(deleteBtn);
    deleteBtn.classList.add("deleteBtn");

    deleteBtn.addEventListener('click', function(){
        course.remove();
    });
    };

button.addEventListener('click', AddClass);
 
  

//THE CALENDER

let WeekBox = document.getElementById("WeekBox");
let Clicked = null; 
const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saterday'];
let Calender = document.getElementById("CalenderClass");
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
const NewEventModal = document.getElementById("NewEvenModal");
const deleteEventModal = document.getElementById("deleteEventModal");
const BackDrop = document.getElementById("ModalBackDrop");
const EventTitle = document.getElementById("EventTitle");

function Openmodal(date){ 
    Clicked = date;
     let EventForTheDay = events.find(events => events.date === Clicked);

    if(EventForTheDay){
        document.getElementById("EventText").innerText = EventForTheDay.title;
        deleteEventModal.style.display = "flex";
        BackDrop.style.display = "block";
    }
    else{
        NewEventModal.style.display = "flex";
    }

    BackDrop.style.display = "block";
 };





function load(){
    let currentdate = new Date();
    // check if the nav has been icreased or not
    if(nav !== 0){
        currentdate.setMonth(currentdate.getMonth() + nav);
    }


    let CurrentDay = currentdate.getDay();
    let CurrentMonth = currentdate.getMonth();
    let CurrentYear = currentdate.getFullYear();

    //get number of days in the month
    const DaysInMonth = new Date(currentdate.getFullYear(),currentdate.getMonth() + 1, 0).getDate();
    const lastMonthDays = new Date(currentdate.getFullYear(), currentdate.getMonth(), 0).getDate();

    //get padding days
    const firstDay = new Date(CurrentYear,CurrentMonth, 1);
    const lastday = new Date(CurrentYear,CurrentMonth + 1, 0);
  
    const DateString = firstDay.toLocaleDateString("en-GB", {
        weekday: 'long',
        day: 'numeric',
        month:'numeric',
        year: 'numeric',

    });
    const lastDateString =lastday.toLocaleDateString("en-GB", {
        weekday: 'long',
        day: 'numeric',
        month:'numeric',
        year: 'numeric',

    });
    
    const daystring = new Date(CurrentDay, CurrentMonth,CurrentYear).toLocaleDateString("en-GB", {
        weekday: 'long',
        day: 'numeric',
        month:'numeric',
        year: 'numeric',
    });

    let firstPaddingDays = weekdays.indexOf( DateString.split(', ')[0]);
    let lastDayOfWeek = weekdays.indexOf(lastDateString.split(', ')[0]);
    let lastPaddingDays = 6 - lastDayOfWeek;
    

    let MonthName = document.getElementById("MonthName");
    const MonthYear= currentdate.toLocaleDateString("en-GB",{
    month: 'long',
    year: 'numeric',
    
    });
    MonthName.innerHTML = MonthYear;


    let nextMonthDay = 1;
   
    //clear before you create new ones
    WeekBox.innerHTML ='';

    //fetching todays date
    const today = new Date();
    const todayString = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

    //create the calender structure
    for (let daybox = 1; daybox <= firstPaddingDays + DaysInMonth + lastPaddingDays; daybox++) {
        const CalenderDay = document.createElement("div");
      
        if (daybox <= firstPaddingDays) {
          CalenderDay.classList.add("PaddingDay");
          CalenderDay.innerText = lastMonthDays - firstPaddingDays + daybox;
        } 
        else if (daybox <= firstPaddingDays + DaysInMonth) {
          CalenderDay.classList.add("CalenderDay");
          const day = daybox - firstPaddingDays;
          CalenderDay.innerText = day;
          const daystring = `${day}/${CurrentMonth + 1}/${CurrentYear}`;

          //Highlight the current day
          if (daystring === todayString && nav === 0) {
            CalenderDay.classList.add("Today");
        }
    
          console.log(daystring )
          let EventForTheDay = events.find(events => events.date === daystring);
      
          if (EventForTheDay) {
            const CalenderEvent = document.createElement("div");
            CalenderEvent.classList.add("CalenderEvent");
            CalenderEvent.innerText = EventForTheDay.title;
            CalenderDay.appendChild(CalenderEvent); 
          }
      
          CalenderDay.addEventListener('click', () => Openmodal(daystring));
        } 
        else {
          CalenderDay.classList.add("LastPaddingDay");
          CalenderDay.innerText = nextMonthDay;
          nextMonthDay++;
        }
      
        WeekBox.appendChild(CalenderDay);
      }
      
  
}

function CloseModal(){
    NewEventModal.style.display = "none";
    deleteEventModal.style.display = "none";
    BackDrop.style.display = "none";
    EventTitle.value = "";


    load();
};
   function  SaveEvent(){
    if(EventTitle.value){
        EventTitle.classList.remove("error");
        
        //pushing the event into the events array
         events.push({
            date: Clicked,
            title: EventTitle.value,
         });

         //store it into local storage
         localStorage.setItem('events', JSON.stringify(events));
         CloseModal();
    }
    else{
        EventTitle.classList.add("error");
    }

};
function deleteEvent(){
    events = events.filter(events => events.date !== Clicked);
    localStorage.setItem("events", JSON.stringify(events));
    CloseModal();
};


let nav = 0;

function InitButtons(){
 
document.getElementById("Next").addEventListener('click',function(){
    nav++;
    
    load();
});

document.getElementById("Back").addEventListener('click', function(){
    nav--;
    load();
});

document.getElementById("Save").addEventListener('click',  SaveEvent);
document.getElementById("Cancel").addEventListener('click', CloseModal);

document.getElementById("deletebtn").addEventListener('click',  deleteEvent);
document.getElementById("CloseBtn").addEventListener('click', CloseModal);
}
    
InitButtons();
load();