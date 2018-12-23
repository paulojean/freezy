(() => {
  const mouseEvents = [
    "auxclick",
    "contextmenu",
    "mousemove",
    "mouseover",
    "mouseout",
    "mouseup",
    "pointerlockchange",
    "pointerlockerror",
    "select",
    "wheel"
  ]

  mouseEvents.forEach(eventName =>
    window.addEventListener(eventName, event => {
      event.stopPropagation()
    }, true)
  )
})()
