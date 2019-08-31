import mermaid from 'mermaid'

const mermaidChart = (code) => {
  try {
    /*
    mermaid.parse(code)
    return `<div class="mermaid">${code}</div>`
    */
    var needsUniqueId = "render" + (Math.floor(Math.random() * 10000)).toString();
    Mermaid.mermaidAPI.render(needsUniqueId, code, sc => {code=sc})
    return `<div class="mermaid">${code}</div>`
  } catch ({ str, hash }) {
    return `<pre>${str}</pre>`
  }
}

const MermaidParser = (opts) => {
  Mermaid.initialize(Object.assign(MermaidPlugIn.default, opts));
  /* md.mermaid = mermaid
  mermaid.loadPreferences = (preferenceStore) => {
    let mermaidTheme = preferenceStore.get('mermaid-theme')
    if (mermaidTheme === undefined) {
      mermaidTheme = 'default'
    }
    let ganttAxisFormat = preferenceStore.get('gantt-axis-format')
    if (ganttAxisFormat === undefined) {
      ganttAxisFormat = '%Y-%m-%d'
    }
    mermaid.initialize({
      theme: mermaidTheme,
      gantt: { axisFormatter: [
        [ganttAxisFormat, (d) => {
          return d.getDay() === 1
        }]
      ]}
    })
    return {
      'mermaid-theme': mermaidTheme,
      'gantt-axis-format': ganttAxisFormat
    }
  } */

  MermaidParser.default={
    startOnLoad: false,
    theme: "default",
    flowchart:{
      htmlLabels: false,
      useMaxWidth: true,
    }
  }
}

export default MermaidParser
