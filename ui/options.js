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

const logError = err => console
  .error('Freezy extension error:', err)

const textToArray = text => text
  .split('\n')
  .filter(u => u != '')

const arraysToText = arrs => arrs.map(a => a.join('\n'))

const saveOptions = e => {
  const urls = textToArray(document.querySelector('#urls').value)
  const mouseEvents = textToArray(document.querySelector('#mouse-events').value)
  browser.storage.local.set({ urls, mouseEvents })
    .catch(logError)
}

const restoreOptions = () => browser.storage.local.get(['urls', 'mouseEvents'])
  .then(res => [ res.urls || [],
                 res.mouseEvents || defaultMouseEvents ])
  .then(arraysToText)
  .then(([ urls, mouseEvents ]) => {
    document.querySelector('#urls').value = urls
    document.querySelector('#mouse-events').value = mouseEvents
  }).catch(logError)

const resetOptions = () => browser.storage.local.set({
  urls: '',
  mouseEvents: defaultMouseEvents
})

document.addEventListener('DOMContentLoaded', restoreOptions)
document.querySelector('#save-prefs').addEventListener('click', saveOptions)
document.querySelector('#reset-prefs').addEventListener('click', resetOptions)
