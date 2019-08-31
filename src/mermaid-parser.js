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

const MermaidParser = (md, opts) => {
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

  const defaultRenderer = md.renderer.rules.fence.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    // const code = token.content.trim()
    const code = `${token.info} \n ${token.content.trim()}`
    if (token.info === 'mermaid') {
      return mermaidChart(code)
    }
    if (token.info === 'mermaid' || token.info === 'gantt' || token.info === 'sequenceDiagram' || token.info.match(/^graph (?:TB|BT|RL|LR|TD);?$/)) {
      return MermaidChart(code)
    }
    /* const firstLine = code.split(/\n/)[0].trim()
    if (firstLine === 'gantt' || firstLine === 'sequenceDiagram' || firstLine.match(/^graph (?:TB|BT|RL|LR|TD);?$/)) {
      return mermaidChart(code)
    } */
    return temp(tokens, idx, options, env, slf)
  }

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
