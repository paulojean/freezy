const defaultMouseEvents = [
  'auxclick',
  'contextmenu',
  'mousemove',
  'mouseover',
  'pointerlockchange',
  'pointerlockerror',
  'select',
  'wheel'
]

const blockEvents = (mouseEvents) => {
  console.log('block events:', mouseEvents)
  mouseEvents.forEach(eventName =>
    window.addEventListener(eventName, event => {
      event.stopPropagation()
    }, true)
  )
}

browser.storage.local.get()
  .then(res => [ res.urls || [],
                 res.mouseEvents || defaultMouseEvents ])
  .then(([ urls, mouseEvents ]) => {
    const endingHostPattern = url => `${url}$`
    const host = window.location.host
    const hostAllowed = urls.find(url => {
      const regex = new RegExp(endingHostPattern(url))
      return regex.exec(host)
    })

    if(!hostAllowed)
      blockEvents(mouseEvents)
  })
