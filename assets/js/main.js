/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    //validate that variable exists
    if (toggle && nav){
        toggle.addEventListener('click', ()=> {
            // add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
        })
    }
} 
showMenu('nav-toggle', 'nav-menu')
/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== SHOW SCROLL TOP ====================*/ 
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 200) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== REDUCE THE SIZE AND PRINT ON AN A4 SHEET ====================*/ 
function scaleCv(){
    document.body.classList.add('scale-cv')
}
/*==================== REMOVE THE SIZE WHEN THE CV IS DOWNLOADED ====================*/ 
function removeScale(){
    document.body.classList.remove('scale-cv')
}

/*==================== GENERATE PDF ====================*/ 
// PDF generated area
let areaCv = document.getElementById('area-cv')

let resumeButton = document.getElementById('resume-button')

// Html2pdf options
let opt = {
    margin:       1,
    filename:     'NGUYENTRIHIEU_Resume.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 4 },
    jsPDF:        { format: 'a4', orientation: 'portrait' },
    enableLinks:  true,
    // pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
  };

// Function to call areaCv and Html2Pdf options 
function generateResume(){
    html2pdf(areaCv, opt)
}
// When the button is clicked, it executes the three functions
resumeButton.addEventListener('click', () => {
    // 1. The class .scale-cv is added to the body, where it reduces the size of the elements
    scaleCv()

    // 2. The PDF is generated
    generateResume()

    // 3. The .scale-cv class is removed from the body after 5 seconds to return to normal size.
    setTimeout(removeScale, 5000)
//     window.open('/assets/pdf/NGUYENTRIHIEU_Resume.pdf')
})

// Change language
const langEl = document.querySelector('.langWrap');
const link = document.querySelectorAll('a');
fetch("assets/data.json")
    .then(response => response.json())
    .then(data => {
        link.forEach(el => {
            el.addEventListener('click', () => {
                langEl.querySelector('.active').classList.remove('active');
                el.classList.add('active');

                const attr = el.getAttribute('language');

                document.querySelector(".name_nav").innerText = data[attr].name   
                document.querySelector(".name_vn").innerText = data[attr].name_vn
                document.querySelector(".address").innerText = data[attr].address
                document.querySelector(".email").innerText = data[attr].email
                document.querySelector(".phone").innerText = data[attr].phone
                // document.querySelector(".note").innerText = data[attr].note
                document.querySelector(".profile__description").innerText = data[attr].profile 
                document.querySelector(".education__title").innerText = data[attr].education.degree
                document.querySelector(".education__studies").innerText = data[attr].education.studies
                document.querySelector(".education__year").innerText = data[attr].education.year
                // Section
                document.querySelector(".section-title-profile").innerText = data[attr].item[1]
                document.querySelector(".section-title-education").innerText = data[attr].item[2]
                document.querySelector(".section-title-skills").innerText = data[attr].item[3]
                document.querySelector(".section-title-experience").innerText = data[attr].item[4]
                document.querySelector(".section-title-languages").innerText = data[attr].item[5]
                document.querySelector(".section-title-project").innerText = data[attr].item[6]
                document.querySelector(".section-title-social").innerText = data[attr].item[7]
                // Experiece
                document.querySelector(".experience__company_1").innerText = data[attr].experience.vts.time
                document.querySelector(".experience__tech_1").innerText = data[attr].experience.vts.tech
                document.querySelector(".experience__title_1").innerText = data[attr].experience.vts.title
                document.querySelector(".experience__detail_1").innerHTML = data[attr].experience.vts.detail.join("</br>")

                document.querySelector(".experience__company_2").innerText = data[attr].experience.tma.time
                document.querySelector(".experience__title_2").innerText = data[attr].experience.tma.title
                document.querySelector(".experience__tech_2").innerText = data[attr].experience.tma.tech
                document.querySelector(".experience__detail_2").innerHTML = data[attr].experience.tma.detail.join("</br>")

                // Experience Details
                console.log(data[attr].experience.tma.more_detail   )
                document.querySelector(".exp_detail_1").innerHTML = data[attr].experience.vts.more_detail.join("</br>")
                document.querySelector(".exp_detail_2").innerHTML = data[attr].experience.tma.more_detail.join("</br>")

                // Project
                document.querySelector(".project-1").innerText = data[attr].project[0]
                document.querySelector(".project-2").innerText = data[attr].project[1]
                document.querySelector(".project-3").innerText = data[attr].project[2]
                document.querySelector(".project-4").innerText = data[attr].project[3]
                document.querySelector(".project-5").innerText = data[attr].project[4]
                document.querySelector(".project-6").innerText = data[attr].project[6]
                document.querySelector(".project-7").innerText = data[attr].project[7]
                // Languages
                document.querySelector(".languages__circle_1").innerText = data[attr].language[0]
                document.querySelector(".languages__circle_2").innerText = data[attr].language[1]
                document.querySelector(".languages__circle_3").innerText = data[attr].language[2]
                // Interests
                document.querySelector(".interests__name_1").innerText = data[attr].interest[0]
                document.querySelector(".interests__name_2").innerText = data[attr].interest[1]
                document.querySelector(".interests__name_3").innerText = data[attr].interest[2]
                document.querySelector(".interests__name_4").innerText = data[attr].interest[3]
            })
        }
            )
    })