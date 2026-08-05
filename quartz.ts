import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { registerCondition } from "./quartz/plugins/loader/conditions"

// Quartz ships `not-index` but no positive counterpart; the recent-posts list
// configured in quartz.config.yaml only belongs on the home page.
registerCondition("index", (props) => props.fileData.slug === "index")

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
