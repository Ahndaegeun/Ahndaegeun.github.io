const main = document.querySelector('main')
const header = document.querySelector('header')
const infoMenu = document.querySelector('[href="#info"]')
const skillMenu = document.querySelector('[href="#skill"]')
const portfolioMenu = document.querySelector('[href="#portfolio"]')

const skillBtn = document.querySelectorAll('.skill-list ul li button')
const allImg = document.querySelectorAll('.skill-img img')
const frontImg = document.querySelectorAll('.skill-img .front')
const backImg = document.querySelectorAll('.skill-img .back')
const dbImg = document.querySelectorAll('.skill-img .db')
const etcImg = document.querySelectorAll('.skill-img .etc')

const nowPosition = document.querySelector('.now-position')

const addClass = function(ele, e) {
  e.target.classList.add('clicked')
  for(const e of ele) {
    e.classList.add('choose')
  }
}

const removeClass = function(target, name) {
  for(const ele of target) {
    ele.classList.remove(name)
  }
}

const showStack = e => {
  const targetName = e.target.classList[0]

  removeClass(allImg, 'choose')
  removeClass(skillBtn, 'clicked')

  if(targetName.includes('front')) {
    addClass(frontImg, e)
  } else if(targetName.includes('db')) {
    addClass(dbImg, e)
  } else if(targetName.includes('all')) {
    addClass(allImg, e)
  } else if(targetName.includes('back')) {
    addClass(backImg, e)
  } else if(targetName.includes('etc')) {
    addClass(etcImg, e)
  }
}

const showMenu = e => {
  const top = e.target.scrollTop
  nowPosition.innerHTML = 'SCROLL ->'
  if(top < 844) {
    header.classList.add('hidden')
  } else if(top >= 844) {
    header.classList.remove('hidden')
    infoMenu.classList.remove('clicked')
    skillMenu.classList.remove('clicked')
    portfolioMenu.classList.remove('clicked')
    if(top === 944) {
      infoMenu.classList.add('clicked')
    } else if(top === 1888) {
      skillMenu.classList.add('clicked')
    } else if(top === 2832) {
      portfolioMenu.classList.add('clicked')
      nowPosition.innerHTML = '<- SCROLL'
    }
  }
}

for(const ele of skillBtn) {
  ele.addEventListener('click', e => {
    showStack(e)
  })
}

main.addEventListener('scroll', e => {
  showMenu(e)
})