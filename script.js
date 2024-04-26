let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

const socialTags = [
    document.querySelector('#social-icons'),
    document.querySelector('#social-bottom'),
]

const socialLinks = [
    { icon: 'bx bxl-discord', url: "https://discord.gg/z8BNWsTDVB" },
    { icon: 'bx bxl-youtube', url: "https://www.youtube.com/channel/UCZXwTimivga36LyLqNVUedA" },
    { icon: 'bx bxl-twitter', url: "https://twitter.com/studio_pond" },
    { icon: 'bx bxl-tiktok', url: "https://www.tiktok.com/@pond_official" },
]

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector(`header nav a[href*=${id}]`).classList.add('active');
            })
        }
    })
}

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

function addSocialIcons(socialInfo) {
    for (const index in socialTags) {
        const hyperlink = document.createElement("a");
        const icon = document.createElement("i");

        hyperlink.href = socialInfo.url;
        hyperlink.target = "_undefined";
        icon.className = socialInfo.icon;

        hyperlink.appendChild(icon);

        socialTags[index].appendChild(hyperlink);
    }
}

function setSocial() {
    socialLinks.forEach(addSocialIcons);
}

setSocial();

const contactForm = document.querySelector("#contact-form");
const inputField = contactForm.querySelectorAll(".input-group input");
const textArea = contactForm.querySelector("textarea");
const submitBtn = contactForm.querySelector("input");

const contactTable = [
    "Full Name: ", "Email: ", "Phone Number: ", "Subject: ", 
];

function mailTypecheck() {
    let email = contactForm.querySelector('[type="email"]');

    if (email.value != "") {
        var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
        if (exptext.test(email.value) == false) {
            //이메일 형식이 알파벳+숫자@알파벳+숫자.알파벳+숫자 형식이 아닐경우			
            alert("입력한 메일형식이 올바르지 않습니다.");
            email.focus();
            return false;
        }
    }

    return true;
}

function numberTypeCheck(){
    // 번호 타입 체크 필요
    // 외국 번호도 우리나라랑 형식이 비슷한지?
    let number = contactForm.querySelector('[type="number"]').value;
    console.log(number);

    return true;
}

function validCheck(){
    const mailValid = mailTypecheck();
    const numberValid = numberTypeCheck();

    const isAllValid = mailValid == true && numberValid == true;

    return isAllValid;
}

function sendMessage(event){
    event.preventDefault();

    if (validCheck() == false){ return; }

    let infoTable = [];
    // 인포테이블로 채워서 메일로 보내기
    //https://zzinise.tistory.com/12 서버 없이 보낼 수 있는 기능이 있는듯

    inputField.forEach(function(element, index){
        const type = element.type;
        const info = element.value;
        
        if (type == "email"){
            mailTypecheck();
        }else if(type == "number"){
            numberTypeCheck();
        }

        element.value = "";
        console.log(contactTable[index], info);
    });

    const message = textArea.value;
    textArea.value = "";

    console.log("Message: ", message);

    alert("Message has been sent. Thank you!")
}

contactForm.addEventListener("submit", sendMessage);